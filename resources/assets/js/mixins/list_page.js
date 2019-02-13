/**
 * 列表页公共属性及方法
 */

var list_page = {
    data: function () {
        return {
            search: {},
            edit_id:null,
            tools_id:null,
            select_ids:null,
        }
    },
    created(){
        //console.log('mixin-list_page')
    },
    methods: {
        /**
         * 点击搜索按钮
         */
        handleSearch() {
            this.handleSetFilter('search',this.search);
            this.handleRenderTable();
        },

        /**
         * 返回所选数据
         * @param field 要返回的字段名，为null则全部返回
         * @returns {*}
         */
        handleGetSelection(field = null) {
            let data = this.$refs.table.selection;
            if (data === null){
                data = [];
            }
            if (field == null){
                return data;
            }else if ((typeof field) == 'string'){
                let value = [];
                data.forEach(item=>{
                    if (field in item){
                        value.push(item[field]);
                    }
                });
                return value
            }else{
                console.error('handleGetSelection 参数错误')
            }
            return this.$refs.table.selection;
        },

        /**
         * 设置表格筛选参数
         * @param key   键
         * @param value 值
         */
        handleSetFilter(key,value){
            this.$refs.table.filterValue[key] = value
        },

        /**
         * 获取表格筛选参数
         * @param key   键
         * @returns {*}
         */
        handleGetFilter(key){
            return this.$refs.table.filterValue[key]
        },

        /**
         * 要移除的条件
         *
         * @param value
         */
        handelDeleteFilter(value){
            let keyword = [];
            for (let item in value) {
                this.$refs.table.deleteFilter.push(item);
            }
        },

        /**
         * 重新渲染表格
         */
        handleRenderTable(){
            this.$refs.table.renderTable();
        },

        /**
         * 移除表格中某行数据
         * @param index 下标
         */
        handleDeleteRow(index){
            this.$refs.table.deleteRow(index);
        },

        /**
         * 删除数据
         * @param callback  删除操作
         * @param index     下标
         */
        handleDel(callback,index){
            const loading = this.$loading({
                lock: true,
                text: '删除数据中...',
                spinner: 'el-icon-loading'
            });
            callback.then((res) => {
                this.loading = false;
                if (res['msg'] == 0){
                    this.$message.success('删除成功');
                    this.handleDeleteRow(index);
                } else{
                    this.$message.success('删除成功');
                }
                loading.close();
            }).catch((error) => {
                this.loading = false;
                this.$message.error('删除失败');
                loading.close();
                console.log(error);
            });
        },

        /**
         * 设置子集数据，treeTable
         * @param row
         * @param children
         */
        handleSetChild(row,children){
            this.$refs.table.SetChildren(row,children);
        },

        /**
         * 开启表格loading
         */
        handleOpenTableLoding(){
            this.$refs.table.loading = true;
        },

        /**
         * 关闭表格loading
         */
        handleCloseTableLoding(){
            this.$refs.table.loading = false;
        },

    }
};




export default list_page