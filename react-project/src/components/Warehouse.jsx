import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
// import App from '../three/show_warehouse'
import App from "../three/test_show_warehouse";
import axios from "axios";
import "../css/wareDetail.css";

const Warehouse = () => {
  let { wh_seq } = useParams();
  //console.log("wh_seq 값", wh_seq);

  const [warehouseData, setWarehouseData] = useState({});

  const [canAddItem, setCanAddItem] = useState(false); // 짐 추가 가능 여부
  const [canAddRack, setCanAddRack] = useState(false); // 선반 추가 가능 여부
  const [canMoveItem, setCanMoveItem] = useState(false);

  const appInstance = useRef(null);

  // useEffect -> wh_seq
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8000/warehouse/${wh_seq}`),
      axios.get(`http://localhost:8000/rack/${wh_seq}`),
      // axios.get(`http://localhost:8000/stock/show/${comSeq}`)
      axios.get(`http://localhost:8000/stock/show/${wh_seq}`)
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

        console.log("warehouse", warehouseRes.data.wh_width)
        console.log("racks 찍어보자", racks);

        console.log("상품 데이터 배열", stockRes);
        // const stocks = stockRes.data.map(stock => ({

        console.log("뭘가져오는지 보자", stockRes.data[0].Racks[0].Loadings);

        console.log("true/false", Array.isArray(stockRes.data[0].Racks[0].Loadings));


        const stocks = stockRes.data[0].Racks[0].Loadings.map(stock => {
          // const [pos1, pos2] = stock.loading_position.split(',').map(Number);
          const [pos1, pos2] = stock.loading_position ? stock.loading_position.split(',').map(Number) : [0, 0];
          return {
            loadingFloor: stock.loading_floor,
            loadingPosition1: pos1,
            loadingPosition2: pos2
          }
        })

        // console.log("stock 가져오니라", stocks);


        setWarehouseData({
          warehouseWidth: parseInt(warehouseRes.data.wh_width),
          warehouseLength: parseInt(warehouseRes.data.wh_length),
          racks,
          stocks
        });

        console.log("stock 가져오니라", stocks);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [wh_seq]);

  // useEffect -> warehouseData
  useEffect(() => {
    console.log("지금!");
    if (Object.keys(warehouseData).length >= 1) {
      console.log("지금!222222222");
      console.log(warehouseData);
      console.log(Object.keys(warehouseData));

      appInstance.current = new App(
        warehouseData.warehouseWidth,
        warehouseData.warehouseLength,
        warehouseData.racks,
        warehouseData.stocks
      );
    }
    else {
      console.log("error");
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
      </div>

      <div className="modal-top">

      </div>
    </div>
  );
};

export default Warehouse;
