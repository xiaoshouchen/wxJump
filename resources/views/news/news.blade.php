@extends('../base')

@section('css')
    <link rel="stylesheet" href="/css/news.css" />
    <link rel="stylesheet" href="/css/paging.css" />
    <style>
        .new_list_box a {
            text-decoration: none;
            color: #1b1e21;
            display: block;
        }
        .tab a {
            text-decoration: none;
            color: #1b1e21;
            display: block;
        }
        .tabclick a{
            color: #FFFFFF;
        }

    </style>
@endsection

@section('content')
    <section id="content">
        <div class="intreduce_text">
            <p class="red">NEWS</p>
            <p class="gray">新闻中心</p>
        </div>
        <div class="new_c" id="anchor">
            <div class="new_tab">
                @foreach($category as $categoryItem)
                    @if($currentCategory['category'] == $categoryItem->name)
                            <div class="{{$currentCategory['class']}} tab">
                            <a href="{{url("news.html?category=$categoryItem->name")}}#anchor">
                                {{$categoryItem->name}}
                            </a>
                        </div>
                    @else
                            <div class="tabnoclick tab">
                                <a href="{{url("news.html?category=$categoryItem->name")}}#anchor">
                                    {{$categoryItem->name}}
                                </a>
                            </div>
                    @endif
                @endforeach
            </div>
            <div class="new_list">
                @foreach($article as $articleItem)
                    <div class="new_list_box">
                        <div>
                            <a href="{{url('read', cmf_url_encrypt($articleItem['id']))}}.html">
                                <img src="{{$articleItem['photo']}}" >
                            </a>
                        </div>
                        <div>
                            <p>
                                <a href="{{url('read', cmf_url_encrypt($articleItem['id']))}}.html">
                                    {{mb_substr($articleItem['title'],0,27,'utf8')}}...
                                </a>
                            </p>
                            <p>
                                <a href="{{url('read', cmf_url_encrypt($articleItem['id']))}}.html">
                                    {{mb_substr($articleItem['description'],0,70,'utf8')}}...
                                </a>
                            </p>
                            @php
                                $keywords = explode(',' ,$articleItem['keywords']);
                            @endphp
                            @foreach($keywords as $keyword)
                                @if(!empty($keyword))
                                    <div class="phone_unshow">
                                        {{$keyword}}
                                    </div>
                                @endif
                            @endforeach
                        </div>
                        <div class="time phone_unshow">
                            {{$articleItem['publish_time']}}
                        </div>
                    </div>
               @endforeach
            </div>
            <div class="container">
                {{ $article->appends(['category' => $articleItem['category'] ?? '行业动态'])->links() }}
            </div>
        </div>
    </section>
@endsection