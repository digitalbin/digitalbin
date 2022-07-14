import '@/style.css';
import pages from '../data/pages.json';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { InteractionManager } from 'three.interactive';
import { router, animate } from '@/lib';
import { Renderer, Scene, Camera, CameraControls } from '@/setup';
import { GLTFItem, Floor, TVSet, VHSTape } from '@/objects';

const renderer = new Renderer();
const scene = new Scene();
const camera = new Camera();
const cameraControls = new CameraControls(camera, renderer);
const clock = new THREE.Clock();

router.init(scene, cameraControls);
await GLTFItem.init();

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
                // cameraControls.navigateTo(tvSet);
            },
            onReverseComplete: () => {
                tapes.attach(vhs);
                vhs.userData.active = false;
            },
        })
        .to(vhs.position, { ...viaPos })
        .to(vhs.rotation, { y: vhs.rotationOffset > 0 ? Math.PI : 0 })
        .to(vhs.position, endPos, '<');

    vhs.userData.animation = selectionAnimation;
    vhs.userData.viewTarget = tvSet;
});

tapes.position.setY(tapes.children[0].userData.size.y / 2);
tapes.position.setZ(-10);
tapes.name = '/';

scene.add(tapes);

animate((_delta) => {
    const delta = clock.getDelta();
    cameraControls.update(delta);
    interactionManager.update();
    renderer.render(scene, camera);
});

router.handleCurrentPath();
// if (window.location.pathname === '/') cameraControls.navigateTo(tapes);

// window.addEventListener('keydown', async (e) => {
//     const { code } = e;
//     if (code !== 'Space') return;

//     const target = null;
//     if (target) {
//         await cameraControls.navigateTo(target);
//     }
// });
