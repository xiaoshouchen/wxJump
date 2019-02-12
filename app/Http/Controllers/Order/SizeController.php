<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\Size;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SizeController extends BaseController
{
    /*
     * 设置模型
     */
    protected $model = Size::class;

    /**
     * 添加尺码信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        $field = $this->formVerif($request, [
            'size_name'=>'required',
            'goods_id'=>'required'
        ]);
        $res = Size::query()->create($field);
        return $this->returnMsg($res);
    }

    /**
     * 修改尺码信息
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        $field = $this->formVerif($request, [
            'size_name'=>'required'
        ]);
        $res = Size::query()
            ->where('id', $id)
            ->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 批量删除尺码信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function batchIdDelete(Request $request)
    {
        $ids = $this->formVerif($request, [
            'id'=>'required'
        ])['id'];
        $res = Size::query()
            ->whereIn('id', $ids)
            ->delete();
        return $this->returnMsg($res);
    }

    public function getList(Request $request)
    {
        return $this->filter($this->model::where('goods_id', $request->get('goods_id')), $request);
    }
}
