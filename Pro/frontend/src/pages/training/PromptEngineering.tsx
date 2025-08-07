// Prompt工程

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { 
  Layout, 
  Card, 
  Input, 
  Button, 
  Table, 
  Tabs, 
  Form, 
  Select,  
  Slider, 
  Row, 
  Col, 
  Divider,
  Typography,
  message,
  Tag,
  List,
  Collapse,
  Tree,
} from 'antd';
import { 
  PlusOutlined, 
  SaveOutlined, 
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  HistoryOutlined,
  BookOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const PromptEngineering = (): ReactElement => {
  const [activeTab, setActiveTab] = useState('editor');
  const [prompts, setPrompts] = useState<Array<any>>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [promptTemplates, _setPromptTemplates] = useState<Array<any>>([
    {
      id: 1,
      name: '文本分类',
      description: '对输入文本进行分类',
      prompt: '请将以下文本分类到合适的类别中：\n{{input_text}}\n类别选项：{{categories}}'
    },
    {
      id: 2,
      name: '文本摘要',
      description: '生成文本摘要',
      prompt: '请为以下文本生成一个简洁的摘要：\n{{input_text}}'
    },
    {
      id: 3,
      name: '问答系统',
      description: '基于文本回答问题',
      prompt: '基于以下文档内容回答问题：\n{{document}}\n问题：{{question}}'
    }
  ]);
  const [form] = Form.useForm();
  const [executionResult, setExecutionResult] = useState('');
  const [executionHistory, setExecutionHistory] = useState<Array<any>>([]);

  // 初始化示例数据
  useEffect(() => {
    const samplePrompts = [
      {
        id: 1,
        name: '产品描述生成器',
        content: '为以下产品生成吸引人的描述：\n产品名称：{{product_name}}\n产品特点：{{features}}\n目标受众：{{target_audience}}',
        category: '内容生成',
        createdAt: '2023-06-15',
        tags: ['电商', '营销']
      },
      {
        id: 2,
        name: '代码解释器',
        content: '请解释以下代码的功能：\n{{code}}\n使用通俗易懂的语言，并提供使用示例。',
        category: '技术',
        createdAt: '2023-06-10',
        tags: ['编程', '教育']
      }
    ];
    setPrompts(samplePrompts);
    setSelectedPrompt(samplePrompts[0]);
    form.setFieldsValue(samplePrompts[0]);
  }, [form]);

  const handleSavePrompt = (values: any) => {
    if (selectedPrompt) {
      // 更新现有Prompt
      const updatedPrompts = prompts.map(prompt => 
        prompt.id === selectedPrompt.id ? { ...prompt, ...values } : prompt
      );
      setPrompts(updatedPrompts);
      setSelectedPrompt({ ...selectedPrompt, ...values });
      message.success('Prompt已更新');
    } else {
      // 创建新Prompt
      const newPrompt = {
        id: Date.now(),
        ...values,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPrompts([...prompts, newPrompt]);
      setSelectedPrompt(newPrompt);
      message.success('Prompt已保存');
    }
  };

  const handleCreateNewPrompt = () => {
    form.resetFields();
    setSelectedPrompt(null);
    message.info('已创建新Prompt');
  };

  const handleDeletePrompt = (id: number) => {
    const updatedPrompts = prompts.filter(prompt => prompt.id !== id);
    setPrompts(updatedPrompts);
    if (selectedPrompt && selectedPrompt.id === id) {
      setSelectedPrompt(updatedPrompts[0] || null);
      if (updatedPrompts[0]) {
        form.setFieldsValue(updatedPrompts[0]);
      } else {
        form.resetFields();
      }
    }
    message.success('Prompt已删除');
  };

  const handleSelectPrompt = (prompt: any) => {
    setSelectedPrompt(prompt);
    form.setFieldsValue(prompt);
  };

  const handleExecutePrompt = () => {
    // 模拟Prompt执行
    setExecutionResult('正在执行Prompt...');
    
    setTimeout(() => {
      const result = `执行结果：\n根据您的Prompt "${selectedPrompt?.name}"，生成了以下结果：\n\n这是一个基于您提供的参数生成的示例结果。在实际应用中，这里会显示由大模型生成的真实内容。`;
      setExecutionResult(result);
      
      // 添加到执行历史
      const historyItem = {
        id: Date.now(),
        promptName: selectedPrompt?.name,
        timestamp: new Date().toLocaleString(),
        result: result.substring(0, 100) + '...'
      };
      setExecutionHistory([historyItem, ...executionHistory.slice(0, 9)]);
    }, 1500);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('已复制到剪贴板');
  };

  const handleTemplateSelect = (template: any) => {
    form.setFieldsValue({ content: template.prompt });
    message.success(`已应用模板: ${template.name}`);
  };

  const promptCategories = [
    '内容生成', '文本分类', '问答系统', '代码生成', '翻译', 
    '摘要生成', '情感分析', '创意写作', '教育', '技术'
  ];

  const templateTreeData = [
    {
      title: '内容生成',
      key: '1',
      children: [
        { title: '文章写作', key: '1-1' },
        { title: '营销文案', key: '1-2' },
        { title: '社交媒体内容', key: '1-3' },
      ],
    },
    {
      title: '技术',
      key: '2',
      children: [
        { title: '代码解释', key: '2-1' },
        { title: '技术文档', key: '2-2' },
      ],
    },
    {
      title: '教育',
      key: '3',
      children: [
        { title: '教学计划', key: '3-1' },
        { title: '练习题生成', key: '3-2' },
      ],
    },
  ];

  return (
    <Layout className="prompt-engineering-layout" style={{ height: '100vh' }}>
      <Sider width={300} theme="light" className="prompt-sider">
        <Card title={<Title level={5} style={{ margin: 0 }}><FileTextOutlined /> 我的Prompts</Title>} style={{ height: '100%' }}>
          <div style={{ marginBottom: '16px' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleCreateNewPrompt}
              block
            >
              新建Prompt
            </Button>
          </div>
          
          <Tabs defaultActiveKey="1">
            <TabPane tab="全部" key="1">
              <List
                dataSource={prompts}
                renderItem={prompt => (
                  <List.Item 
                    actions={[
                      <Button 
                        type="text" 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeletePrompt(prompt.id)}
                        danger
                      />
                    ]}
                    onClick={() => handleSelectPrompt(prompt)}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: selectedPrompt?.id === prompt.id ? '#e6f7ff' : 'transparent'
                    }}
                  >
                    <List.Item.Meta
                      title={prompt.name}
                      description={
                        <>
                          <div>{prompt.description || '无描述'}</div>
                          <div>
                            {prompt.tags?.map((tag: string) => (
                              <Tag key={tag} color="blue">{tag}</Tag>
                            ))}
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="模板" key="2">
              <Tree
                className="prompt-template-tree"
                treeData={templateTreeData}
                defaultExpandAll
                onSelect={(_, { node }) => {
                  if (!node.children) {
                    message.info(`选择了模板: ${node.title}`);
                  }
                }}
              />
            </TabPane>
          </Tabs>
        </Card>
      </Sider>
      
      <Content className="prompt-content">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<span><EditOutlined /> Prompt编辑器</span>} key="editor">
            <Card style={{ height: '100%' }}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Title level={4}>Prompt编辑器</Title>
                
                <Form 
                  form={form} 
                  layout="vertical" 
                  onFinish={handleSavePrompt}
                  style={{ flex: 1, overflow: 'auto' }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item 
                        name="name" 
                        label="Prompt名称" 
                        rules={[{ required: true, message: '请输入Prompt名称' }]}
                      >
                        <Input placeholder="输入Prompt名称" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="category" label="分类">
                        <Select placeholder="选择分类">
                          {promptCategories.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item name="tags" label="标签">
                    <Select mode="tags" placeholder="添加标签" />
                  </Form.Item>
                  
                  <Form.Item 
                    name="content" 
                    label="Prompt内容" 
                    rules={[{ required: true, message: '请输入Prompt内容' }]}
                  >
                    <TextArea 
                      rows={8} 
                      placeholder="在此输入Prompt内容，可以使用{{variable_name}}作为变量占位符"
                    />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                      保存Prompt
                    </Button>
                    <Button 
                      style={{ marginLeft: 8 }} 
                      onClick={() => form.resetFields()}
                    >
                      重置
                    </Button>
                  </Form.Item>
                </Form>
                
                <Divider />
                
                <div>
                  <Title level={5} style={{ marginBottom: 16 }}>常用模板</Title>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {promptTemplates.map(template => (
                      <Button 
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        {template.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab={<span><PlayCircleOutlined /> 执行测试</span>} key="execute">
            <Card style={{ height: '100%' }}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Title level={4}>执行测试</Title>
                
                {selectedPrompt ? (
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>当前Prompt: </Text>
                      <Tag color="blue">{selectedPrompt.name}</Tag>
                    </div>
                    
                    <Form 
                      layout="vertical" 
                      onFinish={handleExecutePrompt}
                      style={{ flex: 1, overflow: 'auto' }}
                    >
                       <Form.Item label="变量输入">
                        <Paragraph type="secondary">
                          请为Prompt中的变量提供值。例如，如果Prompt包含{'{{'}product_name{'}'}，请在下方输入对应值。
                        </Paragraph>
                        <TextArea 
                          rows={4} 
                          placeholder="输入变量值，每行一个，格式为 variable_name=value"
                        />
                      </Form.Item>
                      
                      <Form.Item label="模型参数">
                        <Row gutter={16}>
                          <Col span={8}>
                            <Text>Temperature:</Text>
                            <Slider defaultValue={0.7} min={0} max={1} step={0.1} />
                          </Col>
                          <Col span={8}>
                            <Text>Max Tokens:</Text>
                            <Slider defaultValue={512} min={128} max={2048} step={128} />
                          </Col>
                          <Col span={8}>
                            <Text>Top P:</Text>
                            <Slider defaultValue={0.9} min={0} max={1} step={0.1} />
                          </Col>
                        </Row>
                      </Form.Item>
                      
                      <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<PlayCircleOutlined />}>
                          执行Prompt
                        </Button>
                      </Form.Item>
                    </Form>
                    
                    <Divider />
                    
                    <div style={{ flex: 1, overflow: 'auto' }}>
                      <Text strong>执行结果:</Text>
                      <Card size="small" style={{ marginTop: 8, height: 'calc(100% - 30px)' }}>
                        <TextArea 
                          value={executionResult} 
                          style={{ height: '100%' }} 
                          readOnly 
                        />
                      </Card>
                    </div>
                  </>
                ) : (
                  <Text>请先选择或创建一个Prompt</Text>
                )}
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab={<span><BookOutlined /> 最佳实践</span>} key="best-practices">
            <Card style={{ height: '100%' }}>
              <div style={{ height: '100%', overflow: 'auto' }}>
                <Title level={4}>Prompt工程最佳实践</Title>
                
                <Collapse defaultActiveKey={['1']}>
                  <Panel header="明确指令" key="1">
                    <ul>
                      <li>使用明确、具体的指令</li>
                      <li>避免模糊或含糊不清的表述</li>
                      <li>指定输出格式和长度</li>
                    </ul>
                  </Panel>
                  <Panel header="提供上下文" key="2">
                    <ul>
                      <li>为模型提供足够的背景信息</li>
                      <li>使用示例来说明期望的输出</li>
                      <li>定义专业术语和概念</li>
                    </ul>
                  </Panel>
                  <Panel header="使用分隔符" key="3">
                    <ul>
                      <li>使用引号、三重引号等分隔输入内容</li>
                      <li>明确区分指令和用户输入</li>
                    </ul>
                  </Panel>
                  <Panel header="结构化Prompt" key="4">
                    <ul>
                      <li>使用有序列表或编号步骤</li>
                      <li>将复杂任务分解为子任务</li>
                      <li>使用标题和小标题组织内容</li>
                    </ul>
                  </Panel>
                  <Panel header="迭代优化" key="5">
                    <ul>
                      <li>通过多次测试优化Prompt</li>
                      <li>分析输出结果并调整Prompt</li>
                      <li>记录有效的Prompt模式</li>
                    </ul>
                  </Panel>
                </Collapse>
                
                <Divider />
                
                <Title level={5}>常用Prompt模式</Title>
                
                // ... existing code ...
                <Card size="small" title="零样本学习 (Zero-shot)" style={{ marginBottom: 16 }}>
                  <Text>直接给出任务指令，不提供示例</Text>
                  <Paragraph code style={{ marginTop: 8 }}>
                    {"将以下文本翻译成法语：\{text\}"}
                  </Paragraph>
                </Card>
                
                <Card size="small" title="少样本学习 (Few-shot)" style={{ marginBottom: 16 }}>
                  <Text>提供少量示例，然后给出任务</Text>
                  <Paragraph code style={{ marginTop: 8 }}>
                    {"示例： 输入：今天天气很好 输出：Positive"}
                    <br />
                    {"示例： 输入：这个产品很糟糕 输出：Negative"}
                    <br />
                    {"请判断以下文本的情感倾向：\{text\}"}
                  </Paragraph>
                </Card>
// ... existing code ...
                
                <Card size="small" title="链式思考 (Chain-of-Thought)">
                  <Text>引导模型逐步推理</Text>
                  <Paragraph code style={{ marginTop: 8 }}>
                    问题：小明有5个苹果，吃了2个，又买了3个，现在有多少个？
                    <br />
                    让我们一步步思考：
                    <br />
                    1. 小明开始有5个苹果
                    <br />
                    2. 吃了2个，剩下5-2=3个
                    <br />
                    3. 又买了3个，现在有3+3=6个
                    <br />
                    答案：小明现在有6个苹果
                  </Paragraph>
                </Card>
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab={<span><HistoryOutlined /> 执行历史</span>} key="history">
            <Card style={{ height: '100%' }}>
              <div style={{ height: '100%', overflow: 'auto' }}>
                <Title level={4}>执行历史</Title>
                
                <Table
                  dataSource={executionHistory}
                  columns={[
                    {
                      title: 'Prompt名称',
                      dataIndex: 'promptName',
                      key: 'promptName',
                    },
                    {
                      title: '执行时间',
                      dataIndex: 'timestamp',
                      key: 'timestamp',
                    },
                    {
                      title: '结果预览',
                      dataIndex: 'result',
                      key: 'result',
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: (_, record) => (
                        <Button 
                          type="link" 
                          icon={<CopyOutlined />}
                          onClick={() => handleCopyToClipboard(record.result)}
                        >
                          复制
                        </Button>
                      ),
                    },
                  ]}
                  pagination={false}
                  rowKey="id"
                />
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default PromptEngineering;