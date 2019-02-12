<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="主库域名" name="first">
            <first></first>
        </el-tab-pane>
        <el-tab-pane label="备用域名" name="second">
            <back></back>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import first from './main/main'
    import back from './backups/backups'
    export default {
        components: {first, back},
        data() {
            return {
                activeName: 'first'
            };
        },
    };
</script>