import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import 'chartjs-plugin-datalabels'


function OutDesAdd({charData, setCharData }) {

    Chart.register(ArcElement);


    const labels = charData.map(item => item.Loading.stock_shipping_des);
    const cntData = charData.map(item => item.total_loading_cnt);
    const total = cntData.reduce((acc, value) => acc + value, 0); // 데이터 배열의 합계 계산
    const percentData = cntData.map(value => ((value / total) * 100).toFixed(2)); // 각 데이터 항목의 퍼센트 계산


    labels = labels
    percentData = total
    const data = {
        labels: labels,
        datasets: [
            {
                labels: labels,
                data: percentData,
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



    return (
        <div >
            <div id='doughnut_1'  style={{height:300}}> <Doughnut data={data} options={options} /></div>
            <div id='des_div'>
                <table id='des_table'>
                    <tr>
                        <td>배송지</td>
                        <td>판매량</td>
                    </tr>
                    {/* {charData.map((item, idx) => (
                                    <tr key={idx} >
                                      <td >{item.Loading.stock_shipping_des}</td>
                                      <td >{item.total_loading_cnt}</td>
                                    </tr>
                                  ))} */}
                    <td >zz</td>
                    <td >zz</td>
                </table>
            </div>

        </div>
    )
}

export default OutDesAdd