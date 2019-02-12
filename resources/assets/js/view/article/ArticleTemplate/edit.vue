<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">

        <el-form-item label="模板名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="模板路径" prop="path">
            <el-input v-model="form.path"></el-input>
            <span>默认在views/ 下请不要带上views</span>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import form_page from '@/mixins/form_page'
    import {template_edit,template_get} from "@/api/articleTemplate";

    export default {
        name: "add",
        mixins: [form_page],
        props:['id'],
        data() {
            return {
                form: {
                    name: '',
                    path: '',
                },
                rules: {
                    name: [
                        { required: true, message: '模板名称必须填写', trigger: 'blur' },
                    ],
                    path: [
                        { required: true, message: '模板路径必须填写',trigger: 'blur'}
                    ],
                },
            }
        },
        created:function(){
            template_get(this.id).then(response=>{
                this.form = response.data.data
            })
        },
        methods: {
            onSubmit() {
                if (this.handleValid()){
                    this.handleSubmit(template_edit(this.id,this.form))
                }
            },
        }
    }
</script>

<style scoped>

</style>