<?php

namespace App\Services\WeXinCheck;

use App\Models\ConfigModel;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use QL\QueryList;

/**
 * 微信拦截检测
 * Class WeChatService
 * @package App\Service
 */
class WeChatService extends BaseService
{
    private $config;

    private $token;

    public function __construct()
    {
        //获取测试号配置
        $this->config = $this->getConfig();
    }

    /**
     * 微信域名检测
     *
     * @param $domain
     * @param bool $fresh
     * @param int $try
     * @return int 0查询失败 1正常 2拦截
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function check($domain, $fresh = false, $try = 1)
    {
        //优先短链接检测
        $intercept = $this->checkViaShortUrl($domain, null);
        if ($intercept == 0 && $try < 2) {
            //失败重试
            return $this->check($domain, $fresh, ++$try);
        }
        return $intercept;
    }

    /**
     * 微信域名检测
     *
     * @param $domain
     * @param null $proxy
     * @return int intercept：0查询失败 1正常 2拦截
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function checkViaShortUrl($domain, $proxy = null)
    {
        $intercept = 0;
        $short_url = '';
        try {
            //获取AccessToken
            $access_token = $this->getAccessToken();
            //生成短链接
            $short_url = $this->getShortUrl($this->token, $domain, $proxy);
            //短链接检测
            if ($this->checkShortUrl($short_url)) {
                $intercept = 1;
            } else {
                $intercept = 2;
            }
            Log::info("微信拦截查询成功[域名：$domain][短链接:$short_url]：" . $intercept);
        } catch (\Exception $exception) {
            Log::info("微信拦截查询失败[域名：$domain][短链接:$short_url]：" . $exception->getMessage());
        }

        return $intercept;
    }

    /**
     * 获取Access_Token
     */
    public function getAccessToken()
    {
        $client = QueryList::getInstance();
        $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' . $this->config['app_id'] . '&secret=' . $this->config['app_secret'];
        $response = $client->get($url)->getHtml();
        $data = json_decode($response, true);
        $this->token = $data['access_token'];
    }

    /**
     * 获取短链接
     * @param $access_token
     * @param string $domain 长域名
     * @param string $proxy 是否使用代理
     * @return mixed
     * @throws \Exception
     */
    private function getShortUrl($access_token, $domain, $proxy)
    {
        $url = "https://api.weixin.qq.com/cgi-bin/shorturl?access_token=$this->token";
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode([
            'action' => 'long2short',
            'long_url' => 'http://' . $domain,
        ]));
        $response = curl_exec($curl);
        curl_close($curl);
        $contents = json_decode($response, true);
        return $contents['short_url'];
    }

    /**
     * 短链接拦截检测
     *
     * @param $url
     * @return bool
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function checkShortUrl($url)
    {
        try {
            $client = new Client();
            $response = $client->request('GET', $url, [
                'curl' => [
                    CURLOPT_SSL_VERIFYPEER => false
                ],
                'connect_timeout' => 2,
                'timeout' => 2,
            ]);
            $contents = $response->getBody()->getContents();
            if (strpos($contents, '已停止访问该网页')) {
                return false;
            } else {
                return true;
            }
        } catch (\Exception $exception) {
            //网站无法访问 = 未拦截
            return true;
        }
    }

    /**
     * 获得微信配置
     *
     * @return mixed
     */
    private function getConfig()
    {
        $config = ConfigModel::query()
            ->where('keyword', 'wx')
            ->first()
            ->toArray()['value'];
        return [
            'app_id' => $config->appid,
            'app_secret' => $config->secret,
        ];

    }

}