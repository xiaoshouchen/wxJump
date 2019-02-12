<template>
    <div>
        <!--月度统计-->
        <div class="container">
            <span class="sing">月度统计:</span>
            <table class="count-table">
                <thead>
                    <tr>
                        <th>月度统计</th>
                        <th>订单数量</th>
                        <th>订单金额(元)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(item, index) in count.monthCount" :key="index">
                        <td>{{index}}月</td>
                        <td>{{item.order_count}}</td>
                        <td v-if="item.order_total_price_count">¥{{item.order_total_price_count}}</td>
                        <td v-else>¥0</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--12天销量-->
        <div class="container">
            <span class="sing">12天销量:</span>
            <table class="count-table">
                <thead>
                <tr>
                    <th>日统计</th>
                    <th>订单数量</th>
                    <th>订单金额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(item, index) in count.dayCount" :key="index">
                    <td>{{item.day}}号</td>
                    <td>{{item.data.order_count}}</td>
                    <td v-if="item.data.order_total_price_count">¥{{item.data.order_total_price_count}}</td>
                    <td v-else>¥0</td>

                </tr>
                </tbody>
            </table>
        </div>

        <!--产品统计-->
        <div class="container">
            <span class="sing">产品统计:</span>
            <table class="count-table">
                <thead>
                <tr>
                    <th>产品名称</th>
                    <th>订单数量</th>
                    <th>订单金额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(item, index) in count.goodsNameCount" :key="index">
                    <td>{{item.goods_name}}</td>
                    <td>{{item.goods_name_count}}</td>
                    <td>¥{{item.order_total_price_count}}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!--省份统计-->
        <div class="container last">
            <span class="sing">省份统计:</span>
            <table class="count-table">
                <thead>
                <tr>
                    <th>所在地区</th>
                    <th>订单数量</th>
                    <th>订单金额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(item, index) in count.provinceCount" :key="index">
                    <td>{{item.province}}</td>
                    <td>{{item.order_count}}</td>
                    <td>¥{{item.order_total_price_count}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {zhCount} from '@/api/goods';
    export default {
        name: "zhCount",
        data(){
            return {
                count:[]
            }
        },
        created(){
            zhCount().then((resource)=>{
                this.count = resource.data.data;
                console.log(resource.data.data);
            })
        }
    }
</script>

<style scoped>
    td {
        border: 1px solid #000000;
        line-height: 40px;
        text-align: center;
        background-color: #f9f9f9;
    }
    table {
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
    .sing {
        font-size: 16px;
        font-weight: 600;
    }
    .count-table {
        margin-top:10px;
    }
    td:last-child {
        color:green;
    }
    .last>table {
        width: 100%;
    }
</style>