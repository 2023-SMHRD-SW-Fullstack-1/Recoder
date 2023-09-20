import React from "react";
import { Table } from "antd";

const StockTable = ({ columns, data }) => {
  return (
    <Table
      style={{ color: "darkgray" }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default StockTable;
