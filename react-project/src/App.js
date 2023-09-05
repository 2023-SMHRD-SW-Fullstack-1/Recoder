import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import Out_01 from './components/Out_01'



const App = () => {
  return (
    <div>
      <Main />
      <Out_01 />
    </div>
  )
}

export default App