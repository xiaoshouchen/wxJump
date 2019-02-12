<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    /*
     * 不维护时间
     */
    public $timestamps = false;

    /*
     * 允许批量赋值
     */
    protected $guarded = [];

    /*
     * 设置操作表
     */
    protected $table = 'sizes';
}
