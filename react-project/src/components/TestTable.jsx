import React, { useState } from 'react'
import '../css/test.css'
import TestUser from './TestUser'

const TestTable = () => {

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);

  const menuItems = [{
    icon: 'sidebar-icon-span1',
    menu: '홈'
  }, {
    icon: 'sidebar-icon-span2',
    menu: '재고'
  }, {
    icon: 'sidebar-icon-span3',
    menu: '입고'
  }, {
    icon: 'sidebar-icon-span4',
    menu: '출고'
  }, {
    icon: 'sidebar-icon-span5',
    menu: '창고관리'
  }];

  const profileItems = [{
    icon: 'sidebar-icon-span6',
    menu: '회원정보'
  }, {
    icon: 'sidebar-icon-span7',
    menu: '로그아웃'
  }];

  return (
    <div className='main-container'>
      <div className='css-1y6sui9'>
        <div className='sidebar'>
          <div className='sidebar1-1'>로고</div>
          <div className='sidebar1-2'>
            <a className='sidebar1-2-a'>
              <div className='sidebar1-2-box'>
                <div className='sidebar1-2-box1'>
                  <img className='sidebar1-2-box-img' />
                </div>              
                <div className='sidebar1-2-box-text'>
                  <h6 className='sidebar1-2-box-text-name'>ShinYoung Kim</h6>
                  <p className='sidebar1-2-box-text-p'></p>
                </div>
              </div>
            </a>
          </div>
          <hr></hr>
          <div>
            <ul className='sidebar-ul'>
            {menuItems.map((item, index) => (
                <a 
                  key={index} 
                  className={`sidebar-a ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className='sidebar-icon'>
                    <span className={`${item.icon}`}></span>
                  </div>
                  <div className='sidebar-text'>{item.menu}</div>
                  <span className='sidebar-span'></span>
                </a>))}
            </ul>
          </div>
          <div className='sidebar2'></div>
          <hr></hr>
          <div>
          <ul className='sidebar-ul'>
            {profileItems.map((item, index) => (
                <a 
                  key={index} 
                  className='sidebar-a'
                >
                  <div className='sidebar-icon'>
                    <span className={`${item.icon}`}></span>
                  </div>
                  <div className='sidebar-text'>{item.menu}</div>
                  <span className='sidebar-span'></span>
                </a>))}
            </ul>
          </div>
        </div>
      </div>
        {/* 사이드바 끝 */}
        <TestUser />
    </div>
  )
}

export default TestTable