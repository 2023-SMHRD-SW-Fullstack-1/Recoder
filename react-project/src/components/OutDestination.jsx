import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import '../css/outDes.css'
import 'chartjs-plugin-datalabels'



Chart.register(ArcElement);



function OutDestination() {

  const com_seq = 1004
  const wh_seq = 1004


  const [desData, setDesData] = useState([])

  // 출고품 이름 담을 변수
  const [sName, setSname] = useState([])


  // 출고품 리스트 정보 불러오기
  const desDetail = async () => {
    const userData = {
      com_seq: com_seq,
      wh_seq: wh_seq

    }
    try {
      const response = await axios.post('http://localhost:8000/out/des', userData)

      if (response.status === 200) {
        console.log('출고품 정보 가져오기 성공');

        console.log(response.data)

        setDesData(response.data)

        const stockNames = response.data.reduce((accumulator, warehouse) => {
          warehouse.Racks.forEach((rack) => {
            rack.Loadings.forEach((loading) => {
              accumulator.push(loading.Stock.stock_name);
            });
          });
          return accumulator;
        }, []);



        setSname(stockNames);



      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("데이터 출력 실패")

      }
    }
  }

  // sName 배열의 중복 제거
  const oneSname = [...new Set(sName)]
  console.log("중복제거?", oneSname);


  // 테이블 클릭 이벤트
  const [rowOutTable, setRowOutTable] = useState([].fill(false));

  const handleRowClick = (idx) => {
    console.log('클릭  인덱스', idx);
    setRowOutTable((prevRowOutTable) => {
      const newRowOutTable = [...prevRowOutTable];
      newRowOutTable[idx] = !newRowOutTable[idx];
      return newRowOutTable;
    });
  };


  // 차트 데이터
  const percents = [10, 20, 30, 50]

  const data = {
    datasets: [
      {
        data: percents,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
      },
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green'],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // 라벨 표시 활성화
        position: 'center', // 라벨 위치 설정 (top, bottom, left, right 등)
      },
      datalabels: {
        display: true, // 라벨 표시 활성화
        color: 'white', // 라벨 텍스트 색상 설정
        font: {
          size: 14, // 라벨 텍스트 크기 설정
        },
        formatter: (value) => {
          return value + '%'; // 라벨 텍스트 형식 지정 (예: '10%')
        },
      },
    },
  };




  useEffect(() => {

    desDetail();
  }, [])




  return (
    <div className="out_table">
    <table className="container">
      <thead>
        <tr>
          <th>
            <h1>제품ID</h1>
          </th>
          <th>
            <h1>제품명</h1>
          </th>
          <th>
            <h1>마지막 출고일</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {oneSname.map((item, idx) => (
          <React.Fragment key={idx}>
            <tr   onClick={() => handleRowClick(idx)}
                    className={rowOutTable[idx] ? 'selected' : ''}>
              <td  className={`out_table_id ${rowOutTable[idx] ? 'open' : ''}`}>{item}</td>
              <td>test</td>
              <td>test</td>
            </tr>
            {rowOutTable[idx] && (
              <tr>
                <td id='out_table_fold' colSpan={3}>
                  {/* 도넛차트 */}
                  <div id='doughnut'>
                    <Doughnut data={data} options={options} />
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    
</div>
  )
            }
 export default OutDestination;