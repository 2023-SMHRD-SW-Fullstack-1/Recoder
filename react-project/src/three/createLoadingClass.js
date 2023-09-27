import * as THREE from 'three'

export default class createLoadingClass{
    
    
    constructor() {
        
        this.material = new THREE.MeshBasicMaterial({color:0xffffff})
        this.createLoading = this.createLoading.bind(this);
    }

    createLoading() {
        let 길이 = 0.9
        let geo = new THREE.BoxGeometry(길이, 길이, 길이)
        let mesh = new THREE.Mesh(geo, this.material);
        mesh.name = '짐'
        return mesh;
    }
}