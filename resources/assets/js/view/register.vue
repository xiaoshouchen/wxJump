<template>
    <div class="login">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即注册</el-button>
                <el-button @click="handleLogin">返回登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {register} from '@/api/user'
    export default {
        data() {
            return {
                form: {
                    username: null,
                    password: null,
                    mobile:null,
                    state:0
                }
            }
        },
        methods: {
            onSubmit() {
                register(this.form) ;
                this.$router.push('/login');
            },
            handleLogin(){
                this.$router.push('/login');
            }
        }
    }
</script>
<style>
    .login{
        width: 450px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
</style>