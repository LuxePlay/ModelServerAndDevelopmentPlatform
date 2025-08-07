// 知识库管理

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import {
  Card,
  Typography,
  List,
  Space,
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
  Table
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'processing' | 'error' | 'inactive';
  createdAt: string;
  updatedAt: string;
  documentCount: number;
  embeddingModel: string;
  vectorDatabase: string;
  tags: string[];
  size: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'processed' | 'processing' | 'error';
  createdAt: string;
  updatedAt: string;
  knowledgeBase: string;
}

const RAGKnowledgeLibrary = (): ReactElement => {
  const [activeTab, setActiveTab] = useState('knowledge-bases');
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<KnowledgeBase | null>(null);
  const [form] = Form.useForm();
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  // 初始化数据
  useEffect(() => {
    // 模拟知识库数据
    const mockKnowledgeBases: KnowledgeBase[] = [
      {
        id: 'kb-001',
        name: '产品文档知识库',
        description: '包含所有产品相关文档，用于客服问答系统',
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-03-20',
        documentCount: 128,
        embeddingModel: 'Qwen-7B-Embedding',
        vectorDatabase: 'FAISS',
        tags: ['产品', '客服', '文档'],
        size: '2.4 GB'
      },
      {
        id: 'kb-002',
        name: '技术文档库',
        description: '开发技术文档和API参考',
        status: 'processing',
        createdAt: '2024-02-10',
        updatedAt: '2024-03-15',
        documentCount: 85,
        embeddingModel: 'BGE-M3',
        vectorDatabase: 'Pinecone',
        tags: ['技术', '开发', 'API'],
        size: '1.8 GB'
      },
      {
        id: 'kb-003',
        name: '法律条款库',
        description: '公司法律条款和合规文档',
        status: 'active',
        createdAt: '2024-01-25',
        updatedAt: '2024-02-28',
        documentCount: 56,
        embeddingModel: 'BERT-Base',
        vectorDatabase: 'Weaviate',
        tags: ['法律', '合规', '条款'],
        size: '850 MB'
      },
      {
        id: 'kb-004',
        name: '培训资料库',
        description: '员工培训和学习资料',
        status: 'inactive',
        createdAt: '2023-12-05',
        updatedAt: '2024-01-15',
        documentCount: 210,
        embeddingModel: 'Qwen-14B-Embedding',
        vectorDatabase: 'Chroma',
        tags: ['培训', '学习', '员工'],
        size: '3.2 GB'
      }
    ];

    // 模拟文档数据
    const mockDocuments: Document[] = [
      {
        id: 'doc-001',
        name: '产品使用手册.pdf',
        type: 'PDF',
        size: '4.2 MB',
        status: 'processed',
        createdAt: '2024-03-15',
        updatedAt: '2024-03-15',
        knowledgeBase: '产品文档知识库'
      },
      {
        id: 'doc-002',
        name: 'API参考文档.docx',
        type: 'DOCX',
        size: '1.8 MB',
        status: 'processing',
        createdAt: '2024-03-18',
        updatedAt: '2024-03-18',
        knowledgeBase: '技术文档库'
      },
      {
        id: 'doc-003',
        name: '合规政策更新.txt',
        type: 'TXT',
        size: '0.3 MB',
        status: 'processed',
        createdAt: '2024-03-10',
        updatedAt: '2024-03-10',
        knowledgeBase: '法律条款库'
      },
      {
        id: 'doc-004',
        name: '新员工培训.pptx',
        type: 'PPTX',
        size: '12.5 MB',
        status: 'error',
        createdAt: '2024-03-05',
        updatedAt: '2024-03-05',
        knowledgeBase: '培训资料库'
      }
    ];

    setKnowledgeBases(mockKnowledgeBases);
    setDocuments(mockDocuments);
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleKnowledgeBaseStatus = (kbId: string) => {
    setKnowledgeBases(knowledgeBases.map(kb => {
      if (kb.id === kbId) {
        return {
          ...kb,
          status: kb.status === 'active' ? 'inactive' : 'active'
        };
      }
      return kb;
    }));
    message.success('知识库状态已更新');
  };

  const handleDeleteKnowledgeBase = (kbId: string) => {
    setKnowledgeBases(knowledgeBases.filter(kb => kb.id !== kbId));
    message.success('知识库已删除');
  };

  const showModal = (kb: KnowledgeBase) => {
    setSelectedKnowledgeBase(kb);
    form.setFieldsValue(kb);
    setIsModalVisible(true);
  };

  const showCreateModal = () => {
    setSelectedKnowledgeBase(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (selectedKnowledgeBase) {
        // 更新知识库信息
        setKnowledgeBases(knowledgeBases.map(kb => 
          kb.id === selectedKnowledgeBase.id ? { ...kb, ...values, updatedAt: new Date().toISOString().split('T')[0] } : kb
        ));
        message.success('知识库信息已更新');
      } else {
        // 创建新知识库
        const newKnowledgeBase: KnowledgeBase = {
          id: `kb-${Date.now()}`,
          ...values,
          status: 'processing',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          documentCount: 0,
          size: '0 MB'
        };
        setKnowledgeBases([...knowledgeBases, newKnowledgeBase]);
        message.success('知识库创建成功');
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedKnowledgeBase(null);
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

  const getDocumentStatusTag = (status: string) => {
    switch (status) {
      case 'processed':
        return <Tag color="green">已处理</Tag>;
      case 'processing':
        return <Tag color="orange">处理中</Tag>;
      case 'error':
        return <Tag color="red">错误</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // 根据搜索条件筛选知识库
  const filterKnowledgeBases = () => {
    return knowledgeBases.filter(kb => {
      return kb.name.toLowerCase().includes(searchText.toLowerCase()) || 
             kb.description.toLowerCase().includes(searchText.toLowerCase()) ||
             kb.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    });
  };

  const filteredKnowledgeBases = filterKnowledgeBases();

  return (
    <div className="rag-knowledge-library">
      <Card>
        <Title level={3}>
          <DatabaseOutlined /> RAG知识库管理
        </Title>
        <Paragraph type="secondary">
          管理用于检索增强生成(RAG)的知识库，支持文档上传、处理和检索配置。
        </Paragraph>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="知识库列表" key="knowledge-bases">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Search
                      placeholder="搜索知识库"
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
                      创建知识库
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={filteredKnowledgeBases}
                renderItem={kb => (
                  <List.Item>
                    <Card 
                      title={kb.name}
                      size="small"
                      extra={getStatusTag(kb.status)}
                      actions={[
                        <Tooltip title="启用/停用">
                          <Button 
                            type="text" 
                            icon={<SyncOutlined />}
                            onClick={() => toggleKnowledgeBaseStatus(kb.id)}
                          />
                        </Tooltip>,
                        <Tooltip title="查看详情">
                          <Button 
                            type="text" 
                            icon={<EyeOutlined />}
                            onClick={() => {
                              setActiveTab('documents');
                              // 在实际应用中，这里会筛选该知识库下的文档
                            }}
                          />
                        </Tooltip>,
                        <Tooltip title="编辑">
                          <Button 
                            type="text" 
                            icon={<EditOutlined />}
                            onClick={() => showModal(kb)}
                          />
                        </Tooltip>,
                        <Tooltip title="删除">
                          <Button 
                            type="text" 
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => handleDeleteKnowledgeBase(kb.id)}
                          />
                        </Tooltip>
                      ]}
                    >
                      <Paragraph ellipsis={{ rows: 2 }} style={{ minHeight: 44 }}>
                        {kb.description}
                      </Paragraph>
                      
                      <div style={{ margin: '12px 0' }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Statistic title="文档数" value={kb.documentCount} />
                          </Col>
                          <Col span={8}>
                            <Statistic title="大小" value={kb.size} />
                          </Col>
                          <Col span={8}>
                            <Statistic title="模型" value={kb.embeddingModel} />
                          </Col>
                        </Row>
                      </div>
                      
                      <div>
                        {kb.tags.map(tag => (
                          <Tag key={tag} color="blue">{tag}</Tag>
                        ))}
                      </div>
                      
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          创建时间: {kb.createdAt} | 更新时间: {kb.updatedAt}
                        </Text>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
              
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Pagination
                  current={currentPage}
                  total={filteredKnowledgeBases.length}
                  pageSize={4}
                  onChange={handlePageChange}
                />
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab="文档管理" key="documents">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Search
                      placeholder="搜索文档"
                      allowClear
                      onSearch={handleSearch}
                      enterButton={<SearchOutlined />}
                    />
                  </Col>
                  <Col span={4}>
                    <Button 
                      type="primary" 
                      icon={<CloudUploadOutlined />} 
                      onClick={showUploadModal}
                    >
                      上传文档
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <Table
                dataSource={documents}
                columns={[
                  {
                    title: '文档名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text: string, record: Document) => (
                      <Space>
                        <FileTextOutlined />
                        <span>{text}</span>
                        <Tag>{record.type}</Tag>
                      </Space>
                    )
                  },
                  {
                    title: '所属知识库',
                    dataIndex: 'knowledgeBase',
                    key: 'knowledgeBase',
                  },
                  {
                    title: '大小',
                    dataIndex: 'size',
                    key: 'size',
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) => getDocumentStatusTag(status)
                  },
                  {
                    title: '创建时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, _record) => (
                      <Space>
                        <Button type="link" icon={<EyeOutlined />}>预览</Button>
                        <Button type="link" icon={<DownloadOutlined />}>下载</Button>
                        <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
                      </Space>
                    ),
                  },
                ]}
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </TabPane>
          
          <TabPane tab="处理进度" key="processing">
            <Card>
              <Title level={4}>文档处理进度</Title>
              <List
                dataSource={documents.filter(doc => doc.status === 'processing')}
                renderItem={doc => (
                  <List.Item>
                    <List.Item.Meta
                      title={doc.name}
                      description={
                        <div>
                          <div>所属知识库: {doc.knowledgeBase}</div>
                          <div style={{ marginTop: 8 }}>
                            <Progress percent={60} status="active" />
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              
              <Divider />
              
              <Title level={4}>处理历史</Title>
              <List
                dataSource={documents.filter(doc => doc.status !== 'processing')}
                renderItem={doc => (
                  <List.Item>
                    <List.Item.Meta
                      title={<span>{doc.name} {getDocumentStatusTag(doc.status)}</span>}
                      description={
                        <div>
                          <div>所属知识库: {doc.knowledgeBase}</div>
                          <div>完成时间: {doc.updatedAt}</div>
                        </div>
                      }
                    />
                    <div>
                      <Button type="link" icon={<EyeOutlined />}>查看详情</Button>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
          
          <TabPane tab="配置说明" key="config">
            <Card>
              <Title level={4}>RAG知识库配置说明</Title>
              
              <Collapse defaultActiveKey={['1']}>
                <Panel header="什么是RAG知识库?" key="1">
                  <Paragraph>
                    RAG(Retrieval-Augmented Generation)知识库是一种结合检索和生成的技术，
                    通过将外部知识库与大语言模型结合，提升模型回答的准确性和相关性。
                  </Paragraph>
                </Panel>
                
                <Panel header="如何创建知识库?" key="2">
                  <ol>
                    <li>点击"创建知识库"按钮</li>
                    <li>填写知识库名称和描述</li>
                    <li>选择合适的嵌入模型</li>
                    <li>选择向量数据库类型</li>
                    <li>添加标签便于分类管理</li>
                    <li>确认创建</li>
                  </ol>
                </Panel>
                
                <Panel header="如何上传文档?" key="3">
                  <Paragraph>
                    在"文档管理"标签页中，点击"上传文档"按钮，选择要上传的文件。
                    支持的文件格式包括：PDF、DOCX、TXT、PPTX等。
                  </Paragraph>
                  <Paragraph>
                    上传的文档会自动进行以下处理：
                  </Paragraph>
                  <ul>
                    <li>文档解析和文本提取</li>
                    <li>文本分块处理</li>
                    <li>向量化处理</li>
                    <li>存储到向量数据库</li>
                  </ul>
                </Panel>
                
                <Panel header="最佳实践" key="4">
                  <ul>
                    <li>按业务领域创建不同的知识库</li>
                    <li>定期更新知识库内容</li>
                    <li>为文档添加合适的标签</li>
                    <li>监控文档处理状态</li>
                    <li>根据使用情况优化嵌入模型</li>
                  </ul>
                </Panel>
              </Collapse>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
      
      <Modal
        title={selectedKnowledgeBase ? "编辑知识库" : "创建知识库"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="知识库名称" rules={[{ required: true, message: '请输入知识库名称' }]}>
            <Input placeholder="请输入知识库名称" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入知识库描述" rows={3} />
          </Form.Item>
          <Form.Item name="embeddingModel" label="嵌入模型" rules={[{ required: true, message: '请选择嵌入模型' }]}>
            <Select placeholder="请选择嵌入模型">
              <Option value="Qwen-7B-Embedding">Qwen-7B-Embedding</Option>
              <Option value="Qwen-14B-Embedding">Qwen-14B-Embedding</Option>
              <Option value="BGE-M3">BGE-M3</Option>
              <Option value="BERT-Base">BERT-Base</Option>
            </Select>
          </Form.Item>
          <Form.Item name="vectorDatabase" label="向量数据库" rules={[{ required: true, message: '请选择向量数据库' }]}>
            <Select placeholder="请选择向量数据库">
              <Option value="FAISS">FAISS</Option>
              <Option value="Pinecone">Pinecone</Option>
              <Option value="Weaviate">Weaviate</Option>
              <Option value="Chroma">Chroma</Option>
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="标签">
            <Select mode="tags" placeholder="添加标签">
              {knowledgeBases.flatMap(kb => kb.tags)
                .filter((tag, index, self) => self.indexOf(tag) === index)
                .map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      
      <Modal
        title="上传文档"
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
            支持PDF、DOCX、TXT、PPTX等格式，单个文件不超过100MB
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

export default RAGKnowledgeLibrary;