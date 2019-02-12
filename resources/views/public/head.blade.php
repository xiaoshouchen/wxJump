<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>{{$seo['title']}}</title>
    @yield('css')
    <link rel="stylesheet" href="/css/top.css" />
    <link rel="stylesheet" href="/css/foot.css" />
    <link rel="stylesheet" href="/css/swiper.min.css">
    <link rel="stylesheet" href="/css/animate.min.css">
    <script src="/js/jquery-3.3.1.min.js"></script>
    <meta name="baidu-site-verification" content="4HoZwNCTLS" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes"/>
    <meta name="csrf-token" content="{{csrf_token()}}">
    <meta name="description" content="{{$seo['desc']}}" />
    <meta name="keywords" content="{{$seo['keywords']}}" />
    <style type="text/css">
        .ripple-container {

        }

        .ripple-container .ripple {
            background-color: red;
            /* background-color: rgba(255,255,255,0.4); */
            animation: ripple 1s forwards cubic-bezier(0, 0, 0.2, 1);
        }

        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }

            80% {
                transform: scale(1);
            }

            100% {
                opacity: 0;
            }
        }

        button {
            background-color: dodgerblue;
            color: white;
            padding: 10px 20px;
            border: 0;
            font-size: 14px;
            cursor: pointer
        }
    </style>
</head>
<body>
<header>
    <div class="home_kp">
    </div>
    <div id="myheader">

        <div class="logo">
            <img src="/img/logo.png" alt="">
        </div>
        <div class="phone_menu">
            <img src="/img/caidan.png" alt="">
        </div>
        <div class="menu">
            <ul>
                @foreach($navs as $nav)
                    <li>
                        @if($nav->link == '/')
                            <a href="{{$nav->link}}">{{$nav->name}}</a>
                        @else
                            <a href="{{$nav->link}}.html">{{$nav->name}}</a>
                        @endif
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</header>

<section class="banner">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            @foreach($banners as $banner)
                <div class="swiper-slide">
                    <a href="{{$banner['href']??""}}">
                        <img src="{{$banner['banner_addr']??""}}" alt="{{$banner['alt']??""}}">
                    </a>
                </div>
            @endforeach
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</section>
@yield('content')