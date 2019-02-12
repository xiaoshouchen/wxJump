import { login, logout, userInfo } from '@/api/user'
import { setToken,getToken} from '@/libs/util';
import axios from '@/libs/axios'

export default {
    state: {
        token:getToken(),
        userName: '',
        userId: '',
        avatar: '',
        access:null
    },
    mutations: {
        setAvatar (state, avatar) {
            state.avatar = avatar
        },
        setUserId (state, id) {
            state.userId = id
        },
        setUserName (state, name) {
            state.userName = name
        },
        setToken(state, token) {
            state.token = token
        },
        setAccess(state, access) {
            state.access = access
        },
        setAuth(state, auth){
            state.auth = auth
        }
    },
    actions: {
        // 登录
        handleLogin ({ commit }, from) {
            return new Promise((resolve, reject) => {
                login(from).then(res => {
                    const data = res.data;
                    if (data.code == 0){
                        commit('setToken', data.token);
                        setToken(data.token);
                        resolve(data)
                    }else{
                        reject('code is not 0')
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut ({ state, commit }) {
            return new Promise((resolve) => {
                commit('setToken', false);
                commit('setAvatar', null);
                commit('setUserId', null);
                commit('setAccess', null);
                commit('setUserName', null);
                commit('setAuth', null);
                setToken();
                resolve()
            })
        },
        // // 获取用户相关信息
        getUserInfo ({ state, commit }) {
            return new Promise((resolve, reject) => {
                if(state.access === null){
                    userInfo().then(res => {
                        const data = res.data;
                        if (data.code == 0) {
                            const user = data.user;
                            commit('setAvatar', user.avatar);
                            commit('setUserName', user.username);
                            commit('setUserId', user.id);
                            commit('setAccess', user.access);
                            commit('setAuth', user.auth);
                        }
                        //吧可访问页面向上抛出
                        resolve(data.user.access)
                    }).catch(err => {
                        reject(err)
                    })
                }else{
                    resolve(state.access);
                }
            })
        }
    }
}
