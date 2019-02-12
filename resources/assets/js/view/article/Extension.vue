<template>
    <div >
        <Table :url="url" :columns="columns" :checkbox="false"></Table>
    </div>
</template>

<script>
    import Table from "../../components/public/table";
    export default {
        name: "Extension",
        components: {Table},
        data(){
            return {
                url:"article/url?id="+this.id,
                columns:[
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
        props:['id']
    }
</script>
