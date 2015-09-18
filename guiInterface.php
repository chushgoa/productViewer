<html>
<head>
<title>GUI Interface</title>

<style>

#guiBar {
	width: 200px;
	height: 50px;
	background: #CCC;
	margin: auto;
	position: relative;
}

#guiBar div{
	width: 40;
	height: 40;
	border-radius: 50%;
	background: #AAA;
	float: left;
	margin-top: 5px;
	text-align: center;
	line-height: 40px;
}
#guiBar .guiBarContentWrapper{
	position: absolute;
	top; 10px;
	background: #AAF;
	width: 300px;
	height: 300px;
	outline: solid 1px black;
	display: none;
}

</style>
</head>

<body>
	<div id='guiBar'>
		<div>
		<a href='#'>1</a>
			<span class='guiBarContentWrapper'>CONTENT HERE</span>
		</div>
		
		<div>
		<a href='#'>2</a>
			<span class='guiBarContentWrapper'>CONTENT HERE</span>
		</div>
		
		<div>
		<a href='#'>3</a>
			<span class='guiBarContentWrapper'>CONTENT HERE</span>
		</div>
	</div>
<body>

</html>