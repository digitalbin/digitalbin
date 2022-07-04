import * as THREE from 'three';
import Typewriter from 'typewriter-effect/dist/core';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import fiveToneTexture from '../assets/fiveTone.jpeg';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Text } from 'troika-three-text';
import { InteractionManager } from 'three.interactive';
import notionBlocksToHtml from './notionBlocksToHtml';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import { size } from './constants';
import paperTexture from '../assets/paper.jpg';
import font from '../assets/fa-sysfont-c.woff';
import crt from '../assets/crt.glb';
import { BufferGeometry, Material, MeshStandardMaterial, MeshToonMaterial, Scene } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

const gray900 = 0x111827;

const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const fiveTone = textureLoader.load(fiveToneTexture);
fiveTone.minFilter = THREE.NearestFilter;
fiveTone.magFilter = THREE.NearestFilter;

function createMeshGroup() {
    const meshGroup = new THREE.Group();
    gltfLoader.load(crt, (glb) => {
        glb.scene.traverse(_child => {
            const child = _child as THREE.Mesh<BufferGeometry, MeshToonMaterial | MeshStandardMaterial>;
            if (child.isMesh) {
                child.material = new THREE.MeshToonMaterial({
                    color: child.material.color,
                    gradientMap: fiveTone,
                });
            }
        })
        // Needed?
        glb.scene.scale.set(10, 10, 10);
        glb.scene.translateX(-2);
        meshGroup.add(glb.scene);
    });

    return meshGroup;
}

function createCSSGroup(pageData) {
    const cssGroup = new THREE.Group();

    const element = document.createElement('div');
    element.classList.add('screen');

    const htmlBlocks = notionBlocksToHtml(pageData.page, true);
    const typewriter = new Typewriter(element, { delay: 20, cursor: '▋' });

    htmlBlocks.forEach((htmlBlock) => {
        typewriter.typeString('> ').typeString(htmlBlock).typeString('<br />');
    });

    // typewriter.pauseFor(2500).start();

    const cssItem = new CSS3DObject(element);

    // cssItem.translateZ(40);
    const s = 0.05;
    cssGroup.scale.set(s, s, s);
    cssGroup.add(cssItem);
    cssGroup.userData.animation = typewriter;
    return cssGroup;
}

// function createCSSGroup(pageData) {
//     const cssGroup = new THREE.Group();

//     const element = document.createElement('div');
//     element.classList.add('screen');
//     element.style.perspective = '400px';

//     const skewContainer = document.createElement('div');
//     skewContainer.classList.add('skewContainer');
//     element.appendChild(skewContainer);

//     const htmlBlocks = notionBlocksToHtml(pageData.page, true);
//     const typewriter = new Typewriter(skewContainer, { delay: 20, cursor: '▋' });

//     htmlBlocks.forEach((htmlBlock) => {
//         typewriter.typeString('> ').typeString(htmlBlock).typeString('<br />');
//     });

//     typewriter.pauseFor(2500).start();

//     const cssItem = new CSS2DObject(element);

//     cssGroup.add(cssItem);
//     return cssGroup;
// }

export default function createPage(
    pageData,
    interactionManager: InteractionManager,
) {

    const meshGroup = createMeshGroup();
    const cssGroup = createCSSGroup(pageData);

    const position = new THREE.Vector3(
        // THREE.MathUtils.randInt(-400, 400),
        // 0,
        // 0,
        THREE.MathUtils.randInt(-300, 300),
        THREE.MathUtils.randInt(-300, 300),
        THREE.MathUtils.randInt(-300, 300),
    );
    meshGroup.position.copy(position);
    cssGroup.position.copy(position);

    const rotation = new THREE.Euler(
        0,
        THREE.MathUtils.randFloat(
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(360),
        ),
        0,
    )

    meshGroup.rotation.copy(rotation);
    cssGroup.rotation.copy(rotation);
    cssGroup.rotateY(Math.PI / 2);

    meshGroup.name = pageData.slug;
    meshGroup.userData = {
        ...cssGroup.userData,
        type: 'screen',
    }

    return [meshGroup, cssGroup];
}
