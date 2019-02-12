<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSourceUrlsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('source_urls', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('goods_id')->comment('商品Id');
            $table->string('source_name')->comment('商品的推广渠道');
            $table->string('source_url')->comment('商品的来源地址');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('source_urls');
    }
}
