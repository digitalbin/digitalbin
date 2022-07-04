import * as THREE from 'three';

const size = 10;
const canvasSize = [500, 150];

export default function createCanvasTexture(
    // label: string | null,
    // color: number[],
) {
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = canvasSize[0];
    canvasTexture.height = canvasSize[1];
    const ctx = canvasTexture.getContext('2d') as CanvasRenderingContext2D;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasSize[0], canvasSize[1]);
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = size;
    ctx.strokeRect(0, 0, canvasSize[0], canvasSize[1]);

    return new THREE.CanvasTexture(canvasTexture);
}
