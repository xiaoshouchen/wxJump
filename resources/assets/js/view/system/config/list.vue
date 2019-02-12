<template>
    <el-tabs v-model="activeName">
        <el-tab-pane :lazy="true" label="微信配置" name="first">
            <wx></wx>
        </el-tab-pane>
        <el-tab-pane :lazy="true"  label="防刷配置" name="second">
            <batchOrder></batchOrder>
        </el-tab-pane>
        <el-tab-pane :lazy="true"  label="通知配置" name="third">
            <notify></notify>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import wx from './wx'
    import batchOrder from './batchOrder'
    import notify from './notify'
    export default {
        components: {wx, batchOrder, notify},
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {

        }
    };
</script>