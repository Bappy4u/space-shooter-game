import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
const player = require('./game/player').player;
const Camera = require('./threejs/camera').initCamera;
const KeyboardHandler = require('./game/keyboardController');
const Enemy = require('./game/enemy').enemy;

const getBullet = require('./game/shooter').bullet;

import * as lighting from './threejs/lighting';
import starsTexture from '../img/stars.jpg';

const camera = Camera();
const scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const ambientLight = lighting.generateAmbientLight();
const pointLight = lighting.generatePointLight();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);


// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

const player1 = player();

scene.add(pointLight);
scene.add(ambientLight);
scene.add(player1);

const keyboardHandler = new KeyboardHandler();
window.addEventListener('keydown', (event) => {
    const key = event.key;
    console.log('entered');
    console.log(key);

    keyboardHandler.handleKeyPress(key, player1, camera.getFilmWidth(), camera.getFilmHeight());

});
const bullets = [];
const bulletbbs =  [];

const shoot = () => {
    let bulletObject = getBullet(player1.position.x, player1.position.y, player1.position.z-2);
    bullets.push(bulletObject.bullet);
    bulletbbs.push(bulletObject.bulletbb);
    scene.add(bulletObject.bullet);
    console.log(bulletbbs[0]);


};

window.addEventListener('click', shoot);
let shooting;
window.addEventListener('mousedown', ()=> {
    shooting = setInterval(shoot, 200);
});

window.addEventListener('mouseup', () => {
    clearInterval(shooting);
});

const particlesObj = [];
function getParticle(x,y, z){
    const geometry = new THREE.OctahedronGeometry(0.04, 0);
    const material = new THREE.MeshStandardMaterial( {color: 0xFF8F01} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.z = - camera.getFilmHeight()/2;

    cube.position.set(x, y, z);
    scene.add( cube );

    return cube;
}

const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;


const generateParticles = (numberOfParticles) => {
    const particles = [];
    for (let i = 0; i<numberOfParticles; i++){
        let rand1 = getRandom(-20, 20);
        let rand2= getRandom(-20, 5);
        let rand3 =  getRandom(-20, 20);
        const cube = getParticle(rand1,rand2, rand3);
        particles.push(cube);
    }

    return particles;
};

const particles = generateParticles(400);


const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,

    1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 1, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );

const geobb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
geobb.setFromObject(mesh);


scene.add(mesh);
const getEnemy = () => {
    const x = getRandom(-(camera.getFilmHeight()/2)-2,camera.getFilmHeight()/2)
    const enemy = Enemy(x,5);
    return enemy;
};


const enemies = [];
const generateEnemy =() => {

    const enemy = getEnemy();
    scene.add(enemy);

    enemies.push(enemy);

};

// setInterval(generateEnemy, 2000);

animationLoop();

function animationLoop() {


    for(let particle of particles){
        if (particle.position.z > camera.getFilmHeight()){
            particle.position.z = - camera.getFilmHeight();

        }
        particle.rotateY(0.005);
        particle.position.z +=.04;
    }
    for(let enemy of enemies){

        enemy.position.z +=.04;
    }

    for(let i=0; i<bullets.length; i++){
        bulletbbs[i].copy( bullets[i].geometry.boundingBox ).applyMatrix4( bullets[i].matrixWorld );

        if (bullets[i].position.z > camera.getFilmHeight()){
            bullets[i].position.z = - camera.getFilmHeight();

        } else{
            // bullet.dispose();

        }

        bullets[i].rotateY(0.005);
        bullets[i].position.z -=.13;
    }
    checkCollisions();

    renderer.render(scene, camera);
    requestAnimationFrame(animationLoop);
}


function checkCollisions(){

    for( let i=0; i<bulletbbs.length; i++){
        if(geobb.intersectsBox(bulletbbs[i])){
            mesh.material.opacity = 0;
        }
    }

}
