<template>
    <div>
        <div style="width: 35%;margin-bottom: 15px;">
            <el-input placeholder="请输入要搜索的内容..." size="small" v-model="search.value" class="input-with-select">
                <el-select style="width: 110px;" size="small" v-model="search.field" slot="prepend"
                           placeholder="请选择">
                    <el-option v-for="item in columns" :key="item.prop" v-if="item.search" :label="item.label"
                               :value="item.prop"></el-option>
                </el-select>
                <el-button size="small" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <Table ref="table" :url="url" :columns="columns" :checkbox="false" v-on:tools="handleTools"></Table>
        <el-dialog title="访问详情" :visible.sync="show">
            <show ref="RoleGiveAuth"  :showData="showData" v-if="show" v-on:close="show = false"></show>
        </el-dialog>
    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    import show from './show'

    export default {
        name: "visit",
        components: {Table, show},
        mixins: [list_page],
        data() {
            return {
                url: "visit",
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80',
                        sort: true,
                    },
                    {
                        prop: 'ip',
                        label: '来源IP',
                        search: true,
                    },
                    {
                        prop: 'created_at',
                        label: '访问时间',
                        search: true,
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    },
                ],
                show:false,
                showData:[],
            }
        },
        methods:{
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                if (type == 'show') {
                    this.show = true;
                    this.showData = row;
                }
                else{
                    console.error('Tools Event:'+type+' Not found');
                }
            },
            handleGetBtn(){
                return {
                    show: {
                        type: 'primary',
                        icon: 'el-icon-view',
                    },
                };
            }
        }
    }
</script>

<style scoped>

</style>