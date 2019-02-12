import { getMenu } from '@/api/app'

export default {
    state: {
        menu:null,
        menu_list:null,
        base_data:{},
        base_data_id:[],
        isCollapse:false
    },
    mutations: {
        setMenu (state, data) {
            state.menu = data.tree;
            state.menu_list = data.list;
        },
        setBaseDataByKey (state, data) {
            state.base_data[data.key] = data.data
        },
        setBaseDataById (state, data) {
            state.base_data_id[data.key] = data.data
        },
        isCollapse(state, status){
            state.isCollapse = status
        }
    },
    actions: {
        // 获取首页菜单，保存到store
        handleGetMenu({ commit }){
            return new Promise((resolve, reject) => {
                getMenu().then(res => {
                    const data = res.data;
                    let list = handleGetMenuList(data);
                    commit('setMenu', {tree:data,list:list});
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取基础数据
        GetBaseDataByKey({ state,commit }, key){
            return new Promise((resolve, reject) => {
                if(key in state.base_data){
                    resolve(state.base_data[key]);
                }else{
                    let data = [{name:"111"},{name:"222"},{name:"333"}];
                    commit('setBaseDataByKey', {key:key,data:data});
                    resolve(state.base_data[key]);
                }
            })
        },
        // 获取基础数据
        GetBaseDataById({ state,commit }, id){
            return new Promise((resolve, reject) => {
                if(id in state.base_data_id){
                    resolve(state.base_data_id[id]);
                }else{
                    let data = ['by id：'+id];
                    commit('setBaseDataById', {key:id,data:data});
                    resolve(state.base_data_id[id]);
                }
            })
        },
    }
}


//将菜单转为层级列表数据
function handleGetMenuList(menu){
    let list = [];
    const prefixa = '└─';
    const prefixb = '└───';
    for(let obj of menu){
        list.push({id:obj.id,name:obj.name});
        if (obj['sub_menu'].length > 0){
            for(let obja of obj['sub_menu']){
                list.push({id:obja.id,name:prefixa+obja.name});
                if (obja['sub_menu'].length > 0){
                    for(let objb of obja['sub_menu']){
                        list.push({id:objb.id,name:prefixb+objb.name});
                    }
                }
            }
        }
    }
    return list;
}