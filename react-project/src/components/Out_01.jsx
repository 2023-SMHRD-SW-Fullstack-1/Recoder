import React from 'react'
import '../Out_01.css'
import {useState} from 'react'
// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Out_01() {

  // 테이블 클릭시 추가 화면 렌더링 함수
    const [isOpen, setIsOpen] = useState(false);

    const handleRowClick = () => {
      setIsOpen(!isOpen);
    };


   const rowData = 1
  
  return (
    <div id = 'out_all'>
<div id='out_top'>
<span id="out_title">출고</span>

<div id="out_input_container">
<input id="out_input" />
<FontAwesomeIcon id="out_input_icon" icon={faMagnifyingGlass} />
<select id="out_filter">filter</select>
</div>

</div>

    {/* 테이블 */}
    <div className="out_table">
  <table className='out_table_containor'>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
        <th>Column 4</th>
        <th>Column 5</th>
      </tr>
    </thead>
    <tbody>
      <tr  className={`view ${isOpen ? 'open' : ''}`} onClick={handleRowClick}>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
        <td>Cell 4</td>
        <td>Cell 5</td>
      </tr>
      <tr className={`fold ${isOpen ? 'open' : ''}`}>
          {/* Your folded content here */}
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
        <td>Cell 4</td>
        <td>Cell 5</td>
      </tr>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
        <td>Cell 4</td>
        <td>Cell 5</td>
      </tr>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
        <td>Cell 4</td>
        <td>Cell 5</td>
      </tr>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
        <td>Cell 4</td>
        <td>Cell 5</td>
      </tr>
    </tbody>
  </table>


</div>
    </div>
  )
}

export default Out_01