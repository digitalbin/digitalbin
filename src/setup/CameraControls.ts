import _CameraControls from 'camera-controls';
import * as THREE from 'three';

_CameraControls.install({ THREE });
export default class CameraControls extends _CameraControls {
    animate = true;

    constructor(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
        super(camera, renderer.domElement);
        this.setPosition(0, 10, 10);
        // this.setPosition(0, 15, 15);
        this.setTarget(0, 0, 0);
        this.updateCameraUp();

        this.dampingFactor = 0.07;
        // this.animate = false;
        // this.enabled = false;
    }
    async navigateTo(target: THREE.Object3D) {
        this.setPosition(0, 10, 10, this.animate);

        await this.setTarget(0, 0, 0, this.animate);

        await this.setTarget(
            target.position.x,
            target.position.y,
            target.position.z,
            this.animate,
        );

        this.fitToBox(target, this.animate, {
            paddingTop: 1,
            paddingBottom: 0,
            paddingLeft: 1,
            paddingRight: 1,
        });
    }
}
