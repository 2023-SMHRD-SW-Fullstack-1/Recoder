import React from 'react'
import '../Out_01.css'

function out_01() {
  return (

    <div id='out_01'>
      <div id='out_01_top'>
        <button className='out_01_button'>출고등록</button>
        <button className='out_01_button'>출고이력</button>
        <button className='out_01_button'>배송지관리</button>
      </div>
      <div id='out_01_bottom'>
        <table>
          <tr>
            <td>체크박스</td>
            <td>제품ID</td>
            <td>제품코드</td>
            <td>제품명</td>
            <td>용량</td>
            <td>수량</td>
            <td>입고일</td>
            <td>유통기한</td>
            <td>적재위치</td>
          </tr>
        </table>
      </div>

    </div>
  )
}

export default out_01