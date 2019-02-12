<template>
   <div>
       <el-checkbox-group v-model="checkList">
           <template>
             <el-checkbox  v-for="item in checkOption" :key="item.id"  :label="item.name"></el-checkbox>
           </template>
       </el-checkbox-group>
       <div style="margin-top: 15px">
           <el-button type="primary" @click="onSubmit">立即创建</el-button>
           <el-button @click="close">取消</el-button>
       </div>

   </div>
</template>

<script>
    import form_page from '@/mixins/form_page';
    import {roleList,userGiveRole} from '@/api/user';
    export default {
        name: "giveRoleAdd",
        mixins: [form_page],
        props:['ids'],
        data() {
            return {
                checkList: [],
                checkOption:[],
            };
        },
        created(){
          //拉取远程所有可用角色
            roleList().then((response)=>{
                this.checkOption = response.data.data
                console.log( this.checkOption);
            })
        },
        methods:{
            close(){
                this.$emit('close');
            },
            onSubmit() {
             if (this.checkList.length < 1){
                 //请至少选择一项
                 this.$message.error('请至少选择一项再进行操作');
                 return false;
             }
             //吧ids压入请求列中
                let ids = {ids:this.ids};
                this.checkList.push(ids);
                this.handleSubmit(userGiveRole(this.checkList));
            },
        }
    }
</script>

<style scoped>

</style>