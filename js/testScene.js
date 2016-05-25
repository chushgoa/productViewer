var container;
var camera, scene, controls, renderer;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var sphere;

var manager;

// set up Loading manager
manager = new THREE.LoadingManager();
manager.onProgress = function(item, loaded, total) {
  console.log(item, loaded, total);
}
manager.onLoad = function (){
  console.log("all loaded");
  testObj = scene.getObjectByName('myGroup');
  console.log(testObj.name);
  testObj.position.set(1,1,1);
  animate();
}

init();


function init(){

  container = document.createElement( 'div' );
	document.body.appendChild( container );

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xCCCCCC, 1);
  container.appendChild( renderer.domElement );

  // camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 20000);
  camera.position.set(2,1,2);

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // light
  var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add( ambient );

  // light
  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
	scene.add( directionalLight );

  // on window resize
  window.addEventListener( 'resize', onWindowResize, false );


  // MATERIALS
  var testMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF,side: THREE.DoubleSide});

  /* testMesh */
  var sphereGeometry = new THREE.SphereGeometry(2,64,64);

  sphere = new THREE.Mesh(sphereGeometry, testMaterial); // made it global so can control it.
  sphere.position.set(0,0,0);
  //scene.add(sphere);

  var dir = new THREE.Vector3( 1, 0, 0 );
  var origin = new THREE.Vector3( 0, 0, 0 );
  var length = 1;
  var hex = 0x000000;

  var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex, 0.05,0.05 );
  scene.add( arrowHelper );

  addLoaders();
}

function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

function animate(){
  requestAnimationFrame(animate);

  render();
  update();
}

function update(){
  testObj.rotation.y += 0.005;
}

function render(){
  sphere.position.y += 0.005;
  renderer.render(scene, camera);
}

function addLoaders(){
  /* LOADER */
  var material;
  var modelPath = "models/st3Grit.obj";
  var loader = new THREE.OBJLoader(manager);
  loader.load(modelPath, function (object) {

    //if you want to add your custom material
    var materialObj = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 0.1, reflectivity: 0.1, side: THREE.DoubleSide});
    object.traverse(function (child) {

      if (child instanceof THREE.Mesh) {

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
    //object.children[2].material = new THREE.MeshPhongMaterial({color: 0x7fa22b, specular: 0xcccccc, shininess: 10, reflectivity: 10, side: THREE.DoubleSide});

    // frameRim
    //object.children[3].material = new THREE.MeshPhongMaterial({color: 0x7fa22b, specular: 0xcccccc, shininess: 10, reflectivity: 10, side: THREE.DoubleSide});

    // frameLegs
    //object.children[4].material = new THREE.MeshPhongMaterial({color: 0x7fa22b, specular: 0xcccccc, shininess: 10, reflectivity: 10, side: THREE.DoubleSide});

    // footPads
    //object.children[5].material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xcccccc, shininess: 0.1, reflectivity: 0.1, side: THREE.DoubleSide});

    scene.add(object);
  });
}
