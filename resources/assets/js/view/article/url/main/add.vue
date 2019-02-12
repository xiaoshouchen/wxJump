<template>
    <div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
            <el-form-item label="链接类型" prop="type">
                <el-select v-model="type" placeholder="请选择">
                    <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'域名' + (index+1)"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="{required: true, message: '域名'+(index+1)+'不能为空', trigger: 'blur'}">
                <el-input style="width: 70%" v-model="domain.value"></el-input>
                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交保存</el-button>
                <el-button @click="addDomain">新增域名</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import {urlAdd} from '@/api/article';
    import form_page from '@/mixins/form_page';

    export default {
        name: "add",
        mixins: [form_page],
        data() {
            return {
                dynamicValidateForm: {
                    domains: [
                        {
                            value: ''
                        }
                    ]
                },
                types: [
                    {
                        label: "A链接",
                        value: 0
                    },
                    {
                        label: "B链接",
                        value: 1
                    }
                ],
                type: 1,
            }
        },
        methods: {
            submitForm(form) {
                let urls = [];
                this.dynamicValidateForm.domains.forEach((item)=>{
                    urls.push(item.value)
                });
                if (this.handleValid(form)) {
                    this.handleSubmit(urlAdd({urls: urls, type: this.type,status:0}))
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            removeDomain(item) {
                let index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            }
        }
    }
</script>

<style scoped>

</style>