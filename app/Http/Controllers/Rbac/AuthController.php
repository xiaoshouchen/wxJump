<?php

namespace App\Http\Controllers\Rbac;

use App\Models\Auth;
use App\Models\Menu;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;

/**
 * 权限控制器
 *
 * Class AuthController
 *
 * @category AuthController
 * @package  App\Http\Controllers\User
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class AuthController extends BaseController
{
    protected $model = Auth::class;

    /**
     * 添加权限
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        //验证数据格式
        $validator = $request->validate(
            [
                'menu_id' => 'required|numeric',
                "name" => 'required',
                "description" => 'nullable',
                "keyword" => 'required',
                "sort" => 'nullable|numeric',
                "type" => 'nullable|numeric',
                "extented" => 'nullable',
            ]
        );
        $res = $this->model::create($validator);
        return $this->returnMsg($res);
    }

    /**
     * 修改操作
     *
     * @param AuthID                   $id      具体权限ID
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id, Request $request)
    {
        //验证数据格式
        $validator = $request->validate(
            [
                'menu_id' => 'required|numeric',
                "name" => 'required',
                "description" => 'nullable',
                "keyword" => 'required',
                "sort" => 'nullable|numeric',
                "type" => 'nullable|numeric',
                "extented" => 'nullable',
            ]
        );
        $res = $this->model::find($id)->update($validator);
        return $this->returnMsg($res);
    }

    /**
     * 返回权限树形结构
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authTree()
    {
        $tree = Menu::with('SubMenu.SubMenu.HasAuth')->where('pid', 0)->get();
        $tree->map(
            function ($value) {
                $value->SubMenu->map(
                    function ($val) {
                        if (count($val->SubMenu) == 0) {
                            return $val->load('HasAuth');
                        } else {
                            return $val;
                        }
                    }
                );
                return $value;
            }
        );
        return $this->returnData($tree);
    }

}
