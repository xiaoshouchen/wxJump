import axios from '@/libs/axios';

export const orderEdit = (id, data) => {
    return axios.request({
        url: '/order/'+id,
        data,
        method: 'put'
    })
};

export const contactEdit = (id, data) => {
    return axios.request({
        url: '/contact/'+id,
        data,
        method: 'put'
    })
};

