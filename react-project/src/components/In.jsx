import React, { useEffect } from 'react'

import '../css/In.css'
// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const In = () => {

	function In() {
		// 테이블 클릭 ~
	}
	console.log(new Date())

	window.addEventListener('resize', e => {
		// console.log("브라우저 가로", window.innerWidth)
		// console.log(e)

		if(window.innerWidth < 600) {
			window.resizeTo(1200, window.innerHeight)
			console.log("11")
		}
	})

	return (
		<div id='in_all'>
			<div id="in_top">
				<span id='in_title'>입고</span>
				<div id='in_input_container'>
					<input type="text" id='in_input' />
					<FontAwesomeIcon id="in_input_icon" icon={faMagnifyingGlass} />
					<select id='out_filter'>filter</select>
				</div>
			</div>
			{/* 테이블 */}
			<div className="in_table">
				<table className="in_table_container">
					<thead>
						<tr>
							<th>Column 1</th>
							<th>Column 2</th>
							<th>Column 3</th>
							<th>Column 4</th>
							<th>Column 5</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Cell 1</td>
							<td>Cell 2</td>
							<td>Cell 3</td>
							<td>Cell 4</td>
							<td>Cell 5</td>
						</tr>
					</tbody>
					


				</table>
			</div>

			<div className="table-none">
				<table>
					<thead>
						<tr>
							<th>바코드</th>
							<th>품복코드</th>
							<th>대표이미지</th>
							<th>상품명</th>
							<th>옵션</th>
							<th>로케이션</th>
							<th>공급사명</th>
							<th>현재재고</th>
							<th>입고대기</th>
							<th>입고수량</th>
							<th>입고예정수량</th>
							<th>비고</th>
							<th>관리</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>AAAAAABDDO</td>
							<td>P0000BCH000D</td>
							<td><img src='https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80'/></td>
							<td>튤립라인 원피스</td>
							<td>화이트/M</td>
							<td> - </td>
							<td>자체공급</td>
							<td>11</td>
							<td>0</td>
							<td>1</td>
							<td><input type='text' /></td>
							<td><input type='text' /></td>
							<td><button type='button'>입고</button></td>
						</tr>
						<tr>
							<td>AAAAAABDD4</td>
							<td>P0000BCH000C</td>
							<td><img src='https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80'/></td>
							<td>튤립라인 원피스</td>
							<td>화이트/S</td>
							<td> - </td>
							<td>자체공급</td>
							<td>10</td>
							<td>0</td>
							<td>0</td>
							<td><input type='text' /></td>
							<td><input type='text' /></td>
							<td><button type='button'>입고</button></td>
						</tr>
					</tbody>
				</table>
			</div>
			{/* <img src='https://r77.cooltext.com/rendered/cooltext442599808940000.png' width={"30%"} style={{margin: "auto"}}></img> */}
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>dd</div>
			<div>88</div>
			<div>99</div>
			
		</div>  // div끝
	)
}

export default In