import React, { useRef, useState } from 'react';
import '../css/barCode.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
function Barcode({ inputItem, setInputItem }) {

  const nav = useNavigate()

  // input 입력값 관리

  // input id 관리할 변수
  const nextID = useRef(0);
const com_seq = 1;
  // + 버튼 클릭 시 새로운 input 추가
  const addInput = () => {
    const newInputItem = {
      id: nextID.current,
      title: ''
    };

    setInputItem([...inputItem, newInputItem]);
    nextID.current += 1;
  };

  // - 버튼 클릭 시 해당 input 삭제
  const delInput = (id) => {
    setInputItem(inputItem.filter((item) => item.id !== id));
  };

  // input 값 변경 시 해당 input의 title 업데이트
  const handleBarcode = (id, value) => {
    setInputItem(
      inputItem.map((item) =>
        item.id === id ? { ...item, title: value } : item
      )
    );
  };

  // "등록" 버튼 클릭 시 inputItem을 콘솔에 출력
  const sendBarcode = () => {
    console.log('모든 input 값:', inputItem);
    const barCode = inputItem.map(item => item.title);
    const bData = {
      barcode : barCode,
      com_seq : com_seq
    }
    axios.post('http://localhost:8000/in/barcode', bData)
      .then(response => {
        console.log('바코드찍힌 리스트 가져오기 성공', response.data);
        nav('/in/create')
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log(error);
        }
        // 오류 처리
      });
    //   try {
    //     const response = axios.post('http://localhost:8000/in/barcode', barCode);

    //     if (response) {
    //         console.log('바코드데이터 전송 성공');
    //         console.log(response.data);
    //         nav('/in/loading')
    //     }
    // } catch (error) {
    //     if (error.response && error.response.status === 401) {
    //         console.log(error);
    //     }
    // }

  };

  return (
    <div id="bc_container">
      <div id="bc_top">
        <span>바코드 등록</span>
      </div>
      <div id="bc_bottom">
        {inputItem.map((item) => (
          <div key={item.id}>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleBarcode(item.id, e.target.value)}
            />
            <button onClick={addInput}>+</button>
            <button onClick={() => delInput(item.id)}>-</button>
          </div>
        ))}

        <button className="custom-btn btn-1" onClick={sendBarcode}>
          등록
        </button>
      </div>
    </div>
  );
}

export default Barcode;