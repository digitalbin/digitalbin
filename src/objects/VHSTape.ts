import gsap from 'gsap';
import slugify from 'slugify';
import { MathUtils } from 'three';
import { GLTFItem, Sticker } from '@/objects';
import { router } from '@/lib';
import TypeIt from 'typeit';

interface PageItem {
    name: string;
    slug: string;
    page: [];
    pageType: string;
    url: string;
}

export default class VHSTape extends GLTFItem {
    static #index = -1;
    declare rotationOffset: number;
    declare hoverAnimation: gsap.core.Tween;

    constructor(element: HTMLElement) {
        const { name = '', label } = element.dataset;
        super('VHS');
        VHSTape.#index++;

        this.name = slugify(name);
        this.userData = {
            ...this.userData,
            ...element.dataset,
            active: false,
        };

        const screen = document.querySelector('div.screen') as HTMLElement;

        const typeIt = new (TypeIt as any)(element, {
            lifeLike: false,
            speed: 10,
            startDelay: 0,
            cursorChar: '<span style="padding-left: .3rem">▊</span>',
        });

        this.userData.print = {
            on: () => {
                element.style.display = 'block';
                screen.classList.remove('static');
                typeIt.go();
            },
            off: () => {
                typeIt.pause().reset();
                screen.classList.add('static');
                element.style.display = 'none';
            },
        };

        this.position.setY(VHSTape.#index * this.userData.size.y);
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
        router.goTo(this.name);
    };

    onHover = (e: any) => {
        e.stopPropagation();
        if (this.userData.active) return;
        if (e.type === 'mouseover') this.hoverAnimation.play();
        else this.hoverAnimation.reverse();
    };
}
