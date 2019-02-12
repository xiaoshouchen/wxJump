import axios from '@/libs/axios';

export const article_add = (data) => {
    return axios.request({
        url: '/article/add',
        data,
        method: 'post'
    })
};

export const sitemap = () => {
    return axios.request({
        url: '/sitemap',
        method: 'get'
    })
};
export const clean = () => {
    return axios.request({
        url: '/article/clean',
        method: 'get'
    })
};

export const article_get = (id) => {
    return axios.request({
        url: '/article/'+id,
        method: 'get'
    })
};
export const article_edit = (id,data) => {
    return axios.request({
        url: '/article/edit/'+id,
        data,
        method: 'post'
    })
};
export const article_del = (id) => {
    return axios.request({
        url: '/article/del/'+id,
        method: 'get'
    })
};

export const urlDel = (id) => {
    return axios.request({
        url: '/url/'+id,
        method: 'delete'
    })
};
export const urlAdd = (data) => {
    return axios.request({
        url: '/url',
        data,
        method: 'post'
    })
};
export const urlEdit = (id, data) => {
    return axios.request({
        url: '/url/'+id,
        data,
        method: 'put'
    })
};
export const urlBatchDel = (data) => {
    return axios.request({
        url: '/url/batchDel',
        data,
        method: 'post'
    })
};



