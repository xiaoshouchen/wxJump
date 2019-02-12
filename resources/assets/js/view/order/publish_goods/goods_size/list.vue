<template>
    <div>
        <div style="margin: 8px 0">
            <el-row>
                <el-col :span="14">
                    <el-button type="primary"@click="handleAdd">添加产品尺码</el-button>
                    <el-button type="danger" @click="handleSelect">删除产品尺码</el-button>
                    <el-button type="success" @click="returnList">返回产品列表</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="chart-left">
            <Table ref="table" :url="url" :columns="columns" v-on:tools="handleTools"></Table>
        </div>

        <el-dialog title="添加产品尺码" :visible.sync="addFormVisible">
            <Add ref="addForm" v-if="addFormVisible" v-on:close="addFormVisible = false"
                 v-on:render="this.handleRenderTable"></Add>
        </el-dialog>

        <el-dialog title="编辑产品尺码" :visible.sync="editFormVisible">
            <Edit ref="editForm" :id="tools_id" v-if="editFormVisible" v-on:close="editFormVisible = false"
                  v-on:render="this.handleRenderTable"></Edit>
        </el-dialog>

    </div>
</template>

<script>
    import Table from "@/components/public/table";
    import Add from "./add";
    import Edit from "./edit";
    import list_page from "@/mixins/list_page";
    import {sizeBatchIdDelete, sizeIdDelete} from "@/api/goods";

    export default {
        components: {Table, Add, Edit},
        mixins: [list_page],
        data() {
            return {
                url: '/size?goods_id='+this.$route.params.id,
                addFormVisible: false,
                editFormVisible: false,
                columns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: '80'
                    },
                    {
                        prop: 'size_name',
                        label: '尺码名称',
                        width:"380"
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
            }
        },
        methods: {
            // 工具栏事件处理 type值为columns中tools的键值
            handleTools(type, index, row) {
                this.tools_id = row.id;
                if (type == 'edit') {
                    this.editFormVisible = true;
                } else if (type == 'delete') {
                    sizeIdDelete(row.id).then((response) => {
                        this.handleDeleteRow(index);
                        this.$message.success(response.data.msg);
                    });
                }
            },

            handleAdd() {
                this.addFormVisible = true;
            },

            //批量删除
            handleSelect() {
                //禁用多选用户操作
                let ids = this.handleGetSelection('id');
                if (ids.length === 0) {
                    this.$message.error('请选择一个选项后再进行进行操作');
                    return false;
                }
                sizeBatchIdDelete({id:ids}).then((response) => {
                    //重载表格
                    this.handleRenderTable();
                    //响应消息
                    this.$message.success(response.data.msg);
                });
            },
            //返回产品列表
            returnList() {
                this.$router.push('/goods_list');
            },

            //tool栏按钮权限控制
            handleGetBtn() {
                let conf = {
                    edit: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                    },
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    }
                };
                let result = {};
                this.$store.state.user.auth.role.forEach(item => {
                    if (item in conf) {
                        result[item] = conf[item];
                    }

                });
                return conf;
            }
        }
    }
</script>

<style scoped>
    .chart-left{
        width: 720px;
    }
    .chart-left >>> .el-pagination {
        float: left!important;
    }
</style>
