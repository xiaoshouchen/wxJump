<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoodsOrder extends Model
{
    /*
     * 设置操作表
     */
    protected $table = 'goods_orders';

    /*
     * 全表可写
     */
    protected $guarded = [];
}
