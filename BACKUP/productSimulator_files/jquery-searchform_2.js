$(function(){
	$("input#keywords, input#sidr-id-keywords").val("品番で商品を検索")
		.css( {
			"color":"#AAA", "padding-left":"0.3em", 
			//"font-size":"10px","line-height":"1.6em","letter-spacing":"0.15em"
		} );
	$("input#keywords, input#sidr-id-keywords").focus(function() {
		if(this.value == "品番で商品を検索"){
			$(this).val("").css( { "color":"#FFFFFF",
			//"font-size":"100%","line-height":"1.4em","letter-spacing":"0"
			} );
		}
	});
	$("input#keywords, input#sidr-id-keywords").blur(function(){
		if(this.value == "") {
			$(this).val("品番で商品を検索")
				.css( {
				"color":"#888",
				//"font-size":"10px","line-height":"1.6em","padding-left":"0.5em","letter-spacing":"0.15em"
				} );
		}
		if(this.value != "品番で商品を検索") {
			$(this).css("color","#000");
		}
	});
});