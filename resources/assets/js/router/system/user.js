// 用户管理模块
export default [
    {
        path: '/user',name:'user', component:resolve=>require(['@/view/user/user'],resolve)
    },
]