import axios from '@/libs/axios';

export const friend_add = (data) => {
    return axios.request({
        url: '/friend_link/add',
        data,
        method: 'post'
    })
};
export const friend_edit = (id,data) => {
    return axios.request({
        url: '/friend_link/edit/'+id,
        data,
        method: 'post'
    })
};
export const friend_get= (id) => {
    return axios.request({
        url: '/friend_link/'+id,
        method: 'get'
    })
};
export const friend_del= (id) => {
    return axios.request({
        url: '/friend_link/del/'+id,
        method: 'get'
    })
};