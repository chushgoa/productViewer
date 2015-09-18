<html>
    <head>
        <title>GUI Test Page</title>
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
        
        <!-- ACCORDIAN SCRIPT -->
        <script>
        $(document).ready(function(){
 
            activePanel = $("#accordion div.panel:first");
            $(activePanel).addClass('active');

            $("#accordion").delegate('.panel', 'click', function(e){
                if( ! $(this).is('.active') ){
                    $(activePanel).animate({width: "44px"}, 300);
                    $(this).animate({width: "848px"}, 300);
                    $('#accordion .panel').removeClass('active');
                    $(this).addClass('active');
                    activePanel = this;
                 };
            });
        });
        </script>
        
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