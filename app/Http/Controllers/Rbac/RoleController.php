<?php

namespace App\Http\Controllers\Rbac;

use App\Models\Auth;
use App\Models\Role;
use App\Models\RoleAndAuth;
use App\Models\RoleAndMenu;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Class RoleController
 *
 * @category RoleController
 * @package  App\Http\Controllers\User
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class RoleController extends BaseController
{
    protected $model = Role::class;

    /**
     * 添加角色
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $validatedData = $request->validate([
            'name'          =>  'required|max:255',
            'description'   =>  'nullable',
            'sort'          =>  'nullable',
            'state'         =>'nullable',
        ]);

        $res = $this->model::create($validatedData);
        return $this->returnMsg($res);
    }

    public function get($id){
        $data = Role::with('HasAuth')->find($id);
        return $this->returnData($data);
    }

    /**
     * 修改角色信息
     *
     * @param \Illuminate\Http\Request $request 请求体
     * @param RoleID                   $id      角色ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name'          =>  'required|max:255',
            'description'   => 'nullable',
            'sort'          =>  'nullable',
            'state'         =>'nullable'
        ]);
        $res = $this->model::find($id)->update($validatedData);
        //所有关联权限状态也跟着同步
        $res =  RoleAndAuth::where('role_id', $id)->update(['state' => $validatedData['state']]);
        return $this->returnMsg($res);
    }

    /**
     * 禁用角色信息
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function disable(Request $request)
    {
        //状态设置为禁用
        $this->model::whereIn('id', $request->all())->update(['state' => Role::DISABLE]);
        //所有关联权限状态也设置为禁用
        $res =  RoleAndAuth::whereIn('role_id', $request->all())->update(['state' => Role::DISABLE]);
        return $this->returnMsg($res);
    }

    /**
     * 给角色信息赋予权限
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function GiveAuth(Request $request){
        $validatedData = $request->validate([
            'roles'     =>  'required',
            'menu'      =>  'required',
            'auth'      =>  'nullable',
        ]);
        $roles = $validatedData['roles'];
       // $menus = $validatedData['menu'];
        $auths = $validatedData['auth'];

        DB::beginTransaction();
        try{
            foreach ($roles as $role){
                $role_auth = [];
               // $role_menu = [];
                foreach ($auths as $auth) {
                    $role_auth[] =[
                        'role_id'=>$role,
                        'page'=>str_replace('/','',$auth['url']),
                        'auth_id'=>$auth['id'],
                        'extented'=>json_encode($auth['extented']),
                        'state'=>1
                    ];
                }
//                foreach ($menus as $menu) {
//                    $role_menu[] =['role_id'=>$role,'menu_id'=>$menu];
//                }
                RoleAndAuth::where('role_id',$role)->delete();
                //RoleAndMenu::where('role_id',$role)->delete();
                RoleAndAuth::insert($role_auth);
                //RoleAndMenu::insert($role_menu);
            }
            DB::commit();
        }catch (\Exception $exception){
            $msg = $exception->getMessage();
            DB::rollBack();
            return $this->returnMsg(false);
        }
        return $this->returnMsg(true);
    }

    // 获取角色权限
    public function GetRoleHasAuth($role)
    {
        $auth = RoleAndAuth::with('Auth')
            ->where(['role_id'=>$role,'state'=>1])
            ->select('auth_id','extented','page')
            ->get();
        $menu = $auth->map(function ($value){
            Log::channel('record')->info($value->toArray());
            $result = [];
            $result['page'] =  '/'.$value->page;
            $result['menu_id'] =  $value->auth[0]->menu_id;
            return $result;
        });
        return $this->returnData(['menu'=>$menu,'auth'=>$auth]);
    }
}
