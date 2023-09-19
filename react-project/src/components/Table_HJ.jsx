import React from 'react';
import { Table } from 'antd';
import '../css/in_hj.css'

const Table_HJ = ({columns,data}) => (
        <div id = 'in01_tb_div'>
  <Table style={{color:'darkgray'}}
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.description}
        </p>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
  </div>
);
export default Table_HJ;

