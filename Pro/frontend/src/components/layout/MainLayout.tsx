// src/components/layout/MainLayout.tsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from "./Header"; 
import SidebarTraining from './SiderbarTraining';
import SidebarDevelopment from './SiderbarDevelopment';
import SidebarDataset from './SiderbarDataset';
import './Mainlayout.css';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean; // 添加全屏选项
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, fullScreen = false }) => {
  const [activeMenu, setActiveMenu] = useState('training');

  const renderSidebar = () => {
    switch (activeMenu) {
      case 'development':
        return <SidebarDevelopment />;
      case 'training':
        return <SidebarTraining />;
      case 'dataset':
        return <SidebarDataset />;
      default:
        return <SidebarTraining />;
    }
  };

  return (
    <Layout className="main-layout">
      {!fullScreen && <Header onMenuChange={setActiveMenu} activeMenu={activeMenu} />}
      <Layout style={{ flex: 1, overflow: 'hidden' }}>
        {!fullScreen && renderSidebar()}
        <Content className="main-content">
          <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;