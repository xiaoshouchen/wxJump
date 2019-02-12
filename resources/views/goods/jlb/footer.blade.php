<div class="submit">立即提交订单</div>
<script>
    $(window).load(function () {
        $('#order').liMarquee({
            direction: 'up',
            scrollamount: 20,
        });
    });
</script>
<div class="bwtitle">最新下单</div>
<div class="main-bg">
    <div class="main">
        <div class="fahuo">
            <ul id="order" class="str_wrap str_vertical">
                <div class="str_move str_origin" style="top: -111.08px;">
                    <ul>
                        @for($i=0; $i<100; $i++)
                            @php
                                //随机套餐
                                $result = shuffle($goods['meals']);
                                //随机姓氏
                                $count = count($falseName);
                                $name = rand(0, $count-1);
                                //随机省份
                                $count_province  = count($province);
                                $rand_province= rand(0, $count_province-1);
                                //随机号码
                                $count_phone = count($falsePhone);
                                $rand_phone= rand(0, $count_phone-1);
                                //随机时间
                                $count_time = count($falseTime);
                                $rand_Time= rand(0, $count_time-1);

                            @endphp
                            <li>
                                <span>最新购买</span> {{date('Y-m-d')}}{{$province[$rand_province]}}的{{$falseName[$name]}}
                                ** ({{$falsePhone[$rand_phone]}})&nbsp;&nbsp;在{{$falseTime[$rand_Time]}}
                                前订购了 {{$goods['meals'][0]['meal_name']}}
                                √已成功
                            </li>
                        @endfor
                    </ul>
                </div>
            </ul>
        </div>
    </div>
</div>
<div class="c"></div>
<footer>
    <p style="text-align:center">
        {{-- todo 底部轮播--}}
        {{--<img src="https://www.ffdvta.cn/index.php?s=/home/index/info/proid/8.html" style="max-width:750px;width:100%">--}}
    </p>
    <br>
    在线快速订购 <br>
    <p>
        <a href="{{url('report')}}">举报</a>
    </p>
</footer>
</div>
<div class="audit-2" style="display: none;">
    <div class="audit-title"></div>
    <div class="audit-content"></div>
</div>

</body>
</html>