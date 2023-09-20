import React from 'react'
import '../css/layout.css'
import NewSidebar from './NewSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <div id='layout-container'>
      <NewSidebar />
      <Outlet />
    </div>
  )
}

export default Layout