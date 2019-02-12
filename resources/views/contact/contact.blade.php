@extends('../base')
@section('css')
    <link rel="stylesheet" href="css/contact.css" />
    <style>
        .contactBTN a {
            text-decoration: none;
            color: #fff3cd;
            display: block;
        }
    </style>
@endsection
@section('content')
    <section id="content">
        <div class="intreduce_text">
            <p class="red">CONTACT US</p>
            <p class="gray">联系我们</p>
        </div>
        <div class="conyact_c">
            <div class="c_dz">
                <div class="c_dz_d">
                    <img src="img/contactus_icon1.png" alt="">
                    <p>{{$contact->items[0]->address}}</p>
                </div>
                <div class="c_dz_box">
                    <div>
                        <img src="img/contactus_icon2.png" alt="">
                        <p>{{$contact->tel}}</p>
                        <p>客服热线</p>
                    </div>
                    <div>
                        <img src="img/contactus_icon3.png" alt="">
                        <p>{{$contact->postNum}}</p>
                        <p>邮编</p>
                    </div>
                    <div>
                        <img src="img/contactus_icon3.png" alt="">
                        <p>{{$contact->qq}}@qq.com</p>
                        <p>客服邮箱</p>
                    </div>
                    <div>
                        <img src="img/contactus_icon3.png" alt="">
                        <p>哼哼OA</p>
                        <p>新浪微博</p>
                    </div>
                </div>
            </div>
            <div style="margin-top: 50px;">
                <img src="img/adds.png" alt="" width="100%">
            </div>
            <div class="c_from">
                <div class="c_from_text">
                    <p>请您联系我们</p>
                    <p>如果您有任何建议，投诉，需求，可以通过留言的方式联系我们，请务必填写完整，这样我们能很快了</p>
                    <p style="text-align: left;line-height: 25px;">解到您的需求并及时联系您。</p>
                </div>
                <div class="c_from_input">
                    <input name="name"  placeholder="Your Name"/>
                    <input name="phone"  placeholder="Your Tel Phone"/>
                    <input name="qq"   placeholder="Your Tencent Number"/>
                    <input name="company" placeholder="Company Name"/>
                    <textarea name="content" placeholder="FeedBack Content"></textarea>
                    <div class="contactBTN">
                        <a href="javascript:void(0);" onclick="contact()">
                            提交信息</a>
                    </div>
                    <script>
                        function contact(){
                            let company = $("input[name^='company']").val();
                            let name = $("input[name^='name']").val();
                            let phone = $("input[name^='phone']").val();
                            let content = $("textarea[name^='content']").val();
                            let qq = $("input[name^='qq']").val();
                            if (isNaN(qq)){
                                alert('您输入的QQ号码不符合逻辑，请检查后输入！');
                                return false;
                            }
                            if (!content) {
                                alert('请填写您需要反馈的内容！');
                                return false;
                            }
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
                                company:company,
                                phone:phone,
                                name:name,
                                content:content,
                                qq:qq
                            };
                            $.post('api/contact',result,function(response){
                                $("input[name^='phone']").val('');
                                $("input[name^='company']").val('');
                                $("input[name^='name']").val('');
                                $("textarea[name^='content']").val('');
                                $("input[name^='qq']").val('');
                                alert('您的信息，已经通知到工作人员，稍后会有专员联系您！');
                                return false;
                            });
                        }
                        function isPoneAvailable(poneInput) {
                            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                            if (!myreg.test(poneInput)) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    </script>
                </div>
            </div>
        </div>
    </section>
@endsection