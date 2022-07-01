import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Text } from 'troika-three-text';
import { InteractionManager } from 'three.interactive';
import notionBlocksToHtml from './notionBlocksToHtml';
import { size } from './constants';
import paperTexture from '../assets/paper.jpg';
import font from '../assets/fa-sysfont-c.woff';
import bakolit from '../assets/bakolit.glb';

const gray900 = 0x111827;

function createBlock(width = size, height = size, depth = size) {
    const group = new THREE.Group();
    const boxGeometry = new THREE.BoxGeometry(width, height, depth);
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);

    const lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(
        edgesGeometry,
    );

    const matLine = new LineMaterial({
        color: gray900,
        linewidth: 0.005,
    });

    const outline = new Wireframe(lineGeometry, matLine);
    outline.computeLineDistances();

    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        // color: 0xffffff,
        // map: new THREE.TextureLoader().load(paperTexture),
    });

    const planes = new THREE.Mesh(boxGeometry, planeMaterial);
    outline.name = 'outline';
    planes.name = 'box';
    group.add(planes, outline);
    return group;
}

function createText(str: string) {
    const text = new Text();
    text.text = str;
    text.fontSize = 8;
    const popOutAmt = 0; //5;
    text.depthOffset = -1;
    text.position.setZ(size / 2 + popOutAmt);
    text.color = gray900;
    text.font = font;
    text.anchorX = 'center';
    text.anchorY = 'middle';
    text.sync();
    return text;
}

function createTopBar(title: string) {
    const topBarGroup = new THREE.Group();
    const height = size / 8;
    const block = createBlock(undefined, height);
    const text = createText(title);

    // const closeBtnDepth = 5;
    // const closeBtnSize = height - closeBtnDepth;
    // const closeBtn = createBlock(closeBtnSize, closeBtnSize, closeBtnDepth);

    // closeBtn.position.setZ(size / 2)
    // closeBtn.position.setX(-size / 2 + closeBtnSize)
    // closeBtn.name = 'close';

    topBarGroup.add(block, text);
    topBarGroup.position.setY(size / 2 + height / 2);
    return topBarGroup;
}

// function createBodyBlock()

export default function createPage(pageData, interactionManager: InteractionManager) {
    const group = new THREE.Group();
    const loader = new GLTFLoader();
    loader.load(bakolit, gltf => {
        console.log(gltf);
        group.add(gltf.scene);
        gltf.scene.children.forEach(child => {
            child.material = new THREE.MeshLambertMaterial({ color: 0xb4d455 })
        })
    })
    // const topBar = createTopBar(pageData.name);
    // const closeBtn = topBar.getObjectByName('close');
    // interactionManager.add(closeBtn);

    // closeBtn?.addEventListener('mouseover', e => {
    //     const target = e.target;
    //     const box = target.getObjectByName('box');
    //     const depth = box.geometry.parameters.depth + 1;
    //     e.target.position.setZ(e.target.position.z - depth);
    // })
    // closeBtn?.addEventListener('mouseout', e => {
    //     const target = e.target;
    //     const box = target.getObjectByName('box');
    //     const depth = box.geometry.parameters.depth + 1;
    //     e.target.position.setZ(e.target.position.z + depth);
    // })
    
    // const bodyBlock = createBlock();

    // group.add(
        // topBar,
        // bodyBlock,
        // text
    // );


    return group;
}

// export default function createPage(pageData, { scene, cssScene }) {
//     const group = new THREE.Group();
//     const diffuseColor = new THREE.Color(0xb4d455); //.setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );

//     const geometry = new THREE.BoxGeometry( size, size, size );

//     const material = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         map: new THREE.TextureLoader().load(paperTexture)
//     });

//     const box = new THREE.Mesh(geometry, material);

//     group.add(box);
//     return group;
// }
