import * as THREE from 'three';

export default function createRenderer() {
    const canvas = document.querySelector('#three') || undefined;
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
}
