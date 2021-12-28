$(window).scroll(function(){
    var scroll=$(window).scrollTop();
	if(scroll>0){
		$("#head").addClass("headFixed");
	}
	if(scroll==0){
		$("#head").removeClass("headFixed");
	}
}) 