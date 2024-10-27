/// <reference path='./vendor/babylon.d.ts' />

// get our canvas
const canvas = document.getElementById('renderCanvas');


// create a BabylonJs engine
const engine = new BABYLON.Engine(canvas, true);


function createScene() {
    // create a scene
    const scene = new BABYLON.Scene(engine);

    // create a camera
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -25), scene);
    camera.attachControl(canvas, true);

    // create a light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    // create a box
    const box = new BABYLON.MeshBuilder.CreateBox('box', {
        size: 2,
        depth: 2,
        width: 2.5,
        height: 1
    }, scene);
    box.rotation = new BABYLON.Vector3(2, 0.5, 0.5);

     // create a sphere
     const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {}, scene);
     sphere.position = new BABYLON.Vector3(2.5, 2.5, 0);

    // create a plane
    const plane = new BABYLON.MeshBuilder.CreatePlane('plane', {}, scene);
    plane.position.y = -5;    
    plane.position.x = -3.5;    

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

// create a instance of scene
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});


