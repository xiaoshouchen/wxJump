<template>
    <div class="custom-tree-container">
        <div class="block" style="margin-bottom: 15px">
            <el-tree ref="tree" :data="treeData"  show-checkbox node-key="node" default-expand-all :default-checked-keys="treeCheck" :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span><i :class="node.icon"></i>{{ node.label }}</span>
                  <template v-if="node.data.extented">
                      <template v-if="loading">
                         <auth-select v-on:selectChange="selectChange"
                                      :data="node.data.extented.data"
                                      :select="selectValue[node.data.id]?selectValue[node.data.id]:[]"
                                      :id="node.data.id">
                         </auth-select>
                       </template>
                  </template>
              </span>
            </el-tree>
        </div>
        <el-button type="primary" @click="submit">保存设置信息</el-button>
    </div>
</template>

<script>
    import {AuthTree,RoleGiveAuth,getRoleHasAuth} from "@/api/user"
    import AuthSelect from './auth_select'
    export default{
        data() {
            return {
                treeData: null,
                treeCheck:[],
                selectValue:[],
                authSelect:{},
                loading:false,
            };
        },
        components:{
            AuthSelect
        },
        props:['id'],
        created:function(){

            AuthTree().then((response)=>{
                //构建树形结构
                this.treeData  = this.tree(response.data.data);
            });
            getRoleHasAuth(this.id).then((response)=>{
                //渲染默认选中项
                let data = [];
                for (let x of response.data.data.menu){
                    data.push('menu'+x.menu_id)
                }
                for (let x of response.data.data.auth){
                    console.log(response.data.data.auth,456);
                    data.push('auth'+x.auth_id);
                    //这里传入角色拥有的权限做默认会显
                    this.selectValue[x.auth_id] = x.extented;
                }
                this.treeCheck = data;
                //显示子组件
                this.loading = true;
            });

        },
        methods: {
            /**
             * 组装菜单与权限树形结构
             * @param data 源数据
             */
            tree(data){
                let tree = [];
                data.forEach(item=>{
                    // 第一级菜单
                    let node = {id:item.id,node:'menu'+item.id,label:item.name,icon:item.icon,children:[],type:'menu'};
                    if (item.sub_menu.length > 0){
                        item.sub_menu.forEach((val,key)=>{ // 二级菜单
                            node.children.push({id:val.id,node:'menu'+val.id,label:val.name,icon:val.icon,children:[],type:'menu'});
                            let _children = [];
                            if (val['sub_menu'].length > 0){// 如果存在子菜单
                                for (let i=0;i<val['sub_menu'].length;i++){
                                    let _sub_menu = val['sub_menu'][i];
                                    _children.push({id:_sub_menu.id,node:'menu'+_sub_menu.id,label:_sub_menu.name,icon:_sub_menu.icon||'el-icon-tickets',children:[],type:'menu'})
                                    if ('has_auth' in _sub_menu && _sub_menu['has_auth'].length > 0){  // 如果拥有权限
                                        for (let j=0;j<_sub_menu['has_auth'].length;j++){
                                            let _sub_auth = _sub_menu['has_auth'][j];
                                            let _auth = {
                                                icon:_sub_auth.type==0?'el-icon-share':'el-icon-document',
                                                extented:_sub_auth.extented?JSON.parse(_sub_auth.extented):null
                                            };
                                            _children[i]['children'].push({id:_sub_auth.id,node:'auth'+_sub_auth.id,label:_sub_auth.name,icon:_auth.icon,extented:_auth.extented,type:'auth',url:_sub_menu.url})
                                        }
                                    }
                                }
                            }else if ('has_auth' in val && val['has_auth'].length > 0){ // 如果是权限
                                for (let i=0;i<val['has_auth'].length;i++){
                                    let _sub_auth = val['has_auth'][i];
                                    let _auth = {
                                        icon:_sub_auth.type==0?'el-icon-share':'el-icon-document',
                                        extented:_sub_auth.extented?JSON.parse(_sub_auth.extented):null
                                    };
                                    _children.push({id:_sub_auth.id,node:'auth'+_sub_auth.id,label:_sub_auth.name,icon:_auth.icon,extented:_auth.extented,type:'auth',url:val.url})
                                }
                            }
                            node.children[key].children = _children;
                        })
                    }
                    tree.push(node);
                });
                return tree;
            },

            /**
             * 权限配置选择框选择事件
             * @param id
             * @param data
             */
            selectChange(id,data){
                this.selectValue[id] = data;
            },

            /**
             * 提交事件
             */
            submit(){
                let data = this.$refs.tree.getCheckedNodes();
                let auth = [];
                let menu = [];
                data.forEach(item=>{
                    if (item.type == 'auth'){
                        if (this.selectValue[item.id]){
                            item.extented = this.selectValue[item.id];
                        }else{
                            item.extented = [];
                        }
                        auth.push({id:item.id,extented:item.extented,url:item.url});
                    }else if (item.type == 'menu' & typeof item.children !="undefined" || item.children[0].type == 'auth' ) { //保证加入的是菜单项目
                        menu.push(item.id);
                    }
                });
                data = {
                    roles:[this.id],
                    menu:menu,
                    auth:auth
                };
                RoleGiveAuth(data).then((response)=>{
                    this.$message.success(response.data.msg);
                    this.$emit('close')
                })
            },
        }
    };
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .el-tree-node__content{
        height: 28px;
    }
</style>