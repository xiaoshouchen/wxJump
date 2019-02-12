<template>
    <div class="login">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="手机号">
                <el-input v-model="form.mobile "></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <!--<el-form-item label="">-->
                <!--<el-checkbox-group v-model="form.type">-->
                    <!--<el-checkbox label="记住密码" name="type"></el-checkbox>-->
                <!--</el-checkbox-group>-->
                <!--<router-link to="/for">忘记密码？</router-link>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即登录</el-button>
                <!--<el-button @click="handleRegister">注册账户</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                form: {
                    mobile : '',
                    password: '',
                }
            }
        },
        methods: {
            ...mapActions([
                'handleLogin',
            ]),
            onSubmit() {
                this.handleLogin(this.form).then(res => {
                    if (res.code == 0){
                        this.$message.success('登陆成功');
                        //window.location.reload('http://www.jzrpsp.com/admin');
                        this.$router.push('/')
                    } else{
                        this.$message.error('登陆失败');
                    }
                })
            },
            handleRegister(){
                this.$router.push('/register')
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