<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/2/12
 * Time: 17:07
 */

namespace App\Http\Controllers\Order;


use App\Http\Controllers\BaseController;
use App\Models\GoodsOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecoveryOrder extends BaseController
{
    /**
     * 获得被软删除的文章
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $query = GoodsOrder::query()->onlyTrashed();
        if (isSuperManager()) {
            $query = $query->where('user_id', Auth::id());
        }
        $data = $this->filter($query, $request);
        return $this->returnData($data);
    }

    /**
     * 恢复被软删除的文章
     *
     * @param integer $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function recoveryOrder($id) {
        $article = GoodsOrder::query()
            ->withTrashed()
            ->find($id)
            ->restore();
        return $this->returnMsg($article);
    }

    /**
     * 彻底删除文章
     *
     * @param \App\Http\Controllers\ID $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id){
        $article = GoodsOrder::query()
            ->withTrashed()
            ->find($id)
            ->forceDelete();
        return $this->returnMsg($article);
    }
}