import * as THREE from "three";

export function initCamera(){
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.z = 5;
    camera.position.y = 10;

    return camera

}

