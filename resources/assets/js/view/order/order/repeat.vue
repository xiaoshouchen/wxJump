<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="重复姓名" :lazy="true" name="first">
            <div>
                <table>
                    <tr>
                        <th>
                           名称
                        </th>
                        <th>次数</th>
                    </tr>
                    <tr v-for="(item,index) in repeatName">
                        <td class="cursor" :key="index" @click="repeatNameClick">{{item[1]}}</td>
                        <td>{{item[0]}}</td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="重复手机号码" :lazy="true"  name="second">
            <div>
                <table>
                    <tr>
                        <th>
                            名称
                        </th>
                        <th>次数</th>
                    </tr>
                    <tr v-for="(item,index) in repeatPhone">
                        <td class="cursor" :key="index"  @click="repeatPhoneClick">{{item[1]}}</td>
                        <td>{{item[0]}}</td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import {repeatCheckAPI} from "@/api/goods"
    export default {
        data() {
            return {
                activeName: 'first',
                repeatName:'',
                repeatPhone:'',
            };
        },
        created(){
            repeatCheckAPI().then((response)=>{
                this.repeatName = response.data.data.name;
                this.repeatPhone = response.data.data.phone;
            })
        },
        methods: {
            repeatPhoneClick(e){
                this.$emit('keyword', {phone:e.target.innerHTML});
                this.$emit('close')
            },
            repeatNameClick(e){
                this.$emit('keyword', {name:e.target.innerHTML});
                this.$emit('close')
            }

        }
    };
</script>

<style scoped>
    td {
        border: 1px solid #000000;
        line-height: 40px;
        background-color: #f9f9f9;
        text-align: center;
    }
    th {
        text-align: center;
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
    .cursor {
       cursor:pointer
    }
</style>