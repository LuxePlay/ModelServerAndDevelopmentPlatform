//大模型服务与应用开发平台主页面

import type { ReactElement } from 'react';
import { Card, Typography, List, Space, Row, Col, Button } from 'antd';
import { 
  DatabaseOutlined, 
  DeploymentUnitOutlined, 
  ApiOutlined, 
  RobotOutlined,
  ControlOutlined,
  FileSearchOutlined,
  MessageOutlined,
  BranchesOutlined,
  AppstoreOutlined,
  CloudUploadOutlined,
  BarChartOutlined,
  SettingOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const ModelServerAndDevelopment = (): ReactElement => {
  const navigate = useNavigate();

  // 平台核心功能模块
  const coreModules = [
    {
      title: '大模型管理',
      description: '统一管理各种大语言模型，包括预训练模型、微调模型和自定义模型',
      icon: <DatabaseOutlined />,
      path: '/training/model-management',
      features: ['模型存储', '版本控制', '模型上传']
    },
    {
      title: '实例化部署',
      description: '基于已有模型快速创建部署实例，支持多种部署方式',
      icon: <DeploymentUnitOutlined />,
      path: '/training/model-deployment',
      features: ['实例创建', '启停控制', '性能监控']
    },
    {
      title: '微调中心',
      description: '管理大模型的微调任务，包括数据准备、参数配置和训练执行',
      icon: <ControlOutlined />,
      path: '/training/fine-tuning',
      features: ['数据准备', '参数配置', '训练执行']
    },
    {
      title: '智能体中心',
      description: '创建和管理各种类型的智能体，用于处理特定任务和场景',
      icon: <RobotOutlined />,
      path: '/training/agent-center',
      features: ['智能体创建', '启停控制', '效果监控']
    }
  ];

  // 应用开发模块
  const appDevModules = [
    {
      title: 'Prompt工程',
      description: '设计和优化Prompt，提升大模型的输出质量和准确性',
      icon: <MessageOutlined />,
      path: '/training/prompt-engineering',
      features: ['Prompt设计', '模板管理', '效果测试']
    },
    {
      title: '知识库(RAG)',
      description: '构建和管理知识库，增强大模型的知识检索和生成能力',
      icon: <FileSearchOutlined />,
      path: '/training/knowledge-library',
      features: ['知识库管理', '文档处理', '向量存储']
    },
    {
      title: '插件中心',
      description: '扩展大模型功能，集成第三方服务和工具',
      icon: <AppstoreOutlined />,
      path: '/training/plugin-center',
      features: ['插件管理', '插件市场', '插件开发']
    },
    {
      title: '工作流编排',
      description: '可视化编排AI工作流，实现复杂业务逻辑',
      icon: <BranchesOutlined />,
      path: '/training/workflow-orchestration',
      features: ['流程设计', '节点管理', '执行监控']
    }
  ];

  // 平台服务模块
  const serviceModules = [
    {
      title: 'API服务',
      description: '提供标准化的API接口供外部调用大模型能力',
      icon: <ApiOutlined />,
      path: '/training/model-management', // API服务通常在模型管理中
      features: ['API管理', '访问控制', '调用统计']
    },
    {
      title: '用户体验中心',
      description: '提供交互式体验界面，实时测试大模型能力',
      icon: <BarChartOutlined />,
      path: '/training/user-experience',
      features: ['文本对话', '图文识别', '参数配置']
    },
    {
      title: '模型监控',
      description: '实时监控模型性能和服务状态',
      icon: <SettingOutlined />,
      path: '/training/model-deployment', // 监控通常在部署实例中
      features: ['性能监控', '错误追踪', '资源使用']
    }
  ];

  const handleModuleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={3}>大模型服务与应用开发平台</Title>
        <Paragraph>
          一站式大模型服务平台，提供从模型管理、部署到应用开发的全流程解决方案。
        </Paragraph>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4}>平台概览</Title>
          
          <Card size="small">
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" style={{ height: '100%' }}>
                  <Title level={5}>模型资源</Title>
                  <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 0 }}>24</Paragraph>
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>已部署模型</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ height: '100%' }}>
                  <Title level={5}>运行实例</Title>
                  <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 0 }}>18</Paragraph>
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>正在运行</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ height: '100%' }}>
                  <Title level={5}>应用数量</Title>
                  <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 0 }}>12</Paragraph>
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>已创建应用</Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
          
          <Title level={4}>核心功能模块</Title>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={coreModules}
            renderItem={item => (
              <List.Item>
                <Card 
                  hoverable 
                  style={{ height: '100%' }}
                  onClick={() => handleModuleClick(item.path)}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center', fontSize: '32px' }}>
                      {item.icon}
                    </div>
                    <Title level={5} style={{ textAlign: 'center' }}>{item.title}</Title>
                    <Paragraph type="secondary" style={{ minHeight: '60px' }}>{item.description}</Paragraph>
                    <div>
                      {item.features.map((feature, index) => (
                        <span key={index} style={{ display: 'inline-block', margin: '2px' }}>
                          <Button type="primary" size="small" ghost>{feature}</Button>
                        </span>
                      ))}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Button type="link" icon={<RightOutlined />}>进入模块</Button>
                    </div>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
          
          <Title level={4}>应用开发模块</Title>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={appDevModules}
            renderItem={item => (
              <List.Item>
                <Card 
                  hoverable 
                  style={{ height: '100%' }}
                  onClick={() => handleModuleClick(item.path)}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center', fontSize: '32px' }}>
                      {item.icon}
                    </div>
                    <Title level={5} style={{ textAlign: 'center' }}>{item.title}</Title>
                    <Paragraph type="secondary" style={{ minHeight: '60px' }}>{item.description}</Paragraph>
                    <div>
                      {item.features.map((feature, index) => (
                        <span key={index} style={{ display: 'inline-block', margin: '2px' }}>
                          <Button type="primary" size="small" ghost>{feature}</Button>
                        </span>
                      ))}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Button type="link" icon={<RightOutlined />}>进入模块</Button>
                    </div>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
          
          <Title level={4}>平台服务模块</Title>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={serviceModules}
            renderItem={item => (
              <List.Item>
                <Card 
                  hoverable 
                  style={{ height: '100%' }}
                  onClick={() => handleModuleClick(item.path)}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center', fontSize: '32px' }}>
                      {item.icon}
                    </div>
                    <Title level={5} style={{ textAlign: 'center' }}>{item.title}</Title>
                    <Paragraph type="secondary" style={{ minHeight: '60px' }}>{item.description}</Paragraph>
                    <div>
                      {item.features.map((feature, index) => (
                        <span key={index} style={{ display: 'inline-block', margin: '2px' }}>
                          <Button type="primary" size="small" ghost>{feature}</Button>
                        </span>
                      ))}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Button type="link" icon={<RightOutlined />}>进入模块</Button>
                    </div>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
          
          <Title level={4}>平台优势</Title>
          <Row gutter={16}>
            <Col span={6}>
              <Card size="small">
                <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
                  <CloudUploadOutlined style={{ fontSize: '24px' }} />
                  <div>
                    <Paragraph strong style={{ marginBottom: 0 }}>一站式服务</Paragraph>
                    <Paragraph type="secondary" style={{ fontSize: '12px', marginBottom: 0 }}>从模型到应用的全流程服务</Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
                  <DeploymentUnitOutlined style={{ fontSize: '24px' }} />
                  <div>
                    <Paragraph strong style={{ marginBottom: 0 }}>灵活部署</Paragraph>
                    <Paragraph type="secondary" style={{ fontSize: '12px', marginBottom: 0 }}>支持多种部署方式和环境</Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
                  <ApiOutlined style={{ fontSize: '24px' }} />
                  <div>
                    <Paragraph strong style={{ marginBottom: 0 }}>开放API</Paragraph>
                    <Paragraph type="secondary" style={{ fontSize: '12px', marginBottom: 0 }}>标准化接口便于集成</Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
                  <BarChartOutlined style={{ fontSize: '24px' }} />
                  <div>
                    <Paragraph strong style={{ marginBottom: 0 }}>全面监控</Paragraph>
                    <Paragraph type="secondary" style={{ fontSize: '12px', marginBottom: 0 }}>实时监控和性能分析</Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Space>
      </Card>
    </div>
  );
};

export default ModelServerAndDevelopment;