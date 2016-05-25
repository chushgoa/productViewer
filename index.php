<!doctype html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="favicon.ico">
    <title>PRODUCT VIEWER 3D</title>
    <meta name="description" content="PRODUCT VIEWER 3D">
    <meta name="author" content="Product Simulation">

<!-- TEMP PAGE GUI PAGE STYLE -->
<style>

  * {
  	padding: 0;
  	margin: 0;
  }

  body {
  	width: 100%;
    font-family:'Lucida Grande', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', Meiryo, メイリオ, sans-serif;
    background-color: #FFFFFF;
    margin: 0px;
    overflow: hidden;
  }

  canvas {
      z-index: 0;
  }

  #guiBar {
  	width: 100%;
  	height: 50px;
  	position: absolute;
  	bottom: 55px;
  	left: 0;
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
  	margin-left: 2px;
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
  	width: 100%;
  	height: 35px;
  	position: absolute;
  	bottom: 15px;
  	left: 0;
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

  .fade {
  	opacity: 0.25;
  	transition: opacity .25s ease-in-out;
  	-moz-transition: opacity .25s ease-in-out;
  	-webkit-transition: opacity .25s ease-in-out;
  }

  .fade:hover {
  	opacity: 1;
  }

  /* guiBase buttons animation code */

  @keyframes buttonHover {
  	from { background-color: #FFF; }
  	to { background-color: green; }
  }

</style>

<!-- INCLUDES START -->
<!-- CSS -->
<link rel=stylesheet href="css/jquery-ui.css" /><!-- JQUERY UI CSS -->
<link rel=stylesheet href="css/info.css"/><!-- CSS FOR THE INFO BOX-->
<link rel=stylesheet href="css/hover.css" /> <!-- HOVER EFFECTS CSS3 -->
<link rel=stylesheet href="css/font-awesome.css" /> <!-- FONT-AWSOME for icons and such -->

<!-- JAVASCRIPT -->
<script src='js/three.js'></script><!-- MAIN THREE JS FILE -->
<script src="js/OrbitControls.js"></script> <!-- MOUSE CONTROLS -->
<script src='js/stats.min.js'></script> <!-- ADD A GRAPHICS USAGE GUI TO SCREEN -->
<script src='js/threex.keyboardstate.js'></script>
<script src='js/dat.gui.min.js'></script><!-- GUI needed file -->
<script src='js/loaders/OBJLoader.js'></script> <!-- OBJECT LOADER -->
<script src="js/jquery-1.9.1.js"></script> <!-- JQUERY -->
<script src="js/jquery-ui.js"></script> <!-- JQUERY UI -->
<script src="js/loadingScreen.js"></script><!-- ADD A LOADING SCREEN -->
<script src="js/info.js"></script><!-- INFO ABOUT PROGRAM IN A POPUP -->
<script src="js/Detector.js"></script><!-- Detects if if browswer is using WebGL -->
<script src="js/Raycaster.js"></script><!-- RAYCASTER FOR THE INTERSECTIONS -->
<script src="js/THREEx.screenshot.js"></script><!-- SCREEN SHOT -->

<!-- INCLUDES END -->

<!-- ON DOC READY -->
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
			$(document).mouseup(function (e) {
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
/*
// ----------------------------------------------
// SCREENSHOT ----------------------------------
// ----------------------------------------------
// THIS IS SET IN THE THREEx.screenshot.js file.
// KEEP THIS BIT OF CODE FOR REFERENCE.
		$("#screenshotBtn").click(function () {
			//alert("SCREENSHOT");
		});
// ----------------------------------------------
*/

		$("#settingsBtn").click(function () {
			//alert("SETTINGS");
		});

		/* toggle button icon changes */
		$('#playPauseBtn span').click(function(){
			$(this).find('i').toggleClass('fa-pause fa-play')
		});
	});
</script>


</head>

<body>
  <script>
    //BEFORE ANYTHING START THE LOADING SCREENs
    loadingScreen(); // start loading screen
  </script>
<!-- popup info START -->
<div id="infoButton"></div>
<div id="infoBox" title="Demo Information"> This demo has been produced for TFORM as a product viewer
<a href="http://www.tform.co.jp">HOWE PRODUCTIONS</a>
</div>
<!-- popup info END -->

<?php
// ----------------------------------------------------------------------------
// path to directory to scan. i have included a wildcard for a subdirectory
// can set how deep you want to go by the stars "textures/*/*/" will search 2 folders down from 'textures'
$directory = "textures/testTextures/*/";

//get all image files with a .jpg extension.
$images = glob($directory."*.{gif,jpg,png}", GLOB_BRACE);

$imgs = '';
// create array
foreach($images as $image){ $imgs[] = "$image"; }
// ---------------------------------------------------------------------------
?>


	<!-- main page start here -->
<!--<script src='js/scene.js'></script>-->

<!--<div id="canvasWrapper">
  <div id="canvasBlock" style="width: 100%; height: 100%; margin: auto; background-color: red; position: relative;"> -->
    <!-- top view of gui bar -->
  	<div id='guiBar'>
  		<div id='guiPrev' class='guiControlButton '>
        <i class="fa fa-chevron-left"></i>
      </div>
      <div id='guiBarContentWrapper'>
      	<div id='guiBarItemWrapper'>
      	<?php
      		//display images
  // FIX TO READ ONLY FROM THIS ITEMS DIRECTORY OF APPROVED TEXTURES, For now its hardcoded to show all textures.
      		foreach ($imgs as $img) {
      		echo "<a href='#'>";
      			echo "<div class='guiItem' name='$img'><img src='$img' style='width: 100%;' /><span></span></div>";
      			echo "</a>";
      		}
      	?>
      	</div>
      </div>
  			<div id='guiNext' class='guiControlButton'>
          <i class="fa fa-chevron-right"></i>
        </div>
  	</div>
  	<!-- bottom controls of gui bar -->
  	<div id='guiBarBase' class='fade'>
  		<div id='materialBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-cube"></i></span></div>
  		<div id='rotateClockwiseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-repeat"></i></span></div>
  		<div id='rotateCounterClockwiseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-undo"></i></span></div>
  		<div id='playPauseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-pause"></i></span></div>
  		<div id='screenshotBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-camera-retro"></i></span></div>
  		<div id='dimBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-arrows-h"></i></span></div>
  	</div>
  	<!-- top controls of gui bar -->

    <img src="textures/logo/logoHussl.png" style='max-width: 100px; top: 10px; left: 10px; position: absolute;'>
    <div style='position: absolute; top: 50px; left: 10px; color: #828282; font-size: 18px;'>
      <span style="font-weight: 700;">スタンダードチェア</span>スタッキング不可能<br>
      w43xd46xh78.5 sh45cm<br>
        <span style="color: #000;">
          ST6N-2<br>
          座：木製<br>
          ￥46,400(税別)<br>

        </span>

    </div>
    <script src='js/scene.js'></script>
    <!--
  </div>
</div>
-->
</body>
</html>
