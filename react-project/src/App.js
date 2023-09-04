import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'

const App = () => {
  return (
    <div className='main-box'>
      <Sidebar className='main-item' />
      <div className='main-item'>
        <Routes>
          <Route />
        </Routes>
      </div>
    </div>
  )
}

export default App