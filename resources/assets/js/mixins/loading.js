/**
 * 加载层
 *
 * @function openFullScreenLoading()        // 开启全屏加载层
 * @function closeFullScreenLoading()       // 关闭全屏加载层
 */

var loading = {
    data: function () {
        return {
            FullScreenLoading: null,
            FullScreenLoadingMassage: '数据加载中...',
            FullScreenLoadingBackground: 'rgba(0, 0, 0, 0.7)',
        }
    },
    created(){
        console.log('mixin-loading')
    },
    methods: {
        openFullScreenLoading(){
            this.FullscreenLoading = this.$loading({
                lock: true,
                text: this.FullScreenLoadingMassage,
                spinner: 'el-icon-loading',
                background: this.FullScreenLoadingBackground
            });
        },
        closeFullScreenLoading(){
            this.FullscreenLoading.close();
        }
    }
}




export default loading