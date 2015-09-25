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
				width: 100%;
            }
			
			.startBtn {
				display: block;
				width: 150px;
				height: 50px;
				color: #FFF;
				background: #000;
				border: none;
				padding: 10px 10px 10px 10px;
				margin-left: auto;
				margin-right: auto;
				margin-top: 300px;
				font-family: Monospace;
                font-weight: bold;
				font-size: 25px;
				line-height: 15px;
			}

			.startBtn:hover{
				color: #AAA;
				background: #000;
				border: none;
				padding: 10px 20px 10px 20px;
				cursor: pointer;
			}
			
        </style>
        

        
    </head>
    <body>
		<button onClick="window.open('guiInterface.php', 'BaseWindow5', 'width=1905,height=980, top=0, left=0, resizable=yes')" class='startBtn'><span style='font-size: 11px;'>Product Viewer 3D</span><br>START</button>
   
        
    </body>
</html>