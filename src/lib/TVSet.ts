import { Group, Object3D, Vector3, Mesh } from 'three';
import GLTFItem from './GLTFItem';
export default class TVSet extends GLTFItem {
    public backButton: Group;
    public vcr: Object3D;

    constructor() {
        super(['VCR', 'BACK', 'EJECT', 'CRT']);

        this.backButton = this.getObjectByName('BACK') as Group;
        this.backButton.add(this.getObjectByName('EJECT') as Mesh);

        this.vcr = this.getObjectByName('VCR') as Group;

        this.rotateY(-Math.PI / 2);
        this.position.setY(this.vcr.userData.size.y / 2).setX(this.vcr.userData.size.x * 2);
        
        this.vcr.userData.position = new Vector3();
        this.vcr.getWorldPosition(this.vcr.userData.position);
    }
}
