define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var n=r.length,e=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?n:t,e=-1==e?t:e;
var s=r.substr(0,e),a=r.substr(e+1,t-e-1),i=r.substr(t+1);
return{
host:s,
query_str:a,
hash:i
};
}
function n(n,e){
var t=r(n),s=t.query_str,a=[];
for(var i in e)e.hasOwnProperty(i)&&a.push(i+"="+encodeURIComponent(e[i]));
return a.length>0&&(s+=(""!=s?"&":"")+a.join("&")),t.host+(""!=s?"?"+s:"")+(""!=t.hash?"#"+t.hash:"");
}
function e(r,n,e,t){
r=r||location.href,-1!=r.indexOf("&")&&-1==r.indexOf("?")&&(r=r.replace("&","?"));
var s=new RegExp("([\\?&]"+n+"=)[^&#]*");
return r.match(s)?t===!0?r.replace(s,"$1"+e):r:-1==r.indexOf("?")?r+"?"+n+"="+e:r+"&"+n+"="+e;
}
return{
parseUrl:r,
join:n,
addParam:e
};
});define("biz_common/tmpl.js",[],function(){
"use strict";
var n=function(n,t){
var r=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)#>/g,"',$1,'").split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return r(t);
},t=function(t,r){
return n(document.getElementById(t).innerHTML,r);
};
return{
render:t,
tmpl:n
};
});define("complain/tips.js",["biz_common/utils/string/html.js","biz_common/dom/event.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var i=t("biz_common/dom/event.js"),o={
tipsTimeoutId:null,
tipsDom:document.getElementById("tips")
},s={
showErrTips:function(t,i){
var s=i||o.tipsDom;
return t===!1?void(s.style.display="none"):(this.resetTips(),s.innerHTML=t.htmlEncode(),
s.style.display="",clearTimeout(o.tipsTimeoutId),void(o.tipsTimeoutId=setTimeout(function(){
s.style.display="none";
},4e3)));
},
resetTips:function(t){
setTimeout(function(){
var i=t||o.tipsDom;
i.style.top=document.body.scrollTop+"px";
},0);
}
};
return i.on(window,"scroll",function(){
s.resetTips();
}),s;
});define("biz_wap/jsapi/core.js",[],function(){
"use strict";
document.domain="qq.com";
var i={
ready:function(i){
"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),
document.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(i,e,n){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?(alert("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(i,e,n);
});
},
call:function(i){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?!1:void top.window.WeixinJSBridge.call(i);
});
},
on:function(i,e){
this.ready(function(){
return"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(i,e):!1;
});
}
};
return i;
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),o.join(e,t);
}
function n(e){
var n=(e.type||"GET").toUpperCase(),o=t(e.url),r="undefined"==typeof e.async?!0:e.async,s=new XMLHttpRequest,a=null,u=null;
if("object"==typeof e.data){
var i=e.data;
u=[];
for(var c in i)i.hasOwnProperty(c)&&u.push(c+"="+encodeURIComponent(i[c]));
u=u.join("&");
}else u="string"==typeof e.data?e.data:null;
s.open(n,o,r),s.onreadystatechange=function(){
3==s.readyState&&e.received&&e.received(s),4==s.readyState&&(s.onreadystatechange=null,
s.status>=200&&s.status<400?e.success&&e.success(s.responseText):e.error&&e.error(s),
clearTimeout(a),e.complete&&e.complete(),e.complete=null);
},"POST"==n&&s.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
s.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof e.timeout&&(a=setTimeout(function(){
s.abort("timeout"),e.complete&&e.complete(),e.complete=null;
},e.timeout));
try{
s.send(u);
}catch(p){
e.error&&e.error();
}
}
var o=e("biz_common/utils/url/parse.js");
return n;
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("biz_common/dom/event.js",[],function(){
"use strict";
function t(t,e,n,i){
a.isPc||a.isWp?o(t,"click",i,e,n):o(t,"touchend",i,function(t){
var n=t.changedTouches[0];
return Math.abs(a.y-n.clientY)<=5&&Math.abs(a.x-n.clientX)<=5?e.call(this,t):void 0;
},n);
}
function e(t,e){
if(!t||!e||t.nodeType!=t.ELEMENT_NODE)return!1;
var n=t.webkitMatchesSelector||t.msMatchesSelector||t.matchesSelector;
return n?n.call(t,e):(e=e.substr(1),t.className.indexOf(e)>-1);
}
function n(t,n,o){
for(;t&&!e(t,n);)t=t!==o&&t.nodeType!==t.DOCUMENT_NODE&&t.parentNode;
return t;
}
function o(e,o,i,r,c){
var s,d,u;
return"input"==o&&a.isPc,e?("function"==typeof i&&(c=r,r=i,i=""),"string"!=typeof i&&(i=""),
e==window&&"load"==o&&/complete|loaded/.test(document.readyState)?r({
type:"load"
}):"tap"==o?t(e,r,c,i):(s=function(t){
var e=r(t);
return e===!1&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault()),
e;
},i&&"."==i.charAt(0)&&(u=function(t){
var o=t.target||t.srcElement,r=n(o,i,e);
return r?(t.delegatedTarget=r,s(t)):void 0;
}),d=u||s,r[o+"_handler"]=d,e.addEventListener?void e.addEventListener(o,d,!!c):e.attachEvent?void e.attachEvent("on"+o,d,!!c):void 0)):void 0;
}
function i(t,e,n,o){
if(t){
var i=n[e+"_handler"]||n;
return t.removeEventListener?void t.removeEventListener(e,i,!!o):t.detachEvent?void t.detachEvent("on"+e,i,!!o):void 0;
}
}
var r=navigator.userAgent,a={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(r)
};
return a.isPc||o(document,"touchstart",function(t){
var e=t.changedTouches[0];
a.x=e.clientX,a.y=e.clientY;
}),{
on:o,
off:i,
tap:t
};
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e=["&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&amp;","&","&yen;","¥"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
}
};
});define("complain/index.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","complain/tips.js","biz_common/tmpl.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("biz_common/dom/event.js"),n=e("biz_common/dom/class.js"),a=e("biz_wap/utils/ajax.js"),s=e("biz_wap/jsapi/core.js"),o=e("complain/tips.js"),r=e("biz_common/tmpl.js"),i={
mpComplainGuidUrl:"/mp/readtemplate?t=complain/msg_tmpl#wechat_redirect",
tipsTimeoutId:null,
selectedReason:null
};
!function(){
function e(){
i.dom={
reasonText:x("#reasonText"),
step3:x("#step3"),
step1:x("#step1"),
step2:x("#step2"),
textareaDiv:x("#textareaDiv"),
textareaLenSpan:x("#textareaLenSpan"),
submitBtn:x("#submitBtn")
};
var e=x("#form1 input[type=radio]:checked");
if(e)i.selectedReason=e.value,n.removeClass(x("#nextBtn"),"btn_disabled");else{
i.selectedReason=null;
for(var t=document.querySelectorAll("#form1 input[type=radio][name=complaintype]"),a=0,s=t.length;s>a;a++)t[0].checked=!1;
n.addClass(x("#nextBtn"),"btn_disabled");
}
}
function l(){
m("onload");
}
function d(){
t.on(window,"hashchange",m),t.on(i.dom.reasonText,"blur",function(){
o.resetTips();
});
var e=x("#nextBtn");
t.tap(e,function(){
return p(),!1;
});
var n=x("#form1");
t.tap(n,function(e){
return c(e),!1;
}),t.on(i.dom.reasonText,"input",function(){
var e=i.dom.reasonText,t=e.value;
x("#textLen").innerHTML=t.length,b();
}),t.tap(x("#reasonTextTips"),function(){
b();
}),t.tap(x("#submitBtn"),function(e){
b()===!0&&("original_complain"==i.selectedReason?_(e):f(e));
}),t.tap(i.dom.step3,function(e){
var t=e.target||e.srcElement;
"a"==t.nodeName.toLowerCase()&&s.invoke("closeWindow");
});
}
function c(e){
var t=e.target||e.srcElement,a=x("#form1"),s="li";
if(t.nodeName.toLowerCase()!=s)for(;t=t.parentNode;){
if(t==a||t==document.body||t==document){
t=null;
break;
}
if(t.nodeName.toLowerCase()==s)break;
}
if(t){
var o=t.getAttribute("data-type"),r=x("#radio_"+o);
if(r.value===i.selectedReason)return!1;
r.checked=!0,i.selectedReason=r.value,n.removeClass(x("#nextBtn"),"btn_disabled");
}
}
function p(){
switch(i.selectedReason){
case null:
o.showErrTips("请选择举报原因");
break;

case"reportpage":
var e=decodeURIComponent(w("url")),t=w("__biz",e),n=w("mid",e),a=w("idx",e);
location.href="/mp/articlereport?action=reportpage&__biz="+t+"&mid="+n+"&idx="+a+"#wechat_redirect";
break;

case"other":
location.href=i.mpComplainGuidUrl;
break;

default:
"#reason"==location.hash?u(!0):location.hash="#reason";
}
}
function m(){
u("#reason"==location.hash?!0:!1);
}
function u(e){
var t=i.dom;
t.step3.style.display="none",e?(t.step1.style.display="none",t.step2.style.display="",
t.reasonText.value="",t.reasonText.focus()):(t.step1.style.display="",t.step2.style.display="none",
t.reasonText.blur());
}
function b(){
var e=i.dom,t=e.reasonText.value;
return t?t.length>50?(n.addClass(e.textareaDiv,"warn"),n.addClass(e.textareaLenSpan,"warn"),
n.addClass(e.submitBtn,"btn_disabled"),o.showErrTips("举报描述不能超过50个字符"),!1):(n.removeClass(e.textareaDiv,"warn"),
n.removeClass(e.textareaLenSpan,"warn"),n.removeClass(e.submitBtn,"btn_disabled"),
!0):(n.addClass(e.textareaDiv,"warn"),n.removeClass(e.textareaLenSpan,"warn"),n.addClass(e.submitBtn,"btn_disabled"),
o.showErrTips("请输入举报描述"),!1);
}
function _(){
function e(){
i.loading=!1,n.removeClass(t.submitBtn,"btn_loading"),n.removeClass(t.submitBtn,"btn_disabled");
}
if(i.loading!==!0){
var t=i.dom,s=decodeURIComponent(w("url")),r={
__biz:w("__biz",s),
mid:w("mid",s),
idx:w("idx",s),
reason:t.reasonText.value
};
i.loading=!0,n.addClass(t.submitBtn,"btn_loading"),n.addClass(t.submitBtn,"btn_disabled"),
a({
type:"POST",
url:"/mp/originalreport?action=report#wechat_redirect",
timeout:2e4,
data:r,
success:function(t){
e();
try{
var t=JSON.parse(t)||{};
}catch(n){
return void o.showErrTips("系统繁忙，请稍后再试");
}
0==t.ret?h():"111"==t.ret?v():o.showErrTips("系统繁忙，请稍后再试");
},
error:function(){
o.showErrTips("系统繁忙，请稍后再试"),e();
}
});
}
}
function f(){
function e(){
i.loading=!1,n.removeClass(t.submitBtn,"btn_loading"),n.removeClass(t.submitBtn,"btn_disabled");
}
if(i.loading!==!0){
var t=i.dom,s=[decodeURIComponent(w("url")).replace(/\|\|/g,""),t.reasonText.value.replace(/\n/," ").replace(/\|\|/g,"")].join("||"),r=decodeURIComponent(w("url")),l=w("__biz",r);
i.loading=!0,n.addClass(t.submitBtn,"btn_loading"),n.addClass(t.submitBtn,"btn_disabled"),
a({
type:"POST",
url:"/mp/report?#wechat_redirect",
timeout:2e4,
data:{
type:i.selectedReason,
content:s,
__biz:l
},
success:function(t){
e();
try{
var t=JSON.parse(t);
}catch(n){
return void o.showErrTips("系统繁忙，请稍后再试");
}
t&&0==t.ret?h():o.showErrTips("系统繁忙，请稍后再试");
},
error:function(){
o.showErrTips("系统繁忙，请稍后再试"),e();
}
});
}
}
function v(){
var e=i.dom;
e.step3.innerHTML=r.render("result_tmpl",{
type:"warn",
title:"未成功举报",
desc:x("#ori_fail_text_tmpl").innerHTML
}),e.step3.style.display="",e.step2.style.display="none";
}
function h(){
var e=i.dom;
e.step3.innerHTML=r.render("result_tmpl",{
type:"success",
title:"举报成功",
desc:x("#success_text_tmpl").innerHTML
}),e.step3.style.display="",e.step2.style.display="none";
}
function x(e){
return document.querySelector(e);
}
function w(e){
var t=arguments[1]||window.location.search,n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=t.substr(t.indexOf("?")+1).match(n);
return null!=a?a[2]:"";
}
e(),l(),d();
}();
});