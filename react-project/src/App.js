import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

import Login from './components/Login';
import Join from './components/Join';
import Out_01 from './components/Out_01'



const App = () => {
  return (
    <div>

      <Header />
      <Main />
      <Routes>
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Out" element={<Out_01/>} />
      </Routes>

    </div>
  )
}

export default App