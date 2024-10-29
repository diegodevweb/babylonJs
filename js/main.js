/// <reference path='./vendor/babylon.d.ts' />

// get our canvas
const canvas = document.getElementById('renderCanvas');


// create a BabylonJs engine
const engine = new BABYLON.Engine(canvas, true);


function createScene() {
    // create a scene
    const scene = new BABYLON.Scene(engine);

    // types of cameras
    // const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -25), scene);
    // const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, -25), scene);
    const camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, -25), scene);
    camera.radius = 2;
    camera.attachControl(canvas, true);

    // types of lights
    // const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);
    // const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0,5,0), scene);
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(5,-1,4), scene);

    // create a box
    const box = new BABYLON.MeshBuilder.CreateBox('box', {
        size: 2,
        depth: 2,
        width: 2.5,
        height: 1
    }, scene);
    box.rotation = new BABYLON.Vector3(2, 0.5, 0.5);
    camera.lockedTarget = box;

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

    // create a material
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseColor = new BABYLON.Color3(0, 1, 1);

    // material.emissiveColor = new BABYLON.Color3(0, 1, 0);

    box.material = material;

    // create a texture
    const material2 = new BABYLON.StandardMaterial('material2', scene);
    material2.diffuseTexture = new BABYLON.Texture('assets/images/dark_rock.png', scene);

    sphere.material = material2;

    return scene;
}

// create a instance of scene
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});


