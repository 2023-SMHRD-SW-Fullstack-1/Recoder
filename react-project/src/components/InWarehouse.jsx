import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import App from "../three/inWare";
import axios from "axios";
import "../css/wareDetail.css";

const Warehouse = () => {
  let { wh_seq, stock_seq } = useParams();

  const nav = useNavigate();

  // 변수
  const [stockName, setStockName] = useState("");
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
  const [rack_seq, setRack_seq] = useState(0);
  const [clickRackSeq, setClickRackSeq] = useState({
    rack_seq: rack_seq
  });
  const [getItem, setGetItem] = useState({
    itemX: itemX,
    itemY: itemY,
    itemZ: itemZ,
  });
  const [strGetItem, setStrGetItem] = useState("");

  const [warehouseData, setWarehouseData] = useState({});

  const [canAddItem, setCanAddItem] = useState(false); // 짐 추가 가능 여부
  const [canAddRack, setCanAddRack] = useState(false); // 선반 추가 가능 여부
  const [canMoveItem, setCanMoveItem] = useState(false);

  const appInstance = useRef(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8000/warehouse/${wh_seq}`),
      axios.get(`http://localhost:8000/rack/${wh_seq}`),
      // axios.get(`http://localhost:8000/stock/${wh_seq}`),
      axios.get(`http://localhost:8000/stock/show/${wh_seq}`),
    ])
      .then(([warehouseRes, rackRes, stockRes]) => {
        console.log("랙 데이터 배열", rackRes.data);
        const racks = rackRes.data.map((rack) => ({
          rackFloor: parseInt(rack.rack_floor),
          rackWidth: parseInt(rack.rack_width),
          rackLength: parseInt(rack.rack_length),
          rackX: parseInt(rack.rack_x),
          rackZ: parseInt(rack.rack_z),
          seq: rack.rack_seq,
        }));

        console.log("racks 찍어보자", racks);

        console.log("상품 데이터 배열", stockRes);

        console.log("스톡 응답", stockRes);

        // console.log('범인', stockRes.data[0].Racks[19].Loadings);

        const stocks = stockRes.data[0].Racks.map((rack) => {
          // const [pos1, pos2] = stock.loading_position.split(',').map(Number);
          // console.log('용의자', rack.Loadings[0].loading_position);
          const loadings = rack.Loadings.map((loading) => {
            console.log('너지', loading.loading_position);
            const [itemX, itemY, itemZ] = loading.loading_position
              ? JSON.parse(rack.loading_position)
              : [0, 0];
              console.log('공범', itemX, itemY, itemZ);
            return {
              loadingFloor: itemY,
              loadingPosition1: itemX,
              loadingPosition2: itemZ,
            };
          })
        });
        // const stocks = stockRes.data[0].Racks[0].Loadings.map((stock) => {
        //   // const [pos1, pos2] = stock.loading_position.split(',').map(Number);
        //   console.log('ee', stock.Stock.loading_position);
        //   const [x, y, z] = stock.Stock.loading_position
        //     ? JSON.parse(stock.Stock.loading_position)
        //     : [0, 0];
        //     console.log('dd', x, y, z);
        //   return {
        //     loadingFloor: y,
        //     loadingPosition1: x,
        //     loadingPosition2: z,
        //   };
        // });
        console.log("스톡스", stocks);

        setWarehouseData({
          warehouseWidth: parseInt(warehouseRes.data.wh_width),
          warehouseLength: parseInt(warehouseRes.data.wh_length),
          racks,
          stocks,
          getItem,
          clickRackSeq,
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
        warehouseData.stocks,
        warehouseData.getItem,
        warehouseData.clickStockSeq
      );
    } else {
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

  // 입고페이지에서 선택한 상품 정보 요청
  useEffect(() => {
    axios
      .get(`http://localhost:8000/stock/ware/${stock_seq}`)
      .then((res) => {
        setStockName(res.data.stock_name);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const inPositionClick = () => {
    console.log('이거자나22',"위치 선택 완료 클릭", getItem);
    let aStrGetItem = JSON.stringify(getItem);
    setTimeout(() => {
      setStrGetItem((prev)=>{
        console.log('이거자나', rack_seq);
        if (aStrGetItem !== "") {
          axios
            .patch("http://localhost:8000/in/position", {
              stock_seq: stock_seq,
              position: aStrGetItem,
              rack_seq: localStorage.getItem('rack_seq'),
            })
            .then((res) => {
              if (res.data === "ok") {
                nav("/in/loading");
              } else {
                alert("다시 시도해주세요");
              }
              localStorage.setItem('rack_seq', null)
            })
            .catch((err) => {
              console.error(err);
            });
        }
        return JSON.stringify(getItem);
      });      
    }, 300);
    
  };

  // useEffect(() => {
  //   console.log('이거자나', rack_seq);

  //   if (strGetItem !== "") {
  //     axios
  //       .patch("http://localhost:8000/in/position", {
  //         stock_seq: stock_seq,
  //         position: strGetItem,
  //         rack_seq: rack_seq,
  //       })
  //       .then((res) => {
  //         if (res.data === "ok") {
  //           nav("/in/loading");
  //         } else {
  //           alert("다시 시도해주세요");
  //         }
  //         localStorage.setItem('rack_seq', null)
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // }, [rack_seq]);

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
