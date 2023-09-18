import React from 'react'
import Table_HJ from './Table_HJ';


function In_HJ() {

    const handleBarcode = (record)=>{
        console.log("클릭",record);
    }

    // Table_HJ 컴포넌트 props 데이터
    const columns = [
        {
            title: '제품ID',
            dataIndex: 'stock_id',
            key: 'stock_id',
            render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
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
            render: (text,record) => <button style={{ color: 'darkgray', backgroundColor:'white' }}
            onClick={handleBarcode(record)}
            >등록</button>,
           
        }
    ];

    const data = [
     
        {
            key: 1,
            stock_id: '1',
            stock_name: 'Product 1',
            stock_kind: 'Type 1',
            stock_price: 10.99,
            cl_seq: 'Company A',
            stock_barcode: '123456',
            stock_expired: '2023-09-09',
            stock_bal: 100,
            in_btn: '등록',
            description: 'My name is John Brown'
        },
        {
            key: 2,
            stock_id: '2',
            stock_name: 'Product 1',
            stock_kind: 'Type 1',
            stock_price: 10.99,
            cl_seq: 'Company A',
            stock_barcode: '123456',
            stock_expired: '2023-09-09',
            stock_bal: 100,
            in_btn: '등록',
            description: 'My name is John Brown'
        },
        {
            key: 3,
            stock_id: '3',
            stock_name: 'Product 1',
            stock_kind: 'Type 1',
            stock_price: 10.99,
            cl_seq: 'Company A',
            stock_barcode: '123456',
            stock_expired: '2023-09-09',
            stock_bal: 100,
            in_btn: '등록',
            description: 'My name is John Brown'
        },
        {
            key: 4,
            stock_id: '4',
            stock_name: 'Product 1',
            stock_kind: 'Type 1',
            stock_price: 10.99,
            cl_seq: 'Company A',
            stock_barcode: '123456',
            stock_expired: '2023-09-09',
            stock_bal: 100,
            in_btn: '등록',
            description: 'My name is John Brown'
        },
        {
            key: 5,
            stock_id: '5',
            stock_name: 'Product 1',
            stock_kind: 'Type 1',
            stock_price: 10.99,
            cl_seq: 'Company A',
            stock_barcode: '123456',
            stock_expired: '2023-09-09',
            stock_bal: 100,
            in_btn: '등록',
            description: 'My name is John Brown'
        },
        {
            key: 6,
            stock_id: '6',
            stock_name: 'Product 1',
            stock_kind: 'Type 1',
            stock_price: 10.99,
            cl_seq: 'Company A',
            stock_barcode: '123456',
            stock_expired: '2023-09-09',
            stock_bal: 100,
            in_btn: '등록',
            description: 'My name is John Brown'
        },
    ];


    return (
        <div>
           
            <Table_HJ columns={columns} data={data} />
            </div>

    )
}

export default In_HJ