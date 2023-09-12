import React from 'react'
import '../Out_01.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// 캘린더 라이브러리

import 'react-calendar/dist/Calendar.css';

function Out_01() {





  // 출고 될 제품 리스트 담을 배열

  const [outStockList1, setOutStockList1] = useState([]);

const id = 'qwer'
  //출고 될 제품 리스트 정보 불러오기
  const getOutStock = async () => {

    const userData = {
      id: id
    }
    try {
      const response = await axios.post('http://localhost:8000/out/create', userData)

      if (response.status === 200) {
        console.log('출고예정 리스트 가져오기 성공');

        console.log(response.data)


        setOutStockList1(response.data);
        
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("데이터 출력 실패")

      }
    }
  }
 




  // 테이블 클릭시 추가 화면 렌더링 함수

  const [rowOutTable, setRowOutTable] = useState([].fill(false));

  const handleRowClick = (loadingIndex) => {
    console.log('클릭  인덱스', loadingIndex);
    setRowOutTable((prevRowOutTable) => {
      const newRowOutTable = [...prevRowOutTable];
      newRowOutTable[loadingIndex] = !newRowOutTable[loadingIndex];
      return newRowOutTable;
    });
  };
 

 // 출고 추가 데이터 담을 객체
const [outLoading, setOutLoading] = useState({
    loading_seq: '',
    created_at: '',
    loading_cnt: '',
    stock_shipping_des: '',
    loading_manager :id
  })


  // 출고 추가 데이터 담을 함수
  const outLoadingHandler = (e) => {
    
     if (e.target.name == 'created_at') {
      // console.log(e.target.value)
      setOutLoading({ ...outLoading, created_at: e.target.value })
    }
    else if (e.target.name == 'loading_cnt') {
      // console.log(e.target.value)
      if(  e.target.value> e.target.getAttribute('name') == 'td_loading_cnt'.value){
        alert('출고 수량 초과입니다')
      } else{
      setOutLoading({ ...outLoading, loading_cnt: e.target.value })
      }
    }else if (e.target.getAttribute('name') == 'loading_seq' ) {
      // console.log(e.target.value)
      setOutLoading({ ...outLoading, loading_seq: e.target.innerText })
    }
    else if (e.target.name == 'choice_des') {
      // console.log(e.target.value)
      setOutLoading({ ...outLoading, stock_shipping_des: e.target.value })
    }
    else if (e.target.name == 'out_loading_des') {
      // console.log(e.target.value)
      setOutLoading({ ...outLoading, stock_shipping_des: e.target.value })
    }
    
  };


  // 출고 버튼 클릭 이벤트
  const outLoadingHandler2 = async () => {
    console.log('출고버튼 클릭');
    console.log('출고데이터 : ', outLoading);
 
    try {
      const response = await axios.post('http://localhost:8000/out/create/loading', outLoading)

      if (response.status === 200) {
        console.log('출고데이터 전송 성공');
        console.log(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error);
      

      }
    }
  }

  // 직접선택 추가 핸들러
  const [showInput, setShowInput] = useState(false);
  const handleInputPluse = (e) => {
    console.log("배송지 선택 클릭");
    console.log(e.target.value);
    if (e.target.value == "직접입력") {
      setShowInput(true)
    }
    else {
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
                              <td className={`out_table_id ${rowOutTable[loadingIndex] ? 'open' : ''}`}
                                onClick={outLoadingHandler} name='loading_seq'>
                                {loadingItem.loading_seq}
                              </td>
                              <td>{loadingItem.Stock.stock_name}</td>
                              <td onChange={outLoadingHandler} name = 'td_loading_cnt' value={loadingItem.loading_cnt}>{loadingItem.loading_cnt}</td>
                              <td>{loadingItem.created_at.substring(0, 10)}</td>
                              <td>{loadingItem.Stock.stock_expired.substring(0, 10)}</td>
                              <td>{warehouseItem.wh_name}</td>
                              <td>{rackItem.rack_seq}</td>
                              <td>{loadingItem.Stock.stock_barcode}</td>
                            </tr>
                            {rowOutTable[loadingIndex] && (
                              <tr>
                                <td id='out_table_fold' colSpan={8}>
                                  <span>출고일자</span><input type='date' name='created_at' onChange={outLoadingHandler} /><br />
                                  <span>출고수량</span><input name='loading_cnt' type='text' onChange={outLoadingHandler} /><br />
                                  <span> 배송지</span>
                                  <select id="out_filter" onClick={handleInputPluse}>

                                    {rackItem.Loadings.map((loadingItem, loadingIndex) => (
                                      <option key={loadingIndex} value={loadingItem.stock_shipping_des} name='choice_des'>
                                        {loadingItem.stock_shipping_des}
                                      </option>
                                    ))}
                                    <option value="직접입력">직접입력</option>
                                  </select>
                                  {showInput && (
                                    <input type='text' placeholder='배송지 입력' name='out_loading_des' onChange={outLoadingHandler} />
                                  )}
                                  <button className="custom-btn btn-1" onClick={outLoadingHandler2}>출고</button>
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