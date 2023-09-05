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

<h3 id="node1">출고</h3>
<h3></h3>
<select id="node6">filter</select>
<input id="node3" />
<FontAwesomeIcon id="node4" icon={faMagnifyingGlass} />

    {/* 테이블 */}
    HTML SCSS JSResult Skip Results Iframe
EDIT ON
<table className="fold-table">
  <thead>

    <tr >
      <th>Company</th>
      <th>Amount</th>
      <th>Value</th>
      <th><span className="visible-small" title="Premiumns">Prem.</span><span className="visible-big">Premiums</span></th>
      <th><span className="visible-small" title="Strategy A">Str. A</span><span className="visible-big">Strategy A</span></th>
      <th><span className="visible-small" title="Strategy B">Str. B</span><span className="visible-big">Strategy B</span></th>
      <th><span className="visible-small" title="Strategy C">Str. C</span><span className="visible-big">Strategy C</span></th>
    </tr>
  </thead>
  <tbody>
    <tr  className={`view ${isOpen ? 'open' : ''}`} onClick={handleRowClick}>
      <td>Company Name</td>
      <td className="pcs">457</td>
      <td className="cur">6 535 178</td>
      <td>-</td>
      <td className="per">50,71</td>
      <td className="per">49,21</td>
      <td className="per">0</td>
    </tr>
    {/* 클릭시 나타날 테이블 */}
    <tr >
      <td colspan="7">
        <div className="fold-content">
          <h3>Company Name</h3>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          <table className="small-friendly">
            <thead>
              <tr>
                <th><span className="visible-small" title="Company name">Comp. name</span><span className="visible-big">Company name</span></th>
                <th><span className="visible-small" title="Customer number">Cust.#</span><span className="visible-big">Customer no</span></th>
                <th><span className="visible-small" title="Customer name">Cust. name</span><span className="visible-big">Customer name</span></th>
                <th><span className="visible-small" title="Insurance number">Ins.#</span><span className="visible-big">Insurance no</span></th>
                <th><span className="visible-small" title="Strategy">Str.</span><span className="visible-big">Strategy</span></th>
                <th>Start</th>
                <th><span className="visible-small" title="Current">Cur.</span><span className="visible-big">Current</span></th>
                <th>Diff</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-th="Company name">Sony</td>
                <td data-th="Customer no">13245</td>
                <td data-th="Customer name">John Doe</td>
                <td data-th="Insurance no">064578</td>
                <td data-th="Strategy">A, 100%</td>
                <td data-th="Start"><span className="cur">20 000</span></td>
                <td data-th="Current"><span className="cur">33 000</span></td>
                <td data-th="Diff"><span className="cur">13 000</span></td>
              </tr>
              <tr>
                <td data-th="Company name">Packard Bell</td>
                <td data-th="Customer no">12457</td>
                <td data-th="Customer name">Howard Steel</td>
                <td data-th="Insurance no">064353</td>
                <td data-th="Strategy">A, 100%</td>
                <td data-th="Start"><span className="cur">52 000</span></td>
                <td data-th="Current"><span className="cur">82 000</span></td>
                <td data-th="Diff"><span className="cur">40 000</span></td>
              </tr>
              <tr>
                <td data-th="Company name">Apple</td>
                <td data-th="Customer no">23885</td>
                <td data-th="Customer name">Jack Blue</td>
                <td data-th="Insurance no">068874</td>
                <td data-th="Strategy">B, 100%</td>
                <td data-th="Start"><span className="cur">30 500</span></td>
                <td data-th="Current"><span className="cur">42 000</span></td>
                <td data-th="Diff"><span className="cur">11 500</span></td>
              </tr>
              <tr>
                <td data-th="Company name">Samsung</td>
                <td data-th="Customer no">13981</td>
                <td data-th="Customer name">Chung Pi Kah</td>
                <td data-th="Insurance no">068112</td>
                <td data-th="Strategy">C, 100%</td>
                <td data-th="Start"><span className="cur">100 000</span></td>
                <td data-th="Current"><span className="cur">133 000</span></td>
                <td data-th="Diff"><span className="cur">33 000</span></td>
              </tr>
            </tbody>
          </table>          
        </div>
      </td>
    </tr>
    {/* <!-- Row --> */}
    <tr className={`view ${isOpen ? 'open' : ''}`} onClick={handleRowClick}>
      <td>Company Name</td>
      <td className="pcs">457</td>
      <td className="cur">6 535 178</td>
      <td>-</td>
      <td className="per">50,71</td>
      <td className="per">49,21</td>
      <td className="per">0</td>
    </tr>
    <tr className={`fold ${isOpen ? 'open' : ''}`}>
      <td colspan="7">
        <div className="fold-content">
          <h3>Company Name</h3>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          <table className="small-friendly">
            <thead>
              <tr>
                <th><span className="visible-small" title="Company name">Comp. name</span><span className="visible-big">Company name</span></th>
                <th><span className="visible-small" title="Customer number">Cust.#</span><span className="visible-big">Customer no</span></th>
                <th><span className="visible-small" title="Customer name">Cust. name</span><span className="visible-big">Customer name</span></th>
                <th><span className="visible-small" title="Insurance number">Ins.#</span><span className="visible-big">Insurance no</span></th>
                <th><span className="visible-small" title="Strategy">Str.</span><span className="visible-big">Strategy</span></th>
                <th>Start</th>
                <th><span className="visible-small" title="Current">Cur.</span><span className="visible-big">Current</span></th>
                <th>Diff</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-th="Company name">Sony</td>
                <td data-th="Customer no">13245</td>
                <td data-th="Customer name">John Doe</td>
                <td data-th="Insurance no">064578</td>
                <td data-th="Strategy">A, 100%</td>
                <td data-th="Start"><span className="cur">20 000</span></td>
                <td data-th="Current"><span className="cur">33 000</span></td>
                <td data-th="Diff"><span className="cur">13 000</span></td>
              </tr>
              <tr>
                <td data-th="Company name">Packard Bell</td>
                <td data-th="Customer no">12457</td>
                <td data-th="Customer name">Howard Steel</td>
                <td data-th="Insurance no">064353</td>
                <td data-th="Strategy">A, 100%</td>
                <td data-th="Start"><span className="cur">52 000</span></td>
                <td data-th="Current"><span className="cur">82 000</span></td>
                <td data-th="Diff"><span className="cur">40 000</span></td>
              </tr>
              <tr>
                <td data-th="Company name">Apple</td>
                <td data-th="Customer no">23885</td>
                <td data-th="Customer name">Jack Blue</td>
                <td data-th="Insurance no">068874</td>
                <td data-th="Strategy">B, 100%</td>
                <td data-th="Start"><span className="cur">30 500</span></td>
                <td data-th="Current"><span className="cur">42 000</span></td>
                <td data-th="Diff"><span className="cur">11 500</span></td>
              </tr>
              <tr>
                <td data-th="Company name">Samsung</td>
                <td data-th="Customer no">13981</td>
                <td data-th="Customer name">Chung Pi Kah</td>
                <td data-th="Insurance no">068112</td>
                <td data-th="Strategy">C, 100%</td>
                <td data-th="Start"><span className="cur">100 000</span></td>
                <td data-th="Current"><span className="cur">133 000</span></td>
                <td data-th="Diff"><span className="cur">33 000</span></td>
              </tr>
            </tbody>
          </table>          
        </div>
      </td>
    </tr>

 

   
  </tbody>
</table>


Resources1× 0.5× 0.25×Rerun
    </div>
  )
}

export default Out_01