import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import App from "../../three/show_warehouse";

const WareCardItem = ({ index, wh_name, wh_seq }) => {
  console.log(index);
  const [warehouseInfo, setWarehouseInfo] = useState(null);

  const [warehouseWidth, setWarehouseWidth] = useState(null);
  const [warehouseLength, setWarehouseLength] = useState(null);
  const [rackWidth, setRackWidth] = useState(1);
  const [rackLength, setRackLength] = useState(1);
  const [rackFloor, setRackFloor] = useState(1);

  const appInstance = useRef(null);

  // wh_seq를 가지고 해당 창고 정보 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8000/warehouse/${wh_seq}`)
      .then((res) => {
        setWarehouseInfo(res.data);
        // console.log(res.data);
        // console.log(parseInt(res.data.wh_width));
        setWarehouseWidth(parseInt(res.data.wh_width));
        setWarehouseLength(parseInt(res.data.wh_length));
        // console.log("warehouseWidth 값", warehouseWidth);
        // console.log("warehouseLength 값", warehouseLength);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [wh_seq]);

  useEffect(() => {
    if (warehouseWidth !== null && warehouseLength !== null) {
      new App(
        warehouseWidth,
        warehouseLength,
        rackWidth,
        rackLength,
        index,
      )
    }
  }, [warehouseWidth, warehouseLength]);

  return (
    <div id="ware-cardlist-item">
      <div id="ware-preview">
        <div>
          <div id={`webgl-container-${index}`} style={{ position: "relative" }}></div>
        </div>
      </div>
      <div id="ware-detail">
        <div>창고 이름 {wh_name}</div>
        <div>보유 상품</div>
        <div>적재율</div>
      </div>
    </div>
  );
};

export default WareCardItem;
