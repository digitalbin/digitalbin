import gsap from 'gsap';
import slugify from 'slugify';
import { MathUtils } from 'three';
import { GLTFItem, Sticker } from '@/objects';
import World from '@/World';
import { TypeIt } from '@/lib'

export default class VHSTape extends GLTFItem {
    world: World;
    rotationOffset: number;
    hoverAnimation: gsap.core.Tween;

    constructor(element: HTMLElement, index: number) {
        const { name = '', label } = element.dataset;
        super('VHS');

        this.world = new World();
        this.world.interactionManager.add(this);
        
        this.name = slugify(name, { strict: true });
        this.userData = {
            ...this.userData,
            ...element.dataset,
            active: false,
        };

        const screen = document.querySelector('div.screen') as HTMLElement;


        const typeIt = new TypeIt(element);

        this.userData.print = {
            on: () => {
                element.classList.add('active');
                screen.classList.add('active');
                typeIt.start();
            },
            off: () => {
                typeIt.stop();
                screen.classList.remove('active');
                element.classList.remove('active');
            },
        };

        this.position.setY(index * this.userData.size.y);
        this.rotationOffset = MathUtils.randFloat(
            MathUtils.degToRad(-30),
            MathUtils.degToRad(30),
        );
        this.rotateY(this.rotationOffset);

        const sticker = new Sticker(
            { title: name, label },
            this.userData.size,
        );
        this.add(sticker);

        this.hoverAnimation = gsap.to(this.position, {
            z: this.userData.size.z / 4,
            paused: true,
            duration: 0.1,
        });

        this.addEventListener('click', this.onClick);
        this.addEventListener('mouseover', this.onHover);
        this.addEventListener('mouseout', this.onHover);
    }

    onClick = (e: any) => {
        e.stopPropagation();
        this.world.router.goTo(this.name);
    };

    onHover = (e: any) => {
        e.stopPropagation();
        if (this.userData.active) return;
        if (e.type === 'mouseover') this.hoverAnimation.play();
        else this.hoverAnimation.reverse();
    };
}
