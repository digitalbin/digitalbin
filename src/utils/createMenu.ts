import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { InteractionManager } from 'three.interactive';

const size = 10;
const canvasSize = [500, 150];

function createCanvasTexture(label: string | null, color: number[]) {
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = canvasSize[0];
    canvasTexture.height = canvasSize[1];
    const ctx = canvasTexture.getContext('2d') as CanvasRenderingContext2D;
    // ctx.fillStyle = '#FFFFFF';
    ctx.fillStyle = `rgb(${color.join(',')})`;
    ctx.fillRect(0, 0, canvasSize[0], canvasSize[1]);
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = size;
    ctx.strokeRect(0, 0, canvasSize[0], canvasSize[1]);
    if (label) {
        const fontSize = size * 4;
        ctx.font = `bold ${fontSize}px Courier`;
        ctx.fillText(label, size, fontSize);
    }
    return new THREE.CanvasTexture(canvasTexture);
}

function getRandomPosition(index: number) {
    const randomVector = ['x', 'y', 'z'].map((dim) => {
        if (dim === 'y') {
            return (index + 1) * 100;
        }
        return THREE.MathUtils.randInt(-100, 100);
    });
    return new THREE.Vector3(...randomVector);
}

function getRandomColor() {
    return ['r', 'g', 'b'].map(() => THREE.MathUtils.randInt(0, 255));
}

interface MenuItem {
    name: string;
    slug?: string;
}

interface MenuConfig {
    name: string;
    items: MenuItem[];
    interactionManager: InteractionManager;
    scene: THREE.Scene;
    position?: THREE.Vector3;
    color?: number[];
    index?: number;
}

export default function createMenu({
    name,
    items,
    interactionManager,
    scene,
    position,
    color,
    index = 0,
}: MenuConfig) {
    const itemAmt = items.length;
    const menuGroup = new THREE.Group();
    menuGroup.position.copy(position || getRandomPosition(index));

    const _color = color || getRandomColor();
    menuGroup.name = `/${name}`;
    menuGroup.userData.color = _color;

    const menuBlocks = items.map((item, index) => {
        console.log(item);
        
        const canvasTextureText = createCanvasTexture(item.name, _color);
        const canvasTextureBlank = createCanvasTexture(null, _color);

        const geometry = new THREE.BoxGeometry(
            size * itemAmt,
            size,
            size * itemAmt,
        );
        const textMaterial = new THREE.MeshBasicMaterial({
            map: canvasTextureText,
        });
        const blankMaterial = new THREE.MeshBasicMaterial({
            map: canvasTextureBlank,
        });

        const block = new THREE.Mesh(geometry, [
            textMaterial,
            textMaterial,
            blankMaterial,
            blankMaterial,
            textMaterial,
            textMaterial,
        ]);

        const y = index * size - ((itemAmt - 1) * size) / 2;
        block.position.setY(y);

        block.userData = item;
        block.userData.active = false;
        block.userData.url = item.slug || `/${item.name}`;

        block.addEventListener('mouseover', (e) => {
            e.stopPropagation();
            e.target.userData.active = true;
        });

        block.addEventListener('mouseout', (e) => {
            e.stopPropagation();
            e.target.userData.active = false;
        });

        block.addEventListener('click', (e) => {
            console.log(e);

            e.stopPropagation();
            const targetName = e.target.userData.url;
            console.log(e.target.userData);

            window.location.hash = targetName;
        });

        interactionManager.add(block);

        const tweenDur = THREE.MathUtils.randInt(4000, 8000);
        new TWEEN.Tween(block.rotation.clone())
            .to({ y: Math.PI }, tweenDur)
            .onUpdate((rot) => {
                if (index % 2 === 0) {
                    block.rotation.y = rot.y;
                } else {
                    block.rotation.y = -rot.y;
                }
            })
            .start()
            .repeat(Infinity);

        return block;
    });

    menuGroup.add(...menuBlocks);
    scene.add(menuGroup);

    return menuGroup;
}
