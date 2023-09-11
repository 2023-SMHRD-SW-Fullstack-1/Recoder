import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import '../css/WareManage.css'

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const WareManage = () => {

  const testData = [
    {
      warehouseID: "A0001",
      loadCnt: "4/12",
      loadRate: "30%",
      createdAt: "2023-01-01"
    }, {
      warehouseID: "A0002",
      loadCnt: "3/20",
      loadRate: "15%",
      createdAt: "2023-01-01"
    }, {
      warehouseID: "A0003",
      loadCnt: "8/12",
      loadRate: "60%",
      createdAt: "2023-01-01"
    }, {
      warehouseID: "A0004",
      loadCnt: "32/40",
      loadRate: "80%",
      createdAt: "2023-01-01"
    }
  ];

  // 배송지 필터 데이터
  // const testData2 = ["이마트", "홈플러스", "카카오스토어", "다이소"];

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



  return (
    <div id='ware_manage_all'>
      <div id='ware_manage_top'>
        <h1 id=''>창고 리스트</h1>
      </div>

      {/* 테이블 */}
      <div className="ware_manage_table">
        <table className="container">
          <thead>
            <tr>
              <th>
                <h1>창고 ID</h1>
              </th>
              <th>
                <h1>적재량</h1>
              </th>
              <th>
                <h1>적재율</h1>
              </th>
              <th>
                <h1>생성일</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {testData.map((item, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => handleRowClick(index)}
                  className={rowOutTable[index] ? 'selected' : ''}
                >
                  <td className={`out_table_id ${rowOutTable[index] ? 'open' : ''}`}>
                    {item.warehouseID}
                  </td>
                  <td>{item.loadCnt}</td>
                  <td>{item.loadRate}</td>
                  <td>{item.createdAt}</td>
                </tr>
                
              </React.Fragment>
            ))}
          </tbody>
          <button>창고 생성</button>
        </table>
      </div>
    </div>
  );
}

export default WareManage