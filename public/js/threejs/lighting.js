import * as THREE from "three";

export function generateAmbientLight() {
    let ambientLight = new THREE.AmbientLight(0x505050);
    return ambientLight;
}

export function generatePointLight(){
    let pointLight = new THREE.PointLight(0xdddddd);
    pointLight.position.set(-5, 10, 3);
    return pointLight;

}