import './style.css';
import pages from '../data/pages.json';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { InteractionManager } from 'three.interactive';
import { animate, getSize } from './utils';
import {
    Router,
    Renderer,
    Scene,
    Camera,
    CameraControls,
    Floor,
    Sticker,
    TVSet,
} from './lib';
// @ts-expect-error
import AllModels from './assets/vhs_vcr_crt.glb';

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

const helper = new THREE.PointLightHelper(pointLight, 1, 0x000000);
scene.add(helper);

const floor = new Floor();
scene.add(floor);

const loader = new GLTFLoader();
const gltf = await loader.loadAsync(AllModels);
const _gltf = await loader.loadAsync(AllModels);

const tvSet = new TVSet(_gltf);

tvSet.backButton.addEventListener('click', () => router.goTo('/'));
interactionManager.add(tvSet.backButton);

scene.add(tvSet);

const objects = ['VHS', 'VCR', 'BACK', 'EJECT', 'CRT'];
const [_vhs, vcr, back, eject, crt] = objects.map((key) => {
    const model = gltf.scene.getObjectByName(key) as THREE.Object3D;
    model.userData.size = getSize(model);
    return model;
});

const tapes = new THREE.Group();

pages.forEach((pageItem, i) => {
    const { name, slug } = pageItem;
    const vhs = _vhs.clone(true);

    vhs.name = slug;
    vhs.userData.slug = slug;
    vhs.userData.active = false;
    vhs.userData.position = new THREE.Vector3();
    vhs.getWorldPosition(vhs.userData.position);
    tapes.attach(vhs);
    interactionManager.add(vhs);

    vhs.position.setY(i * vhs.userData.size.y);
    const rotationOffset = THREE.MathUtils.randFloat(
        THREE.MathUtils.degToRad(-30),
        THREE.MathUtils.degToRad(30),
    );
    vhs.rotateY(rotationOffset);

    const sticker = new Sticker(name, vhs.userData.size);
    vhs.add(sticker);

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
        .to(vhs.rotation, { y: rotationOffset > 0 ? Math.PI : 0 })
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
        router.goTo(slug);
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
tapes.position.setY(_vhs.userData.size.y / 2);
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
