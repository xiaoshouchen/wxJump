<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('goods', function (Blueprint $table) {
            $table->increments('id');
            $table->string('goods_title')->comment('商品标题或者是名称');
            $table->text('params')->nullable()->comment('商品参数 如何 风格:圆领');
            $table->string('goods_desc')->nullable()->comment('商品描述');
            $table->text('goods_content')->comment('商品详情信息');
            $table->text('wheel_photo')->nullable()->comment('商品展示轮播图片');
            $table->string('photo')->comment('商品封面');
            $table->decimal('price')->comment('商品单价');
            $table->tinyInteger('is_up')->comment('是否上架 0下架 1上架');
            $table->tinyInteger('template_id')->comment('商品展示模板');
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
        Schema::dropIfExists('goods');
    }
}
