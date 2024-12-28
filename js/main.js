import * as THREE from 'three';
import { OrbitControls } from './addons/controls/OrbitControls.js'; // Ensure OrbitControls.js is in the correct path

const textElement = document.getElementById('animated-text');
textElement.classList.remove("hidden"); // Removes the class 'my-class'
const replayButton = document.getElementById('cb-replay');

const text = textElement.textContent;
textElement.textContent = '';

let index = 0;

function typeEffect() {
    if (index < text.length) {
        textElement.textContent += text[index];
        index++;
        setTimeout(typeEffect, 100);
    }
}

replayButton.addEventListener('click', () => {
    index = 0;
    textElement.textContent = '';
    typeEffect();
});

// Start typing effect
typeEffect();

// Three.js Globe Setup
let scene, camera, renderer, globe, controls;

function initGlobe() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / 400, 0.01, 10);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure sharp rendering on high-DPI screens
    renderer.setSize(window.innerWidth, 400);
    document.getElementById('globe').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 20, 20); // Increase segments for higher quality
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add OrbitControls for mouse manipulation
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth damping for better UX
    controls.dampingFactor = 0.005;

    animate();
}

function animate() {
    globe.rotation.y += 0.002;
    globe.rotation.x += 0.002;
    globe.rotation.z += 0.002;
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Initialize Globe
initGlobe();

// Resize event
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 400;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 400);
});
