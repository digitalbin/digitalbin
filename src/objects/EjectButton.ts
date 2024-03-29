import gsap from 'gsap';
import { GLTFItem } from '@/objects';
import World from '@/World';

export default class EjectButton extends GLTFItem {
    constructor() {
        super(['BACK', 'EJECT']);
        const size = this.getObjectByName('BACK')?.userData.size;
        const hoverAnimation = gsap.to(this.position, {
            z: -size.z / 2,
            paused: true,
            duration: 0.1,
        });

        function onHover(e: any) {
            e.stopPropagation();
            if (e.type === 'mouseover') hoverAnimation.play();
            else hoverAnimation.reverse();
        }

        const world = new World();
        this.addEventListener('click', () => world.router.goTo());
        this.addEventListener('mouseover', onHover);
        this.addEventListener('mouseout', onHover);

        world.interactionManager.add(this);
    }
}
