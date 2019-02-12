<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::table('users')->insert(
            [
                'id' => 1,
                'username'=>'ALG',
                'password'=>\Illuminate\Support\Facades\Hash::make(123456),
                'mobile'=>'13686840083',
                'email'=>'513051043@qq.com',
                'avatar'=>'https://qudongit.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720181120143701.jpg',
                'sex'=>'1',
                'type'=>'0',
                'state'=>'1',
                'options'=>'',
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
        \Illuminate\Support\Facades\DB::table('user_and_role')->insert(
            [
                'id' => 1,
                'role_id'=>1,
                'user_id'=>1,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'updated_at'=>date('Y-m-d H:i:s',time()),
            ]
        );
    }
}
