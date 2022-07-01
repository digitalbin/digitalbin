import * as THREE from 'three';
import {
    CSS3DRenderer,
    CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import * as TWEEN from '@tweenjs/tween.js';
// import { InteractionManager } from 'three.interactive';
import notionBlocksToHtml from './notionBlocksToHtml';
import { size } from './constants';

function scale(obj: CSS3DObject) {
    const scale = size / obj.element.clientWidth;
    obj.scale.set(scale, scale, scale);
}

function createTextualElement({ page, name }) {
    const article = document.createElement('article');

    const menuBar = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.innerText = name;
    menuBar.classList.add('menubar');

    const textContent = document.createElement('div');
    textContent.classList.add('text');

    const btn = document.createElement('button');
    btn.onclick = (e) => alert('hej');

    menuBar.appendChild(btn);
    menuBar.appendChild(h1);
    article.appendChild(menuBar);
    article.appendChild(textContent);

    document.querySelector('#app')?.appendChild(article);
    textContent.innerHTML = notionBlocksToHtml(page);

    const html = new CSS3DObject(article);
    return html;
}

function createIframeElement({ url }) {
    const iframeElement = document.createElement('iframe');
    iframeElement.src = url;
    document.querySelector('#app')?.appendChild(iframeElement)

    const iframe = new CSS3DObject(iframeElement);
    return iframe;
}

function createLidElement() {
    const element = document.createElement('div');
    element.style.width = size + 'px';
    element.style.height = size + 'px';
    element.classList.add('lid');
    const object = new CSS3DObject(element);
    return object;
}

export default function createPage(pageData, { scene, cssScene }) {
    const group = new THREE.Object3D();
    cssScene.add(group);

    if (Boolean(pageData.page.length)) {
        const html = createTextualElement(pageData);
        scale(html);
        group.add(html);
        html.rotateY(Math.PI / 4);

        const html2 = html.clone();
        html2.rotateY(-Math.PI / 4);
        
        // const iframe = createIframeElement(pageData);
        // scale(iframe);
        // group.add(iframe)
        // iframe.position.setZ(size / 2);
        // iframe.position.setX(size / 2);
        // iframe.rotateY(-Math.PI / 2);

        // const top = createLidElement();
        // top.rotateX(Math.PI / 2);
        // top.position.setY(size/2);
        // top.position.setZ(size/2);

        // const bottom = top.clone();
        // bottom.position.setY(-size / 2)

        // group.add(top);
        // group.add(bottom);
    }


    // group.position.setZ(-size/4);
    // group.position.setX(-(Math.sqrt(2) * size) / 4);
    // group.rotateY(Math.PI / 4);

    return group;
}
