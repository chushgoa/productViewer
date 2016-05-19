// ******************************************************************
// GLOBAL DECLARATIONS
// ******************************************************************
/* GENERAL */
var camera, controls, scene, renderer, light, stats;
var canvasBlock = document.getElementById("canvasBlock"); // set the canvas to fit the div in the html named canvasBlock
var mirrorStandCamera;

/* OBJECTS */
var floor, floorGeometry, floorPos, floorMaterial; // test floor
var stand, standGeometry, standMaterial; // reflective stand (needs reflection camera to work)
var spriteObj, spriteMaterial; // info button sprite
var sphere, sphereGeometry, spherePos; // test sphere
var box; // set the center calculation (not helper version)
var testObj;
/* MATERIALS */
var material01;

/* LIGHTS and SHADOWS */
var bulbLight, bulbMat, stats, hemiLight;

// ref for lumens: http://www.power-sure.com/lumens.htm
var bulbLuminousPowers = {
	"110000 lm (1000W)": 110000,
	"3500 lm (300W)": 3500,
	"1700 lm (100W)": 1700,
	"800 lm (60W)": 800,
	"400 lm (40W)": 400,
	"180 lm (25W)": 180,
	"20 lm (4W)": 20,
	"Off": 0
};

// ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
var hemiLuminousIrradiances = {
	"0.0001 lx (Moonless Night)": 0.0001,
	"0.002 lx (Night Airglow)": 0.002,
	"0.5 lx (Full Moon)": 0.5,
	"3.4 lx (City Twilight)": 3.4,
	"50 lx (Living Room)": 50,
	"100 lx (Very Overcast)": 100,
	"350 lx (Office Room)": 350,
	"400 lx (Sunrise/Sunset)": 400,
	"1000 lx (Overcast)": 1000,
	"18000 lx (Daylight)": 18000,
	"50000 lx (Direct Sun)": 50000
};

var params = {
	shadows: false,
	exposure: 0.5,
	bulbPower: Object.keys( bulbLuminousPowers )[2],
	hemiIrradiance: Object.keys( hemiLuminousIrradiances )[6]
};

var clock = new THREE.Clock(); // for the lights
var previousShadowMap = false; // set shadows

/* TRANSLATE */
var rotationSpeed = 0.05; // test rotation speed for THREEgui
var moveSpeed = 0.01; // test moveSpeed for TRHEEgui
var rotationC = false; // set boolean for rotation for gui button
var rotationCC = false; // set boolean for rotation for gui button

/* INPUT DEVICES */
var projector, mouse = { x: 0, y: 0 }, INTERSECTED; // for mouse over functions
var keyboard; // keyboard input reference
var guiControls; // GUI controls reference

/* DEVELOPMENT FUNCTIONS*/
var rendererStats; // stats for rendering
var manager; // loading manager

// -----------------------------------------------------------------------------

// ********************************************************
// LOADING SCREEN
// ********************************************************
	manager = new THREE.LoadingManager();

	manager.onProgress = function ( item, loaded, total ) {

	renderer.render( scene, camera );
	console.log( item, loaded, total );

	if(loaded == total){
	console.log("ALL LOADED");
//	$("#loadingScreen").fadeOut(500); // soft fade in from the loading screen
	}

};
manager.onLoad = function(){

	console.log("ALL LOADED");

	testObj = scene.getObjectByName('myGroup');
	console.log(testObj.name);

	box = new THREE.Box3(); // create a box to find center of object
	box.setFromObject(testObj);
	box.center(controls.target);
	//console.log( box.min, box.max, box.size());
	//console.log(box.center(controls.target));

	camera.lookAt(box.center(controls.target));

	animate();

	$("#loadingScreen").fadeOut(500, function(){});

};
manager.onError = function(){
	console.log("error loading something");
}


init();
//animate();

