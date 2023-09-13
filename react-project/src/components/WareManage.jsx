import React from 'react'
import { useNavigate } from 'react-router-dom'


import '../css/WareManage.css'

const WareManage = () => {

  const nav = useNavigate()

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


  const handleWareCreate = () => {
    nav('/ware/create')
  }

  // const handleWareCreate = () => {
  //   nav('/ware/createwarehouse')
  // }

  return (
    <div id='ware_manage_all'>
      <div id='ware_manage_top'>
        <div id='ware_manage_title'>
          <h1>창고 리스트</h1>
        </div>
      </div>

      {/* 테이블 */}
      <div className="ware_manage_table">
        <table className="ware_container">
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
                {/* <tr onClick={() => handleRowClick(index)} className={rowOutTable[index] ? 'selected' : ''}> */}
                <tr>
                  {/* <td? className={`out_table_id ${rowOutTable[index] ? 'open' : ''}`}> */}
                  <td>
                    {item.warehouseID}
                  </td>
                  <td>{item.loadCnt}</td>
                  <td>{item.loadRate}</td>
                  <td>{item.createdAt}</td>
                </tr>

              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="ware_button_container">
          <button onClick={handleWareCreate}>창고 생성</button>
        </div>
      </div>
    </div>
  );
}

export default WareManage