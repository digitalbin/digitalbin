import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

interface Config {
    scene: THREE.Scene;
    camera: THREE.Camera;
}

class Router {
    scene: THREE.Scene;
    camera: THREE.Camera;

    constructor({ scene, camera }: Config) {
        this.scene = scene;
        this.camera = camera;
        this.getHash = this.getHash.bind(this);
        this.onHashChange = this.onHashChange.bind(this);

        window.addEventListener('hashchange', this.onHashChange);
    }

    getHash(url: string) {
        return url.split('#')[1] || '/index';
    }

    goTo(path: string) {
        window.location.hash = path;
    }

    onHashChange(e: HashChangeEvent) {
        const { oldURL, newURL } = e;
        
        const light = this.scene.getObjectByProperty('type', 'DirectionalLight');
        
        const oldHash = this.getHash(oldURL);
        const newHash = this.getHash(newURL);
    
        const current = this.scene.getObjectByName(oldHash);
        const target = this.scene.getObjectByName(newHash);

        const pagesToHide = document.querySelectorAll('article');
            const pageToDisplay = document.getElementById(newHash);
            pagesToHide?.forEach(page => {
                if (!page.classList.contains('hidden')) page.classList.add('hidden');
            });
        
        if (!target) {
            pageToDisplay?.classList.remove('hidden');
            return;
        };
    
        // const currentColor = [...current?.userData.color];
        // const newColor = [...target?.userData.color];
        // new TWEEN.Tween(currentColor)
        //     .to(newColor)
        //     .onUpdate((color) => {
        //         this.scene.background = new THREE.Color(
        //             `rgb(${color.map(Math.round).join(',')})`,
        //         );
        //     })
        //     .start();
    
        const newPos = new THREE.Vector3().copy(target.position);
        newPos.setZ(newPos.z - 100);
        newPos.setX(newPos.x - 50);
    
        const movementTween = new TWEEN.Tween(this.camera.position.clone())
            .to(newPos)
            .onUpdate((pos) => {        
                this.camera.position.copy(pos);
    
                this.camera.lookAt(target.position);
                // light?.target?.copy(target)
                // this.camera.updateProjectionMatrix()
            });
    
        const startRotation = this.camera.quaternion.clone();
        this.camera.lookAt(target.position);
        const endRotation = this.camera.quaternion.clone();
        this.camera.quaternion.copy(startRotation);
    
        const cameraTween = new TWEEN.Tween(this.camera.quaternion)
            .to(endRotation, 300)
            .chain(movementTween);
    
        cameraTween.start();
    }
}

export default Router;