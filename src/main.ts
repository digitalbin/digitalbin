import './style.css';
// import './glitch.css';

import pages from '../data/pages.json';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
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
} from './lib';
// @ts-expect-error
import AllModels from './assets/vhs_vcr_crt.glb';

const renderer = new Renderer();
const scene = new Scene();
const camera = new Camera();
const cameraControls = new CameraControls(camera, renderer);
const router = new Router(cameraControls);
const clock = new THREE.Clock();

// const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// const ambLight = new THREE.AmbientLight(0xffffff, 0.3);
// scene.add(dirLight, ambLight);

// renderer.shadowMap.enabled = true;
// const spotlight = new THREE.SpotLight(0xffffff);
// spotlight.position.set(0, 10, 0);
// spotlight.castShadow = true;
// scene.add(spotlight);

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

const objects = ['VHS', 'VCR', 'CRT'];
const [_vhs, vcr, crt] = objects.map((key) => {
    const model = gltf.scene.getObjectByName(key) as THREE.Object3D;
    model.userData.size = getSize(model);
    return model;
});

const tvSet = new THREE.Object3D();
tvSet.add(crt, vcr);
tvSet.rotateY(-Math.PI / 2);
tvSet.position.setY(vcr.userData.size.y / 2);
tvSet.position.setX(vcr.userData.size.x * 2);
scene.add(tvSet);

vcr.userData.position = new THREE.Vector3();
vcr.getWorldPosition(vcr.userData.position);

const tapes = new THREE.Object3D();
pages.forEach((page, i) => {
    const { name, slug } = page;
    const vhs = _vhs.clone(true);
    vhs.name = name;
    vhs.userData.slug = slug;
    vhs.position.setY(i * vhs.userData.size.y);

    vhs.rotateY(
        THREE.MathUtils.randFloat(
            THREE.MathUtils.degToRad(-30),
            THREE.MathUtils.degToRad(30),
        ),
    );

    const sticker = new Sticker(name, vhs.userData.size);
    vhs.add(sticker);

    const retrieveTape = new TWEEN.Tween(vhs.position).to(
        new THREE.Vector3(0, vhs.position.y, 0),
        1000,
    );
    // .onComplete(async () => {
    // tapes.attach(vhs);
    // await cameraControls.navigateTo(_crt);
    // });
    // const rotateTape = new TWEEN.Tween(new THREE).to(vcr.rotation);
    const insertTape = new TWEEN.Tween(vhs.position).to(vcr.userData.position);
    
    retrieveTape
        // .chain(rotateTape)
        .onComplete(() => {
            vhs.rotation.set(0, Math.PI*2, 0);
            cameraControls.navigateTo(tvSet)
        })
        .chain(insertTape);

    vhs.addEventListener('click', (e) => {
        e.stopPropagation();
        // router.navigate(e.target.userData.slug, {
        //     target: e.target,
        //  })
        // window.history.pushState({}, '', e.target.userData.slug);
        scene.attach(e.target);
        retrieveTape.start();
    });

    const activeOffset = vhs.userData.size.z / 4;
    const startPos = vhs.position.clone();
    const endPos = startPos.clone().setZ(activeOffset);
    const mouseOver = new TWEEN.Tween(vhs.position).to(endPos, 200);
    const mouseOut = new TWEEN.Tween(vhs.position).to(startPos, 200);

    vhs.addEventListener('mouseover', (e) => {
        e.stopPropagation();
        // mouseOver.start();
    });

    vhs.addEventListener('mouseout', (e) => {
        e.stopPropagation();
        // mouseOut.start();
    });

    tapes.add(vhs);
    interactionManager.add(vhs);
});

tapes.userData.size = getSize(tapes);
tapes.position.setY(_vhs.userData.size.y / 2);
tapes.position.setZ(-10);
scene.add(tapes);

animate((_delta) => {
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update(delta);
    const hasTweenUpdated = TWEEN.update(_delta);
    interactionManager.update();

    if (hasControlsUpdated || hasTweenUpdated) {
        renderer.render(scene, camera);
    }
});

await cameraControls.navigateTo(tapes);

window.addEventListener('keydown', async (e) => {
    const { code } = e;
    if (code !== 'Space') return;

    const target = null;
    if (target) {
        await cameraControls.navigateTo(target);
    }
});
