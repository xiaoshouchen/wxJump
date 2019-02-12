<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

/**
 * 文件上传控制器
 *
 * Class UploadController
 *
 * @category UploadController
 * @package  App\Http\Controllers\System
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class UploadController extends Controller
{
    /**
     * 上传文件方法返回上传文件后的绝对URL链接地址
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return array
     */
    public function upload(Request $request)
    {
        // 获取表单上传文件 例如上传了001.jpg
        $file = $request->file('file');
        if (!$file->isValid()) {
            echo json_encode(['error' => $file->getError(), 'msg' => '上传失败']);
        }
        //$path = $request->file('avatar')->store('avatars');
        $path = Storage::url(Storage::putFile('/', $file));
        return ['url'=>$path];
    }
}
