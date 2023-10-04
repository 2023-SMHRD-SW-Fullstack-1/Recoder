import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import WareTable from "./WareTable";
import axios from 'axios'
import { Link } from 'react-router-dom'

const WareList = ({ comSeq }) => {
  const [warehouseList, setWarehouseList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/ware/manage/${comSeq}`)
    .then((res) => {
      console.log(res.data);
      setWarehouseList(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

  const columns = [
    {
      title: "창고명",
      dataIndex: "wh_name",
      key: "wh_name",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "창고 보기",
      dataIndex: "wh_seq",
      key: "wh_seq",
      render: (record) => (
        <Link to={`/warehouse/${record}`}><button
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0,0,0,.04)",
            borderRadius: 4,
            padding: 4,
          }}
        >
          <KeyboardArrowRightIcon />
        </button></Link>
      ),
    },
  ];

  // const data = [
  //   {
  //     stock_id: "창고이름1",
  //     stock_name: "콜라 외 24종",
  //     cl_seq: "버튼",
  //   },
  //   {
  //     stock_id: "창고이름2",
  //     stock_name: "사이다 외 8종",
  //     cl_seq: "버튼",
  //   },
  //   {
  //     stock_id: "창고이름3",
  //     stock_name: "환타 외 60종",
  //     cl_seq: "버튼",
  //   },
  // ];

  const data = warehouseList.map((item, idx) => ({
    key: idx + 1,
    wh_name: item.wh_name,
    wh_seq: item.wh_seq
  }));  

  return (
    <div id="dashboard-warelist">
      <div id="warelist-header" className="dashboard-item-header">
        <span>나의 창고</span>
      </div>
      <div>
        <WareTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default WareList;
