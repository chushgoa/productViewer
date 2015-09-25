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
	outline: 1px solid;
	display: none;
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
	margni-left: 1px;
	margin-right: 1px;
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

#guiPrev {
	position: absolute;
	left: 0px;
	width: 10%;
	height: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 30px;
	background: #CCC;
	color: #FFFFFF;
	cursor: pointer;
}
#guiNext {
	position: absolute;
	right: 0px;
	width: 10%;
	height: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 30px;
	background: #CCC;
	color: #FFFFFF;
	cursor: pointer;
}

#guiNext:hover, #guiPrev:hover{
	background-color: red;
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
			$('#guiPrev,#guiNext').on('mouseup mouseleave', function () {
				clearInterval(iv);
				//console.log('up or leave');
			});
		});
		
		// CLOSE DIV
		$("#guiCloseBtn").click(function () {
			$('#guiBar').animate({
				opacity: "toggle",
				width: "toggle"
				}, 200, "linear");
		});
	});
</script>
	
</head>

<body>

<?php
// ----------------------------------------------------------------------------
//path to directory to scan. i have included a wildcard for a subdirectory
$directory = "textures/*/";
 
//get all image files with a .jpg extension.
$images = glob($directory."*.{gif,jpg,png}", GLOB_BRACE);

$imgs = '';
// create array
foreach($images as $image){ $imgs[] = "$image"; }
// ---------------------------------------------------------------------------

?>
	<div id='guiBar'>
	
		<div id='guiPrev' class='guiControlButton'> < </div>
		
			<div id='guiBarContentWrapper'>
				<div id='guiBarItemWrapper'>
				
				<?php 

					//display images
					foreach ($imgs as $img) {
						echo "<a href='#'>";
						echo "<div class='guiItem'><img src='$img' style='width: 100%;' /><span>test</span></div>";
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
			<div id='guiNext' class='guiControlButton'> > </div>
		
	</div>
	<div id='guiBarBase'>
		<div id='guiCloseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-cube"></i></span></div>
		<div id='guiCloseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-repeat"></i></span></div>
		<div id='guiCloseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-undo"></i></span></div>
		<div id='guiCloseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-camera"></i></span></div>
		<div id='guiCloseBtn' class='guiBaseBtn hvr-float-shadow'><span class=""><i class="fa fa-cog"></i></span></div>
	</div>
<body>

</html>