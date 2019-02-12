<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserAndRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_and_role', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('role_id')->unsigned()->comment('角色ID');
            $table->integer('user_id')->unsigned()->comment('用户ID');
//            $table->integer('role_name')->nullable()->comment('角色名称');
            $table->timestamps();

//            $table->foreign('role_id')->references('id')->on('roles');
//            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_and_role');
    }
}
