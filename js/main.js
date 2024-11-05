/// <reference path='./vendor/babylon.d.ts' />

// get our canvas
const canvas = document.getElementById('renderCanvas');

// create a BabylonJs engine
const engine = new BABYLON.Engine(canvas, true);

// camera
function createCamera(scene) {
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0,15, new BABYLON.Vector3.Zero(), scene);
    //let user move our camera
    camera.attachControl(canvas);

    // limit camera movement
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 20;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;
    light.groundColor = new BABYLON.Color3.Magenta();
}

function createSun(scene) {
    const sun = BABYLON.MeshBuilder.CreateSphere('sun', {segments: 16, diameter: 4}, scene);
    const sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
    sunMaterial.diffuseTexture = new BABYLON.Texture('/assets/images/sun.jpg', scene);
    sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // objeto com luz própria
    // sunMaterial.emissiveColor = new BABYLON.Color3.Yellow();
    sun.material = sunMaterial;
}

function createPlanet(scene) {
    const planetMaterial = new BABYLON.StandardMaterial('planetMaterial', scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture('/assets/images/sand.png', scene);
    // tira o reflexo do planeta
    planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    const planet = BABYLON.MeshBuilder.CreateSphere('planet', {segments: 16, diameter: 1}, scene);
    planet.material = planetMaterial;
    planet.position.x = 4.5;
}

function createScene() {
    // create a scene
    const scene = new BABYLON.Scene(engine);

    // deixando o background escuro 
    scene.clearColor = new BABYLON.Color3.Black();

    createCamera();

    createLight(scene);

    createSun(scene);

    createPlanet(scene);

    return scene;
}

// create a instance of scene
const mainScene = createScene();

engine.runRenderLoop(() => {
    mainScene.render();
});


