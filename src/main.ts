import '@/style.css';
import pages from '../data/pages.json';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { InteractionManager } from 'three.interactive';
import { router, animate } from '@/lib';
import { Renderer, CSS3DRenderer, Scene, Camera, CameraControls } from '@/setup';
import { GLTFItem, Room, TVSet, VHSTape, LightBulb } from '@/objects';

const renderer = new Renderer();
const css3Drenderer = new CSS3DRenderer();
const scene = new Scene();
const cssScene = new Scene();

const camera = new Camera();
const cameraControls = new CameraControls(camera, renderer);
const clock = new THREE.Clock();

router.init(scene, cameraControls);
await GLTFItem.init();

const lightBulb = new LightBulb()
scene.add(lightBulb);

const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement,
    false,
);

const room = new Room();
scene.add(room);

const tvSet = new TVSet();
interactionManager.add(tvSet.backButton);
scene.add(tvSet);
cssScene.add(tvSet.css3dObject);

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
    const hasUpdate = cameraControls.update(delta);
    interactionManager.update();
    
    // if (hasUpdate) {
        renderer.render(scene, camera);
        css3Drenderer.render(cssScene, camera);
    // }
});

router.handleCurrentPath();
// cameraControls.navigateTo(lightBulb)
