<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">
        <el-form-item label="父级菜单">
            <el-input :value="parent.name" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单链接" prop="url">
            <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="form.icon"  :placeholder="iconContent" :disabled="icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序" prop="sort">
            <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否可见" prop="state">
            <el-switch v-model="form.state" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import form_page from '@/mixins/form_page'
    import {menu_add} from "@/api/system";

    export default {
        name: "add",
        props:['parent'],
        mixins: [form_page],
        data() {
            return {
                form: {
                    name: '',
                    url: '',
                    icon: '',
                    sort: 1000,
                    pid: this.parent.id,
                    state: "1",
                },
                rules: {
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    ],
                    sort: [
                        { type: 'number', message: '排序值必须为数字'}
                    ],
                },
                icon:false,
                iconContent:''
            }
        },
        created:function(){
            //如果当前添加二级或者多级菜单,不能够添加icon图标
            if (this.parent.id  > 0){
                this.icon = true;
                this.iconContent= '多级菜单暂不支持自定义图标';
            }
        },
        methods: {
            onSubmit() {
                if (this.handleValid()){
                    this.handleSubmit(menu_add(this.form))
                }
            },

        }

    }
</script>

<style scoped>

</style>