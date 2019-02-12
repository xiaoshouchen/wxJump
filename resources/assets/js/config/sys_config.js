/**
 * 系统配置数据
 * @description
 */

const data = {
    /**
     * @description 性别
     */
    sex: [
        {key: 1, value: '男'},
        {key: 2, value: '女'},
        {key: 0, value: '未填写'}
    ],
    /**
     * @description 用户类型
     */
    user_type: [
        {key:0, value: '管理员'},
        {key:1, value: '普通用户'}
    ],
    /**
     * @description 用户状态
     */
    user_state: [
        {key:0, value: '禁用'},
        {key:1, value: '正常'},
    ],
    /**
     * @description 权限类型
     */
    auth_type: [
        {key:0, value:'接口'},
        {key:1, value:'前端路由'},
    ],
    /**
     * @description 角色状态
     */
    role_state: [
        {key:0, value:'禁用'},
        {key:1, value:'正常'},
    ],

    /**
     * @description 角色状态
     */
    config_type: [
        {key:0, value:'TEXT'},
        {key:1, value:'JSON'},
    ],

};


/**
 * 通过Key获取配置数据
 * @param key,[key],[value]
 * @returns array
 *
 */
export const getConfigArray = (keyword,key='value',value='text') => {
    let res = data[keyword];
    if (key == 'key' && value == 'value'){
        return res;
    }
    let new_res = [];
    for (let obj of res) {
        let item = {};
        item[key] = obj.key;

        item[value] = obj.value;
        new_res.push(item);
    }
    return new_res;
};

/**

 * 通过key获取value
 * @param key
 * @param name
 * @returns {*}
 */
export const getConfigValue = (keyword,key) => {
    let value;
    for (let obj of data[keyword]) {
        if (obj.key == key){
            value = obj.value;
            break;
        }
    }
    return value;
};
/**
 * 通过value获取key
 * @param key
 * @param value
 * @returns {*}
 */
export const getConfigKey = (keyword,value) => {
    let key;
    for (let obj of data[keyword]) {
        if (obj.value == value){
            key = obj.key;
            break;
        }
    }
    return key;
};