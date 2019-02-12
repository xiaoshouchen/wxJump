<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/29
 * Time: 10:14
 */

namespace App\Services\SMS\Drive;

use App\Services\SMS\SMS;
use Illuminate\Support\Facades\Redis;
use Mockery\Exception;

/**
 * 阿里大鱼发送短信服务
 *
 * Class ALDYSendSMS
 *
 * @category ALDYSendSMS
 * @package  App\Services\SMS
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class ALDYSendSMS implements SMS
{
    public function send($tel)
    {
        $params = array();
        // *** 需用户填写部分 ***
        // fixme 必填: 请参阅 https://ak-console.aliyun.com/ 取得您的AK信息
        $accessKeyId = config('app.sms.drive.aldy.accessKeyId');
        $accessKeySecret = config('app.sms.drive.aldy.accessKeySecret');
        // fixme 必填: 短信接收号码
        $params["PhoneNumbers"] = $tel;

        // fixme 必填: 短信签名，应严格按"签名名称"填写，请参考: https://dysms.console.aliyun.com/dysms.htm#/develop/sign
        $params["SignName"] = config('app.sms.drive.aldy.SignName');

        // fixme 必填: 短信模板Code，应严格按"模板CODE"填写, 请参考: https://dysms.console.aliyun.com/dysms.htm#/develop/template
        $params["TemplateCode"] = config('app.sms.drive.aldy.TemplateCode');

        //fixme 可选: 设置模板参数, 假如模板中存在变量需要替换则为必填项
//        $params['TemplateParam'] = Array(
//            "code" => config('app.sms.message'),
//            //   "product" => "阿里通信"
//        );
        // *** 需用户填写部分结束, 以下代码若无必要无需更改 ***
        if (!empty($params["TemplateParam"]) && is_array($params["TemplateParam"])) {
            $params["TemplateParam"] = json_encode($params["TemplateParam"], JSON_UNESCAPED_UNICODE);
        }
        // 初始化SignatureHelper实例用于设置参数，签名以及发送请求
        $helper = new SignatureHelper();
        // 此处可能会抛出异常，注意catch
        $content = $helper->request(
            $accessKeyId,
            $accessKeySecret,
            config('app.sms.drive.aldy.domain'),
            array_merge($params, array(
                "RegionId" => "cn-hangzhou",
                "Action" => "SendSms",
                "Version" => "2017-05-25",
            ))
        );
        return $content;
    }

    /**
     * 验证手机号码和填写的验证码是否对应
     *
     * @param string $tel 手机号码
     * @param string $code 验证码
     *
     * @return bool
     */
    public function check($tel, $code)
    {
        $cache = Redis::get($tel);
        if (empty($cache)) {
            return '验证码不存在';
        }
        if ($cache != $code) {
            return '验证码不一致';
        };
        return true;
    }

    /**
     * 根据配置短信验证码的长度获得随机验证码
     *
     * @return array
     */
    public function getRandCode()
    {
        $length = config('app.sms.length');
        $result = [];
        for ($i = 0; $i < $length; $i++) {
            $result[] = rand(0, 9);
        }
        $result = implode('', $result);
        return $result;
    }
}