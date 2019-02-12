<?php
/**
 * 常用模型操作
 * @author 			xy
 */
namespace App\Http\Controllers;

use App\Exceptions\FromVerif;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BaseController extends Controller
{
    /**
     * 当前模型
     *
     * @var string  当前模型
     */
    protected $model = \Illuminate\Database\Eloquent\Model::class;

    /**
     * 获取列表数据
     *
     * @param Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        return $this->filter(new $this->model(), $request);
    }

    /**
     * 获取数据详细信息
     *
     * @param ID $id 传入ID根据模型查找具体信息
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($id)
    {
        $data = $this->model::find($id);
        return $this->returnData($data);
    }

    /**
     * 删除数据
     *
     * @param ID $id 传ID进行删除
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $res = $this->model::destroy($id);
        return $this->returnMsg($res);
    }

    /**
     * 根据ID批量删除数据
     *
     * @param \Illuminate\Http\Request $request 请求体包含ids字段传入多个ID进行批量删除
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function batchDel(Request $request)
    {
        $ids = $request->all();
        foreach ($ids as $item) {
            $this->model::destroy($item);
        }
        return $this->returnMsg(true);
    }

    /**
     * 根据父ID 查询子集菜单
     *
     * @param PID $id 传入父ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getChildren($id){
        $data = $this->model::withCount('SubMenu as children_count')->where('pid',$id)->get()->toArray();
        return $this->returnData($data);
    }

    /**
     * 自定义验证规则
     *
     * @param array $request 请求数据体
     * @param array $rule 验证规则
     *
     * @return \Illuminate\Contracts\Validation\Validator 返回验证的数据
     *
     * @throws \App\Exceptions\FromVerif 如果验证失败抛出异常
     */
    public function formVerif($request, $rule){
        //验证提交数据
        $validator = Validator::make($request->all(), $rule);
        //如果验证出错返回验证错误数据的第一条
        if ($validator->fails()) {
            throw  new FromVerif($validator->errors()->first());
        }
        return $validator->validate();
    }

}
