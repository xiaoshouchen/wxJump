<template>
    <el-upload
        class="avatar-uploader"
        :action="upload_url"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>

<script>
    export default {
        data() {
            return {
                imageUrl: '',
                upload_url:"/api/upload",
                headers:{
                    Authorization : 'Bearer ' + this.$store.state.user.token
                }
            };
        },
        props:['img'],
        created:function () {
            this.imageUrl = this.img;
        },
        watch:{
            img(old){
            this.imageUrl = old;
          }
        },
        methods: {
            handleAvatarSuccess(response, file, fileList) {
                console.log(response, file, fileList);
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$emit('img-success',response.url)
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }
        }
    }
</script>