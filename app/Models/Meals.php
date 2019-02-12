<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meals extends Model
{
    /*
     * 设置操作表
     */
    protected $table = 'meals';

    /*
     * 允许批量赋值
     */
    protected $guarded = [];

    /*
     * 不维护时间字段
     */
    public $timestamps = false;
}
