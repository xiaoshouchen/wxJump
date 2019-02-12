<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuthoritiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('authorities', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('menu_id')->comment('所属菜单分类');
            $table->string('name')->comment('权限名称');
            $table->string('description')->nullable()->comment('权限描述');
            $table->string('keyword')->comment('权限标识');
            $table->tinyInteger('type')->default(0)->comment('类型：{0:接口,1:前端路由}');
            $table->tinyInteger('default')->default(0)->comment('类型：{0:不选中,1:默认选中,2:强制选中}');
            $table->text('extented')->nullable()->comment('权限扩展配置');
            $table->smallInteger('sort')->default(1000)->comment('排序');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('authorities');
    }
}
