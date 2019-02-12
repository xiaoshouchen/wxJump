<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleAndAuth extends Model
{
    //
    const NORMAL = 1;
    const DISABLE = 0;

    protected $table = 'role_and_auth';
    //设置黑名单自带
    protected $guarded = [];
    protected $hidden = ['created_at','updated_at'];
    protected $casts = ['extented' => 'array'];


    public function Auth(){
        return $this->hasMany('App\Models\Auth','id','auth_id');
    }
}
