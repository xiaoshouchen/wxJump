<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->comment('用户名');
            $table->string('password')->comment('用户密码');
            $table->string('mobile')->unique()->comment('手机号码');
            $table->string('email')->nullable()->comment('邮箱');
            $table->string('avatar')->nullable()->comment('用户头像');
            $table->tinyInteger('sex')->default(0)->comment('用户性别:{0:未填写,1:男,2:女}');
            $table->tinyInteger('type')->default(1)->comment('用户类型：{0:管理员，1:普通用户}');
            $table->tinyInteger('state')->default(1)->comment('用户状态：{0:禁用,1:正常}');
            $table->text('options')->nullable()->comment('个人信息配置');
            $table->rememberToken()->comment('记住密码');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
