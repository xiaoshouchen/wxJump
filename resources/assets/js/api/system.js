import axios from '@/libs/axios';

export const menu_add = (data) => {
    return axios.request({
        url: '/menu/add',
        data,
        method: 'post'
    })
};
export const menu_edit = (data) => {
    return axios.request({
        url: '/menu/edit',
        data,
        method: 'post'
    })
};
export const menu_detail = (id) => {
    return axios.request({
        url: '/menu/' + id,
        method: 'get'
    })
};

export const config_get = (keyword) => {
    return axios.request({
        url: '/config?keyword=' + keyword,
        method: 'get'
    })
};
export const config_add = (data) => {
    return axios.request({
        url: '/config',
        data,
        method: 'post'
    })
};
export const config_update = (id, data) => {
    return axios.request({
        url: '/config/' + id,
        data,
        method: 'put'
    })
};
export const emailTest = (data) => {
    return axios.request({
        url: '/config/emailTest',
        data,
        method: 'post'
    })
};
export const phoneTest = (data) => {
    return axios.request({
        url: '/config/phoneTest',
        data,
        method: 'post'
    })
};
