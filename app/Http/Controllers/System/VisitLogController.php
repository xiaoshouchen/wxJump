<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\BaseController;
use App\Models\VisitLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VisitLogController extends BaseController
{
    /*
     * 置模型
     */
    protected $model = VisitLog::class;
}
