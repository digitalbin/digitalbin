import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import type CameraControls from './CameraControls';

interface Config {
    scene: THREE.Scene;
    camera: THREE.Camera;
}

interface INavigate {
    target: THREE.Object3D;
}

class Router {
    cameraControls: CameraControls;

    constructor(cameraControls: CameraControls) {
        this.cameraControls = cameraControls;

        this.onPathChange = this.onPathChange.bind(this);
        window.onpopstate = this.onPathChange;
    }

    navigate(path: string, data: INavigate) {
        window.history.pushState({}, '', path);
        data.target.position.setZ(-10);
        // this.cameraControls.navigateTo(data.target);
    }

    onPathChange(e) {
        console.log(e);
    }
}

export default Router;