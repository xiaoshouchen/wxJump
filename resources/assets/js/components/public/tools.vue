<!-- 表格默认工具栏 -->
<template>
    <el-button-group>
        <template v-for="(val, key) in buttons">
            <template v-if="val.text?val.text:tooltip[key]?tooltip[key]:false">
                <el-tooltip class="item" effect="dark" :content="val.text?val.text:tooltip[key]" placement="bottom">
                    <el-button :type="val.type" size="mini" :icon="val.icon" @click="handleTools(key)"></el-button>
                </el-tooltip>
            </template>
            <template v-else>
                <el-button :type="val.type" size="mini" :icon="val.icon" @click="handleTools(key)"></el-button>
            </template>
        </template>
    </el-button-group>
</template>

<script>
    export default {
        name: "tools",
        props:['row','index','buttons'],
        data() {
            return {
                tooltip:{   // tooltip默认显示字段
                    add: '添加',
                    show: '查看详情',
                    edit: '编辑',
                    delete: '删除'
                }
            }
        },
        methods:{
            handleTools(type){
                this.$emit('listen-tools',type,this.index,this.row)
            },
        }
    }
</script>

<style scoped>

</style>