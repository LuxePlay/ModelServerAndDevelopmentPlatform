// 数据预处理

import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  Card,
  Typography,
  Button,
  message,
  Row,
  Col,
  List,
  Tag,
  Progress,
  Divider,
  Form,
  Input,
  Space,
  Collapse,
  Table,
  Tabs,
  Descriptions,
  Checkbox,
  Slider,
  Pagination,
  Modal,
  Switch,
  InputNumber,
} from 'antd';
import {
  FileTextOutlined,

  PlayCircleOutlined,

  EyeOutlined,
  DownloadOutlined,
  PlusOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { TextArea } = Input;

interface Dataset {
  id: string;
  name: string;
  description: string;
  totalItems: number;
  processedItems: number;
  type: string;
  tags: string[];
}

interface PreprocessTask {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  dataset: string;
  createdAt: string;
  finishedAt?: string;
}

interface PreprocessConfig {
  removeDuplicates: boolean;
  removeEmpty: boolean;
  lowercase: boolean;
  removeSpecialChars: boolean;
  maxLength: number;
  minLength: number;
  customRules: string[];
}

const DatasetPreprocessing = (): ReactElement => {
  const [activeTab, setActiveTab] = useState('datasets');
  const [datasets, _setDatasets] = useState<Dataset[]>([
    {
      id: 'ds-001',
      name: '客服对话数据集',
      description: '包含10万条客服对话记录，用于训练客服对话模型',
      totalItems: 100000,
      processedItems: 75000,
      type: '对话数据',
      tags: ['客服', '对话', '中文']
    },
    {
      id: 'ds-002',
      name: '产品评论数据集',
      description: '电商平台产品评论数据，用于情感分析任务',
      totalItems: 250000,
      processedItems: 200000,
      type: '文本数据',
      tags: ['评论', '情感分析', '电商']
    },
    {
      id: 'ds-003',
      name: '新闻文章数据集',
      description: '新闻文章集合，用于文本分类任务',
      totalItems: 50000,
      processedItems: 15000,
      type: '文档数据',
      tags: ['新闻', '分类', '长文本']
    }
  ]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [tasks, _setTasks] = useState<PreprocessTask[]>([
    {
      id: 'task-001',
      name: '客服对话去重处理',
      status: 'completed',
      progress: 100,
      dataset: 'ds-001',
      createdAt: '2024-01-15 10:30:00',
      finishedAt: '2024-01-15 11:45:00'
    },
    {
      id: 'task-002',
      name: '评论数据清洗',
      status: 'processing',
      progress: 65,
      dataset: 'ds-002',
      createdAt: '2024-01-16 09:15:00'
    },
    {
      id: 'task-003',
      name: '新闻文章标准化',
      status: 'pending',
      progress: 0,
      dataset: 'ds-003',
      createdAt: '2024-01-16 14:20:00'
    }
  ]);
  const [preprocessConfig, setPreprocessConfig] = useState<PreprocessConfig>({
    removeDuplicates: true,
    removeEmpty: true,
    lowercase: false,
    removeSpecialChars: true,
    maxLength: 512,
    minLength: 10,
    customRules: []
  });
  const [isConfigModalVisible, setIsConfigModalVisible] = useState(false);
  const [configForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleSelectDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setActiveTab('processing');
  };

  const handleStartProcessing = () => {
    if (!selectedDataset) {
      message.warning('请先选择一个数据集');
      return;
    }
    
    message.success(`开始处理数据集: ${selectedDataset.name}`);
  };

  const handleConfigSave = () => {
    configForm.validateFields().then(values => {
      setPreprocessConfig(values);
      setIsConfigModalVisible(false);
      message.success('预处理配置已更新');
    });
  };

  const showConfigModal = () => {
    configForm.setFieldsValue(preprocessConfig);
    setIsConfigModalVisible(true);
  };

  const handleExportResults = () => {
    message.success('预处理结果已导出');
  };

  const getProgressPercent = () => {
    if (!selectedDataset) return 0;
    return Math.round((selectedDataset.processedItems / selectedDataset.totalItems) * 100);
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const preprocessSteps = [
    {
      key: '1',
      title: '数据加载',
      description: '从存储中加载原始数据集'
    },
    {
      key: '2',
      title: '数据清洗',
      description: '去除重复、空值和异常数据'
    },
    {
      key: '3',
      title: '文本标准化',
      description: '统一文本格式，如大小写转换'
    },
    {
      key: '4',
      title: '分词与标记化',
      description: '将文本转换为模型可处理的标记序列'
    },
    {
      key: '5',
      title: '数据分割',
      description: '按要求分割训练集、验证集和测试集'
    },
    {
      key: '6',
      title: '格式转换',
      description: '转换为模型训练所需的格式'
    }
  ];

  return (
    <div className="dataset-preprocessing">
      <Card>
        <Title level={3}>
          <FilterOutlined /> 数据预处理
        </Title>
        <Paragraph type="secondary">
          对原始数据进行清洗、标准化和格式化，为大模型训练准备高质量数据
        </Paragraph>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="数据集列表" key="datasets">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Input placeholder="搜索数据集" prefix={<FileTextOutlined />} />
                  </Col>
                  <Col span={4}>
                    <Button type="primary" icon={<PlusOutlined />}>
                      创建预处理任务
                    </Button>
                  </Col>
                </Row>
              </div>

              <List
                dataSource={datasets}
                renderItem={dataset => (
                  <List.Item
                    actions={[
                      <Button 
                        type="primary" 
                        size="small"
                        onClick={() => handleSelectDataset(dataset)}
                      >
                        选择
                      </Button>,
                      <Button type="link" icon={<EyeOutlined />}>详情</Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <span>{dataset.name}</span>
                          <Tag>{dataset.type}</Tag>
                        </Space>
                      }
                      description={dataset.description}
                    />
                    <div>
                      <div>
                        <Text type="secondary">
                          {dataset.processedItems}/{dataset.totalItems} 已处理
                        </Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Progress 
                          percent={Math.round((dataset.processedItems / dataset.totalItems) * 100)} 
                          size="small" 
                          style={{ width: 200 }}
                        />
                      </div>
                      <div style={{ marginTop: 8 }}>
                        {dataset.tags.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          <TabPane tab="预处理任务" key="processing">
            {selectedDataset ? (
              <Card>
                <Row gutter={16}>
                  <Col span={16}>
                    <Card title="预处理配置" size="small">
                      <div style={{ marginBottom: 16 }}>
                        <Space>
                          <Text strong>数据集:</Text>
                          <Text>{selectedDataset.name}</Text>
                          <Divider type="vertical" />
                          <Text strong>总项数:</Text>
                          <Text>{selectedDataset.totalItems}</Text>
                        </Space>
                      </div>

                      <Card size="small" title="基础清洗选项">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Checkbox 
                              checked={preprocessConfig.removeDuplicates}
                              onChange={e => setPreprocessConfig({...preprocessConfig, removeDuplicates: e.target.checked})}
                            >
                              移除重复项
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox 
                              checked={preprocessConfig.removeEmpty}
                              onChange={e => setPreprocessConfig({...preprocessConfig, removeEmpty: e.target.checked})}
                            >
                              移除空值项
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox 
                              checked={preprocessConfig.lowercase}
                              onChange={e => setPreprocessConfig({...preprocessConfig, lowercase: e.target.checked})}
                            >
                              转换为小写
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox 
                              checked={preprocessConfig.removeSpecialChars}
                              onChange={e => setPreprocessConfig({...preprocessConfig, removeSpecialChars: e.target.checked})}
                            >
                              移除特殊字符
                            </Checkbox>
                          </Col>
                        </Row>
                      </Card>

                      <Card size="small" title="长度过滤" style={{ marginTop: 16 }}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <div>最小长度: {preprocessConfig.minLength} 字符</div>
                            <Slider 
                              min={0} 
                              max={100} 
                              value={preprocessConfig.minLength}
                              onChange={value => setPreprocessConfig({...preprocessConfig, minLength: value})}
                            />
                          </Col>
                          <Col span={12}>
                            <div>最大长度: {preprocessConfig.maxLength} 字符</div>
                            <Slider 
                              min={100} 
                              max={2048} 
                              value={preprocessConfig.maxLength}
                              onChange={value => setPreprocessConfig({...preprocessConfig, maxLength: value})}
                            />
                          </Col>
                        </Row>
                      </Card>

                      <Card size="small" title="自定义规则" style={{ marginTop: 16 }}>
                        <TextArea 
                          placeholder="输入自定义预处理规则（一行一个）"
                          autoSize={{ minRows: 3, maxRows: 6 }}
                          value={preprocessConfig.customRules.join('\n')}
                          onChange={e => setPreprocessConfig({...preprocessConfig, customRules: e.target.value.split('\n')})}
                        />
                      </Card>

                      <div style={{ textAlign: 'right', marginTop: 16 }}>
                        <Space>
                          <Button 
                            icon={<SettingOutlined />} 
                            onClick={showConfigModal}
                          >
                            高级配置
                          </Button>
                          <Button 
                            type="primary" 
                            icon={<PlayCircleOutlined />} 
                            onClick={handleStartProcessing}
                          >
                            开始处理
                          </Button>
                        </Space>
                      </div>
                    </Card>
                  </Col>
                  
                  <Col span={8}>
                    <Card title="任务概览" size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="数据集">{selectedDataset.name}</Descriptions.Item>
                        <Descriptions.Item label="类型">{selectedDataset.type}</Descriptions.Item>
                        <Descriptions.Item label="总计项数">{selectedDataset.totalItems}</Descriptions.Item>
                        <Descriptions.Item label="已处理">{selectedDataset.processedItems}</Descriptions.Item>
                        <Descriptions.Item label="完成率">
                          <Progress 
                            percent={getProgressPercent()} 
                            size="small" 
                          />
                        </Descriptions.Item>
                      </Descriptions>
                      
                      <Divider />
                      
                      <Title level={5}>预处理流程</Title>
                      <div>
                        <ol>
                          {preprocessSteps.map(step => (
                            <li key={step.key}>
                              <Text strong>{step.title}</Text>
                              <div><Text type="secondary">{step.description}</Text></div>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div style={{ marginTop: 16, textAlign: 'center' }}>
                        <Space>
                          <Button 
                            icon={<DownloadOutlined />} 
                            onClick={handleExportResults}
                          >
                            导出结果
                          </Button>
                        </Space>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            ) : (
              <Card>
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <InfoCircleOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  <Title level={4}>请先选择一个数据集</Title>
                  <Paragraph>
                    在"数据集列表"中选择一个数据集以开始预处理任务
                  </Paragraph>
                  <Button 
                    type="primary" 
                    onClick={() => setActiveTab('datasets')}
                  >
                    前往数据集列表
                  </Button>
                </div>
              </Card>
            )}
          </TabPane>

          <TabPane tab="处理历史" key="history">
            <Card>
              <Table
                dataSource={paginatedTasks.map((task, index) => ({
                  ...task,
                  key: task.id,
                  index: (currentPage - 1) * pageSize + index + 1
                }))}
                columns={[
                  {
                    title: '序号',
                    dataIndex: 'index',
                    key: 'index',
                    width: 80
                  },
                  {
                    title: '任务名称',
                    dataIndex: 'name',
                    key: 'name'
                  },
                  {
                    title: '数据集',
                    dataIndex: 'dataset',
                    key: 'dataset',
                    render: (datasetId: string) => {
                      const dataset = datasets.find(d => d.id === datasetId);
                      return dataset ? dataset.name : datasetId;
                    }
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) => {
                      if (status === 'completed') {
                        return <Tag color="green">已完成</Tag>;
                      } else if (status === 'processing') {
                        return <Tag color="blue">处理中</Tag>;
                      } else if (status === 'failed') {
                        return <Tag color="red">失败</Tag>;
                      }
                      return <Tag color="orange">待处理</Tag>;
                    },
                    width: 100
                  },
                  {
                    title: '进度',
                    dataIndex: 'progress',
                    key: 'progress',
                    render: (progress: number) => (
                      <Progress percent={progress} size="small" />
                    ),
                    width: 150
                  },
                  {
                    title: '创建时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    width: 180
                  },
                  {
                    title: '完成时间',
                    dataIndex: 'finishedAt',
                    key: 'finishedAt',
                    width: 180
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, _record) => (
                      <Space>
                        <Button type="link" icon={<EyeOutlined />}>查看</Button>
                        <Button type="link" icon={<DownloadOutlined />}>下载</Button>
                      </Space>
                    ),
                    width: 120
                  }
                ]}
                pagination={false}
              />
              
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={tasks.length}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                />
              </div>
            </Card>
          </TabPane>

          <TabPane tab="使用说明" key="instructions">
            <Card>
              <Title level={4}>数据预处理使用说明</Title>
              
              <Collapse defaultActiveKey={['1']}>
                <Panel header="什么是数据预处理?" key="1">
                  <Paragraph>
                    数据预处理是将原始数据转换为适合大模型训练格式的过程。原始数据通常包含噪声、不一致性或其他问题，
                    需要经过清洗、标准化和格式化才能用于训练高质量的模型。
                  </Paragraph>
                </Panel>
                
                <Panel header="预处理功能介绍" key="2">
                  <Paragraph>
                    平台提供多种预处理功能：
                  </Paragraph>
                  <ul>
                    <li>
                      <Text strong>数据清洗：</Text>
                      移除重复项、空值、异常值等无效数据
                    </li>
                    <li>
                      <Text strong>文本标准化：</Text>
                      统一文本格式，如大小写转换、特殊字符处理等
                    </li>
                    <li>
                      <Text strong>长度过滤：</Text>
                      根据指定长度范围过滤文本，去除过短或过长的内容
                    </li>
                    <li>
                      <Text strong>分词与标记化：</Text>
                      将文本转换为模型可理解的标记序列
                    </li>
                    <li>
                      <Text strong>数据分割：</Text>
                      按比例分割训练集、验证集和测试集
                    </li>
                    <li>
                      <Text strong>格式转换：</Text>
                      转换为模型训练所需的特定格式
                    </li>
                  </ul>
                </Panel>
                
                <Panel header="预处理操作指南" key="3">
                  <ol>
                    <li>在"数据集列表"中选择一个数据集</li>
                    <li>配置预处理选项，如清洗规则、长度限制等</li>
                    <li>点击"开始处理"执行预处理任务</li>
                    <li>可在"处理历史"中查看任务状态和结果</li>
                    <li>处理完成后可导出结果用于模型训练</li>
                  </ol>
                </Panel>
                
                <Panel header="预处理最佳实践" key="4">
                  <Paragraph>
                    为获得最佳预处理效果，请遵循以下建议：
                  </Paragraph>
                  <ul>
                    <li>根据具体任务需求选择合适的预处理选项</li>
                    <li>保留原始数据备份，避免不可逆的数据丢失</li>
                    <li>处理完成后检查数据质量，确保符合预期</li>
                    <li>对于不同类型的文本数据，采用不同的预处理策略</li>
                    <li>建立标准化的预处理流程，确保一致性</li>
                  </ul>
                </Panel>
              </Collapse>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
      
      <Modal
        title="高级预处理配置"
        visible={isConfigModalVisible}
        onOk={handleConfigSave}
        onCancel={() => setIsConfigModalVisible(false)}
        width={600}
      >
        <Form form={configForm} layout="vertical">
          <Form.Item name="removeDuplicates" label="移除重复项" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item name="removeEmpty" label="移除空值项" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item name="lowercase" label="转换为小写" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item name="removeSpecialChars" label="移除特殊字符" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item name="minLength" label="最小长度">
            <InputNumber min={0} max={1000} />
          </Form.Item>
          
          <Form.Item name="maxLength" label="最大长度">
            <InputNumber min={10} max={4096} />
          </Form.Item>
          
          <Form.Item name="customRules" label="自定义规则">
            <TextArea 
              placeholder="输入自定义预处理规则（一行一个）"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DatasetPreprocessing;