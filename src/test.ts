import './style.css';

import pages from '../data/pages.json';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import CameraControls from 'camera-controls';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';
import { InteractionManager } from 'three.interactive';
import {
    createRenderer,
    createScene,
    createCamera,
    animate,
    createPage,
} from './utils';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import box from './assets/box.glb';

CameraControls.install({ THREE });

const canvas = document.querySelector('#three') || undefined;
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
camera.up.set(0, 1, 0);
// camera.position.setZ(-10)
// camera.updateProjectionMatrix()
const cameraControls = new CameraControls(camera, renderer.domElement);
cameraControls.setPosition(0, 0, 10)
cameraControls.updateCameraUp()
cameraControls.dampingFactor = 0.1;
// cameraControls.enabled = false;
console.log(scene);

const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement,
    false,
);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled = false;

const lights = new THREE.AmbientLight(0xffffff, 1);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.name = 'light';

scene.add(
    light,
    lights
);

const objects = Array(10)
    .fill(true)
    .map((_, i) => {
        const geom = new THREE.TorusBufferGeometry();
        const color = [Math.random(), Math.random(), Math.random()];
        const material = new THREE.MeshToonMaterial({
            color: new THREE.Color(...color),
        });
        const sphere = new THREE.Mesh(geom, material);
        const maxDist = 100;
        const obj = new THREE.Object3D();
        obj.position.set(
            // i * 3, 0, 0
            THREE.MathUtils.randInt(-maxDist, maxDist),
            THREE.MathUtils.randInt(-maxDist, maxDist),
            THREE.MathUtils.randInt(-maxDist, maxDist),
            // THREE.MathUtils.randInt(0, maxDist),
            // THREE.MathUtils.randInt(0, maxDist),
            // THREE.MathUtils.randInt(0, maxDist),
        );
        // obj.rotateZ(Math.random() * Math.PI);
        obj.rotateY(i * (Math.PI / 2));
        // obj.rotateX(Math.PI / 2);
        obj.add(sphere);
        scene.add(obj);
        interactionManager.add(sphere);
        sphere.addEventListener('click', e => console.log('click', e))
        return obj;
    });

const gltfLoader = new GLTFLoader();
const glb = await gltfLoader.loadAsync(box);
const _box = glb.scene;

interactionManager.add(_box)
scene.add(_box);
const mixer = new THREE.AnimationMixer(glb.scene);
const action = mixer.clipAction( glb.animations[0] );
action.clampWhenFinished = true;
action.loop = THREE.LoopOnce;
// action.play();
console.log(action);

document.querySelector('#app')?.remove();

_box.addEventListener('mouseover', e => {
    action.play();
    action.reset()
})

_box.addEventListener('mouseout', e => {
    action.fadeOut(action.time)
})


animate((_delta) => {
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update(delta);
    mixer.update(delta);
    // controls.update();
    interactionManager.update();
    // TWEEN.update();
    // light.position.copy(camera.position);
    // light.rotation.copy(camera.rotation);
    // if (hasControlsUpdated) {
        renderer.render(scene, camera);
    // }
    // effect.render(scene, camera);
});

let curr: number;

async function fly() {
    const withoutCurrent = objects.filter(({ id }) => id !== curr);
    const target = withoutCurrent[THREE.MathUtils.randInt(0, withoutCurrent.length - 1)];
    console.log(target);
    curr = target.id;

    // await cameraControls.setLookAt(target.position.x, target.position.y, target.position.z, target.position.x, target.position.y, target.position.z, true);

    await Promise.all([
        cameraControls.setTarget(
            target.position.x,
            target.position.y,
            target.position.z,
            true,
        ),
        // cameraControls.dollyTo(),
        // cameraControls.fitToBox(target, true),
        // cameraControls.rotateAzimuthTo(target.rotation.y, true),
        cameraControls.rotateTo(target.rotation.y, Math.PI / 2, true),
    ]);
    cameraControls.fitToBox(target, true);

    console.log(target);
}

window.addEventListener('keydown', async (e) => {
    const { code } = e;
    if (code !== 'Space') return;
    // fly()
});

// fly()

const size = 500;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );