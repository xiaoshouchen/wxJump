<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/12/18
 * Time: 12:35
 */

namespace App\Services\SMS\Drive;


use App\Services\SMS\SMS;
use Illuminate\Support\Facades\Redis;
use QL\QueryList;

class LZSendSMS implements SMS
{
    public function send($phone){
        //根据配置生成固定长度的随机码
        $phoneVerify = $this->getRandCode();

        Redis::set($phone, $phoneVerify);
        //设置验证码过期时间
        Redis::EXPIRE($phone, config('app.sms.EXPIRE'));
        $msg = "欢迎您使用58知产网,本次校验码为:".$phoneVerify.
            "，请在".date('i',config('app.sms.EXPIRE')).
            "分钟内输入。【".config('app.sms.drive.lz.SignName')."】";
        $msg = rawurlencode(mb_convert_encoding($msg, "gb2312", "utf-8"));
        $url = config('app.sms.drive.lz.domain').'?CorpID='.
            config('app.sms.drive.lz.CorpID').
            '&Pwd='.config('app.sms.drive.lz.Pwd').
            '&Mobile='.$phone.'&Content='.$msg.'&Cell=&SendTime=';
        $ql = QueryList::getInstance()->get($url);
        if ((int)$ql->getHtml() < 0){
            return false;
        }
        return true;
    }

    public function check($tel, $code){
        $cache = Redis::get($tel);
        if (empty($cache)) {
            return '验证码不存在';
        }
        if ($cache != $code) {
            return '验证码不一致';
        };
        return true;
    }

    public function getRandCode(){
        $length= config('app.sms.length');
        $result = [];
        for ($i=0; $i< $length; $i++) {
            $result[] = rand(0,9);
        }
        $result = implode('', $result);
        return $result;
    }
}