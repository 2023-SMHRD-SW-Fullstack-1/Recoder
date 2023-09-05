import React from 'react'
import '../Out_01.css'
import {useState} from 'react'
// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function Out_01() {

    const [isOpen, setIsOpen] = useState(false);

    const handleRowClick = () => {
      setIsOpen(!isOpen);
    };
  
  return (
    <div>
<div>
<h3 id="out_title">출고</h3>
<h3></h3>
<select id="out_filter">filter</select>
<input id="out_input" />
<FontAwesomeIcon id="out_input_icon" icon={faMagnifyingGlass} />
</div>

    {/* 테이블 */}
    <div className="out_table">
  <table>
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