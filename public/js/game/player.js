import * as THREE from "three";
import shipTexture from '../../img/ship.jpg';
const textureLoader = new THREE.TextureLoader();
export function player(){

    const plane = createCapsultObject(.17, 0xFF5A01);
    const plane1 = createCapsultObject(.17, 0xFF5A01);
    const player = createCapsultObject(.60, 0xFF5A01);

    plane.position.set(.8,.3,.5);
    plane1.position.set(-.8, .3, .5);
    player.add(plane);
    player.add(plane1);
    player.position.z = 5;
    player.rotation.x = -.5 * Math.PI;
    const side1 = generateSpaceSide();
    side1.position.set(1.1, -.7, .1);
    side1.rotation.set(.6 * Math.PI, -.1 * Math.PI, 0.1 * Math.PI);
    const side2 = generateSpaceSide();
    side2.position.set(-1.1, -.7, .1);
    side2.rotation.set(.6 * Math.PI, .1 * Math.PI, -0.1 * Math.PI);
    player.add(side1);
    player.add(side2);

    return player;
}

const generateSpaceSide = ()=> {

    const geo2 = new THREE.BoxGeometry( 1.5, .2, 1 );
    const material2 = new THREE.MeshStandardMaterial( {color: 0xFFE401} );
    const side = new THREE.Mesh( geo2, material2 );

    return side;
};

const createCapsultObject = (radius, color) => {
    const geometry = new THREE.CapsuleGeometry( radius, 2.6, 10, 15 );
    const material = new THREE.MeshStandardMaterial( {
        map: textureLoader.load(shipTexture)
    } );
    const capsule = new THREE.Mesh(geometry, material);
    return capsule;
};