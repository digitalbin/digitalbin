import gsap from 'gsap';
import { MathUtils } from 'three';
import { GLTFItem, Sticker } from '@/objects';
import { router } from '@/lib';
import { notionBlocksToHtml } from '@/utils';
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
    rotationOffset: number;
    hoverAnimation: gsap.core.Tween;

    constructor({ name, slug, page, /* pageType, url */ }: PageItem) {
        super('VHS');
        VHSTape.#index++;

        this.name = slug;
        this.userData = {
            ...this.userData,
            active: false,
        };

        const screen = document.querySelector('div.screen') as HTMLDivElement;

        const elm = document.createElement('article');
        elm.classList.add('crt');
        elm.style.display = 'none';
        elm.innerHTML = notionBlocksToHtml(page);

        screen.appendChild(elm);

        const typeIt = new (TypeIt as any)(elm, {
            lifeLike: false,
            speed: 10,
            startDelay: 0,
            cursorChar: '<span style="padding-left: .3rem">▊</span>',
        });
        
        this.userData.print = {
            on: () => {
                elm.style.display = 'block';
                screen.classList.remove('static');
                typeIt.go();
            },
            off: () => {
                typeIt.pause().reset();
                screen.classList.add('static');
                elm.style.display = 'none';
            }
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
    };

    onHover = (e: any) => {
        e.stopPropagation();
        if (this.userData.active) return;
        if (e.type === 'mouseover') this.hoverAnimation.play();
        else this.hoverAnimation.reverse();
    };
}
