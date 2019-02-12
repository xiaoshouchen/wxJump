<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;


class RegisterController extends Controller
{

    public function register(Request $request)
    {
        $data = $request->validate(
            [
                'username' => 'required|string|max:20|min:1',
                'mobile' => 'required|size:11|unique:users',
                'password' => 'required|string|min:6',
                'state' => 'nullable'
            ]
        );
        $user = $this->create($data);
        return response()->json(['msg' => 'ok', 'code' => 0]);
    }


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     *
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        return User::create([
            'username' => $data['username'],
            'mobile' => $data['mobile'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
