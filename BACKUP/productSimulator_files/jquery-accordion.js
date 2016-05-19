$(document).ready(function() {
	//汎用のアコーディオンメニュー
	$('.sidr-class-accordion .sidr-class-menuForSidr').click( function() {
		$(this).next('ul').slideToggle();
		$(this).children('span').toggleClass('open');
	});
	//「機能・設置方法・スペックから選ぶ」のアコーディオンメニュー
	setTimeout( function () {
		$('#container .sidr-class-accordion li ul').fadeToggle();
		$('#container .sidr-class-accordion li:first-child ul').fadeIn();
	}, 1000 );
});