import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


import '../css/WareManage.css'

const WareManage = ({ comSeq }) => {

  const nav = useNavigate()
  const [warehouseList, setWarehouseList] = useState([]);

  const handleWareCreate = () => {
    nav('/ware/create')
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/ware/manage/${comSeq}`)
      .then(res => {
        setWarehouseList(res.data);
        console.log("가져오는 데이터",res.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  return (
    <div id='ware_manage_all'>
      <div id='ware_manage_top'>
        <div id='ware_manage_title'>
          <h1>창고 리스트</h1>
        </div>
      </div>

      {/* 테이블 */}
      <div className="ware_manage_table">
        <div className='ware_manage_header'>

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
          </table>
        </div>

        <div className='ware_manage_content'>

          <table className="ware_container">
            <tbody>
              {warehouseList.length > 0 ? (
                warehouseList.map((item, index) => (
                  //     <React.Fragment key={index}>
                  <tr key={index}>
                    <td>
                      {item.wh_name}
                    </td>
                    {/* <td>{item.loadCnt}</td> */}
                    <td>10</td>
                    {/* <td>{item.loadRate}</td> */}
                    <td>20</td>
                    <td>{item.createdAt}</td>
                  </tr>
                  //     </React.Fragment>
                ))
              ) : (
                console.log("창고가 없습니다.")
              )}
            </tbody>

          </table>
        </div>

      </div>
      <div className="ware_button_container">
        <button onClick={handleWareCreate}>창고 생성</button>
      </div>
    </div>
  );
}

export default WareManage