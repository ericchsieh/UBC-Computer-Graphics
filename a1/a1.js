/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  September 2022, Assignment 1 
/////////////////////////////////////////////////////////////////////////////////////////

// http://localhost:8000/a1.html 
// Parts (a)-(h) are woth 3 points together.
// Question a)
console.log('CPSC 314 Assignment 1 by Eric Hsieh');
console.log('updated teapot');

a=5;  
b=2.6;
console.log('a=',a,'b=',b);
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector)
// Question b)
c=a/0;
console.log('Result of a division by zero',c);
// Question c)
  // console.log('Print non-existing variable',d);
  // shows error "d is not defined"
// Question d)
//console.log('Print foo', foo);
var foo = 'varfoo';
console.log('Print foo again', foo);
// Question e)
  // The compiler use the semicolon to identify separate statements.
// Question f)
a = 10;  
b = 3;
function go()
{
  var a = 14; 
  b = 15;
}
go();    
console.log('a=',a,'b=',b);
  // b value changed to 15, while a value remain unchanged.
  // a = 10 is an undelared variable.
  // var a = 14 is a declared variable.
  // a is still 10 because the variable a didn't get called. 
// Question g)
  // Changed to 0xCCFFFF
// Question h)
  // Drag around and play with your mouse.

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
  // set background colour to 0xRRGGBB  where RR,GG,BB are values in [00,ff] in hexadecimal, i.e., [0,255] 
renderer.setClearColor(0xCCFFFF);     
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////	
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////	

light = new THREE.PointLight(0xF1EB9C);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var myMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

///////////////////////////////////////////////////////////////////////////////////////////
//  OBJECTS
///////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////	
// WORLD COORDINATE FRAME
/////////////////////////////////////	

var worldFrame = new THREE.AxesHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////	
// FLOOR with texture
/////////////////////////////////////	

floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light 
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   box --> triangle room
///////////////////////////////////////////////////////////////////////

triangular_geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 3, 1, 1 );
triangular_material = new THREE.MeshBasicMaterial( {color: 0x8833ff, side: THREE.DoubleSide} );
triangular = new THREE.Mesh( triangular_geometry, triangular_material);
triangular.position.set(-5.5, -0.6, 0);
scene.add( triangular );
/* 
boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial );
box.position.set(-4, 0, 0);
scene.add( box );
*/

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html] 
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
mcc.position.set(-4,-0.34,0);
scene.add( mcc );	

/////////////////////////////////////////////////////////////////////////
// twisting stack of three cubes
/////////////////////////////////////////////////////////////////////////
geometry_cube1 = new THREE.BoxGeometry(1.5, 1.5, 1.5, 1, 1, 1)
const material_cube1 = new THREE.MeshStandardMaterial( {color: 0xffff33} );
const cube1 = new THREE.Mesh( geometry_cube1, material_cube1, diffuseMaterial);
cube1.position.set(-4,1.16,0);
cube1.rotation.set(0,0.52,0);
scene.add(cube1);

geometry_cube2 = new THREE.BoxGeometry(1.5, 1.5, 1.5, 1, 1, 1)
const material_cube2 = new THREE.MeshStandardMaterial( {color: 0xff3333} );
const cube2 = new THREE.Mesh( geometry_cube2, material_cube2, diffuseMaterial);
cube2.position.set(-4,2.66,0);
cube2.rotation.set(0,1.05,0);
scene.add(cube2);

geometry_cube3 = new THREE.BoxGeometry(1.5, 1.5, 1.5, 1, 1, 1)
const material_cube3 = new THREE.MeshStandardMaterial( {color: 0x3333ff} );
const cube3 = new THREE.Mesh( geometry_cube3, material_cube3, diffuseMaterial);
cube3.position.set(-4,4.16,0);
cube3.rotation.set(0,1.57,0);
scene.add(cube3);
/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
cylinder.position.set(2, 0, 0);
scene.add( cylinder );

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
scene.add( torus );

/////////////////////////////////////////////////////////////////////////
// 2nd torus
/////////////////////////////////////////////////////////////////////////
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(7, 0, 0);   // translation
torus.rotation.set(1.5708,0,0);     // rotation about x,y,z axes
scene.add( torus );

/////////////////////////////////////
//  CUSTOM OBJECT 
////////////////////////////////////

var geom = new THREE.Geometry(); 
var v0 = new THREE.Vector3(0,0,0);
var v1 = new THREE.Vector3(3,0,0);
var v2 = new THREE.Vector3(0,3,0);
var v3 = new THREE.Vector3(3,3,0);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial );
customObject.position.set(0, 0, -2);
scene.add(customObject);

/////////////////////////////////////////////////////////////////////////////////////
//  create my material
/////////////////////////////////////////////////////////////////////////////////////

var myMaterial = new THREE.ShaderMaterial( {
//	uniforms: uniforms,
        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'myVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'myFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

/////////////////////////////////////////////////////////////////////////////////////
//  Object loaded from OBJ file, rendered using myMaterial
/////////////////////////////////////////////////////////////////////////////////////

var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
	console.log( item, loaded, total );
};

var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};
var onError = function ( xhr ) {
};
var loader = new THREE.OBJLoader( manager );
loader.load( 'obj/teapot.obj', function ( object ) {
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.material = myMaterial;
		}
	} );
	scene.add( object );
}, onProgress, onError );

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if ((keyboard.pressed("W")) && (light.position.y <= 5.0)) {
    console.log('W pressed');
    light.position.y += 0.1;
  } else if ((keyboard.pressed("S")) && (light.position.y >= -5.0))
    light.position.y -= 0.1;
  if ((keyboard.pressed("A")) && (light.position.x >= -5.0))
    light.position.x -= 0.1;
  else if ((keyboard.pressed("D")) && (light.position.x <= 5.0))
    light.position.x += 0.1;
  sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
  renderer.render(scene, camera);
}

update();

