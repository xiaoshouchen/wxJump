<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <template v-if="this.userAuth.disable">
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelAll">禁用所选项</el-button>
                    </template>

                    <template v-if="this.userAuth.add">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd()">添加{{page_name}}</el-button>
                    </template>

                    <template v-if="this.userAuth.userGiveRole">
                        <el-button type="success" size="small" icon="el-icon-plus" @click="userGiveRole">用户赋权</el-button>
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

        <Table ref="table" :url="url" :columns="columns" v-on:tools="handleTools"></Table>

        <el-dialog :title="'添加'+page_name" :visible.sync="addFormVisible">
            <Add ref="addForm" v-if="addFormVisible" v-on:close="addFormVisible = false"
                 v-on:render="this.handleRenderTable"></Add>
        </el-dialog>

        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="edit_id" v-if="editFormVisible" v-on:close="editFormVisible = false"
                  v-on:render="this.handleRenderTable"></Edit>
        </el-dialog>

        <el-dialog :title="'用户赋予权限'" :visible.sync="userGiveRoleVisible">
            <giveRoleAdd :ids="user_ids" ref="giveRole"
                         v-if="userGiveRoleVisible"
                         v-on:close="userGiveRoleVisible = false"
                         v-on:render="this.handleRenderTable">
            </giveRoleAdd>
        </el-dialog>

        <el-dialog :title="'编辑用户角色'" :visible.sync="userGiveRoleEditVisible">
            <giveRoleEdit :id="user_id" :ids="user_ids" ref="giveRole"
                          v-if="userGiveRoleEditVisible"
                          v-on:close="userGiveRoleEditVisible = false"
                          v-on:render="this.handleRenderTable">
            </giveRoleEdit>
        </el-dialog>

    </div>
</template>

<script>
    import Table from "../../components/public/table";
     import Add from "./add";
      import Edit from "./edit";
  import giveRoleAdd from "./giveRoleAdd";
    import giveRoleEdit from "./giveRoleEdit";
    import list_page from "../../mixins/list_page";
    import {getConfigArray} from "../../config/sys_config";
   import {delUser, DisableUser, editUser} from "../../api/user"

    export default {
        components: {Table, Add, Edit, giveRoleAdd, giveRoleEdit},
        mixins: [list_page],
        data() {
            return {
                page_name: '用户',
                url: 'user/list',
                addFormVisible: false,
                editFormVisible: false,
                userGiveRoleVisible: false,
                userGiveRoleEditVisible: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'username',
                        label: '用户名',
                        search: true,
                    },
                    {
                        prop: 'mobile',
                        label: '手机号码',
                        search: true,
                    },
                    {
                        prop: 'email',
                        label: '邮箱',
                        search: true,
                    },
                    {
                        prop: 'sex',
                        convert: true,
                        label: '性别',
                        filter: {
                            data: getConfigArray('sex')
                        }
                    },
                    {
                        prop: 'type',
                        convert: true,
                        label: '用户类型',
                        filter: {
                            data: getConfigArray('user_type')
                        }
                    },
                    {
                        label: '用户状态',
                        filter: {
                            data: getConfigArray('user_state')
                        },
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                if(this.$store.state.user.auth.user.indexOf('disable') > -1){
                                    return createElement('el-switch', {
                                        attrs: {
                                            value: this.row.state
                                        },
                                        props: {
                                            "active-color": "#13ce66",
                                            "inactive-color": "#ff4949",
                                            "active-value": 1,
                                            "inactive-value": 0,
                                            "inactive-text": "禁用",
                                            "active-text": "正常",
                                        },
                                        nativeOn: {
                                            click: () => {
                                                if (this.row.state === 0) {
                                                    this.row.state = 1;
                                                } else {
                                                    this.row.state = 0;
                                                }
                                                editUser(this.row, this.row.id)
                                            }
                                        },
                                    })
                                } else {
                                    return createElement('span','无此操作权')
                                }
                            }
                        }
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                select: [],
                user_ids: [],
                userAuth:[
                    {
                        add:false,
                        edit:false,
                        delete:false,
                        disable:false,
                        userGiveRole:false,
                        editUserRole:false,
                    },
                ]
            }
        },
        created:function(){
            let menu_Auth = this.$store.state.user.auth.user;
            menu_Auth.forEach((value)=> {
                console.log(value);
                if(value === 'add') {
                    this.userAuth.add = true
                }else if(value === 'edit') {
                    this.userAuth.edit = true
                }else if(value === 'delete') {
                    this.userAuth.delete = true
                }else if(value === 'userGiveRole') {
                    this.userAuth.userGiveRole = true
                }else if(value === 'editUserRole') {
                    this.userAuth.editUserRole = true
                }else if(value === 'disable') {
                    this.userAuth.disable = true
                }
            })
        },

        methods: {
            // 工具栏事件处理
            handleTools(type, index, row) {
                if (type == 'edit') {
                    this.edit_id = row.id;
                    this.editFormVisible = true;
                } else if (type == 'editUserRole') {
                    this.user_id = row.id;
                    this.userGiveRoleEditVisible = true;
                } else if (type == 'delete') {
                    //删除数据
                    delUser(row.id).then((response) => {
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                }
            },
            handleAdd() {
                this.addFormVisible = true;
            },
            handleDelAll(value) {
                //禁用多选用户操作
                let ids = this.handleGetSelection('id');
                DisableUser(ids).then((response) => {
                    //重载表格
                    this.handleRenderTable();
                    //响应消息
                    this.$message.success(response.data.msg);
                });
            },
            userGiveRole() {
                let ids = this.handleGetSelection('id');
                if (ids.length < 1) {
                    this.$message.error('请至少选择一项再进行操作');
                    return false;
                }
                this.user_ids = ids;
                this.userGiveRoleVisible = true;
            },

            //tool栏按钮权限控制
            handleGetBtn(){
                let conf = {
                    // 键名对应 handleTools 中的type参数
                    edit: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },
                    editUserRole: {
                        type: 'warning',
                        icon: 'el-icon-edit',
                        text: '修改用户组'
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    }
                };
                let result = {};
                this.$store.state.user.auth.user.forEach(item=>{
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return result;
            },
            // 禁用用户的控制权限
        }
    }
</script>
