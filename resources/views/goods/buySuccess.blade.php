<!DOCTYPE html>
<!-- saved from url=(0081)http://www.ffdvta.cn/index.php?s=/home/index/order/ordernum/2019012413521873.html -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <title>恭喜，订单提交成功！</title>
    <link rel="stylesheet" type="text/css" href="/css/order.css">
</head>

<body style="">
<div class="title">恭喜，订单提交成功！</div>
<div class="main-bg">

    <div class="main">
        <dl class="dl">
            <dt>订单号：</dt>
            <dd>{{$goods['order_num']}}</dd>
        </dl>
        <dl class="dl">
            <dt>姓名：</dt>
            <dd>{{$goods['name']}}</dd>
        </dl>

        <dl class="dl">
            <dt>手机号：</dt>
            <dd>{{$goods['phone']}}</dd>
        </dl>

        <dl class="dl">
            <dt>详情地址：</dt>
            <dd>{{$goods['address']}}</dd>
        </dl>

        <dl class="dl">
            <dt>留言：</dt>
            <dd>{{$goods['message']}}&nbsp;</dd>
        </dl>
        <dl class="dl">
            <dt>付款方式：</dt>
            <dd>
                <span>{{$goods['paytype']}}</span>
            </dd>
        </dl>
        <dl class="dl">
            <dt>总价：</dt>
            <dd><b>¥ {{$goods['order_total_price']}}</b></dd>
        </dl>
        <dl class="dl">
            <dt>订购产品：</dt>
            <dd>
                <p>{{$goods['goods_name']}} 数量：{{$goods['num']}} </p></dd>
        </dl>
        <dl class="dl">
            <dt>下单时间：</dt>
            <dd>{{$goods['created_at']}}</dd>
        </dl>
    </div>
</div>
<div class="submit">
    <a href="{{$url}}">返回</a>
</div>
<div class="h-30">

</div>
</body>
</html>