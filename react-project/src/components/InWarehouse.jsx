import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import App from "../three/inWare";
import axios from "axios";
import "../css/wareDetail.css";

const Warehouse = () => {
  let { wh_seq, stock_seq } = useParams();

  // 변수
  const [stockName, setStockName] = useState('')
  const [warehouseWidth, setWarehouseWidth] = useState(null);
  const [warehouseLength, setWarehouseLength] = useState(null);
  const [rackWidth, setRackWidth] = useState(null);
  const [rackLength, setRackLength] = useState(null);
  const [rackFloor, setRackFloor] = useState(null);
  const [rackX, setRackX] = useState(null);
  const [rackZ, setRackZ] = useState(null);

  const [itemX, setItemX] = useState(0);
  const [itemY, setItemY] = useState(0);
  const [itemZ, setItemZ] = useState(0);
  const [getItem, setGetItem] = useState({
    itemX: itemX,
    itemY: itemY,
    itemZ: itemZ,
  })
  const [strGetItem, setStrGetItem] = useState('')

  const [warehouseData, setWarehouseData] = useState({});

  const [canAddItem, setCanAddItem] = useState(false); // 짐 추가 가능 여부
  const [canAddRack, setCanAddRack] = useState(false); // 선반 추가 가능 여부
  const [canMoveItem, setCanMoveItem] = useState(false);

  const appInstance = useRef(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8000/warehouse/${wh_seq}`),
      axios.get(`http://localhost:8000/rack/${wh_seq}`),
      axios.get(`http://localhost:8000/stock/${wh_seq}`),
    ])
      .then(([warehouseRes, rackRes, stockRes]) => {
        console.log("랙 데이터 배열", rackRes.data);
        const racks = rackRes.data.map((rack) => ({
          rackFloor: parseInt(rack.rack_floor),
          rackWidth: parseInt(rack.rack_width),
          rackLength: parseInt(rack.rack_length),
          rackX: parseInt(rack.rack_x),
          rackZ: parseInt(rack.rack_z),
        }));

        console.log("racks 찍어보자", racks);

        console.log("상품 데이터 배열", stockRes);

        setWarehouseData({
          warehouseWidth: parseInt(warehouseRes.data.wh_width),
          warehouseLength: parseInt(warehouseRes.data.wh_length),
          racks,
          items: {
            itemWidth: 0.8,
            itemLength: 0.8,
            itemX: -1,
            itemZ: 5,
          },
          getItem,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [wh_seq]);

  // useEffect -> warehouseData
  useEffect(() => {
    if (Object.keys(warehouseData).length > 1) {
      console.log("지금!");
      console.log(Object.keys(warehouseData));

      appInstance.current = new App(
        warehouseData.warehouseWidth,
        warehouseData.warehouseLength,
        warehouseData.racks,
        warehouseData.items,
        warehouseData.getItem,
      );
    }
  }, [warehouseData]);

  function addLoading() {
    setCanAddItem((prevState) => {
      // 여기서 prevState를 사용하여 이전 상태를 기반으로 새로운 상태를 계산
      const newCanAddItem = !prevState;
      if (!prevState) {
        setCanAddRack(false);
        setCanMoveItem(false);
      }

      appInstance.current._setupMouseEvents(
        newCanAddItem,
        canAddRack,
        canMoveItem
      );
      return newCanAddItem; // return으로 canAddItem설정
    }); // state일때의 state 콜백

    // setCanAddItem(!canAddItem);
    // setCanAddRack(!canAddItem);
    console.log("짐 추가 클릭");
  }

  function moveLoading() {
    setCanMoveItem((prevState) => {
      const newCanMoveItem = !prevState;
      if (!prevState) {
        setCanAddItem(false);
        setCanAddRack(false);
      }

      appInstance.current._setupMouseEvents(
        canAddItem,
        canAddRack,
        newCanMoveItem
      );
      return newCanMoveItem;
    });
  }

  // 입고페이지에서 선택한 상품 정보 요청
  useEffect(() => {
    axios.get(`http://localhost:8000/stock/ware/${stock_seq}`)
    .then((res) => {
      setStockName(res.data.stock_name);
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

  const inPositionClick = () => {
    console.log('위치 선택 완료 클릭', getItem);
    setStrGetItem(JSON.stringify(getItem))
  }

  useEffect(() => {
    axios.patch('http://localhost:8000/in/position', {
      stock_seq: stock_seq,
      position: strGetItem
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
  }, [strGetItem])

  return (
    <div className="warehouse1">
      <div id="waredetail-container" />

      <div className="button-container">
        <button type="button" onClick={addLoading}>
          {canAddItem ? "짐 추가중" : "짐 추가하기"}
        </button>
        <button type="button"> 선반 추가 </button>
        <button type="button" onClick={moveLoading}>
          {canMoveItem ? "짐 이동중" : "짐 이동하기"}
        </button>
        <div id="info">
          <strong>입고할 상품 정보</strong> <br />
          <span>상품 ID | {stock_seq}</span> <br />
          <span>상품명 | {stockName}</span> <br />
          <button onClick={inPositionClick}>위치 선택 완료</button>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;