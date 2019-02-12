<template>
    <el-container style="height: 100%;">
        <el-header>
            <div class="logo">WeChat 推广&nbsp;<span style="font-size: 12px">V1.0</span></div>
            <!--<el-switch v-model="isCollapse"></el-switch>-->
            <el-dropdown trigger="hover" style="float: right;color: #fff;" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{this.$store.state.user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!--<el-dropdown-item command="clear">清除缓存</el-dropdown-item>-->
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="avator" style="display: inline-block;float: right;">
                <img style="padding: 10px;display: block; width: 40px;height: 40px;border-radius: 30px;" :src="this.$store.state.user.avatar" alt="">
            </div>
        </el-header>
        <el-container>
            <!--左侧导航-->
            <el-aside :width="asideWidth">
                <el-menu :collapse="isCollapse" :router="true">
                    <template v-for="menu in menus">
                        <template v-if="menu.sub_menu.length>0">
                            <component :index="menu.id+''" :route="menu.url" v-bind:is="menu.sub_menu.length>0 ? 'el-submenu':'el-menu-item'">
                                <template slot="title">
                                    <i :class="menu.icon"></i>
                                    <span slot="title">{{menu.name}}</span>
                                </template>
                                <template v-if="menu.sub_menu.length>0" v-for="sub_menu in menu.sub_menu">
                                    <component :index="sub_menu.id+''" :route="sub_menu.url" v-bind:is="sub_menu.sub_menu.length>0 ? 'el-submenu':'el-menu-item'">
                                        <template slot="title">{{sub_menu.name}}</template>
                                        <template v-if="sub_menu.sub_menu.length>0" v-for="sub_sub_menu in sub_menu.sub_menu">
                                            <el-menu-item :index="sub_sub_menu.id+''" :route="sub_sub_menu.url">{{sub_sub_menu.name}}</el-menu-item>
                                        </template>
                                    </component>
                                </template>
                            </component>
                        </template>
                    </template>
                </el-menu>
            </el-aside>
            <!--主内容区域-->
            <el-main>
                <div :style="{height:'30px'}">

                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-location-outline"></i> 首页</el-breadcrumb-item>
                        <template v-for="item in reversedBreadcrumb">
                            <el-breadcrumb-item>{{item}}</el-breadcrumb-item>
                        </template>
                    </el-breadcrumb>
                </div>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import {clean,sitemap} from "@/api/article"
    import loading from '@/mixins/loading'
    export default {
        name: "home",
        mixins: [loading],
        data() {
            return {
                menus: null,
                isCollapse: false,
                asideWidth: "200px",
            }
        },
        created:function(){
            if (this.$store.state.app.menu == null){
                this.openFullScreenLoading();
                this.handleGetMenu().then((data)=>{
                    this.closeFullScreenLoading();
                    this.menus = data;
                }).catch((err)=>{
                    this.closeFullScreenLoading();
                    console.log(err);
                })
            } else{
                this.menus = this.$store.state.app.menu;
            }
        },
        watch:{
            isCollapse:function (val) {
                this.asideWidth = val ? "65px" : "200px";
            },
        },
        computed: {
            // 由路由名计算面包屑导航
            reversedBreadcrumb: function () {
                let menu = this.menus;
                let route_name = this.$route.path;
                for (let x in menu){
                    let name = [];
                    name[0] = menu[x].name;
                    if (menu[x].url === route_name){
                        return name;
                    }
                    if (menu[x].sub_menu.length>0){
                        for (let y in menu[x].sub_menu) {
                            let _menu = menu[x].sub_menu[y];
                            name[1] = _menu.name;
                            if (_menu.url === route_name) {
                                return name;
                            }
                            if (_menu.sub_menu.length > 0) {
                                for (let z in _menu.sub_menu) {
                                    let __menu = _menu.sub_menu[z]
                                    name[2] = __menu.name;
                                    if (__menu.url === route_name) {
                                        return name;
                                    }
                                }
                            }
                        }
                    }
                }
                return [];
            }
        },
        methods:{
            ...mapActions([
                'handleLogOut',
                'handleGetMenu',
                'GetBaseDataByKey',
                'GetBaseDataById',
            ]),
            handleCommand(command){
                // 退出登录
                if(command == 'logout') {
                    this.handleLogOut();
                    this.$router.push('login')
                } else if(command == 'clear') {
                    clean().then(response=>{
                        this.$message.success(response.data.msg);
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #515a6e;
        color: #fff;
        line-height: 60px;
    }
    .logo{
        width: 180px;
        float: left;
        color: #fff;
        font-size: 20px;
    }
    .logo span{
        font-size: 24px;
        color: #fff;
    }
    .logo font{
        font-size: 16px;
    }

    .el-aside {
        background-color: #fff;
        color: #333;
    }
    .el-menu{
        border: none;
    }
    .el-submenu{
        width: 200px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }
</style>