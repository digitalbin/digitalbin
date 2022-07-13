import './style.css';
import pages from '../data/pages.json';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { InteractionManager } from 'three.interactive';
import { animate, getSize } from './utils';
import {
    Router,
    Renderer,
    Scene,
    Camera,
    CameraControls,
    GLTFItem,
    Floor,
    TVSet,
    VHSTape,
} from './lib';

await GLTFItem.initialize();

const renderer = new Renderer();
const scene = new Scene();
const camera = new Camera();
const cameraControls = new CameraControls(camera, renderer);
const router = new Router(scene);
const clock = new THREE.Clock();

const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(0, 20, 0);
scene.add(pointLight);

const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement,
    false,
);

// const helper = new THREE.PointLightHelper(pointLight, 1, 0x000000);
// scene.add(helper);

const floor = new Floor();
scene.add(floor);

const tvSet = new TVSet();
tvSet.backButton.addEventListener('click', () => router.goTo('/'));
interactionManager.add(tvSet.backButton);
scene.add(tvSet);

const tapes = new THREE.Group();

pages.forEach((pageItem) => {
    const vhs = new VHSTape(pageItem);
    interactionManager.add(vhs);
    tapes.attach(vhs);

    const viaPos = new THREE.Vector3().setY(tvSet.vcr.userData.position.y);
    const endPos = tvSet.vcr.userData.position.clone();

    const selectionAnimation = gsap
        .timeline({
            paused: true,
            defaults: {
                ease: 'sine.inOut',
                duration: 1,
            },
            onStart: () => {
                scene.attach(vhs);
                vhs.userData.active = true;
                cameraControls.navigateTo(tvSet);
            },
            onReverseComplete: () => {
                tapes.attach(vhs);
                vhs.userData.active = false;
            },
        })
        .to(vhs.position, { ...viaPos })
        .to(vhs.rotation, { y: vhs.rotationOffset > 0 ? Math.PI : 0 })
        .to(vhs.position, endPos, '<');

    vhs.userData.animations = {
        onSelect: () => selectionAnimation.play(),
        onDeSelect: () => {
            cameraControls.navigateTo(tapes);
            selectionAnimation.reverse();
        },
    };

    function onClick(e: any) {
        e.stopPropagation();
        router.goTo(pageItem.slug);
    }

    const hoverAnimation = gsap.to(vhs.position, {
        z: vhs.userData.size.z / 4,
        paused: true,
        duration: 0.2,
    });

    function onHover(e: any) {
        e.stopPropagation();
        if (e.target.userData.active) return;
        if (e.type === 'mouseover') hoverAnimation.play();
        else hoverAnimation.reverse();
    }

    vhs.addEventListener('click', onClick);
    vhs.addEventListener('mouseover', onHover);
    vhs.addEventListener('mouseout', onHover);
});

tapes.userData.size = getSize(tapes);
tapes.position.setY(tapes.children[0].userData.size.y / 2);
tapes.position.setZ(-10);
scene.add(tapes);

animate((_delta) => {
    const delta = clock.getDelta();
    cameraControls.update(delta);
    interactionManager.update();
    renderer.render(scene, camera);
});

if (window.location.pathname === '/') cameraControls.navigateTo(tapes);

router.init();

// window.addEventListener('keydown', async (e) => {
//     const { code } = e;
//     if (code !== 'Space') return;

//     const target = null;
//     if (target) {
//         await cameraControls.navigateTo(target);
//     }
// });
