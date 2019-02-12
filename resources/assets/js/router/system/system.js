// 系统设置模块
export default [
    {
        path: '/menu',name:'menu', component:resolve=>require(['@/view/system/menu/menu'],resolve)
    },
    {
        path: '/visit',name:'visit', component:resolve=>require(['@/view/system/log/visit'],resolve)
    },
    {
        path: '/config',name:'config', component:resolve=>require(['@/view/system/config/list'],resolve)
    },
]