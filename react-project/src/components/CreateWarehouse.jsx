import React, { useState, useEffect } from 'react'
import '../Sidebar.css'
import '../App.css'
import App from '../three/create_warehouse'
// import '../three/02-geometry.css'
import axios from 'axios'

const CreateWarehouse = ({ com_seq }) => {

  const [warehouseWidth, setWarehouseWidth] = useState(null);
  const [warehouseLength, setWarehouseLength] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/user')
      .then((res) => {
        console.log("createWarehouse에서 받은 정보", res.data);
        const warehouseData = res.data.Company.Warehouses;
        const lastWarehouse = warehouseData[warehouseData.length - 1];
        console.log("가장 최근 창고 정보 :", lastWarehouse);

        // const warehouseWidth = parseInt(lastWarehouse.wh_width);
        // const warehouseLength = parseInt(lastWarehouse.wh_length);
        // console.log("창고 가로 길이:", warehouseWidth);
        // console.log("창고 세로 길이:", warehouseLength);
        setWarehouseWidth(parseInt(lastWarehouse.wh_width));
        setWarehouseLength(parseInt(lastWarehouse.wh_length));
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

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