import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../Sidebar.css'
import '../App.css'


const Main = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <button className='my-button'>
        <img 
          src='/img/hambergur button.png'
          alt='side-button'
          width='40px'
          onClick={handleShow}
        ></img>      
      </button>

      <Offcanvas show={show} onHide={handleClose} style={{ width: '300px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>사이드바</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='sidebar-box'>
          <div className='sidebar-up'>
            <ul>            
              <a><li><button className='my-button'><img src='/icon/home.svg'></img><p>홈</p></button></li></a>
              <a><li><button className='my-button'><img src='/icon/jaego.svg'></img><p>재고</p></button></li></a>
              <a><li><button className='my-button'><img src='/icon/in.svg'></img><p>입고</p></button></li></a>
              <a><li><button className='my-button'><img src='/icon/out.svg'></img><p>출고</p></button></li></a>
              <a><li><button className='my-button'><img src='/icon/warehouse.svg'></img><p>창고 관리</p></button></li></a>
            </ul>
          </div>
          <div className='sidebar-down'>
            <a><button className='my-button'><img src='/icon/profile.svg'></img><p></p></button></a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Main