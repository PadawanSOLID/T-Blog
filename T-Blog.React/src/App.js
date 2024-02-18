import './App.css';
import {
  HomeOutlined,
  EditOutlined,
  UserOutlined,
  SettingOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
function App() {

  const items = [
    getItem('EFEM', '1', <HomeOutlined />),
    getItem('Recipe', '2', <EditOutlined />),
    getItem('SEM', '3', <UserOutlined />),
    getItem('Alarm', '4', <AlertOutlined />),
    getItem('Config', '5', <SettingOutlined />)
  ];
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme='light'>
        <div className='demo-logo-vertical' />
        {/* items={items}  */}
        <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item  label='test' key='1'>

          </Menu.Item>
          <Menu.Item  label='test' key='2'>

          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }} >
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>And Design </Footer>
      </Layout>
    </Layout >

  );
}

export default App;
