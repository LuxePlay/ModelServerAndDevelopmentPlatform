// src/components/layout/SiderbarDataset.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DatabaseOutlined, 
  FilterOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Siderbar.css';

const { Sider } = Layout;

const SidebarDataset: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dataset-management',
      icon: <DatabaseOutlined />,
      label: '数据管理',
      children: [
        { key: '/dataset/dataManager', label: '数据集管理' },
        { key: '/dataset/upload', label: '数据上传' },
        { key: '/dataset/labeling', label: '数据标注' },
      ],
    },
    {
      key: 'data-processing',
      icon: <FilterOutlined />,
      label: '数据处理',
      children: [
        { key: '/dataset/preprocessing', label: '数据预处理' },
        { key: '/dataset/cleaning', label: '数据清洗' },
        { key: '/dataset/replay', label: '数据回流' },
        { key: '/dataset/quality', label: '数据质量' },
      ],
    },
    {
      key: 'data-sharing',
      icon: <ShareAltOutlined />,
      label: '数据共享',
      children: [
        { key: '/dataset/sharing', label: '数据共享' },
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
          defaultOpenKeys={['dataset-management', 'data-processing', 'data-sharing']}
          style={{ borderRight: 0 }}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>
    </Sider>
  );
};

export default SidebarDataset;