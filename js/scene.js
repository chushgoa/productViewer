var camera, controls, scene, renderer, light, stats;
var ground, groundPos;
var sphere, spherePos;
var rendererStats;
var keyboard;
var guiControls;

var rotationSpeed = 0.05;
var moveSpeed = 0.01;

var projector, mouse = { x: 0, y: 0 }, INTERSECTED; // for mouse over functions

// materials
var testMaterial;


init();
animate();

function init() {
    
    
    // info ----------------------------------------------------------
    /*
    info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#AAAAAA';
    info.style.fontWeight = 'bold';
    info.style.backgroundColor = 'transparent';
    info.style.zIndex = '2';
    info.style.fontFamily = 'Monospace';
    info.innerHTML = 'Product Viewer Alpha 1.1';
    document.body.appendChild(info);
    */
    
    //GUI ----------------------------------------------------------
    /*
    gui = document.createElement('div');
    gui.style.position = 'absolute';
    gui.style.bottom = '0';
    gui.style.width = '200px';
    gui.style.height = '15px';
    gui.style.color = '#FFFFFF';
    gui.style.fontWeight = 'bold';
    gui.style.background = 'rgba(255, 0, 0, .75)';
    gui.style.zIndex = '3';
    gui.fontFamily = 'Monospace';
    gui.innerHTML = 'testGUI';
    document.body.appendChild(gui);
    */
    
    // RENDERER ----------------------------------------------------------
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // SCENE ----------------------------------------------------------
    scene = new THREE.Scene();
    
    // CAMERA ----------------------------------------------------------
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,10000);
    camera.position.z = 5;
    camera.position.y = 0;
    
    // CONTROLS ----------------------------------------------------------
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.damping = 0.2;
    //controls.addEventListener('change', render);
    
    // STATS ----------------------------------------------------------
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    //document.body.appendChild( stats.domElement );

    // LIGHTS ----------------------------------------------------------
    light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2.5,3,1);
    scene.add(light);
    
    lightAmbient = new THREE.AmbientLight(0x404040);
    scene.add(lightAmbient);

    // KEYBOARD ----------------------------------------------------------
    keyboard = new THREEx.KeyboardState();
    
    // OBJECTS ----------------------------------------------------------

    /* ground plane */
    var groundGeometry = new THREE.PlaneGeometry(30,10,1,1);
    var groundMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,side: THREE.DoubleSide});
    ground = new THREE.Mesh(groundGeometry,groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);
    
    /* back wall */
    var backWallGeometry = new THREE.PlaneGeometry(30,10,1,1);
    var backWallMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff, 
        specular: 0xffffff,
		shininess: 500,
		reflectivity: 0,
        side: THREE.DoubleSide
    });
    backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.y = 4;
    backWall.position.z = -1;
    scene.add(backWall);
    
    /* testMesh */
    var sphereGeometry = new THREE.SphereGeometry(1,16,16);
    var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,side: THREE.DoubleSide});
    sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    scene.add(sphere);
    scene.updateMatrixWorld(true);
    spherePos = new THREE.Vector3();
    
    /* sprite */
    var spriteMap = THREE.ImageUtils.loadTexture("images/plus.png");
    var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff, fog: true});
    var spriteObj = new THREE.Sprite(spriteMaterial);
    spriteObj.name = "sprite";
    spriteObj.position.set(0,1.5,0);
    spriteObj.scale.set(0.5,0.5,0.5)
    scene.add(spriteObj);
    
    // HELPERS ----------------------------------------------------------
    
    // grid
    var size = 10;
    var step = 1;

    var gridHelper = new THREE.GridHelper( size, step );
    gridHelper.setColors(0xff0000, 0xCCCCCC);
    //scene.add( gridHelper );
    
    // wireframe
    wireframe = new THREE.WireframeHelper( sphere, 0x00ff00 );
    scene.add(wireframe);
    
    // axis
    var axis = new THREE.AxisHelper(5); //  will be on top
    //scene.add(axis);
    
    // camera helper
    cameraHelp = new THREE.CameraHelper(camera);
    //scene.add(cameraHelp);
    
    // point light helper
    var pointLightHelpherShereSize = 0.5;
    var pointLightHelperSphere = new THREE.PointLightHelper(light, pointLightHelpherShereSize);
    scene.add(pointLightHelperSphere);
    
    /* HELPERS FINISHED*/
    
    // GUI ----------------------------------------------------------
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
        this.lightStrength = 1;
        
        /* COLORS */
        this.color0 = "#ffae23"; // CSS string
    }
    
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
        el_rotateClockwise.addEventListener('click', guiRotateClockwise, false);

        var el_rotateCounterClockwise = document.getElementById("rotateCounterClockwiseBtn");
        el_rotateCounterClockwise.addEventListener('click', guiRotateCounterClockwise, false);
        
    }
    
    // initialize object to perform world/screen calculations
	projector = new THREE.Projector();
    
    // when the mouse moves, call the given function
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    
    // render on windown resize ----------------------------------------------------------
    window.addEventListener('resize', onWindowResize, false);
    // -----------------------------------------------------------------------------------
sphere.material = groundMaterial;
}

function guiRotateClockwise() {
    //sphere.rotation.y -= 10;
    //alert("test");
    sphere.material = groundMaterial;
    console.log("change material -" + groundMaterial.name );
    //sphere.material = new THREE.MeshPhongMaterial({color: 0x00FF00,side: THREE.DoubleSide});
}
function guiRotateCounterClockwise() {
    //sphere.rotation.y += 10;
    camera.position.y -= 2;
}

function onDocumentMouseMove( event ) 
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

/* update render on window resize */
function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    render();
   
}

/* animates the scene */
function animate() {
    
    requestAnimationFrame(animate); // sets the 60fps
    
    // --------------------------------------------------------------
    // test animation
    //sphere.rotation.y += 0.011; // set rotation speed (temp disabled)
    // --------------------------------------------------------------
    
    render();
    update();
   
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

/* update functions */
function update(){
    
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
		//     by setting current intersection object to "nothing"
		INTERSECTED = null;
	}
    
    guiControlsUpdate(); // update gui control changes
    keyboardControls(); // update keyboard controls
    controls.update(); // updates the mouse move controls.
    stats.update(); // update stats.
}

/* renders the scene */
function render() {
    renderer.render(scene, camera);
}


