// First three.js example – CG Lecture at Worms Univerity of Applied Sciences
// Developed by Alexander Wiebel, Hochschule Worms, 2023.
// Inspired by https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Licensed under CC-BY 4.0 https://creativecommons.org/licenses/by/4.0/

import * as THREE from 'three';
import { GLTFLoader } from 'gltf';
import { PLYLoader } from 'ply';
import { scene } from './setup.js';
import { animate } from './utils.js';

// Load shaders
const vertexShader = await fetch('vert.glsl').then(r => r.text());
const fragmentShader = await fetch('frag.glsl').then(r => r.text());

console.log(vertexShader, fragmentShader);

// Create materials
function createStandardMaterialInstance() {
	return new THREE.ShaderMaterial({
		uniforms: {
			colorA: {
				type: "vec3",
				value: new THREE.Color(0x0000FF)
			},
			colorB: {
				type: "vec3",
				value: new THREE.Color(0x000000)
			}
		},
		vertexShader,
		fragmentShader,
	});
}

const cubeMaterial = createStandardMaterialInstance();
const monkeyMaterial = createStandardMaterialInstance();


//attach color input listeners

function applyColorToMaterial(color, material) {
	material.uniforms.colorB = {
		type: "vec3",
		value: new THREE.Color(color)
	};
};

document
	.querySelector('input[name=color1]')
	?.addEventListener('change', ({ currentTarget: { value } }) => applyColorToMaterial(value, cubeMaterial));

document
	.querySelector('input[name=color2]')
	?.addEventListener('change', ({ currentTarget: { value } }) => applyColorToMaterial(value, monkeyMaterial));


// Exmample 1: Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);
cube.position.y += 2; // move cube upwards a bit

// Example 2: Load 3D model mesh from PLY file
// The loading happens asynchronoulsy
let logoPLY = 0;
const loader = new PLYLoader();
loader.load('models/monkey.ply',
	function (geometry) {
		logoPLY = new THREE.Mesh(geometry);
		scene.add(logoPLY);
		logoPLY.material = monkeyMaterial;
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
	}
);


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
	}
);


// Await loading of models
await new Promise(resolve => setTimeout(() => {
	if (cube && logoGLB && logoPLY) resolve();
}, 100));

// renderer.render(scene, camera);
// logoPLY.mesh.setRotationFromEuler(.5,.5,.5);
// setTimeout(logoPLY.updateMatrix(), 3000);
// renderer.render(scene, camera);

// describeGeometryOnConsole({ logoGLB, logoPLY });

// Start repeated rendering (animation)
console.log("Start animation");
animate([logoGLB, logoPLY, cube]);
