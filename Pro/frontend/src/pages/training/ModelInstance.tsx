//负责模型实例化部署

import type { ReactElement } from 'react';
import { Card, Typography, List, Space, Tag, Button, Progress } from 'antd';
import { 
  CloudServerOutlined, 
  PlayCircleOutlined, 
  StopOutlined, 
  ReloadOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ModelInstance = (): ReactElement => {
  const features = [
    {
      title: '实例创建',
      description: '基于已有模型快速创建部署实例',
      icon: <CloudServerOutlined />
    },
    {
      title: '启停控制',
      description: '控制实例的启动和停止状态',
      icon: <PlayCircleOutlined />
    },
    {
      title: '性能监控',
      description: '实时监控实例运行状态和资源使用',
      icon: <BarChartOutlined />
    },
    {
      title: '配置管理',
      description: '调整实例配置参数',
      icon: <SettingOutlined />
    }
  ];

  const instances = [
    { 
      id: 'inst-001', 
      name: 'LLaMA-2-7B-实例1', 
      model: 'LLaMA-2-7B',
      status: 'running', 
      type: '推理实例',
      cpu: 45,
      memory: 68,
      createTime: '2024-01-15 10:30:00'
    },
    { 
      id: 'inst-002', 
      name: 'ChatGLM-6B-实例1', 
      model: 'ChatGLM-6B',
      status: 'stopped', 
      type: '训练实例',
      cpu: 0,
      memory: 0,
      createTime: '2024-01-14 14:22:00'
    },
    { 
      id: 'inst-003', 
      name: 'Qwen-7B-实例1', 
      model: 'Qwen-7B',
      status: 'running', 
      type: '推理实例',
      cpu: 28,
      memory: 52,
      createTime: '2024-01-16 09:15:00'
    },
    { 
      id: 'inst-004', 
      name: 'Custom-Finetune-实例1', 
      model: 'Custom-Finetune-Model',
      status: 'error', 
      type: '微调实例',
      cpu: 0,
      memory: 0,
      createTime: '2024-01-17 11:45:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'green';
      case 'stopped': return 'red';
      case 'error': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '运行中';
      case 'stopped': return '已停止';
      case 'error': return '错误';
      default: return '未知';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={3}>大模型实例化部署</Title>
        <Paragraph>
          管理大模型的部署实例，包括创建、启停、监控和配置实例。
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
          
          <Title level={4}>实例列表</Title>
          <List
            dataSource={instances}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button 
                    type="primary" 
                    icon={item.status === 'running' ? <StopOutlined /> : <PlayCircleOutlined />}
                    disabled={item.status === 'error'}
                  >
                    {item.status === 'running' ? '停止' : '启动'}
                  </Button>,
                  <Button icon={<ReloadOutlined />}>重启</Button>,
                  <Button icon={<SettingOutlined />}>配置</Button>
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={
                    <Space direction="vertical">
                      <Space>
                        <span>模型: {item.model}</span>
                        <Tag color={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Tag>
                        <Tag color="blue">{item.type}</Tag>
                      </Space>
                      <Space>
                        <span>创建时间: {item.createTime}</span>
                      </Space>
                      {item.status === 'running' && (
                        <Space>
                          <span>CPU: <Progress percent={item.cpu} size="small" style={{ width: 100 }} /></span>
                          <span>内存: <Progress percent={item.memory} size="small" style={{ width: 100 }} /></span>
                        </Space>
                      )}
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

export default ModelInstance;