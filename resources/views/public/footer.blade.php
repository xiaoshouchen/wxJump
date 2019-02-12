<style>
    .footer_yq a {
        text-decoration: none;
        color: #fff3cd;
    }

    .footer_yq ul {
        display: flex;
    }

    .footer_yq ul li {
        list-style: none;
        text-align: center;
        margin-right: 20px;
        cursor: pointer;
    }

    .footer_yq ul li a {
        text-decoration: none;
        color: #FFFFFF;
        display: block;
    }
</style>
<footer id="footer">
    <div class="footer_box">
        <div class="footer_yq white">
            <ul>
                <li>
                    <a>友情链接:</a>
                </li>
                @foreach($FriendLink as $FriendLinkItme)
                    <li>
                        <a href="{{$FriendLinkItme['url']}}">{{$FriendLinkItme['name']}}</a>
                    </li>
                @endforeach
            </ul>
        </div>
        <div class="footer_box_b">
            <div class="footer_box_l">
                <div class="footer_menu">
                    <ul>
                        @foreach($navs as $footNav)
                            <li>
                                @if($footNav['link'] == '/')
                                    <a href="{{env('APP_URL')}}">{{$footNav['name']}}</a>
                                @else
                                    <a href="{{$footNav['link']}}.html">{{$footNav['name']}}</a>
                                @endif

                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class="footer_text">
                    <div class="footer_text_" style="margin-right: 30px;">
                        <p>四川猪太帅科技有限公司</p>
                        <p>电话：{{$site_base[0]['value']->tel}}</p>
                        <p>邮箱：{{$site_base[0]['value']->postNum}}</p>
                        <p>客服QQ：{{$site_base[0]['value']->qq}}</p>
                        <p>地址：{{$site_base[0]['value']->items[0]->address}}</p>
                    </div>
                    <div class="footer_img">
                        <div>
                            <img width="131" height="132" src="/img/jzrWX.jpg" alt="">
                            <p>哼哼办公官方微信公众号</p>
                        </div>
                        <div>
                            <img width="131" height="132" src="/img/jzrXL.png" alt="">
                            <p>哼哼办公官方新浪微博</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer_from phone_unshow">
                <p class="white">预约体验</p>
                <input type="text" name="footerCompany" placeholder="企业名称">
                <input type="text" name="footerNmae" placeholder="联系人">
                <input type="text" name="footerPhon" placeholder="联系电话">
                <button onclick="footerOrder()">提交</button>
                <script>
                    function footerOrder() {
                        let company = $("input[name^='footerCompany']").val();
                        let name = $("input[name^='footerNmae']").val();
                        let phone = $("input[name^='footerPhon']").val();
                        if (!phone) {
                            alert('请填写您的手机联系方式，方便工作人员与您联系！！');
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
                            $("input[name^='footerCompany']").val('');
                            $("input[name^='footerNmae']").val('');
                            $("input[name^='footerPhon']").val('');
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
            </div>
        </div>
        <div class="copyright">Copyright © 2017-2018 四川猪太帅科技 版权所有 {{$site_base[0]['value']->icp}}</div>
    </div>
</footer>
<script src="/js/top.js"></script>
<script src="/js/myjs.js"></script>
<script src="/js/swiper.min.js"></script>
<script src="/js/swiper.animate.min.js"></script>
<script>
    if ($(".swiper-slide a").length > 1) {
        loop = true;
    } else {
        loop = false;
    }
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: loop, // 循环模式选项
        autoplay: true,

        // 如果需要分页器
        // 				pagination: {
        // 					el: '.swiper-pagination',
        // 				},

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
</script>
<script src="/js/ripple.js"></script>
<script type="text/javascript">
    // just add effect to elements
    Array.prototype.forEach.call(document.querySelectorAll('[data-ripple]'), function (element) {
        // find all elements and attach effect
        new RippleEffect(element); // element is instance of javascript element node
    });
</script>
<script> var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1cb2a2ba7d05ec8d332919b2b4b85715";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
@foreach($site_base[0]['value']->jsSlot as $siteItem)
{!! $siteItem->code !!}
@endforeach
</body>
</html>
