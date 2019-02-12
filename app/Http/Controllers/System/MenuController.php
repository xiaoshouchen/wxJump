<?php

namespace App\Http\Controllers\System;

use App\Models\Role;
use App\Models\RoleAndAuth;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Menu;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use phpseclib\System\SSH\Agent\Identity;

/**
 * Class MenuController
 *
 * @category MenuController
 * @package  App\Http\Controllers\System
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class MenuController extends BaseController
{
    protected $model = Menu::class;

    /**
     * 获得树形结构
     *
     * @return mixed
     */
    public function getTree()
    {
        $tree = $this->model::with('SubMenu.SubMenu')
            ->where('pid', 0)
            ->get()
            ->toArray();

        return $tree;
    }

    public function getList(Request $request)
    {
        return $this->filter($this->model::withCount('SubMenu as children_count'), $request);
    }

    /**
     * 获取分类
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategroy()
    {
        $tree = $this->model::with('SubMenu')
            ->where('pid', 0)
            ->get()
            ->toArray();
        return $this->returnMsg($tree);
    }

    /**
     * 添加菜单
     *
     * @param Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'pid' => 'required|numeric',
            'state' => 'required|numeric',
            'icon' => 'nullable',
            'sort' => 'nullable',
            'url' => 'nullable',
        ]);
        $res = $this->model::create($validatedData);
        return $this->returnMsg($res);
    }

    /**
     * 编辑菜单
     *
     * @param Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required|max:255',
            'pid' => 'required|numeric',
            'state' => 'required|numeric',
            'icon' => 'nullable',
            'sort' => 'nullable|numeric',
            'url' => 'nullable',
        ]);
        $id = $validatedData['id'];
        unset($validatedData['id']);
        $res = $this->model::find($id)->update($validatedData);
        return $this->returnMsg($res);
    }

    /**
     * 根据ID查找父类id 级联菜单回显使用
     *
     * @param Request $id 请求中传入子类ID递归找出父ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getParentId($id)
    {
        static $result = [];
        // 当前所在位置 调试值1
        $pid = $this->model::where('id', $id)->get(['id', 'pid'])->toArray();
        //如果不是最顶级
        if ($pid[0]['pid'] != 0) {
            //加入ID
            $result[] = $pid[0]['id'];
            $this->getParentId($pid[0]['pid']);
        } else {
            //加入最顶级ID
            $result[] = $pid[0]['id'];
        }
        return $this->returnData(array_reverse($result));

    }

    // 根据父ID 查询子集菜单
    public function getChildren($id)
    {
        $data = $this->model::withCount('SubMenu as children_count')->where('pid', $id)->get()->toArray();
        //$data = $this->model::where('pid',$id)->get()->toArray();

        return $this->returnData($data);
        $pid = $this->model::where('id', $id)
            ->get(['id', 'pid'])
            ->toArray();
        //如果不是最顶级
        if ($pid[0]['pid'] != 0) {
            //加入ID
            $result[] = $pid[0]['id'];
            $this->getParentId($pid[0]['pid']);
        } else {
            //加入最顶级ID
            $result[] = $pid[0]['id'];
        }
        return $this->returnData(array_reverse($result));
    }

    //获取用户可见菜单
    public function userTree()
    {
        $userid = Auth::user()->id;
        $user = User::find($userid);
        $data = $user->roles()->get()->toArray();
        $roleID = [];
        //得到当前用户所有角色ID
        foreach ($data as $role) {
            $roleID[] = $role['pivot']['role_id'];
        }
        //查询角色可以访问的菜单
        $menu_url = RoleAndAuth::where('state','<>','0')->whereIn('role_id', $roleID)
            ->get(['page'])
            ->pluck('page')
            ->map(function ($value){
            return '/'.$value;
        })->toArray();
        $menu_id = Menu::whereIn('url',$menu_url)->pluck('id')->toArray();
        //去重
        $uniq_menu_id = array_unique($menu_id);
        $pids = [];
        foreach ($uniq_menu_id as $item_menu_id) {
            $pids[] = $this->getPid($item_menu_id);
        }
        //查询出菜单内容
        $query = Menu::with(
                ['subMenu'=>function($query) use($uniq_menu_id)
            {
                $query->with(['subMenu'=>function($subQuery) use($uniq_menu_id) {
                    $subQuery->whereIn('id',$uniq_menu_id)->where('state', 1);
                }])->whereIn('id',$uniq_menu_id)->where('state', 1);
            }]
        )->whereIn('id',$pids)
            ->where('state', 1)
            ->get()
            ->toArray();
        return $query;
    }

    /**
     * 根据菜单id获取到他的最顶级id
     *
     * @param integer $menu_id 菜单ID
     *
     * @return mixed
     */
    public function getPid($menu_id){
        $pid = $this->model::where('id', $menu_id)->first(['id','pid'])->toArray();
        //如果不是最顶级
        if ($pid['pid'] != 0) {
            return $this->getPid($pid['pid']);
        }
        return $pid['id'];
    }
}
