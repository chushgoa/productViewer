<html>
<head>
<title>GUI Interface</title>

<style>

* {
	padding: 0;
	margin: 0;
}

body {
	width: 100%;
}


#guiBar {
	width: 50%;
	height: 50px;
	position: absolute;
	bottom: 55px;
	left: 25%;
	outline: 0px solid;
	display: none;
	-webkit-touch-callout: none; 
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

#guiBarContentWrapper{
	position: absolute;
	left: 10%;
	width: 80%;
	overflow: hidden;
}

#guiBarItemWrapper {
	height: 50px;
	text-align: center;
	white-space: nowrap;
}

.guiItem {
	display: inline-block;
	width: 46px;
	height: 46px;
	background: #BBB;
	text-align: center;
	line-height: 40px;
	margin-bottom: 2px;
	margin-top: 2px;
	margni-left: 2px;
	margin-right: 2px;
	font-size: 10px;
}

#guiBarItemWrapper a {
	text-decoration: none;
	color: #000000;
}
#guiBarItemWrapper span {
	position: absolute;
	bottom: 0px;
	height: 20px;
	width: 42px;
	padding-left: 2px;
	padding-right: 2px;
	display: block;
	line-height: 20px;
	overflow: hidden;
}

#guiBarItemWrapper a:hover {
	opacity: 0.5;
}

#guiPrev i, #guiNext i {
	line-height: 54px;
}

#guiPrev {
	position: absolute;
	left: 0px;
	width: 10%;
	height: 50px;
	text-align: center;
	font-size: 30px;
	background: #FFF;
	color: #000;
	cursor: pointer;
}
#guiNext {
	position: absolute;
	right: 0px;
	width: 10%;
	height: 100%;
	text-align: center;
	font-size: 30px;
	background: #FFF;
	color: #000;
	cursor: pointer;
}

#guiNext:hover, #guiPrev:hover{
	
	color: #AAA;
}

/* GUIBAR BASE SECTION */

#guiBarBase {
	width: 50%;
	height: 35px;
	position: absolute;
	bottom: 15px;
	left: 25%;
	text-align: center;
	letter-spacing: 10px;
	font-size: 35px;
	line-height: 35px;
	-webkit-touch-callout: none; 
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

#guiBarBaseWrapper {
	display: inline-block;
}

.guiBaseBtn {
	width: 35px;
	height: 35px;
	background-color: #FFF;
	display: inline-block;
	white-space: nowrap;
	verticle-align: middle;
}

.guiBaseBtn:hover {
	cursor: pointer;
	
	
}

/* guiBase buttons animation code */

@keyframes buttonHover {
	from { background-color: #FFF; }
	to { background-color: green; }
}


</style>

<script src="js/jquery-1.9.1.js"></script>
<script src="js/jquery-ui.js"></script>
<link rel=stylesheet href="css/jquery-ui.css" />
<link rel=stylesheet href="css/hover.css" /> <!-- CSS3 HOVER EFFECTS -->

<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" media="all"> <!-- FONT AWSOME [Dependencies: HOVER EFFECTS ] -->

<script>
	$(document).ready(function(){
		
		/* SCROLLS THE GUI */
		$(function () {
			var iv; //timer for interval
			var div = $('#guiBarContentWrapper');
			$('#guiPrev').mousedown(function () {
				iv = setInterval(function () {
					div.scrollLeft(div.scrollLeft() - 10);
					//console.log('downLeft');
				}, 20);
			});
			$('#guiNext').mousedown(function () {
				iv = setInterval(function () {
					div.scrollLeft(div.scrollLeft() + 10);
					//console.log('downRight');
				}, 20);
			});

			
			$('#guiBarContentWrapper').on( 'DOMMouseScroll mousewheel', function ( event ) {
			  if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
				//scroll down
				console.log('Down');
				div.scrollLeft(div.scrollLeft() + 33);
			  } else {
				//scroll up
				console.log('Up');
				div.scrollLeft(div.scrollLeft() - 33);
			  }
			  //prevent page fom scrolling
			  
			  return false;
			  
			});
			
			$('#guiPrev,#guiNext').on('mouseup mouseleave', function () {
				clearInterval(iv);
				//console.log('up or leave');
			});
		});
		
		// Toggle Materials GUI bar
		$("#materialBtn").click(function () {
			$('#guiBar').animate({
				opacity: "toggle",
				width: "toggle"
				}, 200, "linear");
		});
			// hide gui after choice?
			$(document).mouseup(function (e)
{
				var container = $("#guiBar");

				if (!container.is(e.target) // if the target of the click isn't the container...
					&& container.has(e.target).length === 0) // ... nor a descendant of the container
				{
					container.hide();
				}
			});
		
		// --------------------------
		
		$("#rotateClockwiseBtn").click(function () {
			alert("CLOCKWISE");
		});
		$("#rotateCounterClockwiseBtn").click(function () {
			alert("COUNTER CLOCKWISE");
		});
		$("#screenshotBtn").click(function () {
			alert("SCREENSHOT");
		});
		$("#settingsBtn").click(function () {
			alert("SETTINGS");
		});
		
		
		/* toggle button icon changes */
		$('#dayNightBtn span').click(function(){
			$(this).find('i').toggleClass('fa-sun-o fa-circle-o')
		});
	});
</script>
	
</head>

<body>

<?php
// ----------------------------------------------------------------------------
//path to directory to scan. i have included a wildcard for a subdirectory
$directory = "textures/*/*/";
 
//get all image files with a .jpg extension.
$images = glob($directory."*.{gif,jpg,png}", GLOB_BRACE);

$imgs = '';
// create array
foreach($images as $image){ $imgs[] = "$image"; }
// ---------------------------------------------------------------------------

?>
	<div id='guiBar'>
	
		<div id='guiPrev' class='guiControlButton '><i class="fa fa-chevron-left"></i></div>
		
			<div id='guiBarContentWrapper'>
				<div id='guiBarItemWrapper'>
				
				<?php 

					//display images
					foreach ($imgs as $img) {
						echo "<a href='#'>";
						echo "<div class='guiItem'><img src='$img' style='width: 100%;' /><span></span></div>";
						echo "</a>";
					}

				?>
				
					<?php 
					/*
					// TEST LOOP
						for($i = 1; $i < 11; $i++){
							echo "
							<a href='#'>
								<div class='guiItem'><span>$i</span></div>
							</a>
							";
						}
						*/
					?>
				</div>
			</div>
			<div id='guiNext' class='guiControlButton'><i class="fa fa-chevron-right"></i></div>
		
	</div>
	<div id='guiBarBase'>
		<div id='materialBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-cube"></i></span></div>
		<div id='rotateClockwiseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-repeat"></i></span></div>
		<div id='rotateCounterClockwiseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-undo"></i></span></div>
		<div id='dayNightBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-sun-o"></i></span></div>
		<div id='screenshotBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-camera"></i></span></div>
		<div id='settingsBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-cog"></i></span></div>
		
		
	</div>
<body>

</html>