function init() {
  //test if webgl is supported and if so use WebGL if not use canvas renderer
	if(Detector.webgl){
    // ******************************************************************
    // RENDERER ---------------------------------------------------------
    // ******************************************************************
		renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	} else {
		renderer = new THREE.CanvasRenderer();
	}

// ******************************************************************
// RENDERER ---------------------------------------------------------
// ******************************************************************

  //renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
  renderer.physicallyCorrectLights = true;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.toneMapping = THREE.ReinhardToneMapping;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(canvasBlock.offsetWidth, canvasBlock.offsetHeight);
  renderer.setClearColor(0xCCCCCC, 1);
  //renderer.shadowMapEnabled = true;
  //renderer.shadowMapType = THREE.PCFSoftShadowMap;
  canvasBlock.appendChild(renderer.domElement);

// ******************************************************************
// SCENE ------------------------------------------------------------
// ******************************************************************

    scene = new THREE.Scene();

// ******************************************************************
// CAMERA -----------------------------------------------------------
// ******************************************************************

    camera = new THREE.PerspectiveCamera(50, canvasBlock.offsetWidth/canvasBlock.offsetHeight, 0.001, 20000);
    camera.position.set(1,1.25,1);


// ******************************************************************
// CONTROLS ---------------------------------------------------------
// ******************************************************************

    controls = new THREE.OrbitControls(camera, renderer.domElement);

		//controls.userPanSpeed = 0; // disable panning
		//controls.maxPolarAngle = Math.PI/2; // dont let camera go below horizon


    //controls.damping = 0.2;
    //controls.addEventListener('change', render);

// ******************************************************************
// STATS ------------------------------------------------------------
// ******************************************************************

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

// ******************************************************************
// LIGHTS -----------------------------------------------------------
// ******************************************************************

    light = new THREE.SpotLight(0xffffff);
    light.position.set(100,1000,100);
    scene.add(light);
    light.castShadow = true;
    //light.shadowDarkness = .2;

    light.shadow.bias = 0.1;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    light.shadow.camera.near = 1;
    light.shadow.camera.far = 4000;
    light.shadow.camera.fov = 270;

    // ----------------------------------------
    lightAmbient = new THREE.AmbientLight(0xFFFFFF);
    //scene.add(lightAmbient);

// ******************************************************************
// KEYBOARD ---------------------------------------------------------
// ******************************************************************

    keyboard = new THREEx.KeyboardState();


// ******************************************************************
// HELPERS ----------------------------------------------------------
// ******************************************************************
/*
    // grid
    var size = 10;
    var step = 1;

    var gridHelper = new THREE.GridHelper( size, step );
    gridHelper.setColors(0xff0000, 0xCCCCCC);
    //scene.add( gridHelper );

    // wireframe
    var wireframe = new THREE.WireframeHelper( sphere, 0x00ff00 );
    //scene.add(wireframe);

    // axis
    var axis = new THREE.AxisHelper(5); //  will be on top
    //scene.add(axis);

    // camera helper
    cameraHelp = new THREE.CameraHelper(camera);
    //scene.add(cameraHelp);

    // point light helper
    var pointLightHelpherShereSize = 0.5;
    var pointLightHelperSphere = new THREE.PointLightHelper(light, pointLightHelpherShereSize);
    //scene.add(pointLightHelperSphere);
*/
// ******************************************************************
// GUI --------------------------------------------------------------
// ******************************************************************

    guiControls = new function() {
        /* master variables */
        this.movementSpeed = 0.011; // movement speed
        this.rotationSpeed = 0.011; // rotation speed
        this.scale = 1; //scale
        this.fov = 80;// fov

        /* LIGHTS */
        this.lightPosX = 2.5;
        this.lightPosY = 3;
        this.lightPosZ = 1;
        this.lightStrength = 0.1;

        /* COLORS */
        this.color0 = "#ffae23"; // CSS string
    }

		// ********************************************************
	// GUI
	// ********************************************************
	var gui = new dat.GUI();

				gui.add( params, 'hemiIrradiance', Object.keys( hemiLuminousIrradiances ) );
				gui.add( params, 'bulbPower', Object.keys( bulbLuminousPowers ) );
				gui.add( params, 'exposure', 0, 1 );
				gui.add( params, 'shadows' );
				gui.open();
	// ********************************************************



    window.onload = function(){
        var gui = new dat.GUI();

        // MASTER VARIABLES
        var f1 = gui.addFolder('Master');
        f1.add(guiControls, 'movementSpeed', 0.00001, 0.5);
        f1.add(guiControls, 'rotationSpeed', 0.00001, 0.5);
        f1.add(guiControls, 'fov', 50, 100);

        // TRANSFORMS
        var f2 = gui.addFolder('Transform');
        // modle transforms
        f2.add(guiControls, 'scale', 0.01, 3);

        // MATERIALS
        var f4 = gui.addFolder('Material');
        f4.addColor(guiControls, 'color0');

        // LIGHTS
        var f5 = gui.addFolder('Lights');
        f5.add(guiControls, 'lightPosX', -5, 5);
        f5.add(guiControls, 'lightPosY', -5, 5);
        f5.add(guiControls, 'lightPosZ', -5, 5);
        f5.add(guiControls, 'lightStrength', 0, 5);


        //f1.open();
        //f2.open();
        //f4.open();
        gui.close();

        /* GUI hooks */
        var el_rotateClockwise = document.getElementById("rotateClockwiseBtn");
        el_rotateClockwise.addEventListener('mousedown', function(){guiRotateClockwise(true);}, false);
        el_rotateClockwise.addEventListener('mouseup', function(){guiRotateClockwise(false);}, false);

        var el_rotateCounterClockwise = document.getElementById("rotateCounterClockwiseBtn");
        el_rotateCounterClockwise.addEventListener('mousedown', function(){guiRotateCounterClockwise(true);}, false);
        el_rotateCounterClockwise.addEventListener('mouseup', function(){guiRotateCounterClockwise(false);}, false);
    }

/* ADD THE FUCNTIONS HERE IN ORDER*/
	addReflectionCam(); // add reflection cam
	addLights(); // lights
	addMaterials(); // materials
	addObjects(); // add objects
	addLoaders(); // add loaders


    // initialize object to perform world/screen calculations
		//projector = new THREE.Projector(); // used for seeing for mouse over events to 2d objects. New way of doing it added in r71

    // when the mouse moves, call the given function
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    // render on windown resize ----------------------------------------------------------
    window.addEventListener('resize', onWindowResize, false);
    // -----------------------------------------------------------------------------------


}

