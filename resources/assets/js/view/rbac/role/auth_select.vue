<template>
    <el-select style="width: 60%;" v-model="selectValue" size="mini" multiple
               @change="selectChange"
               placeholder="请选择">
        <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.label"></el-option>
    </el-select>
</template>

<script>
    export default {
        name: "auth_select",
        props:['data','id','select'],
        data(){
            return {
                selectValue:[],
                selectData:this.data,
            }
        },
        created:function(){
            // let data = JSON.parse(JSON.stringify(this.selectData));
            // for (let item of data) {
            //     if (this.select.indexOf(item.value) > -1){
            //         this.selectValue.push(item.label)
            //     }
            // }
            // console.log(this.select,1234);
            this.selectData.forEach((item)=>{
                if (this.select.indexOf(item.value) > -1){
                    this.selectValue.push(item.label)
                }
            });
        },
        methods:{
            selectChange(value){
                let data = [];
                this.selectData.forEach(item=>{
                    if (this.selectValue.indexOf(item.label ) > -1) {
                        data.push(item.value)
                    }
                });
                this.$emit('selectChange',this.id,data)
            }
        }
    }
</script>

<style scoped>

</style>