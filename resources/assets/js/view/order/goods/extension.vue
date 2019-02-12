<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <el-button type="primary" @click="Regenerate">重新生成推广链接</el-button>
                </el-col>
            </el-row>
        </div>
        <Table ref="table" :url="url" :columns="columns"></Table>
    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import {RegenerateAPI} from '@/api/goods';
    import list_page from "@/mixins/list_page";
    export default {
        components: {Table},
        mixins: [list_page],
        name: "Extension",
        data()
        {
            return {
                url:"source/extensionURL?goods_id="+this.id,
                columns:[
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80'
                    },
                    {
                        prop: 'source_name',
                        label: '渠道名称',
                        width: '220'
                    },
                    {
                        prop: 'source_url',
                        label: '推广链接',
                    },
                ]
            }
        },
        methods:{
            Regenerate(){
                RegenerateAPI(this.id).then((response)=>{
                    this.$message.success(response.data.msg);
                    this.handleRenderTable();
                })
            }
        },
        props:['id']
    }
</script>

<style scoped>

</style>