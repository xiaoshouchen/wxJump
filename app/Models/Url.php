<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    /*
     * 不维护时间
     */
    public $timestamps = false;

    /*
     * 置操作表
     */
    protected $table = 'urls';

    /*
     * 允许批量赋值
     */
    protected $guarded = [];

    const A_URL = 0; //A链接

    const B_URL = 1; //B链接

    protected $appends = ['url_type'];

    /**
     * 链接类型访问器
     *
     * @return string
     */
    public function getUrlTypeAttribute()
    {
        if ($this->type == self::A_URL) {
            return 'A链接';
        }
        if ($this->type == self::B_URL) {
            return 'B链接';
        }
    }
}
