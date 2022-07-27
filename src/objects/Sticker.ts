import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';
import { Text } from '@/objects';

export default class Sticker extends Mesh {
    constructor(texts: { title: string; label: string; }, targetSize: Vector3) {
        super();

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
        // const labelGeometry = new PlaneBufferGeometry(
        //     // labelText.children[0].geometry.boundingBox.max.x,
        //     // labelText.children[0].geometry.boundingBox.max.y,
        //     );
        // const labelMaterial = new MeshBasicMaterial({ color: 0xff00ff });
        // const label = new Mesh(labelGeometry, labelMaterial);
        // label.position.setZ(.01);
        // label.position.setX(-1);
        
        // label.add(labelText);
        // this.add(label);
    }
}
