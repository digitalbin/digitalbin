import { Group, Scene, Vector3 } from 'three';
import gsap from 'gsap';
import VHSTape from '@/objects/VHSTape';
import type { TVSet } from '@/objects';
import World from '@/World';
import { reducedMotion } from '@/utils';

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
                        duration: reducedMotion ? 0.01 : 1,
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
        this.createKeyboardNav();
    }

    /**
     * The tapes only exist on the canvas, so mirror them as real links:
     * hidden until focused, they make the pile reachable by keyboard and
     * screen readers. Escape ejects, same as the button on the VCR.
     */
    private createKeyboardNav() {
        const { router } = new World();
        const base = import.meta.env.BASE_URL;
        const nav = document.createElement('nav');
        nav.className = 'tape-nav';
        nav.setAttribute('aria-label', 'Tapes');

        const addLink = (text: string, path?: string) => {
            const link = document.createElement('a');
            link.textContent = text;
            link.href = base + (path || '');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                router.goTo(path);
            });
            nav.appendChild(link);
            return link;
        };

        const tapes = [...this.children].reverse() as VHSTape[];
        tapes.forEach((tape) => {
            const link = addLink(tape.userData.name, tape.name);
            link.addEventListener('focus', () => {
                if (!tape.userData.active) tape.hoverAnimation.play();
            });
            link.addEventListener('blur', () => tape.hoverAnimation.reverse());
        });
        addLink('eject');

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !nav.hidden) router.goTo();
        });

        // behind the loading screen until the visitor presses start
        nav.hidden = true;
        window.addEventListener('onroutechange', () => (nav.hidden = false), {
            once: true,
        });
        document.body.prepend(nav);
    }
}
