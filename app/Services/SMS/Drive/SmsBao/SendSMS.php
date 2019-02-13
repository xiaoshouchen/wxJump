<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/2/13
 * Time: 10:04
 */

namespace App\Services\SMS\Drive\SmsBao;


use App\Services\SMS\SMS;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SendSMS implements SMS
{
    private $content;

    public function send($phone)
    {
        $statusStr = array(
            "0" => "短信发送成功",
            "-1" => "参数不全",
            "-2" => "服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！",
            "30" => "密码错误",
            "40" => "账号不存在",
            "41" => "余额不足",
            "42" => "帐户已过期",
            "43" => "IP地址限制",
            "50" => "内容含有敏感词"
        );
        $smsapi = config('app.sms.drive.smsbao.domain');

        $user = config('app.sms.drive.smsbao.accessKeyId');//短信平台帐号
        $pass = md5(config('app.sms.drive.smsbao.accessKeySecret'));//短信平台帐号

        $sendurl = $smsapi."sms?u=".$user."&p=".$pass."&m=".$phone."&c=".urlencode($this->content);

        $result = file_get_contents($sendurl);

        return $statusStr[$result];
    }

    /**
     * 设置短信内容
     *
     * @param $mealName
     */
    public function setContent($mealName)
    {
        $message = config('app.sms.message');
        $this->content = str_replace('{product}', $mealName, $message);
    }

}