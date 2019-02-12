<?php

namespace App\Exports;

use App\Models\GoodsOrder;
use Maatwebsite\Excel\Concerns\FromCollection;

class OrderExport implements FromCollection
{
    private $where;

    public function __construct($where)
    {
        $this->where = $where;
    }

    /**
     * @return \Illuminate\Support\Collection|\Tightenco\Collect\Support\Collection
     */
    public function collection()
    {
        $cellData = [
            ['订单号', '购买产品+规格+订购数量', '订单总价', '收货人', '手机号码', '收货地址', '留言', '下单时间', '支付方式', '状态', '来源'],
        ];
        $query = GoodsOrder::query();
        if ($this->where) {
            $query = $query->where($this->where);
        }
        $pushData = $query->select([
            'order_num',
            'goods_name',
            'name',
            'order_total_price',
            'meal_name',
            'num',
            'phone',
            'address',
            'message',
            'created_at',
            'paytype',
            'source',
            'status',
            'size_name',
        ])
            ->get()
            ->toArray();
       $status = [
         '未发货',
         '已发货',
         '无效信息',
       ];
        foreach ($pushData as $v) {
            array_push($cellData, [
                $v['order_num'],
                $v['meal_name'] . ' ' . ($v['size_name'] ?? "") . 'x' . $v['num'],
                $v['order_total_price'],
                $v['name'],
                $v['phone'],
                $v['address'],
                $v['message'],
                (string)$v['created_at'],
                $v['paytype'],
                $status[ $v['status']],
                $v['source'],
            ]);
        }
        return collect($cellData);
    }
}
