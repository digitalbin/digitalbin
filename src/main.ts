import './style.css';

import pages from '../data/pages.json';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { InteractionManager } from 'three.interactive';
import {
    createRenderer,
    createScene,
    createCamera,
    createMenu,
    animate,
    groupBy,
    createPages,
    createPage,
} from './utils';
import { Router } from './lib';
// import cursorModel from './assets/cursor.glb';

// createPages();
const { renderer, cssRenderer } = createRenderer();
const scenes = createScene();
const { scene, cssScene } = scenes;
const camera = createCamera();
const router = new Router({ scene, camera });

// const loader = new GLTFLoader();
// let cursor;
// loader.load(cursorModel, gltf => {
//     cursor = gltf.scene;
//     scene.add(gltf.scene);
// });

const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement,
    false,
);

// const menuItems = []

const pageItems = pages.slice(1, 2).map(async (pageData) => {
    const { slug } = pageData;
    const pathDepth = slug.split('/').filter(Boolean).length;
    // if (pathDepth > 1) {
    //     menuItems.push(pageData);
    // }
    const pageItem = createPage(pageData, interactionManager);
    scene.add(pageItem);
});

// console.log(menuItems);

// const groupedPages = groupBy(pages, (p) => p.pageType);

// const mainMenuItems = Object.entries(groupedPages).map(([name, items]) => {
//     if (items.length === 1) {
//         return items[0];
//     }
//     return { name };
// });

// const mainMenu = createMenu({
//     name: 'index',
//     items: mainMenuItems,
//     interactionManager,
//     scene,
//     position: new THREE.Vector3(0, 0, -100),
//     color: [255, 255, 255],
// });

// const subMenus = Object.entries(groupedPages).filter(([, items]) => items.length > 1).map(([name, items], index) => {
//     const subMenu = createMenu({
//         name,
//         items,
//         interactionManager,
//         scene,
//         index,
//     });
//     return subMenu;
// });

// console.log({ pages, mainMenu, subMenus });

// const controls = new OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, cssRenderer.domElement);
// const controls = new FlyControls(camera, renderer.domElement);

// const lights = new THREE.AmbientLight(0xffffff, 1);
// lights.position.copy(camera.position);
// scene.add(lights);

const light = new THREE.DirectionalLight(0xffffff, 1)
scene.add(light)

// const particleLight = new THREE.Mesh(
//     new THREE.SphereGeometry(4, 8, 8),
//     new THREE.MeshBasicMaterial({ color: 0xffffff }),
// );
// scene.add(particleLight);

// const pointLight = new THREE.PointLight(0xffffff, 2, 800);
// pointLight.position.copy(camera.position);
// scene.add(pointLight)
// particleLight.add(pointLight);

const effect = new OutlineEffect(renderer);

animate((_delta) => {
    controls.update();
    interactionManager.update();
    TWEEN.update();
    light.position.copy(camera.position);
    // renderer.render(scene, camera);
    effect.render(scene, camera);
    // cssRenderer.render(cssScene, camera);
});

// window.addEventListener('mousemove', event => {
//     const x = (event.clientX / window.innerWidth) * 2 - 1;
//     const y = -(event.clientY / window.innerHeight) * 2 + 1;

//     cursor.position.set(x, y, 0);

// })
