import { Group, Scene, Vector3 } from 'three';
import gsap from 'gsap';
import VHSTape from '@/objects/VHSTape';
import type { TVSet } from '@/objects';

export default class VHSTapes extends Group {
    constructor(scene: Scene, tvSet: TVSet) {
        super();
        
        const viaPos = new Vector3().setY(tvSet.vcr.userData.position.y);
        const endPos = tvSet.vcr.userData.position.clone();
        const infoNodes = Array.from(document.querySelectorAll('#app article')).reverse() as HTMLElement[];
        infoNodes.forEach((node: HTMLElement, index) => {
            const vhsTape = new VHSTape(node, index);
            this.attach(vhsTape);

            const selectionAnimation = gsap
                .timeline({
                    paused: true,
                    defaults: {
                        ease: 'sine.inOut',
                        duration: 1,
                    },
                    onStart: () => {
                        scene.attach(vhsTape);
                        vhsTape.userData.active = true;
                    },
                    onReverseComplete: () => {
                        this.attach(vhsTape);
                        vhsTape.userData.active = false;
                    },
                })
                .to(vhsTape.position, { ...viaPos })
                .to(vhsTape.rotation, {
                    y: vhsTape.rotationOffset > 0 ? Math.PI : 0,
                })
                .to(vhsTape.position, endPos, '<');

            vhsTape.userData.animation = selectionAnimation;
            vhsTape.userData.viewTarget = tvSet;
        });

        this.position.setY(this.children[0].userData.size.y / 2);
        this.position.setZ(-10);
        this.name = 'index';
    }
}
