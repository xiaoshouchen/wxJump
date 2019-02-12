<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSEOsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_e_os', function (Blueprint $table) {
            $table->increments('id');
            $table->string('keywords')->nullable()->comment('页面关键字');
            $table->string('desc')->nullable()->comment('页面关键字');
            $table->string('title')->nullable()->comment('页面标题');
            $table->string('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('s_e_os');
    }
}
