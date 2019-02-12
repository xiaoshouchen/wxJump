<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/22
 * Time: 15:49
 */

Route::group(['namespace'=>'Article'],function (){
    // 文章管理
    Route::prefix('article')->group(function (){
        Route::get('list','ArticleController@getList');
        Route::get('clean','ArticleController@clean');
        Route::get('url', 'ArticleController@ArticleUrl');
        Route::post('add','ArticleController@add');
        Route::post('edit/{id}','ArticleController@edit');
        Route::get('/{id}','ArticleController@get');
        Route::get('del/{id}','ArticleController@delete');
    });
    // 回收站
    Route::prefix('recovery')->group(function (){
        Route::get('list','RecoveryController@getList');
        Route::get('recovery/{id}','RecoveryController@recoveryArticle');
        Route::get('del/{id}','RecoveryController@delete');
    });
    //文章模板管理
    Route::prefix('template')->group(function () {
        Route::get('list','ArticleTemplate@getList');
        Route::post('add','ArticleTemplate@add');
        Route::post('edit/{id}','ArticleTemplate@edit');
        Route::get('/{id}','ArticleTemplate@get');
        Route::get('del/{id}','ArticleTemplate@delete');
    });

    /**
     * url管理
     */
    Route::prefix('url')->group(function () {
        Route::post('/batchDel', 'UrlController@batchDel');
        Route::get('/','UrlController@getList');
        Route::post('/','UrlController@add');
        Route::put('/{id}','UrlController@edit');
        Route::get('/{id}','UrlController@get');
        Route::delete('/{id}','UrlController@delete');
    });
});