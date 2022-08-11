import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, Vector3, MathUtils } from 'three';
import { Text } from '@/objects';

// const colorMap = {};

export default class Sticker extends Mesh {
    constructor(texts: { title: string; label: string; }, targetSize: Vector3) {
        super();

        // colorMap[texts.label] = colorMap[texts.label] || MathUtils.randInt(0, 0xffffff);

        const scale = 0.65;
        this.geometry = new PlaneBufferGeometry(
            targetSize.x * scale,
            targetSize.y * scale,
        );
        this.material = new MeshBasicMaterial({ color: 0xffffff });

        const text = new Text(texts.title, targetSize.y / 2);

        this.position.setX(-targetSize.z / 2);
        this.rotateY(-Math.PI / 2)
        this.add(text);

        // const labelText = new Text(texts.label, .1, true);
        // // const labelGeometry = new PlaneBufferGeometry(targetSize.y * scale, .2);
        // const labelGeometry = new PlaneBufferGeometry(targetSize.y, .2);
        // // const labelMaterial = new MeshBasicMaterial({ color: colorMap[texts.label] });
        // const labelMaterial = new MeshBasicMaterial({ color: 0xffffff });
        // const label = new Mesh(labelGeometry, labelMaterial);
        // label.position.setZ(.01);
        // // label.position.setX(-targetSize.x / 2 + targetSize.y / 2);
        // label.position.setX(-targetSize.x / 3);
        // label.rotateZ(Math.PI/2);
        
        
        // label.add(labelText);
        // this.add(label);

    }
}
