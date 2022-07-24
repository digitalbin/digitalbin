import { Object3D, PlaneBufferGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';
// @ts-expect-error
import { Text } from 'troika-three-text';

const fonts = [
    'https://fonts.gstatic.com/s/rocksalt/v18/MwQ0bhv11fWD6QsAVOZbsw.woff',
    'https://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004Hak.woff',
    'https://fonts.gstatic.com/s/waitingforthesunrise/v16/WBL1rFvOYl9CEv2i1mO6KUW8RKWJ2zoXoz5JsYZT.woff',
];

export default class Sticker extends Object3D {
    constructor(str: string, targetSize: Vector3) {
        super();

        const s = 0.65;
        const stickerGeometry = new PlaneBufferGeometry(
            targetSize.x * s,
            targetSize.y * s,
        );
        const stickerMaterial = new MeshBasicMaterial({ color: 0xffffff });
        const sticker = new Mesh(stickerGeometry, stickerMaterial);

        const text = new Text();
        text.text = str;
        text.font = fonts[Math.floor(Math.random() * fonts.length)];
        text.fontSize = targetSize.y / 2;
        text.anchorX = 'center';
        text.anchorY = 'middle';
        text.depthOffset = -10;
        text.color = 0x111827;
        text.sync();

        this.position.setX(-targetSize.z / 2);
        this.rotateY(-Math.PI / 2)
        this.add(sticker, text);
    }
}
