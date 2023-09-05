import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

import Login from './components/Login';
import Join from './components/Join';

const App = () => {
  return (
    <div>
      <Header />
      <Main />
      <Routes>
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App