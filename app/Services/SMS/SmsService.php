<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/29
 * Time: 10:23
 */

namespace App\Services\SMS;


class SmsService
{
    //具体的发送短信服务
    private static  $obj = null;

    //使用的驱动
    private static $drive = [];

    const CODE_MISMATCH = -2 ; //短信验证码不匹配


    /**
     * 调用具体服务的方法
     *
     * @param $method
     * @param $args
     *
     * @return mixed
     * @throws \Exception
     */
    public static function __callStatic($method, $args)
    {

        if (empty(self::$obj)) {
            self::$obj = self::drive();
        }
        return self::$obj->$method(...$args);
    }

    /**
     * 获得默认服务
     *
     * @return mixed
     */
    public static function getDefault()
    {
        return config('app.sms.default');
    }

    /**
     * 获得具体服务
     *
     * @param null $drive
     *
     * @return null
     * @throws \Exception
     */
    public static function drive($drive = null)
    {
        return self::get($drive ?? self::getDefault());
    }

    /**
     * 获得指定服务
     *
     * @param $drive
     *
     * @return null
     * @throws \Exception
     */
    public static function get($drive)
    {
        $class = config('app.sms.drive')[$drive]['drive'];
        //实现单列模式
        if (!isset(self::$drive[$class])) {
            self::$drive[$class] = new $class();
            if (!(self::$drive[$class] instanceof SMS)) {
                throw new \Exception('没有实现短信验证接口');
            }
        }
        return self::$drive[$class];
    }
}