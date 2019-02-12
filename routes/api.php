<?php

use Illuminate\Http\Request;

Route::post('/buyGoods','Home\GoodsController@orderAdd');

Route::namespace('User')->group(function () {
    Route::post('login', 'LoginController@login');
    Route::post('register', 'RegisterController@register');
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('user', 'UserController@getUserInfo');
        Route::get('logout', 'LoginController@logout');
    });
});

Route::post('contact','Contact\ContactController@add');
Route::post('order','Contact\OrderController@add');
Route::get('sitemap','Article\ArticleController@sitemap');

Route::group(['middleware'=>['auth:api','auth.check']],function (){
    // 用户管理
    require_once base_path('routes/api/user.php');
    //系统管理
    require_once base_path('routes/api/system.php');
    //文章管理
    require_once base_path('routes/api/article.php');
    //商品相关的操作
    require_once base_path('routes/api/goods.php');
    //文件上传
    Route::post('upload','System\UploadController@upload');
});

