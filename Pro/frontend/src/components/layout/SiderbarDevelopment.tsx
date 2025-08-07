// src/components/layout/SiderbarDevelopment.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, CodeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Siderbar.css';

const { Sider } = Layout;

const SidebarDevelopment: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'development-doc',
      icon: <BookOutlined />,
      label: '开发文档',
      children: [
        { key: '/development_doc/sub/httpDoc', label: 'HTTP示例文档' },
        { key: '/development_doc/sub/sdkDoc', label: 'SDK示例文档' },
      ],
    },
    {
      key: 'development-doc',
      icon: <CodeOutlined />,
      label: '代码示例',
      children: [
        { key: '/development_doc/api/http-api', label: 'HTTP API接口' },
        { key: '/development_doc/api/sdk-api', label: 'SDK API接口' },  
      ],
    }
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider width={220} className="sidebar">
      <div className="sidebar-content">
        <h3>功能导航</h3>
        <Menu
          mode="inline"
          defaultOpenKeys={['development-doc', 'code-example']}
          style={{ borderRight: 0 }}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>
    </Sider>
  );
};

export default SidebarDevelopment;