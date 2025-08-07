//数据质量评估

import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  Card,
  Typography,
  Button,
  Table,
  Tag,
  Space,

  Row,
  Col,
  Statistic,
  Divider,
  Select,
  Input,
  message,
  Modal,
  Descriptions,
  Tabs,
  List,

  Rate,
  Badge
} from 'antd';
import {
  BarChartOutlined,

  ReloadOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,

  PlusOutlined,
  WarningOutlined,

  PieChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;

interface QualityReport {
  id: string;
  datasetName: string;
  status: 'completed' | 'processing' | 'failed';
  overallScore: number;
  completeness: number;
  consistency: number;
  accuracy: number;
  uniqueness: number;
  timeliness: number;
  totalRecords: number;
  invalidRecords: number;
  duplicateRecords: number;
  createTime: string;
  duration: string;
}

interface QualityIssue {
  id: string;
  type: 'completeness' | 'consistency' | 'accuracy' | 'uniqueness' | 'timeliness';
  severity: 'high' | 'medium' | 'low';
  description: string;
  count: number;
  example: string;
}

const DatasetQuality = (): ReactElement => {
  const [reports] = useState<QualityReport[]>([
    {
      id: 'report-001',
      datasetName: '电商用户行为数据集',
      status: 'completed',
      overallScore: 85,
      completeness: 92,
      consistency: 78,
      accuracy: 88,
      uniqueness: 95,
      timeliness: 72,
      totalRecords: 125000,
      invalidRecords: 8500,
      duplicateRecords: 3200,
      createTime: '2024-01-15 10:30',
      duration: '18分钟'
    },
    {
      id: 'report-002',
      datasetName: '社交媒体文本数据集',
      status: 'completed',
      overallScore: 72,
      completeness: 85,
      consistency: 65,
      accuracy: 70,
      uniqueness: 68,
      timeliness: 80,
      totalRecords: 87500,
      invalidRecords: 12500,
      duplicateRecords: 8700,
      createTime: '2024-01-16 14:20',
      duration: '22分钟'
    },
    {
      id: 'report-003',
      datasetName: '金融交易数据集',
      status: 'processing',
      overallScore: 0,
      completeness: 0,
      consistency: 0,
      accuracy: 0,
      uniqueness: 0,
      timeliness: 0,
      totalRecords: 215000,
      invalidRecords: 0,
      duplicateRecords: 0,
      createTime: '2024-01-17 09:15',
      duration: '进行中'
    }
  ]);

  const [issues] = useState<QualityIssue[]>([
    {
      id: 'issue-001',
      type: 'completeness',
      severity: 'high',
      description: '用户手机号字段缺失',
      count: 2500,
      example: '记录ID: 1001, 手机号: null'
    },
    {
      id: 'issue-002',
      type: 'consistency',
      severity: 'medium',
      description: '日期格式不统一',
      count: 1800,
      example: '记录ID: 2005, 日期: 2023/05/12 与 记录ID: 3008, 日期: 2023-05-12'
    },
    {
      id: 'issue-003',
      type: 'accuracy',
      severity: 'high',
      description: '邮箱格式错误',
      count: 1200,
      example: '记录ID: 4012, 邮箱: user@.com'
    },
    {
      id: 'issue-004',
      type: 'uniqueness',
      severity: 'medium',
      description: '重复的用户记录',
      count: 3200,
      example: '用户ID: 5001 出现3次'
    },
    {
      id: 'issue-005',
      type: 'timeliness',
      severity: 'low',
      description: '数据更新延迟超过24小时',
      count: 850,
      example: '记录ID: 6025, 创建时间: 2023-12-01, 更新时间: 2023-12-03'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<QualityReport | null>(null);
  const [activeTab, setActiveTab] = useState('1');

  const getStatusTag = (status: QualityReport['status']) => {
    switch (status) {
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">已完成</Tag>;
      case 'processing':
        return <Tag icon={<ReloadOutlined spin />} color="processing">进行中</Tag>;
      case 'failed':
        return <Tag icon={<CloseCircleOutlined />} color="error">失败</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const getIssueTypeTag = (type: QualityIssue['type']) => {
    switch (type) {
      case 'completeness':
        return <Tag color="blue">完整性</Tag>;
      case 'consistency':
        return <Tag color="green">一致性</Tag>;
      case 'accuracy':
        return <Tag color="red">准确性</Tag>;
      case 'uniqueness':
        return <Tag color="orange">唯一性</Tag>;
      case 'timeliness':
        return <Tag color="purple">时效性</Tag>;
      default:
        return <Tag>其他</Tag>;
    }
  };

  const getSeverityTag = (severity: QualityIssue['severity']) => {
    switch (severity) {
      case 'high':
        return <Tag icon={<WarningOutlined />} color="error">高</Tag>;
      case 'medium':
        return <Tag color="warning">中</Tag>;
      case 'low':
        return <Tag color="default">低</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const handleViewDetails = (report: QualityReport) => {
    setSelectedReport(report);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedReport(null);
  };

  const handleCreateReport = () => {
    message.success('开始生成数据质量报告');
  };

  const columns = [
    {
      title: '数据集名称',
      dataIndex: 'datasetName',
      key: 'datasetName',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: QualityReport['status']) => getStatusTag(status)
    },
    {
      title: '总体评分',
      dataIndex: 'overallScore',
      key: 'overallScore',
      render: (score: number) => (
        score > 0 ? 
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge count={score} style={{ backgroundColor: score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#ff4d4f' }} />
          <Rate disabled defaultValue={Math.round(score / 20)} style={{ fontSize: 14, marginLeft: 8 }} />
        </div> : 
        <Text>评估中</Text>
      )
    },
    {
      title: '总记录数',
      dataIndex: 'totalRecords',
      key: 'totalRecords',
      render: (totalRecords: number) => totalRecords.toLocaleString()
    },
    {
      title: '无效记录',
      dataIndex: 'invalidRecords',
      key: 'invalidRecords',
      render: (invalidRecords: number) => invalidRecords.toLocaleString()
    },
    {
      title: '重复记录',
      dataIndex: 'duplicateRecords',
      key: 'duplicateRecords',
      render: (duplicateRecords: number) => duplicateRecords.toLocaleString()
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: QualityReport) => (
        <Space size="middle">
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            查看详情
          </Button>
          <Button type="link" size="small" icon={<DownloadOutlined />}>下载报告</Button>
        </Space>
      )
    }
  ];

  const issueColumns = [
    {
      title: '问题类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: QualityIssue['type']) => getIssueTypeTag(type)
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: QualityIssue['severity']) => getSeverityTag(severity)
    },
    {
      title: '问题描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '影响记录数',
      dataIndex: 'count',
      key: 'count',
      render: (count: number) => count.toLocaleString()
    },
    {
      title: '示例',
      dataIndex: 'example',
      key: 'example'
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={3}>数据质量评估</Title>
        <Text type="secondary">评估数据集质量，包括完整性、一致性、准确性、唯一性和时效性等维度</Text>
      </div>

      <Row gutter={24} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="总报告数" 
              value={reports.length} 
              prefix={<FileTextOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="已完成" 
              value={reports.filter(r => r.status === 'completed').length} 
              prefix={<CheckCircleOutlined />} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="进行中" 
              value={reports.filter(r => r.status === 'processing').length} 
              prefix={<ReloadOutlined />} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="平均质量评分" 
              value={reports.filter(r => r.status === 'completed').reduce((sum, report) => sum + report.overallScore, 0) / reports.filter(r => r.status === 'completed').length || 0} 
              precision={1}
              suffix="/ 100"
            />
          </Card>
        </Col>
      </Row>

      <Card 
        style={{ marginBottom: '24px' }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="质量报告" key="1">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateReport}>生成质量报告</Button>
                <Button icon={<ReloadOutlined />}>刷新</Button>
              </Space>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Search placeholder="搜索数据集名称" style={{ width: 200 }} />
                <Select placeholder="状态筛选" style={{ width: 120 }} allowClear>
                  <Option value="completed">已完成</Option>
                  <Option value="processing">进行中</Option>
                  <Option value="failed">失败</Option>
                </Select>
                <Select placeholder="质量评分" style={{ width: 150 }} allowClear>
                  <Option value="high">高质量 (≥80分)</Option>
                  <Option value="medium">中等质量 (60-79分)</Option>
                  <Option value="low">低质量 (≤59分)</Option>
                </Select>
              </Space>
            </div>
            
            <Table 
              dataSource={reports} 
              columns={columns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane tab="质量问题" key="2">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Select placeholder="问题类型" style={{ width: 120 }} allowClear>
                  <Option value="completeness">完整性</Option>
                  <Option value="consistency">一致性</Option>
                  <Option value="accuracy">准确性</Option>
                  <Option value="uniqueness">唯一性</Option>
                  <Option value="timeliness">时效性</Option>
                </Select>
                <Select placeholder="严重程度" style={{ width: 120 }} allowClear>
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
                <Button icon={<ReloadOutlined />}>刷新</Button>
              </Space>
            </div>
            
            <Table 
              dataSource={issues} 
              columns={issueColumns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane tab="质量指标说明" key="3">
            <Card title="数据质量评估维度" style={{ marginBottom: '24px' }}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    title: "完整性 (Completeness)",
                    description: "数据是否存在缺失，字段是否完整。例如用户信息是否包含手机号、邮箱等必要字段。"
                  },
                  {
                    title: "一致性 (Consistency)",
                    description: "数据在不同地方的表达是否一致。例如日期格式、编码规范等是否统一。"
                  },
                  {
                    title: "准确性 (Accuracy)",
                    description: "数据是否真实反映实际情况。例如手机号格式是否正确，邮箱地址是否有效。"
                  },
                  {
                    title: "唯一性 (Uniqueness)",
                    description: "数据是否存在重复记录。例如同一个用户是否在系统中只存在一条记录。"
                  },
                  {
                    title: "时效性 (Timeliness)",
                    description: "数据是否及时更新，是否反映了最新的情况。例如用户信息是否为最新状态。"
                  }
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Text strong>{item.title}</Text>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
            
            <Card title="评分标准">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="90-100分">
                  <Tag color="success">优秀</Tag> 数据质量非常高，几乎无问题
                </Descriptions.Item>
                <Descriptions.Item label="80-89分">
                  <Tag color="green">良好</Tag> 数据质量良好，存在少量小问题
                </Descriptions.Item>
                <Descriptions.Item label="70-79分">
                  <Tag color="lime">一般</Tag> 数据质量一般，存在一些问题需要改进
                </Descriptions.Item>
                <Descriptions.Item label="60-69分">
                  <Tag color="orange">较差</Tag> 数据质量较差，存在较多问题需要解决
                </Descriptions.Item>
                <Descriptions.Item label="0-59分">
                  <Tag color="red">很差</Tag> 数据质量很差，需要全面改进
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      <Card title="质量概览" style={{ marginBottom: '24px' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Card size="small" title="完整性趋势">
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <PieChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <div style={{ marginTop: '10px' }}>
                  <Text strong>平均分: 87</Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="一致性趋势">
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <LineChartOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                <div style={{ marginTop: '10px' }}>
                  <Text strong>平均分: 78</Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="准确性趋势">
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <BarChartOutlined style={{ fontSize: '48px', color: '#faad14' }} />
                <div style={{ marginTop: '10px' }}>
                  <Text strong>平均分: 82</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      <Modal
        title="数据质量报告详情"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>关闭</Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>下载报告</Button>
        ]}
        width={1000}
      >
        {selectedReport && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="数据集名称">{selectedReport.datasetName}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedReport.status)}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedReport.createTime}</Descriptions.Item>
              <Descriptions.Item label="评估时长">{selectedReport.duration}</Descriptions.Item>
              <Descriptions.Item label="总记录数">{selectedReport.totalRecords.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="无效记录">{selectedReport.invalidRecords.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="重复记录">{selectedReport.duplicateRecords.toLocaleString()}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Title level={5}>质量评分详情</Title>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="完整性" 
                    value={selectedReport.completeness} 
                    suffix="/ 100" 
                    valueStyle={{ color: selectedReport.completeness >= 80 ? '#52c41a' : selectedReport.completeness >= 60 ? '#faad14' : '#ff4d4f' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="一致性" 
                    value={selectedReport.consistency} 
                    suffix="/ 100" 
                    valueStyle={{ color: selectedReport.consistency >= 80 ? '#52c41a' : selectedReport.consistency >= 60 ? '#faad14' : '#ff4d4f' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="准确性" 
                    value={selectedReport.accuracy} 
                    suffix="/ 100" 
                    valueStyle={{ color: selectedReport.accuracy >= 80 ? '#52c41a' : selectedReport.accuracy >= 60 ? '#faad14' : '#ff4d4f' }}
                  />
                </Card>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: '16px' }}>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="唯一性" 
                    value={selectedReport.uniqueness} 
                    suffix="/ 100" 
                    valueStyle={{ color: selectedReport.uniqueness >= 80 ? '#52c41a' : selectedReport.uniqueness >= 60 ? '#faad14' : '#ff4d4f' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="时效性" 
                    value={selectedReport.timeliness} 
                    suffix="/ 100" 
                    valueStyle={{ color: selectedReport.timeliness >= 80 ? '#52c41a' : selectedReport.timeliness >= 60 ? '#faad14' : '#ff4d4f' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="总体评分" 
                    value={selectedReport.overallScore} 
                    suffix="/ 100" 
                    valueStyle={{ color: selectedReport.overallScore >= 80 ? '#52c41a' : selectedReport.overallScore >= 60 ? '#faad14' : '#ff4d4f' }}
                  />
                </Card>
              </Col>
            </Row>
            
            <Divider />
            
            <Title level={5}>问题概览</Title>
            <Table 
              dataSource={issues} 
              columns={issueColumns} 
              rowKey="id" 
              pagination={{ pageSize: 3 }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DatasetQuality;