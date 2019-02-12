<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <template v-if="this.roleAuth.disable">
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="handleSelect">禁用所选项</el-button>
                    </template>
                    <template  v-if="this.roleAuth.add">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加{{page_name}}</el-button>
                    </template>
                    <template v-if="this.roleAuth.GiveAuth">
                        <el-button type="success" size="small" icon="el-icon-info" @click="GiveAuth">批量角色赋权</el-button>
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
            <Add ref="addForm"  v-if="addFormVisible" v-on:close="addFormVisible = false" v-on:render="this.handleRenderTable"></Add>
        </el-dialog>
        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="tools_id" v-if="editFormVisible" v-on:close="editFormVisible = false" v-on:render="this.handleRenderTable"></Edit>
        </el-dialog>
        <el-dialog :title="'角色赋权'" :visible.sync="GiveAuthFormVisible">
            <RoleTree ref="RoleGiveAuth" :ids="ids" v-if="GiveAuthFormVisible" v-on:close="GiveAuthFormVisible = false"></RoleTree>
        </el-dialog>
        <el-dialog :title="'编辑角色权限'" :visible.sync="EditRoleAuthFormVisible">
            <EditRoleAuth ref="RoleGiveAuth" :id="tools_id" v-if="EditRoleAuthFormVisible" v-on:close="EditRoleAuthFormVisible = false"></EditRoleAuth>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "../../../components/public/table";
    import Add from "./add";
    import Edit from "./edit";
    import RoleTree from "./tree";
    import EditRoleAuth from "./edit_role_auth";
    import list_page from "../../../mixins/list_page";
    import {getConfigArray} from "../../../config/sys_config";
    import {delRole,DisableRole,editRole} from "../../../api/user"

    export default {
        components: {Table, Add, Edit,RoleTree,EditRoleAuth},
        mixins: [list_page],
        data() {
            return {
                page_name: '角色',
                url: '/role/list',
                addFormVisible: false,
                editFormVisible: false,
                GiveAuthFormVisible:false,
                EditRoleAuthFormVisible:false,
                ids:[],
                // Table详细配置参考~/docs/vue/table.md
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'name',
                        label: '角色名',
                        search: true,
                    },
                    {
                        prop: 'description',
                        label: '描述',
                        search: true,
                    },
                    // {
                    //     prop: 'state',
                    //     convert: true,
                    //     label: '角色状态',
                    //     filter:{
                    //         data:getConfigArray('role_state')
                    //     },
                    //     render:{
                    //         props: {
                    //             row: Object         // 接受当前行参数
                    //         },
                    //         render: function (createElement) {
                    //             if (this.$store.state.user.auth.role.indexOf('disable') > -1){
                    //                 return createElement('el-switch',{
                    //                     attrs:{
                    //                         value:this.row.state
                    //                     },
                    //                     props: {
                    //                         "active-color":"#13ce66",
                    //                         "inactive-color":"#ff4949",
                    //                         "active-value":1,
                    //                         "inactive-value":0,
                    //                         "inactive-text":"禁用",
                    //                         "active-text":"正常",
                    //                     },
                    //                     nativeOn: {
                    //                         click:()=>{
                    //                             if (this.row.state === 0){
                    //                                 this.row.state = 1;
                    //                             } else{
                    //                                 this.row.state = 0;
                    //                             }
                    //                             editRole(this.row,this.row.id)
                    //                         }
                    //                     },
                    //                 })
                    //             } else {
                    //                 return createElement('span','无此操作权限')
                    //                 }
                    //             }
                    //         }
                    // },
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
                roleAuth:[
                    {
                        add:false,
                        edit:false,
                        delete:false,
                        disable:false,
                        GiveAuth:false,
                        edit_auth:false,
                    },
                ]
            }
        },
        created:function(){
            let role_Auth = this.$store.state.user.auth.role;
            role_Auth.forEach((value)=> {
                if(value === 'add') {
                    this.roleAuth.add = true
                }else if(value === 'edit') {
                    this.roleAuth.edit = true
                }else if(value === 'delete') {
                    this.roleAuth.delete = true
                }else if(value === 'disable') {
                    this.roleAuth.disable = true
                }else if(value === 'GiveAuth') {
                    this.roleAuth.GiveAuth = true
                }else if(value === 'edit_auth') {
                    this.roleAuth.edit_auth = true
                }
            })
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                this.tools_id = row.id;
                if (type == 'edit'){
                    this.editFormVisible = true;
                } else if (type == 'delete') {
                    delRole(row.id).then((response)=>{
                        this.handleDeleteRow(index);
                        this.$message.success(response.data.msg);
                    });
                }  else if (type == 'edit_auth') {
                    this.EditRoleAuthFormVisible = true;
                } else {
                    console.error('Tools Event:'+type+' Not found');
                }
            },
            handleAdd(){
              this.addFormVisible = true;
            },
            handleSelect() {
                //禁用多选用户操作
                var ids =  this.handleGetSelection('id');
                if ( ids.length === 0){
                    this.$message.error('请选择一个选项后再进行进行操作');
                    return false;
                }
                DisableRole(ids).then((response)=>{
                    //重载表格
                    this.handleRenderTable();
                    //响应消息
                    this.$message.success(response.data.msg);
                });
            },
            GiveAuth(){
                this.ids = this.handleGetSelection('id');
                if ( this.ids.length === 0){
                    this.$message.error('请选择一个选项后再进行进行操作');
                    return false;
                }
                let state =  this.handleGetSelection('state');
                //展示树形框
                this.GiveAuthFormVisible = true;
                console.log(state);
                state.forEach(item=>{
                    //所选择的角色里面包含被禁用的角色,被禁用的角色不允许赋值
                    if (item === 0){
                        this.GiveAuthFormVisible = false;
                        this.$message.error('选择的选项中包含被禁用项,被禁用项不允许被操作');
                    }
                });
            },
            //编辑角色权限
            EditRoleAuth(id){
                this.EditRoleAuthFormVisible = true;
            },

            //tool栏按钮权限控制
            handleGetBtn(){
                let conf =  {
                    edit: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },
                    edit_auth:{
                        type: 'success',
                        icon: 'el-icon-edit',
                        text: '编辑角色权限'
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    }
                };
                let result = {};
                this.$store.state.user.auth.role.forEach(item=>{
                    if (item in conf) {
                        result[item] = conf[item];
                    }

                });
                return conf;
            }
        }
    }
</script>