// ******************************************************************
// FUNCTIONS START --------------------------------------------------
// ******************************************************************

/* ADD CAMERA REFLECTION CAMERA */
function addReflectionCam(){
	/* stand Reflection Camera */
	mirrorStandCamera = new THREE.CubeCamera( 0.1, 5000, 512 );
	mirrorStandCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
	scene.add( mirrorStandCamera );
}

/* PHYSICAL LIGHTING SETUP TO RUN WITHIN THE RENDER FUNCTION */
function addPhysicalLighting(){
	renderer.toneMappingExposure = Math.pow( params.exposure, 5.0 ); // to allow for very bright scenes.
	renderer.shadowMap.enabled = params.shadows;
	bulbLight.castShadow = params.shadows;
	if( params.shadows !== previousShadowMap ) {
		//ballMat.needsUpdate = true;
		//cubeMat.needsUpdate = true;
		//floorMat.needsUpdate = true;
		floorMaterial.needsUpdate = true;
		previousShadowMap = params.shadows;
	}
	bulbLight.power = bulbLuminousPowers[ params.bulbPower ];
	bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.02, 2.0 ); // convert from intensity to irradiance at bulb surface

	hemiLight.intensity = hemiLuminousIrradiances[ params.hemiIrradiance ];
	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();

	bulbLight.position.y = Math.cos( time ) * 0.75 + 1.25;
	//testObject01.position.x = Math.cos ( time ) * 0.25 + 0.5;
}

