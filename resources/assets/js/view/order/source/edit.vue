<template>
   <div>
      <el-input style="width: 70%" v-model="name" placeholder="请输入来源信息"></el-input>
      <el-button type="success" @click="edit">修改来源</el-button>
   </div>
</template>

<script>
    import {sourceIdUpdateName, sourceIdGetName} from "@/api/goods"
    import form_page from '@/mixins/form_page'
    export default {
        name: "add",
        props:['id'],
        mixins: [form_page],
        data() {
            return {
                name: ""
            }
        },
        methods: {
            edit() {
                if (this.name == '') {
                    this.$message.error('名称未填写');
                    return false;
                }
                this.handleSubmit(sourceIdUpdateName(this.id, {name:this.name}))
            }
        },
        created() {
            sourceIdGetName(this.id).then((response)=>{
                this.name = response.data.data.name
            })
        }
    }
</script>

<style scoped>

</style>