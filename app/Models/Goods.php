<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goods extends Model
{
    /*
     * 设置操作表
     */
    protected $table = 'goods';

    /*
     * 全字段批量赋值
     */
    protected $guarded = [];

    protected $appends = ['is_up_name', 'template'];

    protected $casts = [
      'is_up'=>'string'
    ];
    /*
     * 商品下架
     */
    const OFF_SHELF = '0';
    /*
     * 商品上架
     */
    const ON_SHELF = '1';

    public function getIsUpNameAttribute()
    {
        if ($this->is_up == self::OFF_SHELF) {
            return [
                'status'=>'×',
                'color'=>'red'
            ];
        }
        if ($this->is_up == self::ON_SHELF) {
            return [
                'status'=>'√',
                'color'=>'green'
            ];
        }
    }

    public function getWheelPhotoAttribute($value)
    {
        if (!empty($value)) {
            return json_decode($value);
        }
    }

    /**
     * 关联到商品展示模板
     *
     * @return mixed
     */
    public function getTemplateAttribute()
    {
      return  ArticleTemplate::query()->find($this->template_id)->name;
    }

    /**
     * 商品关联到套餐信息
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function meals()
    {
        return $this->hasMany(Meals::class, 'goods_id', 'id');
    }

    /**
     * 商品关联到尺寸
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function size()
    {
        return $this->hasMany(Size::class, 'goods_id', 'id');
    }

}
