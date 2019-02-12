<template>
    <el-form ref="meal_form" :rules="rules"  :model="form" label-width="80px">
        <el-form-item label="套餐名称"  prop="meal_name">
            <el-input v-model="form.meal_name" placeholder="请输入套餐名称"></el-input>
        </el-form-item>
        <el-form-item label="套餐价格" prop="meal_price">
            <el-input v-model="form.meal_price" placeholder="请输入套餐价格"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="meal_stock">
            <el-input v-model="form.meal_stock" placeholder="请输入套餐库存"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import form_page from '@/mixins/form_page'
    import {setMealIdGet, setMealIdUpdate} from '@/api/goods'
    export default {
        mixins: [form_page],
        data() {
            return {
                form: {
                    meal_name: '',
                    meal_price: '',
                    meal_stock: 99999,
                },
                rules: {
                    meal_name: [
                        { required: true, message: '套餐名称必须填写', trigger: 'blur' },
                    ],
                    meal_price:[{
                        type: 'number',required: true, message: '套餐价格必须填写', trigger: 'blur'
                    }],
                    meal_stock:[{
                        type: 'number', required: true, message: '套餐库存必须填写', trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            onSubmit() {
                if(this.handleValid('meal_form')) {
                    this.handleSubmit(setMealIdUpdate(this.id, this.form));
                }
            }
        },
        created() {
            setMealIdGet(this.id).then((response)=>{
                this.form = response.data.data
            })
        },
        props:['id']
    }
</script>

<style scoped>

</style>