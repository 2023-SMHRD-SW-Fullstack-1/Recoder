import React, { useEffect, useState } from "react";
import Table_HJ from "./Table_HJ";
import axios from "axios";
import { useNavigate } from "react-router";
import TopBoard from "./Out/TopBoard";

function Out_02() {
  const id = "smart";
  const wh_seq = 1;
  const com_seq = 1;

  // 출고리스트 담을 배열
  const [outLoadingList, setOutLoadingList] = useState([]);

  const outControllList = async () => {
    const userData = {
      id: id,
      wh_seq: wh_seq,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/out/controll",
        userData
      );

      if (response.status === 200) {
        console.log("출고예정 리스트 가져오기 성공");

        console.log(response.data);

        setOutLoadingList(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("데이터 출력 실패");
      }
    }
  };

  const title = "입고예정";
  const items = [];
  //tb 목록
  const columns = [
    {
      title: "적재ID",
      dataIndex: "loading_seq",
      key: "loading_seq",
      render: (text, data, idx) => (
        <span style={{ color: "darkgray" }}>{text}</span>
      ),
    },
    {
      title: "제품명",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "출고수량",
      dataIndex: "loading_cnt",
      key: "loading_cnt",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "적재위치",
      dataIndex: "rack_seq",
      key: "rack_seq",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "출고일",
      dataIndex: "stock_ex",
      key: "stock_ex",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "배송지",
      dataIndex: "stock_des",
      key: "stock_des",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "담당자",
      dataIndex: "loading_manager",
      key: "loading_manager",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
  ];

  const data1 = outLoadingList.map((item) => item.Company.Warehouses);
  const data2 = data1.map((warehouses) =>
    warehouses.map((warehouse) => warehouse.Racks)
  );
  const data3 = data2.flat(2); // 로딩을 랙 단위로 그룹화하고 평탄화합니다.

  const data = data3
    .map((rack, idx) =>
      rack.Loadings.map((loading) => ({
        key: idx + 1,
        loading_seq: loading.loading_seq,
        stock_name: loading.Stock.stock_name,
        loading_cnt: loading.loading_cnt,
        rack_seq: `${rack.rack_seq}번 rack ${loading.loading_floor}층 ${loading.loading_position}`,
        stock_ex : loading.out_created_at.substring(0,10),
        stock_des: loading.stock_shipping_des,
        loading_manager: loading.loading_manager,
        description: loading.Stock.stock_name
      }))
    )
    .flat(1); 

  useEffect(() => {
    outControllList();
  }, []);

  return (
    <div id="out_all">
      <div id="in_comtainer">
        <div id="in01_top">
          <TopBoard title={title} items={items} />
        </div>
        <div id="in01_bottom">
          <Table_HJ columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Out_02;
