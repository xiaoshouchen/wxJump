import axios from '@/libs/axios';

export const getList = () => {
    return axios.request({
        url: '/category/list',
        method: 'get'
    })
};
export const category_del = (id) => {
    return axios.request({
        url: '/category/del/'+id,
        method: 'get'
    })
};
export const category_add = (data) => {
    return axios.request({
        url: '/category/add',
        data,
        method: 'post'
    })
};
export const category_edit = (data,id) => {
    return axios.request({
        url: '/category/edit/'+id,
        data,
        method: 'post'
    })
};