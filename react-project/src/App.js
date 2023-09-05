import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
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

const App = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/' element={ <Main /> } /> 
        <Route path="/Join" element={ <Join /> } />
        <Route path="/Login" element={ <Login /> } />
        <Route path='/out/create' element={ <Out_01 /> } />
        <Route path='/out/select' element={ <OutSelect /> } />
        <Route path='/out/des' element={ <OutDestination /> } />
        <Route path='/in/create' element={ <In /> } />
        <Route path='/stock/select' element={ <StockSelect />} />
        <Route path='/stock/manage' element={ <StockManage /> } />
        <Route path='/ware/manage' element={ <WareManage /> } />
        <Route path='/mypage' element={ <Mypage /> } />
      </Routes>
    </div>
  )
}

export default App