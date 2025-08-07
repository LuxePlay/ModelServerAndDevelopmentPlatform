// 数据集管理 主页面

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import {
  Card,
  Typography,
  List,
  Tag,
  Button,
  Input,
  Select,
  Pagination,
  Row,
  Col,
  Divider,
  Modal,
  Form,
  message,
  Tabs,
  Upload,
  Tooltip,
  Statistic,
  Progress,
  Collapse,
  Dropdown,
  Menu
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  DatabaseOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  MoreOutlined,
  ShareAltOutlined,
  ForkOutlined,
  CopyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface Dataset {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'processing' | 'error' | 'inactive';
  createdAt: string;
  updatedAt: string;
  fileCount: number;
  size: string;
  type: string;
  tags: string[];
  version: string;
  creator: string;
}

const DataManager = (): ReactElement => {
  const [activeTab, setActiveTab] = useState('datasets');
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [form] = Form.useForm();
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  // 初始化数据
  useEffect(() => {
    // 模拟数据集数据
    const mockDatasets: Dataset[] = [
      {
        id: 'ds-001',
        name: '客服对话数据集',
        description: '包含10万条客服对话记录，用于训练客服对话模型',
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-03-20',
        fileCount: 128,
        size: '2.4 GB',
        type: '对话数据',
        tags: ['客服', '对话', '中文'],
        version: 'v1.2',
        creator: '张三'
      },
      {
        id: 'ds-002',
        name: '技术文档数据集',
        description: '技术文档集合，包括API文档、用户手册等',
        status: 'processing',
        createdAt: '2024-02-10',
        updatedAt: '2024-03-15',
        fileCount: 85,
        size: '1.8 GB',
        type: '文档数据',
        tags: ['技术', '文档', '英文'],
        version: 'v2.1',
        creator: '李四'
      },
      {
        id: 'ds-003',
        name: '法律条款数据集',
        description: '法律法规和合同条款数据',
        status: 'active',
        createdAt: '2024-01-25',
        updatedAt: '2024-02-28',
        fileCount: 56,
        size: '850 MB',
        type: '法律数据',
        tags: ['法律', '合规', '条款'],
        version: 'v1.0',
        creator: '王五'
      },
      {
        id: 'ds-004',
        name: '医疗问答数据集',
        description: '医疗领域常见问题和专业解答',
        status: 'inactive',
        createdAt: '2023-12-05',
        updatedAt: '2024-01-15',
        fileCount: 210,
        size: '3.2 GB',
        type: '问答数据',
        tags: ['医疗', '问答', '中文'],
        version: 'v3.0',
        creator: '赵六'
      }
    ];

    setDatasets(mockDatasets);
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleDatasetStatus = (dsId: string) => {
    setDatasets(datasets.map(ds => {
      if (ds.id === dsId) {
        return {
          ...ds,
          status: ds.status === 'active' ? 'inactive' : 'active'
        };
      }
      return ds;
    }));
    message.success('数据集状态已更新');
  };

  const handleDeleteDataset = (dsId: string) => {
    setDatasets(datasets.filter(ds => ds.id !== dsId));
    message.success('数据集已删除');
  };

  const showModal = (ds: Dataset) => {
    setSelectedDataset(ds);
    form.setFieldsValue(ds);
    setIsModalVisible(true);
  };

  const showCreateModal = () => {
    setSelectedDataset(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (selectedDataset) {
        // 更新数据集信息
        setDatasets(datasets.map(ds => 
          ds.id === selectedDataset.id ? { ...ds, ...values, updatedAt: new Date().toISOString().split('T')[0] } : ds
        ));
        message.success('数据集信息已更新');
      } else {
        // 创建新数据集
        const newDataset: Dataset = {
          id: `ds-${Date.now()}`,
          ...values,
          status: 'processing',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          fileCount: 0,
          size: '0 MB'
        };
        setDatasets([...datasets, newDataset]);
        message.success('数据集创建成功');
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDataset(null);
  };

  const showUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag icon={<CheckCircleOutlined />} color="success">已启用</Tag>;
      case 'processing':
        return <Tag icon={<SyncOutlined spin />} color="processing">处理中</Tag>;
      case 'error':
        return <Tag icon={<CloseCircleOutlined />} color="error">错误</Tag>;
      case 'inactive':
        return <Tag icon={<CloseCircleOutlined />} color="default">已停用</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // 根据搜索条件筛选数据集
  const filterDatasets = () => {
    return datasets.filter(ds => {
      return ds.name.toLowerCase().includes(searchText.toLowerCase()) || 
             ds.description.toLowerCase().includes(searchText.toLowerCase()) ||
             ds.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    });
  };

  const filteredDatasets = filterDatasets();

  const handleDatasetAction = (action: string, datasetId: string) => {
    switch (action) {
      case 'edit':
        const dataset = datasets.find(ds => ds.id === datasetId);
        if (dataset) showModal(dataset);
        break;
      case 'delete':
        handleDeleteDataset(datasetId);
        break;
      case 'toggle':
        toggleDatasetStatus(datasetId);
        break;
      case 'share':
        message.info('分享功能开发中');
        break;
      case 'fork':
        message.info('派生功能开发中');
        break;
      case 'copy':
        message.info('复制功能开发中');
        break;
      default:
        break;
    }
  };

  const actionMenu = (datasetId: string) => (
    <Menu onClick={({ key }) => handleDatasetAction(key as string, datasetId)}>
      <Menu.Item key="edit" icon={<EditOutlined />}>编辑</Menu.Item>
      <Menu.Item key="share" icon={<ShareAltOutlined />}>分享</Menu.Item>
      <Menu.Item key="fork" icon={<ForkOutlined />}>派生</Menu.Item>
      <Menu.Item key="copy" icon={<CopyOutlined />}>复制</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>删除</Menu.Item>
    </Menu>
  );

  return (
    <div className="data-manager">
      <Card>
        <Title level={3}>
          <DatabaseOutlined /> 数据集管理
        </Title>
        <Paragraph type="secondary">
          管理用于大模型训练和微调的数据集，支持创建、上传、处理和版本控制。
        </Paragraph>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="数据集列表" key="datasets">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Search
                      placeholder="搜索数据集"
                      allowClear
                      onSearch={handleSearch}
                      enterButton={<SearchOutlined />}
                    />
                  </Col>
                  <Col span={4}>
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />} 
                      onClick={showCreateModal}
                    >
                      创建数据集
                    </Button>
                  </Col>
                  <Col span={4}>
                    <Button 
                      icon={<UploadOutlined />} 
                      onClick={showUploadModal}
                    >
                      上传数据
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={filteredDatasets}
                renderItem={ds => (
                  <List.Item>
                    <Card 
                      title={ds.name}
                      size="small"
                      extra={getStatusTag(ds.status)}
                      actions={[
                        <Tooltip title="启用/停用">
                          <Button 
                            type="text" 
                            icon={<SyncOutlined />}
                            onClick={() => handleDatasetAction('toggle', ds.id)}
                          />
                        </Tooltip>,
                        <Tooltip title="查看详情">
                          <Button 
                            type="text" 
                            icon={<EyeOutlined />}
                          />
                        </Tooltip>,
                        <Dropdown overlay={actionMenu(ds.id)} trigger={['click']}>
                          <Button 
                            type="text" 
                            icon={<MoreOutlined />}
                          />
                        </Dropdown>
                      ]}
                    >
                      <Paragraph ellipsis={{ rows: 2 }} style={{ minHeight: 44 }}>
                        {ds.description}
                      </Paragraph>
                      
                      <div style={{ margin: '12px 0' }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Statistic title="文件数" value={ds.fileCount} />
                          </Col>
                          <Col span={8}>
                            <Statistic title="大小" value={ds.size} />
                          </Col>
                          <Col span={8}>
                            <Statistic title="类型" value={ds.type} />
                          </Col>
                        </Row>
                      </div>
                      
                      <div>
                        {ds.tags.map(tag => (
                          <Tag key={tag} color="blue">{tag}</Tag>
                        ))}
                      </div>
                      
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          版本: {ds.version} | 创建者: {ds.creator}
                        </Text>
                      </div>
                      
                      <div style={{ marginTop: 4 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          创建时间: {ds.createdAt} | 更新时间: {ds.updatedAt}
                        </Text>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
              
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Pagination
                  current={currentPage}
                  total={filteredDatasets.length}
                  pageSize={4}
                  onChange={handlePageChange}
                />
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab="数据统计" key="statistics">
            <Card>
              <Title level={4}>数据集统计</Title>
              <Row gutter={16}>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总数据集数"
                      value={datasets.length}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="活跃数据集"
                      value={datasets.filter(ds => ds.status === 'active').length}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总文件数"
                      value={datasets.reduce((sum, ds) => sum + ds.fileCount, 0)}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总大小"
                      value={datasets.reduce((sum, ds) => {
                        const sizeNum = parseFloat(ds.size);
                        return sum + sizeNum;
                      }, 0).toFixed(2)}
                      suffix="GB"
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
              </Row>
              
              <Divider />
              
              <Title level={4}>类型分布</Title>
              <List
                dataSource={Array.from(new Set(datasets.map(ds => ds.type))).map(type => ({
                  type,
                  count: datasets.filter(ds => ds.type === type).length
                }))}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.type}
                      description={
                        <Progress 
                          percent={Math.round((item.count / datasets.length) * 100)} 
                          size="small" 
                        />
                      }
                    />
                    <div>{item.count} 个数据集</div>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
          
          <TabPane tab="使用说明" key="instructions">
            <Card>
              <Title level={4}>数据集管理使用说明</Title>
              
              <Collapse defaultActiveKey={['1']}>
                <Panel header="什么是数据集?" key="1">
                  <Paragraph>
                    数据集是用于训练、微调和评估大语言模型的结构化数据集合。
                    它可以包含文本、图像、音频等多种类型的数据，通常以特定格式组织，
                    以便模型能够有效地学习和处理。
                  </Paragraph>
                </Panel>
                
                <Panel header="如何创建数据集?" key="2">
                  <ol>
                    <li>点击"创建数据集"按钮</li>
                    <li>填写数据集名称和描述</li>
                    <li>选择数据集类型</li>
                    <li>添加标签便于分类管理</li>
                    <li>设置版本信息</li>
                    <li>确认创建</li>
                  </ol>
                </Panel>
                
                <Panel header="如何上传数据?" key="3">
                  <Paragraph>
                    在数据集列表中，可以点击"上传数据"按钮上传新数据文件。
                    支持的文件格式包括：TXT、CSV、JSON、JSONL等。
                  </Paragraph>
                  <Paragraph>
                    上传的文件会自动进行以下处理：
                  </Paragraph>
                  <ul>
                    <li>文件格式验证</li>
                    <li>数据清洗和预处理</li>
                    <li>格式转换（如需要）</li>
                    <li>存储到数据存储系统</li>
                  </ul>
                </Panel>
                
                <Panel header="最佳实践" key="4">
                  <ul>
                    <li>按业务领域创建不同的数据集</li>
                    <li>定期更新数据集内容</li>
                    <li>为数据集添加合适的标签</li>
                    <li>使用版本控制管理数据集变更</li>
                    <li>监控数据集质量和使用情况</li>
                  </ul>
                </Panel>
              </Collapse>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
      
      <Modal
        title={selectedDataset ? "编辑数据集" : "创建数据集"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="数据集名称" rules={[{ required: true, message: '请输入数据集名称' }]}>
            <Input placeholder="请输入数据集名称" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入数据集描述" rows={3} />
          </Form.Item>
          <Form.Item name="type" label="数据集类型" rules={[{ required: true, message: '请选择数据集类型' }]}>
            <Select placeholder="请选择数据集类型">
              <Option value="对话数据">对话数据</Option>
              <Option value="文档数据">文档数据</Option>
              <Option value="问答数据">问答数据</Option>
              <Option value="代码数据">代码数据</Option>
              <Option value="法律数据">法律数据</Option>
              <Option value="医疗数据">医疗数据</Option>
            </Select>
          </Form.Item>
          <Form.Item name="version" label="版本" rules={[{ required: true, message: '请输入版本号' }]}>
            <Input placeholder="例如: v1.0" />
          </Form.Item>
          <Form.Item name="tags" label="标签">
            <Select mode="tags" placeholder="添加标签">
              {datasets.flatMap(ds => ds.tags)
                .filter((tag, index, self) => self.indexOf(tag) === index)
                .map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      
      <Modal
        title="上传数据"
        visible={isUploadModalVisible}
        onCancel={handleUploadCancel}
        footer={null}
        width={600}
      >
        <Upload.Dragger 
          name="file"
          multiple
          beforeUpload={() => false} // 阻止自动上传
        >
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">
            支持TXT、CSV、JSON、JSONL等格式，单个文件不超过1GB
          </p>
        </Upload.Dragger>
        
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button onClick={handleUploadCancel} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button type="primary" onClick={handleUploadCancel}>
            开始上传
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DataManager;