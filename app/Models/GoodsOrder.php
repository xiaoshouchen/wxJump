<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoodsOrder extends Model
{
    /**
     * 启用软删除
     */
    use SoftDeletes;

    /**
     * 应该被调整为日期的属性
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /*
     * 设置操作表
     */
    protected $table = 'goods_orders';

    /*
     * 全表可写
     */
    protected $guarded = [];
}
