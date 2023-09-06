import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import fork from './fork.gltf'

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
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
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

        const loader = new GLTFLoader();

        loader.load(fork, (gltf) => {

            console.log(gltf);

            gltf.scene.scale.set(0.2, 0.2, 0.2)

            this._scene.add(gltf.scene);

        }, undefined, (error) => {

            console.error(error);

        } );

        const geometry = new THREE.BoxGeometry(100, 0.09, 100);

        // const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x357755, shininess: 100 });
        const fillMaterial = new THREE.MeshStandardMaterial({ color: 0x357755, roughness: 1000 });

        const cube = new THREE.Mesh(geometry, fillMaterial);
        cube.position.y -= 0.045;

        this._scene.add(cube);
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