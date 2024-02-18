import React, { useEffect, useState } from 'react';
import './index.scss'
import {
  HomeOutlined,
  EditOutlined,
  AlertOutlined,
  SettingOutlined,
  AimOutlined,
  HomeFilled,
  FileTextFilled,
  EditFilled,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Popconfirm, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo, fetchUserInfo } from '../../store/modules/user';
const { Header, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '/home', <HomeFilled />),
  getItem('Article', '/article', <FileTextFilled />),
  getItem('Publish', '/publish', <EditFilled />),
  getItem('EFEM', '/efem', <HomeOutlined />),

  getItem('Recipe', '/recipe', <EditOutlined />),
  getItem('SEM', '/sem', <AimOutlined />),
  getItem('Alarm', '/alarm', <AlertOutlined />),
  getItem('Config', '/config', <SettingOutlined />),
];

const Shell = () => {
  const navigate = useNavigate();

  const OnMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  }

  const location = useLocation();
  const selectedKey = location.pathname;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  const name = useSelector(state => state.user.userInfo.name)
  const onConfirm = () => {
    dispatch(clearUserInfo());
    navigate('login')
  }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      className='layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={selectedKey}
          mode="inline"
          items={items}
          onClick={OnMenuClick} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>
          <div style={{ position: 'absolute', right: 50 }}>
            <span style={{ margin: 5 }}>{name}</span>
            <Popconfirm
              description='是否退出？'
              cancelText='取消'
              title='退出' okText='确认'
              onConfirm={onConfirm}>
              <LogoutOutlined />
            </Popconfirm>
          </div>
        </Header>
        <Layout
          style={{
            margin: '0 16px',
          }}>
          <Outlet />
        </Layout>
        <Footer
          style={{
            textAlign: 'center',
          }}>
        </Footer>
      </Layout>
    </Layout>
  );
}
export default Shell;