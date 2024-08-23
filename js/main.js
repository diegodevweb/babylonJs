/// <reference path='./vendor/babylon.js' />

// get our canvas

const canvas = document.getElementById('renderCanvas');

// create a BabylonJS engine object, true for antialias
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
    // create a scene
    const scene = new BABYLON.Scene(engine);

    // create a camera
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
    camera.attachControl(canvas, true);

    // create a light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    // create a box
    const box = BABYLON.MeshBuilder.CreateBox('box', {}, scene);

    // create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {}, scene);
    sphere.position = new BABYLON.Vector3(2.5, 0, 0);

    // create a plane
    const plane = BABYLON.MeshBuilder.CreatePlane('plane', {}, scene);
    plane.position = new BABYLON.Vector3(-2.5, 0, 0);

    // create a tiled box
    const tiledBox = BABYLON.MeshBuilder.CreateTiledBox('tiledBox', {}, scene);
    tiledBox.position = new BABYLON.Vector3(0, 2.5, 0);

    // create a line
    const points = [
        new BABYLON.Vector3(2, 0, 0),
        new BABYLON.Vector3(2, 2, -1),
        new BABYLON.Vector3(2, 1, 0)
    ];

    const lines = BABYLON.MeshBuilder.CreateLines('lines', {points}, scene);


    return scene;
}

// create our scene
const scene = createScene();

// running the render loop
engine.runRenderLoop(() => {
    scene.render();
})