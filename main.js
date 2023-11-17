// First three.js example – CG Lecture at Worms Univerity of Applied Sciences
// Developed by Alexander Wiebel, Hochschule Worms, 2023.
// Inspired by https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Licensed under CC-BY 4.0 https://creativecommons.org/licenses/by/4.0/

import * as THREE from 'three';
import { GLTFLoader } from 'gltf';
import { PLYLoader } from 'ply';

// Flags
let geomteryHasBeenDescribed = false;

const vertexShader = await fetch('vert.glsl').then(r => r.text());
const fragmentShader = await fetch('frag.glsl').then(r => r.text());

console.log(vertexShader, fragmentShader);

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Move camera backwrds, away from scene origin

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 200, window.innerHeight - 200);
document.body.appendChild(renderer.domElement);

// Setuo light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 0, 10);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);


// Exmample 1: Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const shaderMaterial = new THREE.ShaderMaterial({
	uniforms:{
		colorA: {
			type: "vec3",
			value: new THREE.Color(0x0000FF)
		}
	},
	vertexShader,
	fragmentShader,
})
const exampleMaterial = new THREE.MeshStandardMaterial({ color: '#00ee00' });
const cube = new THREE.Mesh(geometry, shaderMaterial);
scene.add(cube);
cube.position.y += 2; // move cube upwards a bit

// Example 2: Load 3D model mesh from PLY file
// The loading happens asynchronoulsy
let logoPLY = 0;
const loader = new PLYLoader();
loader.load('models/monkey.ply',
	function (geometry) {
		logoPLY = new THREE.Mesh(geometry)
		scene.add(logoPLY);
		logoPLY.material = shaderMaterial;
		logoPLY.position.y -= 2;
		logoPLY.position.x -= 2;
		logoPLY.scale.x *= .5;
		logoPLY.scale.y *= .5;
		logoPLY.scale.z *= .5;
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded of PLY');
	}, function (error) {
		console.error(error);
		console.log("ERROR LOADING PLY");
	});


// Example 3: Load 3D model mesh from GLB (binary GLTF) file
// The loading happens asynchronoulsy
let logoGLB = 0;
const loaderGLTF = new GLTFLoader();
loaderGLTF.load('models/logo.glb',
	function (gltf) {
		logoGLB = gltf.scene;
		scene.add(gltf.scene);
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded of GLB');
	},
	function (error) {
		console.error(error);
		console.log("ERROR LOADING GLB");
	});

// Helper function for some simple rotation
function presentationRotation(group) {
	group.rotation.x += 0.01;
	group.rotation.y += 0.01;
}

// Debugging function
function describeGeometryOnConsoleOnce() {
	// Look into loaded geometry
	console.log("logoPLY")
	console.log(logoPLY)
	console.log("logoGLB")
	console.log(logoGLB)
	geomteryHasBeenDescribed = true
}

// A function that allows the scene to be rendered repeatedly
function animate() {
	requestAnimationFrame(animate);

	// Check that everything has been loaded
	if (logoGLB && logoPLY && cube) {
		// Debug output
		// if (!geomteryHasBeenDescribed)
		//  	describeGeometryOnConsoleOnce()

		presentationRotation(cube)
		presentationRotation(logoPLY);
		presentationRotation(logoGLB);
	}

	renderer.render(scene, camera);
}


// renderer.render(scene, camera);
// logoPLY.mesh.setRotationFromEuler(.5,.5,.5);
// setTimeout(logoPLY.updateMatrix(), 3000);
// renderer.render(scene, camera);

// Start repeated rendering (animation)
console.log("Start animation")
animate();
