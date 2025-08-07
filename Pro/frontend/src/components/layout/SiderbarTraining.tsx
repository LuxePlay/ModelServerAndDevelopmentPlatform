// src/components/layout/SiderbarTraining.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DatabaseOutlined, 
  ApiOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Siderbar.css';

const { Sider } = Layout;

const SidebarTraining: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'model-management',
      icon: <DatabaseOutlined />,
      label: '大模型服务',
      children: [
        { key: '/training/model-management', label: '大模型管理' },
        { key: '/training/model-deployment', label: '实例化部署' },
        { key: '/training/fine-tuning', label: '微调中心' },
      ],
    },
    {
      key: 'application-dev',
      icon: <ApiOutlined />,
      label: '大模型应用开发',
      children: [
        { key: '/training/knowledge-library', label: '知识库' },
        { key: '/training/prompt-engineering', label: 'Prompt工程' },
        { key: '/training/user-experience', label: '交互体验中心' },
        { key: '/training/plugin-center', label: '插件中心' },
        { key: '/training/agent-center', label: '智能体中心' },
        { key: '/training/workflow-orchestration', label: '工作流编排' },
      ],
    }
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider width={220} className="sidebar" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="sidebar-content">
        <h3>功能导航</h3>
        <Menu
          mode="inline"
          defaultOpenKeys={['model-management', 'application-dev']}
          style={{ borderRight: 0, height: '100%' }}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>
    </Sider>
  );
};

export default SidebarTraining;