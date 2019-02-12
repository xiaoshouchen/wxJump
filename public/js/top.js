//页面跳转

$(".logo").click(function() {
	window.location.href = "/";
})
$(".phone_menu").click(function(){
	if($(".menu").css('height') == "260px"){
		$(".menu").css({
			"height":"0px"
		})
	}else{
		$(".menu").css({
			"height":"260px"
		})
	}
})
