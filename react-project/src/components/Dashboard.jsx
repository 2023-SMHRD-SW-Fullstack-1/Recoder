import React, { useEffect, useState } from "react";
import ShortInList from "./Dashboard/ShortInList";
import ShortStockList from "./Dashboard/ShortStockList";
import ShortOutList from "./Dashboard/ShortOutList";
import CachedIcon from "@mui/icons-material/Cached";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Calendar from "./Calendar";
import { Link } from "react-router-dom";
import axios from 'axios'

const Dashboard = ({ comSeq }) => {  

  const [inList, setInList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [outList, setOutList] = useState([]);

  useEffect(() => {
    const getInData = () => {
      return axios.get(`http://localhost:8000/in/${comSeq}/B`);
    };
    const getStockData = () => {
      return axios.get(`http://localhost:8000/in/${comSeq}/I`);
    };
    const getOutData = () => {
      return axios.get(`http://localhost:8000/in/${comSeq}/O`);
    };
  
    Promise.all([getInData(), getStockData(), getOutData()])
      .then((res) => {
        setInList(res[0].data);
        setStockList(res[1].data);
        setOutList(res[2].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [])


  return (
    <div className="dashboard">
      <div className="dashboard-header">헤더</div>
      <div
        style={{
          padding: 24,
        }}
      >
        <div className="dashboard-body1">
          <div className="dashboard-item1">
            <div className="current">
              <div id="current-header">
                <span>물류현황</span>
              </div>
              <div className="current-item">
                <span>입고예정</span>
                <Link to="/in/create">28개</Link>
              </div>
              <div className="current-item">
                <span>재고</span>
                <Link to="/stock/select">367개</Link>
              </div>
              <div className="current-item">
                <span>출고완료</span>
                <Link to="/out/select">30개</Link>
              </div>
            </div>
            <Calendar />
          </div>
          <div className="dashboard-item2">
            <div className="dashboard-item-header">
              <span>입고예정</span>
              <div>
                <CachedIcon />
                <OpenInNewIcon />
              </div>
            </div>
            <ShortInList inList={ inList } />
          </div>
        </div>
        <div className="dashboard-body2">
          <div className="dashboard-item3">
            <div className="dashboard-item-header">
              <span>재고</span>
              <div>
                <CachedIcon />
                <OpenInNewIcon />
              </div>
            </div>
            <ShortStockList stockList={ stockList } />
          </div>
          <div className="dashboard-item4">
            <div className="dashboard-item-header">
              <span>출고완료</span>
              <div>
                <CachedIcon />
                <OpenInNewIcon />
              </div>
            </div>
            <ShortOutList outList={ outList } />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
