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
                background-color: #ccccff;
                margin: 0px;
                overflow: hidden;
            }
            canvas {
                z-index: 0;
            }
            
          
        </style>
        
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
    </head>
    
    
    <body>
        
        <div id="infoButton"></div>
        <div id="infoBox" title="Demo Information">
        This three.js demo is part of a collection at
        <a href="http://www.tform.co.jp">HOWE PRODUCTIONS</a>
        </div>
        <!-- main page start here -->
        <script src='js/scene.js'></script>

        
    </body>
</html>