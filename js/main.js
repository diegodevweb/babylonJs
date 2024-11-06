/// <reference path='./vendor/babylon.d.ts' />

// get our canvas
const canvas = document.getElementById('renderCanvas');

// create a BabylonJs engine
const engine = new BABYLON.Engine(canvas, true);

// camera
function createCamera(scene) {
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0,0, new BABYLON.Vector3.Zero(), scene);
    //let user move our camera
    camera.attachControl(canvas);

    // limit camera movement
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 20;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.3;
    // light.groundColor = new BABYLON.Color3.Magenta();
}

function createSun(scene) {
    const sun = BABYLON.MeshBuilder.CreateSphere('sun', {segments: 16, diameter: 4}, scene);
    const sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture('/assets/images/sun.jpg', scene);
    // ajuste para o sol nao ficar com reflexo
    sunMaterial.specularColor = new BABYLON.Color3.Black();
    sunMaterial.diffuseColor = new BABYLON.Color3.Black();
    // sunMaterial.diffuseTexture = new BABYLON.Texture('/assets/images/sun.jpg', scene);
    // sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // objeto com luz própria
    // sunMaterial.emissiveColor = new BABYLON.Color3.Yellow();
    sun.material = sunMaterial;

    // create sun light
    const sunLight = new BABYLON.PointLight('sunLight', new BABYLON.Vector3(0, 0, 0), scene);
    sunLight.intensity = 2;
}

function createPlanet(scene) {
    const planetMaterial = new BABYLON.StandardMaterial('planetMaterial', scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture('/assets/images/sand.png', scene);
    // tira o reflexo do planeta
    planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    const planet = BABYLON.MeshBuilder.CreateSphere('planet', {segments: 16, diameter: 1}, scene);
    planet.material = planetMaterial;
    planet.position.x = 0;
    planet.position.z = -8.5;
    planet.position.y = 0;
}

function createSkybox(scene) {
    const skybox = BABYLON.MeshBuilder.CreateBox('skybox', {size: 1000}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMaterial', scene);

    // removendo reflexo do skybox
    skyboxMaterial.specularColor = new BABYLON.Color3.Black();
    skyboxMaterial.diffuseColor = new BABYLON.Color3.Black();

    // textura do skybox
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/assets/images/skybox/skybox', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    // deixando o box visivel
    skyboxMaterial.backFaceCulling = false;

    // movendo skybox com camera
    skybox.infiniteDistance = true;

    skybox.material = skyboxMaterial;
}

// funcao para importar um modelo 3d
function createShip(scene) {    
    BABYLON.SceneLoader.ImportMesh('', '/assets/models/', 'spaceCraft1.obj', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
            mesh.position = new BABYLON.Vector3(0, -5, 10);
        });
    });
}

function createFurniture(scene) {
    BABYLON.SceneLoader.ImportMesh('', '/assets/models/', 'armario.obj', scene, (meshes) => {
        meshes.forEach((mesh) => {
            console.log('ola');
            // mesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
            mesh.position = new BABYLON.Vector3(0, -3, -12);
        });
    });
}

function createScene() {
    // create a scene
    const scene = new BABYLON.Scene(engine);

    // deixando o background escuro 
    // scene.clearColor = new BABYLON.Color3.Black();

    createCamera();

    createLight(scene);

    createSun(scene);

    createPlanet(scene);

    createSkybox(scene);

    createShip(scene);

    createFurniture(scene);

    return scene;
}

// create a instance of scene
const mainScene = createScene();

engine.runRenderLoop(() => {
    mainScene.render();
});


