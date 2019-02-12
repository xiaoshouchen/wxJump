<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseController;
use App\Models\Role;
use App\Models\RoleAndAuth;
use App\Models\Source;
use App\Models\User;
use App\Models\UserAndRole;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseController
{

    protected $model = User::class;

    // 获取用户信息
    public function getUserInfo()
    {
        $user = Auth::user()->toArray();
        if ($user){
            $user['auth'] = $this->getAuth(Auth::id());
            $user['access'] = $this->getAccess($user['auth']);
            return response()->json(['code'=>$this->StatusCode['success'],'user'=>$user]);
        }else{
            return response()->json(['code'=>$this->StatusCode['error'],'msg'=>'获取用户信息失败']);
        }
    }

    /**
     * 获得用户可访问页面
     *
     *  @param array auth 用户的权限
     *
     * @return array
     */
    public function getAccess($auth){
        $result = [];
        $page = array_keys($auth);
        foreach ($page as $item) {
            $result[] = '/'.$item;
        }
        return $result;
    }

    /**
     * 返回页面具体权限
     *
     * @param int id 用户id
     *
     * @return array
     */
    public function getAuth($id) {

        $roleId = UserAndRole::query()
            ->where('user_id', $id)
            ->get()
            ->pluck('role_id')
            ->toArray();

        $auth = RoleAndAuth::query()
            ->whereIn('role_id', $roleId)
            ->get()
            ->toArray();

        $result = [];
        foreach ($auth as $item) {
            //返回没有被禁用的权限
            if ($item['state'] == RoleAndAuth::NORMAL) {
                $result[$item['page']] = $item['extented'];
            }
        }
        return $result;
    }

    /**
     * 添加用户
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $validatedData = $request->validate(
            [
                'username' => 'required',
                'password' => 'required',
                'mobile' => 'required|numeric',
                'email' => 'required',
                'avatar' => 'required',
                'sex' => 'required',
                'state' => 'nullable',
                'options' => 'nullable',
            ]
        );
        $validatedData['password'] = Hash::make($validatedData['password']);
        $res = $this->model::create($validatedData);
        Source::query()->create([
            'name'=> $validatedData['username']
        ]);
        return $this->returnMsg($res);
    }

    /**
     * 修改用户信息
     *
     * @param \Illuminate\Http\Request $request 请求体
     * @param UserID                   $id      用户ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        $validatedData = $request->validate(
            [
                'username' => 'required',
                'password' => 'nullable',
                'mobile' => 'required|numeric',
                'email' => 'required',
                'avatar' => 'required',
                'sex' => 'required',
                'state' => 'nullable',
                'options' => 'nullable',
            ]
        );
        if (array_key_exists('password', $validatedData)) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }
        $res = $this->model::find($id)->update($validatedData);
        return $this->returnMsg($res);
    }

    /**
     * 禁用用户账号
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function disable(Request $request)
    {
        $res = $this->model::whereIn('id', $request->all())->update(['state' => 0]);

        return $this->returnMsg($res);
    }

    /**
     * 用户赋予角色
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function giveRole(Request $request)
    {
        $roles = $request->all();
        $users = array_pop($roles);
        //所有选择的用户ID
        foreach ($users['ids'] as $user) {
            //选择的角色名称
            foreach ($roles as $item) {
                $roleId = Role::where('name', $item)->first(['id'])->id;
                $userData = User::find($user);
                $user_ids = UserAndRole::where('role_id', $roleId)->get()->pluck('user_id');
                //如果当前用户不拥有选择的角色
                foreach ($user_ids as $uid){
                    if ($uid != $userData->id) {
                        $userData->roles()->attach($roleId);
                    }
                }
            }
        }
        return $this->returnMsg(true);
    }

    /**
     * 根据用户ID 查找该用户所有的用户组返回用户组名称
     *
     * @param integer $id 用户ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userRole($id)
    {
        $roles = User::with('roles')->where('id', $id)->first()->roles->toArray();
        $roleName = [];
        foreach ($roles as $item) {
            $roleName[] = $item['name'];
        }
        return $this->returnData($roleName);
    }

    /**
     * 修改单一用户的所属用户组
     *
     * @param \Illuminate\Http\Request $request 请求体
     * @param integer                  $id      用户ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userEditRole(Request $request, $id)
    {
        $user = User::find($id);
        $roles = $request->all();
        $roleId = Role::whereIn('name', $roles)->get()->pluck('id');
        $res = $user->roles()->sync($roleId);
        return $this->returnMsg($res);
    }
}
