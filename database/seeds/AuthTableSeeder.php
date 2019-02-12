<?php

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class AuthTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('authorities')->insert(
            [
                'id' => 1,
                'menu_id'=>'2',
                'name'=>'菜单管理',
                'description'=>'对菜单的所有权限控制',
                'keyword'=>'menu_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                            "data": [{
                                "value": "add",
                                "label": "添加"
                            }, {
                                "value": "edit",
                                "label": "编辑"
                            }, {
                                "value": "delete",
                                "label": "删除"
                            }]
                        }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );

        DB::table('authorities')->insert(
        [
            'id' => 2,
            'menu_id'=>'4',
            'name'=>'角色管理',
            'description'=>'角色的全部控制权限',
            'keyword'=>'role_all_controller',
            'type'=>'1',
            'extented'=>'{"type": true,
                            "data": [
                              {
                                "value": "add",
                                "label": "添加"
                              }, 
                              {
                                "value": "edit",
                                "label": "编辑"
                              },
                             {
                                "value": "delete",
                                "label": "删除"
                              },
                              {
                                 "value" :"GiveAuth",
                                 "label": "批量角色赋权"
                              },
                              {
                                 "value" :"edit_auth",
                                 "label": "编辑角色权限"
                              }, 
                              {
                                 "value" :"disable",
                                 "label": "禁用角色"
                              }       
                           ]
                        }',
            'created_at'=>date('Y-m-d H:i:s',time()),
            'updated_at'=>date('Y-m-d H:i:s',time()),
        ]
    );
        DB::table('authorities')->insert(
            [
                'id' => 3,
                'menu_id'=>'5',
                'name'=>'用户管理',
                'description'=>'用户的全部控制权限',
                'keyword'=>'user_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                            "data": [
                              {
                                "value": "add",
                                "label": "添加"
                              }, 
                              {
                                "value": "edit",
                                "label": "编辑"
                              },
                             {
                                "value": "delete",
                                "label": "删除"
                              },
                              {
                                 "value" :"userGiveRole",
                                 "label": "分配用户角色"
                              },
                              {
                                 "value" :"editRole",
                                 "label": "编辑用户角色"
                              },
                              {
                                 "value" :"disable",
                                 "label": "禁用用户"
                              }        
                           ]
                        }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('authorities')->insert(
            [
                'id' => 4,
                'menu_id'=>'6',
                'name'=>'权限管理',
                'description'=>'权限的全部控制权限',
                'keyword'=>'auth_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                            "data": [{
                                "value": "add",
                                "label": "添加"
                            }, {
                                "value": "edit",
                                "label": "编辑"
                            }, {
                                "value": "delete",
                                "label": "删除"
                            }]
                        }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );

        DB::table('authorities')->insert(
            [
                'id' =>5,
                'menu_id'=>'8',
                'name'=>'内容管理',
                'description'=>'文章的全部控制权限',
                'keyword'=>'article_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                                 "data": [{
                                   "value": "add",
                                   "label": "添加"
                                 }, {
                                   "value": "edit",
                                   "label": "编辑"
                                 }, {
                                   "value": "delete",
                                   "label": "删除"
                                 },{
                                   "value": "guest",
                                   "label": "留言"
                                 }
                                   ]
                                }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('authorities')->insert(
            [
                'id' => 6,
                'menu_id'=>'9',
                'name'=>'内容回收',
                'description'=>'文章回收站的全部控制权限',
                'keyword'=>'recovery_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                            "data": [{
                            "value": "recovery",
                            "label": "恢复文章"
                            }, {
                            "value": "delete",
                            "label": "删除"
                            }]
                            }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('authorities')->insert(
            [
                'id' => 7,
                'menu_id'=>'10',
                'name'=>'文章分类',
                'description'=>'文章分类的全部控制权限',
                'keyword'=>'category_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                                "data": [{
                                "value": "add",
                                "label": "添加"
                                }, {
                                "value": "edit",
                                "label": "编辑"
                                }, {
                                "value": "delete",
                                "label": "删除"
                                }]
                                }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('authorities')->insert(
            [
                'id' => 8,
                'menu_id'=>'11',
                'name'=>'文章发布视图的控制权限',
                'description'=>'文章发布视图的控制权限',
                'keyword'=>'publish_article_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                                "data": [{
                                "value": "add",
                                "label": "添加"
                                }, {
                                "value": "edit",
                                "label": "编辑"
                                }, {
                                "value": "delete",
                                "label": "删除"
                                }]
                                }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('authorities')->insert(
            [
                'id' => 9,
                'menu_id'=>'12',
                'name'=>'模板管理',
                'description'=>'模板的全部控制权限',
                'keyword'=>'template_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                             "data": [{
                               "value": "add",
                               "label": "添加"
                             }, {
                               "value": "edit",
                               "label": "编辑"
                             }, {
                               "value": "delete",
                               "label": "删除"
                             }]
                            }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        DB::table('authorities')->insert(
            [
                'id' => 10,
                'menu_id'=>'13',
                'name'=>'友情链接',
                'description'=>'友情链接管理',
                'keyword'=>'friendLink_all_controller',
                'type'=>'1',
                'extented'=>'{"type": true,
                             "data": [{
                               "value": "add",
                               "label": "添加"
                             }, {
                               "value": "edit",
                               "label": "编辑"
                             }, {
                               "value": "delete",
                               "label": "删除"
                             }]
                            }',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
    }
}
