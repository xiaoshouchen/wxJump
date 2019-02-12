<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\Goods;
use App\Models\GoodsOrder;
use App\Models\Source;
use App\Models\SourceUrl;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SourceController extends BaseController
{
    /*
     * 设置控制器模型
     */
    protected $model = Source::class;

    /**
     * 添加来源
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        //验证表单字段
        $source = $this->formVerif($request, [
            'name' => 'required', //来源名称
        ]);
        $res = Source::query()->create($source);
        return $this->returnMsg($res);
    }

    /**
     * 修改来源信息
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        //验证表单字段
        $source = $this->formVerif($request, [
            'name' => 'required', //来源名称
        ]);
        $res = Source::query()
            ->where('id', $id)
            ->update($source);
        return $this->returnMsg($res);
    }

    /**
     * 根据Id批量删除来源信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function batchIdDelete(Request $request)
    {
        //验证表单字段
        $source = $this->formVerif($request, [
            'id' => 'required', //来源id
        ]);
        $res = Source::query()
            ->whereIn('id', $source['id'])
            ->delete();
        return $this->returnMsg($res);
    }

    /**
     * 返回指定Id商品的推广链接的列表
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function extensionURL(Request $request)
    {
        return $this->filter(SourceUrl::query()->where('goods_id', $request->get('goods_id')), $request);
    }

    /**
     * 重新生成商品推广链接
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function Regenerate($id)
    {
        SourceUrl::query()
            ->where('goods_id', $id)
            ->delete();

        //生成推广链接
        $source = Source::query()
            ->get()
            ->toArray();
        foreach ($source as $v) {
            $users = User::query()
                ->where('username', $v['name'])
                ->select('id', 'sex', 'type', 'state')
                ->get()
                ->toArray();
            if (!empty($users)) {
                foreach ($users as $user) {
                    $insert['source_name'] = $v['name'];
                    $insert['goods_id'] = $id;
                    $insert['source_url'] = url('') . '/' . cmf_url_encrypt($id . '-' . $v['name'] . '-' . $user['id']);
                    SourceUrl::query()->create($insert);
                }
            } else {
                $insert['source_name'] = $v['name'];
                $insert['goods_id'] = $id;
                $insert['source_url'] = url('') . '/' . cmf_url_encrypt($id . '-' . $v['name'].'-'.'0');
            }
        }
        return $this->returnMsg(true);
    }

    /**
     * 来源统计
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sourceCount()
    {
        $result = [];
        $todayStartTime = Carbon::parse(Carbon::today())->startOfDay()->format('Y-m-d H:i:s');
        $todayEndTime = $endDate = Carbon::parse(Carbon::today())->endOfDay()->format('Y-m-d H:i:s');
        $result['today'] = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
                DB::raw('count(source) AS source_count')
            ])
            ->groupBy('source')
            ->where('created_at', '>=', $todayStartTime)
            ->where('created_at', '<=', $todayEndTime)
            ->orderBy('source_count', 'desc')
            ->get()
            ->map(function ($item) {
                $value['source'] = $item->source;
                $value['order_total_price_count'] = $item->order_total_price_count;
                $value['source_count'] = $item->source_count;
                return $value;
            });

        $YesterdayStartTime = Carbon::parse(Carbon::yesterday())->startOfDay()->format('Y-m-d H:i:s');
        $YesterdayEndTime = Carbon::parse(Carbon::yesterday())->endOfDay()->format('Y-m-d H:i:s');
        $result['Yesterday'] = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
                DB::raw('count(source) AS source_count')
            ])
            ->groupBy('source')
            ->where('created_at', '>=', $YesterdayStartTime)
            ->where('created_at', '<=', $YesterdayEndTime)
            ->orderBy('source_count', 'desc')
            ->get()
            ->map(function ($item) {
                $value['source'] = $item->source;
                $value['order_total_price_count'] = $item->order_total_price_count;
                $value['source_count'] = $item->source_count;
                return $value;
            });
        $result['all'] = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
                DB::raw('count(source) AS source_count')
            ])
            ->groupBy('source')
            ->orderBy('source_count', 'desc')
            ->get()
            ->map(function ($item) {
                $value['source'] = $item->source;
                $value['order_total_price_count'] = $item->order_total_price_count;
                $value['source_count'] = $item->source_count;
                return $value;
            });
        return $this->returnData($result);
    }

    /**
     * 综合统计
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function zhCount()
    {
        //1-12月的销售统计
        for ($i = 1; $i <= 12; $i++) {
            $monthCount[$i] = GoodsOrder::query()
                ->select([
                    '*',
                    DB::raw('SUM(order_total_price) AS order_total_price_count'),
                    DB::raw('count(*) AS order_count')
                ])
                ->whereMonth('created_at', $i)
                ->first();
        }
        //当前天数 递减12天的销售统计
        for ($i = 0; $i < 12; $i++) {
            $dayTime[$i]['day'] = Carbon::today()->modify("-{$i} days")->format('d');
            $dayTime[$i]['data'] = GoodsOrder::query()
                ->select([
                    '*',
                    DB::raw('SUM(order_total_price) AS order_total_price_count'),
                    DB::raw('count(*) AS order_count')
                ])
                ->whereDay('created_at', $dayTime[$i]['day'])
                ->first();
        }

        $goodsNameCount = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
                DB::raw('count(goods_name) AS goods_name_count')
            ])
            ->groupBy('goods_name')
            ->get();

        $provinceCount = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
                DB::raw('count(*) AS order_count')
            ])
            ->groupBy('province')
            ->get();
        return $this->returnData([
            'monthCount'=>$monthCount,
            'dayCount'=>$dayTime,
            'goodsNameCount'=>$goodsNameCount ,
            'provinceCount'=>$provinceCount ,
        ]);
    }

    /**
     * 员工统计
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function peopleCount()
    {
        $userNames = User::query()
            ->get(['username','sex','type','state'])
            ->pluck('username')
            ->toArray();
        $peopleCount['total'] = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
                DB::raw('count(*) AS order_count')
            ])
            ->whereIn('source', $userNames)
            ->get();
        $todayStartTime = Carbon::parse(Carbon::today())->startOfDay()->format('Y-m-d H:i:s');
        $todayEndTime = $endDate = Carbon::parse(Carbon::today())->endOfDay()->format('Y-m-d H:i:s');
        $peopleCount['today'] = GoodsOrder::query()
            ->select([
                '*',
                DB::raw('SUM(order_total_price) AS order_total_price_count'),
                DB::raw('count(*) AS order_count')
            ])
            ->where('created_at', '>=', $todayStartTime)
            ->where('created_at', '<=', $todayEndTime)
            ->whereIn('source', $userNames)
            ->get();
        return $this->returnData($peopleCount);
    }
}
