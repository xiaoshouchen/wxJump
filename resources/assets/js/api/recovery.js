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

export const recovery_Order = (id) => {
    return axios.request({
        url: '/recoveryOrder/'+id,
        method: 'put'
    })
};
export const recovery_OrderDel = (id) => {
    return axios.request({
        url: '/recoveryOrder/'+id,
        method: 'delete'
    })
};