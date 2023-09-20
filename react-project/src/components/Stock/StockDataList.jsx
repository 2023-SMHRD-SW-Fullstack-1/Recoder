import React from "react";
import StockTable from "./StockTable";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import '../../css/stock.css'

const StockDataList = () => {
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
      render: () => (
        <img
          src='/img/background.jpg'
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

  // const data = list.map((item, idx) => ({
  //   key: idx + 1,
  //   stock_id: item.Stock.stock_seq,
  //   stock_name: item.Stock.stock_kind,
  //   stock_kind: item.Stock.cl_seq,
  //   loading_position: item.loading_position,
  //   stock_expired: item.Stock.stock_expired,
  //   stock_bal: item.Stock.stock_balance_cnt,
  // }));

  const data = [
    {
      key: 1,
      stock_id: "1",
      stock_name: "Product 1",
      stock_kind: "품목1",
      created_at: "2023-09-09",
      stock_bal: "Company A",
      stock_img: "123456",
      loading_position: "2023-09-09",
      stock_notice_cnt: 100,
      stock_expired: "2023-09-09",
      cl_name: "fht",
    },
    {
      key: 2,
      stock_id: "2",
      stock_name: "Product 1",
      stock_kind: "품목1",
      created_at: "2023-09-09",
      stock_bal: "Company A",
      stock_img: "123456",
      loading_position: "2023-09-09",
      stock_notice_cnt: 100,
      stock_expired: "2023-09-09",
      cl_name: "My name is John Brown",
    },
    {
      key: 3,
      stock_id: "3",
      stock_name: "Product 1",
      stock_kind: "품목1",
      created_at: "2023-09-09",
      stock_bal: "Company A",
      stock_img: "123456",
      loading_position: "2023-09-09",
      stock_notice_cnt: 100,
      stock_expired: "2023-09-09",
      cl_name: "My name is John Brown",
    },
    {
      key: 4,
      stock_id: "4",
      stock_name: "Product 1",
      stock_kind: "품목1",
      created_at: "2023-09-09",
      stock_bal: "Company A",
      stock_img: "123456",
      loading_position: "2023-09-09",
      stock_notice_cnt: 100,
      stock_expired: "2023-09-09",
      cl_name: "My name is John Brown",
    },
    {
      key: 5,
      stock_id: "5",
      stock_name: "Product 1",
      stock_kind: "품목1",
      created_at: "2023-09-09",
      stock_bal: "Company A",
      stock_img: "123456",
      loading_position: "2023-09-09",
      stock_notice_cnt: 100,
      stock_expired: "2023-09-09",
      cl_name: "My name is John Brown",
    },
    {
      key: 6,
      stock_id: "6",
      stock_name: "Product 1",
      stock_kind: "품목1",
      created_at: "2023-09-09",
      stock_bal: "Company A",
      stock_img: "123456",
      loading_position: "2023-09-09",
      stock_notice_cnt: 100,
      stock_expired: "2023-09-09",
      cl_name: "My name is John Brown",
    },
  ];

  return <StockTable columns={columns} data={data} />;
};

export default StockDataList;
