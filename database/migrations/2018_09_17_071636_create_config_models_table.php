<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfigModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_models', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('pid')->comment('父id');
            $table->string('type')->comment('类型');
            $table->string('keyword')->comment('关键字');
            $table->text('value')->comment('配置项');
            $table->string('desc')->comment('名称');
        });
        $arr = [
            'article_total'=>0,
            'pv'=>0,
            'share'=>0,
            'submit'=>0,
            'monday'=>0,
            'tuesday'=>0,
            'wednesday'=>0,
            'thursday'=>0,
            'friday'=>0,
            'saturday'=>0,
            'sunday'=>0
        ];
            \App\Models\ConfigModel::create([
                'pid'=>0,
                'keyword'=>'admin_base',
                'type'=>'json',
                'desc'=>'后台首页配置项',
                'value'=>$arr
            ]);

            $arr = [
                "site_name"=>"初始化默认值",
                "icp"=>"初始化默认值",
                "qq"=>"初始化默认值",
                "phone"=>"初始化默认值",
                "tel"=>"初始化默认值",
                "keyword"=>"sitebase",
                "items"=>[
                    ["index"=>'1',"address"=>"初始化默认值","tel"=>"初始化默认值","status"=>1]
                ]
            ];
            //预创建网站基本信息条目
        \App\Models\ConfigModel::create([
            'pid'=>0,
            'keyword'=>'sitebase',
            'type'=>'json',
            'desc'=>'网站基本信息',
            'value'=>$arr
        ]);
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('config_models');
    }
}
