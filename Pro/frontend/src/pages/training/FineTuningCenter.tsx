//模型微调中心

import type { ReactElement } from 'react';
import { Card, Typography, List, Space, Tag, Button, Progress } from 'antd';
import { 
  ControlOutlined, 
  FileSearchOutlined, 
  PlayCircleOutlined, 
  BarChartOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FineTuningCenter = (): ReactElement => {
  const features = [
    {
      title: '数据准备',
      description: '上传和管理微调所需的数据集',
      icon: <FileSearchOutlined />
    },
    {
      title: '参数配置',
      description: '配置微调过程中的超参数',
      icon: <ControlOutlined />
    },
    {
      title: '训练执行',
      description: '启动和监控微调训练任务',
      icon: <PlayCircleOutlined />
    },
    {
      title: '效果评估',
      description: '评估微调后模型的效果',
      icon: <BarChartOutlined />
    }
  ];

  const tasks = [
    { 
      id: 'ft-001', 
      name: '金融领域微调任务1', 
      model: 'LLaMA-2-7B',
      status: 'running', 
      progress: 65,
      dataset: '金融问答数据集v1',
      createTime: '2024-01-15 10:30:00'
    },
    { 
      id: 'ft-002', 
      name: '医疗对话微调任务', 
      model: 'ChatGLM-6B',
      status: 'completed', 
      progress: 100,
      dataset: '医疗对话数据集v2',
      createTime: '2024-01-14 14:22:00'
    },
    { 
      id: 'ft-003', 
      name: '法律问答微调任务', 
      model: 'Qwen-7B',
      status: 'pending', 
      progress: 0,
      dataset: '法律问答数据集v1',
      createTime: '2024-01-16 09:15:00'
    },
    { 
      id: 'ft-004', 
      name: '教育领域微调任务', 
      model: 'Custom-Model',
      status: 'error', 
      progress: 30,
      dataset: '教育数据集v3',
      createTime: '2024-01-17 11:45:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'blue';
      case 'completed': return 'green';
      case 'pending': return 'orange';
      case 'error': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '运行中';
      case 'completed': return '已完成';
      case 'pending': return '待启动';
      case 'error': return '错误';
      default: return '未知';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={3}>模型微调中心</Title>
        <Paragraph>
          管理大模型的微调任务，包括数据准备、参数配置、训练执行和效果评估。
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
          
          <Title level={4}>微调任务列表</Title>
          <List
            dataSource={tasks}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    disabled={item.status !== 'pending'}
                  >
                    启动
                  </Button>,
                  <Button icon={<BarChartOutlined />}>详情</Button>,
                  <Button 
                    icon={<DownloadOutlined />}
                    disabled={item.status !== 'completed'}
                  >
                    下载模型
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={
                    <Space direction="vertical">
                      <Space>
                        <span>基础模型: {item.model}</span>
                        <Tag color={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Tag>
                      </Space>
                      <Space>
                        <span>数据集: {item.dataset}</span>
                      </Space>
                      <Space>
                        <span>创建时间: {item.createTime}</span>
                      </Space>
                      {item.status !== 'pending' && (
                        <Space>
                          <span>进度: <Progress percent={item.progress} size="small" style={{ width: 200 }} /></span>
                        </Space>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
          
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Button type="primary" size="large" icon={<ControlOutlined />}>
              创建新的微调任务
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default FineTuningCenter;