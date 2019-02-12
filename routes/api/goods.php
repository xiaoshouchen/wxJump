<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/1/22
 * Time: 15:25
 */

Route::group(['namespace'=>'Order'],function () {
    // 来源管理
    Route::prefix('source')->group(function (){
        //来源统计
        Route::get('/count','SourceController@sourceCount');
        Route::get('/zhcount','SourceController@zhCount');
        Route::get('/peoplecount','SourceController@peopleCount');
        Route::get('/extensionURL','SourceController@extensionURL');
        Route::get('/Regenerate/{id}','SourceController@Regenerate');
        Route::get('/','SourceController@getList');
        Route::post('/','SourceController@add');
        Route::put('/{id}','SourceController@edit');
        Route::get('/{id}','SourceController@get');
        Route::delete('/{id}','SourceController@delete');
        Route::post('/batchIdDelete','SourceController@batchIdDelete');

    });
    // 套餐管理
    Route::prefix('meal')->group(function (){
        Route::get('/','SetMealController@getList');
        Route::post('/','SetMealController@add');
        Route::put('/{id}','SetMealController@edit');
        Route::get('/{id}','SetMealController@get');
        Route::delete('/{id}','SetMealController@delete');
        Route::post('/batchIdDelete','SetMealController@batchIdDelete');
    });
    // 尺码管理
    Route::prefix('size')->group(function (){
        Route::get('/','SizeController@getList');
        Route::post('/','SizeController@add');
        Route::put('/{id}','SizeController@edit');
        Route::get('/{id}','SizeController@get');
        Route::delete('/{id}','SizeController@delete');
        Route::post('/batchIdDelete','SizeController@batchIdDelete');
    });
    // 尺码管理
    Route::prefix('goods')->group(function (){
        Route::get('/','GoodsController@getList');
        Route::post('/','GoodsController@add');
        Route::put('/{id}','GoodsController@edit');
        Route::get('/{id}','GoodsController@get');
        Route::delete('/{id}','GoodsController@delete');
        Route::post('/batchDelete','GoodsController@batchDelete');
    });
    Route::prefix('goodsOrder')->group(function() {
        Route::get('repeatCheck', 'OrderController@repeatCheck');
        Route::get('orderSearch', 'OrderController@orderSearch');
        Route::get('orderCount', 'OrderController@orderCount');
        Route::get('/','OrderController@getList');
        Route::get('/ip_source/{id}','OrderController@ipAndPhoneRource');
        Route::delete('/{id}','OrderController@delete');
        Route::post('/batchDelete','OrderController@batchDelete');
        Route::post('/batchEdit','OrderController@batchEditStatus');
        Route::get('/{id}','OrderController@get');
        Route::put('/{id}','OrderController@edit');
        Route::put('/status/{id}','OrderController@editStatus');
    });
});