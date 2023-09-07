import React from 'react'
import '../Out_01.css'
import { useState, useEffect } from 'react'
import axios from'axios'
// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Out_01() {

  // 출고 될 제품 리스트 담을 배열
  const [outStockList,setOutStockList] = useState([]);

  // 테이블 클릭시 추가 화면 렌더링 함수
  const [isOpen, setIsOpen] = useState(false);

  const handleRowClick = () => {
    console.log('클릭이벤트 발동');
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // 각 행의 상태를 저장할 배열
  const [rowOutTable,setRowOutTable] = useState([]);

  // 행 클릭시 해당 행의 상태 토글
  const handleRowClick2 = (index) =>{
    const newRowOutTable = [...rowOutTable];
    newRowOutTable[index] = !newRowOutTable[index];
    setRowOutTable(newRowOutTable);
  };





  // 출고될 리스트 출력 함수
  const getOutStockList = async()=>{
try{
  const response = await axios.post('/out/create')

  if (response.status === 200) {
    console.log('리스트 출력 성공');

    console.log(response.data);
    console.log(response.data[0]);



    setOutStockList(response.data);
  }
} catch (error) {
  if (error.response && error.response.status === 401) {
    alert("데이터 출력 실패")

  }
}


}
useEffect(() => {
  getOutStockList(); 
}, []);


  return (
    <div id='out_all'>
      <div id='out_top'>
        <span id="out_title">출고</span>

        <div id="out_input_container">
          <input id="out_input" placeholder="제품코드 또는 제품명을" />
          <FontAwesomeIcon id="out_input_icon" icon={faMagnifyingGlass} />
          <select id="out_filter">filter</select>
        </div>

      </div>

      {/* 테이블 */}
      <div className="out_table">

        <table className="container">
          <thead>
            <tr>

              <th><h1>제품ID</h1></th>
              <th><h1>입고일</h1></th>
              <th><h1>유통기한</h1></th>
              <th><h1>수량</h1></th>
            </tr>
          </thead>
          {/* row토글 ver */}
          
          <tbody>
            <tr>
              <td className={`out_table_id ${isOpen ? 'open' : ''}`}
                onClick={handleRowClick} >A001</td>
              <td>2023-07-01</td>
              <td>2023-12-25</td>
              <td>24</td>
            </tr>
            {isOpen && (
              <div className="out_table_fold">
                
                  <span>출고일자</span>
                  <span>출고수량</span>
                  <span>배송지</span>
                  <select id="out_filter"/>
                  <button class="custom-btn btn-1">출고</button>
                
              </div>
            )}
            <tr>
            <td className={`out_table_id ${isOpen ? 'open' : ''}`}
                onClick={handleRowClick} >A002</td>
              <td>2023-07-01</td>
              <td>2023-12-25</td>
              <td>24</td>
            </tr>
            {isOpen && (
              <div className="out_table_fold">
                
                  <span>출고일자</span>
                  <span>출고수량</span>
                  <span>배송지</span>
                  <select id="out_filter"/>
                  <button>출고</button>
                
              </div>
            )}
            <tr>
            <td className={`out_table_id ${isOpen ? 'open' : ''}`}
                onClick={handleRowClick} >A003</td>
              <td>2023-07-01</td>
              <td>2023-12-25</td>
              <td>24</td>
            </tr>
            {isOpen && (
              <div className="out_table_fold">
                
                  <span>출고일자</span>
                  <span>출고수량</span>
                  <span>배송지</span>
                  <select id="out_filter"/>
                  <button>출고</button>
                
              </div>
            )}
            <tr>
            <td className={`out_table_id ${isOpen ? 'open' : ''}`}
                onClick={handleRowClick} >A004</td>
              <td>2023-07-01</td>
              <td>2023-12-25</td>
              <td>24</td>
            </tr>
            {isOpen && (
              <div className="out_table_fold">
                
                  <span>출고일자</span>
                  <span>출고수량</span>
                  <span>배송지</span>
                  <select id="out_filter"/>
                  <button>출고</button>
                
              </div>
            )}
            <tr>
            <td className={`out_table_id ${isOpen ? 'open' : ''}`}
                onClick={handleRowClick} >A005</td>
              <td>2023-07-01</td>
              <td>2023-12-25</td>
              <td>24</td>
            </tr>
            {isOpen && (
              <div className="out_table_fold">
                
                  <span>출고일자</span>
                  <span>출고수량</span>
                  <span>배송지</span>
                  <select id="out_filter"/>
                  <button>출고</button>
                
              </div>
            )}
            <tr>
            <td className={`out_table_id ${isOpen ? 'open' : ''}`}
                onClick={handleRowClick} >A006</td>
              <td>2023-07-01</td>
              <td>2023-12-25</td>
              <td>24</td>
            </tr>
            {isOpen && (
              <div className="out_table_fold">
                
                  <span>출고일자</span>
                  <span>출고수량</span>
                  <span>배송지</span>
                  <select id="out_filter"/>
                  <button>출고</button>
                
              </div>
            )}
          </tbody>
        </table>


      </div>
    </div>
  )
}

export default Out_01