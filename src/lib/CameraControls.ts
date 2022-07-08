import _CameraControls from 'camera-controls';
import * as THREE from 'three';

_CameraControls.install({ THREE });

const degreeOffsetMap: { [key: string]: number } = {
    screen: THREE.MathUtils.degToRad(45),
    // screen: THREE.MathUtils.degToRad(90),
};

// interface I3DObj extends THREE.Object3D {
//     userData: {
//         type: string;
//         animation: any;
//     };
// }

export default class CameraControls extends _CameraControls {
    constructor(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
        super(camera, renderer.domElement);
        this.setPosition(0, 10, 10);
        this.setTarget(0, 0, 0);
        this.updateCameraUp();
        this.dampingFactor = 0.1;
        // this.enabled = false;
    }
    async navigateTo(target: THREE.Object3D) {
        const { type = '' } = target.userData;
        const degreeOffset = degreeOffsetMap[type] || 0;

        await this.setTarget(
            target.position.x,
            target.position.y,
            target.position.z,
            true,
        );
        
        await Promise.all([
            this.fitToBox(target, true),
            this.rotateAzimuthTo(this.azimuthAngle + degreeOffset, true)
            // this.rotateTo(
            //     target.rotation.y + degreeOffset,
            //     THREE.MathUtils.degToRad(90),
            //     true,
            // ),
        ]);
    }
}
