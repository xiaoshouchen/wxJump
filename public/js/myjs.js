
if (window.innerWidth > 750) {
	if (!sessionStorage.getItem('ones')) {
		sessionStorage.setItem('ones', true);
		$('.home_kp').css({
			'height': '0',
			'border-radius': '0 0 800px 800px',
			'opacity':0
		})
	} else {
		$('.home_kp').css({
			'display': 'none',
		})
	}
	$(window).scroll(function() {
		console.log($(window).scrollTop())
		if ($(window).scrollTop() > 0) {
			$('.home_kp').css({
				'height': '0',
				'border-radius': '0 0 800px 800px',
                'opacity':0
			})
		}
		if ($(window).scrollTop() > 50) {
			$('.experience').css('top', '-200px')
		}
		if ($(window).scrollTop() > 400) {
			$('.introduce').css({
				'top': '200px',
				'opacity': 1
			})
		}
		if ($(window).scrollTop() > 1000) {
			$('.work').css({
				'top': '360px',
				'opacity': 1
			})
		}
		if ($(window).scrollTop() > 1500) {
			$('.lightspot').css({
				'top': '516px',
				'opacity': 1
			})
		}
		if ($(window).scrollTop() > 2200) {
			$('.fn').css({
				'top': '625px',
				'opacity': 1
			})
		}
		if ($(window).scrollTop() > 2800) {
			$('.news').css({
				'top': '590px',
				'opacity': 1
			})
		}
	});
} else {
	// $('.experience').css('top','-100px')
}
$(".tab").click(function() {
	for (let i of $(".tab")) {
		i.className = "tabnoclick tab"
	}
	this.className = "tabclick tab"
})
// $(".from_btn").click(function(){
// 	subscribe()
// })
//预约
function subscribe(num){
	var img = $("<div class='tanimg'><img src='img/tan.png' ></img><span>"+num+"</span><div class='close'></div></div>");
	var $parent = $("body");
	$parent.append(img)
	$(".close").click(function(){
		console.log($(this)[0].parentNode);
		$(".tanimg")[0].remove()
	})
}

