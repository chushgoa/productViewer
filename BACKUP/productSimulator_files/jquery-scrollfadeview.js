$(function() {
	var viewBox = $('.scrollFadeView');
	viewBox.hide();
	//スクロールが200に達したら表示
	$(window).scroll(function () {
		if($(this).scrollTop() > 200) {
			viewBox.fadeIn(500);
		} else {
			viewBox.fadeOut(500);
		}
	});
});