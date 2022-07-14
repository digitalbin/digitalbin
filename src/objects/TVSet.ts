import gsap from 'gsap';
import { Group, Object3D, Vector3, Mesh } from 'three';
import { GLTFItem } from '@/objects';
import { router } from '@/lib';

export default class TVSet extends GLTFItem {
    public backButton: Group;
    public vcr: Object3D;

    constructor() {
        super(['VCR', 'BACK', 'EJECT', 'CRT']);

        this.backButton = this.getObjectByName('BACK') as Group;
        this.backButton.add(this.getObjectByName('EJECT') as Mesh);
        this.backButton.addEventListener('click', () => router.goTo('/'));
        this.backButton.userData.onHover = gsap.to(this.backButton.position, {
            z: -this.backButton.userData.size.z / 2,
            paused: true,
            duration: 0.2,
        });

        this.backButton.addEventListener('mouseover', this.onHover);
        this.backButton.addEventListener('mouseout', this.onHover);

        this.vcr = this.getObjectByName('VCR') as Group;

        this.rotateY(-Math.PI / 2);
        this.position
            .setY(this.vcr.userData.size.y / 2)
            .setX(this.vcr.userData.size.x * 2);

        this.vcr.userData.position = new Vector3();
        this.vcr.getWorldPosition(this.vcr.userData.position);
    }

    onHover = (e: any) => {
        e.stopPropagation();
        if (e.type === 'mouseover') this.backButton.userData.onHover.play();
        else this.backButton.userData.onHover.reverse();
    };
}
