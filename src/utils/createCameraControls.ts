import _CameraControls from 'camera-controls';
import * as THREE from 'three';

_CameraControls.install({ THREE });

const degreeOffsetMap: { [key: string]: number } = {
    screen: THREE.MathUtils.degToRad(120),
    // screen: THREE.MathUtils.degToRad(90),
};

interface I3DObj extends THREE.Object3D {
    userData: {
        type: string;
        animation: any;
    };
}

class CameraControls extends _CameraControls {
    constructor(camera: THREE.PerspectiveCamera, renderer: HTMLElement) {
        super(camera, renderer);
    }
    public async navigateTo(target: I3DObj) {
        console.log(target);
        
        const { type = '', animation } = target.userData;
        const degreeOffset = degreeOffsetMap[type] || 0;

        await this.setTarget(
            target.position.x,
            target.position.y,
            target.position.z,
            true,
        );
        await Promise.all([
            this.fitToBox(target, true),
            this.rotateTo(
                target.rotation.y + degreeOffset,
                THREE.MathUtils.degToRad(90),
                true,
            ),
        ]);
        animation.start();
    }
}

export default function createCameraControls(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.Renderer,
): CameraControls {
    const cameraControls = new CameraControls(camera, renderer.domElement);
    cameraControls.setPosition(0, 0, 10);
    cameraControls.updateCameraUp();
    cameraControls.dampingFactor = .1;
    // cameraControls.enabled = false;

    return cameraControls;
}
