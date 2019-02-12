<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <template v-if=" this.goodsListAuth.add">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加商品信息</el-button>
                    </template>
                    <template v-if=" this.goodsListAuth.delete">
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="handleSelect">删除商品信息</el-button>
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
        <el-dialog title="推广链接" :visible.sync="extension" class="through">
            <extensionDlog ref="editForm"
                           :id="id"
                    v-if="extension"
                    v-on:close="extension = false">
            </extensionDlog>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import extensionDlog from "./extension"
    import list_page from "@/mixins/list_page";
    import {getConfigArray} from "@/config/sys_config";
    import {goodsIdDelete, goodsBatchDelete} from "@/api/goods"

    export default {
        components: {Table, extensionDlog},
        mixins: [list_page],
        data() {
            return {
                url: 'goods',
                extension:false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sort: true,
                        width: '80'
                    },
                    {
                        prop: 'goods_title',
                        label: '商品标题(品名)',
                        search: true,
                    },
                    {
                        prop: 'is_up',
                        label: '是否上架',
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                                return createElement('span', {
                                        style: {
                                            color: this.row.is_up_name.color,
                                            fontSize: '30px',
                                            padding: '5px'
                                        },
                                    }, this.row.is_up_name.status)

                            }
                        }
                    },
                    {
                        prop: 'price',
                        label: '价格',
                    },
                    {
                        prop: 'template',
                        label: '使用模板',
                    },
                    {
                        prop: 'created_at',
                        label: '发布时间',
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                goodsListAuth:[
                    {
                        add:false,
                        delete:false,
                    }
                ]
            }
        },
        created: function () {
            let goodsListAuth = this.$store.state.user.auth.goods_list;
            goodsListAuth.forEach((value) => {
                if (value === 'delete') {
                    this.goodsListAuth.delete = true;
                }
                if (value === 'add') {
                    this.goodsListAuth.add = true;
                }
            });
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'edit') {
                    this.$router.push({
                        path:'/edit_goods',
                        name:"edit_goods",
                        params: {
                            id: row.id,
                        }
                    });
                }else if (type == 'delete') {
                    //删除数据
                    goodsIdDelete(row.id).then((response)=>{
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else if (type == 'extension') {
                    // this.$router.push({
                    //     path:'/edit_goods',
                    //     name:"edit_goods",
                    //     params: {
                    //         id: row.id,
                    //         sub:'fourth'
                    //     }
                    // });
                    this.id = row.id;
                    this.extension = true;

                }
                else{
                    console.error('Tools Event:'+type+' Not found');
                }
            },
            handleAdd(){
                //弹出新增窗口
                this.$router.push('/publish_goods');
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
                    },
                    extension: {
                        type: 'success',
                        text:"推广链接",
                        icon: 'el-icon-share',
                    },


                };
                let result = {};
                this.$store.state.user.auth.goods_list.forEach(item=>{
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return result;
            },

            //批量删除
            handleSelect() {
                //禁用多选用户操作
                let ids = this.handleGetSelection('id');
                if (ids.length === 0) {
                    this.$message.error('请选择一个选项后再进行进行操作');
                    return false;
                }
                goodsBatchDelete({id:ids}).then((response) => {
                    //重载表格
                    this.handleRenderTable();
                    //响应消息
                    this.$message.success(response.data.msg);
                });
            },
        }
    }
</script>

<style scoped>
    .through >>> .el-dialog__body {
        padding: 45px 20px;
    }
</style>
