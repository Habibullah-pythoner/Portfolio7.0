import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();

var cameraPosition = new THREE.Vector3(-9.2, 2.5, 6.6);

document.addEventListener('mousemove', (event)=> {
    var x = event.clientX
    var y = event.clientY

    group.rotation.y = (x - (innerWidth / 2)) * 0.0001;
    group.rotation.z = (y - (innerHeight / 2)) * 0.0001;
})

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
        // tilt([event.beta, event.gamma]);
        console.log("Device Orientation Event - Beta: " + event.beta + " - Gamma: " + event.gamma);
    }, true);
} else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function (event) {
        // tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
        console.log("Device Motion Event - X: " + (event.acceleration.x * 2) + " - Y: " + (event.acceleration.y * 2));
    }, true);
} else {
    window.addEventListener("MozOrientation", function (orientation) {
        // tilt([orientation.x * 50, orientation.y * 50]);
        console.log("MozOrientation Event - X: " + (orientation.x * 50) + " - Y: " + (orientation.y * 50));
    }, true);
}

const group = new THREE.Group();
const scene = new THREE.Scene();

group.position.set(0,0,0);
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.lookAt(new THREE.Vector3(62.9, 18.7, -60.7));

scene.add(group); // Assuming 'scene' is your Three.js scene.

group.add(camera);

const renderer = new THREE.WebGLRenderer({alpha: true});
// const controls = new OrbitControls( camera, renderer.domElement );
renderer.toneMapping = THREE.ReinhardToneMapping;

document.getElementById('canvas').appendChild( renderer.domElement );


console.log("Group Rotation X: " + group.rotation.x);
console.log("Group Rotation Y: " + group.rotation.y);
console.log("Group Rotation Z: " + group.rotation.z);
function cameraSetup() {
    target.x = ( 1 - mouse.x ) * 0.0002;
    target.y = ( 1 - mouse.y ) * 0.0002;
    
    camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
    camera.rotation.y += 0.05 * ( target.x - camera.rotation.y );

    if (innerWidth <= 600) {
        camera.position.set(-11.1, 4.6, 11.2)
        camera.lookAt(new THREE.Vector3(56.2, 1.3, -64.7))
    } else {
        camera.position.set(-9.2, 2.5, 6.6)
        camera.lookAt(new THREE.Vector3(62.9, 18.7, -60.7))
    }
}

cameraSetup()

const alight = new THREE.AmbientLight( 0x000000 , 0.1); // soft white light
// scene.add(alight);

const light = new THREE.PointLight(0x666666, 70, 100, 1.7); // soft white light
light.position.set(-20, 15.6, 12.4)
scene.add( light );

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
scene.add( pointLightHelper );

const loader = new GLTFLoader();
const loader2 = new GLTFLoader();

// Get the camera's current rotation (in radians)
const cameraRotation = {
  x: camera.rotation.x,
  y: camera.rotation.y,
  z: camera.rotation.z,
};

let cameraDirection = new THREE.Vector3()
let camPositionSpan, camLookAtSpan

document.addEventListener('keydown', (event) => {
    camera.getWorldDirection(cameraDirection)
    // scale the unit vector up to get a more intuitive value
    cameraDirection.set(cameraDirection.x * 100, cameraDirection.y * 100, cameraDirection.z * 100)
    // update the onscreen spans with the camera's position and lookAt vectors
    console.log(`Position: (${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)})`)
    console.log(`LookAt: (${(camera.position.x + cameraDirection.x).toFixed(1)}, ${(camera.position.y + cameraDirection.y).toFixed(1)}, ${(camera.position.z + cameraDirection.z).toFixed(1)})`)


  });
const newMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // RGB color value
    // You can also set other material properties like emissive, normal map, etc.
  });

// Load a glTF resource
loader.load(
	// resource URL
	address_to_model,
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

        gltf.scene.traverse( child => {

            if ( child.material ) {
                child.material.metalness = 0.5;
                // child.material = newMaterial;
            }
        } );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

loader2.load(
	// resource URL
	address_to_model2,
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );
        gltf.scene.traverse( child => {

            if ( child.material ) {
                child.material.metalness = 0;
                child.material = newMaterial;
            }
        } );
        const model = gltf.scene;

        const boundingBox = new THREE.Box3().setFromObject(model);

        // Calculate the model's width
        const modelWidth = boundingBox.max.x - boundingBox.min.x;

        // Set the new position for the model, moving it to the right by half of its width
        // model.position.x = modelWidth * 1.3;


        const numRows = 5;
        const numCols = 9;
        const spacingX = modelWidth * 1.5; // Adjust the spacing as needed
        const spacingY = modelWidth * 1.5; // Adjust the vertical spacing as needed
        const spacingZ = modelWidth * 1.5; // Adjust the spacing in the Z direction as needed
        const startX = -((numCols - 1) * spacingX) / 2;
        const startZ = -((numRows - 1) * spacingZ) / 2;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
            const clone = model.clone();
            const xPosition = startX + col * spacingX;
            const yPosition = 0;
            const zPosition = startZ + row * spacingZ;
            clone.position.set(xPosition, yPosition, zPosition);
            scene.add(clone);
            }
        }


        

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

function animate() {
    var scrollTop = document.querySelector('#main-window').scrollTop;

	requestAnimationFrame( animate );
    // controls.update(0.1);
    renderer.setPixelRatio(1);
    renderer.setSize( window.innerWidth, window.innerHeight );
    // controls.update();
	renderer.render( scene, camera );

    var toScrollLeft = Math.max(document.querySelector('#main-window').scrollTop - document.querySelector('#services #dummy').offsetTop + innerHeight, 0)
    serviceSlider.scrollLeft = toScrollLeft

    var shift_top = Math.max((((innerHeight - (scrollTop + 200)) * 20) / innerHeight), 0)
    document.querySelector('#canvas canvas').style.transform = "translateY(-"+ shift_top +"vh)"
}
animate();


