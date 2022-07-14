import '@/style.css';
import pages from '../data/pages.json';
import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { gsap } from 'gsap';
import { InteractionManager } from 'three.interactive';
import { router, animate } from '@/lib';
import { Renderer, CSS3DRenderer, Scene, Camera, CameraControls } from '@/setup';
import { GLTFItem, Floor, TVSet, VHSTape } from '@/objects';

const renderer = new Renderer();
const css3Drenderer = new CSS3DRenderer();
const scene = new Scene();
const cssScene = new Scene();
// .background = null;
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

const element = document.createElement( 'div' );
element.style.width = '100px';
element.style.height = '100px';
element.style.background = new THREE.Color( Math.random() * 0xffffff ).getStyle();

const object = new CSS3DObject( element );
object.position.copy(tvSet.position)
object.rotation.copy(tvSet.rotation);
object.scale.set(.1, .1, .1)
// object.rotation.x = Math.random();
// object.rotation.y = Math.random();
// object.rotation.z = Math.random();
// object.scale.x = Math.random() + 0.5;
// object.scale.y = Math.random() + 0.5;
cssScene.add( object );

animate((_delta) => {
    const delta = clock.getDelta();
    cameraControls.update(delta);
    interactionManager.update();
    renderer.render(scene, camera);
    css3Drenderer.render(cssScene, camera);
});

router.handleCurrentPath();
