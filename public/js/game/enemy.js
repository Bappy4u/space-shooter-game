import * as THREE from 'three';
import plutoTexture from '../../img/pluto.jpg';


const textureLoader = new THREE.TextureLoader();
export const enemy = (x, z) => {
    const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
    const material = new THREE.MeshStandardMaterial( {
        map: textureLoader.load(plutoTexture)
    } );
    const enemy = new THREE.Mesh( geometry, material );
    enemy.position.set(x,0,-10);
    enemy.rotateX(0.5 * Math.PI);
    return enemy;
};