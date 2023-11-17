import * as THREE from 'three';

// Scene setup
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Move camera backwrds, away from scene origin

// Renderer setup
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 200, window.innerHeight - 200);
document.querySelector('.canvas-wrapper').appendChild(renderer.domElement);

// Setup light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 0, 10);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

