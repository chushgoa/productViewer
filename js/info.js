$(function()
{
	 $("#infoBox")
	.css(
	{
	   "background":"rgba(255,255,255,0.5)"
	})
	.dialog({ autoOpen: false,
		show: { effect: 'fade', duration: 200 },
		hide: { effect: 'fade', duration: 500 }
	});

	 $("#infoButton")
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9",
	  "position":"absolute", "bottom":"4px", "right":"4px"
	}) // adds CSS
    .append("<img width='32' height='32' src='images/icon-info.png'/>")
    .button()
	.click(
		function()
		{
			$("#infoBox").dialog("open");
		});
});
