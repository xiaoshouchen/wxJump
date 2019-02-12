<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/6
 * Time: 16:37
 */

Route::group(['namespace'=>'User'],function () {

    // 用户管理
    Route::prefix('user')->group(function () {
        Route::get('list', 'UserController@getList');
        Route::get('/{id}', 'UserController@get');
        Route::post('add', 'UserController@add');
        Route::post('edit/{id}', 'UserController@edit');
        Route::get('del/{id}', 'UserController@delete');
        Route::post('del/disable', 'UserController@disable');//禁用用户
        Route::post('give/role', 'UserController@giveRole');//用户给予角色
        Route::get('role/{id}', 'UserController@userRole');//用户所属角色
        Route::post('give/role/edit/{id}', 'UserController@userEditRole');//用户所属角色修改
    });
});