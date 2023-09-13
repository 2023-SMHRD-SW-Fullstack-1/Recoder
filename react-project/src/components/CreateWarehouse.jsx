import React, { useState, useEffect } from 'react'
import '../Sidebar.css'
import '../App.css'
import App from '../three/create_warehouse'
// import '../three/02-geometry.css'
import axios from 'axios'

const CreateWarehouse = ({ com_seq, newWareData }) => {

  const [warehouseWidth, setWarehouseWidth] = useState(null);
  const [warehouseLength, setWarehouseLength] = useState(null);

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

  useEffect(() => {
      console.log('여기', newWareData);
        // const warehouseData = newWareData;
        // const lastWarehouse = warehouseData[warehouseData.length - 1];
        // console.log("가장 최근 창고 정보 :", lastWarehouse);

        // const warehouseWidth = parseInt(lastWarehouse.wh_width);
        // const warehouseLength = parseInt(lastWarehouse.wh_length);
        // console.log("창고 가로 길이:", warehouseWidth);
        // console.log("창고 세로 길이:", warehouseLength);
        setWarehouseWidth(parseInt(newWareData.wh_width));
        setWarehouseLength(parseInt(newWareData.wh_length));
  }, [])

  useEffect(() => {
    if (warehouseWidth !== null && warehouseLength !== null) {
      new App(warehouseWidth, warehouseLength);
    }
  }, [warehouseWidth, warehouseLength])

  return (
    <div id="webgl-container"></div>
  );
}

export default CreateWarehouse;