import { Group, Object3D, Vector3 } from 'three';
import { GLTFItem, EjectButton } from '@/objects';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export default class TVSet extends GLTFItem {
    public vcr: Object3D;
    public crt: Object3D;
    public declare css3dObject: CSS3DObject;

    constructor() {
        super(['VCR', 'CRT']);

        const ejectButton = new EjectButton();
        this.add(ejectButton);

        this.crt = this.getObjectByName('CRT') as Group;
        this.vcr = this.getObjectByName('VCR') as Group;

        this.rotateY(-Math.PI / 2);
        this.position
            .setY(this.vcr.userData.size.y / 2)
            .setX(this.vcr.userData.size.x * 2);

        this.vcr.userData.position = new Vector3();
        this.vcr.getWorldPosition(this.vcr.userData.position);

        this.crt.userData.position = new Vector3();
        this.crt.getWorldPosition(this.crt.userData.position);
        this.createHTML();
        this.name = '/tvset'
    }

    createHTML = () => {
        const crtTv = document.querySelector('.crt-tv') as HTMLElement;

        const elmSize = crtTv.getBoundingClientRect();
        const crtSize = this.crt.userData.size;
        let scale = crtSize.x / elmSize.width;
        scale = scale - scale * 0.01;

        const object = new CSS3DObject(crtTv);
        object.scale.set(scale, scale, scale);

        const size = elmSize.width * scale;

        object.position
            .copy(this.position)
            .setX(this.position.x - this.position.x / 16)
            .setY(this.vcr.userData.size.y + size / 2);

        object.rotation.copy(this.rotation);

        this.css3dObject = object;
    };
}
