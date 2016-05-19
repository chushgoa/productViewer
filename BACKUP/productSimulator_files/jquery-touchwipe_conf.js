$(window).touchwipe({
	wipeLeft: function() {
		// Close
		$.sidr('close', 'sidr-main');
	},
	preventDefaultEvents: false
});