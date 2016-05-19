<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>PRODUCT VIEWER 3D</title>
  <meta name="description" content="PRODUCT VIEWER 3D">
  <meta name="author" content="SitePoint">
    <style>
      * {
        margin: 0;
        padding: 0;
        }

      body {
        	font-family: Monospace;
          font-weight: bold;
          background-color: #FFF;
          margin: 0px;
          overflow: hidden;
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
        <!-- INCLUDES END -->

    </head>

    <body>

        <div id="infoButton"></div>
        <div id="infoBox" title="Demo Information">
        This three.js demo is part of a collection at
        <a href="http://www.tform.co.jp">HOWE PRODUCTIONS</a>
        </div>
        <!-- main page start here -->

          <script src='js/testScene.js'></script>

    </body>
</html>
