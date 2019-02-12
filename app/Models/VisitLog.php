<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitLog extends Model
{
    /*
     * 置操作表
     */
    protected $table = 'visit_logs';

    /**
     * 允许批量赋值
     */
    protected $guarded = [];
}
