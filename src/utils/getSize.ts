import { Object3D, Box3, Vector3 } from 'three';

export default function getSize(obj: Object3D) {
    const bbox = new Box3().setFromObject(obj);
    const size = new Vector3();
    bbox.getSize(size);
    return size;
}
