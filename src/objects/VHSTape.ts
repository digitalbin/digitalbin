import gsap from 'gsap';
import { MathUtils } from 'three';
import { GLTFItem, Sticker } from '@/objects';
import { router } from '@/lib';

interface PageItem {
    name: string;
    slug: string;
}

export default class VHSTape extends GLTFItem {
    static #index = -1;
    rotationOffset: number;
    hoverAnimation: gsap.core.Tween;

    constructor({ name, slug }: PageItem) {
        super('VHS');
        VHSTape.#index++;

        this.name = slug;
        this.userData = {
            ...this.userData,
            active: false,
        }

        this.position.setY(VHSTape.#index * this.userData.size.y);
        this.rotationOffset = MathUtils.randFloat(
            MathUtils.degToRad(-30),
            MathUtils.degToRad(30),
        );
        this.rotateY(this.rotationOffset);

        const sticker = new Sticker(name, this.userData.size);
        this.add(sticker);

        this.hoverAnimation = gsap.to(this.position, {
            z: this.userData.size.z / 4,
            paused: true,
            duration: 0.2,
        });
        
        this.addEventListener('click', this.onClick);
        this.addEventListener('mouseover', this.onHover);
        this.addEventListener('mouseout', this.onHover);
    }

    onClick = (e: any) => {
        e.stopPropagation();
        router.goTo(this.name);
    }

    onHover = (e: any) => {
        e.stopPropagation();
        if (this.userData.active) return;
        if (e.type === 'mouseover') this.hoverAnimation.play();
        else this.hoverAnimation.reverse();
    }
}
