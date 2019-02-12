<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * 批量复制白名单
     * @var array
     */
    protected $fillable = [
        'username', 'password', 'mobile', 'email', 'avatar', 'sex','state'
    ];

    /**
     * 隐藏属性
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','deleted_at'
    ];


    /**
     * 属性类型转换
     * @var array
     */
    protected $casts = [
        'options' => 'array',
        'type'      =>  'string'
    ];


    ## region 模型关联
    // 用户拥有的权限
    public function HasAuth() {
        return $this->hasManyThrough(RoleAndAuth::class,
            UserAndRole::class,
            'user_id',
            'role_id');
    }

    //用户拥有的角色
    public function Roles(){
        return $this->belongsToMany(Role::class,'user_and_role');
    }

    ## endregion



    ## region 访问器
    // 添加到序列化中
    protected $appends = ['sex_name','type_name','state_name'];
    // 数据映射
    private $maps = [
        // 性别
        'sex'   =>  [
            '0' =>  '未填写',
            '1' =>  '男',
            '2' =>  '女'
        ],
        // 用户类型
        'type'  =>  [
            '0' =>  '管理员',
            '1' =>  '普通用户'
        ],
        // 用户状态
        'state' =>  [
            '0' =>  '禁用',
            '1' =>  '正常'
        ],
    ];



    public function getSexNameAttribute()
    {
        $attr = 'sex';
        return $this->maps[$attr][$this->attributes[$attr]];
    }
    public function getTypeNameAttribute()
    {
        $attr = 'type';
        return $this->maps[$attr][$this->attributes[$attr]];
    }
    public function getStateNameAttribute()
    {
        $attr = 'state';
        return $this->maps[$attr][$this->attributes[$attr]];
    }

    ## endregion

}
