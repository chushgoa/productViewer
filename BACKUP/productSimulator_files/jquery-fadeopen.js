$(document).ready(function(){
	//表示非表示の切換え（汎用）
	$(".fadeOpenSwitch").click(function () {
		$(".fadeOpenTarget").toggle(500);
	});
	//表示非表示の切換え（jquery.sidr.min.jsの場合）
	$(".sidr-class-fadeOpenSwitch").click(function () {
		$(".sidr-class-fadeOpenTarget").toggle(500);
	});    
});