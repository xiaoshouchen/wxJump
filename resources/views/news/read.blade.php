@extends('../base')

@section('css')
    <link rel="stylesheet" href="/css/news_d.css" />
    <style>

        .topNEXT a {
            text-decoration: none;
            display: block;
            color: #1b1e21;
        }

        .text_list p a {
            text-decoration: none;
            display: block;
            color: #1b1e21;
        }
        .box_left_c img {
            width: 100%!important;
            height: auto!important;
        }
    </style>
@endsection

@section('content')
    <section id="content">
        <div class="box_left">
            <div class="text">
                <h1 style="font-size: 2.0em">
                    {{$article->title}}
                </h1>
                <p style="margin-top: 20px;">作者：{{$article->author}}：{{$article->publish_time}}</p>
            </div>
            <div class="box_left_c">
                <div class="title">
                    {!! $article->content !!}
                </div>
                <div class="img">
                    <img src="/img/ipad.png" >
                </div>
            </div>
            <div class="share">
                <span>分享：</span>
                <div class="bdsharebuttonbox">
                    <a href="#" class="bds_more" data-cmd="more"></a>
                    <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                    <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                    <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                    <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                    <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                </div>
                <script>window._bd_share_config = {
                        "common": {
                            "bdSnsKey": {},
                            "bdText": "",
                            "bdMini": "2",
                            "bdMiniList": false,
                            "bdPic": "",
                            "bdStyle": "0",
                            "bdSize": "24"
                        },
                        "share": {},
                        "selectShare": {
                            "bdContainerClass": null,
                            "bdSelectMiniList": ["qzone", "tsina", "tqq", "renren", "weixin"]
                        }
                    };
                    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
                </script>
            </div>
            {{--class="btn"--}}
            <div style="display: inline-block;">
                @if(!empty($topNext['top']))
                    <div class="topNEXT" >
                        <a href="{{url('read', $topNext['top']['id'])}}.html">
                            上一篇:&nbsp; {{mb_substr($topNext['top']['title'],0,18,'utf8')}}...
                        </a>
                    </div>
                @endif
                @if(!empty($topNext['next']))
                    <div class="topNEXT">
                        <a href="{{url('read', $topNext['next']['id'])}}.html">
                            下一篇:&nbsp; {{mb_substr($topNext['next']['title'],0,18,'utf8')}}...
                        </a>
                    </div>
                @endif
            </div>
        </div>
        <div class="box_right phone_unshow">
            <div class="text_r">
                <p>浏览排行</p>
            </div>
            <div class="text_list">
                @foreach($clickTop as $click)
                    <p>

                        <a href="{{url('read', $click['id'])}}.html">
                            {{++$loop->index}}.&nbsp;{{mb_substr($click['title'],0,18,'utf8')}}...
                        </a>
                    </p>
                @endforeach
            </div>
        </div>
        <div>
        </div>
    </section>
@endsection