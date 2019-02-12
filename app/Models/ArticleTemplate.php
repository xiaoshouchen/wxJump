<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleTemplate extends Model
{
    /**
     * 设置操作表
     *
     * @var string
     */
    protected $table = 'html_templates';

    /**
     * 允许批量赋值
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 不需要维护时间字段
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * 追加2个字段前端好绑定
     *
     * @var array
     */
    protected $appends = ['value','label'];

    /**
     * value 访问器 与id绑定
     *
     * @param $value
     *
     * @return mixed
     */
    public function getValueAttribute($value)
    {
        return $this->id;
    }

    /**
     * label访问器 与name绑定
     *
     * @param $value
     *
     * @return mixed
     */
    public function getLabelAttribute($value)
    {
        return $this->name;
    }
}