/* LIGHTS */
function addLights() {

	// -------------------------------------------------------
	/* TEST LIGHT */
	// -------------------------------------------------------
	var bulbGeometry = new THREE.SphereGeometry( 0.02, 16, 8 );
	bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );
	bulbLight.name = "POINT LIGHT FOR SHADOWS???"

	bulbMat = new THREE.MeshStandardMaterial( {
		emissive: 0xffffee,
		emissiveIntensity: 1,
		color: 0x000000
	});

	bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
	bulbLight.position.set( 1, 2, 0 );
	bulbLight.castShadow = true;
	bulbLight.shadow.bias = 0.1;
	bulbLight.shadow.mapSize.width = 1024;
	bulbLight.shadow.mapSize.height = 1024;
	scene.add( bulbLight );

	hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );
	scene.add( hemiLight );

	// -------------------------------------------------------
}

/* MATERIALS */
function addMaterials() {
	var textureName = "husslColors";
	var textureUrl = "textures/"+textureName+"/";
	var loadedTextureName = textureUrl + textureName;
	var textureExtention = ".png";
	var textureWrappingAmount = 5; // texture wrapping amount (tiling)
	var tempName = "textures/testTextures/fabric/fabric_beige.jpg";

	var textureLoader = new THREE.TextureLoader(manager); // texture loader
	// materials
	var textureDiffuse;

	// texture - texture must not be in the same folder or there is an error.
	textureDiffuse = textureLoader.load(tempName, function(){ console.log('texture loaded'); },	function(){ alert('error');} );

	// Specular Map
	//textureSpec = THREE.ImageUtils.loadTexture(loadedTextureName +'_spec'+textureExtention, {}, function(){}, function(){ alert('error'); });

	// Normal Map
	//textureNormal = THREE.ImageUtils.loadTexture(loadedTextureName +'_normal'+textureExtention, {}, function(){},	function(){ alert('error'); });

	// Bump Map
	//textureBump = THREE.ImageUtils.loadTexture(loadedTextureName +'_displace'+textureExtention, {}, function(){},	function(){ alert('error');	});

	// Environment Map
	//textureEnvironment = THREE.ImageUtils.loadTexture('textures/envMaps/envMap.jpg', {}, function(){ /*alert('Env map loaded');*/	},	function(){	alert('error');	});

	// Texture Wrapping
	textureDiffuse.wrapS = THREE.RepeatWrapping;
	textureDiffuse.wrapT = THREE.RepeatWrapping;
	textureDiffuse.repeat.set(textureWrappingAmount,textureWrappingAmount);
	/*
	textureSpec.wrapS = THREE.RepeatWrapping;
	textureSpec.wrapT = THREE.RepeatWrapping;
	textureSpec.repeat.set(textureWrappingAmount,textureWrappingAmount);

	textureNormal.wrapS = THREE.RepeatWrapping;
	textureNormal.wrapT = THREE.RepeatWrapping;
	textureNormal.repeat.set(textureWrappingAmount,textureWrappingAmount);

	textureBump.wrapS = THREE.RepeatWrapping;
	textureBump.wrapT = THREE.RepeatWrapping;
	textureBump.repeat.set(textureWrappingAmount,textureWrappingAmount);
	*/
	// basic materials
	testObjectMaterial01 = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 500, reflectivity: 0, side: THREE.DoubleSide});
	testObjectMaterial02 = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});

	// textured material
	material01 = new THREE.MeshPhongMaterial({
		map: textureDiffuse,
		specular: 0xffffff,
		shininess: 10,
		reflectivity: 0,
			side: THREE.DoubleSide
	});

	/* floor plane */
	floorMaterial = new THREE.MeshStandardMaterial({
		roughness: 0.8,
		color: 0xffffff,
		metalness: 0.2,
		bumpScale: 0.0005,
		side: THREE.DoubleSide
	});

	//FloorTexture HERE
	textureLoader.load( "textures/floor/hardwood.jpg", function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 5, 5 );
		floorMaterial.map = map;
		floorMaterial.needsUpdate = true;
	}, function(){alert("errorLoading");} );
	textureLoader.load( "textures/floor/hardwood_displace.jpg", function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 5, 5 );
		floorMaterial.bumpMap = map;
		floorMaterial.needsUpdate = true;
	} );
	textureLoader.load( "textures/floor/hardwood_spec.jpg", function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 5, 5 );
		floorMaterial.roughnessMap = map;
		floorMaterial.needsUpdate = true;
	} );

	/* stand */
	standMaterial = new THREE.MeshPhongMaterial( {
				//ambient: 0xffffff,
				reflectivity: 0.15,
				color: 0x7E7E7E,
				specular: 0x050505,
				shininess: 100,
				shading: THREE.SmoothShading, //THREE.FlatShading,
				blending: THREE.NormalBlending,
				side: THREE.DoubleSide,
				envMap: mirrorStandCamera.renderTarget
	} );

	/* testMesh */
	var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,side: THREE.DoubleSide});

	/* sprite */
	var spriteMap = new THREE.TextureLoader("images/plus.png");
	spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff, fog: true});

		//materialMatCap.uniforms.tMatCap.value.wrapS =
		//materialMatCap.uniforms.tMatCap.value.wrapT =
		THREE.ClampToEdgeWrapping;
}

