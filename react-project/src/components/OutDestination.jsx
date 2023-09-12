import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

function OutDestination() {

  const com_seq = "1004"


const [desDetailList,setDesDetailList] =([]);

// 배송지 디테일 정보 불러오기

const desDetail = async()=>{
  const userData = {
    com_seq: com_seq
  }
  try {
    const response = await axios.post('http://localhost:8000/out/des/detail', userData)

    if (response.status === 200) {
      console.log('배송지 디테일 정보 가져오기 성공');

      console.log(response.data)


      setDesDetailList(response.data);
      
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("데이터 출력 실패")

    }
  }
}


const [desData,setDesData] = useState([{
  stock_name:'',
  loading_cnt:'',
  stock_shipping_des:''
}])


const detailMap = desDetailList.map((stockItem, s) => {
  const nameDetail = stockItem.stock_name;
  const desAll = desDetailList[s].Loading.map((loadingItem, l) => ({
    stock_name: nameDetail,
    loading_cnt: loadingItem.loading_cnt,
    stock_shipping_des: loadingItem.stock_shipping_des
  }));
  return desAll;
});




useEffect(() => {

 desDetail();
}, [])

    // 도넛 차트
    const donutData = {
        series: [50,40,30,10,0],
        options: {
          chart: {
            type: 'donut',
          },
          legend: {
            position: 'bottom'
          },
          responsive: [{
            breakpoint: 480,
          }],
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    showAlways: true,
                    show: true,
                    label: 'ALARM',
                    fontSize: '12px',
                    color: 'red'
                  },
                  value: {
                    fontSize: '22px',
                    show: true,
                    color: 'blue',
                  },
                },
              }
            }
          },
          labels: ["침입", "배회", "쓰러짐", "화재", "안전모"],
          title: {
            text: '배송지별 통계',
            align: 'center'
          },
        },
      }



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
         
        </tbody>
        <div id="chart">
        <ReactApexChart 
            options={donutData.options}
            series={donutData.series}
            type="donut" 
            width="500"
        />
    </div>

  
    </table>
    <div>
{desData.map((item,index)=>(<span key={index}>{item.stock_name} {item.loading_cnt} {item.stock_shipping_des}</span>))}


</div>
</div>
  )
}

export default OutDestination