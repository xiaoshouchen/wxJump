<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNavsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('navs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('导航名称');
            $table->string('link')->comment('导航链接地址');
            $table->integer('seo_id')->nullable()->comment('页面所使用的 seo信息');
            $table->text('nav_banner')->nullable()->comment('导航banner图片 {json格式}');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('navs');
    }
}
