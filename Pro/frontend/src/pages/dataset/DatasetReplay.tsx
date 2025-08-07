//数据回流

import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  Card,
  Typography,
  Button,
  Table,
  Tag,
  Space,
  Progress,
  Row,
  Col,
  Statistic,
  Divider,
  Select,
  Input,
  Collapse,
  message,
  Modal,
  Descriptions,
  Tabs
} from 'antd';
import {
  SyncOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  DatabaseOutlined,
  ApiOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface ReplayTask {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused';
  progress: number;
  source: string;
  destination: string;
  dataType: string;
  recordsCount: number;
  successCount: number;
  failCount: number;
  createTime: string;
  duration: string;
}

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file';
  status: 'active' | 'inactive';
}

const DatasetReplay = (): ReactElement => {
  const [tasks] = useState<ReplayTask[]>([
    {
      id: 'replay-001',
      name: '线上预测结果回流',
      status: 'completed',
      progress: 100,
      source: '模型预测服务',
      destination: '训练数据集A',
      dataType: 'JSON',
      recordsCount: 125000,
      successCount: 123750,
      failCount: 1250,
      createTime: '2024-01-15 10:30',
      duration: '25分钟'
    },
    {
      id: 'replay-002',
      name: '用户行为数据回流',
      status: 'processing',
      progress: 75,
      source: '用户行为日志',
      destination: '行为数据集B',
      dataType: 'CSV',
      recordsCount: 87500,
      successCount: 85000,
      failCount: 2500,
      createTime: '2024-01-16 14:20',
      duration: '进行中'
    },
    {
      id: 'replay-003',
      name: '实时反馈数据回流',
      status: 'pending',
      progress: 0,
      source: '实时反馈接口',
      destination: '反馈数据集C',
      dataType: 'Database',
      recordsCount: 0,
      successCount: 0,
      failCount: 0,
      createTime: '2024-01-17 09:15',
      duration: '待开始'
    }
  ]);

  const [dataSources] = useState<DataSource[]>([
    {
      id: 'src-001',
      name: '模型预测服务',
      type: 'api',
      status: 'active'
    },
    {
      id: 'src-002',
      name: '用户行为日志',
      type: 'file',
      status: 'active'
    },
    {
      id: 'src-003',
      name: '实时反馈接口',
      type: 'api',
      status: 'active'
    },
    {
      id: 'src-004',
      name: '数据库源D',
      type: 'database',
      status: 'inactive'
    }
  ]);

  const [destinations] = useState<DataSource[]>([
    {
      id: 'dest-001',
      name: '训练数据集A',
      type: 'database',
      status: 'active'
    },
    {
      id: 'dest-002',
      name: '行为数据集B',
      type: 'database',
      status: 'active'
    },
    {
      id: 'dest-003',
      name: '反馈数据集C',
      type: 'database',
      status: 'active'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ReplayTask | null>(null);
  const [activeTab, setActiveTab] = useState('1');

  const getStatusTag = (status: ReplayTask['status']) => {
    switch (status) {
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">已完成</Tag>;
      case 'processing':
        return <Tag icon={<SyncOutlined spin />} color="processing">进行中</Tag>;
      case 'failed':
        return <Tag icon={<CloseCircleOutlined />} color="error">失败</Tag>;
      case 'paused':
        return <Tag icon={<PauseCircleOutlined />} color="warning">已暂停</Tag>;
      case 'pending':
        return <Tag icon={<ExclamationCircleOutlined />} color="default">待处理</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const getSourceTypeTag = (type: DataSource['type']) => {
    switch (type) {
      case 'database':
        return <Tag icon={<DatabaseOutlined />} color="blue">数据库</Tag>;
      case 'api':
        return <Tag icon={<ApiOutlined />} color="green">API</Tag>;
      case 'file':
        return <Tag icon={<FileTextOutlined />} color="orange">文件</Tag>;
      default:
        return <Tag>其他</Tag>;
    }
  };

  const handleStartReplay = () => {
    message.success('开始数据回流任务');
  };

  const handlePauseReplay = () => {
    message.info('暂停数据回流任务');
  };

  const handleViewDetails = (task: ReplayTask) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleCreateTask = () => {
    message.success('创建数据回流任务');
  };

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: ReplayTask['status']) => getStatusTag(status)
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number, record: ReplayTask) => (
        record.status === 'pending' ? 
        <Text>待处理</Text> : 
        <Progress percent={progress} size="small" />
      )
    },
    {
      title: '数据源',
      dataIndex: 'source',
      key: 'source'
    },
    {
      title: '目标数据集',
      dataIndex: 'destination',
      key: 'destination'
    },
    {
      title: '总记录数',
      dataIndex: 'recordsCount',
      key: 'recordsCount',
      render: (recordsCount: number) => recordsCount.toLocaleString()
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ReplayTask) => (
        <Space size="middle">
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            查看详情
          </Button>
          {record.status === 'pending' && (
            <Button 
              type="link" 
              size="small" 
              icon={<PlayCircleOutlined />}
              onClick={handleStartReplay}
            >
              开始
            </Button>
          )}
          {record.status === 'processing' && (
            <Button 
              type="link" 
              size="small" 
              icon={<PauseCircleOutlined />}
              onClick={handlePauseReplay}
            >
              暂停
            </Button>
          )}
          <Button type="link" size="small" icon={<DownloadOutlined />}>下载</Button>
        </Space>
      )
    }
  ];

  const sourceColumns = [
    {
      title: '数据源名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: DataSource['type']) => getSourceTypeTag(type)
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: DataSource['status']) => (
        status === 'active' ? 
        <Tag color="success">启用</Tag> : 
        <Tag color="default">停用</Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any,_record : DataSource) => (
        <Space size="middle">
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={3}>数据回流</Title>
        <Text type="secondary">将线上预测结果或用户反馈数据回流至训练数据集，用于模型优化</Text>
      </div>

      <Row gutter={24} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="总任务数" 
              value={tasks.length} 
              prefix={<FileTextOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="进行中" 
              value={tasks.filter(t => t.status === 'processing').length} 
              prefix={<SyncOutlined />} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="已完成" 
              value={tasks.filter(t => t.status === 'completed').length} 
              prefix={<CheckCircleOutlined />} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="回流数据总量" 
              value={tasks.reduce((sum, task) => sum + task.recordsCount, 0).toLocaleString()} 
              suffix="条"
            />
          </Card>
        </Col>
      </Row>

      <Card 
        style={{ marginBottom: '24px' }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="回流任务" key="1">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>新建回流任务</Button>
                <Button icon={<ReloadOutlined />}>刷新</Button>
              </Space>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Search placeholder="搜索任务名称" style={{ width: 200 }} />
                <Select placeholder="状态筛选" style={{ width: 120 }} allowClear>
                  <Option value="pending">待处理</Option>
                  <Option value="processing">进行中</Option>
                  <Option value="completed">已完成</Option>
                  <Option value="failed">失败</Option>
                  <Option value="paused">已暂停</Option>
                </Select>
                <Select placeholder="数据源" style={{ width: 150 }} allowClear>
                  {dataSources.map(source => (
                    <Option key={source.id} value={source.name}>{source.name}</Option>
                  ))}
                </Select>
                <Select placeholder="目标数据集" style={{ width: 150 }} allowClear>
                  {destinations.map(dest => (
                    <Option key={dest.id} value={dest.name}>{dest.name}</Option>
                  ))}
                </Select>
              </Space>
            </div>
            
            <Table 
              dataSource={tasks} 
              columns={columns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane tab="数据源管理" key="2">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>新增数据源</Button>
                <Button icon={<UploadOutlined />}>导入数据源</Button>
              </Space>
            </div>
            
            <Table 
              dataSource={dataSources} 
              columns={sourceColumns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane tab="目标数据集" key="3">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>新增数据集</Button>
                <Button icon={<UploadOutlined />}>导入数据集</Button>
              </Space>
            </div>
            
            <Table 
              dataSource={destinations} 
              columns={sourceColumns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      <Card title="配置说明" style={{ marginBottom: '24px' }}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="数据回流功能说明" key="1">
            <Typography>
              <Title level={5}>数据回流功能说明：</Title>
              <ul>
                <li>将线上预测结果或用户反馈数据回流至训练数据集，用于模型优化</li>
                <li>支持多种数据源接入（API、数据库、文件等）</li>
                <li>支持多种目标数据集格式（数据库、文件系统等）</li>
                <li>实时监控回流进度和状态</li>
                <li>回流完成后可下载回流报告和回流后的数据</li>
              </ul>
              
              <Title level={5}>应用场景：</Title>
              <ol>
                <li>将模型预测结果保存回训练数据集，用于下一次模型优化训练</li>
                <li>收集用户反馈数据，用于模型迭代优化</li>
                <li>将线上产生的新数据回流到训练数据集中，丰富训练样本</li>
              </ol>
            </Typography>
          </Panel>
        </Collapse>
      </Card>

      <Modal
        title="回流任务详情"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>关闭</Button>,
          selectedTask?.status === 'pending' && (
            <Button key="start" type="primary" icon={<PlayCircleOutlined />} onClick={handleStartReplay}>
              开始回流
            </Button>
          ),
          selectedTask?.status === 'processing' && (
            <Button key="pause" icon={<PauseCircleOutlined />} onClick={handlePauseReplay}>
              暂停回流
            </Button>
          )
        ].filter(Boolean)}
        width={800}
      >
        {selectedTask && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="任务名称">{selectedTask.name}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedTask.status)}</Descriptions.Item>
              <Descriptions.Item label="数据源">{selectedTask.source}</Descriptions.Item>
              <Descriptions.Item label="目标数据集">{selectedTask.destination}</Descriptions.Item>
              <Descriptions.Item label="数据类型">{selectedTask.dataType}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedTask.createTime}</Descriptions.Item>
              <Descriptions.Item label="总记录数">{selectedTask.recordsCount.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="成功记录数">{selectedTask.successCount.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="失败记录数">{selectedTask.failCount.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="处理时长">{selectedTask.duration}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Title level={5}>回流进度</Title>
            <Progress percent={selectedTask.progress} />
            
            {selectedTask.status === 'completed' && (
              <div style={{ marginTop: '16px' }}>
                <Space>
                  <Button type="primary" icon={<DownloadOutlined />}>下载回流结果</Button>
                  <Button icon={<DownloadOutlined />}>下载回流报告</Button>
                </Space>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DatasetReplay;