<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="不填写为不改变密码值"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
            <Upload :img="form.avatar" v-on:img-success="success"></Upload>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                        v-for="item in sexs"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {editUser,editCreateUser} from "@/api/user"
    import {getConfigArray} from '@/config/sys_config'
    import Upload from '@/components/public/upload'
    import form_page from '@/mixins/form_page'
    export default {
        mixins: [form_page],
        name: "edit",
        data() {
            return {
                sexs:getConfigArray('sex'),
                loading:false,
                menu_list:null,
                form: {
                    username:'',
                    password: '',
                    mobile: '',
                    email: '',
                    avatar: '',
                    sex: '',
                },
                rules: {
                    username: [
                        { required: true, message: '用户名为必填项', trigger: 'blur' },
                    ],
                    mobile:[
                        {required: true, message: '联系电话为必填项', trigger: 'blur'},
                        {validator:function(rule,value,callback){
                                if(/^1[34578]\d{9}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur'}
                        ],
                    email:[
                        {required: true,message: '邮箱为必填项', trigger: 'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    avatar:[{
                        required: true, message: '头像必须上传', trigger: 'blur'
                    }],
                    sex:[{
                        required: true, message: '性别关系必须选择', trigger: 'blur'
                    }],
                }
            }
        },
        components:{
            Upload
        },
        props:['id'],
        created:function(){
            editCreateUser(this.id).then((response)=>{
                this.form = response.data.data;
            })
        },
        methods: {
            onSubmit(form) {
                if(this.handleValid()){
                    this.handleSubmit(editUser(this.form,this.id));
                }

            },
            success(value){
                this.form.avatar = value;
            },
            close(){
                this.$emit('close');
            }
        }

    }
</script>

<style scoped>

</style>