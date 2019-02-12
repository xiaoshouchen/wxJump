<template>
    <div style="width: 30%;">
        <el-form ref="form" :model="wxForm" label-width="80px" size="mini">
            <el-form-item label="appId">
                <el-input v-model="wxForm.value.appid" placeholder="请输入appId"></el-input>
            </el-form-item>
            <el-form-item label="secret密匙">
                <el-input v-model="wxForm.value.secret" placeholder="请输入appId对应的密匙"></el-input>
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
                wxForm: {
                    keyword: 'wx',
                    value: {
                        appid: '',
                        secret: '',
                    },
                    type: 'json',
                    desc: '微信配置',
                    pid: 0
                },
                status: 'add',
            };
        },
        created() {
            config_get('wx').then((response) => {
                if (response.data.status != false) {
                    this.wxForm.value = response.data.data;
                    this.status = 'update'
                } else {
                    this.$message.info('没有配置过微信信息')
                }
            })
        },
        methods: {
            onSubmit() {
                if (this.status == 'add') {
                    config_add(this.wxForm).then((response) => {
                        this.$message.success(response.data.message);
                    });
                }
                if (this.status == 'update') {
                    config_update(1, this.wxForm).then((response) => {
                        this.$message.success(response.data.message);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>