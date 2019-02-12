<?php

namespace App\Http\Controllers;

use App\Models\GoodsOrder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use PhpParser\Node\Expr\Array_;

/**
 * Class Controller
 *
 * @category Controller
 * @package  App\Http\Controllers
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    /**
     * 接口返回状态码，接口中统一使用此处状态码
     *
     * @var array
     */
    protected $StatusCode = [
        'success' => 0,      // 成功
        'error' => -1,     // 失败
        'no_authority' => -2, // 无权限
    ];

    public function __construct()
    {

    }


    /**
     * 返回简单类型接口提示信息 例如：新增 编辑 删除等...
     *
     * @param boolean $res 结果
     * @param string  $msg 消息
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function returnMsg($res, $msg = "操作")
    {
        if ($res) {
            return response()->json(
                [
                    'code' => $this->StatusCode['success'],
                    'msg' => $msg . '成功',
                ]
            );
        } else {
            return response()->json(
                [
                    'code' => $this->StatusCode['error'],
                    'msg' => $msg . '失败'
                ]
            );
        }
    }

    /**
     * 返回简单接口数据
     *
     * @param Array $data 传入数组或者集合
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function returnData($data)
    {
        if ($data) {
            return response()->json(
                [
                    'code' => $this->StatusCode['success'],
                    'data' => $data
                ]
            );
        } else {
            return response()->json(
                [
                    'code' => $this->StatusCode['error'],
                    'data' => $data
                ]
            );
        }
    }

    /**
     * 基础过滤数据
     *
     * @param                          $model
     * @param \Illuminate\Http\Request $request
     * @param string                   $type
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function filter($model, \Illuminate\Http\Request $request, $type = 'json')
    {
        try {
            $page = $request->input('page', 1);
            $limit = $request->input('limit', 10);
            $orderBy = explode(',', $request->input('orderBy', 'id,desc'));
            $search = $request->input('search', false);
            $where = $request->input('where', false);
            if ($request->isMethod('get')) {
                $search = $search ? json_decode($search, true) : false;
                $where = $where ? json_decode($where, true) : false;
            }
            if ($where) {
                $where = array_filter($where, function ($var) {
                    return $var !== '' || $var !== null;
                });
                foreach ($where as $k => $v) {
                    if (is_array($v)) {
                        $model = $model->whereIn($k, $v);
                        unset($where[$k]);
                    }
                }

                if (count($where) > 0) {
                    $model = $model->where($where);
                }
            }

            if ($search && $search['value'] !== '' && $search['value'] !== null) {
                $model = $model->where($search['field'], 'like', '%' . $search['value'] . '%');
            }
            $count = $model->count();
            $data = $model->skip(($page - 1) * $limit)->take($limit)->orderBy($orderBy[0], $orderBy[1])->get();
            if ($type == 'json') {
                return response()->json(
                    [
                        'count' => $count,
                        'data' => $data,
                        'code' => $this->StatusCode['success'],
                        'msg' => '查询成功'
                    ]
                );
            }
            if($type == 'array') {
                return [
                    'count' => $count,
                    'data' => $data,
                    'code' => $this->StatusCode['success'],
                    'msg' => '查询成功'
                ];
            }

        } catch (\Exception $exception) {
            return response()->json(['code' => $this->StatusCode['error'], 'msg' => $exception->getMessage()]);
        }
    }
}
