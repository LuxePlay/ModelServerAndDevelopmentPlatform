//智能体中心

import { useState, type ReactElement } from 'react';
import { Card, Typography, List, Space, Tag, Button, Avatar, Input, Select, Pagination, Row, Col } from 'antd';
import { 
  RobotOutlined, 
  PlayCircleOutlined, 
  StopOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  SearchOutlined,
  BarChartOutlined,
  FireOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const AgentCenter = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('time');

  const features = [
    {
      title: '智能体创建',
      description: '基于大模型快速创建智能体',
      icon: <RobotOutlined />
    },
    {
      title: '智能体管理',
      description: '管理已创建的智能体实例',
      icon: <EditOutlined />
    },
    {
      title: '启停控制',
      description: '控制智能体的运行状态',
      icon: <PlayCircleOutlined />
    },
    {
      title: '效果监控',
      description: '监控智能体运行效果和性能',
      icon: <BarChartOutlined />
    }
  ];

  // 模拟更多智能体数据
  const allAgents = [
    { 
      id: 'agent-001', 
      name: '客服智能体', 
      model: 'Qwen-7B',
      status: 'running', 
      type: '对话型',
      creator: '张三',
      createTime: '2024-01-15 10:30:00',
      description: '处理用户常见问题的客服助手',
      usageCount: 12800,
      lastActive: '2024-01-20 14:30:00'
    },
    { 
      id: 'agent-002', 
      name: '数据分析智能体', 
      model: 'LLaMA-2-13B',
      status: 'stopped', 
      type: '分析型',
      creator: '李四',
      createTime: '2024-01-14 14:22:00',
      description: '自动分析业务数据并生成报告',
      usageCount: 8500,
      lastActive: '2024-01-19 09:15:00'
    },
    { 
      id: 'agent-003', 
      name: '代码生成智能体', 
      model: 'CodeLlama-7B',
      status: 'running', 
      type: '生成型',
      creator: '王五',
      createTime: '2024-01-16 09:15:00',
      description: '根据需求自动生成代码',
      usageCount: 15200,
      lastActive: '2024-01-20 16:45:00'
    },
    { 
      id: 'agent-004', 
      name: '内容创作智能体', 
      model: 'ChatGLM-6B',
      status: 'error', 
      type: '创作型',
      creator: '赵六',
      createTime: '2024-01-17 11:45:00',
      description: '自动生成营销文案和社交媒体内容',
      usageCount: 9300,
      lastActive: '2024-01-18 17:20:00'
    },
    { 
      id: 'agent-005', 
      name: '法律咨询智能体', 
      model: 'LawBERT',
      status: 'running', 
      type: '问答型',
      creator: '孙七',
      createTime: '2024-01-10 08:30:00',
      description: '提供法律咨询服务',
      usageCount: 6700,
      lastActive: '2024-01-20 10:15:00'
    },
    { 
      id: 'agent-006', 
      name: '医疗诊断智能体', 
      model: 'MediQA-7B',
      status: 'stopped', 
      type: '诊断型',
      creator: '周八',
      createTime: '2024-01-05 13:20:00',
      description: '辅助进行初步医疗诊断',
      usageCount: 11200,
      lastActive: '2024-01-19 15:30:00'
    },
    { 
      id: 'agent-007', 
      name: '教育辅导智能体', 
      model: 'EduChat-13B',
      status: 'running', 
      type: '教学型',
      creator: '吴九',
      createTime: '2024-01-12 16:45:00',
      description: '为学生提供个性化学习辅导',
      usageCount: 18900,
      lastActive: '2024-01-20 13:10:00'
    },
    { 
      id: 'agent-008', 
      name: '金融分析智能体', 
      model: 'FinBERT',
      status: 'running', 
      type: '分析型',
      creator: '郑十',
      createTime: '2024-01-08 11:15:00',
      description: '分析金融市场趋势和投资建议',
      usageCount: 9800,
      lastActive: '2024-01-20 11:25:00'
    },
    { 
      id: 'agent-009', 
      name: '旅游规划智能体', 
      model: 'TravelGPT',
      status: 'stopped', 
      type: '规划型',
      creator: '王一',
      createTime: '2024-01-03 09:30:00',
      description: '根据用户需求制定个性化旅游路线',
      usageCount: 5400,
      lastActive: '2024-01-17 14:20:00'
    },
    { 
      id: 'agent-010', 
      name: '情感咨询智能体', 
      model: 'EmotionAI',
      status: 'running', 
      type: '咨询型',
      creator: '李二',
      createTime: '2024-01-18 14:50:00',
      description: '提供情感支持和心理疏导',
      usageCount: 7600,
      lastActive: '2024-01-20 15:40:00'
    },
    { 
      id: 'agent-011', 
      name: '电商推荐智能体', 
      model: 'RecommendAI',
      status: 'running', 
      type: '推荐型',
      creator: '张三',
      createTime: '2024-01-11 10:20:00',
      description: '根据用户行为推荐商品',
      usageCount: 21500,
      lastActive: '2024-01-20 17:05:00'
    },
    { 
      id: 'agent-012', 
      name: '语言翻译智能体', 
      model: 'TranslatePro',
      status: 'error', 
      type: '翻译型',
      creator: '赵四',
      createTime: '2024-01-07 15:40:00',
      description: '多语言实时翻译服务',
      usageCount: 13400,
      lastActive: '2024-01-18 12:30:00'
    }
  ];

  // 根据搜索和筛选条件过滤智能体
  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          agent.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    
    const matchesType = typeFilter === 'all' || agent.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // 根据排序条件排序
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortOrder === 'time') {
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
    } else if (sortOrder === 'hot') {
      return b.usageCount - a.usageCount;
    }
    return 0;
  });

  // 分页处理
  const pageSize = 6;
  const total = sortedAgents.length;
  const paginatedAgents = sortedAgents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={3}>智能体中心</Title>
        <Paragraph>
          创建和管理各种类型的智能体，用于处理特定任务和场景。
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
          
          <Title level={4}>智能体管理</Title>
          
          {/* 搜索和筛选区域 */}
          <Card size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row gutter={16} align="middle">
                <Col span={8}>
                  <Search
                    placeholder="搜索智能体名称或描述"
                    allowClear
                    enterButton={<SearchOutlined />}
                    onSearch={handleSearch}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </Col>
                <Col span={4}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="状态筛选"
                    allowClear
                    value={statusFilter}
                    onChange={handleStatusFilter}
                  >
                    <Option value="all">全部状态</Option>
                    <Option value="running">运行中</Option>
                    <Option value="stopped">已停止</Option>
                    <Option value="error">错误</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="类型筛选"
                    allowClear
                    value={typeFilter}
                    onChange={handleTypeFilter}
                  >
                    <Option value="all">全部类型</Option>
                    <Option value="对话型">对话型</Option>
                    <Option value="分析型">分析型</Option>
                    <Option value="生成型">生成型</Option>
                    <Option value="创作型">创作型</Option>
                    <Option value="问答型">问答型</Option>
                    <Option value="诊断型">诊断型</Option>
                    <Option value="教学型">教学型</Option>
                    <Option value="规划型">规划型</Option>
                    <Option value="咨询型">咨询型</Option>
                    <Option value="推荐型">推荐型</Option>
                    <Option value="翻译型">翻译型</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="排序方式"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <Option value="time">按时间排序</Option>
                    <Option value="hot">按热度排序</Option>
                  </Select>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <Button type="primary" icon={<RobotOutlined />}>
                    创建智能体
                  </Button>
                </Col>
              </Row>
            </Space>
          </Card>
          
          {/* 智能体列表 */}
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={paginatedAgents}
            renderItem={item => (
              <List.Item>
                <Card 
                  style={{ height: '100%' }}
                  actions={[
                    <Button 
                      type="text" 
                      icon={item.status === 'running' ? <StopOutlined /> : <PlayCircleOutlined />}
                      disabled={item.status === 'error'}
                    >
                      {item.status === 'running' ? '停止' : '启动'}
                    </Button>,
                    <Button type="text" icon={<EditOutlined />}>编辑</Button>,
                    <Button type="text" icon={<CopyOutlined />}>复制</Button>,
                    <Button type="text" icon={<BarChartOutlined />}>监控</Button>,
                    <Button type="text" icon={<DeleteOutlined />} danger>删除</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={64} icon={<RobotOutlined />} />}
                    title={
                      <Space>
                        {item.name}
                        <Tag color={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Tag>
                        <Tag color="blue">{item.type}</Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Paragraph type="secondary" style={{ marginBottom: 0, height: '40px', overflow: 'hidden' }}>
                          {item.description}
                        </Paragraph>
                        <Space size="large">
                          <span>模型: {item.model}</span>
                          <span>创建者: {item.creator}</span>
                        </Space>
                        <Space size="large">
                          <span><FireOutlined /> 使用次数: {item.usageCount.toLocaleString()}</span>
                          <span><ClockCircleOutlined /> 最后活跃: {item.lastActive}</span>
                        </Space>
                      </Space>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
          
          {/* 分页器 */}
          <div style={{ textAlign: 'right' }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total) => `共 ${total} 个智能体`}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default AgentCenter;