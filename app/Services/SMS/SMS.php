<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/29
 * Time: 10:20
 */

namespace App\Services\SMS;


interface SMS
{
    public function send($phone);

    public function check($tel, $code);

    public function getRandCode();
}