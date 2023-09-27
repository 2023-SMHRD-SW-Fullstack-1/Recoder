import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
// import App from '../three/show_warehouse'
import App from '../three/test_show_warehouse'
import axios from 'axios';
import '../css/wareDetail.css'


const Warehouse = () => {
  let { wh_seq } = useParams()
  console.log("wh_seq 값", wh_seq);

  // const [warehouseInfo, setWarehouseInfo] = useState(null);

  const [warehouseWidth, setWarehouseWidth] = useState(null);
  const [warehouseLength, setWarehouseLength] = useState(null);
  const [rackWidth, setRackWidth] = useState(null);
  const [rackLength, setRackLength] = useState(null);
  const [rackFloor, setRackFloor] = useState(null);
  const [rackX, setRackX] = useState(null);
  const [rackZ, setRackZ] = useState(null);

  const [warehouseData, setWarehouseData] = useState({});

  const appInstance = useRef(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8000/warehouse/${wh_seq}`),
      axios.get(`http://localhost:8000/rack/${wh_seq}`),
      axios.get(`http://localhost:8000/stock/${wh_seq}`)
    ])
    .then(([warehouseRes, rackRes, stockRes]) => {
      console.log("랙 데이터 배열", rackRes.data);
      const racks = rackRes.data.map(rack => ({
        rackFloor: parseInt(rack.rack_floor),
        rackWidth: parseInt(rack.rack_width),
        rackLength: parseInt(rack.rack_length),
        rackX: parseInt(rack.rack_x),
        rackZ: parseInt(rack.rack_z)
      }));

      console.log("racks 찍어보자", racks);

      console.log("상품 데이터 배열", stockRes);
      // const stocks = stockRes.data.map(stock => ({

      // }))
      
      // console.log("stock 가져오니라", stocks);

      setWarehouseData({
        warehouseWidth: parseInt(warehouseRes.data.wh_width),
        warehouseLength: parseInt(warehouseRes.data.wh_length),
        racks,
        items: {
          itemWidth: 0.8,
          itemLength: 0.8,
          itemX: -1,
          itemZ: 5
        },
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }, [wh_seq])

  useEffect(() => {
    if (Object.keys(warehouseData).length > 1) {
      console.log("지금!");
      console.log(Object.keys(warehouseData));

      appInstance.current = new App(
        warehouseData.warehouseWidth,
        warehouseData.warehouseLength,
        warehouseData.racks,
        warehouseData.items
      );
    }
  }, [warehouseData]);

  function addLoading() {
    console.log("짐 추가 클릭")

  }


  return (
    <div className='warehouse1' >
      <div id="waredetail-container" />

      <div className='button-container'>
        <button type='button' onClick={addLoading}> 짐 추가 </button>
        <button type='button'> 선반 추가 </button>
      </div>
    </div>
  );
}

export default Warehouse