/* OBJECTS */
function addObjects(){
	/* floor plane */
	floorGeometry = new THREE.PlaneGeometry(5,5,1);
	floor = new THREE.Mesh(floorGeometry,floorMaterial);
	floor.name = "Test floor Plane";
	floor.rotation.x = Math.PI / 2;
	floor.position.y = -0.25;
	floor.receiveShadow = true;
	scene.add(floor);


	/* standMesh */
	standGeometry = new THREE.CylinderGeometry(1, 1, 0.25, 64);

	stand = new THREE.Mesh( standGeometry, standMaterial);
	stand.receiveShadow = true;
	stand.position.y = -0.125;
	mirrorStandCamera.position = stand.position;
	scene.add(stand);

	/* testMesh */
	sphereGeometry = new THREE.SphereGeometry(0.1,64,64);

	sphere = new THREE.Mesh(sphereGeometry, material01);
	sphere.castShadow = true;
	sphere.position.set(0,0.5,0);
	//sphere.receiveShadow = true;
	//scene.add(sphere);

	scene.updateMatrixWorld(true);
	spherePos = new THREE.Vector3();

	/* sprite */
	spriteObj = new THREE.Sprite(spriteMaterial);
	spriteObj.name = "sprite";
	spriteObj.position.set(0,1.5,0);
	spriteObj.scale.set(0.5,0.5,0.5)
	//scene.add(spriteObj);

	}

/* LOADING SCREEN */
function addLoadingScreen() {

  // loadingScreen
  loadingScreen = document.createElement( 'div' );
  loadingScreen.id = "loadingScreen";
  loadingScreen.style.position = 'absolute';
  loadingScreen.style.top = '0px';
  loadingScreen.style.bottom = '0px';
  loadingScreen.style.width = '100%';
  loadingScreen.style.height = '100%';
  loadingScreen.style.textAlign = 'center';
  loadingScreen.style.lineHeight = '100px';
  loadingScreen.style.color = '#000000';
  loadingScreen.style.fontWeight = 'bold';
  loadingScreen.style.backgroundColor = '#FFFFFF';
  loadingScreen.style.zIndex = '2';
  loadingScreen.style.fontFamily = 'Monospace';
  loadingScreen.innerHTML = 'LOADING...';
  document.body.appendChild( loadingScreen );
  console.log("loadingScreen");
}

/* bound button to rotate camera clockwise */
function guiRotateClockwise(rot) {
  if (rot == true){
    rotationC = true;
  } else if(rot == false){
    rotationC = false;
  }
}

/* bound button to rotate camera counter-clockwise */
function guiRotateCounterClockwise(rot) {
      if (rot == true){
        rotationCC = true;
      } else if(rot == false){
        rotationCC = false;
      }
}

