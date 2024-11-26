/// <reference path='./vendor/babylon.d.ts' />

// get our canvas
const canvas = document.getElementById('renderCanvas');

// create a BabylonJs engine
const engine = new BABYLON.Engine(canvas, true);

// camera
function createCamera(scene) {
    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI*3.5, Math.PI / 2.15,0, new BABYLON.Vector3.Zero(), scene);
    //let user move our camera

    camera.panningSensibility = 15000;
    camera.attachControl(canvas);

    // limit camera movement
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 12;
    
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.2;
    light.groundColor = new BABYLON.Color3.Gray();
}

function createRoom(scene) {
    // Material para as paredes
    const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    const wallMaterial2 = new BABYLON.StandardMaterial("wallMaterial2", scene);
    const wallTexture = new BABYLON.Texture("/assets/images/toque-fino.png", scene);
    const wallTexture2 = new BABYLON.Texture("/assets/images/cinza-claro.png", scene);
    // escala da textura
    wallTexture.uScale = 1.5;
    wallTexture.vScale = 1.5;
    wallMaterial.diffuseTexture = wallTexture;

    wallTexture2.uScale = 1.5;
    wallTexture2.vScale = 1.5;
    wallMaterial2.diffuseTexture = wallTexture2;

    
    // Material para o chão
    const floorMaterial = new BABYLON.StandardMaterial("floorMaterial", scene);
    floorMaterial.diffuseTexture = wallTexture2;

    // Dimensões da sala
    const roomWidth = 12.2;
    const roomHeight = 8.5;
    const roomDepth = 12.2;

    wallMaterial.backFaceCulling = true;
    floorMaterial.backFaceCulling = false;
    

    // Chão
    const floor = BABYLON.MeshBuilder.CreatePlane("floor", { width: roomWidth, height: roomDepth }, scene);
    floor.rotation.x = Math.PI / 2; // Deitar o plano
    floor.position.y = -3.2; // Altura do chão
    floor.material = floorMaterial;

    // Parede de trás
    const backWall = BABYLON.MeshBuilder.CreatePlane("backWall", { width: roomWidth, height: roomHeight }, scene);
    backWall.position.z = roomDepth / 2; // Ajustar posição
    backWall.position.y = roomHeight / 8.4; // Altura centralizada
    backWall.material = wallMaterial2;

    // Parede da frente
    const frontWall = BABYLON.MeshBuilder.CreatePlane("frontWall", { width: roomWidth, height: roomHeight }, scene);
    frontWall.position.z = roomDepth / 2; // Ajustar posição
    frontWall.position.y = roomHeight / 8.4; // Altura centralizada
    frontWall.rotation = Math.PI; // Inverter para ficar visível
    frontWall.material = wallMaterial2;

    // Parede esquerda
    const leftWall = BABYLON.MeshBuilder.CreatePlane("leftWall", { width: roomDepth, height: roomHeight }, scene);
    leftWall.position.x = -roomWidth / 2; // Ajustar posição
    leftWall.position.y = roomHeight / 8.4; // Altura centralizada
    leftWall.rotation.y = -Math.PI / 2; // Rotação para alinhar
    leftWall.material = wallMaterial2;

    // Parede direita
    const rightWall = BABYLON.MeshBuilder.CreatePlane("rightWall", { width: roomDepth, height: roomHeight }, scene);
    rightWall.position.x = roomWidth / 2; // Ajustar posição
    rightWall.position.y = roomHeight / 8.4; // Altura centralizada
    rightWall.rotation.y = Math.PI / 2; // Rotação para alinhar
    rightWall.material = wallMaterial2;

    // Teto
    const ceiling = BABYLON.MeshBuilder.CreatePlane("ceiling", { width: roomWidth, height: roomDepth }, scene);
    ceiling.rotation.x = -Math.PI / 2; // Deitar o plano invertido
    ceiling.position.y = roomHeight - 3.25; // Altura do teto
    ceiling.material = wallMaterial; // Use uma textura diferente se quiser
}


function createFurniture(scene) {
    BABYLON.SceneLoader.ImportMesh('', '/assets/models/', 'armarioCozinha.glb', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.scaling = new BABYLON.Vector3(2.3, 2.3, 2.3);
            const armarioProfundidade = 2;  // Profundidade do armário, ajuste conforme o tamanho real do modelo
            mesh.position = new BABYLON.Vector3(5.5, 0.15, 3.25);  // Posição ajustada para a parede de fundo
        });
    });
}

function addFurnitureOnClick() {
    const addButton = document.getElementById('addFurnitureButton');
    addButton.addEventListener('click', () => {
        // Create a new scene or add furniture to the existing scene
        createFurniture(mainScene);
    });
}


function createScene() {
    // create a scene
    const scene = new BABYLON.Scene(engine);

    // deixando o background escuro 
    // scene.clearColor = new BABYLON.Color3.Black();

    createCamera();

    createLight(scene);

    createRoom(scene);

    // createFurniture(scene);

    return scene;
}

// create a instance of scene
const mainScene = createScene();

addFurnitureOnClick();


engine.runRenderLoop(() => {
    mainScene.render();
});


