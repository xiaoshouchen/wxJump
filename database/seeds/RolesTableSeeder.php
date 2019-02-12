<?php

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('roles')->insert(
            [
                'id' => 1,
                'name' => '超管',
                'description' => '系统超级管理员默认拥有所有权限',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );

        DB::table('role_and_auth')->insert(
            [
                'id' => 1,
                'role_id' => '1',
                'auth_id' => '1',
                'page'=>'menu',
                'state'=>1,
                'extented' => '["add","edit","delete"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 2,
                'role_id' => '1',
                'auth_id' => '2',
                'page'=>'role',
                'state'=>1,
                'extented' => '["add","edit","delete","GiveAuth","disable","edit_auth"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 3,
                'role_id' => '1',
                'auth_id' => '3',
                'page'=>'user',
                'state'=>1,
                'extented' => '["add","edit","delete","userGiveRole","editRole","disable"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 4,
                'role_id' => '1',
                'auth_id' => '4',
                'page'=>'auth',
                'state'=>1,
                'extented' => '["add","edit","delete"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 5,
                'role_id' => '1',
                'auth_id' => '5',
                'page'=>'article_list',
                'state'=>1,
                'extented' => '["add","edit","delete","guest"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 6,
                'role_id' => '1',
                'auth_id' => '6',
                'page'=>'recovery',
                'state'=>1,
                'extented' => '["recovery","delete"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 7,
                'role_id' => '1',
                'auth_id' => '7',
                'page'=>'article_category',
                'state'=>1,
                'extented' => '["add","edit","delete"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 8,
                'role_id' => '1',
                'auth_id' => '8',
                'page'=>'publish_article',
                'state'=>1,
                'extented' => '["add","edit","delete"]',
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 9,
                'role_id' => '1',
                'auth_id' => '9',
                'page'=>'template',
                'extented' => '["add","edit","delete"]',
                'state'=>1,
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
        DB::table('role_and_auth')->insert(
            [
                'id' => 10,
                'role_id' => '1',
                'auth_id' => '10',
                'extented' => '["add","edit","delete"]',
                'page'=>'friendlink',
                'state'=>1,
                'created_at' => date('Y-m-d H:i:s', time()),
                'updated_at' => date('Y-m-d H:i:s', time()),
            ]
        );
    }
}