/* update rotation based on GUI input */
function rotationUpdate() {
  // check for clockwise roation
  if (rotationC == true){
    testObj.rotation.y += rotationSpeed; // animate if true
  }

  // check for counter clockwise rotation
  if (rotationCC == true){
    testObj.rotation.y -= rotationSpeed; // animate if true
  }
}

/* updates mouse movement */
function onDocumentMouseMove( event ) {
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();

	// update the mouse variable
	//mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	//mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	mouse.x = ( event.clientX / canvasBlock.offsetWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / canvasBlock.offsetHeight ) * 2 + 1;

}

/* LOADERS */
function addLoaders(){

	var material;
  var modelPath = "models/st61.obj";
  var loader = new THREE.OBJLoader(manager);
  loader.load(modelPath, function (object) {

    //if you want to add your custom material
    var materialObj = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 0.1, reflectivity: 0.1, side: THREE.DoubleSide});
    object.traverse(function (child) {

      if (child instanceof THREE.Mesh) {

				//child.geometry.computeBoundingBox(); //*************************** LEFT OFF HERE
        /*TESTING*/

        var geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
        geometry.mergeVertices();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        child.geometry = new THREE.BufferGeometry().fromGeometry( geometry );

        /*TESTING*/

        child.material = materialObj;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });


  	// group name
  	object.name="myGroup";

  	// seat
  	object.children[0].material = new THREE.MeshPhongMaterial({color: 0x7fa22b, specular: 0xcccccc, shininess: 10, reflectivity: 10, side: THREE.DoubleSide});

  	// bolts
  	object.children[1].material = new THREE.MeshPhongMaterial({color: 0xffffff, reflectivity: 1, side: THREE.DoubleSide});

  	// backrest
  	object.children[2].material = new THREE.MeshPhongMaterial({color: 0x7fa22b, specular: 0xcccccc, shininess: 10, reflectivity: 10, side: THREE.DoubleSide});
  	//object.children[2].material = material01;

  	// frameRim
  	object.children[3].material = material01;

  	// frameLegs
  	object.children[4].material = material01;

  	// footPads
  	object.children[5].material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xcccccc, shininess: 0.1, reflectivity: 0.1, side: THREE.DoubleSide});

		//then directly add the object

		scene.add(object);

  });
}

/* GET CENTER OF OBJECT */
 function getCentroid ( mesh ) {

    mesh.geometry.computeBoundingBox();
    boundingBox = mesh.geometry.boundingBox;

    var x0 = boundingBox.x[ 0 ];
    var x1 = boundingBox.x[ 1 ];
    var y0 = boundingBox.y[ 0 ];
    var y1 = boundingBox.y[ 1 ];
    var z0 = boundingBox.z[ 0 ];
    var z1 = boundingBox.z[ 1 ];


    var bWidth = ( x0 > x1 ) ? x0 - x1 : x1 - x0;
    var bHeight = ( y0 > y1 ) ? y0 - y1 : y1 - y0;
    var bDepth = ( z0 > z1 ) ? z0 - z1 : z1 - z0;

    var centroidX = x0 + ( bWidth / 2 ) + mesh.position.x;
    var centroidY = y0 + ( bHeight / 2 )+ mesh.position.y;
    var centroidZ = z0 + ( bDepth / 2 ) + mesh.position.z;

    return mesh.geometry.centroid = { x : centroidX, y : centroidY, z : centroidZ };
}

/* update render on window resize */
function onWindowResize() {

    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();

    //renderer.setSize(window.innerWidth, window.innerHeight);

	camera.aspect = canvasBlock.offsetWidth / canvasBlock.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasBlock.offsetWidth, canvasBlock.offsetHeight);


    render();

}

