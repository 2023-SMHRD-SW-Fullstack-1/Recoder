import * as THREE from 'three';

/** 랙 생성 모듈 함수!! 
 * sizeX => 선반의 가로
 * sizeZ => 선반의 세로
 * rackFloor => 선반의 층수
 * rackPos => 선반 위치
*/
export default function createRack(sizeX, sizeZ, rackFloor, rackPos) {	

	const board = new THREE.BoxGeometry(sizeX, 0.02, sizeZ, 1, 1, 1);
	// const pilar = new THREE.BoxGeometry(0.05, sizeY, 0.05);
	// const board = new THREE.BoxGeometry(1, 0.02, 1, 1, 1, 1);
	const pilar = new THREE.BoxGeometry(0.05, 1, 0.05);
	// const material = new THREE.MeshBasicMaterial({color:0xffffff})
	const randomColor = new THREE.Color(
		Math.random(),
		Math.random(),
		Math.random()
	);

	const material = new THREE.MeshBasicMaterial({color:0xf1c2ff})
	
	const boardMesh = new THREE.Mesh(board, material);

	const pilar1 = new THREE.Mesh(pilar, material);
	const pilar2 = new THREE.Mesh(pilar, material);
	const pilar3 = new THREE.Mesh(pilar, material);
	const pilar4 = new THREE.Mesh(pilar, material);

	// 수정 필요
	// boardMesh.position.set(rackPos.x, 0.2, rackPos.z);

	const boardBox = new THREE.Box3().setFromObject(boardMesh);
	const pilarBox = new THREE.Box3().setFromObject(pilar1);
	const pilarYLen = pilarBox.max.y - pilarBox.min.y;

	pilar1.position.set(boardBox.min.x, boardBox.max.y + pilarYLen/2 - pilarYLen * 0.2, boardBox.min.z);
	pilar2.position.set(boardBox.max.x, boardBox.max.y + pilarYLen/2 - pilarYLen * 0.2, boardBox.min.z);
	pilar3.position.set(boardBox.max.x, boardBox.max.y + pilarYLen/2 - pilarYLen * 0.2, boardBox.max.z);
	pilar4.position.set(boardBox.min.x, boardBox.max.y + pilarYLen/2 - pilarYLen * 0.2, boardBox.max.z);


	const superGroup = new THREE.Group();
	let group = new THREE.Group();
	
	boardMesh.name = "판11111"
	group.add(boardMesh, pilar1, pilar2, pilar3, pilar4);

	superGroup.add(group);

	// 층 입력 받으면 층 수만큼 올리는 코드 작성하기!
	for(let i = 0; i < rackFloor - 1; i++){
		let group1 =  group.clone();
		group1.position.y += 1 //sizeY
		superGroup.add(group1);
		group = group1.clone();
	}

	// 수정 필요
	superGroup.name = "선반"
	superGroup.position.set(rackPos.x, 0.2, rackPos.z)

	return superGroup;
}