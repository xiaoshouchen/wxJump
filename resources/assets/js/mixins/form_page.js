/**
 * 列表页公共属性及方法
 *
 * @function handleSearch()                 // 点击搜索按钮
 * @function handleDel(url)                 // 删除数据
 * @function handleGetSelection()           // 返回复选框选中数据
 * @function handleDel(url)                 // 删除数据
 * @function handleDelMultiple(url,data)    // 删除多条数据
 */

var form_page = {
    data: function () {
        return {
            loading: false,
            loading_msg:'数据获取中...',
        }
    },
    created(){
        console.log('mixin-form_page')
    },
    methods: {

        /**
         * 返回所选数据，通常用于编辑页
         * @param callback
         * @returns {Promise<any>}
         */
        handleGetData(callback) {
            this.loading = true;
            return new Promise((resolve, reject) => {
                callback.then((res) => {
                    this.loading = false;
                    resolve(res.data);
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                    this.loading = false;
                })
            })
        },

        /**
         * 验证表单数据
         * @param formName  表单名
         * @returns {*}
         */
        handleValid(formName='form'){
            let res = null;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    res = true;
                } else {
                    console.log('error submit!!');
                    res = false;
                }
            });
            return res;
        },

        /**
         * 提交表单数据
         * @param callback 回调函数
         */
        handleSubmit(callback){
            this.loading = true;
            callback.then((res) => {
                this.loading = false;
                this.$message.success(res.data.msg);
                this.$emit('render');
                this.close();
            }).catch((error) => {
                console.log(error);
                this.loading = false;
                this.$message.error('操作失败');
                this.close();
            });
        },

        /**
         * 向父组件提交关闭事件
         */
        close(){
            this.$emit('close');
        }
    }
}


export default form_page