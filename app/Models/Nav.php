<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nav extends Model
{
    //
    protected $casts = ['nav_banner'=>'array'];
    protected $table = 'navs';
    protected $guarded = [];
    public $timestamps = false;

    public function seo()
    {
        return $this->hasOne(SEO::class,'id','seo_id');
    }
}
