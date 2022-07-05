import './style.css';
import './glitch.css';

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
    createCSSRenderer,
    createScene,
    createCSSScene,
    createCamera,
    createMenu,
    animate,
    groupBy,
    createPages,
    createPage,
    createCameraControls,
} from './utils';
import { Router } from './lib';

const renderer = createRenderer();
const cssRenderer = createCSSRenderer();

const scene = createScene();
const cssScene = createCSSScene();

const camera = createCamera();

const cameraControls = createCameraControls(camera, cssRenderer);
const clock = new THREE.Clock();

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
const ambLight = new THREE.AmbientLight(0xffffff, .3);
scene.add(dirLight, ambLight);

const router = new Router({ scene, camera });

const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement,
    false,
);

// const menuItems = []

const pageItems = pages
    // .slice(1, 2)
    .map(async (pageData) => {
        const { slug } = pageData;
        const pathDepth = slug.split('/').filter(Boolean).length;
        // if (pathDepth > 1) {
        //     menuItems.push(pageData);
        // }
        const [spaceItem, cssItem] = createPage(pageData, interactionManager);
        scene.add(spaceItem);
        cssScene.add(cssItem)
        return spaceItem;
    });


function createRefTorus() {
    const geom = new THREE.TorusBufferGeometry();
    const color = [Math.random(), Math.random(), Math.random()];
    const material = new THREE.MeshToonMaterial({
        color: new THREE.Color(...color),
    });
    const torus = new THREE.Mesh(geom, material);
    scene.add(torus);
}



/*
const groupedPages = groupBy(pages, (p) => p.pageType);

const mainMenuItems = Object.entries(groupedPages).map(([name, items]) => {
    if (items.length === 1) {
        return items[0];
    }
    return { name };
});

const mainMenu = createMenu({
    name: 'index',
    items: mainMenuItems,
    interactionManager,
    scene,
    position: new THREE.Vector3(0, 0, -100),
    color: [255, 255, 255],
});

const subMenus = Object.entries(groupedPages).filter(([, items]) => items.length > 1).map(([name, items], index) => {
    const subMenu = createMenu({
        name,
        items,
        interactionManager,
        scene,
        index,
    });
    return subMenu;
});
*/

animate((_delta) => {
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update(delta);

    if (hasControlsUpdated) {
        renderer.render(scene, camera);
        cssRenderer.render(cssScene, camera);
    }

    // controls.update();
    // interactionManager.update();
    // TWEEN.update();
    // light.position.copy(camera.position);
    // renderer.render(scene, camera);
    // effect.render(scene, camera);
    // cssRenderer.render(cssScene, camera);
});

const start = await pageItems[0];
console.log(start);

await cameraControls.navigateTo(start);


window.addEventListener('keydown', async (e) => {
    const { code } = e;
    if (code !== 'Space') return;
    const target = await pageItems[THREE.MathUtils.randInt(0, pageItems.length - 1)];
    if (target) {
        await cameraControls.navigateTo(target)
    }
});