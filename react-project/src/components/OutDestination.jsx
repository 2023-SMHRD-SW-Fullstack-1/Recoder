import React, { useEffect, useState } from 'react'
import Table_HJ from './Table_HJ';
import axios from 'axios';
import { useNavigate } from 'react-router';
import TopBoard from './Dashboard/TopBoard';
import OutDesAdd from './Dashboard/OutDesAdd';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import 'chartjs-plugin-datalabels'


function OutDestination() {

const id='smart'
const wh_seq = 1
const com_seq =1

Chart.register(ArcElement);
//  출고품 리스트 관리
const [desData,setDesData] = useState([])


// 출고품 리스트 가져와서 페이지 렌더링 하기
const desNameList = async ()=>{
  const userData = {
    com_seq:com_seq,
    wh_seq:wh_seq
  }
  try {
    const response = await axios.post('http://localhost:8000/out/des/name', userData)
    if(response.status === 200){
      console.log('출고항목',response.data);
      setDesData(response.data)
    }
  } catch (error) {
    console.log('출고항목 가져오기 실패',error);
  }
}

// 특정 품목 데이터 관리
const [charData,setCharData] = useState([])

const [stockName,setStockName] = useState([])
 // 항목에 대한 데이터 다시 불러오기
 const stockNameData = async () => {

  try {
    const response = await axios.post('http://localhost:8000/out/des/count', {stock_name : stockName})

    if (response.status === 200) {

      console.log("특정제품 데이터", response.data)
      setCharData(response.data)

    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("데이터 출력 실패")

    }
  }
}





const handleRow = (record) => {
  console.log('클릭된 행 데이터',record);
  // setCharData(record)
  setStockName(record.stock_name)
  stockNameData()
}

const labels = '빨강'
const percentData = 100


const title = "입고예정"
const items = []


//tb 목록
const columns = [
{
  title: '제품명',
  dataIndex: 'stock_name',
  key: 'stock_name',
  render: (text, data, idx) => (
    <span style={{ color: 'darkgray' }}>{text}</span>
  ),
},
{
  title: '전체 출고량',
  dataIndex: 'total_loading_cnt',
  key: 'total_loading_cnt',
  render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
},
{
  title: '마지막 출고일',
  dataIndex: 'out_created_at',
  key: 'out_created_at',
  render: (text) => <span style={{ color: 'darkgray' }}>{text}</span>,
}
]

const data1 = desData.map(item => item.Racks);
const data2 = data1.map(racks => racks.map(rack => rack.Loadings));
const data3 = data2.flat(2); // Loadings 배열을 평탄화합니다.

const data = data3.map((loading, idx) => ({

  key: idx + 1,
  stock_name: loading.Stock.stock_name,
  total_loading_cnt: loading.total_loading_cnt,
  out_created_at: loading.out_created_at.substring(0,10),
  description:<OutDesAdd   
   onRow={(record, rowIdx) => ({
    onClick: () =>handleRow(record), })} 
 charData={charData} setCharData={setCharData} />
})).flat(1) 


useEffect(()=>{
  desNameList()
},[])


  return (
    <div id='out_all'>
    <div id='in_comtainer'>
      <div id='in01_top'><TopBoard title={title} items={items} /></div>
      <div id='in01_bottom'>
      <Table_HJ
            rowKey="stock_name"
            onRow={(record, rowIdx) => ({
              onClick: () =>handleRow(record),
            })}
            columns={columns}
            data={data}
          />
      </div>
    </div>

  </div>
  )
}

export default OutDestination