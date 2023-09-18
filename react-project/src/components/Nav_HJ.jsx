import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import Board_HJ from './Board_HJ';
import '../css/nav_hj.css'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const items = [
  getItem('Main', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('입고', 'sub2', <AppstoreOutlined />, [
    getItem('입고예정', '5'),
    getItem('입고', '6'),
    getItem('입고완료'),
  ]),
  getItem('재고', 'sub3', <SettingOutlined />, [
    getItem('재고조회', '7'),
    getItem('재고관리', '8'),
    getItem('재고알림', '9')
  ]),
  getItem('출고', 'sub4', <SettingOutlined />, [
    getItem('출고등록', '10'),
    getItem('출고이력', '11'),
    getItem('출고관리', '12'),

  ]),
  getItem('창고', 'sub5', <SettingOutlined />, [
    getItem('창고관리', '13'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2','sub3', 'sub4','sub5'];
const App = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleNav = (keys)=>{

  }
  return (
    <div id='menu_div'>
    <Menu 
      mode="inline"
      openKeys={openKeys}
      onClick={handleNav}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
        height:800
      }}
      items={items}
    />
    <Board_HJ/>
    </div>
  );
};
export default App;