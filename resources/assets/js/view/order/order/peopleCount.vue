<template>
    <div>
        <div class="container">
            <span class="sing">员工总订单</span>
            <table class="table count-table">
                <thead>
                    <tr>
                        <th>员工名称</th>
                        <th>订单数量</th>
                        <th>订单总额(元)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in count.total" :key="index">
                        <td>{{item.source}}</td>
                        <td>{{item.order_count}}</td>
                        <td>¥{{item.order_total_price_count}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="container">
            <span class="sing">员工今日订单</span>
            <table class="table count-table">
                <thead>
                <tr>
                    <th>员工名称</th>
                    <th>订单数量</th>
                    <th>订单总额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in count.today" :key="index">
                    <td v-if="item.source">{{item.source}}</td>
                    <td v-else>今日暂无记录</td>
                    <td>{{item.order_count}}</td>
                    <td v-if="item.order_total_price_count">¥{{item.order_total_price_count}}</td>
                    <td v-else>¥ 0</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {peopleCount} from '@/api/goods'
    export default {
        name: "peopleCount",
        data(){
            return {
                count:[],
            }
        },
        created(){
            peopleCount().then((response)=>{
                this.count = response.data.data;
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
        text-align: center;
        background-color: #f9f9f9;
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
        margin-right:15px
    }
    td:last-child {
        color:green;
    }
</style>