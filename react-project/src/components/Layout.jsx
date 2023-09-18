import React from 'react'
import '../css/layout.css'
import NewSidebar from './NewSidebar'

const Layout = () => {
  return (
    <div className='layout-container'>
      <NewSidebar />
      <div className='dashboard'>
        <div className='dashboard-header'>헤더입니다.</div>
        <div className='dashboard-body1'>
          <div className='dashboard-item1'>아이템1</div>
          <div className='dashboard-item2'>아이템2</div>
        </div>
        <div className='dashboard-body2'>
          <div className='dashboard-item3'>아이템3</div>
          <div className='dashboard-item4'>아이템4</div>
        </div>
      </div>
    </div>
  )
}

export default Layout