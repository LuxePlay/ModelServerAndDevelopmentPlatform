//数据共享

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
  Form,
  Collapse,
  message,
  Modal,
  Descriptions,
  Tabs,
  Tree,
  Checkbox
} from 'antd';
import {
  ReloadOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
  LockOutlined,
  GlobalOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface SharedDataset {
  id: string;
  name: string;
  owner: string;
  size: string;
  type: string;
  status: 'active' | 'inactive';
  shareType: 'public' | 'private' | 'team';
  sharedWith: string[];
  createTime: string;
  updateTime: string;
  description: string;
}

interface ShareRequest {
  id: string;
  datasetName: string;
  requester: string;
  status: 'pending' | 'approved' | 'rejected';
  requestTime: string;
  reason: string;
}

interface Team {
  id: string;
  name: string;
  members: number;
  datasets: number;
}

const DatasetSharing = (): ReactElement => {
  const [sharedDatasets] = useState<SharedDataset[]>([
    {
      id: 'share-001',
      name: '电商用户行为数据集',
      owner: '张三',
      size: '2.5GB',
      type: 'CSV',
      status: 'active',
      shareType: 'public',
      sharedWith: ['李四', '王五', '赵六'],
      createTime: '2024-01-15 10:30',
      updateTime: '2024-01-20 14:20',
      description: '包含用户浏览、购买等行为数据'
    },
    {
      id: 'share-002',
      name: '社交媒体文本数据集',
      owner: '李四',
      size: '1.8GB',
      type: 'JSON',
      status: 'active',
      shareType: 'team',
      sharedWith: ['数据科学团队'],
      createTime: '2024-01-16 14:20',
      updateTime: '2024-01-19 09:15',
      description: '社交媒体平台的用户评论数据'
    },
    {
      id: 'share-003',
      name: '金融交易数据集',
      owner: '王五',
      size: '3.2GB',
      type: 'Database',
      status: 'inactive',
      shareType: 'private',
      sharedWith: ['赵六'],
      createTime: '2024-01-17 09:15',
      updateTime: '2024-01-18 16:30',
      description: '银行交易记录数据'
    }
  ]);

  const [shareRequests] = useState<ShareRequest[]>([
    {
      id: 'req-001',
      datasetName: '图像识别数据集',
      requester: '陈七',
      status: 'pending',
      requestTime: '2024-01-20 11:30',
      reason: '用于图像识别模型训练'
    },
    {
      id: 'req-002',
      datasetName: '自然语言处理数据集',
      requester: '周八',
      status: 'approved',
      requestTime: '2024-01-19 15:45',
      reason: '用于NLP模型优化'
    }
  ]);

  const [teams] = useState<Team[]>([
    {
      id: 'team-001',
      name: '数据科学团队',
      members: 12,
      datasets: 25
    },
    {
      id: 'team-002',
      name: '算法团队',
      members: 8,
      datasets: 18
    },
    {
      id: 'team-003',
      name: '研究团队',
      members: 6,
      datasets: 15
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<SharedDataset | null>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();

  const getShareTypeTag = (type: SharedDataset['shareType']) => {
    switch (type) {
      case 'public':
        return <Tag icon={<GlobalOutlined />} color="green">公开</Tag>;
      case 'private':
        return <Tag icon={<LockOutlined />} color="red">私有</Tag>;
      case 'team':
        return <Tag icon={<TeamOutlined />} color="blue">团队</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const getStatusTag = (status: SharedDataset['status']) => {
    switch (status) {
      case 'active':
        return <Tag icon={<CheckCircleOutlined />} color="success">启用</Tag>;
      case 'inactive':
        return <Tag icon={<CloseCircleOutlined />} color="default">停用</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const getRequestStatusTag = (status: ShareRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Tag icon={<ExclamationCircleOutlined />} color="warning">待处理</Tag>;
      case 'approved':
        return <Tag icon={<CheckCircleOutlined />} color="success">已批准</Tag>;
      case 'rejected':
        return <Tag icon={<CloseCircleOutlined />} color="error">已拒绝</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const handleViewDetails = (dataset: SharedDataset) => {
    setSelectedDataset(dataset);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDataset(null);
  };

  const handleCreateShare = () => {
    message.success('创建数据共享');
  };

  const handleApproveRequest = (id: string) => {
    message.success(`已批准共享请求 ${id}`);
  };

  const handleRejectRequest = (id: string) => {
    message.info(`已拒绝共享请求 ${id}`);
  };


  const datasetColumns = [
    {
      title: '数据集名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: '共享类型',
      dataIndex: 'shareType',
      key: 'shareType',
      render: (shareType: SharedDataset['shareType']) => getShareTypeTag(shareType)
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: SharedDataset['status']) => getStatusTag(status)
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: SharedDataset) => (
        <Space size="middle">
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            查看详情
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" size="small" icon={<DownloadOutlined />}>下载</Button>
        </Space>
      )
    }
  ];

  const requestColumns = [
    {
      title: '数据集名称',
      dataIndex: 'datasetName',
      key: 'datasetName'
    },
    {
      title: '申请人',
      dataIndex: 'requester',
      key: 'requester'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: ShareRequest['status']) => getRequestStatusTag(status)
    },
    {
      title: '申请时间',
      dataIndex: 'requestTime',
      key: 'requestTime'
    },
    {
      title: '申请理由',
      dataIndex: 'reason',
      key: 'reason'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ShareRequest) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button 
                type="link" 
                size="small" 
                onClick={() => handleApproveRequest(record.id)}
              >
                批准
              </Button>
              <Button 
                type="link" 
                size="small" 
                danger
                onClick={() => handleRejectRequest(record.id)}
              >
                拒绝
              </Button>
            </>
          )}
          {record.status !== 'pending' && <Text type="secondary">-</Text>}
        </Space>
      )
    }
  ];

  const teamColumns = [
    {
      title: '团队名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '成员数',
      dataIndex: 'members',
      key: 'members'
    },
    {
      title: '共享数据集数',
      dataIndex: 'datasets',
      key: 'datasets'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, _record: Team) => (
        <Space size="middle">
          <Button type="link" size="small">查看详情</Button>
          <Button type="link" size="small">管理成员</Button>
        </Space>
      )
    }
  ];

  const treeData = [
    {
      title: '数据科学团队',
      key: '0-0',
      children: [
        {
          title: '张三',
          key: '0-0-0',
        },
        {
          title: '李四',
          key: '0-0-1',
        },
      ],
    },
    {
      title: '算法团队',
      key: '0-1',
      children: [
        {
          title: '王五',
          key: '0-1-0',
        },
        {
          title: '赵六',
          key: '0-1-1',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={3}>数据共享</Title>
        <Text type="secondary">管理数据集的共享权限，支持公开共享、私有共享和团队共享</Text>
      </div>

      <Row gutter={24} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="共享数据集" 
              value={sharedDatasets.length} 
              prefix={<FileTextOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="公开共享" 
              value={sharedDatasets.filter(d => d.shareType === 'public').length} 
              prefix={<GlobalOutlined />} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="待处理请求" 
              value={shareRequests.filter(r => r.status === 'pending').length} 
              prefix={<ExclamationCircleOutlined />} 
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="团队数量" 
              value={teams.length} 
              prefix={<TeamOutlined />} 
            />
          </Card>
        </Col>
      </Row>

      <Card 
        style={{ marginBottom: '24px' }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="共享数据集" key="1">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateShare}>创建共享</Button>
                <Button icon={<ReloadOutlined />}>刷新</Button>
              </Space>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Search placeholder="搜索数据集名称" style={{ width: 200 }} />
                <Select placeholder="共享类型" style={{ width: 120 }} allowClear>
                  <Option value="public">公开</Option>
                  <Option value="private">私有</Option>
                  <Option value="team">团队</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }} allowClear>
                  <Option value="active">启用</Option>
                  <Option value="inactive">停用</Option>
                </Select>
              </Space>
            </div>
            
            <Table 
              dataSource={sharedDatasets} 
              columns={datasetColumns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane tab="共享请求" key="2">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Select placeholder="状态筛选" style={{ width: 120 }} allowClear>
                  <Option value="pending">待处理</Option>
                  <Option value="approved">已批准</Option>
                  <Option value="rejected">已拒绝</Option>
                </Select>
                <Button icon={<ReloadOutlined />}>刷新</Button>
              </Space>
            </div>
            
            <Table 
              dataSource={shareRequests} 
              columns={requestColumns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane tab="团队管理" key="3">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>创建团队</Button>
                <Button icon={<ReloadOutlined />}>刷新</Button>
              </Space>
            </div>
            
            <Table 
              dataSource={teams} 
              columns={teamColumns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane tab="共享策略" key="4">
            <Card title="共享策略设置" style={{ marginBottom: '24px' }}>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  autoApprove: false,
                  requireReason: true,
                  maxRequests: 10
                }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name="autoApprove" valuePropName="checked">
                      <Checkbox>自动批准团队成员的共享请求</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="requireReason" valuePropName="checked">
                      <Checkbox>要求申请人填写申请理由</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item 
                      name="maxRequests" 
                      label="每个用户最大请求数"
                    >
                      <Select>
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={20}>20</Option>
                        <Option value={50}>50</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item>
                  <Space>
                    <Button type="primary" onClick={() => form.submit()}>保存设置</Button>
                    <Button>重置</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
            
            <Card title="权限管理">
              <Tree
                className="draggable-tree"
                defaultExpandedKeys={['0-0', '0-1']}
                draggable
                blockNode
                treeData={treeData}
              />
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      <Card title="使用说明" style={{ marginBottom: '24px' }}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="数据共享功能说明" key="1">
            <Typography>
              <Title level={5}>数据共享功能说明：</Title>
              <ul>
                <li>支持三种共享类型：公开共享（所有用户可访问）、私有共享（指定用户可访问）、团队共享（指定团队成员可访问）</li>
                <li>可管理共享请求，审批其他用户的访问申请</li>
                <li>支持团队管理，可创建和管理数据访问团队</li>
                <li>可设置共享策略，如自动审批、申请理由要求等</li>
                <li>提供权限管理功能，可拖拽调整团队成员</li>
              </ul>
              
              <Title level={5}>操作流程：</Title>
              <ol>
                <li>在"共享数据集"标签页中创建新的数据共享</li>
                <li>设置共享类型和访问权限</li>
                <li>在"共享请求"标签页中审批其他用户的访问申请</li>
                <li>在"团队管理"标签页中管理团队和成员</li>
                <li>在"共享策略"标签页中设置共享规则</li>
              </ol>
            </Typography>
          </Panel>
        </Collapse>
      </Card>

      <Modal
        title="共享数据集详情"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>关闭</Button>,
          <Button key="edit" type="primary" icon={<EditOutlined />}>编辑共享</Button>
        ]}
        width={800}
      >
        {selectedDataset && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="数据集名称">{selectedDataset.name}</Descriptions.Item>
              <Descriptions.Item label="所有者">{selectedDataset.owner}</Descriptions.Item>
              <Descriptions.Item label="共享类型">{getShareTypeTag(selectedDataset.shareType)}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedDataset.status)}</Descriptions.Item>
              <Descriptions.Item label="大小">{selectedDataset.size}</Descriptions.Item>
              <Descriptions.Item label="类型">{selectedDataset.type}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedDataset.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{selectedDataset.updateTime}</Descriptions.Item>
              <Descriptions.Item label="共享对象" span={2}>
                <Space>
                  {selectedDataset.sharedWith.map((item, index) => (
                    <Tag key={index} icon={<UserOutlined />}>{item}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>{selectedDataset.description}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Title level={5}>访问统计</Title>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="总访问次数" 
                    value={1256} 
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="本周访问" 
                    value={89} 
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="下载次数" 
                    value={243} 
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DatasetSharing;