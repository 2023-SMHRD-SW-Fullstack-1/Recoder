import React from 'react'
import '../css/layout.css'
import NewSidebar from './NewSidebar'
import { Outlet } from 'react-router-dom'

const Layout = ({ comSeq, selectWhSeq, setSelectWhSeq }) => {

  return (
    <div id='layout-container'>
      <NewSidebar comSeq={comSeq} selectWhSeq={selectWhSeq} setSelectWhSeq={setSelectWhSeq}/>
      <Outlet />
    </div>
  )
}

export default Layout