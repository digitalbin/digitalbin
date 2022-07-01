import * as THREE from 'three';
import { size } from './constants';

export default function createScene() {
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    );
    console.log(size);
    
    // camera.position.z = size/4;
    camera.position.z = 150;
    // camera.position.y = 40;
    return camera;
}
