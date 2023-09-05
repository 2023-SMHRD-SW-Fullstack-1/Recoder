import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Collapse from 'react-bootstrap/Collapse';
import '../Sidebar.css'
import '../App.css'

const Sidebar = () => {

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
                <a href='/' className='tdnone'>
                  <button className='my-button'>
                    <img src='/icon/home.svg'></img></button><p style={{ color: 'black' }}>홈</p>
                </a>
              </li>             
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
                      <li><a href='/stock/select' className='tdnone'>재고 조회</a></li>
                      <li><a href='/stock/manage' className='tdnone'>재고 관리</a></li>
                    </ul>
                  </div>
                </Collapse>
              <li>
                <a href='/in/create'><button className='my-button'>
                  <img src='/icon/in.svg'></img><p>입고</p>
                </button></a>
              </li>
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
                      <li><a href='/out/create' className='tdnone'>출고 등록</a></li>
                      <li><a href='/out/select' className='tdnone'>출고 이력</a></li>
                      <li><a href='/out/des' className='tdnone'>배송지 관리</a></li>
                    </ul>
                  </div>
                </Collapse>
              <li>
                <a href='/ware/manage'><button className='my-button'>
                  <img src='/icon/warehouse.svg'></img><p>창고 관리</p>
                </button></a>
              </li>
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

export default Sidebar