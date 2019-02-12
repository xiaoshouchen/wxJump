<?php

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;
class MenuTableSeeder extends Seeder
{
    /**
     * 基础菜单信息内容数据填充.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('menus')->insert(
            [
                'id' => 1,
                'pid' => 0,
                'name' => '系统设置',
                'icon' => 'el-icon-setting',
                'url' => null,
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );

        DB::table('menus')->insert(
            [
                'id' => 2,
                'pid' => 1,
                'name' => '菜单管理',
                'icon' => null,
                'url' => '/menu',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 3,
                'pid' => 0,
                'name' => '用户管理',
                'icon' => 'el-icon-menu',
                'url' => null,
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 4,
                'pid' => 3,
                'name' => '角色管理',
                'icon' => null,
                'url' => '/role',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 5,
                'pid' => 3,
                'name' => '用户管理',
                'icon' => null,
                'url' => '/user',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 6,
                'pid' => 3,
                'name' => '权限管理',
                'icon' => null,
                'url' => '/auth',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );

        DB::table('menus')->insert(
            [
                'id' => 7,
                'pid' => 0,
                'name' => '内容管理',
                'icon' => 'el-icon-location',
                'url' => null,
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 8,
                'pid' => 7,
                'name' => '文章列表',
                'icon' => null,
                'url' => '/article_list',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 9,
                'pid' => 7,
                'name' => '回收站',
                'icon' => null,
                'url' => '/recovery',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 10,
                'pid' => 7,
                'name' => '文章分类',
                'icon' => null,
                'url' => '/article_category',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 11,
                'pid' => 7,
                'name' => '发布文章',
                'icon' => null,
                'url' => '/publish_article',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 12,
                'pid' => 7,
                'name' => '模板管理',
                'icon' => null,
                'url' => '/template',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('menus')->insert(
            [
                'id' => 13,
                'pid' => 1,
                'name' => '友情链接',
                'icon' => null,
                'url' => '/friendlink',
                'sort' =>1000,
                'state' =>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
    }
}
