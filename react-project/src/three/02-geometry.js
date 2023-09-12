import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import fork from './fork.gltf'
import dat from 'dat.gui'

export default class App {
    constructor() {
        const divContainer = document.querySelector('#webgl-container');
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true }) // 계단 현상 없이 부드럽게
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene(); // scene 객체
        this._scene = scene;
        scene.background = new THREE.Color(0xFFFFFF);

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        // _로 시작하는 이유 app 클래스 내부에서만 호출

        window.onresize = this.resize.bind(this); // 창 크기가 변경될 떄마다 변경
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 5;
        camera.position.y = 2;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 10;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);

        // const light2 = new THREE.DirectionalLight(color, intensity);
        // light.position.set(1, 2, -4);
        // this._scene.add(light2);
    }

    _setupModel() {
        // const geometry = new THREE.ConeGeometry();
        // const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
        // const cube = new THREE.Mesh(geometry, fillMaterial);
        
        // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
        // const line = new THREE.LineSegments(
            //     new THREE.WireframeGeometry(geometry), lineMaterial
            // );
            
        // const group = new THREE.Group()
        // group.add(cube);
        // group.add(line);
        
        // const group2 = group.clone();
        // group2.position.set(3, 4, 5)
        
        // this._scene.add(group);
        // this._scene.add(group2);
        // this._cube = group;
        
        // console.log(group.position)
        // console.log(group2.position)
        
        // const loader = new GLTFLoader();

        // loader.load(fork, (gltf) => {
            
            //     console.log(gltf);
            
            //     gltf.scene.scale.set(0.2, 0.2, 0.2)
            
            //     gltf.scene.rotation.y = Math.PI;
            
            //     this._scene.add(gltf.scene);
            
            // }, undefined, (error) => {
                
                //     console.error(error);
                
                // });

        // 바닥 시작
        const geometry = new THREE.BoxGeometry(100, 0.01, 100);
        
        // const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x357755, shininess: 100 });
        const fillMaterial = new THREE.MeshStandardMaterial({ color: 0x357755, roughness: 1000 , metalness: 1});
        
        const cube = new THREE.Mesh(geometry, fillMaterial);
        // cube.position.y -= 0.045;
        
        this._scene.add(cube);
        // 바닥 끝
        
        // 판자 시작
        // 판자 저장 배열
        let boards = []
        let rackes = []
        
        const gui = new dat.GUI();
        
        const tempCube = this._createRack( "11", 1, 3,1, 7)
        // gui에서 객체 속성
        gui.add(tempCube.position, 'x', -1, 10, 0.1);
        gui.add(tempCube.position, 'y', -1, 10, 0.1);
        gui.add(tempCube.position, 'z', -1, 10, 0.1);
        // gui를 html에 추가하는 코드
        document.body.appendChild(gui.domElement);

        const tempCub2e = this._createRack( "11", 1, 3,1, 7)

        tempCub2e.position.x = 10
        
    }
    
   
        
    // 랙 가로, 세로, 선반 이름, 선반 높이, 몇 층
    _createRack(name, sizeX, sizeZ, sizeY, floor) {
        const superGroup = new THREE.Group()
        let group = new THREE.Group()
        
        
        const board = new THREE.BoxGeometry(sizeX, 0.02, sizeZ, 1, 1, 1);
        const pilar = new THREE.BoxGeometry(0.05, sizeY, 0.05)
        const fillMaterial3 = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })       
        
        const boardMesh = new THREE.Mesh(board, fillMaterial3);
        const pilarMesh1 = new THREE.Mesh(pilar, fillMaterial3);
        const pilarMesh2 = new THREE.Mesh(pilar, fillMaterial3);
        const pilarMesh3 = new THREE.Mesh(pilar, fillMaterial3);
        const pilarMesh4 = new THREE.Mesh(pilar, fillMaterial3); 
        
        boardMesh.position.y = 0.2
        const box = new THREE.Box3().setFromObject(boardMesh);
        const box1 = new THREE.Box3().setFromObject(pilarMesh1);
        const pilarYLen = box1.max.y - box1.min.y;
        
        pilarMesh1.position.set(
            box.min.x,
            box.min.y + pilarYLen/2- pilarYLen*0.2, 
            box.min.z
        );
        pilarMesh2.position.set(box.max.x, box.min.y + (box1.max.y - box1.min.y)/2- (box1.max.y - box1.min.y)*0.2, box.min.z);
        pilarMesh3.position.set(box.max.x, box.min.y + (box1.max.y - box1.min.y)/2- (box1.max.y - box1.min.y)*0.2, box.max.z);
        pilarMesh4.position.set(box.min.x, box.min.y + (box1.max.y - box1.min.y)/2- (box1.max.y - box1.min.y)*0.2, box.max.z);
        console.log(box1.min.y)
            
        
        group.add(boardMesh, pilarMesh1, pilarMesh2, pilarMesh3, pilarMesh4)
            
        superGroup.add(group);
        for(let i = 0; i < floor - 1; i++){
            let group1 =  group.clone();
            group1.position.y += sizeY
            superGroup.add(group1);
            group = group1.clone();
        }
            
        superGroup.name = name;        
        this._scene.add(superGroup)
            
                
        return superGroup
    }
    
    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
    
    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001;
        // this._cube.rotation.x = time;
        // this._cube.rotation.y = time;
    }
}