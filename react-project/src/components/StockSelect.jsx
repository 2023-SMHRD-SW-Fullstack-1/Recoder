import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const StockSelect = () => {
  const [stockList, setStockList] = useState([]);
  const [rowOutTable, setRowOutTable] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [order, SetOrder] = useState('asc')

  useEffect(() => {
    axios
      .get("http://localhost:8000/stock")
      .then((res) => {
        setStockList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleRowClick = () => {
    console.log("클릭");
  };

  const outLoadingHandler = (e) => {
    console.log("outLoadingHandler 함수");
  };

  const handleInputPluse = (e) => {
    console.log("handleInputPluse 함수");
  };

  const outLoadingHandler2 = async () => {
    console.log("outLoadingHandler2 함수");
  };

  const handleInDateOrder = () => {
    if (order === 'asc') {
      SetOrder('desc')
    } else {
      SetOrder('asc')
    }
  }

  const handleExpireDateOrder = () => {
    if (order === 'asc') {
      SetOrder('desc')
    } else {
      SetOrder('asc')
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/stock/${order}`)
    .then((res) => {
      console.log(res.data);
      setStockList(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }, [order])

  return (
    <div id="out_all">
      <div id="out_top">
        <span id="out_title">재고</span>

        <div id="out_input_container">
          <input id="out_input" placeholder="제품ID 제품명 검색" />
          <FontAwesomeIcon id="out_input_icon" icon={faMagnifyingGlass} />
          <select id="out_filter">filter</select>
        </div>
      </div>

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
                <h1>수량</h1>
              </th>
              <th 
                onClick={handleInDateOrder}
                style={{
                  cursor: 'pointer'                  
                }}
              >
                <h1>입고일</h1>
              </th>
              <th 
                onClick={handleExpireDateOrder}
                style={{
                  cursor: 'pointer'                  
                }}
              >
                <h1>유통기한</h1>
              </th>
              <th>
                <h1>적재창고</h1>
              </th>
              <th>
                <h1>적재위치</h1>
              </th>
              <th>
                <h1>코드번호</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {stockList.map((warehouseItem, warehouseIndex) => (
              <React.Fragment key={warehouseIndex}>
                {warehouseItem.Racks.map((rackItem, rackIndex) => (
                  <React.Fragment key={rackIndex}>
                    {rackItem.Loadings.map((loadingItem, loadingIndex) => (
                      <React.Fragment key={loadingIndex}>
                        <tr
                          onClick={() =>
                            handleRowClick(rackIndex, loadingIndex)
                          }
                          className={
                            rowOutTable[rackIndex]?.[loadingIndex]
                              ? "selected"
                              : ""
                          }
                        >
                          <td
                            className="out_table_id"
                            onClick={outLoadingHandler}
                            name="loading_seq"
                          >
                            {loadingItem.loading_seq}
                          </td>
                          <td>{loadingItem.Stock.stock_name}</td>
                          <td
                            onChange={outLoadingHandler}
                            name="td_loading_cnt"
                          >
                            {loadingItem.loading_cnt}
                          </td>
                          <td>{loadingItem.created_at.substring(0, 10)}</td>
                          <td>
                            {loadingItem.Stock.stock_expired.substring(0, 10)}
                          </td>
                          <td>{warehouseItem.wh_seq}</td>
                          <td>{loadingItem.rack_seq}</td>
                          <td>{loadingItem.Stock.stock_barcode}</td>
                        </tr>
                        {rowOutTable[rackIndex]?.[loadingIndex] && (
                          <tr>
                            <td id="out_table_fold" colSpan={8}>
                              <span>출고일자</span>
                              <input
                                type="date"
                                name="created_at"
                                onChange={outLoadingHandler}
                              />
                              <br />
                              <span>출고수량</span>
                              <input
                                name="td_loading_cnt"
                                type="text"
                                onChange={outLoadingHandler}
                              />
                              <br />
                              <span> 배송지</span>
                              <select
                                id="out_filter"
                                onClick={handleInputPluse}
                              >
                                {rackItem.Loadings.map(
                                  (loadingItem, loadingIndex) => (
                                    <option
                                      key={loadingIndex}
                                      value={loadingItem.stock_shipping_des}
                                      name="choice_des"
                                    >
                                      {loadingItem.stock_shipping_des}
                                    </option>
                                  )
                                )}
                                <option value="직접입력">직접입력</option>
                              </select>
                              {showInput && (
                                <input
                                  type="text"
                                  placeholder="배송지 입력"
                                  name="out_loading_des"
                                  onChange={outLoadingHandler}
                                />
                              )}
                              <button
                                className="custom-btn btn-1"
                                onClick={outLoadingHandler2}
                              >
                                출고
                              </button>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockSelect;
