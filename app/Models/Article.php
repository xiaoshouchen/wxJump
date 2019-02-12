<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
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

    /**
     * 设置操作表
     *
     * @var string
     */
    protected $table = 'articles';

    const NOTALLOW = 0;

    const ALLOW = 1;

        /**
     * 该表所有字段允许赋值
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 该模型不需要维护时间
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * 模型数据类型转换
     *
     * @var array
     */
    protected $casts = [
      'iframe'=>'string',
      'vue'=>'string',
      'random_jump'=>'string',
      'source_check'=>'string',
      'is_wechat'=>'string',
      'ajax'=>'string',
    ];

    /**
     * 追加一个文章状态的字段
     * 
     * @var array 
     */
    protected $appends = ['status','other','url_home'];

    /**
     * 状态访问器针对各个关键字段设置√×,节省前端页面空间
     *
     * @param $value
     *
     * @return mixed
     */
    public function getStatusAttribute($value)
    {
        if (empty($this->appid)){
            $value['appid'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['appid'] = ['status'=>'√','color'=>'green'];
        }
        if (empty($this->photo)){
            $value['photo'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['photo'] =  ['status'=>'√','color'=>'green'];
        }
        if (empty($this->music)){
            $value['music'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['music'] = ['status'=>'√','color'=>'green'];
        }
        return $value;
    }

    /**
     * 其他选项访问器针对各个关键字段设置√×,节省前端页面空间
     *
     * @param $value
     *
     * @return mixed
     */
    public function getOtherAttribute($value)
    {
        if (empty($this->arrow)){
            $value['arrow'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['arrow'] = ['status'=>'√','color'=>'green'];
        }
        if (empty($this->right_now)){
            $value['right_now'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['right_now'] = ['status'=>'√','color'=>'green'];
        }
        if (empty($this->physics)){
            $value['physics'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['physics'] =  ['status'=>'√','color'=>'green'];
        }
        return $value;
    }

    /**
     * 获得前端访问的url链接
     *
     * @param $value
     *
     * @return mixed
     */
    public function getUrlHomeAttribute()
    {

        return url('read',$this->id).'.html';
    }

    public function getPublishTimeAttribute($value)
    {
        $timeStr = strtotime($value);
        return date('Y-m-d',$timeStr);
    }
}
