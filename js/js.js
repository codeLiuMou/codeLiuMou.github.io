window.onload=function(){
	//封装音效部分
	function soundEffect(){
		
	//一顿获取
	var closeAudio=document.getElementById("closeAudio");
	var toggleAudio=document.getElementById("toggleAudio");
	var closeBtn=document.getElementById("closeBtn");
	var linkBtn=document.getElementById("linkBtn");
	var toggleBtn=document.getElementsByClassName("toggleBtn");
	var sdBtn=document.getElementById("sd")
	//封装播放函数
	function closeEffect(){
		closeAudio.play();
	}
	function toggleEffect(){
		toggleAudio.play();
	}
	
	//添加事件
	sdBtn.onclick=function(){    //这行是关闭按钮
		closeEffect()
		toggleAnmtHide()
	}
	closeBtn.onclick=function(){
		closeEffect()
		toggleAnmtShow()
	}
//	linkBtn.onclick=function(){
//		closeEffect()
//	}
	for(var i=0;i<toggleBtn.length;i++){
		toggleBtn[i].onmouseenter=function(){
			toggleEffect()
		}
	}
	}
	//音效结束 
	soundEffect();  //启动音效函数;
	
	//封装出现动画
	function toggleAnmtShow(){
		var toggleText=document.getElementsByClassName("toggleText");
		for(var i=0;i<toggleText.length;i++){
			toggleText[i].classList.remove("toggleAnmtHide")
			toggleText[i].classList.add("toggleAnmtShow")
		}
	}
	//封装隐藏动画
	function toggleAnmtHide(){
		var toggleText=document.getElementsByClassName("toggleText");
		for(var i=0;i<toggleText.length;i++){
			toggleText[i].classList.remove("toggleAnmtShow")
			toggleText[i].classList.add("toggleAnmtHide")
		}
	}
	//返回顶部函数
//	function backToTop(){
//		toTop.onclick = function(){
//		var top = document.body.scrollTop || document.documentElement.scrollTop
//		scrollBy(0,-top);
//		}
//	}
//	backToTop() 
}
