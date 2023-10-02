import React, { useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import WareTable from "./WareTable";
import axios from 'axios'

const WareList = ({ comSeq }) => {

  useEffect(() => {
    axios.get(`http://localhost:8000/ware/wh_name/:comSeq`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

  const columns = [
    {
      title: "창고명",
      dataIndex: "stock_id",
      key: "stock_id",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "요약",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "창고 보기",
      dataIndex: "cl_seq",
      key: "cl_seq",
      // render: () => (
      //   <button
      //     style={{
      //       background: "transparent",
      //       border: "none",
      //       boxShadow: "0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0,0,0,.04)",
      //       borderRadius: 4,
      //       padding: 4,
      //     }}
      //   >
      //     <KeyboardArrowRightIcon />
      //   </button>
      // ),
    },
  ];

  const data = [
    {
      stock_id: "창고이름1",
      stock_name: "콜라 외 24종",
      cl_seq: "버튼",
    },
    {
      stock_id: "창고이름2",
      stock_name: "사이다 외 8종",
      cl_seq: "버튼",
    },
    {
      stock_id: "창고이름3",
      stock_name: "환타 외 60종",
      cl_seq: "버튼",
    },
  ];

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
