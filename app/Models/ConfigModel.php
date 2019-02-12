<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConfigModel extends Model
{
    //设置该模型操作表
    public $table = 'config_models';

    //设置白名单字段
    protected $fillable = ['pid','type','keyword','value','desc'];

    //该模型不需要自动维护时间戳
    public $timestamps = false;

    public function Childs()
    {
        return $this->hasMany('App\Models\ConfigModel','pid');
    }
    //设置模型关联
    public function hasFather () {
        return $this->belongsTo(ConfigModel::class,'pid','id');
    }

    public function getValueAttribute($value){
        if ($this->type == 'json'){
            return json_decode($value);
        }
        return $value;
    }

    public function setValueAttribute($value){
        if($this->attributes['type'] == 'json'){
            $this->attributes['value'] = json_encode($value);
        }else{
            $this->attributes['value'] = $value;
        }
    }
}
