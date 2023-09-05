import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Collapse from 'react-bootstrap/Collapse';
import '../Sidebar.css'
import '../App.css'

import {Link} from 'react-router-dom'

const Main = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [jButtonOpen, setJButtonOpen] = useState(false);
  const [outButtonOpen, setOutButtonOpen] = useState(false);

  useEffect(() => {
    if (jButtonOpen) {
      setOutButtonOpen(false)
    }
  }, [jButtonOpen])
  useEffect(() => {
    if (outButtonOpen) {
      setJButtonOpen(false)
    }
  }, [outButtonOpen])

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

      <Offcanvas show={show} onHide={handleClose} style={{ width: '130px' }}>
        <Offcanvas.Header closeButton style={{ paddingBottom: '0'}}>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='sidebar-box' style={{ padding: '0px'}}>
          <div className='sidebar-up'>
            <ul>            
              <li>
                <button
                  className='my-button'
                ><img src='/icon/home.svg'></img><p>홈</p></button></li>              
              <li>
                <button
                  className='my-button'
                  onClick={() => setJButtonOpen(!jButtonOpen)}
                  aria-controls="collapse-text1"
                  aria-expanded={jButtonOpen}
                ><img src='/icon/stock.svg'></img><p>재고</p></button></li>
                <Collapse in={jButtonOpen}>
                  <div id="collapse-text1">
                    <ul>
                      <li>재고 조회</li>
                      <li>재고 관리</li>
                    </ul>
                  </div>
                </Collapse>
              <li><button className='my-button'><img src='/icon/in.svg'></img><p>입고</p></button></li>
              <li>
                <button 
                  className='my-button'
                  onClick={() => setOutButtonOpen(!outButtonOpen)}
                  aria-controls="collapse-text2"
                  aria-expanded={outButtonOpen}
                ><img src='/icon/out.svg'></img><p>출고</p></button></li>
                <Collapse in={outButtonOpen}>
                  <div id="collapse-text2">
                    <ul>
                    <Link to="/Out" style={{ textDecoration: "none", color: "black" }}> <li>출고 등록</li> </Link>
                      <li>출고 이력</li>
                      <li>배송지 관리</li>
                    </ul>
                  </div>
                </Collapse>
              <li><button className='my-button'><img src='/icon/warehouse.svg'></img><p>창고 관리</p></button></li>
            </ul>
          </div>
          <div className='sidebar-down'>
            <a><button className='my-button'><img src='/icon/profile.svg'></img><p></p></button></a>
            <a><button className='my-button'><img src='/icon/logout.svg'></img><p></p></button></a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Main