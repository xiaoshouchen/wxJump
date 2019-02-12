<template>
    <div>
        状态:
        <el-select v-model="value" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" @click="submitForm">主要按钮</el-button>
    </div>
</template>

<script>
    import {batchEditStatus} from '@/api/goods'

    export default {
        name: "updateOrder",
        data(){
            return {
                value:"",
                options:[
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
            }
        },
        methods:{
            submitForm(){
                batchEditStatus({id:this.id,status:this.value}).then((response)=>{
                    this.$message.success(response.data.msg);
                    this.$emit('render');
                    this.$emit('close');

                })
            }
        },
        props:['id']
    }
</script>

<style scoped>

</style>