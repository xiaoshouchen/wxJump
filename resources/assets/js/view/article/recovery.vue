<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
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
    </div>
</template>

<script>
    import Table from "../../components/public/table";
    import list_page from "../../mixins/list_page";
    import {recovery_list,recovery_article,recovery_del} from "@/api/recovery"

    export default {
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                page_name: '文章',
                url: '/recovery/list',
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
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('a', {
                                    attrs:{
                                        href: this.row.url_home,
                                        target: '_blank'
                                    },
                                    style:{
                                        textDecoration:'none'
                                    }
                                }, this.row.title)
                            }
                        }
                    },
                    {
                        prop: 'author',
                        label: '文章作者',
                        width: '180',
                    },
                    {
                        prop: 'category',
                        label: '分类',
                        width: '180'
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
                    },
                ],
                options: [],
                selectedOptions: [],
            }
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'recovery') {
                    recovery_article(row.id).then(response=>{
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else if (type == 'delete') {
                    //删除数据
                    recovery_del(row.id).then((response) => {
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else {
                    console.error('Tools Event:' + type + ' Not found');
                }
            },
            //tool栏按钮权限控制
            handleGetBtn() {
                let conf = {
                    recovery:{
                        type: 'warning',
                        icon: 'el-icon-refresh',
                        text:'恢复文章'
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                        text:'彻底删除'
                    }
                };
                let result = {};
                this.$store.state.user.auth.recovery.forEach(item => {
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return result;
            }
        }
    }
</script>

<style>
    .el-input__inner {
        height: 35px;
    }
</style>
