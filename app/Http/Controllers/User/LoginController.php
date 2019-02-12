<?php

namespace App\Http\Controllers\User;


use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate(
            [
                'mobile' => 'required|size:11',
                'password' => 'required|string|min:6',
            ]
        );
        $status = User::where('mobile', $data['mobile'])->first()->state;
        //判断一下当前用户是否被禁止登陆
        if ($status != 0) {
            if (Auth::attempt(['mobile' => $data['mobile'], 'password' => $data['password']])) {
                $token = Auth::user()->createToken(config('auth.token_name'))->accessToken;
                return response()->json([
                    'msg' => '登陆成功',
                    'code' => $this->StatusCode['success'],
                    'token' => $token,
                ]);
            }
        }
        return response()->json([
            'msg' => '登陆失败',
            'code' => $this->StatusCode['error']
        ]);
    }

    public function logout(Request $request)
    {

    }

}
