import * as THREE from 'three';
import fireTexture from '../../img/fire.jpg';


const textureLoader = new THREE.TextureLoader();
export const bullet = (x, y, z) => {
    const geometry = new THREE.BoxGeometry(1,1,1,1,1,1);
    const material =  new THREE.MeshStandardMaterial( {
            map: textureLoader.load(fireTexture)
        } );
    // const geometry = new THREE.CapsuleGeometry( .2, .1, 4, 8 );
    // const material = new THREE.MeshStandardMaterial( {
    //     map: textureLoader.load(fireTexture)
    // } );
    const bullet = new THREE.Mesh( geometry, material );
    bullet.position.set(x,y,z);
    bullet.rotateX(0.5 * Math.PI);

    const bulletbb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    bulletbb.setFromObject(bullet);
    return {
        bullet,
        bulletbb
    };
};