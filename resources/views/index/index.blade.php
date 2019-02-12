@extends('../base')
@section('css')
    {{--<!--[if IE]> <!--> <link rel="stylesheet" href="/css/home_.css" /> <!--[endif]-->--}}
    {{--<!--[if !IE]><!-->  <!--<![endif]-->--}}
    <link rel="stylesheet" href="/css/home.css" />
    <style>
        .from_btn a {
            text-decoration: none;
            color: #fff3cd;
            display: block;
        }

        .fn_title a {
            text-decoration: none;
            color: #fff3cd;
            display: block;
        }

        .title p:first-child {
            color: #ff4c48
        }
    </style>
@endsection
@section('content')
    <section id="content">
        <div class="highway">
            <img src="img/bg.png" alt="">
        </div>
        <div class="experience">
            <div class="from_text">
                <p style="color: #ff4c48;">APPLY FOR TRIAL</p>
                <p class="gray">预约体验</p>
            </div>
            <div class="from_input">
                <div>
                    <p>企业名称</p>
                    <input type="text" name="company" placeholder="Company Name">
                </div>
                <div>
                    <p>联系人</p>
                    <input type="text" name="name" placeholder="Contacts Person">
                </div>
                <div>
                    <p>联系电话</p>
                    <input type="text" name="phone" placeholder="Tel Phone">
                </div>
            </div>
            <div class="from_btn" data-ripple>
                <a href="javascript:void(0);" onclick="order()">提交</a>
            </div>
        </div>
        <script>
            function order() {
                let company = $("input[name^='company']").val();
                let name = $("input[name^='name']").val();
                let phone = $("input[name^='phone']").val();
                if (!phone) {
                    alert('请填写您的手机联系方式，方便工作人员与您联系！！')
                    return false;
                }
                if (!name) {
                    alert('请填写您的称呼!');
                    return false;
                }
                if (!isPoneAvailable(phone)) {
                    alert('您填写的手机号不符合规则，请检查后输入!');
                    return false;
                }
                let result = {
                    company: company,
                    phone: phone,
                    name: name
                };
                $.post('api/order', result, function (response) {
                    $("input[name^='phone']").val('');
                    $("input[name^='company']").val('');
                    $("input[name^='name']").val('');
                    subscribe(response.data);
                    return false;
                });
            }

            function isPoneAvailable(poneInput) {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(poneInput)) {
                    return false;
                } else {
                    return true;
                }
            }
        </script>
        <div class="introduce">
            <div class="introduce_c">
                <div class="title">
                    <p>{{$result['company']->english}}</p>
                    <p class="gray">{{$result['company']->title}}</p>
                </div>
                <div class="introduce_text gray">
                    {{$result['company']->desc}}
                </div>
                <div class="work_btn gray">
                    <a href="{{url('company.html')}}">查看更多</a>
                </div>
            </div>
            <div class="image">
                <img src="img/book.png" alt="">
            </div>
        </div>
        <div class="work">
            <div class="image">
                <img src="img/book.png" alt="">
            </div>
            <div>
                <div class="title">
                    <p>{{$result['henhen']->english}}</p>
                    <p class="gray">{{$result['henhen']->title}}</p>
                </div>
                <div class="work_text gray">
                    {{$result['henhen']->desc}}
                </div>
                <div class="work_btn gray">
                    <a href="{{url('henhen.html')}}">查看更多</a>
                </div>
            </div>

        </div>
        <div class="lightspot">
            <div class="lightspot_c">
                <div class="title">
                    <p>{{$result['point']->english}}</p>
                    <p class="gray">{{$result['point']->title}}</p>
                    <p style="font-size: 16px;" class="gray">
                        {{$result['point']->desc}}
                    </p>
                </div>
                <div class="lightspot_x">
                    @foreach($result['point']->items as $pointItem)
                        <div>
                            <img src="img/gou.png" alt="">
                            <text class="orange">{{$pointItem->title}}：</text>
                            <p>{{$pointItem->desc}} </p>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="l_image image">
                <img src="img/peo.png" alt="">
            </div>
        </div>
        <div class="fn">
            <div class="image phone_unshow">
                <img src="img/ipad.png" alt="">
            </div>
            <div>
                <div class="title">
                    <p>WHAT IS FUNCTIONAL?</p>
                    <p class="gray">产品功能</p>
                </div>
                <div class="phone_show fn_img">
                    <a href="{{url('product')}}.html">
                        <img src="img/funtional.png">
                    </a>
                </div>
                <div class="phone_unshow">
                    @foreach($result['product'] as $productItem)
                        <div class="fn_c">
                            <div class="fn_title">
                                <a href="{{url('product')}}.html">{{$productItem['content']}}</a>
                            </div>
                            <text class="gray">{{$productItem['children'][0]['content']}}</text>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="news">
            <div>
                <div class="title">
                    <p>NEWS</p>
                    <p class="gray">
                        <a style="text-decoration: none" href="{{url('news')}}.html">新闻中心</a>
                    </p>
                </div>
            </div>
            <div class="news_c">
                @foreach($result['sixArticle'] as $article)
                    @php
                        $phone_unshow = "phone_unshow";
                    @endphp
                    @if($loop->iteration == 1 || $loop->iteration == 2)
                        <div class="news_v">
                            @else
                                <div class="news_v {{$phone_unshow}}">
                                    @endif
                                    <img src="img/news.png" alt="">
                                    <div class="news_text">
                                        <div>
                                            <p class="white">
                                                <a href="{{url('read',$article['id'])}}.html">
                                                    {{mb_substr($article['title'],0,15, 'utf-8')}}...
                                                </a>
                                            </p>
                                            <p class="orange_q">
                                                <a href="{{url('read',$article['id'])}}.html">
                                                    {{mb_substr($article['description'],0,30, 'utf-8')}}...
                                                </a>

                                            </p>
                                        </div>
                                        <div class="news_tl">
                                            <text class="orange_q">{{$article['publish_time']}}</text>
                                            <text class="white">
                                                <a style="font-size:0.65em" href="{{url('read',$article['id'])}}.html">查看更多</a>
                                            </text>
                                        </div>
                                    </div>
                                </div>
                                @endforeach
                        </div>
            </div>
    </section>
@endsection