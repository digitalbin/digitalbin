import 'three';

// three.interactive dispatches these on the objects registered with it
declare module 'three' {
    interface Object3DEventMap {
        click: { stopPropagation(): void };
        mouseover: { stopPropagation(): void };
        mouseout: { stopPropagation(): void };
    }
}
