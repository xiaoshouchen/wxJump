<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGoodsOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('goods_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('status')->nullable()->comment('订单处理状态');
            $table->string('meal_name')->comment('套餐名称');
            $table->integer('num')->comment('购买数量');
            $table->string('order_num')->comment('订单数量');
            $table->string('phone')->comment('购买人联系电话');
            $table->string('address')->comment('购买人联系地址');
            $table->text('message')->nullable()->comment('留言');
            $table->string('source')->comment('订单来源');
            $table->string('name')->comment('购买人姓名');
            $table->decimal('order_total_price')->comment('订单总价');
            $table->string('size_name')->nullable()->comment('尺码信息');
            $table->string('ip')->nullable()->comment('ip信息');
            $table->string('goods_name')->comment('商品名称');
            $table->string('paytype')->comment('付款方法');
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
        Schema::dropIfExists('goods_orders');
    }
}
