import React, {useState, useEffect} from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Join from './components/Join';
import Out_01 from './components/Out_01'
import StockSelect from './components/StockSelect'
import StockManage from './components/StockManage'
import In from './components/In'
import OutSelect from './components/OutSelect'
import OutDestination from './components/OutDestination'
import WareManage from './components/WareManage'
import Mypage from './components/Mypage';
import './App.css'
import axios from 'axios';
import Logout from './components/Logout';

const App = () => {

  const [uid, setUid] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8000/user')
    .then((res) => {
      console.log(res);
      if (res.data) {
        setUid(true)
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

  return (
    <div>
      { uid && <Sidebar /> }   
      <Routes>          
        <Route path='/login' element={ <Login /> } />
        <Route path='/join' element={ <Join /> } />
        <Route path='/main' element={ <Main /> } />
        <Route path='/out/create' element={ <Out_01 /> } />
        <Route path='/out/select' element={ <OutSelect /> } />
        <Route path='/out/des' element={ <OutDestination /> } />
        <Route path='/in/create' element={ <In /> } />
        <Route path='/stock/select' element={ <StockSelect />} />
        <Route path='/stock/manage' element={ <StockManage /> } />
        <Route path='/ware/manage' element={ <WareManage /> } />
        <Route path='/mypage' element={ <Mypage /> } />
        <Route path='/logout' element={ <Logout /> } />
      </Routes>      
    </div> 
  )
}

export default App