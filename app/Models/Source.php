<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    /*
     * 设置操作表
     */
    protected $table = 'sources';

    /*
     * 不需要维护时间
     */
    public $timestamps = false;

    /*
     * 全字段允许批量赋值
     */
    protected $guarded = [];
}
