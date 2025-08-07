//数据清洗

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
  Switch,
  Modal,
  Descriptions
} from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

interface CleaningTask {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused';
  progress: number;
  dataType: string;
  rulesApplied: string[];
  cleanedRecords: number;
  errorRecords: number;
  createTime: string;
  duration: string;
}

interface CleaningRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: 'deduplication' | 'format' | 'filter' | 'custom';
}

const DatasetCleaning = (): ReactElement => {
  const [tasks] = useState<CleaningTask[]>([
    {
      id: 'task-001',
      name: '电商用户行为数据清洗',
      status: 'completed',
      progress: 100,
      dataType: 'CSV',
      rulesApplied: ['重复数据删除', '手机号格式校验'],
      cleanedRecords: 125000,
      errorRecords: 2500,
      createTime: '2024-01-15 10:30',
      duration: '15分钟'
    },
    {
      id: 'task-002',
      name: '社交媒体文本数据清洗',
      status: 'processing',
      progress: 65,
      dataType: 'JSON',
      rulesApplied: ['敏感词过滤', '空值处理'],
      cleanedRecords: 87500,
      errorRecords: 1200,
      createTime: '2024-01-16 14:20',
      duration: '进行中'
    },
    {
      id: 'task-003',
      name: '金融交易数据清洗',
      status: 'pending',
      progress: 0,
      dataType: 'Database',
      rulesApplied: ['异常值检测', '格式标准化'],
      cleanedRecords: 0,
      errorRecords: 0,
      createTime: '2024-01-17 09:15',
      duration: '待开始'
    }
  ]);

  const [rules] = useState<CleaningRule[]>([
    {
      id: 'rule-001',
      name: '重复数据删除',
      description: '识别并删除完全重复的数据记录',
      enabled: true,
      type: 'deduplication'
    },
    {
      id: 'rule-002',
      name: '手机号格式校验',
      description: '校验手机号格式是否符合规范',
      enabled: true,
      type: 'format'
    },
    {
      id: 'rule-003',
      name: '邮箱格式校验',
      description: '校验邮箱格式是否符合规范',
      enabled: false,
      type: 'format'
    },
    {
      id: 'rule-004',
      name: '敏感词过滤',
      description: '过滤文本中的敏感词汇',
      enabled: true,
      type: 'filter'
    },
    {
      id: 'rule-005',
      name: '异常值检测',
      description: '检测并标记数值型字段的异常值',
      enabled: false,
      type: 'custom'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CleaningTask | null>(null);

  const getStatusTag = (status: CleaningTask['status']) => {
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

  const getRuleTypeTag = (type: CleaningRule['type']) => {
    switch (type) {
      case 'deduplication':
        return <Tag color="blue">去重</Tag>;
      case 'format':
        return <Tag color="green">格式化</Tag>;
      case 'filter':
        return <Tag color="orange">过滤</Tag>;
      case 'custom':
        return <Tag color="purple">自定义</Tag>;
      default:
        return <Tag>其他</Tag>;
    }
  };

  const handleStartCleaning = () => {
    message.success('开始数据清洗任务');
  };

  const handlePauseCleaning = () => {
    message.info('暂停数据清洗任务');
  };

  const handleViewDetails = (task: CleaningTask) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleRuleToggle = (id: string) => {
    message.info(`规则 ${id} 状态已切换`);
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
      render: (status: CleaningTask['status']) => getStatusTag(status)
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number, record: CleaningTask) => (
        record.status === 'pending' ? 
        <Text>待处理</Text> : 
        <Progress percent={progress} size="small" />
      )
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType'
    },
    {
      title: '清洗记录数',
      dataIndex: 'cleanedRecords',
      key: 'cleanedRecords',
      render: (cleanedRecords: number) => cleanedRecords.toLocaleString()
    },
    {
      title: '错误记录数',
      dataIndex: 'errorRecords',
      key: 'errorRecords',
      render: (errorRecords: number) => errorRecords.toLocaleString()
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: CleaningTask) => (
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
              onClick={handleStartCleaning}
            >
              开始
            </Button>
          )}
          {record.status === 'processing' && (
            <Button 
              type="link" 
              size="small" 
              icon={<PauseCircleOutlined />}
              onClick={handlePauseCleaning}
            >
              暂停
            </Button>
          )}
          <Button type="link" size="small" icon={<DownloadOutlined />}>下载</Button>
        </Space>
      )
    }
  ];

  const ruleColumns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: CleaningRule['type']) => getRuleTypeTag(type)
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled: boolean, record: CleaningRule) => (
        <Switch 
          checked={enabled} 
          onChange={() => handleRuleToggle(record.id)} 
          size="small"
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, _record: CleaningRule) => (
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
        <Title level={3}>数据清洗</Title>
        <Text type="secondary">对数据集进行清洗处理，提高数据质量</Text>
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
              title="清洗数据总量" 
              value={tasks.reduce((sum, task) => sum + task.cleanedRecords, 0).toLocaleString()} 
              suffix="条"
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title="清洗任务" 
        extra={
          <Space>
            <Button type="primary" icon={<PlayCircleOutlined />}>新建清洗任务</Button>
            <Button icon={<ReloadOutlined />}>刷新</Button>
          </Space>
        }
        style={{ marginBottom: '24px' }}
      >
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
            <Select placeholder="数据类型" style={{ width: 120 }} allowClear>
              <Option value="csv">CSV</Option>
              <Option value="json">JSON</Option>
              <Option value="database">数据库</Option>
              <Option value="excel">Excel</Option>
            </Select>
          </Space>
        </div>
        
        <Table 
          dataSource={tasks} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Card title="清洗规则管理" style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>新增规则</Button>
            <Button icon={<UploadOutlined />}>导入规则</Button>
          </Space>
        </div>
        
        <Table 
          dataSource={rules} 
          columns={ruleColumns} 
          rowKey="id" 
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Collapse defaultActiveKey={['1']} style={{ marginBottom: '24px' }}>
        <Panel header="清洗配置说明" key="1">
          <Typography>
            <Title level={5}>数据清洗功能说明：</Title>
            <ul>
              <li>支持多种数据源格式（CSV、JSON、数据库等）的数据清洗</li>
              <li>提供常见清洗规则：去重、格式校验、过滤等</li>
              <li>支持自定义清洗规则</li>
              <li>实时监控清洗进度和状态</li>
              <li>清洗完成后可下载清洗报告和清洗后的数据</li>
            </ul>
            
            <Title level={5}>操作流程：</Title>
            <ol>
              <li>创建清洗任务，选择数据源</li>
              <li>配置清洗规则</li>
              <li>启动清洗任务</li>
              <li>监控清洗进度</li>
              <li>下载清洗结果</li>
            </ol>
          </Typography>
        </Panel>
      </Collapse>

      <Modal
        title="清洗任务详情"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>关闭</Button>,
          selectedTask?.status === 'pending' && (
            <Button key="start" type="primary" icon={<PlayCircleOutlined />} onClick={handleStartCleaning}>
              开始清洗
            </Button>
          ),
          selectedTask?.status === 'processing' && (
            <Button key="pause" icon={<PauseCircleOutlined />} onClick={handlePauseCleaning}>
              暂停清洗
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
              <Descriptions.Item label="数据类型">{selectedTask.dataType}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedTask.createTime}</Descriptions.Item>
              <Descriptions.Item label="清洗记录数">{selectedTask.cleanedRecords.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="错误记录数">{selectedTask.errorRecords.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="处理时长">{selectedTask.duration}</Descriptions.Item>
              <Descriptions.Item label="应用规则">
                <Space>
                  {selectedTask.rulesApplied.map((rule, index) => (
                    <Tag key={index}>{rule}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Title level={5}>清洗进度</Title>
            <Progress percent={selectedTask.progress} />
            
            {selectedTask.status === 'completed' && (
              <div style={{ marginTop: '16px' }}>
                <Space>
                  <Button type="primary" icon={<DownloadOutlined />}>下载清洗结果</Button>
                  <Button icon={<DownloadOutlined />}>下载清洗报告</Button>
                </Space>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DatasetCleaning;