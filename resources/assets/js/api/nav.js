import axios from '@/libs/axios';

export const SeoAdd = (data) => {
    return axios.request({
        url: '/seo',
        data,
        method: 'post'
    })
};

export const SeoList= () => {
    return axios.request({
        url: '/seo',
        method: 'get'
    })
};


export const SeoGet= (id) => {
    return axios.request({
        url: '/seo/'+id,
        method: 'get'
    })
};
export const SeoEdit= (id, data) => {
    return axios.request({
        url: '/seo/'+id,
        data,
        method: 'put'
    })
};
export const SeoDelete= (id) => {
    return axios.request({
        url: '/seo/'+id,
        method: 'delete'
    })
};


export const NavAdd = (data) => {
    return axios.request({
        url: '/nav',
        data,
        method: 'post'
    })
};

export const NavGet= (id) => {
    return axios.request({
        url: '/nav/'+id,
        method: 'get'
    })
};
export const NavEdit= (id, data) => {
    return axios.request({
        url: '/nav/'+id,
        data,
        method: 'put'
    })
};
export const NavDelete= (id) => {
    return axios.request({
        url: '/nav/'+id,
        method: 'delete'
    })
};
