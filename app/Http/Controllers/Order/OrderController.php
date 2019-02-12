<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\GoodsOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use QL\QueryList;

class OrderController extends BaseController
{
    //设置模型
    protected $model = GoodsOrder::class;

    /**
     * 手机号码和Ip定位
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function ipAndPhoneRource($id)
    {
        $order = GoodsOrder::query()
            ->where('id', $id)
            ->first();
        $ql = QueryList::getInstance();
        $html = $ql->get('http://mobsec-dianhua.baidu.com/dianhua_api/open/location?tel=' . $order->phone)
            ->getHtml();
        $phoneLocation = json_decode($html, true)['response'][$order->phone]['location'];

        $ip_html = $ql->get('http://freeapi.ipip.net/' . $order->ip)
            ->getHtml();
        $ipLocation = json_decode($ip_html, true);
        $ipResult = $ipLocation[0] . $ipLocation[1] . $ipLocation[2] . $ipLocation[3];

        $data = [
            'ip' => $ipResult,
            'phone' => $phoneLocation,
        ];
        return $this->returnData($data);
    }

    /**
     * 批量删除
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function batchDelete(Request $request)
    {
        $ids = $this->formVerif($request, [
            'id' => 'required'
        ])['id'];

        $res = GoodsOrder::query()
            ->whereIn('id', $ids)
            ->delete();
        return $this->returnMsg($res);
    }

    /**
     * 返回指定Id订单信息
     *
     * @param integer $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($id)
    {
        $goods = GoodsOrder::query()
            ->where('id', $id)
            ->first()
            ->toArray();
        $goods['source_url'] = url('') . '/' . cmf_url_encrypt($id . '-' . $goods['source']);
        return $this->returnData($goods);
    }

    /**
     * 修改订单
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        $field = $this->formVerif($request, [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
        ]);
        $res = GoodsOrder::query()
            ->where('id', $id)
            ->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 修改订单状态
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function editStatus($id, Request $request)
    {
        $field = $this->formVerif($request, [
            'status' => 'required'
        ]);
        $res = GoodsOrder::query()
            ->where('id', $id)
            ->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 批量修改订单状态
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function batchEditStatus(Request $request)
    {
        $field = $this->formVerif($request, [
            'status' => 'required',
            'id' => 'required'
        ]);
        $res = GoodsOrder::query()
            ->whereIn('id', $field['id'])
            ->update([
                'status' => $field['status']
            ]);
        return $this->returnMsg($res);
    }

    /**
     * 拉去订单列表
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $query = $this->model::orderBy('created_at', 'desc');
        if (isSuperManager()) {
            $query = $query->where('user_id', Auth::id());
        }
        return $this->filter($query, $request);
    }

    /**
     * 重复订单检测
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function repeatCheck()
    {
        $nameCount = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('count(name) AS name_count')
            ])->groupBy('name')
            ->having('name_count', '>', 1)
            ->get()->map(function ($item) {
                return [
                    $item->name_count,
                    $item->name,
                ];
            })->toArray();

        $phoneCount = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('count(phone) AS phone_count')
            ])->groupBy('phone')
            ->having('phone_count', '>', 1)
            ->get()->map(function ($item) {
                return [
                    $item->phone_count,
                    $item->phone,
                ];
            })->toArray();
        return $this->returnData([
            'name' => $nameCount,
            'phone' => $phoneCount,
        ]);
    }

    /**
     * 订单统计信息
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function orderCount()
    {
        $query = GoodsOrder::query();
        $isSuperManager = isSuperManager();
        if ($isSuperManager) {
            $query = $query->where('user_id', Auth::id());
        }
        //总订单数量
        $totalCount = $query->count();

        //今日订单数量
        $todayStartTime = Carbon::parse(Carbon::today())->startOfDay()->format('Y-m-d H:i:s');
        $todayEndTime = $endDate = Carbon::parse(Carbon::today())->endOfDay()->format('Y-m-d H:i:s');
        $todayNewOrderQuery = GoodsOrder::query()
            ->where('created_at', '>=', $todayStartTime)
            ->where('created_at', '<=', $todayEndTime);
        if ($isSuperManager) {
            $todayNewOrderQuery = $todayNewOrderQuery->where('user_id', Auth::id());
        }
        $result['today'] = $todayNewOrderQuery->count();

        //今日已经发货
        $todayAlreadyQuery = GoodsOrder::query()
            ->where('created_at', '>=', $todayStartTime)
            ->where('created_at', '<=', $todayEndTime)
            ->where('status', 1);
        if ($isSuperManager) {
            $todayAlreadyQuery = $todayAlreadyQuery->where('user_id', Auth::id());
        }
        $result['todayAlready'] = $todayAlreadyQuery->count();
        //今日未发货
        $todayNotQuery = GoodsOrder::query()
            ->where('created_at', '>=', $todayStartTime)
            ->where('created_at', '<=', $todayEndTime)
            ->where('status', 0);
        if ($isSuperManager) {
            $todayNotQuery = $todayNotQuery->where('user_id', Auth::id());
        }
        $result['todayNotQuery'] = $todayNotQuery->count();
        //所有订单总金额
        $todayPrice = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
            ]);
        if ($isSuperManager) {
            $todayPrice = $todayPrice->where('user_id', Auth::id());
        }
        $result['todayPrice'] = $todayPrice->first()
            ->toArray()['order_total_price_count'];
        return $this->returnData([
            'today' => $result['today'] ?? 0,
            'totalCount' => $totalCount ?? 0,
            'todayAlready' => $result['todayAlready'] ?? 0,
            'todayNotQuery' => $result['todayNotQuery'] ?? 0,
            'todayPrice' => $result['todayPrice'] ?? '0.00'
        ]);
    }

}
