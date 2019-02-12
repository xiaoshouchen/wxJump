<template>
    <i style="cursor: pointer;" :class="className[this.state]" @click="handleFold"></i>
</template>

<script>
    export default {
        name: "fold",
        props: {
            row:{
                type:Object
            },
            status: {
                default:'close'
            }
        },
        data(){
            return {
                state: this.status,
                className:{
                    open:'el-icon-caret-bottom',
                    close:'el-icon-caret-right',
                    loading:'el-icon-loading'
                },
            }
        },
        methods:{
            handleFold(){
                if (this.status == 'open'){
                    this.$emit('collapsing',this.row);  // 收起
                } else{
                    this.state = 'loading';
                    this.$emit('expanding',this.row);   // 展开
                }
            }
        },
        watch:{
            status(val){
                this.state = val;
            }
        }
    }
</script>

<style scoped>

</style>