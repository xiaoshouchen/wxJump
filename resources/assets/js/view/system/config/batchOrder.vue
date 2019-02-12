<template>
    <div style="width: 30%;">
        <el-form ref="form" :model="batchForm" label-width="80px" size="mini">
            <el-form-item label="状态">
                <el-select v-model="batchForm.value.status" placeholder="请选择">
                    <el-option
                            v-for="item in option"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="限定数量">
                <el-input v-model="batchForm.value.number" placeholder="请输入限定数量"></el-input>
                <span style="color: red">同一手机和IP一天可以下几次订单</span>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">保存配置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {config_get, config_add, config_update} from '@/api/system'
    export default {
        data() {
            return {
                option:[
                    {
                        label:'关闭',
                        value:'0'
                    },
                    {
                        label:'开启',
                        value:'1'
                    }
                ],
                batchForm: {
                    keyword: 'batchOrder',
                    value: {
                        status: '0',
                        number: '2',
                    },
                    type: 'json',
                    desc: '防刷订单配置',
                    pid: 0
                },
                status:'add'
            };
        },
        created(){
            config_get('batchOrder').then((response)=>{
                if (response.data.status != false) {
                    this.batchForm.value = response.data.data;
                    this.status = 'update'
                } else {
                    this.$message.info('没有配置过防刷信息')
                }
            })
        },
        methods: {
            onSubmit() {
                if (this.status == 'add') {
                    config_add(this.batchForm).then((response) => {
                        this.$message.success(response.data.message);
                    });
                }
                if (this.status == 'update') {
                    config_update(1, this.batchForm).then((response) => {
                        this.$message.success(response.data.message);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>