import axios from '@/libs/axios';

/**
 * 删除来源
 * @param id
 * @returns {*}
 */
export const sourceDelete = (id) => {
    return axios.request({
        url: '/source/'+id,
        method: 'delete'
    })
};
/**
 * 添加来源
 * @returns {*}
 */
export const sourceAdd = (data) => {
    return axios.request({
        url: '/source',
        data,
        method: 'post'
    })
};

/**
 * 根据Id获得名称
 * @returns {*}
 */
export const sourceIdGetName = (id) => {
    return axios.request({
        url: '/source/'+id,
        method: 'get'
    })
};

/**
 * 根据Id修改名称
 *
 * @param id
 * @param data
 * @returns {*}
 */
export const sourceIdUpdateName = (id, data) => {
    return axios.request({
        url: '/source/'+id,
        data,
        method: 'put'
    })
};

/**
 * 根据Id批量删除来源信息
 *
 * @param data
 * @returns {*}
 */
export const sourceBatchIdDelete = (data) => {
    return axios.request({
        url: '/source/batchIdDelete',
        data,
        method: 'post'
    })
};
/**
 * 根据Id批量删除套餐信息
 *
 * @param data
 * @returns {*}
 */
export const setMealBatchIdDelete = (data) => {
    return axios.request({
        url: '/meal/batchIdDelete',
        data,
        method: 'post'
    })
};
/**
 * 根据Id删除套餐信息
 *
 * @param id
 * @returns {*}
 */
export const setMealIdDelete = (id) => {
    return axios.request({
        url: '/meal/'+id,
        method: 'delete'
    })
};
/**
 * 添加套餐信息
 *
 * @param data
 * @returns {*}
 */
export const setMealAdd = (data) => {
    return axios.request({
        url: '/meal',
        data,
        method: 'post'
    })
};
/**
 * 添加套餐信息
 *
 * @param id
 * @returns {*}
 */
export const setMealIdGet = (id) => {
    return axios.request({
        url: '/meal/'+id,
        method: 'get'
    })
};
/**
 * 根据Id修改套餐信息
 * @param id
 * @param data
 * @returns {*}
 */
export const setMealIdUpdate = (id, data) => {
    return axios.request({
        url: '/meal/'+id,
        data,
        method: 'put'
    })
};
/**
 * 获取商品展示模板
 *
 * @returns {*}
 */
export const goodsTemplate = () => {
    return axios.request({
        url: 'template/list',
        method: 'get'
    })
};

/**
 * 添加产品尺码信息
 *
 * @param data
 * @returns {*}
 */
export const sizeAdd = (data) => {
    return axios.request({
        url: 'size',
        data,
        method: 'post'
    })
};
/**
 * 添加产品尺码信息
 *
 * @returns {*}
 */
export const sizeIdGet = (id) => {
    return axios.request({
        url: 'size/'+id,
        method: 'get'
    })
};
/**
 * 根据ID修改信息
 *
 * @returns {*}
 */
export const sizeIdUpdate = (id, data) => {
    return axios.request({
        url: 'size/'+id,
        data,
        method: 'put'
    })
};
/**
 * 根据ID删除信息
 *
 * @returns {*}
 */
export const sizeIdDelete = (id) => {
    return axios.request({
        url: 'size/'+id,
        method: 'delete'
    })
};
export const sizeBatchIdDelete = (data) => {
    return axios.request({
        url: 'size/batchIdDelete',
        data,
        method: 'post'
    })
};
export const goodsAdd = (data) => {
    return axios.request({
        url: 'goods',
        data,
        method: 'post'
    })
};
export const goodsIdUpdate = (id, data) => {
    return axios.request({
        url: 'goods/'+id,
        data,
        method: 'put'
    })
};

export const goodsIdGet = (id) => {
    return axios.request({
        url: 'goods/'+id,
        method: 'get'
    })
};
export const goodsIdDelete = (id) => {
    return axios.request({
        url: 'goods/'+id,
        method: 'delete'
    })
};
export const goodsBatchDelete = (data) => {
    return axios.request({
        url: 'goods/batchDelete',
        data,
        method: 'post'
    })
};

export const ipSource = (id) => {
    return axios.request({
        url: 'goodsOrder/ip_source/'+id,
        method: 'get'
    })
};

export const goodsOrderDelete = (id, data) => {
    return axios.request({
        url: 'goodsOrder/'+id,
        data,
        method: 'delete'
    })
};
export const goodsOrderBatchDelete = (data) => {
    return axios.request({
        url: 'goodsOrder/batchDelete',
        data,
        method: 'post'
    })
};
export const goodsOrderIdGet = (id) => {
    return axios.request({
        url: 'goodsOrder/'+id,
        method: 'get'
    })
};
export const goodsOrderIdUpdate = (id, data) => {
    return axios.request({
        url: 'goodsOrder/'+id,
        data,
        method: 'put'
    })
};
export const goodsOrderIdUpdateStatus = (id, data) => {
    return axios.request({
        url: 'goodsOrder/status/'+id,
        data,
        method: 'put'
    })
};

export const sourceCount = () => {
    return axios.request({
        url: 'source/count',
        method: 'get'
    })
};

export const zhCount = () => {
    return axios.request({
        url: 'source/zhcount',
        method: 'get'
    })
};
export const peopleCount = () => {
    return axios.request({
        url: 'source/peoplecount',
        method: 'get'
    })
};

export const batchEditStatus = (data) => {
    return axios.request({
        url: 'goodsOrder/batchEdit',
        data,
        method: 'post'
    })
};
export const repeatCheckAPI = () => {
    return axios.request({
        url: 'goodsOrder/repeatCheck',
        method: 'get'
    })
};
export const orderSearchAPI = (data) => {
    return axios.request({
        url: 'goodsOrder/orderSearch',
        data,
        method: 'post'
    })
};
export const RegenerateAPI = (id) => {
    return axios.request({
        url: 'source/Regenerate/'+id,
        method: 'get'
    })
};
export const orderCountAPI = () => {
    return axios.request({
        url: 'goodsOrder/orderCount',
        method: 'get'
    })
};











