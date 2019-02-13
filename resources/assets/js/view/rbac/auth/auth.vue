<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <template v-if="this.authAuth.add">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加{{page_name}}</el-button>
                    </template>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入要搜索的内容..." size="small" v-model="search.value" class="input-with-select">
                        <el-select style="width: 110px;" size="small" v-model="search.field" slot="prepend" placeholder="请选择">
                            <el-option v-for="item in columns" :key="item.prop" v-if="item.search" :label="item.label" :value="item.prop"></el-option>
                        </el-select>
                        <el-button size="small" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <Table ref="table" :url="url" :columns="columns" v-on:tools="handleTools"></Table>

        <el-dialog :title="'添加'+page_name" :visible.sync="addFormVisible">
            <Add ref="addForm" v-if="addFormVisible" v-on:close="addFormVisible = false" v-on:render="this.handleRenderTable"></Add>
        </el-dialog>
        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="edit_id" v-if="editFormVisible" v-on:render="this.handleRenderTable" v-on:close="editFormVisible = false"></Edit>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "../../../components/public/table";
    import Add from "./add";
    import Edit from "./edit";
    import list_page from "../../../mixins/list_page";
    import {getConfigArray} from "../../../config/sys_config";
    import {delAuth} from "../../../api/user"

    export default {
        components: {Table, Add, Edit},
        mixins: [list_page],
        data() {
            return {
                page_name: '权限',
                url: 'auth/list',
                addFormVisible: false,
                editFormVisible: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'name',
                        label: '名称',
                        search: true,
                    },
                    {
                        prop: 'description',
                        label: '描述',
                        search: true,
                    },
                    {
                        prop: 'keyword',
                        label: '唯一标识',
                        search: true,
                    },
                    {
                        prop: 'type',
                        convert: true,
                        label: '类型',
                        filter:{
                            data:getConfigArray('auth_type')
                        }
                    },
                    {
                        prop: 'sort',
                        label: '排序',
                        sort: true,
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                authAuth:[
                    {
                        add:false,
                        edit:false,
                        delete:false,
                    },
                ]
            }
        },
        created:function(){
            let auth_Auth = this.$store.state.user.auth.auth;
            auth_Auth.forEach((value)=> {
                if(value === 'add') {
                    this.authAuth.add = true
                }else if(value === 'edit') {
                    this.authAuth.edit = true
                }else if(value === 'delete') {
                    this.authAuth.delete = true
                }
            })
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'edit'){
                    //编辑数据
                    this.edit_id = row.id;
                   //展示编辑弹窗
                   this.editFormVisible = true;
                }else if (type == 'delete') {
                    //删除数据
                    delAuth(row.id).then((response)=>{
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                }else{
                    console.error('Tools Event:'+type+' Not found');
                }
            },
            handleAdd(){
                //弹出新增窗口
                this.addFormVisible = true;
            },
            //tool栏按钮权限控制
            handleGetBtn(){
                let conf =  {
                    edit: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    }
                };
                let result = {};
                this.$store.state.user.auth.auth.forEach(item=>{
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return result;
            }
        }
    }
</script>
