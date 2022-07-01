import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default function createRenderer() {
    const canvas = document.querySelector('#three') || undefined;
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const element = document.getElementById('app') || undefined;
    const cssRenderer = new CSS3DRenderer({ element });
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0px';
    document.body.appendChild(cssRenderer.domElement);

    return {
        renderer,
        cssRenderer
    };
}
