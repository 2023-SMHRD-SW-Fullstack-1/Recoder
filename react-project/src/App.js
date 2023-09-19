import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Join from './components/Join';
import Out_01 from './components/Out_01'
import StockSelect from './components/StockSelect'
import StockManage from './components/StockManage'
import OutSelect from './components/OutSelect'
import OutDestination from './components/OutDestination'
import WareManage from './components/WareManage'
import WareCreate from './components/WareCreate'
import CreateWarehouse from './components/CreateWarehouse'
import Warehouse from './components/Warehouse'
import Mypage from './components/Mypage';
import './App.css'
import Logout from './components/Logout';
import Testcom from './components/Testcom';
import Out_02 from './components/Out_02';
import RegisterCompany from './components/RegisterCompany';
import Layout from './components/Layout'
import Barcode from './components/Barcode';
import Nav_HJ from './components/Nav_HJ';
import In_HJ from './components/In_HJ';
import Dash_HJ from './components/Dash_HJ';
import Dashboard from './components/Dashboard'

const App = () => {

  const [uid, setUid] = useState('qwer')
  const [comSeq, setComSeq] = useState(1004);
  const [newWareData, setNewWareData] = useState({})

  //혜주 추가 - 바코드 값 관리
  const [inputItem, setInputItem] = useState([
    {
        id: '',
        title: '',
    },
]);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/user')
  //   .then((res) => {
  //     console.log(res);
  //     if (res.data) {
  //       setUid(true)
  //       setComSeq(res.data.com_seq)
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }, [])

  return (
    <div>
      { uid ? (
        <div>
          <Routes>
            <Route element={ <Layout /> } >
              {/* 개발 끝나면 지워주세요 */}
              <Route index element={ <Login /> } />
              <Route path='/join' element={ <Join /> } />
              <Route path='/register/company' element={ <RegisterCompany /> } />
              {/* 개발 끝나면 지워주세요 */}
              <Route path='/main' element={ <Dashboard comSeq={ comSeq } /> } />
              <Route path='/out/create' element={ <Out_01 /> } />
              <Route path='/out/select' element={ <OutSelect /> } />
              <Route path='/out/des' element={ <OutDestination /> } />
              <Route path='/stock/select' element={ <StockSelect />} />
              <Route path='/stock/manage' element={ <StockManage /> } />
              <Route path='/ware/manage' element={ <WareManage comSeq={comSeq}/> } />
              <Route path='/ware/create' element={ <WareCreate comSeq={comSeq} setNewWareData={setNewWareData} /> } />
              <Route path='/ware/createwarehouse' element={ <CreateWarehouse comSeq={comSeq} newWareData={newWareData} /> } />
              <Route path='/warehouse/:wh_seq' element={ <Warehouse comSeq={comSeq} /> } />
              <Route path='/mypage' element={ <Mypage /> } />
              <Route path='/logout' element={ <Logout /> } />
              <Route path='/out/controll' element={ <Out_02 /> } />    
              <Route path='/barcode' element={<Barcode inputItem = {inputItem} setInputItem={setInputItem}/>}  />      
              <Route path='/in/create' element={ <In_HJ inputItem={inputItem} setInputItem={setInputItem}/> } /> 
            </Route>          
          </Routes> 
        </div>
      ) : (
        <Routes>
          <Route path='*' element={ <Login /> } />
          <Route path='/join' element={ <Join /> } />
          <Route path='/register/company' element={ <RegisterCompany /> } />
        </Routes>
      )}
    </div> 
  )
}

export default App