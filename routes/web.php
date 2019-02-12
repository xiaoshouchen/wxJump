<?php

//后台控制器
Route::get('admin', function () {
    return view('admin');
});
Route::get('t', 't@index');

Route::get('/report', function () {
    return view('goods.report');
});

Route::get('exportOrder', function (\Illuminate\Http\Request $request) {
    $where = $request->get('where', null);
    if ($where) {
        $where = json_decode($where, true);
    }
    $xlsx = \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\OrderExport($where), '订单.xlsx');
    return $xlsx;
});

Route::get('/buySuccess/{id}', 'Home\GoodsController@buySuccess');

Route::get('/{code}', 'Home\GoodsController@show');

