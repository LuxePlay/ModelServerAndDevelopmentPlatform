// 数据标注

import{ useState, useEffect } from 'react';
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
  Select,
  Space,
  Collapse,
  Table,
  Tabs,
  Descriptions,
  Pagination,
  Modal,
  Switch
} from 'antd';
import {
  EditOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  EyeOutlined,
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface Dataset {
  id: string;
  name: string;
  description: string;
  totalItems: number;
  labeledItems: number;
  type: string;
  tags: string[];
}

interface LabelItem {
  id: string;
  content: string;
  labels: string[];
  status: 'unlabeled' | 'labeled' | 'skipped';
  annotator?: string;
  labeledAt?: string;
}

interface LabelConfig {
  type: 'classification' | 'ner' | 'sentiment' | 'custom';
  labels: string[];
  allowMultiple: boolean;
}

const DatasetLabeling = (): ReactElement => {
  const [activeTab, setActiveTab] = useState('datasets');
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [labelItems, setLabelItems] = useState<LabelItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [labelConfig, setLabelConfig] = useState<LabelConfig>({
    type: 'classification',
    labels: ['正面', '负面', '中性'],
    allowMultiple: false
  });
  const [isLabeling, setIsLabeling] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [isConfigModalVisible, setIsConfigModalVisible] = useState(false);
  const [configForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 初始化数据
  useEffect(() => {
    // 模拟数据集数据
    const mockDatasets: Dataset[] = [
      {
        id: 'ds-001',
        name: '客服对话情感分析',
        description: '对客服对话进行情感分析标注',
        totalItems: 1250,
        labeledItems: 320,
        type: '对话数据',
        tags: ['客服', '情感分析', '中文']
      },
      {
        id: 'ds-002',
        name: '产品评论分类',
        description: '对产品评论进行主题分类标注',
        totalItems: 2450,
        labeledItems: 1800,
        type: '文本数据',
        tags: ['评论', '分类', '电商']
      },
      {
        id: 'ds-003',
        name: '法律文档实体识别',
        description: '识别法律文档中的关键实体',
        totalItems: 860,
        labeledItems: 210,
        type: '文档数据',
        tags: ['法律', 'NER', '实体识别']
      }
    ];

    setDatasets(mockDatasets);
  }, []);

  // 模拟标注项数据
  const loadLabelItems = (_datasetId: string) => {
    const mockItems: LabelItem[] = Array.from({ length: 50 }, (_, i) => ({
      id: `item-${i + 1}`,
      content: `这是第${i + 1}条需要标注的数据内容。内容可能包含文本、对话或其他形式的数据，需要根据标注任务的要求进行相应的标注操作。`,
      labels: [],
      status: i < 10 ? 'labeled' : 'unlabeled'
    }));

    setLabelItems(mockItems);
    setCurrentItemIndex(0);
    setSelectedLabels([]);
  };

  const handleSelectDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    loadLabelItems(dataset.id);
    setActiveTab('labeling');
  };

  const handleStartLabeling = () => {
    if (!selectedDataset) {
      message.warning('请先选择一个数据集');
      return;
    }
    
    setIsLabeling(true);
    message.success('开始标注任务');
  };

  const handleLabelSelect = (label: string) => {
    if (labelConfig.allowMultiple) {
      // 多选模式
      setSelectedLabels(prev => 
        prev.includes(label) 
          ? prev.filter(l => l !== label) 
          : [...prev, label]
      );
    } else {
      // 单选模式
      setSelectedLabels([label]);
    }
  };

  const handleSaveLabel = () => {
    if (selectedLabels.length === 0) {
      message.warning('请至少选择一个标签');
      return;
    }

    setLabelItems(prev => prev.map((item, index) => 
      index === currentItemIndex 
        ? { ...item, labels: selectedLabels, status: 'labeled' } 
        : item
    ));

    message.success('标签已保存');
    
    // 自动跳转到下一项
    handleNextItem();
  };

  const handleSkipItem = () => {
    setLabelItems(prev => prev.map((item, index) => 
      index === currentItemIndex 
        ? { ...item, status: 'skipped' } 
        : item
    ));
    
    message.info('已跳过当前项');
    handleNextItem();
  };

  const handleNextItem = () => {
    if (currentItemIndex < labelItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setSelectedLabels([]);
    } else {
      message.info('已到达最后一项');
    }
  };

  const handlePrevItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
      // 恢复该项的标签
      const item = labelItems[currentItemIndex - 1];
      setSelectedLabels(item.labels || []);
    } else {
      message.info('已到达第一项');
    }
  };

  const handleConfigSave = () => {
    configForm.validateFields().then(values => {
      setLabelConfig({
        type: values.type,
        labels: values.labels.filter((l: string) => l.trim() !== ''),
        allowMultiple: values.allowMultiple
      });
      setIsConfigModalVisible(false);
      message.success('标注配置已更新');
    });
  };

  const showConfigModal = () => {
    configForm.setFieldsValue(labelConfig);
    setIsConfigModalVisible(true);
  };

  const handleExportLabels = () => {
    message.success('标注结果已导出');
  };

  const getProgressPercent = () => {
    if (!selectedDataset) return 0;
    return Math.round((selectedDataset.labeledItems / selectedDataset.totalItems) * 100);
  };

  const getCurrentItem = () => {
    return labelItems[currentItemIndex] || null;
  };

  const paginatedItems = labelItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="dataset-labeling">
      <Card>
        <Title level={3}>
          <EditOutlined /> 数据标注
        </Title>
        <Paragraph type="secondary">
          对数据集进行标注，为大模型训练准备高质量的监督数据
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
                      创建标注任务
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
                          {dataset.labeledItems}/{dataset.totalItems} 已标注
                        </Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Progress 
                          percent={Math.round((dataset.labeledItems / dataset.totalItems) * 100)} 
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

          <TabPane tab="标注任务" key="labeling">
            {selectedDataset ? (
              <Card>
                <Row gutter={16}>
                  <Col span={16}>
                    <Card title="标注界面" size="small">
                      {isLabeling ? (
                        <div>
                          <div style={{ marginBottom: 16 }}>
                            <Space>
                              <Text strong>数据集:</Text>
                              <Text>{selectedDataset.name}</Text>
                              <Divider type="vertical" />
                              <Text strong>进度:</Text>
                              <Text>{currentItemIndex + 1}/{labelItems.length}</Text>
                            </Space>
                          </div>

                          {getCurrentItem() && (
                            <div>
                              <Card size="small" title="待标注内容">
                                <Paragraph style={{ minHeight: 100 }}>
                                  {getCurrentItem().content}
                                </Paragraph>
                              </Card>

                              <Divider>标签选择</Divider>

                              <div style={{ marginBottom: 16 }}>
                                <Space wrap>
                                  {labelConfig.labels.map(label => (
                                    <Button
                                      key={label}
                                      type={selectedLabels.includes(label) ? "primary" : "default"}
                                      onClick={() => handleLabelSelect(label)}
                                    >
                                      {label}
                                    </Button>
                                  ))}
                                  <Button 
                                    type="dashed" 
                                    icon={<PlusOutlined />}
                                    onClick={showConfigModal}
                                  >
                                    添加标签
                                  </Button>
                                </Space>
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                <Space>
                                  <Button onClick={handlePrevItem} disabled={currentItemIndex === 0}>
                                    上一项
                                  </Button>
                                  <Button onClick={handleSkipItem}>
                                    跳过
                                  </Button>
                                  <Button 
                                    type="primary" 
                                    icon={<SaveOutlined />} 
                                    onClick={handleSaveLabel}
                                  >
                                    保存并继续
                                  </Button>
                                  <Button 
                                    type="primary" 
                                    onClick={() => {
                                      setIsLabeling(false);
                                      message.success('标注任务已暂停');
                                    }}
                                  >
                                    暂停
                                  </Button>
                                </Space>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                          <PlayCircleOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                          <Title level={4}>准备开始标注任务</Title>
                          <Paragraph>
                            数据集: {selectedDataset.name}
                          </Paragraph>
                          <Paragraph>
                            总计: {selectedDataset.totalItems} 项 | 已标注: {selectedDataset.labeledItems} 项
                          </Paragraph>
                          <Button 
                            type="primary" 
                            size="large" 
                            icon={<PlayCircleOutlined />}
                            onClick={handleStartLabeling}
                          >
                            开始标注
                          </Button>
                        </div>
                      )}
                    </Card>
                  </Col>
                  
                  <Col span={8}>
                    <Card title="任务概览" size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="数据集">{selectedDataset.name}</Descriptions.Item>
                        <Descriptions.Item label="类型">{selectedDataset.type}</Descriptions.Item>
                        <Descriptions.Item label="总计项数">{selectedDataset.totalItems}</Descriptions.Item>
                        <Descriptions.Item label="已标注">{selectedDataset.labeledItems}</Descriptions.Item>
                        <Descriptions.Item label="完成率">
                          <Progress 
                            percent={getProgressPercent()} 
                            size="small" 
                          />
                        </Descriptions.Item>
                      </Descriptions>
                      
                      <Divider />
                      
                      <Title level={5}>标注配置</Title>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="标注类型">
                          {labelConfig.type === 'classification' && '文本分类'}
                          {labelConfig.type === 'ner' && '命名实体识别'}
                          {labelConfig.type === 'sentiment' && '情感分析'}
                          {labelConfig.type === 'custom' && '自定义'}
                        </Descriptions.Item>
                        <Descriptions.Item label="允许多选">
                          {labelConfig.allowMultiple ? '是' : '否'}
                        </Descriptions.Item>
                        <Descriptions.Item label="标签">
                          <div>
                            {labelConfig.labels.map((label, index) => (
                              <Tag key={index}>{label}</Tag>
                            ))}
                          </div>
                        </Descriptions.Item>
                      </Descriptions>
                      
                      <div style={{ marginTop: 16, textAlign: 'center' }}>
                        <Space>
                          <Button 
                            icon={<SettingOutlined />} 
                            onClick={showConfigModal}
                          >
                            配置
                          </Button>
                          <Button 
                            icon={<DownloadOutlined />} 
                            onClick={handleExportLabels}
                          >
                            导出结果
                          </Button>
                        </Space>
                      </div>
                    </Card>
                    
                    <Card title="标注统计" size="small" style={{ marginTop: 16 }}>
                      <div style={{ textAlign: 'center' }}>
                        <Text strong>各类别标注数量</Text>
                      </div>
                      <List
                        dataSource={labelConfig.labels.map(label => ({
                          label,
                          count: labelItems.filter(item => 
                            item.status === 'labeled' && item.labels.includes(label)
                          ).length
                        }))}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              title={item.label}
                            />
                            <div>{item.count} 项</div>
                          </List.Item>
                        )}
                      />
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
                    在"数据集列表"中选择一个数据集以开始标注任务
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

          <TabPane tab="标注历史" key="history">
            <Card>
              {selectedDataset ? (
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <Space>
                      <Text strong>数据集:</Text>
                      <Text>{selectedDataset.name}</Text>
                    </Space>
                  </div>
                  
                  <Table
                    dataSource={paginatedItems.map((item, index) => ({
                      ...item,
                      key: item.id,
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
                        title: '内容',
                        dataIndex: 'content',
                        key: 'content',
                        ellipsis: true
                      },
                      {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status: string) => {
                          if (status === 'labeled') {
                            return <Tag color="green">已标注</Tag>;
                          } else if (status === 'skipped') {
                            return <Tag color="orange">已跳过</Tag>;
                          }
                          return <Tag>未标注</Tag>;
                        },
                        width: 100
                      },
                      {
                        title: '标签',
                        dataIndex: 'labels',
                        key: 'labels',
                        render: (labels: string[]) => (
                          <div>
                            {labels.map(label => (
                              <Tag key={label}>{label}</Tag>
                            ))}
                          </div>
                        )
                      },
                      {
                        title: '操作',
                        key: 'action',
                        render: (_, _record) => (
                          <Space>
                            <Button type="link" icon={<EyeOutlined />}>查看</Button>
                            <Button type="link" icon={<EditOutlined />}>编辑</Button>
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
                      total={labelItems.length}
                      onChange={setCurrentPage}
                      showSizeChanger={false}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <InfoCircleOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  <Title level={4}>请先选择一个数据集</Title>
                  <Paragraph>
                    在"数据集列表"中选择一个数据集以查看标注历史
                  </Paragraph>
                  <Button 
                    type="primary" 
                    onClick={() => setActiveTab('datasets')}
                  >
                    前往数据集列表
                  </Button>
                </div>
              )}
            </Card>
          </TabPane>

          <TabPane tab="使用说明" key="instructions">
            <Card>
              <Title level={4}>数据标注使用说明</Title>
              
              <Collapse defaultActiveKey={['1']}>
                <Panel header="什么是数据标注?" key="1">
                  <Paragraph>
                    数据标注是为原始数据添加标签或注释的过程，这些标签用于训练监督学习模型。
                    在大语言模型的场景中，标注数据用于微调模型，使其在特定任务上表现更好。
                  </Paragraph>
                </Panel>
                
                <Panel header="标注类型介绍" key="2">
                  <Paragraph>
                    平台支持多种标注类型：
                  </Paragraph>
                  <ul>
                    <li>
                      <Text strong>文本分类：</Text>
                      将文本分配到预定义的类别中，如情感分析（正面/负面/中性）、主题分类等
                    </li>
                    <li>
                      <Text strong>命名实体识别(NER)：</Text>
                      识别文本中的特定实体，如人名、地名、组织机构等
                    </li>
                    <li>
                      <Text strong>情感分析：</Text>
                      判断文本的情感倾向，如积极、消极或中性
                    </li>
                    <li>
                      <Text strong>自定义标注：</Text>
                      根据特定任务需求创建自定义标注任务
                    </li>
                  </ul>
                </Panel>
                
                <Panel header="标注操作指南" key="3">
                  <ol>
                    <li>在"数据集列表"中选择一个数据集</li>
                    <li>点击"开始标注"进入标注界面</li>
                    <li>阅读待标注内容</li>
                    <li>根据任务要求选择合适的标签</li>
                    <li>点击"保存并继续"保存当前标注并进入下一项</li>
                    <li>可随时暂停或跳过某些项</li>
                  </ol>
                </Panel>
                
                <Panel header="标注质量保证" key="4">
                  <Paragraph>
                    为确保标注质量，请遵循以下建议：
                  </Paragraph>
                  <ul>
                    <li>仔细阅读标注指南和示例</li>
                    <li>保持标注标准的一致性</li>
                    <li>不确定时选择跳过，不要随意标注</li>
                    <li>定期检查已标注数据的一致性</li>
                    <li>多人标注时进行交叉验证</li>
                  </ul>
                </Panel>
              </Collapse>
              
              <Divider />
              
              <Title level={4}>协作标注</Title>
              <Paragraph>
                平台支持多人协作标注，可以：
              </Paragraph>
              <ul>
                <li>分配标注任务给不同成员</li>
                <li>设置标注规则和标准</li>
                <li>实时查看标注进度</li>
                <li>进行标注结果的审核和合并</li>
              </ul>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
      
      <Modal
        title="标注配置"
        visible={isConfigModalVisible}
        onOk={handleConfigSave}
        onCancel={() => setIsConfigModalVisible(false)}
        width={600}
      >
        <Form form={configForm} layout="vertical">
          <Form.Item name="type" label="标注类型">
            <Select>
              <Option value="classification">文本分类</Option>
              <Option value="ner">命名实体识别</Option>
              <Option value="sentiment">情感分析</Option>
              <Option value="custom">自定义</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="allowMultiple" label="允许多选" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item label="标签列表">
            <Form.List name="labels">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name]}
                         fieldKey={fieldKey !== undefined ? [fieldKey] : undefined}
                        rules={[{ required: true, message: '请输入标签名称' }]}
                      >
                        <Input placeholder="标签名称" />
                      </Form.Item>
                      <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    </Space>
                  ))}
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    icon={<PlusOutlined />}
                    block
                  >
                    添加标签
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DatasetLabeling;