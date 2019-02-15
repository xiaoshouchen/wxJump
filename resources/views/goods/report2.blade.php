<!DOCTYPE html>
<!-- saved from url=(0033)https://www.ffdvta.cn/jubao2.html -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <title>举报</title>
    <link rel="stylesheet" href="/css/w_complain251980.css">
    <script async="" type="text/javascript" src="/js/index251980.js"></script>
</head>
<body class="zh_CN " ontouchstart="">
<div class="page_bd">
    <div id="tips" style="display:none;" class="top_tips warning"></div>
    <div style="display: none;" id="step1" class="category_item"><h3 class="category_title">请选择举报原因</h3>
        <form id="form1">
            <ul class="checkbox_list">
                <li data-type="1" class="checkbox"><input id="radio_1" name="complaintype" value="2"
                                                          class="frm_checkbox" type="radio"><label for="radio_1"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">欺诈</div>
                    </label></li>
                <li data-type="2" class="checkbox"><input id="radio_2" name="complaintype" value="1"
                                                          class="frm_checkbox" type="radio"><label for="radio_2"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">色情</div>
                    </label></li>
                <li data-type="3" class="checkbox"><input id="radio_3" name="complaintype" value="16"
                                                          class="frm_checkbox" type="radio"><label for="radio_3"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">政治谣言</div>
                    </label></li>
                <li data-type="4" class="checkbox"><input id="radio_4" name="complaintype" value="128"
                                                          class="frm_checkbox" type="radio"><label for="radio_4"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">常识性谣言</div>
                    </label></li>
                <li data-type="5" class="checkbox"><input id="radio_5" name="complaintype" value="1024"
                                                          class="frm_checkbox" type="radio"><label for="radio_5"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">诱导分享</div>
                    </label></li>
                <li data-type="6" class="checkbox"><input id="radio_6" name="complaintype" value="512"
                                                          class="frm_checkbox" type="radio"><label for="radio_6"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">恶意营销</div>
                    </label></li>
                <li data-type="7" class="checkbox"><input id="radio_7" name="complaintype" value="64"
                                                          class="frm_checkbox" type="radio"><label for="radio_7"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">隐私信息收集</div>
                    </label></li>
                <li data-type="8" class="checkbox"><input id="radio_8" name="complaintype" value="reportpage"
                                                          class="frm_checkbox" type="radio"><label for="radio_8"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">抄袭公众号文章</div>
                    </label></li>
                <li data-type="9" class="checkbox"><input id="radio_9" name="complaintype" value="other"
                                                          class="frm_checkbox" type="radio"><label for="radio_9"
                                                                                                   class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">其他侵权类（冒名、诽谤、抄袭）</div>
                    </label></li>
                <li data-type="10" class="checkbox"><input id="radio_10" name="complaintype" value="original_complain"
                                                           class="frm_checkbox" type="radio"><label for="radio_10"
                                                                                                    class="frm_checkbox_label checkbox_title">
                        <div class="checkbox_label_inner">违规声明原创</div>
                    </label></li>
            </ul>
        </form>
        <div class="opr_area"><a id="nextBtn" href="javascript:"
                                 class="btn btn_primary btn_disabled js_btn_submit">下一步</a></div>
    </div>
    <div id="step2" class="category_item" style=""><h3 class="category_title">举报描述</h3>
        <form>
            <div id="textareaDiv" class="textarea_panel"><textarea id="aaa"></textarea><i id="reasonTextTips"
                                                                                          class="ic ic_warning ic_small"></i><span
                        id="textareaLenSpan" class="frm_hint"><span id="textLen">0</span>/50</span></div>
        </form>
        <div class="opr_area"><a id="submitBtn" href="{{url('report3')}}"
                                 class="btn btn_primary btn_disabled js_btn_submit">提交</a></div>
    </div>
    <div id="step3" style="display:none;"></div>
</div>
<script>window.moon_map = {
        "biz_common/utils/url/parse.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/url/parse25b6ff.js",
        "biz_common/tmpl.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/tmpl224ef3.js",
        "complain/tips.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/complain/tips23a582.js",
        "biz_wap/jsapi/core.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/jsapi/core25ded2.js",
        "biz_wap/utils/ajax.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/ajax25888e.js",
        "biz_common/dom/class.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/dom/class236751.js",
        "biz_common/dom/event.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/dom/event24f08a.js",
        "biz_common/utils/string/html.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/string/html224ef3.js",
        "complain/index.js": "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/complain/index251980.js"
    };</script>
<script id="result_tmpl" type="text/html">
    <div class="page_msg">
        <div class="icon_area"><i class="icon_msg <#=type#>"></i></div>
        <div class="text_area"><h2 id="" class="title"><#=title#></h2>
            <p id="suc_desc" class="desc"><#=desc#></p></div>
        <div class="opr_area">
            <a id="" class="btn btn_primary" href="http://www.qq.com">确定</a>
        </div>
    </div>


</script>
<script id="success_text_tmpl" type="text/html">

    感谢你的参与，微信坚决反对色情、暴力、欺诈等违规信息，我们会认真处理你的举报，维护绿色、健康的网络环境。</script>
<script id="ori_fail_text_tmpl" type="text/html">

    你举报的文章未进行原创声明，感谢你的参与。微信坚决反对色情、暴力、欺诈等违规信息，我们会认真处理你的举报，维护绿色、健康的网络环境。</script>
<script>

    var uin = "MTAzMTEyNDMxNg==";

    var key = "c468684b929d2be2f14c14bc17f230e7a8728da42be6941ab84ef77429ee73f2b47705c0bcf51f334c74d4e1be41af2d";

    var pass_ticket = "mNtmZTQDxYOWwM6kR/vGAd7lHGzK8DyWBXJrKSLbfuj6xPJVRfdVc7Or6RxHfoiG";

    seajs.use("complain/index.js");

</script>
</body>
</html>