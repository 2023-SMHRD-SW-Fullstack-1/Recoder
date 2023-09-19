import React, { useEffect, useState } from 'react'
import Table_HJ from './Table_HJ';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../css/in01.css'
function In_HJ({ inputItem, setInputItem }) {

    const nav = useNavigate()

    // 로그인 데이터 정보
    const id = 'qwer';
    const wh_seq = 1004;
    const com_seq = 1004;

    const [bcData, setBcData] = useState([])

    // 저장한 바코드 리스트 서버로 보내기
    const getBcList = () => {
        console.log('페이지전환', inputItem);
        // const barCode = inputItem.map(item => item.title);
        const barCode = ["001", "002", "003"];
      
    
        axios.post('http://localhost:8000/in/create', { barCode })
            .then(response => {
                console.log('바코드찍힌 리스트 가져오기 성공', response.data);
                setBcData(response.data)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.log(error);
                }
                // 오류 처리
            });
    }
    
   
    const handleBarcode = (record) => {
        console.log("클릭", record);
        const pickBc = {barcode : record.stock_barcode , com_seq:com_seq,stock_seq:record.stock_seq }
        try {
            const response = axios.post('http://localhost:8000/in/send/loading', {pickBc});

            if (response.status === 200) {
                console.log('바코드데이터 전송 성공');
                console.log(response.data);
                nav('/in/create')
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
          title: '가격',
          dataIndex: 'stock_price',
          key: 'stock_price',
          render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
        },
        {
          title: '거래처',
          dataIndex: 'cl_seq',
          key: 'cl_seq',
          render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
        },
        {
          title: '바코드',
          dataIndex: 'stock_barcode',
          key: 'stock_barcode',
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
          title: '등록',
          dataIndex: 'in_btn',
          key: 'in_btn',
          render: (text, record) => (
            <button
              style={{ color: 'darkgray', backgroundColor: 'white' }}
              onClick={() => handleBarcode(record)} // 여기서 함수를 호출하지 않고 클릭 시 실행되도록 콜백으로 전달합니다.
            >
              등록
            </button>
          ),
        },
      ];


    const data = bcData.map((item, idx) => ({
        key: idx+1,
        stock_seq: item.stock_seq,
        stock_name: item.stock_name,
        stock_kind: item.stock_kind,
        stock_price: item.stock_price,
        cl_seq: item.cl_seq,
        stock_barcode: item.stock_barcode,
        stock_expired: item.stock_expired.substring(0,10),
        stock_bal: item.stock_balance_cnt,
        in_btn: '등록',
      }));
    

    // const data = [

    //     {
    //         key: 1,
    //         stock_id: '1',
    //         stock_name: 'Product 1',
    //         stock_kind: 'Type 1',
    //         stock_price: 10.99,
    //         cl_seq: 'Company A',
    //         stock_barcode: '123456',
    //         stock_expired: '2023-09-09',
    //         stock_bal: 100,
    //         in_btn: '등록',
    //         description: 'My name is John Brown'
    //     },
    //     {
    //         key: 2,
    //         stock_id: '2',
    //         stock_name: 'Product 1',
    //         stock_kind: 'Type 1',
    //         stock_price: 10.99,
    //         cl_seq: 'Company A',
    //         stock_barcode: '123456',
    //         stock_expired: '2023-09-09',
    //         stock_bal: 100,
    //         in_btn: '등록',
    //         description: 'My name is John Brown'
    //     },
    //     {
    //         key: 3,
    //         stock_id: '3',
    //         stock_name: 'Product 1',
    //         stock_kind: 'Type 1',
    //         stock_price: 10.99,
    //         cl_seq: 'Company A',
    //         stock_barcode: '123456',
    //         stock_expired: '2023-09-09',
    //         stock_bal: 100,
    //         in_btn: '등록',
    //         description: 'My name is John Brown'
    //     },
    //     {
    //         key: 4,
    //         stock_id: '4',
    //         stock_name: 'Product 1',
    //         stock_kind: 'Type 1',
    //         stock_price: 10.99,
    //         cl_seq: 'Company A',
    //         stock_barcode: '123456',
    //         stock_expired: '2023-09-09',
    //         stock_bal: 100,
    //         in_btn: '등록',
    //         description: 'My name is John Brown'
    //     },
    //     {
    //         key: 5,
    //         stock_id: '5',
    //         stock_name: 'Product 1',
    //         stock_kind: 'Type 1',
    //         stock_price: 10.99,
    //         cl_seq: 'Company A',
    //         stock_barcode: '123456',
    //         stock_expired: '2023-09-09',
    //         stock_bal: 100,
    //         in_btn: '등록',
    //         description: 'My name is John Brown'
    //     },
    //     {
    //         key: 6,
    //         stock_id: '6',
    //         stock_name: 'Product 1',
    //         stock_kind: 'Type 1',
    //         stock_price: 10.99,
    //         cl_seq: 'Company A',
    //         stock_barcode: '123456',
    //         stock_expired: '2023-09-09',
    //         stock_bal: 100,
    //         in_btn: '등록',
    //         description: 'My name is John Brown'
    //     },
    // ];
    
    
    // useEffect(() => {
    //     const data = dataSet();
    //     console.log('data', data);
    //   }, [getBcList]);



    useEffect(() => {
        getBcList()
    },[])

  

    return (
        <div>
            <div id='in01_top'>in01_top</div>
            <Table_HJ columns={columns} data={data} />
        </div>

    )
}

export default In_HJ