import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
  import { Outlet, useNavigate } from 'react-router-dom';
  import './layout.css'
  const { Header, Sider, Content } = Layout;
  
  const TheLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleClickMenu = (e: any) => {
        navigate(e.key)
    }
    return (
      <Layout className='layout'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={(e)=>handleClickMenu(e)}
            items={[
              {
                key: 'dashboard',
                icon: <UserOutlined />,
                label: '欢迎页',
              },
              {
                key: 'write',
                icon:  <UploadOutlined />,
                label: '内容管理',
                children: [
                  {
                    key: 'articles',
                    label: '文章管理'
                  },
                  {
                    key: 'tags',
                    label: '标签管理'
                  }
                ]
              },
              // {
              //   key: 'articles',
              //   icon: <VideoCameraOutlined />,
              //   label: '文章管理',
              // },
              // {
              //   key: 'tags',
              //   icon: <UploadOutlined />,
              //   label: '标签管理',
              // },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default TheLayout;
