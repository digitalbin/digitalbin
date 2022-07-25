import _CameraControls from 'camera-controls';
import * as THREE from 'three';

_CameraControls.install({ THREE });
export default class CameraControls extends _CameraControls {
    animate = true;

    constructor(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
        super(camera, renderer.domElement);
        this.setTarget(0, 0, 0);
        this.updateCameraUp();

        this.dampingFactor = 0.07;
        this.restThreshold = 0.5;
    }

    async navigateTo(target: THREE.Object3D) {
        this.removeControlBoundaries();
        this.enabled = false;

        this.setPosition(-100, 100, 100, this.animate);
        await this.setTarget(
            target.position.x,
            target.position.y,
            target.position.z,
            this.animate,
        );
        await this.fitToBox(target, this.animate);
        
        this.setControlBoundaries();
        this.enabled = true;
    }

    removeControlBoundaries() {
        this.minAzimuthAngle = -Infinity;
        this.maxAzimuthAngle = Infinity;

        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;

        this.minDistance = 0;
        this.maxDistance = Infinity;
    }

    setControlBoundaries() {
        const span = Math.PI / 4;

        this.minAzimuthAngle = this.azimuthAngle - span;
        this.maxAzimuthAngle = this.azimuthAngle + span;

        this.minPolarAngle = 0 + span;
        this.maxPolarAngle = Math.PI - span;

        this.minDistance = this.distance;
        this.maxDistance = this.distance;
    }
}
