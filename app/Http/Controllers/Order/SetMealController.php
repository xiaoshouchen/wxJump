<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\Meals;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * 商品套餐管理
 *
 * Class SetMealController
 *
 * @category SetMealController
 * @package  App\Http\Controllers\Order
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class SetMealController extends BaseController
{
    /*
     * 设置模型
     */
    protected $model = Meals::class;

    /**
     * 添加套餐信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        $field = $this->formVerif($request, [
            'meal_name'=>'required',
            'meal_price'=>'required',
            'meal_stock'=>'required',
            'goods_id'=>'required',
        ]);
        $res = Meals::query()->create($field);
        return $this->returnMsg($res);
    }

    /**
     * 修改套餐信息
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
            'meal_name'=>'required',
            'meal_price'=>'required',
            'meal_stock'=>'required',
        ]);
        $res = Meals::query()
            ->where('id', $id)
            ->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 批量删除套餐信息
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
        $res = Meals::query()
            ->whereIn('id', $ids)
            ->delete();
        return $this->returnMsg($res);
    }

    /**
     * 返回商品Id对应的套餐信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        return $this->filter($this->model::where('goods_id', $request->get('goods_id')), $request);
    }
}
