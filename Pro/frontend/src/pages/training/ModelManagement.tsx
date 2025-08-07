// src/pages/training/ModelManagement.tsx

import type { ReactElement } from 'react';
import { Card, Typography, List, Space, Tag } from 'antd';
import { 
  DatabaseOutlined, 
  DeploymentUnitOutlined, 
  ApiOutlined, 
  CloudUploadOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ModelManager = (): ReactElement => {
  const features = [
    {
      title: '模型存储',
      description: '统一管理各种大语言模型的存储和版本控制',
      icon: <DatabaseOutlined />
    },
    {
      title: '模型部署',
      description: '支持快速部署模型为API服务',
      icon: <DeploymentUnitOutlined />
    },
    {
      title: 'API访问',
      description: '提供标准化的API接口供外部调用',
      icon: <ApiOutlined />
    },
    {
      title: '模型上传',
      description: '支持上传自定义训练的模型',
      icon: <CloudUploadOutlined />
    }
  ];

  const models = [
    { name: 'LLaMA-2-7B', version: 'v2.1', status: 'active', type: '预训练模型' },
    { name: 'ChatGLM-6B', version: 'v1.5', status: 'active', type: '对话模型' },
    { name: 'Qwen-7B', version: 'v1.0', status: 'inactive', type: '预训练模型' },
    { name: 'Custom-Finetune-Model', version: 'v3.2', status: 'active', type: '微调模型' }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={3}>大模型管理</Title>
        <Paragraph>
          管理平台中的所有大语言模型，包括预训练模型、微调模型和自定义模型。
        </Paragraph>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4}>核心功能</Title>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={features}
            renderItem={item => (
              <List.Item>
                <Card>
                  <Space direction="vertical" align="center">
                    {item.icon}
                    <Title level={5}>{item.title}</Title>
                    <Paragraph type="secondary">{item.description}</Paragraph>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
          
          <Title level={4}>模型列表</Title>
          <List
            dataSource={models}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={
                    <Space>
                      <span>版本: {item.version}</span>
                      <Tag color={item.status === 'active' ? 'green' : 'red'}>
                        {item.status === 'active' ? '运行中' : '已停止'}
                      </Tag>
                      <Tag color="blue">{item.type}</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </div>
  );
};

export default ModelManager;