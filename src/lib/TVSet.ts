import { Group, Object3D, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { getSize } from '../utils';

const relavantModels = ['VCR', 'BACK', 'EJECT', 'CRT'];

export default class TVSet extends Group {
    public backButton: Group;
    public vcr: Object3D;

    constructor(gltf: GLTF) {
        const { scene } = gltf;
        super();

        const [VCR, BACK, EJECT, CRT] = relavantModels.map(key => scene.getObjectByName(key) as Object3D);

        this.backButton = new Group();
        this.backButton.add(BACK, EJECT);

        this.add(CRT, VCR, this.backButton);

        const vcrSize = getSize(VCR);

        this.rotateY(-Math.PI / 2);
        this.position.setY(vcrSize.y / 2).setX(vcrSize.x * 2);
        
        this.vcr = VCR;
        this.vcr.userData.position = new Vector3();
        this.vcr.getWorldPosition(this.vcr.userData.position);
    }
}
