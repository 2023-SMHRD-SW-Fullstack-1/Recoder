import React from "react";
import StockTable from "./StockTable";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import '../../css/stock.css'

const StockDataList = ({ stockList }) => {  

  const columns = [
    {
      title: "제품ID",
      dataIndex: "stock_id",
      key: "stock_id",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "제품명",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "품목명",
      dataIndex: "stock_kind",
      key: "stock_kind",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "입고일자",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "수량",
      dataIndex: "stock_bal",
      key: "stock_bal",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "이미지",
      dataIndex: "stock_img",
      key: "stock_img",
      render: (text) => (
        <img
          src={`http://localhost:8000/img/${text}`}
          style={{
            width: 60,
            height: 60,
            display: 'inline-flex'
          }}
        ></img>
      ),
    },
    {
      title: "적재 위치",
      dataIndex: "loading_position",
      key: "loading_position",
      render: () => (
        <button
          style={{
            background: 'transparent',
            border: 'none',
            boxShadow: '0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0,0,0,.04)',
            borderRadius: 4,
            padding: 4
          }}
        ><WarehouseIcon
          sx={{ color: 'gray' }}
        /></button>
      ),
    },
    {
      title: "재고소진 알림",
      dataIndex: "stock_notice_cnt",
      key: "stock_notice_cnt",
      render: () => (
        <div id="stock-input-div">
          <div id="stock-input-box">
            <input type="text" id="stock-input" />
            <button
              style={{
                background: 'transparent',
                border: 'none',
              }}
            >
              <AddAlarmIcon sx={{ color: 'gray' }} />
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "유통기한",
      dataIndex: "stock_expired",
      key: "stock_expired",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
    {
      title: "구매처",
      dataIndex: "cl_name",
      key: "cl_name",
      render: (text) => <span style={{ color: "darkgray" }}>{text}</span>,
    },
  ];

  const data = stockList.map((item, idx) => ({
    key: idx + 1,
    stock_id: item.Stock.stock_seq,
    stock_name: item.Stock.stock_name,
    stock_kind: item.Stock.stock_kind,
    created_at: item.created_at,
    stock_expired: item.Stock.stock_expired,
    stock_bal: item.Stock.stock_balance_cnt,
    stock_img: item.Stock.stock_img,
    cl_name: item.Stock.Client?.cl_name,
  }));  

  return <StockTable columns={columns} data={data} />;
};

export default StockDataList;
