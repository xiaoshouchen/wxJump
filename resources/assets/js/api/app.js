import axios from '@/libs/axios';

//获得用户可以看见的菜单
export const getMenu = () => {
    return axios.request({
        //url: 'menu/tree',
        url: 'menu/user/tree',
        method: 'get'
    })
};
//获得全部菜单
export const getSystemMenu = () => {
    return axios.request({
        //url: 'menu/tree',
        url: 'menu/tree',
        method: 'get'
    })
};
export const getParent = (id) => {
    return axios.request({
        url: 'menu/parent/'+id,
        method: 'get'
    })
};


export const getBaseData = (params) => {
    return axios.request({
        url: 'base_data',
        params:{data:params},
        method: 'get'
    })
};