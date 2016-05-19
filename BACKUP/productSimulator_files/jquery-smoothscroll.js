$(function(){
	// #で始まるアンカーをクリックした場合の処理
	$('a[href^=#]').click(function(){
		// スクロールの速度（ミリ秒）
		var speed = 500;
		// アンカーの値取得
		var href = $(this).attr("href");
		// 移動先を取得
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top;
		// スムーススクロール
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
	// 他のライブラリなどで#付きのリンクを利用していて、そこに関してはスムーススクリプトに変換したく無い場合はclass="noSmoothScroll"を指定
	$('a.noSmoothScroll').unbind();
});