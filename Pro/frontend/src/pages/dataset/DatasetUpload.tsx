// 数据集上传

import  { useState} from 'react';
import type { ReactElement } from 'react';
import {
  Card,
  Typography,
  Button,
  Upload,
  message,
  Steps,
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
  Descriptions
} from 'antd';
import {
  CloudUploadOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  InfoCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;
const { Step } = Steps;
const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface UploadFile {
  id: string;
  name: string;
  size: string;
  status: 'uploading' | 'done' | 'error' | 'validating';
  progress: number;
  type: string;
  validation?: {
    passed: boolean;
    errors?: string[];
    warnings?: string[];
  };
}

interface DatasetInfo {
  name: string;
  description: string;
  type: string;
  tags: string[];
  version: string;
}

const DatasetUpload = (): ReactElement => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([]);
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo>({
    name: '',
    description: '',
    type: '',
    tags: [],
    version: 'v1.0'
  });
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('upload');

  // 模拟上传文件
  const handleFileUpload = (file: any) => {
    const newFile: UploadFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      status: 'uploading',
      progress: 0,
      type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN'
    };

    setUploadingFiles(prev => [...prev, newFile]);

    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadingFiles(prev => prev.map(f => {
        if (f.id === newFile.id && f.progress < 90) {
          return { ...f, progress: f.progress + 10 };
        }
        return f;
      }));
    }, 200);

    // 模拟上传完成
    setTimeout(() => {
      clearInterval(interval);
      setUploadingFiles(prev => prev.map(f => {
        if (f.id === newFile.id) {
          // 模拟验证过程
          const validation = Math.random() > 0.2 ? 
            { passed: true } : 
            { passed: false, errors: ['文件格式不符合要求'], warnings: ['建议使用UTF-8编码'] };
          
          return { 
            ...f, 
            status: validation.passed ? 'done' : 'error',
            progress: 100,
            validation
          };
        }
        return f;
      }));
    }, 2000);

    return false; // 阻止默认上传行为
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleNext = () => {
    if (currentStep === 0 && uploadingFiles.length === 0) {
      message.warning('请先上传文件');
      return;
    }
    
    if (currentStep === 1) {
      form.validateFields().then(values => {
        setDatasetInfo(values);
        setCurrentStep(currentStep + 1);
      }).catch(() => {
        message.error('请填写完整的数据集信息');
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    message.success('数据集上传成功！');
    // 重置表单
    setUploadingFiles([]);
    setDatasetInfo({
      name: '',
      description: '',
      type: '',
      tags: [],
      version: 'v1.0'
    });
    form.resetFields();
    setCurrentStep(0);
    setActiveTab('upload');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <SyncOutlined spin />;
      case 'done':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'validating':
        return <SyncOutlined spin />;
      default:
        return null;
    }
  };

  const getFileStatusText = (status: string) => {
    switch (status) {
      case 'uploading':
        return '上传中';
      case 'done':
        return '上传完成';
      case 'error':
        return '上传失败';
      case 'validating':
        return '验证中';
      default:
        return status;
    }
  };

  return (
    <div className="dataset-upload">
      <Card>
        <Title level={3}>
          <CloudUploadOutlined /> 数据集上传
        </Title>
        <Paragraph type="secondary">
          上传并管理用于大模型训练的数据集文件
        </Paragraph>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="上传数据" key="upload">
            <Card>
              <Steps current={currentStep} style={{ marginBottom: 24 }}>
                <Step title="上传文件" description="选择并上传数据文件" />
                <Step title="数据集信息" description="填写数据集基本信息" />
                <Step title="确认提交" description="检查并提交数据集" />
              </Steps>

              <div style={{ marginTop: 24 }}>
                {currentStep === 0 && (
                  <div>
                    <Card title="上传文件" size="small">
                      <Dragger 
                        name="file"
                        multiple
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                      >
                        <p className="ant-upload-drag-icon">
                          <CloudUploadOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                        <p className="ant-upload-hint">
                          支持TXT、CSV、JSON、JSONL等格式，单个文件不超过5GB
                        </p>
                      </Dragger>

                      {uploadingFiles.length > 0 && (
                        <>
                          <Divider>已上传文件</Divider>
                          <List
                            dataSource={uploadingFiles}
                            renderItem={file => (
                              <List.Item
                                actions={[
                                  file.status === 'uploading' ? (
                                    <Button type="link" danger onClick={() => handleRemoveFile(file.id)}>
                                      取消
                                    </Button>
                                  ) : (
                                    <Button type="link" danger onClick={() => handleRemoveFile(file.id)}>
                                      删除
                                    </Button>
                                  )
                                ]}
                              >
                                <List.Item.Meta
                                  avatar={<FileTextOutlined />}
                                  title={
                                    <Space>
                                      <span>{file.name}</span>
                                      {getStatusIcon(file.status)}
                                    </Space>
                                  }
                                  description={
                                    <div>
                                      <div>{file.size} | {getFileStatusText(file.status)}</div>
                                      {file.status === 'uploading' && (
                                        <Progress percent={file.progress} size="small" />
                                      )}
                                      {file.validation && !file.validation.passed && (
                                        <div style={{ color: '#ff4d4f' }}>
                                          {file.validation.errors?.join(', ')}
                                        </div>
                                      )}
                                      {file.validation?.warnings && file.validation.warnings.length > 0 && (
                                        <div style={{ color: '#faad14' }}>
                                          警告: {file.validation.warnings.join(', ')}
                                        </div>
                                      )}
                                    </div>
                                  }
                                />
                              </List.Item>
                            )}
                          />
                        </>
                      )}
                    </Card>
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <Card title="数据集信息" size="small">
                      <Form
                        form={form}
                        layout="vertical"
                        initialValues={datasetInfo}
                      >
                        <Form.Item
                          name="name"
                          label="数据集名称"
                          rules={[{ required: true, message: '请输入数据集名称' }]}
                        >
                          <Input placeholder="例如：客服对话数据集" />
                        </Form.Item>
                        
                        <Form.Item
                          name="description"
                          label="数据集描述"
                          rules={[{ required: true, message: '请输入数据集描述' }]}
                        >
                          <Input.TextArea 
                            placeholder="描述数据集的内容、用途等信息" 
                            rows={3} 
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="type"
                          label="数据集类型"
                          rules={[{ required: true, message: '请选择数据集类型' }]}
                        >
                          <Select placeholder="请选择数据集类型">
                            <Option value="对话数据">对话数据</Option>
                            <Option value="文档数据">文档数据</Option>
                            <Option value="问答数据">问答数据</Option>
                            <Option value="代码数据">代码数据</Option>
                            <Option value="法律数据">法律数据</Option>
                            <Option value="医疗数据">医疗数据</Option>
                            <Option value="其他">其他</Option>
                          </Select>
                        </Form.Item>
                        
                        <Form.Item
                          name="version"
                          label="版本号"
                        >
                          <Input placeholder="例如：v1.0" />
                        </Form.Item>
                        
                        <Form.Item
                          name="tags"
                          label="标签"
                        >
                          <Select 
                            mode="tags" 
                            placeholder="添加标签，便于分类和搜索"
                          >
                            <Option value="中文">中文</Option>
                            <Option value="英文">英文</Option>
                            <Option value="训练数据">训练数据</Option>
                            <Option value="测试数据">测试数据</Option>
                            <Option value="微调数据">微调数据</Option>
                          </Select>
                        </Form.Item>
                      </Form>
                    </Card>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <Card title="确认信息" size="small">
                      <Title level={5}>数据集信息</Title>
                      <Descriptions column={1} bordered>
                        <Descriptions.Item label="数据集名称">{datasetInfo.name}</Descriptions.Item>
                        <Descriptions.Item label="数据集描述">{datasetInfo.description}</Descriptions.Item>
                        <Descriptions.Item label="数据集类型">{datasetInfo.type}</Descriptions.Item>
                        <Descriptions.Item label="版本号">{datasetInfo.version}</Descriptions.Item>
                        <Descriptions.Item label="标签">
                          {datasetInfo.tags.map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </Descriptions.Item>
                      </Descriptions>
                      
                      <Title level={5} style={{ marginTop: 24 }}>文件列表</Title>
                      <Table
                        dataSource={uploadingFiles}
                        columns={[
                          {
                            title: '文件名',
                            dataIndex: 'name',
                            key: 'name'
                          },
                          {
                            title: '大小',
                            dataIndex: 'size',
                            key: 'size'
                          },
                          {
                            title: '状态',
                            dataIndex: 'status',
                            key: 'status',
                            render: (status: string) => getFileStatusText(status)
                          }
                        ]}
                        pagination={false}
                        rowKey="id"
                      />
                    </Card>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 24, textAlign: 'right' }}>
                {currentStep > 0 && (
                  <Button style={{ marginRight: 8 }} onClick={handlePrev}>
                    上一步
                  </Button>
                )}
                {currentStep < 2 ? (
                  <Button type="primary" onClick={handleNext}>
                    下一步
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleSubmit}>
                    提交数据集
                  </Button>
                )}
              </div>
            </Card>
          </TabPane>

          <TabPane tab="上传历史" key="history">
            <Card>
              <Table
                dataSource={[
                  {
                    id: '1',
                    name: '客服对话数据集',
                    files: 128,
                    size: '2.4 GB',
                    status: '已处理',
                    uploadTime: '2024-03-15 14:30:00',
                    uploader: '张三'
                  },
                  {
                    id: '2',
                    name: '技术文档数据集',
                    files: 85,
                    size: '1.8 GB',
                    status: '处理中',
                    uploadTime: '2024-03-18 09:15:00',
                    uploader: '李四'
                  },
                  {
                    id: '3',
                    name: '法律条款数据集',
                    files: 56,
                    size: '850 MB',
                    status: '已处理',
                    uploadTime: '2024-03-10 16:45:00',
                    uploader: '王五'
                  }
                ]}
                columns={[
                  {
                    title: '数据集名称',
                    dataIndex: 'name',
                    key: 'name'
                  },
                  {
                    title: '文件数量',
                    dataIndex: 'files',
                    key: 'files'
                  },
                  {
                    title: '大小',
                    dataIndex: 'size',
                    key: 'size'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) => {
                      if (status === '已处理') {
                        return <Tag color="green">{status}</Tag>;
                      } else if (status === '处理中') {
                        return <Tag color="orange">{status}</Tag>;
                      }
                      return <Tag>{status}</Tag>;
                    }
                  },
                  {
                    title: '上传时间',
                    dataIndex: 'uploadTime',
                    key: 'uploadTime'
                  },
                  {
                    title: '上传者',
                    dataIndex: 'uploader',
                    key: 'uploader'
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, _record) => (
                      <Space>
                        <Button type="link" icon={<DownloadOutlined />}>下载</Button>
                        <Button type="link">详情</Button>
                      </Space>
                    )
                  }
                ]}
                pagination={{
                  pageSize: 5
                }}
              />
            </Card>
          </TabPane>

          <TabPane tab="使用说明" key="instructions">
            <Card>
              <Title level={4}>数据集上传说明</Title>
              
              <Collapse defaultActiveKey={['1']}>
                <Panel header="支持的文件格式" key="1">
                  <Paragraph>
                    我们支持以下文件格式的数据集上传：
                  </Paragraph>
                  <ul>
                    <li><Text strong>TXT</Text> - 纯文本文件</li>
                    <li><Text strong>CSV</Text> - 逗号分隔值文件</li>
                    <li><Text strong>JSON</Text> - JavaScript对象表示法文件</li>
                    <li><Text strong>JSONL</Text> - 每行一个JSON对象的文件</li>
                    <li><Text strong>ZIP</Text> - 压缩文件（包含以上格式）</li>
                  </ul>
                  <Paragraph>
                    文件编码建议使用UTF-8，以确保正确处理中文等非ASCII字符。
                  </Paragraph>
                </Panel>
                
                <Panel header="文件大小限制" key="2">
                  <Paragraph>
                    单个文件大小限制：
                  </Paragraph>
                  <ul>
                    <li>普通用户：单文件最大5GB</li>
                    <li>高级用户：单文件最大10GB</li>
                    <li>企业用户：单文件最大50GB</li>
                  </ul>
                  <Paragraph>
                    总存储空间限制：
                  </Paragraph>
                  <ul>
                    <li>普通用户：总存储空间100GB</li>
                    <li>高级用户：总存储空间1TB</li>
                    <li>企业用户：总存储空间10TB</li>
                  </ul>
                </Panel>
                
                <Panel header="数据集命名规范" key="3">
                  <Paragraph>
                    数据集命名应遵循以下规范：
                  </Paragraph>
                  <ul>
                    <li>长度在2-50个字符之间</li>
                    <li>只能包含中文、英文、数字、下划线(_)和短横线(-)</li>
                    <li>不能以特殊字符开头</li>
                    <li>应具有描述性，能够准确反映数据集内容</li>
                  </ul>
                </Panel>
                
                <Panel header="数据质量要求" key="4">
                  <Paragraph>
                    为了确保数据集的质量和有效性，请遵循以下要求：
                  </Paragraph>
                  <ul>
                    <li>数据应具有代表性，能够反映实际应用场景</li>
                    <li>避免包含敏感信息和个人隐私数据</li>
                    <li>数据应经过清洗，去除重复和无效内容</li>
                    <li>结构化数据应保持一致的格式</li>
                    <li>文本数据应使用正确的标点符号和语法</li>
                  </ul>
                </Panel>
              </Collapse>
              
              <Divider />
              
              <Title level={4}>上传流程</Title>
              <Row gutter={16}>
                <Col span={8}>
                  <Card size="small">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', marginBottom: 8 }}>1</div>
                      <div>选择文件</div>
                      <div style={{ fontSize: '24px', color: '#1890ff' }}>
                        <FileTextOutlined />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', marginBottom: 8 }}>2</div>
                      <div>填写信息</div>
                      <div style={{ fontSize: '24px', color: '#1890ff' }}>
                        <InfoCircleOutlined />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', marginBottom: 8 }}>3</div>
                      <div>确认提交</div>
                      <div style={{ fontSize: '24px', color: '#1890ff' }}>
                        <CheckCircleOutlined />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default DatasetUpload;