import React from 'react'
import '../Out_01.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// 캘린더 라이브러리
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Out_01() {

  // 출고 될 제품 리스트 담을 배열
 
  const [outStockList1, setOutStockList1] = useState([]);
  const [outStockList2, setOutStockList2] = useState([]);
  const [outStockList3, setOutStockList3] = useState([]);
  // const [outStockList, setOutStockList] = useState([`${outStockList1}`,`${outStockList2}`,`${outStockList3}`])
  const [outStockList, setOutStockList] = useState([{outStockList1},{outStockList2},{outStockList3}])

  //출고 될 제품 리스트 정보 불러오기
  const getOutStock = async()=>{

    const userData = {
      id: "user_id 001"
    }
    try {
      const response = await axios.post('http://localhost:8000/out/create',userData)

      if (response.status === 200) {
        console.log('출고예정 리스트 가져오기 성공');
        // console.log(response.data);
        console.log(response.data)
        console.log(response.data[0].Company.Warehouses[0].Racks[0].Loadings);
        
        // 값 추출용 
        // console.log(response.data[0].Company.Loadings[0].Rack.Warehouse);
        setOutStockList1(response.data);
      //   setOutStockList2(response.data.Company.Loadings);
      //   setOutStockList3(response.data.Company.Loadings.Rack);
      //   setOutStockList(`${outStockList1}`,`${outStockList2}`,`${outStockList3}`)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("데이터 출력 실패")

      }
    }
  }

  // 테스트 데이터 -> 서버 연결 되면 axios로 데이터 받아서 활용
  const testData = [
    {
      sotckID: "A0001",
      date: "2023-01-01",
      expirationDate: "2023-12-25",
      num: "24"
    }, {
      sotckID: "A0002",
      date: "2023-01-01",
      expirationDate: "2023-12-25",
      num: "24"
    }, {
      sotckID: "A0003",
      date: "2023-01-01",
      expirationDate: "2023-12-25",
      num: "24"
    }, {
      sotckID: "A0004",
      date: "2023-01-01",
      expirationDate: "2023-12-25",
      num: "24"
    }
  ];

  // 배송지 필터 데이터
  const testData2 = ["이마트", "홈플러스", "카카오스토어", "다이소"];

  // 테이블 클릭시 추가 화면 렌더링 함수
  const [rowOutTable, setRowOutTable] = useState(Array(testData.length).fill(false));

  const handleRowClick = (index) => {
    const newRowOutTable = [...rowOutTable];
    newRowOutTable[index] = !newRowOutTable[index];
    setRowOutTable(newRowOutTable);
  };

  // 출고 추가정보 데이터 관리

  const [outLoading, setOutLoading] = useState({
    loaing_cnt: '',
    created_at: ''
  })

  const outLoadingHandler = (e) => {
    if (e.target.name == 'created_at') {
      console.log(e.target.value)
      // setOutLoading({ [created_at]: e.target.value })
    }
    else {
      console.log(e.target.value)
      // setOutLoading({ [loading_cnt]: e.target.value })
    }

    const { loading_cnt, created_at } = e.target
    setOutLoading({
      ...outLoading,
      [loading_cnt]: e.target.value,
      [created_at]: e.target.value
    })
  };

  const { loading_cnt, created_at } = outLoading;

  // 출고 버튼 클릭 이벤트
  // const out_stock =  async()=>{
  //   try {
  //     const response = await axios.post('/out/loading')

  //     if (response.status === 200) {
  //       console.log('출고데이터 전송 성공');
  //       console.log(response.data);
  //       console.log(response.data[0]);

  //       setOutStockList(response.data);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       alert("데이터 출력 실패")

  //     }
  //   }
  // }

  // 직접선택 추가 핸들러
  const [showInput,setShowInput] = useState(false);
  const handleInputPluse = (e)=>{
    console.log("배송지 선택 클릭");
    console.log(e.target.value);
    if(e.target.value =="직접입력"){
    setShowInput(true) }
    else{
      setShowInput(false)
    }
  }


  useEffect(() => {

    getOutStock();
  }, [])

  return (
    <div id='out_all'>
      <div id='out_top'>
        <span id="out_title">출고</span>

        <div id="out_input_container">
          <input id="out_input" placeholder="제품ID 제품명 검색" />
          <FontAwesomeIcon id="out_input_icon" icon={faMagnifyingGlass} />
          <select id="out_filter">filter</select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="out_table">
        <table className="container">
          <thead>
            <tr>
              <th>
                <h1>제품ID</h1>
              </th>
              <th>
                <h1>제품명</h1>
              </th>
              <th>
                <h1>수량</h1>
              </th>
              <th>
                <h1>입고일</h1>
              </th>
              <th>
                <h1>유통기한</h1>
              </th>
              <th>
                <h1>적재창고</h1>
              </th>
              <th>
                <h1>적재위치</h1>
              </th>
              <th>
                <h1>코드번호</h1>
              </th>
            </tr>
          </thead>
          <tbody>
          {outStockList1.map((companyItem, companyIndex) => (
  <React.Fragment key={companyIndex}>
    {companyItem.Company.Warehouses.map((warehouseItem, warehouseIndex) => (
      <React.Fragment key={warehouseIndex}>
        {warehouseItem.Racks.map((rackItem, rackIndex) => (
          <React.Fragment key={rackIndex}>
            {rackItem.Loadings.map((loadingItem, loadingIndex) => (
              <React.Fragment key={loadingIndex}>
                <tr
                  onClick={() => handleRowClick(loadingIndex)}
                  className={rowOutTable[loadingIndex] ? 'selected' : ''}
                >
                  <td className={`out_table_id ${rowOutTable[loadingIndex] ? 'open' : ''}`}>
                    {loadingItem.loading_seq}
                  </td>
                  <td>{loadingItem.Stock.stock_name}</td>
                  <td>{loadingItem.loading_cnt}</td>
                  <td>{loadingItem.created_at.substring(0, 10)}</td>
                  <td>{loadingItem.Stock.stock_expired.substring(0, 10)}</td>
                  <td>{warehouseItem.wh_name}</td>
                  <td>{rackItem.rack_seq}</td>
                  <td>{loadingItem.Stock.stock_barcode}</td>
                </tr>
                {rowOutTable[loadingIndex] && (
                  <tr>
                    <td id='out_table_fold' colSpan={8}>
                      <span>출고일자</span>
                      <input type='date' name='created_at' onChange={outLoadingHandler} /><br />
                      <span>출고수량</span><input name='loading_cnt' type='number' onChange={outLoadingHandler} /><br />
                      <span>배송지</span>
                      <select id="out_filter" onClick={handleInputPluse}>
                        {rackItem.Loadings.map((load, loadIndex) => (
                          <option key={loadIndex} value={load.Stock.stock_shipping_des}>
                            {load.Stock.stock_shipping_des}
                          </option>
                        ))}
                        <option value="직접입력">직접입력</option>
                      </select>
                      {showInput && (
                        <input type='text' placeholder='배송지 입력' />
                      )}
                      <button className="custom-btn btn-1">출고</button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
  </React.Fragment>
))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Out_01;