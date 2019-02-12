<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\Goods;
use App\Models\Source;
use App\Models\SourceUrl;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class GoodsController extends BaseController
{
    /*
     * 设置模型
     */
    protected $model = Goods::class;

    /**
     * 发布商品
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        $field = $this->formVerif($request, [
            "goods_title" => "required",
            "goods_desc" => "nullable",
            "goods_content" => "required",
            "wheel_photo" => "nullable",
            "photo" => "required",
            "price" => "required",
            "is_up" => "required",
            "template_id" => "required",
        ]);
        if (isset($field['wheel_photo'])) {
            $field['wheel_photo'] = json_encode($field['wheel_photo']);
        }
        $res = Goods::query()->create($field);
        return $this->returnMsg($res);
    }

    /**
     * 修改商品信息
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
            "goods_title" => "required",
            "goods_desc" => "nullable",
            "goods_content" => "required",
            "wheel_photo" => "nullable",
            "photo" => "required",
            "price" => "required",
            "is_up" => "required",
            "template_id" => "required",
        ]);
        if (isset($field['wheel_photo'])) {
            $field['wheel_photo'] = json_encode($field['wheel_photo']);
        }
        $res = Goods::query()
            ->where('id', $id)
            ->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 批量删除
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function batchDelete(Request $request)
    {
        $ids = $this->formVerif($request, [
            'id' => 'required'
        ])['id'];
        $res = Goods::query()->whereIn('id', $ids)->delete();
        return $this->returnMsg($res);
    }

    public function getList(Request $request)
    {
        return $this->filter($this->model::orderBy('created_at', 'desc'), $request);
    }

}
