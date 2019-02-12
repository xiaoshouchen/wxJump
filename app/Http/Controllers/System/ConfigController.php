<?php

namespace App\Http\Controllers\System;

use App\Models\ConfigModel;
use App\Services\SMS\SmsService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ConfigController extends Controller
{

    /**
     * 响应关键字数据
     */
    public function index(Request $request)
    {
        $result = ConfigModel::with('hasFather')
            ->where('keyword', $request->keyword)
            ->first();
        if (empty($result)) {
            return [
                'status' => false,
                'message' => '没有基本信息'
            ];
        }
        return [
            'status' => true,
            'message' => '成功获得所有数据',
            'data' => $result->value];
    }

    /**
     * 插入新配置
     */
    public function store(Request $request)
    {
        ConfigModel::query()->create([
            'pid' => $request->input('pid', 0),
            'type' => $request->type,
            'keyword' => $request->keyword,
            'value' => $request->value,
            'desc' => $request->input('desc', '没有描述')
        ]);
        return ['status' => true, 'message' => '配置成功'];
    }

    /**
     * 修改配置项
     * @param Request $request
     * @param $id
     * @return array
     */
    public function update(Request $request, $id)
    {
        $m = ConfigModel::where('keyword', $request->keyword)->first();
        $m->pid = $request->input('pid', 0);
        $m->type = $request->type;
        $m->keyword = $request->keyword;
        $m->value = $request->value;
        $m->desc = $request->input('desc', '没有描述');
        $m->save();
        return ['status' => true, 'message' => '配置已修改'];
    }

    public function testPhone(Request $request, SmsService $service)
    {
        $provider = $request->get('provider', 'aldy');
        config(["app.sms.drive.{$provider}.SignName"=>$request->get('sing_anme')]);
        config(["app.sms.drive.{$provider}.accessKeyId"=>$request->get('access_key_id')]);
        config(["app.sms.drive.{$provider}.accessKeySecret"=>$request->get('secret')]);
        config(["app.sms.drive.{$provider}.TemplateCode"=>$request->get('TemplateCode')]);
        config(['app.sms.message'=>$request->get('content')]);
        $response = $service::drive($provider)
            ->send(\auth()->user()->mobile);
        if($response->Message == 'OK') {
            return response()->json([
                'code'=>0,
                'msg'=>'发送成功',
            ]);
        }
        else {
            return response()->json([
                'code'=>-1,
                'msg'=>'发送失败,具体错误保存信息后联系管理员',
                'attach'=>$response
            ]);
        }
    }

    public function testEmail(Request $request)
    {
        config(['mail.host'=>$request->get('smtp_server')]);
        config(['mail.port'=>$request->get('smtp_port')]);
        config(['mail.username'=>$request->get('smtp_user')]);
        config(['mail.password'=>$request->get('smtp_password')]);
        config(['mail.from.address'=>$request->get('smtp_user')]);
        config(['mail.from.name'=>'订单系统']);
        config(['mail.encryption'=>'ssl']);
        $message = $request->get('email_title');
        try{
            Mail::raw($message, function($msg) use($message) {
                $msg->to(Auth::user()->email)
                    ->subject($message);
            });
            return [
                'code'=>0,
                'msg'=>'发送成功',
            ];
        }catch (\Swift_TransportException $exception) {
                return [
                    'code'=>-1,
                    'msg'=>'邮件发送失败,具体原因保存配置后联系管理员',
                    'attach'=>[
                        'code'=>$exception->getCode(),
                        'msg'=>$exception->getMessage(),
                    ]
                ];
        }

    }
}
