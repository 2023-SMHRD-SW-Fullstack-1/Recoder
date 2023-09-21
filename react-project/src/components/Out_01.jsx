import React, { useEffect, useState } from 'react'
import Table_HJ from './Table_HJ';
import axios from 'axios';
import { useNavigate } from 'react-router';
import TopBoard from './Dashboard/TopBoard';
import { Button, Modal } from 'antd';

function Out_01() {
  const [outStockList, setOutStockList] = useState([]);
  const id = 'smart';
  const wh_seq = 1;
  const com_seq = 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [desList, setDesList] = useState([])

  const outData = {
    wh_seq: wh_seq,
    com_seq: com_seq
  }
  const getOutStock = async () => {
    try {
      const response = await axios.post('http://localhost:8000/out/create', outData);

      if (response.status === 200) {
        console.log('출고예정 리스트 가져오기 성공');
        console.log(response.data);
        setOutStockList(response.data.result1);
        setDesList(response.data.result2);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("데이터 출력 실패");
      }
    }
  }



  const handleOutLoading = (record) => {
    console.log('출고버튼클릭 : ', record);
    setIsModalOpen(true)
    const outLoading = record
    // try {
    //   const response =  axios.post('http://localhost:8000/out/create/loading', outLoading);

    //   if (response.status === 200) {
    //     console.log('출고데이터 전송 성공');
    //     console.log(response.data);
    //     window.location.href = 'http://localhost:3000/out/create';
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     console.log(error);
    //   }
    // }
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
      title: '적재위치',
      dataIndex: 'rack_seq',
      key: 'rack_seq',
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



  const data1 = outStockList.map(item => item.Racks);
  const data2 = data1.map(racks => racks.map(rack => rack.Loadings));
  const data3 = data2.flat(2); // 이렇게 수정하여 모든 로딩을 하나의 배열로 평탄화합니다.

  const data = data3.map((loading, idx) => ({
    key: idx + 1,
    loading_seq: loading.loading_seq,
    stock_name: loading.Stock.stock_name,
    loading_cnt: loading.loading_cnt,
    stock_expired: loading.Stock.stock_expired.substring(0, 10),
    rack_seq: `${loading.rack_seq}랙 ${loading.loading_floor}층 ${loading.loading_position}`,
    out_btn: '출고'
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
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div id='out_modal'>
          <span>출고일</span><input type='date'></input><br />
          <span>출고수량</span><input type='text'></input><br />
          <select id="out_filter">
            {desList.map((item, idx) => (
              <option key={idx} value={item.stock_shipping_des} name='choice_des'>
                {item.stock_shipping_des}
              </option>
            ))}
            <option>직접입력</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}

export default Out_01;