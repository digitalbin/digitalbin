import gsap from 'gsap';
import { Group, Object3D, Vector3, Mesh } from 'three';
import { GLTFItem } from '@/objects';
import { router } from '@/lib';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export default class TVSet extends GLTFItem {
    public backButton: Group;
    public vcr: Object3D;
    public crt: Object3D;
    public declare css3dObject: CSS3DObject;

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
    }

    createHTML = () => {
        const crtWrapper = document.createElement('div');
        crtWrapper.style.width = '500px';
        crtWrapper.style.height = '500px';
        crtWrapper.classList.add('crt-tv');

        const screen = document.createElement('div');
        screen.classList.add('screen');
        screen.classList.add('static');
        crtWrapper.appendChild(screen);

        document.querySelector('#app')?.appendChild(crtWrapper);

        const elmSize = crtWrapper.getBoundingClientRect();
        const crtSize = this.crt.userData.size;
        let scale = crtSize.x / elmSize.width;
        scale = scale - scale * 0.01;

        const object = new CSS3DObject(crtWrapper);
        object.scale.set(scale, scale, scale);

        const size = elmSize.width * scale;

        object.position
            .copy(this.position)
            // .setX(12.4)
            .setX(this.position.x - this.position.x / 16)
            .setY(this.vcr.userData.size.y + size / 2);

        object.rotation.copy(this.rotation);

        this.css3dObject = object;
    };

    onHover = (e: any) => {
        e.stopPropagation();
        if (e.type === 'mouseover') this.backButton.userData.onHover.play();
        else this.backButton.userData.onHover.reverse();
    };
}
