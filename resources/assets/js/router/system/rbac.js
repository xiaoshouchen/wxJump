// 权限控制路由
export default [
    {
        path: '/auth',name:'auth', component:resolve=>require(['@/view/rbac/auth/auth'],resolve)
    },
    {
        path: '/role',name:'role', component:resolve=>require(['@/view/rbac/role/role'],resolve)
    },
]