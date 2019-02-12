<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\BaseController;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

/**
 * 文章回收站
 *
 * Class RecoveryController
 *
 * @category RecoveryController
 * @package  App\Http\Controllers\Article
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class RecoveryController extends BaseController
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
        $query = Article::onlyTrashed();
        if (isSuperManager()) {
            $query = $query->where('user_id', Auth::id());
        }
        $article = $query->get();
        return $this->returnData($article);
    }

    /**
     * 恢复被软删除的文章
     *
     * @param integer $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function recoveryArticle($id) {
        $article = Article::withTrashed()->find($id)->restore();
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
        $article = Article::withTrashed()->find($id)->forceDelete();
        return $this->returnMsg($article);
    }
}
