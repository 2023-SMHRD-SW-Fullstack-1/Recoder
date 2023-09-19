import React, { useEffect, useState } from 'react'
import Table_HJ from './Table_HJ'
import axios from 'axios';
import In02Add from './In02Add';
import { useNavigate } from 'react-router';

function In_02() {

    const nav = useNavigate()

    const id = 'qwer';
    const wh_seq = 1004;
    const com_seq = 1004;

    const [loadingList,setLoadingList] = useState([])

    const getList = ()=>{

        axios.post('http://localhost:8000/in/get/loading', { com_seq })
        .then(response => {
            console.log('입고등록할 리스트', response.data);
            setLoadingList(response.data)
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                console.log(error);
            }
            // 오류 처리
        });
}

const delHandler = (record)=>{
console.log('취소클릭',record);
const stock_seq = record.stock_seq
try {
    const response = axios.post('http://localhost:8000/in/del/loaing', stock_seq);

    if (response.status === 200) {
        console.log('바코드데이터 전송 성공');
        console.log(response.data);
        nav('/in/loading')
    }
} catch (error) {
    if (error.response && error.response.status === 401) {
        console.log(error);
    }
}
}


//tb 목록
const columns = [
    {
      title: 'ID',
      dataIndex: 'stock_seq',
      key: 'stock_seq',
      render: (text, data, idx) => (
        <span style={{ color: 'darkgray' }}>{text}</span>
      ),
    },
    {
        title: '적재코드',
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
      title: '종류',
      dataIndex: 'stock_kind',
      key: 'stock_kind',
      render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
    },
    {
      title: '거래처',
      dataIndex: 'cl_seq',
      key: 'cl_seq',
      render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
    },
    {
      title: '유통기한',
      dataIndex: 'stock_expired',
      key: 'stock_expired',
      render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
    },
    {
      title: '수량',
      dataIndex: 'stock_bal',
      key: 'stock_bal',
      render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
    },
    {
      title: '입고취소',
      dataIndex: 'del_btn',
      key: 'del_btn',
      render: (text, record) => (
        <button
          style={{ color: 'darkgray', backgroundColor: 'white' }}
          onClick={() => delHandler(record)} // 여기서 함수를 호출하지 않고 클릭 시 실행되도록 콜백으로 전달합니다.
        >
        취소
        </button>
      ),
    },
  ];


// map으로 data 전달
const data = loadingList.map((Litem, Lidx) => ({
    key: Lidx+1,
    stock_seq: Litem.stock_seq,
    loading_seq : Litem.loading_seq,
    stock_name: Litem.Stock.stock_name,
    stock_kind: Litem.Stock.stock_kind,
    stock_price: Litem.Stock.stock_price,
    cl_seq: Litem.Stock.cl_seq,
    stock_barcode: Litem.Stock.stock_barcode,
    stock_expired: Litem.Stock.stock_expired.substring(0,10),
    stock_bal: Litem.Stock.stock_balance_cnt,
    in_btn: '입고취소',
    description: <In02Add/>
  }));

  useEffect(()=>{
    getList()
  },[])

  return (
    <div>
        <Table_HJ columns={columns} data={data} />
    </div>
  )
}

export default In_02