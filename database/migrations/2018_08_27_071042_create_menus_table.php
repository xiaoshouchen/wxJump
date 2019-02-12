<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('pid')->default(0)->comment('父级分类ID');
            $table->string('name')->comment('菜单名');
            $table->string('icon')->nullable()->comment('菜单图标');
            $table->string('url')->nullable()->comment('菜单链接');
            $table->smallInteger('sort')->default(1000)->comment('排序');
            $table->tinyInteger('state')->default(1)->comment('状态：{0：不显示，1：正常显示}');
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
        Schema::dropIfExists('menus');
    }
}
