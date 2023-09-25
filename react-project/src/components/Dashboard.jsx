import React, { useEffect, useState } from "react";
import ShortInList from "./Dashboard/ShortInList";
import ShortStockList from "./Dashboard/ShortStockList";
import ShortOutList from "./Dashboard/ShortOutList";
import CachedIcon from "@mui/icons-material/Cached";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import axios from "axios";
import WareList from "./Dashboard/WareList";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Dashboard = ({ comSeq }) => {
  const [inList, setInList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [outList, setOutList] = useState([]);
  const [isInClick, setIsInClick] = useState(true)
  const [isStockClick, setIsStockClick] = useState(true)
  const [isOutClick, setIsOutClick] = useState(true)

  const getInData = () => {
    return axios.get(`http://localhost:8000/in/${comSeq}/B`);
  };
  const getStockData = () => {
    return axios.get(`http://localhost:8000/in/${comSeq}/I`);
  };
  const getOutData = () => {
    return axios.get(`http://localhost:8000/in/${comSeq}/O`);
  };

  useEffect(() => {
    Promise.all([getInData(), getStockData(), getOutData()])
      .then((res) => {
        setInList(res[0].data);
        setStockList(res[1].data);
        setOutList(res[2].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const inClick = () => {
    if (isInClick) {
      setIsInClick(false)
    } else {
      setIsInClick(true)
    }
  }
  const stockClick = () => {
    if (isStockClick) {
      setIsStockClick(false)
    } else {
      setIsStockClick(true)
    }
  }
  const outClick = () => {
    if (isOutClick) {
      setIsOutClick(false)
    } else {
      setIsOutClick(true)
    }
  }

  return (
    <div id="dashboard">
      <div id="dashboard-header">
        <Stack direction="row" spacing={1} sx={{ position: 'relative', marginLeft: '24px' }}>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 35, height: 35 }} />      
        </Stack>      
        <MailOutlineIcon sx={{ fontSize: 30, marginLeft: '24px' }} />
        <NotificationsNoneIcon sx={{ fontSize: 30 }} />
      </div>
      <div>
        <div id="dashboard-body1">
          <div id="dashboard-item1">
            <div id="current">
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
            <WareList />
          </div>
          <div id="dashboard-item2">
            <div className="dashboard-item-header">
              <span>입고예정</span>
              <div>
                <button onClick={inClick}><CachedIcon /></button>
                <Link to='/in/create'><OpenInNewIcon /></Link>
              </div>
            </div>
            <ShortInList inList={inList} />
          </div>
        </div>
        <div id="dashboard-body2">
          <div id="dashboard-item3">
            <div className="dashboard-item-header">
              <span>재고</span>
              <div>
                <button onClick={stockClick}><CachedIcon /></button>
                <Link to='/stock/select'><OpenInNewIcon /></Link>
              </div>
            </div>
            <ShortStockList stockList={stockList} />
          </div>
          <div id="dashboard-item4">
            <div className="dashboard-item-header">
              <span>출고완료</span>
              <div>
                <button onClick={outClick}><CachedIcon /></button>
                <Link to='/out/controll'><OpenInNewIcon /></Link>
              </div>
            </div>
            <ShortOutList outList={outList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
