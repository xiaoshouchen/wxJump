<template>
    <div>
        <el-input style="width: 70%" v-model="name" placeholder="请输入来源信息"></el-input>
        <el-button type="success" @click="add">添加来源</el-button>
    </div>
</template>

<script>
    import {sourceAdd} from "@/api/goods"
    import form_page from '@/mixins/form_page'
    export default {
        name: "add",
        mixins: [form_page],
        data() {
            return {
                name: ""
            }
        },
        methods: {
            add() {
                if (this.name == '') {
                    this.$message.error('名称未填写');
                    return false;
                }
                this.handleSubmit(sourceAdd({name:this.name}))
            }
        }
    }
</script>

<style scoped>

</style>