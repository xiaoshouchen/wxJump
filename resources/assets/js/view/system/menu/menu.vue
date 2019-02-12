<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <template v-if="this.menuAuth.delete">
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelAll">删除所选项</el-button>
                    </template>
                    <template v-if="this.menuAuth.add">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd()">添加{{page_name}}</el-button>
                    </template>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入要搜索的内容..." size="small" v-model="search.value" class="input-with-select">
                        <el-select style="width: 110px;" size="small" v-model="search.field" slot="prepend"
                                   placeholder="请选择">
                            <el-option v-for="item in columns" :key="item.prop" v-if="item.search" :label="item.label"
                                       :value="item.prop"></el-option>
                        </el-select>
                        <el-button size="small" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>

        <Table ref="table" :url="url" :columns="columns" :page="false" :checkbox="false" @tools="handleTools" @children="HandleGetChildren"></Table>

        <el-dialog :title="'添加'+page_name" :visible.sync="addFormVisible">
            <Add ref="addForm" :parent="addData" v-if="addFormVisible" v-on:render="this.handleRenderTable" v-on:close="addFormVisible = false"></Add>
        </el-dialog>

        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="edit_id" v-if="editFormVisible" v-on:render="this.handleRenderTable"  v-on:close="editFormVisible = false"></Edit>
        </el-dialog>
    </div>

</template>

<script>
    import Table from "@/components/public/table";
    import Add from "./add";
    import Edit from "./edit";
    import list_page from "@/mixins/list_page";
    import axios from '@/libs/axios';
    //import {getConfigArray} from "@/config/sys_config";

    export default {
        components: {Table, Add, Edit},
        mixins: [list_page],
        data() {
            return {
                page_name: '菜单',
                url: 'menu/list',
                addData:{id:0,name:"顶级分类"},
                addFormVisible: false,
                editFormVisible: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80',
                    },
                    {
                        prop: 'name',
                        label: '菜单名',
                        lazy: true,
                        sort: true,
                        search: true,
                    },
                    {
                        prop: 'url',
                        label: '链接',
                        sort: true,
                    },
                    {
                        prop: 'sort',
                        label: '排序',
                        sort: true,
                    }, {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                menuAuth:[
                    {
                        add:false,
                        edit:false,
                        delete:false,
                    },
                ]
            }
        },
        mounted(){
            this.handleSetFilter('where',{pid:0});
        },
        created:function(){
            let menu_Auth = this.$store.state.user.auth.menu;
            menu_Auth.forEach((value)=> {
                if(value === 'add') {
                    this.menuAuth.add = true
                }else if(value === 'edit') {
                    this.menuAuth.edit = true
                }else if(value === 'delete') {
                    this.menuAuth.delete = true
                }
            })
        },
        methods: {
            // 工具栏事件处理
            handleTools(type, index, row) {
                this.tools_id = row.id;
                if (type == 'edit'){
                    this.edit_id = row.id;
                    this.editFormVisible = true;
                }else if (type == 'add'){
                    this.handleAdd({id:row.id,name:row.name});
                }else if (type == 'delete') {
                    axios.get('menu/del/'+row.id).then((res) => {
                        this.$message.success('删除成功');
                        this.handleRenderTable();
                    }).catch((error) => {
                        this.$message.error('删除失败');
                        console.log(error);
                    });
                }
            },
            handleAdd(parent={id:0,name:"顶级分类"}){
                this.addData = parent;
                this.addFormVisible = true;
            },
            handleDelAll() {
                console.log(this.handleGetSelection())
            },
            HandleGetChildren(row){
                axios.get('menu/children/'+row.id)
                    .then((res) => {
                        this.handleSetChild(row,res.data.data)
                    });
            },

            //tool栏按钮权限控制
            handleGetBtn(){
                let conf = {
                    add: {
                        text: '添加子菜单',
                            type: 'primary',
                            icon: 'el-icon-plus',
                    },
                    edit:{
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },
                    delete:{
                        type: 'danger',
                            icon: 'el-icon-delete',
                    }
                };
                let result = {};
                this.$store.state.user.auth.menu.forEach(item=>{
                    if (item in conf){
                        result[item] = conf[item];
                    }
                });
                return result;
            }
        }
    }
</script>