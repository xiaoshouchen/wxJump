import axios from "@/libs/axios";
//import {getToken} from "@/libs/util";

export const login = (data) => {
    return axios.request({
        url: 'login',
        data,
        method: 'post'
    })
};

export const logout = (token) => {
    return axios.request({
        url: 'logout?token'+token,
        method: 'get'
    })
};

export const register = (data) => {
    return axios.request({
        url: 'register',
        data,
        method: 'post'
    })
};

export const userInfo = () => {
    return axios.request({
        url: 'user',
        method: 'get',
    })
};

export const addAuth = (data) => {
    return axios.request({
        url: 'auth/add',
        data,
        method: 'post',
    })
};

export const editAuthCreate = (id) => {
    return axios.request({
        url: 'auth/'+id,
        method: 'get',
    })
};

export const editAuth = (data,id) => {
    return axios.request({
        url: 'auth/edit/'+id,
        data,
        method: 'post',
    })
};

export const delAuth = (id) => {
    return axios.request({
        url: 'auth/del/'+id,
        method: 'get',
    })
};

export const addUser = (data) => {
    return axios.request({
        url: 'user/add',
        data,
        method: 'post',
    })
};

export const editUser = (data,id) => {
    return axios.request({
        url: 'user/edit/'+id,
        data,
        method: 'post',
    })
};

export const editCreateUser = (id) => {
    return axios.request({
        url: 'user/'+id,
        method: 'get',
    })
};

export const delUser = (id) => {
    return axios.request({
        url: 'user/del/'+id,
        method: 'get',
    })
};

export const DisableUser = (data) => {
    return axios.request({
        url: 'user/del/disable',
        data,
        method: 'post',
    })
};

export const addRole = (data) => {
    console.log('======');
    return axios.request({
        url: 'role/add',
        data,
        method: 'post',
    })
};

export const editRole = (data,id) => {
    return axios.request({
        url: 'role/edit/'+id,
        data,
        method: 'post',
    })
};

export const editCreateRole = (id) => {
    return axios.request({
        url: 'role/'+id,
        method: 'get',
    })
};

export const delRole = (id) => {
    return axios.request({
        url: 'role/del/'+id,
        method: 'get',
    })
};

export const DisableRole = (data) => {
    return axios.request({
        url: 'role/del/disable',
        data,
        method: 'post',
    })
};

export const AuthTree = ()=>{
    return axios.request({
        url: 'auth/auth_tree',
        method: 'get',
    })
};
export const RoleGiveAuth = (data)=>{
    return axios.request({
        url: 'role/give_auth',
        data,
        method: 'post',
    })
};

/**
 * 获取角色拥有的权限+菜单
 * @param id    角色ID
 */
export const getRoleHasAuth = (id)=>{
    return axios.request({
        url: 'role/get_role_auth/'+id,
        method: 'get',
    })
};

export const roleList = ()=>{
    return axios.request({
        url: 'role/list',
        method: 'get',
    })
};
export const userGiveRole = (data)=>{
    return axios.request({
        url: 'user/give/role',
        data,
        method: 'post',
    })
};
export const userGiveRoleCreate = (id)=>{
    return axios.request({
        url: 'user/role/'+id,
        method: 'get',
    })
};
export const userGiveRoleEdit = (data,id)=>{
    return axios.request({
        url: 'user/give/role/edit/'+id,
        data,
        method: 'post',
    })
};


