<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <template v-if=" this.articleAuth.add">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加{{page_name}}</el-button>
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
        <Table ref="table" :url="url" :columns="columns" :checkbox="false" v-on:tools="handleTools"></Table>

        <el-dialog :title="'编辑'+page_name" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="edit_id" v-if="editFormVisible" v-on:render="this.handleRenderTable"
                  v-on:close="editFormVisible = false"></Edit>
        </el-dialog>
        <el-dialog class="through" title="文章链接" :visible.sync="articleURL">
            <Extension ref="editForm" :id="articleId" v-if="articleURL"
                  v-on:close="articleURL = false"></Extension>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "../../components/public/table";
    import Add from "./publish";
    import Edit from "./edit";
    import Extension from './Extension'
    import list_page from "../../mixins/list_page";
    import {article_del} from "@/api/article"

    export default {
        components: {Table, Add, Edit, Extension},
        mixins: [list_page],
        data() {
            return {
                page_name: '文章',
                url: 'article/list',
                addFormVisible: false,
                editFormVisible: false,
                articleURL: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'title',
                        label: '文章标题',
                        search: true,
                    },
                    {
                        prop: 'author',
                        label: '文章作者',
                        width: '180',
                    },
                    {
                        prop: 'status',
                        label: 'appId/音乐/封面',
                        width: '120',
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                                return createElement('div', [
                                    createElement('span', {
                                        style: {
                                            color: this.row.status.appid.color,
                                            fontSize: '30px',
                                            padding: '5px'
                                        },
                                    }, this.row.status.appid.status),
                                    createElement('span', {
                                        style: {
                                            color: this.row.status.music.color,
                                            fontSize: '30px',
                                            padding: '5px'
                                        },
                                    }, this.row.status.music.status),
                                    createElement('span', {
                                        style: {
                                            color: this.row.status.photo.color,
                                            fontSize: '30px',
                                            padding: '5px'
                                        },
                                    }, this.row.status.photo.status),
                                ])
                            }
                        }
                    },
                    {
                        prop: 'other',
                        label: '箭头返回/按键返回/立即跳转',
                        width: '180',
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                                return createElement('div', [
                                    createElement('span', {
                                        style: {
                                            color: this.row.other.arrow.color,
                                            fontSize: '30px',
                                            paddingLeft: '20px',
                                        },
                                    }, this.row.other.arrow.status),
                                    createElement('span', {
                                        style: {
                                            color: this.row.other.physics.color,
                                            fontSize: '30px',
                                            paddingLeft: '20px',
                                        },
                                    }, this.row.other.physics.status),
                                    createElement('span', {
                                        style: {
                                            color: this.row.other.right_now.color,
                                            fontSize: '30px',
                                            paddingLeft: '20px',
                                        },
                                    }, this.row.other.right_now.status),
                                ])
                            }
                        }
                    },
                    {
                        prop: 'click',
                        label: '点击量',
                        sort: true,
                        width: '100'
                    },
                    {
                        prop: 'publish_time',
                        label: '发布日期',
                        sort: true,
                        width: '120'
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                articleAuth: [
                    {
                        add: false,
                        edit: false,
                        delete: false,
                    },
                ],
                options: [],
                selectedOptions: [],
            }
        },
        created: function () {
            let article_Auth = this.$store.state.user.auth.article_list;
            article_Auth.forEach((value) => {
                if (value === 'add') {
                    this.articleAuth.add = true;
                    return true;
                }
                if (value === 'edit') {
                    this.articleAuth.edit = true;
                    return true;
                }
                if (value === 'delete') {
                    this.articleAuth.delete = true;
                    return true;
                }
            });
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'edit') {
                    //编辑数据
                    this.handleEdit(row.id);
                } else if (type == 'delete') {
                    //删除数据
                    article_del(row.id).then((response) => {
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else if (type == 'url'){
                    this.articleId = row.id;
                    this.articleURL = true;
                } else {
                    console.error('Tools Event:' + type + ' Not found');
                }
            },
            handleAdd() {
                //跳转到发布文章页面
                this.$router.push('/publish_article');
            },
            handleEdit(id) {
                //跳转到文章编辑页面,带上需要编辑的文章id
                this.$router.push({
                    name: 'article_edit',
                    params: {
                        id: id
                    }
                })
            },
            //过滤文章分类
            handleChange(value) {
                this.handleSetFilter('where', {category: value[value.length - 1]});
                this.handleRenderTable();
            },
            //tool栏按钮权限控制
            handleGetBtn() {
                let conf = {
                    edit: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    },
                    url:{
                        type: 'success',
                        icon: 'el-icon-share',
                    }
                };
                let result = {};
                this.$store.state.user.auth.article_list.forEach(item => {
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return result;
            }
        }
    }
</script>

<style scoped>
    .el-input__inner {
        height: 35px;
    }
    .through >>>.el-dialog__body {
        padding: 45px 20px;
    }
</style>
