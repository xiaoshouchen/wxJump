<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\BaseController;
use App\Models\Url;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UrlController extends BaseController
{
    /*
     * 置模型
     */
    protected $model = Url::class;

    /**
     * 添加链接
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        $field = $this->formVerif($request, [
            'type' => 'required',
            'status' => 'required', //主域名还是备用域名
        ]);
        $urls = $this->formVerif($request, [
            'urls' => 'required',
        ]);
        $url = collect($urls['urls'])->map(function ($item) use ($field) {
            $field['url'] = $item;
            $field['user_id'] = auth('api')->id();
          return $field;
        })->toArray();
        $res = Url::query()->insert($url);
        return $this->returnMsg($res);
    }

    /**
     * 修改链接
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
            'url' => 'required',
            'type' => 'required',
        ]);
        $res = Url::query()
            ->find($id)
            ->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 返回用户连接
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $query = $this->model::orderBy('id', 'desc');
        if (isSuperManager()) {
            $query = $query->where('user_id', Auth::id());
        }
        return $this->filter($query, $request);
    }

}
