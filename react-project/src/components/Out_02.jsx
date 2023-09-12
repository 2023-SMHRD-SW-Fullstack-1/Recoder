import React, { useEffect, useState } from 'react'
import '../Out_01.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function Out_02() {

    // 출고리스트 담을 배열
    const [outLoadingList,setOutLoadingList] = useState([]);

    const outControllList = async()=>{
        const userData = {
            id: "user_id 001"
          }
          try {
            const response = await axios.post('http://localhost:8000/out/controll', userData)
      
            if (response.status === 200) {
              console.log('출고예정 리스트 가져오기 성공');
      
              console.log(response.data)
      
      
              setOutLoadingList(response.data);
              
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              alert("데이터 출력 실패")
      
            }
          }
    }


      useEffect(()=>{
        outControllList();
      },[])

  return (
    
    <div id='out_all'>
    <div id='out_top'>
      <span id="out_title">출고이력</span>

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
              <h1>출고일</h1>
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
            <th>
              <h1>배송지</h1>
            </th>
            <th>
              <h1>담당자</h1>
            </th>
          </tr>
        </thead>
        <tbody>
            {outLoadingList.map((companyItem, companyIndex) => (
              <React.Fragment key={companyIndex}>
                {companyItem.Company.Warehouses.map((warehouseItem, warehouseIndex) => (
                  <React.Fragment key={warehouseIndex}>
                    {warehouseItem.Racks.map((rackItem, rackIndex) => (
                      <React.Fragment key={rackIndex}>
                        {rackItem.Loadings.map((loadingItem, loadingIndex) => (
                          <React.Fragment key={loadingIndex}>
                            <tr >
                              <td>{loadingItem.loading_seq}</td>
                              <td>{loadingItem.Stock.stock_name}</td>
                              <td>{loadingItem.loading_cnt}</td>
                              <td>{loadingItem.created_at.substring(0, 10)}</td>
                              <td>{loadingItem.Stock.stock_expired.substring(0, 10)}</td>
                              <td>{warehouseItem.wh_name}</td>
                              <td>{rackItem.rack_seq}</td>
                              <td>{loadingItem.Stock.stock_barcode}</td>
                              <td>{loadingItem.stock_shipping_des}</td>
                              <td>{loadingItem.loading_manager}</td>
                            </tr>
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

export default Out_02