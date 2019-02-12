<template>
    <div>
        <div class="container">
            <span class="sing">昨日统计:</span>
            <table class="count-table table">
                <thead>
                <tr>
                    <th align="center">购买来源</th>
                    <th align="center">订单数量</th>
                    <th align="center">购买总额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in OrderCount.Yesterday" :key="index">
                    <td align="center">{{item.source}}</td>
                    <td align="center">{{item.source_count}}</td>
                    <td align="center">¥ {{item.order_total_price_count}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="container">
            <span class="sing">今日统计:</span>
            <table class="count-table table">
                <thead>
                <tr>
                    <th>购买来源</th>
                    <th>订单数量</th>
                    <th>购买总额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in OrderCount.today" :key="index">
                    <td>{{item.source}}</td>
                    <td>{{item.source_count}}</td>
                    <td>¥ {{item.order_total_price_count}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div>
            <span class="sing">所有:</span>
            <table class="count-table table">
                <thead>
                <tr>
                    <th>购买来源</th>
                    <th>订单数量</th>
                    <th>购买总额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in OrderCount.all" :key="index">
                    <td>{{item.source}}</td>
                    <td>{{item.source_count}}</td>
                    <td>¥ {{item.order_total_price_count}}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    import {sourceCount} from "@/api/goods";
    export default {
        name: "sourceCount",
        components: {Table},
        mixins: [list_page],
        data(){
            return {
                OrderCount:{
                    today:[],
                    Yesterday:[],
                    all:[],
                }
            }
        },
        created(){
            sourceCount().then((response)=>{
                this.OrderCount = response.data.data;
                console.log(this.OrderCount.Yesterday);
            })
        }
    }
</script>

<style scoped>
    .sing {
        font-size: 16px;
        font-weight: 600;
    }
    .count-table {
        margin-top:10px;
    }
    td {
        border: 1px solid #000000;
        line-height: 40px;
        background-color: #f9f9f9;
        text-align: center;
    }
    th {
        text-align: center;
    }
    .table {
        width: 300px;
        max-width: 100%;
        margin-bottom: 20px;
        border-spacing: 0;
        border-collapse: collapse;
        background-color: transparent;
        margin-left: 10px;
    }
    .container {
        float: left;
        margin-right:15px;
    }
    td:last-child {
        color: green;
    }
</style>