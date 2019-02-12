<template>
    <Table ref="table"
           :url="url"
           :columns="columns"
           :checkbox="false"
           v-on:tools="handleTools">
    </Table>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    import {recovery_Order,recovery_OrderDel} from "@/api/recovery"

    export default {
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                url: 'recoveryOrder',
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80'
                    },
                    {
                        prop: 'meal_name',
                        label: '购买产品+数量+套餐',
                        width: 350,
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('p', {}, '订单号:' + this.row.order_num),
                                    createElement('p', {
                                        style: {
                                            color: "green"
                                        }
                                    }, "下单时间:" + this.row.created_at),
                                    createElement('p', {}, this.row.goods_name),
                                    createElement('p', {}, this.row.meal_name + "×" + this.row.num),
                                ]);

                            }
                        }
                    },
                    {
                        prop: 'paytype',
                        label: '支付方式',
                        width: 100,
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('el-tag', {
                                        attr: {
                                            type: "success"
                                        }
                                    }, this.row.paytype),
                                    createElement('p', {
                                        style: {
                                            color: "red"
                                        }
                                    }, "总额:" + this.row.order_total_price),
                                ]);
                            }
                        }
                    },
                    {
                        prop: 'name',
                        label: '收货人',
                        width: 115,
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('p', {}, this.row.name),
                                    createElement('p', {}, this.row.phone),
                                ]);
                            }
                        }
                    },
                    {
                        prop: 'address',
                        label: '地址',
                        width: 360,
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('p', {}, "地址:" + this.row.address),
                                    createElement('p', {}, "IP:" + this.row.ip),
                                ]);
                            }
                        }
                    },
                    {
                        prop: 'message',
                        label: '客户留言',
                    },
                    {
                        prop: 'source',
                        label: '订单来源',
                        width: 110,
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (createElement) {
                                return createElement('div', {}, [
                                    createElement('el-tag', {
                                        attr: {
                                            type: "info"
                                        }
                                    }, this.row.source),
                                ]);
                            }
                        }
                    },
                    {
                        prop: 'status',
                        label: '订单状态',
                        width: 120,
                        filter: {            // 是否可筛选,不需要筛选则不填此属性
                            multiple: false,                     // 是否可多选，默认为true
                            data: [
                                {
                                    value: '0',
                                    text: '未发货',
                                },
                                {
                                    value: '1',
                                    text: '已发货',
                                },
                                {
                                    value: '2',
                                    text: '无效信息',
                                },
                            ]
                        },
                        render: {
                            props: {
                                row: Object         // 接受当前行参数
                            },
                            render: function (h) {
                                return h('el-select', {
                                        props: {
                                            value: this.row.status,
                                            size: 'small',
                                            placeholder: '标记处理状态'
                                        },
                                    },
                                    [
                                        h('el-option', {props: {value: 0, label: '未发货'}}),
                                        h('el-option', {props: {value: 1, label: '已发货'}}),
                                        h('el-option', {props: {value: 2, label: '无效信息'}}),
                                    ]);
                            }
                        }
                    },
                    {
                      prop:'msg_del',
                      label: '删除原因',
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
            }
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'recovery') {
                    recovery_Order(row.id).then(response=>{
                        //成功响应动态移除表格项
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    });
                } else if (type == 'delete') {
                    //删除数据
                    recovery_OrderDel(row.id).then((response) => {
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
                        text:'恢复订单'
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                        text:'彻底删除'
                    }
                };
                let result = {};
                this.$store.state.user.auth.recoveryOrder.forEach(item => {
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
