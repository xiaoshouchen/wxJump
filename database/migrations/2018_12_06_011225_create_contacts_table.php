<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('联系人');
            $table->string('phone')->comment('联系电话');
            $table->string('qq')->nullable()->comment('QQ号码');
            $table->string('company')->nullable()->comment('公司名称');
            $table->string('content')->comment('留言内容');
            $table->string('remark')->nullable()->comment('备注信息');
            $table->tinyInteger('status')->comment('处理状态');
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
        Schema::dropIfExists('contacts');
    }
}
