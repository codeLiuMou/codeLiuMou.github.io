$(".fhNav").hover(function(){},function(){
	$(".bottomLine").css("width",parseFloat($(".selectedNav").eq(0).width()+20)+"px");
	$(".bottomLine").css("left",parseFloat($(".selectedNav").eq(0)[0].offsetLeft)+"px");	
})
$(".nav_a li").hover(function(){
	$(".bottomLine").css("width",parseFloat($(this).width()+20)+"px");
	$(".bottomLine").css("left",parseFloat($(this)[0].offsetLeft)+"px");	
});
$(".nav_a li").on("click",function(){
	$(".nav_a li").removeClass("selectedNav");
	$(this).addClass("selectedNav");
	$(".bottomLine").css("width",parseFloat($(this).width()+20)+"px");
	$(".bottomLine").css("left",parseFloat($(this)[0].offsetLeft)+"px");	
})