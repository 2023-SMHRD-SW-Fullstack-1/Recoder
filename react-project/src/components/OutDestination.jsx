import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import '../css/outDes.css'
import 'chartjs-plugin-datalabels'








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

        const stockNames = response.data.reduce((reStockName, warehouse) => {
          warehouse.Racks.forEach((rack) => {
            rack.Loadings.forEach((loading) => {
              reStockName.push(loading.Stock.stock_name);
            });
          });
          return reStockName;
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

  // 클릭한 품목 데이터 저장 함수
  const [sNameList, setSnameList] = useState([])



  // 항목 클릭 이벤트 작동
  const handleRowClick = (idx, item) => {
    console.log('클릭  인덱스', idx);
    setRowOutTable((prevRowOutTable) => {
      const newRowOutTable = [...prevRowOutTable];
      newRowOutTable[idx] = !newRowOutTable[idx];
      return newRowOutTable;
    });
    console.log('클릭한 항목', item);
    let stock_name = {
      wh_seq: wh_seq,
      stock_name: item
    }

    // 항목에 대한 데이터 다시 불러오기
    const stockNameData = async () => {

      try {
        const response = await axios.post('http://localhost:8000/out/des/name', stock_name)

        if (response.status === 200) {
          console.log('출고품 정보 가져오기 성공');

          console.log(response.data)

          // 배송지 정보 배열에 저장
          setSnameList(response.data.flatMap(warehouse =>
            warehouse.Racks.flatMap(rack =>
              rack.Loadings.map(loading => loading.stock_shipping_des)
            )
          ))
        };
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("데이터 출력 실패")

        }
      }
    }
    stockNameData();
    chartDataKey();

  };

      // 품목 배송지 중복 제거
      const oneSnameList =[...new Set(sNameList)]
    

const [chartData, setChartData] = useState( {});

const chartDataKey = ()=>{
  const newChartData = { ...chartData };
  for (let i = 0; i < oneSnameList.length; i++) {
    newChartData[oneSnameList[i]] = 0;
  }
  setChartData(newChartData);
};


  const [dateData, setDateData] = useState({
    day1: '',
    day2: ''
  })
  // 기간 설정 함수
  const sDate = (e) => {
    if (e.target.name == 'day1') {
      console.log("시작", e.target.value);
      setDateData({ ...dateData, day1: e.target.value })
    } else {
      console.log("끝", e.target.value);
      setDateData({ ...dateData, day2: e.target.value })
    }

  }

  // 기간 조회 버튼 클릭
  const reSdate = () => {
    console.log('조회기간', dateData);
  }

  // 차트 데이터
  Chart.register(ArcElement, Tooltip, Legend);
  const percents = [10, 20, 30, 50]

  const data = {
    labels: oneSnameList,
    datasets: [
      {
        labels: ['Red', 'Orange', 'Yellow', 'Green'],
        data: percents,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
      },
    ]

  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // 라벨 표시 활성화
        position: 'top', // 라벨 위치 설정 (top, bottom, left, right 등)
      },
      datalabels: {
        display: true, // 라벨 표시 활성화
        // color: 'white', // 라벨 텍스트 색상 설정
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
    <div id='out_all'>

      <div id='des_top'>
        <span id="des_title">품목 관리</span>
        <br />
        <span >기간 설정</span>
        <br />

        <input onChange={sDate} name='day1' type='date' id="aa" />
        <span style={{ margin: 20 }}>~</span>
        <input onChange={sDate} name='day2' type='date' id="bb" />
        <button onClick={reSdate} className="custom-btn btn-1">조회</button>
      </div>

      <div className="out_table">
        <table className="container">
          <thead>
            <tr>
              <th>
                <h1>제품명</h1>
              </th>
              <th>
                <h1>데이터</h1>
              </th>
              <th>
                <h1>데이터2</h1>
              </th>
            </tr>
          </thead>

          {oneSname.map((item, idx) => (
            <React.Fragment key={idx}>
              <tbody>
                <tr>
                  <td id='des_td' onClick={() => handleRowClick(idx, item)}
                    className={rowOutTable[idx] ? 'selected' : ''} >{item}</td>
                  <td>test</td>
                  <td>test</td>
                </tr>
              </tbody>
              {rowOutTable[idx] && (

                <tr>
                  <td id='out_table_fold' colSpan={3}>
                    <div id='doughnut_div'>
                      <div id='doughnut'>  <Doughnut data={data} options={options} /></div>
                      <div id='doughnut_2'>

                        <span>추가할 데이터</span>
                        <span>추가할 데이터</span>
                        {sNameList.map((item, idx) => (<span key={idx}>{item}</span>))}
                      </div>
                    </div>
                  </td>
                </tr>



              )}
            </React.Fragment>
          ))}

        </table>

      </div>
    </div>
  )
}
export default OutDestination;