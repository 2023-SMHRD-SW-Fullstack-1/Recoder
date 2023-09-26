import React, { useState, useEffect, useRef, useCallback } from "react";
import "../Sidebar.css";
import "../App.css";
import App from "../three/create_warehouse";
// import '../three/02-geometry.css'
import axios from "axios";
import "../css/CreateWarehouse.css";

// let meshArr = []
// const initApp = new App( 1, 1, 1, 1, meshArr);

const CreateWarehouse = ({ com_seq, newWareData }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const modalBackground = useRef();

	const [wh_seq, setWh_seq] = useState(null);
	const [warehouseWidth, setWarehouseWidth] = useState(null);
	const [warehouseLength, setWarehouseLength] = useState(null);

	// 전역 변수
	// let 메쉬배열 = []
	// 테스트
	const [메쉬배열, setTest] = useState([]);
	const [canAddLoading, setCanAddLoading] = useState(false)

	const [rackName, setRackName] = useState("");
	const [rackWidth, setRackWidth] = useState(0);
	const [rackLength, setRackLength] = useState(0);
	const [rackFloor, setRackFloor] = useState(0);

	// 원래 코드
	// useEffect(() => {
	//   axios.get('http://localhost:8000/user')
	//     .then((res) => {
	//       console.log("createWarehouse에서 받은 정보", res.data);
	//       const warehouseData = res.data.Company.Warehouses;
	//       const lastWarehouse = warehouseData[warehouseData.length - 1];
	//       console.log("가장 최근 창고 정보 :", lastWarehouse);

	//       // const warehouseWidth = parseInt(lastWarehouse.wh_width);
	//       // const warehouseLength = parseInt(lastWarehouse.wh_length);
	//       // console.log("창고 가로 길이:", warehouseWidth);
	//       // console.log("창고 세로 길이:", warehouseLength);
	//       setWarehouseWidth(parseInt(lastWarehouse.wh_width));
	//       setWarehouseLength(parseInt(lastWarehouse.wh_length));
	//     })
	//     .catch((err) => {
	//       console.error(err);
	//     })
	// }, []);
	// 원래 코드

	const appInstance = useRef(null);

	const [rackX, setRackX] = useState(0);
	const [rackZ, setRackZ] = useState(0);
	const [rackRotateYN, setRackRotateYN] = useState("N");


	/** useEffect 처음 렌더링 실행 */
	useEffect(() => {
		console.log("useEffect 최초 1회 실행")


		console.log("여기", newWareData);
		console.log(newWareData.wh_seq);
		setWh_seq(newWareData.wh_seq);

		// const warehouseData = newWareData;
		// const lastWarehouse = warehouseData[warehouseData.length - 1];
		// console.log("가장 최근 창고 정보 :", lastWarehouse);

			 // 창고의 크기 설정 (가로, 세로)
			 // setWarehouseWidth(parseInt(newWareData.wh_width));
			 // setWarehouseLength(parseInt(newWareData.wh_length));

			// setWarehouseWidth(parseInt(localStorage.getItem("ware_width")));
			// setWarehouseLength(parseInt(localStorage.getItem("ware_length")));
			
			setWarehouseWidth(10); // 임시 데이터
			setWarehouseLength(10);
			console.log("dd")
		}, []);

	useEffect(()=>{
		if (warehouseWidth !== null && warehouseLength !== null) {
				console.log("지금!");
				appInstance.current = new App(
				warehouseWidth,
				warehouseLength,
				rackWidth,
				rackLength,
				메쉬배열
				);
		}
	}, [warehouseWidth, warehouseLength])

	/** 선반을 만들어주는 함수 */
	const createRack = (e) => {
		setModalOpen(false);
		e.preventDefault();

		const rack_info = {
			rackName: rackName,
			rackWidth: rackWidth,
			rackLength: rackLength,
			rackFloor: rackFloor,
			rackX: rackX,
			rackZ: rackZ,
			rackRotateYN: rackRotateYN,
			wh_seq:wh_seq
		};

		// 로컬 스토리지에 rackFloor값 저장
		localStorage.setItem('rackFloor', rackFloor);

		if (appInstance.current) {
			appInstance.current.setupMouseEvents(
				rackWidth,
				rackLength,
				parseInt(localStorage.getItem('rackFloor')) // 로컬 스토리지에서 rackFloor값 불러오기!
			);
			console.log("setupMouseEvent 실행!")
		}

		// let url = "http://localhost:8000/rack";
		// axios
		// .post(url, rack_info)
		// .then((res) => {
		// 	if (appInstance.current) {
		// 		appInstance.current.setupMouseEvents(
		// 			res.data.rack_width,
		// 			res.data.rack_length,
		// 			parseInt(localStorage.getItem('rackFloor')) // 로컬 스토리지에서 rackFloor값 불러오기!
		// 			);
		// 		}
		// })
		// .catch((error) => {
		// 	console.error(error);
		// });
	};

	const createLoading = (e) => {
		setCanAddLoading(!canAddLoading)

		if(appInstance.current) {
			appInstance.current.setupMouseEvents(
				rackWidth, rackLength, canAddLoading? "loading" : "rack"
			)
		}
	}

	/** 선반 정보를 DB에 저장 */
	const completeRack = (e) => {
		let result = []

		// const rack_info = {
		// 	rackName: rackName,
		// 	rackWidth: rackWidth,
		// 	rackLength: rackLength,
		// 	rackFloor: rackFloor,
		// 	rackX: rackX,
		// 	rackZ: rackZ,
		// 	rackRotateYN: rackRotateYN,
		// 	wh_seq:wh_seq
		// };

		let _메쉬배열 = [...메쉬배열]
		_메쉬배열.forEach(item => {
			result.push({
				rPos: {
					x: item.position.x,
					y: item.position.y,
					z: item.position.z
				},
			})
		})
		console.log("몇층인가", 메쉬배열)

		console.log("completeRack 함수 안", result)

		// console.log("생성하기")
		// let url = "http://localhost:8000/rack";
		// axios
		// .post(url, rack_info)
		// .then((res) => {
		// 	console.log(res);
			
		// 	if (appInstance.current) {
		// 		appInstance.current.setupMouseEvents(
		// 			res.data.rack_width,
		// 			res.data.rack_length,
		// 			parseInt(localStorage.getItem('rackFloor')) // 로컬 스토리지에서 rackFloor값 불러오기!
		// 			);
		// 		}
		// })
		// .catch((error) => {
		// 	console.error(error);
		// });
	}

	function get배열() {
		console.log("배열 확인", 메쉬배열)
		// 메쉬배열.forEach(item => {
		// 	console.log(`x: ${item.position.x}, z: ${item.position.z}`)
		// })
	}

	// 모달 창 끄는 부분
	const modalClose = (e) => {
		setModalOpen(false);
		console.log("wh_seq값좀 봅시다", wh_seq);
		e.preventDefault();
		console.log(
			`선반 이름: ${rackName}/ 가로: ${rackWidth}/ 세로: ${rackLength}/ ${rackFloor}층`
		);

		const rack_info = {
			rackName: rackName,
			rackWidth: rackWidth,
			rackLength: rackLength,
			rackFloor: rackFloor,
			rackX: rackX,
				rackZ: rackZ,
			rackRotateYN: rackRotateYN,
			wh_seq: wh_seq,
		};
		// 로컬 스토리지에 rackFloor값 저장
		localStorage.setItem("rackFloor", rackFloor);

		let url = "http://localhost:8000/rack";
		axios
			.post(url, rack_info)
			.then((res) => {
			console.log(res);

			if (appInstance.current) {
				appInstance.current.setupMouseEvents(
					res.data.rack_width,
					res.data.rack_length,
					parseInt(localStorage.getItem("rackFloor")) // 로컬 스토리지에서 rackFloor값 불러오기!
				);
			}
			})
			.catch((error) => {
			console.log(`axios에러`);
			// console.error(error);
		});
	};

	return (
		<div>
			{/* <button>선반 생성</button> */}
			<div className={"btn-wrapper"}>
				<span>
					<input type="text" placeholder="선반의 가로 길이"/>
					<input type="text" placeholder="선반의 세로 길이"/>
					<button className={"modal-open-btn"} onClick={()=>setModalOpen(true)}>
						선반 생성
					</button>
				</span>
				{/* <button onClick={createLoading}> loading 추가 {canAddLoading?"O":"X"} </button>
				<button onClick={completeRack}>생성</button>
				<button onClick={get배열}>배열 확인</button> */}
			</div>

			<div id="webgl-container" >
			</div> {/* id="webgl-container" */}
			{modalOpen && (
				<div className={"modal-container"} ref={modalBackground}
				onClick={(e)=> {
					if (e.target === modalBackground.current) {
						setModalOpen(false);
					}
				}} >
					{/* 모달창 열었을때 나오는 부분 */}
					<div className={"modal-content"}>
						<div className="rack_create_all">
						<div className="rack_create_title">
								<h1 onClick={()=>{console.log("선반생ㄱ성")}}>선반생성</h1>
								<button
									className={"modal-close-btn"}
									>
									<img onClick={()=>{setModalOpen(false)}}
										src='/img/X_icon.png'
										// alt='side-button'
										width='20px'
										height='23px' />
								</button>
							</div>

							<table>
								<tbody>
									<tr>
										<td className="rack_create_container">
											<form>
												<div className='rack_name_input_container'>
													{/* 아이디 */}
													<input
														type="text"
														placeholder='선반 이름을 입력해주세요.'
														autoFocus
														value={rackName}
														onChange={(e) => setRackName(e.target.value)}
													/>
												</div>

												{/* 가로 */}
												<div className="rack_width_input_container">
													<input
														type="number"
														placeholder="가로 길이를 입력해주세요."
														value={rackWidth}
														onChange={(e) => setRackWidth(e.target.value)}
													/>
													</div>

													{/* 세로 */}
													<div className="rack_length_input_container">
													<input
														type="number"
														placeholder="세로 길이를 입력해주세요."
														value={rackLength}
														onChange={(e) => setRackLength(e.target.value)}
													/>
													</div>

													{/* 높이 */}
													<div className="rack_floor_input_container">
													<input
														type="number"
														placeholder="층을 입력해주세요."
														value={rackFloor}
														onChange={(e) => setRackFloor(e.target.value)}
													/>
													</div>

													{/* 생성완료 버튼 */}
													<div className="rack_create_submit_button">
													<button type="submit" className="create-button">
														생성하기
													</button>
												</div>
											</form>
										</td>
									</tr>
							</tbody>
						</table>
						</div>
					</div>
				</div>
			)} {/* 모달창 끝 */}
		</div>
	);
};

export default CreateWarehouse;
