<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="A链接" name="first">
                <Table :url="urlA" :columns="columns" :checkbox="false"></Table>
            </el-tab-pane>
            <el-tab-pane label="B链接" name="second">
                <Table :url="urlB" :columns="columns" :checkbox="false"></Table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import Table from "../../components/public/table";
    import list_page from "@/mixins/list_page";
    export default {
        name: "Extension",
        components: {Table},
        mixins: [list_page],
        data() {
            return {
                activeName: "first",
                urlA: "article/url?id=" + this.id + "&type=" + 0,
                urlB: "article/url?id=" + this.id + "&type=" + 1,
                columns: [
                    {
                        prop: 'url',
                        label: '链接地址',
                    },
                    {
                        prop: 'url_type',
                        label: '类型',
                    },
                ]
            }
        },
        props: ['id']
    }
</script>
