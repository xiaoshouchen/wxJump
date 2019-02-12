<template>
    <div>
        <el-checkbox-group v-model="checkList">
            <template>
                <el-checkbox v-for="item in checkOption"  :key="item.id" :label="item.name"></el-checkbox>
            </template>
        </el-checkbox-group>
        <div style="margin-top: 15px">
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
            <el-button @click="close">取消</el-button>
        </div>

    </div>
</template>

<script>
    import form_page from '@/mixins/form_page';
    import {roleList,userGiveRole,userGiveRoleEdit,userGiveRoleCreate} from '@/api/user';
    export default {
        name: "giveRoleEdit",
        mixins: [form_page],
        props:['id'],
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
            });
            //获得当前用户的角色信息
            userGiveRoleCreate(this.id).then((response)=>{
                this.checkList = response.data.data;
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
                this.handleSubmit(userGiveRoleEdit(this.checkList,this.id));
            },
        }
    }
</script>

<style scoped>

</style>