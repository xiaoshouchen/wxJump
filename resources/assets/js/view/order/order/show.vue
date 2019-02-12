<template>
    <div>
        <table class="table table-bordered">
            <tr>
                <td class="table_head" align="right">订单号</td>
                <td>{{goodsOrder.order_num}}</td>
            </tr>
            <tr>
                <td class="table_head" align="right">订购时间</td>
                <td style="color:green">{{goodsOrder.created_at}}</td>
            </tr>
            <tr>
                <td class="table_head" align="right">订购产品</td>
                <td>{{goodsOrder.goods_name}}</td>
            </tr>
            <tr>
                <td class="table_head" align="right">订购套餐</td>
                <td>{{goodsOrder.meal_name}}</td>
            </tr>
            <tr>
                <td class="table_head" align="right">选择尺码</td>
                <td>{{goodsOrder.size_name}}</td>
            </tr>
            <tr>
                <td class="table_head" align="right">订购数量</td>
                <td>
                    <el-tag>
                        {{goodsOrder.num}}
                    </el-tag>
                </td>
            </tr>
            <tr>
                <td class="table_head" align="right">总金额</td>
                <td style="color:red;">¥&nbsp;{{goodsOrder.order_total_price}}</td>
            </tr>
            <tr>
                <td class="table_head" align="right">姓名</td>
                <td>
                    <el-input v-model="goodsOrder.name" placeholder="请输入收货人姓名"></el-input>
                </td>
            </tr>
            <tr>
                <td class="table_head" align="right">手机号码</td>
                <td>
                    <el-input v-model="goodsOrder.phone" placeholder="请输入联系人手机号"></el-input>
                </td>
            </tr>
            <tr>
                <td class="table_head" align="right">收货地址</td>
                <td>
                    <el-input v-model="goodsOrder.address" placeholder="请输入收货地址"></el-input>
                </td>
            </tr>
            <tr>
                <td class="table_head" align="right">付款方式</td>
                <td>
                    <el-tag type="success">
                        {{goodsOrder.paytype}}
                    </el-tag>
                </td>
            </tr>
            <tr>
                <td class="table_head" align="right">顾客留言</td>
                <td>{{goodsOrder.message}}</td>
            </tr>
            <tr>
                <td class="table_head" align="right">订单来源</td>
                <td>
                    <el-tag type="success">
                        {{goodsOrder.source}}
                    </el-tag>
                </td>
            </tr>
            <tr>
                <td class="table_head" align="right">下单地址</td>
                <td>
                    {{goodsOrder.source_url}}
                </td>
            </tr>
            <tr>
                <td class="table_head" align="right">保存修改</td>
                <td>
                    <el-button type="primary" @click="edit">点击修改</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {goodsOrderIdGet, goodsOrderIdUpdate} from "@/api/goods"

    export default {
        name: "show",
        data() {
            return {
                goodsOrder: [],
            }
        },
        created() {
            goodsOrderIdGet(this.id).then((response) => {
                this.goodsOrder = response.data.data;
            })
        },
        methods:{
            edit() {
                let postData = {
                    name:this.goodsOrder.name,
                    phone:this.goodsOrder.phone,
                    address:this.goodsOrder.address,
                };
                goodsOrderIdUpdate(this.id, postData).then((response)=>{
                    this.$message.success(response.data.msg)
                })
            }
        },
        props: ['id']
    }
</script>

<style scoped>
    .table_head {
        font-size: 16px;
        font-weight: 600;
        padding-right: 15px;
    }

    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
        border-spacing: 0;
        border-collapse: collapse;
        background-color: transparent;
    }

    .table-bordered {
        border: 1px solid #ddd;
    }

    td {
        border: 1px solid #ddd;
        line-height: 40px;
    }
</style>