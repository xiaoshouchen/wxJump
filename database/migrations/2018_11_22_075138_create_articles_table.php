<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->comment('文章标题');
            $table->string('category')->comment('文章分类名称');
            $table->text('description')->nullable()->comment('文章简介');
            $table->string('photo')->nullable()->comment('文章封面');
            $table->integer('click')->default(0)->comment('文章点击量');
            $table->string('publish_time')->comment('文章发布时间');
            $table->string('author')->comment('作者,程序默认存储登录用户');
            $table->text('content')->comment('文章内容');
            $table->integer('is_wechat')->default(1)->comment('检测是否是微信浏览器  1检测 0不检测');
            $table->integer('random_jump')->default(1)->comment('开启随机跳转 1开启 0不开启');
            $table->string('arrow')->nullable()->comment('点击文章内部箭头返回地址');
            $table->string('physics')->nullable()->comment('物理按键点击返回');
            $table->string('url')->nullable()->comment('文章访问链接');
            $table->string('music')->nullable()->comment('背景音乐地址');
            $table->string('appid')->nullable()->comment('微信appId');
            $table->string('key')->nullable()->comment('微信密匙');
            $table->string('right_now')->nullable()->comment('网站立即跳转到指定地址');
            $table->string('cnzz')->nullable()->comment('文章流量统计');
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
        Schema::dropIfExists('articles');
    }
}
