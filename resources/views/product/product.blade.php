@extends('../base')
@section('css')
    <link rel="stylesheet" href="/css/intreduce.css" />
@endsection

@section('content')
    <section id="content">
        <div class="intreduce_text">
            <p class="red">COMPANY INTREDUCE</p>
            <p class="gray">产品功能</p>
        </div>
        <div class="intreduce_c">
            @foreach($product as $item)
                <div class="intreduce_box">
                    @if(in_array($loop->index+1, $rule))
                        <img src="img/gnmk_02.png" >
                    @else
                        <img src="img/gnmk_01.png" >
                    @endif

                    <img class="shadow" src="img/gnmk_s.png">

                    <div class="i_num qh">
                        @if($loop->index < 10)
                            0{{$loop->index+1}}
                        @else
                            {{$loop->index+1}}
                        @endif
                    </div>

                        @if(in_array($loop->index+1, $rule))
                            <div class="i_title_s red">
                        @else
                            <div class="i_title_s white">
                        @endif
                        {{$item['content']}}
                    </div>

                    <div class="i_box">
                        @if(in_array($loop->index+1, $rule))
                            <div class="i_title white">
                            @php
                                $white = true;
                            @endphp
                        @else
                             <div class="i_title red">
                                 @php
                                     $white = false;
                                 @endphp
                        @endif
                            {{$item['children'][0]['content']}}
                        </div>
                        <div class="i_c">
                            @foreach($item['children'][0]['children'] as $children)
                                @if($white)
                                    <span class="dian white_bg"></span>
                                @else
                                    <span class="dian red_bg"></span>
                                @endif
                                @if($white)
                                    <div class="white">
                                @else
                                   <div class="red">
                                @endif
                                    {{$children['content']}}
                                </div>
                           @endforeach
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </section>
@endsection