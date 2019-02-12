<template>
    <el-form ref="form"  :rules="rules" :model="form" label-width="80px" v-loading="loading">
        <el-form-item label="角色名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {editRole} from "../../../api/user"
    import {editCreateRole} from "../../../api/user"
    import form_page from '@/mixins/form_page'
    export default {
        mixins: [form_page],
        name: "add",
        data() {
            return {
                loading:false,
                menu_list:null,
                form: {
                    name:'',
                    description: '',
                    sort: 1000,
                },
                rules: {
                    name: [
                        { required: true, message: '角色名称为必填项目', trigger: 'blur' },
                    ],
                }
            }
        },
        props:['id'],
        created:function(){
            editCreateRole(this.id).then((response)=>{
                this.form = response.data.data;
            })
        },
        methods: {
            onSubmit(form) {
                if(this.handleValid()){
                    this.handleSubmit(editRole(this.form,this.id));
                }

            },
            close(){
                this.$emit('close');
            }
        }

    }
</script>

<style scoped>

</style>