<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SourceUrl extends Model
{
    /*
     * 设置操作表
     */
    protected $table = 'source_urls';

    /*
     * 不维护时间
     */
    public $timestamps = false;

    /*
     * 全部字段允许批量赋值
     */
    protected $guarded = [];
}
