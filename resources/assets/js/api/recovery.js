import axios from '@/libs/axios';

export const recovery_article = (id) => {
    return axios.request({
        url: '/recovery/recovery/'+id,
        method: 'get'
    })
};
export const recovery_del = (id) => {
    return axios.request({
        url: '/recovery/del/'+id,
        method: 'get'
    })
};