import _CameraControls from 'camera-controls';
import * as THREE from 'three';

_CameraControls.install({ THREE });
export default class CameraControls extends _CameraControls {
    constructor(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
        super(camera, renderer.domElement);
        this.setPosition(0, 10, 10);
        this.setTarget(0, 0, 0);
        this.updateCameraUp();

        this.dampingFactor = 0.07;
        // this.enabled = false;
    }
    async navigateTo(target: THREE.Object3D) {
        this.setPosition(0, 10, 10, true);

        await this.setTarget(0, 0, 0, true);

        await this.setTarget(
            target.position.x,
            target.position.y,
            target.position.z,
            true,
        );

        this.fitToBox(target, true, {
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 1,
            paddingRight: 1,
        });
    }
}
