<template>
    <div>
        <el-input style="width: 70%" v-model="url" placeholder="请输入域名链接"></el-input>
        <el-select v-model="type" placeholder="请选择">
            <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button style="margin-top: 10px" type="primary" @click="submit">确认修改</el-button>
    </div>
</template>

<script>
    import {urlEdit} from '@/api/article'

    export default {
        name: "edit",
        data() {
            return {
                url: this.urls,
                types: [
                    {
                        label: "A链接",
                        value: 0
                    },
                    {
                        label: "B链接",
                        value: 1
                    }
                ],
                type:this.typeValue,
            }
        },
        methods: {
            submit() {
                if (this.url == '') {
                    this.$message.error('请输入链接');
                    return false;
                }
                urlEdit(this.id, {url: this.url, type:this.type,status:0}).then((response) => {
                    this.$message.success(response.data.msg);
                    this.$emit('close');
                    this.$emit('render')
                })
            }
        },
        props: ['urls', 'id','typeValue']
    }
</script>

<style scoped>

</style>