<!doctype html>

<html lang="en">
<head>
    <meta charset="utf-8">

    <title>PRODUCT VIEWER 3D</title>
    <meta name="description" content="PRODUCT VIEWER 3D">
    <meta name="author" content="SitePoint">


<style>

* {
	padding: 0;
	margin: 0;
}

body {
	width: 100%;
    font-family: Monospace;
    font-weight: bold;
    background-color: #ccccff;
    margin: 0px;
    overflow: hidden;
}

canvas {
    z-index: 0;
}

#guiBar {
	width: 50%;
	height: 50px;
	position: absolute;
	bottom: 55px;
	left: 25%;
	outline: 0px solid;
    background-color: #FFFFFF;
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
	opacity: 0.75;
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
	background-color: none;
	display: inline-block;
	white-space: nowrap;
	verticle-align: middle;
}



.guiBaseBtn:hover {
	cursor: pointer;
}


.guiBaseBtn span {
	display: block;
	padding: 2px;
	font-size: 31px;
}


.guiBaseBtn span i [class*="icon"]{
	background-color: red;
    display: block;
    height: 100%;
    width: 100%;
    margin: auto;
	text-align:center;
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
<link rel=stylesheet href="css/font-awesome.css" /> <!-- FONT-AWSOME -->


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
		/* button function hooks here */
		
        /*
		$("#rotateClockwiseBtn").click(function () {
			alert("CLOCKWISE");
		});
        
		$("#rotateCounterClockwiseBtn").click(function () {
			alert("COUNTER CLOCKWISE");
		});
        */
        
		$("#screenshotBtn").click(function () {
			alert("SCREENSHOT");
		});
		$("#settingsBtn").click(function () {
			alert("SETTINGS");
		});
		
		
		/* toggle button icon changes */
		$('#dayNightBtn span').click(function(){
			$(this).find('i').toggleClass('fa-plus-circle fa-minus-circle')
		});
	});
</script>
    
<!-- INCLUDES START -->
        <script src='js/three.min.js'></script>
        <!-- <script src="https://dl.dropboxusercontent.com/u/3587259/Code/Threejs/OrbitControls.js"></script> -->
        <script src="js/OrbitControls.js"></script>
        <script src='js/stats.min.js'></script>
        <script src='js/threex.keyboardstate.js'></script>
        <script src='js/dat.gui.min.js'></script>
        
         <!-- SCRIPT INCLUDES HERE -->
        <script src="js/jquery-1.9.1.js"></script>
        <script src="js/jquery-ui.js"></script>
        <link rel=stylesheet href="css/jquery-ui.css" />
        <link rel=stylesheet href="css/info.css"/>
        <script src="js/info.js"></script>
<!-- INCLUDES END -->
</head>

<body>
<!-- popup info START -->
<div id="infoButton"></div>
<div id="infoBox" title="Demo Information"> This demo has been produced for TFORM as a product viewer
<a href="http://www.tform.co.jp">HOWE PRODUCTIONS</a>
</div>
<!-- popup info END -->
    
<!-- main page start here -->
<script src='js/scene.js'></script>

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
	<!-- top view of gui bar -->
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
				</div>
			</div>
			<div id='guiNext' class='guiControlButton'><i class="fa fa-chevron-right"></i></div>
	</div>
	<!-- bottom controls of gui bar -->
	<div id='guiBarBase'>
		<div id='materialBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-cube"></i></span></div>
		<div id='rotateClockwiseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-repeat"></i></span></div>
		<div id='rotateCounterClockwiseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-undo"></i></span></div>
		<div id='dayNightBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-plus-circle"></i></span></div>
		<div id='screenshotBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-camera"></i></span></div>
		<div id='settingsBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-cog"></i></span></div>
	</div>
	<!-- top controls of gui bar -->
<body>

</html>