import React, { useEffect, useState } from 'react'
import Table_HJ from './Table_HJ';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../css/in01.css'
import TopBoard from './Dashboard/TopBoard';


function Out_01() {
  const [outStockList, setOutStockList] = useState([]);
  const id = 'smart';
  const wh_seq = 1;
  const com_seq = 1;



  const [rowOutTable, setRowOutTable] = useState({}); // 초기 값은 빈 객체로 초기화

  const getOutStock = async () => {
    try {
      const response = await axios.post('http://localhost:8000/out/create', { wh_seq: wh_seq });

      if (response.status === 200) {
        console.log('출고예정 리스트 가져오기 성공');
        console.log(response.data);
        setOutStockList(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("데이터 출력 실패");
      }
    }
  }



  const handleOutLoading = (record) => {
    console.log('출고버튼클릭 : ', record);

    const outLoading = record
    try {
      const response =  axios.post('http://localhost:8000/out/create/loading', outLoading);

      if (response.status === 200) {
        console.log('출고데이터 전송 성공');
        console.log(response.data);
        window.location.href = 'http://localhost:3000/out/create';
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error);
      }
    }
  };


  const title = "입고예정"
  const items = []
//tb 목록
const columns = [
  {
    title: '적재ID',
    dataIndex: 'loading_seq',
    key: 'loading_seq',
    render: (text, data, idx) => (
      <span style={{ color: 'darkgray' }}>{text}</span>
    ),
  },
  {
    title: '제품명',
    dataIndex: 'stock_name',
    key: 'stock_name',
    render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
  },
  {
    title: '수량',
    dataIndex: 'loading_cnt',
    key: 'loading_cnt',
    render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
  },
  {
    title: '유통기한',
    dataIndex: 'stock_expired',
    key: 'stock_expired',
    render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
  },
  {
    title: '적재rack',
    dataIndex: 'rack_seq',
    key: 'rack_seq',
    render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
  },
  {
    title: '적재위치',
    dataIndex: 'stock_fp',
    key: 'stock_fp',
    render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
  },
  {
    title: '출고',
    dataIndex: 'out_btn',
    key: 'out_btn',
    render: (text, record) => (
      <button
        style={{
          color: 'black', backgroundColor: 'white',
          width: 60,
          fontSize: 13,
          height: 32,
          paddingRight: 14,
          paddingLeft: 14,
          borderRadius: 6,
          borderColor: 'darkgray'
        }}
        onClick={() => handleOutLoading(record)} // 여기서 함수를 호출하지 않고 클릭 시 실행되도록 콜백으로 전달합니다.
      >
        출고
      </button>
    ),
  },
];

const data1 = outStockList.map(item => item)
const data2 = data1.Racks.map(item => item)
const data3 = data2.Loadings.map(item=>item)


const data = outStockList.map((item, idx) => ({
  data2 = item.Racks.map((rack, ridx) => ({
  key: idx + 1,
  // loading_seq: item.Racks.map((rack, ridx) => ({
    loading_seq: rack.loading_seq,
    stock_name: rack.Loadings.map((loading, lidx) => ({
      stock_name: loading.stock_name,
      loading_cnt: rack.loading_cnt,
      stock_expired: loading.stock_price,
      rack_seq: rack.rack_seq,
      stock_fp: rack.loading_floor + rack.loading_position,
      out_btn: '출고',
    })),
  })),
}));


const [showInput, setShowInput] = useState(false);
const handleInputPluse = (e) => {
  console.log("배송지 선택 클릭");
  console.log(e.target.value);
  if (e.target.value === "직접입력") {
    setShowInput(true);
  } else {
    setShowInput(false);
  }
};

useEffect(() => {
  getOutStock();
}, []);

return (
  <div id='out_all'>
    <div id='in_comtainer'>
      <div id='in01_top'><TopBoard title={title} items={items} /></div>
      <div id='in01_bottom'>
        <Table_HJ columns={columns} data={data} />
      </div>
    </div>

  </div>
);
}

export default Out_01;