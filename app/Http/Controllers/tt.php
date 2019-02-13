<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/2/13
 * Time: 11:03
 */

namespace App\Http\Controllers;


use App\Services\SMS\Drive\SmsBao\SendSMS;

class tt extends BaseController
{
    public function index()
    {

    }

    public function send(SendSMS $sendSMS){
        config(['app.sms.drive.smsbao.accessKeyId'=>'wang223000']);//短信平台帐号
        config(['app.sms.drive.smsbao.accessKeySecret'=>'935180069wang']);//短信平台密码
        config(['app.sms.message'=>'【快乐购】您好!您订购的{product} 订单提交成功,请在15分钟内回复本短信,确认订购请回复1, 我们会尽快安排发货']);
        $sendSMS->setContent('纪念币买二送1');
        $response = $sendSMS->send('13686840083');
        dd($response);
    }
}