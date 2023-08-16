import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";



export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );





/*icosphere.traverse(function(node){
    if (node instanceof THREE.Mesh) {
        node.material = M_ocean;
    }
});*/

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const renderingwindow = renderer.domElement
document.body.appendChild( renderingwindow );

const controls = new OrbitControls(camera, renderingwindow);

const pointlight = new THREE.PointLight(0xffffff,1,50);
const pointlight2 = new THREE.PointLight(0xffffff,1,50);
const pointlight3 = new THREE.PointLight(0xffffff,1,50);
const ambientlight = new THREE.AmbientLight(0xffffff,0.5);
const geometry = new THREE.IcosahedronGeometry( 1, 0 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

controls.enableDamping = true;
controls.dampingFactor = 0.3;

camera.position.z = 2;
camera.lookAt(0,0,0);
pointlight.position.set(2,3,5);
pointlight2.position.set(-2,-3,-1);
pointlight3.position.set(-2,4,-5);
scene.add(pointlight);
scene.add(pointlight2);
scene.add(pointlight3);
scene.add(ambientlight);

let n_players = 1;
let points = [];
let players = [];

let isGameOver = false;
const playeradding = document.getElementById('playeradding');
const titleUI = document.getElementById('titleUI');
const addplayerbutton = document.getElementById('addplayer');
titleUI.onclick = function(){
    console.log("click");
    titleUI.remove();
    
    playeradding.style.display = "block";
};
const gamestartbutton = document.getElementById('startgame');
const playerlist = document.getElementById('playerlist')
const UIframe = document.getElementById("UI");

addplayerbutton.onclick = function(){
    const inputplayer = document.createElement("input");
    inputplayer.setAttribute("type","text");
    inputplayer.classList.add("playerlist");
    n_players++;
    inputplayer.setAttribute("value","プレイヤー" + n_players);
    playerlist.appendChild(inputplayer);
}
gamestartbutton.onclick = function(){
    for (let i = 0; i < n_players; i++){
        players.push(playerlist.children[i].value);
    }
    playeradding.remove();
    animate();
    UIframe.style.display = "block";
    
    const playerpanel = document.createElement("div");
    for (player of playerlist){
        playerpanel.textContent = players;
    }

    UIframe.appendChild(playerpanel);
}



//animate();

/*while (!isGameOver){
    for (let playing_player = 0; playing_player < n_players; playing_player++){
        //alert(playing_player + 1 + "番目のプレイヤーのターン");
        console.log("alert");
    }
    isGameOver = true;
}*/

export function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