/* keyboard controls */
function keyboardControls(){

    if (keyboard.pressed("A")== true){
        sphere.position.x -= moveSpeed; // speed from gui;
    }
    if (keyboard.pressed("D")== true){
        sphere.position.x += moveSpeed;
    }
    if (keyboard.pressed("W")== true){
        sphere.position.z -= moveSpeed;
    }
    if (keyboard.pressed("S")== true){
        sphere.position.z += moveSpeed;
    }
    if (keyboard.pressed("Q")== true){
        sphere.rotation.y -= rotationSpeed;
    }
    if (keyboard.pressed("E")== true){
        sphere.rotation.y += rotationSpeed;
    }
}

/* update gui controls */
function guiControlsUpdate(){
    spherePos.setFromMatrixPosition(sphere.matrixWorld); //gives the shere world cords so can move it around.

    // camera update
    camera.fov = guiControls.fov;
    camera.updateProjectionMatrix(); // to update fov, near, far or aspect(ratio) this is needed.

    // model transforms
    moveSpeed = guiControls.movementSpeed;
    rotationSpeed = guiControls.rotationSpeed;
    sphere.scale.set(guiControls.scale,guiControls.scale,guiControls.scale);

    // light position
    light.position.x = guiControls.lightPosX;
    light.position.y = guiControls.lightPosY;
    light.position.z = guiControls.lightPosZ;
    light.intensity = guiControls.lightStrength;
}

/* mouse over raycast for the sprite mouseover to highlight what part of mesh you want to change */
function spriteHover() {
  /*
     // find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( scene.children );

	// INTERSECTED = the object in the scene currently closest to the camera
	//		and intersected by the Ray projected from the mouse position

	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		// if the closest object intersected is not the currently stored intersection object
		if ( intersects[ 0 ].object != INTERSECTED )
		{
		    // restore previous intersection object (if it exists) to its original color
			if ( INTERSECTED )
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			// store reference to closest object as current intersection object
			INTERSECTED = intersects[ 0 ].object;
			// store color of closest object (for later restoration)
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			// set a new color for closest object
            if(intersects[ 0 ].object.name == "sprite" ) {

			INTERSECTED.material.color.setHex( 0xff0000 );
            // alert(intersects[0].object.name);
            }
		}
	}
	else // there are no intersections
	{
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED )
			INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

		// remove previous intersection object reference
		// by setting current intersection object to "nothing"
		INTERSECTED = null;
	}
  */
}

/* animates the scene */
function animate() {

    requestAnimationFrame(animate); // sets the 60fps

    // --------------------------------------------------------------
    // test animation
    // sphere.rotation.y += 0.011; // set rotation speed (temp disabled)
    // --------------------------------------------------------------

    render();
    update();

}

/* update functions */
function update(){
    spriteHover(); // update the sprite hover mouseover
    guiControlsUpdate(); // update gui control changes
    rotationUpdate();
    keyboardControls(); // update keyboard controls
    controls.update(); // updates the mouse move controls.
    stats.update(); // update stats.
		//testObj.rotation.y += 0.005;
}

/* renders the scene */
function render() {

	//add physical lighting
	addPhysicalLighting();

	/* mirror camera */
	stand.visible = false;
	mirrorStandCamera.updateCubeMap( renderer, scene );
	stand.visible = true;
	/* mirror camera */

    renderer.render(scene, camera);

}

// CHANGE TEXTURE ON CLICK!!
$('.guiItem').click(function(){

	var x = $(this).attr('name');

	//var textureDiffuse = new THREE.TextureLoader().load(x);
  //  alert(x);
	//sphere.material.color.setHex( 0x00ff00 );
	//testObjectModel.material = materialMatCap; // change material to the matcap
	//material.uniforms.tMatCap.value = THREE.ImageUtils.loadTexture( 'textures/matCap/Gold.png' ); // change the texture image to whatever
  var textureDiffuse = new THREE.TextureLoader().load(x, function(x){
     material01.map = x;

   });

  //material01.map = textureDiffuse;

	textureDiffuse.wrapS = THREE.RepeatWrapping;
	textureDiffuse.wrapT = THREE.RepeatWrapping;
	textureDiffuse.repeat.set(5,5);

	//alert(x);
});
