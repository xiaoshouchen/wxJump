import axios from '@/libs/axios';

export const getList = () => {
    return axios.request({
        url: '/product/list',
        method: 'get'
    })
};
export const product_del = (id) => {
    return axios.request({
        url: '/product/del/'+id,
        method: 'get'
    })
};
export const product_add = (data) => {
    return axios.request({
        url: '/product/add',
        data,
        method: 'post'
    })
};
export const product_edit = (data,id) => {
    return axios.request({
        url: '/product/edit/'+id,
        data,
        method: 'post'
    })
};