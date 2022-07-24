import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';
import { Text } from '@/objects';


export default class Sticker extends Mesh {
    constructor(str: string, targetSize: Vector3) {
        super();

        const scale = 0.65;
        this.geometry = new PlaneBufferGeometry(
            targetSize.x * scale,
            targetSize.y * scale,
        );
        this.material = new MeshBasicMaterial({ color: 0xffffff });

        const text = new Text(str, targetSize.y / 2);

        this.position.setX(-targetSize.z / 2);
        this.rotateY(-Math.PI / 2)
        this.add(text);
    }
}
