import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
const Board_HJ = () => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
<Layout>
   

    <Breadcrumb
    style={{
      margin: '16px 0',
    }}
  >
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>List</Breadcrumb.Item>
    <Breadcrumb.Item>App</Breadcrumb.Item>
  </Breadcrumb>
  <Content
    style={{
      padding: 24,
      margin: 0,
      minHeight: 800,
      background: colorBgContainer,
    }}
  >
    Content
  </Content>
  </Layout>
  );
};
export default Board_HJ;