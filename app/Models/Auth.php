<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auth extends Model
{
    //
    protected $table = 'authorities';

    //字段白名单
    protected $fillable = ['menu_id','name','description','keyword','sort','type','extented'];

    ## region 访问器
    // 添加到序列化中
    protected $appends = ['type_name'];

    //属性类型转换
  //  protected $casts = ['type'=>'string'];
    // 数据映射
    private $maps = [
        // 用户状态
        'type' =>  [
            '0' =>  '接口',
            '1' =>  '前端路由'
        ],
    ];

    public function getTypeNameAttribute()
    {
        $attr = 'type';
        return $this->maps[$attr][$this->attributes[$attr]];
    }

    ## endregion

    //关联到菜单
    public function HasMenu(){
        return $this->hasone(Menu::class,'id','menu_id');
    }
}
