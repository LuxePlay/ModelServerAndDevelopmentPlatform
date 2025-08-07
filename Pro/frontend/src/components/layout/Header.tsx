// src/components/layout/Header.tsx
import React from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { PLATFORM_NAME } from '../../styles/var_global';
import './Header.css';
const { Header: AntHeader } = Layout;

interface HeaderProps {
  onMenuChange: (key: string) => void;
  activeMenu: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuChange, activeMenu }) => {
  const navigate = useNavigate();
  const userMenuItems = [
    { key: 'user_center', label: '个人中心' },
    { key: 'settings', label: '设置' },
    { key: 'logout', label: '退出登录' },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    // 处理菜单点击事件
    switch (key) {
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        // 处理退出登录逻辑
        break;
      case 'user_center':
        navigate('/user_center');
        break;
      default:
        break;
    }
  };

  const handleNavMenuClick = ({ key }: { key: string }) => {
    onMenuChange(key);
    // 导航到对应模块的主页面
    switch (key) {
      case 'development':
        navigate('/development_doc');
        break;
      case 'training':
        navigate('/training');
        break;
      case 'dataset':
        navigate('/dataset');
        break;
      default:
        break;
    }
  };

  return (
    <AntHeader className="header">
      <div className="header-content">
        <div className="logo">
          <h2>{PLATFORM_NAME}</h2>
        </div>
        <Menu
          className="nav-menu"
          mode="horizontal"
          selectedKeys={[activeMenu]}
          items={[
            { key: 'development', label: '开发中心文档' },
            { key: 'training', label: '大模型服务与应用平台' },
            { key: 'dataset', label: '数据管理平台' }
          ]}
          onClick={handleNavMenuClick}
        />
        <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }}>
          <Button type="text" className="user-menu">
            <UserOutlined />
            <span>用户名</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;