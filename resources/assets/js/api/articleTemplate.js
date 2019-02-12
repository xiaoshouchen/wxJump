import axios from '@/libs/axios';

export const template_del = (id) => {
    return axios.request({
        url: '/template/del/'+id,
        method: 'get'
    })
};
export const template_add = (data) => {
    return axios.request({
        url: '/template/add',
        data,
        method: 'post'
    })
};
export const template_get = (id) => {
    return axios.request({
        url: '/template/'+id,
        method: 'get'
    })
};
export const template_edit = (id,data) => {
    return axios.request({
        url: '/template/edit/'+id,
        data,
        method: 'post'
    })
};
export const template_getList = () => {
    return axios.request({
        url: '/template/list',
        method: 'get'
    })
};
