<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\BaseController;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * 文章模板管理
 *
 * Class ArticleTemplate
 *
 * @category ArticleTemplate
 * @package  App\Http\Controllers\Article
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class ArticleTemplate extends BaseController
{
    /**
     * 设置模型
     *
     * @var string
     */
    protected $model = \App\Models\ArticleTemplate::class;

    /**
     * 添加模板
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        $filedValue = $this->formVerif($request, [
            'name' => 'required',
            'path' => 'required',
        ]);
        $res = $this->model::create($filedValue);
        return $this->returnMsg($res);
    }

    /**
     * 编辑模板信息
     *
     * @param \Illuminate\Http\Request $request
     * @param   integer                $id 模板id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit(Request $request, $id)
    {
        $filedValue = $this->formVerif($request, [
            'name' => 'required',
            'path' => 'required',
        ]);
        $res = $this->model::find($id)->update($filedValue);
        return $this->returnMsg($res);
    }

    /**
     * 删除模板信息,如果模板关联到文章,吧文章的模板置为默认模板
     *
     * @param \App\Http\Controllers\ID $id 模板记录id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        if ($id == 1) {
            return $this->returnMsg(false,'默认模板不允许删除,删除');
        }
        $result = Article::where('template_id', $id)
            ->get()
            ->isEmpty();
        if (!$result) {
            //当前要删除的模板关联到的文章设置为默认模板
            Article::where('template_id',$id)->update(['template_id'=>1]);
        }
        $res = $this->model::destroy($id);
        return $this->returnMsg($res);
    }
}
