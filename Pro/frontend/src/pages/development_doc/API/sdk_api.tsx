// Python SDK API 文档
import { useState } from 'react';
import type { ReactElement } from 'react';
import { 
  Card, 
  Typography, 
  Tabs, 
  Space, 
  Divider, 
  Collapse, 
  Button, 
  message,
  Row,
  Col,
  Descriptions,
  Table,
  Alert,
} from 'antd';
import { 
  CopyOutlined, 
  CheckCircleOutlined,
  ApiOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text, Link } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const SdkApi = (): ReactElement => {
  const [copied, setCopied] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // 复制到剪贴板功能
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    message.success('已复制到剪贴板');
    setTimeout(() => setCopied(null), 2000);
  };

  // 安装命令
  const installCommand = 'pip install bigmodel-sdk';
  
  // SDK初始化代码
  const sdkInitCode = `from bigmodel_sdk import BigModelClient

# 使用API密钥初始化客户端
client = BigModelClient(
    api_key="YOUR_API_KEY",
    base_url="https://api.example.com"
)`;

  // 异步客户端初始化
  const asyncSdkInitCode = `import asyncio
from bigmodel_sdk import AsyncBigModelClient

# 使用API密钥初始化异步客户端
client = AsyncBigModelClient(
    api_key="YOUR_API_KEY",
    base_url="https://api.example.com"
)`;

  // Chat Completion API
  const chatCompletionCreateCode = `response = client.chat.completions.create(
  model="qwen-7b",
  messages=[
    {"role": "system", "content": "你是一个有帮助的助手。"},
    {"role": "user", "content": "介绍一下人工智能的发展历程"}
  ],
  temperature=0.7,
  max_tokens=1024,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)`;

  // 流式输出
  const streamExampleCode = `response = client.chat.completions.create(
  model="qwen-7b",
  messages=[
    {"role": "user", "content": "写一篇关于人工智能未来的文章"}
  ],
  stream=True
)

for chunk in response:
  if chunk.choices[0].delta.content:
    print(chunk.choices[0].delta.content, end="", flush=True)`;

  // 异步调用示例
  const asyncExampleCode = `import asyncio

async def async_chat():
  response = await client.chat.completions.create(
    model="qwen-7b",
    messages=[
      {"role": "user", "content": "Python的异步编程有什么优势？"}
    ]
  )
  return response.choices[0].message.content

# 运行异步函数
result = asyncio.run(async_chat())
print(result)`;

  // Embeddings API
  const embeddingsCreateCode = `# 单个文本嵌入
response = client.embeddings.create(
  model="text-embedding-ada-002",
  input="人工智能是计算机科学的一个分支"
)

# 多个文本嵌入
response = client.embeddings.create(
  model="text-embedding-ada-002",
  input=["文本1", "文本2", "文本3"]
)`;

  // Models API
  const modelsListCode = `# 列出所有模型
models = client.models.list()

for model in models.data:
  print(f"模型ID: {model.id}, 创建时间: {model.created}")`;

  const modelsRetrieveCode = `# 获取指定模型信息
model = client.models.retrieve("qwen-7b")
print(f"模型ID: {model.id}, 所有者: {model.owned_by}")`;

  // Files API
  const filesCreateCode = `# 上传文件
with open("training_data.jsonl", "rb") as file:
  uploaded_file = client.files.create(
    file=file,
    purpose="fine-tune"
  )

print(f"文件ID: {uploaded_file.id}")`;

  const filesListCode = `# 列出所有文件
files = client.files.list()
for file in files.data:
  print(f"文件ID: {file.id}, 文件名: {file.filename}")`;

  const filesDeleteCode = `# 删除文件
deleted_file = client.files.delete("file-abc123")
print(f"文件已删除: {deleted_file.deleted}")`;

  // Fine-tuning API
  const fineTuningCreateCode = `# 创建微调任务
fine_tune = client.fine_tuning.jobs.create(
  training_file="file-abc123",
  model="qwen-7b",
  hyperparameters={
    "n_epochs": 2
  }
)

print(f"微调任务ID: {fine_tune.id}")`;

  const fineTuningListCode = `# 列出微调任务
jobs = client.fine_tuning.jobs.list()
for job in jobs.data:
  print(f"任务ID: {job.id}, 状态: {job.status}")`;

  const fineTuningRetrieveCode = `# 获取微调任务信息
job = client.fine_tuning.jobs.retrieve("ft-job-123")
print(f"任务状态: {job.status}, 模型: {job.model}")`;

  // 错误处理示例
  const errorHandlingCode = `from bigmodel_sdk import BigModelError

try:
  response = client.chat.completions.create(
    model="non-existent-model",
    messages=[{"role": "user", "content": "Hello"}]
  )
except BigModelError as e:
  print(f"API错误: {e.status_code} - {e.message}")
except Exception as e:
  print(f"其他错误: {str(e)}")`;

  // API 类和方法定义
  const apiClasses = [
    {
      name: 'BigModelClient',
      description: '用于与大模型服务交互的同步客户端',
      methods: [
        {
          name: '__init__',
          signature: '__init__(self, api_key: str, base_url: str = "https://api.example.com")',
          description: '初始化客户端',
          parameters: [
            { name: 'api_key', type: 'str', description: 'API密钥' },
            { name: 'base_url', type: 'str', description: 'API基础URL' }
          ]
        }
      ]
    },
    {
      name: 'AsyncBigModelClient',
      description: '用于与大模型服务交互的异步客户端',
      methods: [
        {
          name: '__init__',
          signature: '__init__(self, api_key: str, base_url: str = "https://api.example.com")',
          description: '初始化异步客户端',
          parameters: [
            { name: 'api_key', type: 'str', description: 'API密钥' },
            { name: 'base_url', type: 'str', description: 'API基础URL' }
          ]
        }
      ]
    },
    {
      name: 'chat.completions',
      description: '聊天补全相关接口',
      methods: [
        {
          name: 'create',
          signature: 'create(self, *, model: str, messages: List[Dict], temperature: float = None, top_p: float = None, n: int = None, stream: bool = False, stop: Union[str, List[str]] = None, max_tokens: int = None, presence_penalty: float = None, frequency_penalty: float = None, user: str = None) -> Union[ChatCompletion, Iterator[ChatCompletionChunk]]',
          description: '创建聊天补全',
          parameters: [
            { name: 'model', type: 'str', description: '要使用的模型ID' },
            { name: 'messages', type: 'List[Dict]', description: '对话消息历史' },
            { name: 'temperature', type: 'float', description: '采样温度，控制输出随机性，范围0-2，默认1' },
            { name: 'top_p', type: 'float', description: '核采样参数，范围0-1，默认1' },
            { name: 'n', type: 'int', description: '为每条输入消息生成多少个聊天完成选项，默认1' },
            { name: 'stream', type: 'bool', description: '是否启用流式输出，默认False' },
            { name: 'stop', type: 'Union[str, List[str]]', description: '停止生成的标识符' },
            { name: 'max_tokens', type: 'int', description: '生成的最大token数' },
            { name: 'presence_penalty', type: 'float', description: '存在惩罚，范围-2.0到2.0，默认0' },
            { name: 'frequency_penalty', type: 'float', description: '频率惩罚，范围-2.0到2.0，默认0' },
            { name: 'user', type: 'str', description: '用户唯一标识符，用于内容审核' }
          ],
          returns: 'Union[ChatCompletion, Iterator[ChatCompletionChunk]]'
        }
      ]
    },
    {
      name: 'embeddings',
      description: '嵌入向量相关接口',
      methods: [
        {
          name: 'create',
          signature: 'create(self, *, model: str, input: Union[str, List[str]], user: str = None) -> Embedding',
          description: '创建文本嵌入向量',
          parameters: [
            { name: 'model', type: 'str', description: '要使用的模型ID' },
            { name: 'input', type: 'Union[str, List[str]]', description: '输入文本或文本数组' },
            { name: 'user', type: 'str', description: '用户唯一标识符' }
          ],
          returns: 'Embedding'
        }
      ]
    },
    {
      name: 'models',
      description: '模型管理相关接口',
      methods: [
        {
          name: 'list',
          signature: 'list(self) -> ModelList',
          description: '列出所有可用模型',
          parameters: [],
          returns: 'ModelList'
        },
        {
          name: 'retrieve',
          signature: 'retrieve(self, model: str) -> Model',
          description: '获取指定模型信息',
          parameters: [
            { name: 'model', type: 'str', description: '模型ID' }
          ],
          returns: 'Model'
        }
      ]
    },
    {
      name: 'files',
      description: '文件管理相关接口',
      methods: [
        {
          name: 'create',
          signature: 'create(self, file: BinaryIO, purpose: str) -> FileObject',
          description: '上传文件',
          parameters: [
            { name: 'file', type: 'BinaryIO', description: '要上传的文件对象' },
            { name: 'purpose', type: 'str', description: '文件用途（如"fine-tune"）' }
          ],
          returns: 'FileObject'
        },
        {
          name: 'list',
          signature: 'list(self) -> FileList',
          description: '列出文件',
          parameters: [],
          returns: 'FileList'
        },
        {
          name: 'delete',
          signature: 'delete(self, file_id: str) -> DeleteFileResponse',
          description: '删除文件',
          parameters: [
            { name: 'file_id', type: 'str', description: '文件ID' }
          ],
          returns: 'DeleteFileResponse'
        }
      ]
    },
    {
      name: 'fine_tuning.jobs',
      description: '微调任务相关接口',
      methods: [
        {
          name: 'create',
          signature: 'create(self, *, training_file: str, model: str, validation_file: str = None, hyperparameters: Dict = None, suffix: str = None) -> FineTuningJob',
          description: '创建微调任务',
          parameters: [
            { name: 'training_file', type: 'str', description: '训练文件ID' },
            { name: 'model', type: 'str', description: '要微调的模型ID' },
            { name: 'validation_file', type: 'str', description: '验证文件ID' },
            { name: 'hyperparameters', type: 'Dict', description: '超参数设置' },
            { name: 'suffix', type: 'str', description: '微调模型名称后缀' }
          ],
          returns: 'FineTuningJob'
        },
        {
          name: 'list',
          signature: 'list(self) -> FineTuningJobList',
          description: '列出微调任务',
          parameters: [],
          returns: 'FineTuningJobList'
        },
        {
          name: 'retrieve',
          signature: 'retrieve(self, fine_tuning_job_id: str) -> FineTuningJob',
          description: '获取微调任务信息',
          parameters: [
            { name: 'fine_tuning_job_id', type: 'str', description: '微调任务ID' }
          ],
          returns: 'FineTuningJob'
        }
      ]
    }
  ];

  // 返回值字段
  const returnTypeDetails = [
    {
      type: 'ChatCompletion',
      fields: [
        { name: 'id', type: 'str', description: '响应ID' },
        { name: 'object', type: 'str', description: '对象类型' },
        { name: 'created', type: 'int', description: '创建时间戳' },
        { name: 'model', type: 'str', description: '使用的模型ID' },
        { name: 'choices', type: 'List[Choice]', description: '生成结果列表' },
        { name: 'usage', type: 'Usage', description: 'token使用情况' }
      ]
    },
    {
      type: 'Embedding',
      fields: [
        { name: 'object', type: 'str', description: '对象类型' },
        { name: 'data', type: 'List[EmbeddingData]', description: '嵌入向量数据列表' },
        { name: 'model', type: 'str', description: '使用的模型ID' },
        { name: 'usage', type: 'Usage', description: 'token使用情况' }
      ]
    },
    {
      type: 'Model',
      fields: [
        { name: 'id', type: 'str', description: '模型ID' },
        { name: 'object', type: 'str', description: '对象类型' },
        { name: 'created', type: 'int', description: '创建时间戳' },
        { name: 'owned_by', type: 'str', description: '模型所有者' }
      ]
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>
          <ApiOutlined /> Python SDK API 文档
        </Title>
        <Paragraph>
          本文档详细介绍了大模型服务与应用开发平台提供的 Python SDK API 接口。
        </Paragraph>
        
        <Alert 
          message="提示" 
          description={
            <div>
              如需查看 SDK 使用指南，请访问 
              <Button 
                type="link" 
                onClick={() => navigate('/development_doc/sub/sdkDoc')}
                icon={<ArrowRightOutlined />}
              >
                SDK 使用指南
              </Button>
            </div>
          } 
          type="info" 
          showIcon 
          style={{ marginBottom: '24px' }}
        />
        
        <Divider />
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={3}>安装 SDK</Title>
          <Paragraph>
            首先，使用 pip 安装我们的 Python SDK：
          </Paragraph>
          <Card size="small">
            <Paragraph style={{ fontFamily: 'monospace' }}>
              {installCommand}
            </Paragraph>
            <Button 
              type="primary" 
              icon={copied === 'install-command' ? <CheckCircleOutlined /> : <CopyOutlined />}
              onClick={() => copyToClipboard(installCommand, 'install-command')}
              size="small"
            >
              {copied === 'install-command' ? '已复制' : '复制'}
            </Button>
          </Card>
          
          <Title level={3}>SDK 初始化</Title>
          <Tabs defaultActiveKey="sync">
            <TabPane tab="同步客户端" key="sync">
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {sdkInitCode}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'sdk-init' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(sdkInitCode, 'sdk-init')}
                >
                  {copied === 'sdk-init' ? '已复制' : '复制代码'}
                </Button>
              </Card>
            </TabPane>
            <TabPane tab="异步客户端" key="async">
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {asyncSdkInitCode}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'async-sdk-init' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(asyncSdkInitCode, 'async-sdk-init')}
                >
                  {copied === 'async-sdk-init' ? '已复制' : '复制代码'}
                </Button>
              </Card>
            </TabPane>
          </Tabs>
          
          <Divider />
          
          <Title level={3}>API 类参考</Title>
          
          <Collapse>
            {apiClasses.map((apiClass, index) => (
              <Panel header={<Text strong>{apiClass.name}</Text>} key={index}>
                <Paragraph>{apiClass.description}</Paragraph>
                
                <Title level={4}>方法</Title>
                <Collapse>
                  {apiClass.methods.map((method, methodIndex) => (
                    <Panel 
                      header={
                        <Space>
                          <Text code>{method.name}</Text>
                          <Text type="secondary">{method.signature}</Text>
                        </Space>
                      } 
                      key={`${index}-${methodIndex}`}
                    >
                      <Paragraph>{method.description}</Paragraph>
                      
                      {method.parameters.length > 0 && (
                        <>
                          <Title level={5}>参数</Title>
                          <Table
                            dataSource={method.parameters}
                            columns={[
                              {
                                title: '参数名',
                                dataIndex: 'name',
                                key: 'name'
                              },
                              {
                                title: '类型',
                                dataIndex: 'type',
                                key: 'type'
                              },
                              {
                                title: '描述',
                                dataIndex: 'description',
                                key: 'description'
                              }
                            ]}
                            pagination={false}
                            rowKey="name"
                            size="small"
                          />
                        </>
                      )}
                       {(method as any).returns && (
                        <>
                          <Title level={5} style={{ marginTop: 16 }}>返回值</Title>
                          <Paragraph>
                            <Text code>{(method as any).returns}</Text>
                          </Paragraph>
                        </>
                      )}
                      <Title level={5} style={{ marginTop: 16 }}>示例代码</Title>
                      <Card size="small">
                        <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                          {method.name === 'create' && apiClass.name === 'chat.completions' && chatCompletionCreateCode}
                          {method.name === 'create' && apiClass.name === 'embeddings' && embeddingsCreateCode}
                          {method.name === 'list' && apiClass.name === 'models' && modelsListCode}
                          {method.name === 'retrieve' && apiClass.name === 'models' && modelsRetrieveCode}
                          {method.name === 'create' && apiClass.name === 'files' && filesCreateCode}
                          {method.name === 'list' && apiClass.name === 'files' && filesListCode}
                          {method.name === 'delete' && apiClass.name === 'files' && filesDeleteCode}
                          {method.name === 'create' && apiClass.name === 'fine_tuning.jobs' && fineTuningCreateCode}
                          {method.name === 'list' && apiClass.name === 'fine_tuning.jobs' && fineTuningListCode}
                          {method.name === 'retrieve' && apiClass.name === 'fine_tuning.jobs' && fineTuningRetrieveCode}
                        </pre>
                        <Button 
                          type="primary" 
                          icon={copied === `example-${apiClass.name}-${method.name}` ? <CheckCircleOutlined /> : <CopyOutlined />}
                          onClick={() => copyToClipboard(
                            method.name === 'create' && apiClass.name === 'chat.completions' ? chatCompletionCreateCode :
                            method.name === 'create' && apiClass.name === 'embeddings' ? embeddingsCreateCode :
                            method.name === 'list' && apiClass.name === 'models' ? modelsListCode :
                            method.name === 'retrieve' && apiClass.name === 'models' ? modelsRetrieveCode :
                            method.name === 'create' && apiClass.name === 'files' ? filesCreateCode :
                            method.name === 'list' && apiClass.name === 'files' ? filesListCode :
                            method.name === 'delete' && apiClass.name === 'files' ? filesDeleteCode :
                            method.name === 'create' && apiClass.name === 'fine_tuning.jobs' ? fineTuningCreateCode :
                            method.name === 'list' && apiClass.name === 'fine_tuning.jobs' ? fineTuningListCode :
                            method.name === 'retrieve' && apiClass.name === 'fine_tuning.jobs' ? fineTuningRetrieveCode : '',
                            `example-${apiClass.name}-${method.name}`
                          )}
                        >
                          {copied === `example-${apiClass.name}-${method.name}` ? '已复制' : '复制代码'}
                        </Button>
                      </Card>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
          
          <Divider />
          
          <Title level={3}>返回值类型详情</Title>
          
          <Collapse>
            {returnTypeDetails.map((returnType, index) => (
              <Panel header={<Text strong>{returnType.type}</Text>} key={index}>
                <Table
                  dataSource={returnType.fields}
                  columns={[
                    {
                      title: '字段名',
                      dataIndex: 'name',
                      key: 'name'
                    },
                    {
                      title: '类型',
                      dataIndex: 'type',
                      key: 'type'
                    },
                    {
                      title: '描述',
                      dataIndex: 'description',
                      key: 'description'
                    }
                  ]}
                  pagination={false}
                  rowKey="name"
                  size="small"
                />
              </Panel>
            ))}
          </Collapse>
          
          <Divider />
          
          <Title level={3}>流式处理</Title>
          <Card size="small">
            <Paragraph>
              当设置 <Text code>stream=True</Text> 时，API会返回一个迭代器，可以逐块处理响应：
            </Paragraph>
            <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
              {streamExampleCode}
            </pre>
            <Button 
              type="primary" 
              icon={copied === 'stream-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
              onClick={() => copyToClipboard(streamExampleCode, 'stream-example')}
            >
              {copied === 'stream-example' ? '已复制' : '复制代码'}
            </Button>
          </Card>
          
          <Title level={3} style={{ marginTop: 16 }}>异步调用</Title>
          <Card size="small">
            <Paragraph>
              使用异步客户端可以实现非阻塞调用：
            </Paragraph>
            <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
              {asyncExampleCode}
            </pre>
            <Button 
              type="primary" 
              icon={copied === 'async-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
              onClick={() => copyToClipboard(asyncExampleCode, 'async-example')}
            >
              {copied === 'async-example' ? '已复制' : '复制代码'}
            </Button>
          </Card>
          
          <Divider />
          
          <Title level={3}>错误处理</Title>
          <Paragraph>
            SDK使用标准的异常处理机制。所有API错误都会抛出<Text code>BigModelError</Text>异常：
          </Paragraph>
          <Card size="small">
            <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
              {errorHandlingCode}
            </pre>
            <Button 
              type="primary" 
              icon={copied === 'error-handling' ? <CheckCircleOutlined /> : <CopyOutlined />}
              onClick={() => copyToClipboard(errorHandlingCode, 'error-handling')}
            >
              {copied === 'error-handling' ? '已复制' : '复制代码'}
            </Button>
          </Card>
          
          <Title level={4} style={{ marginTop: 16 }}>常见错误码</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Card size="small">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="400 Bad Request">
                    请求参数错误或缺失必要参数
                  </Descriptions.Item>
                  <Descriptions.Item label="401 Unauthorized">
                    缺少有效的 API 密钥或密钥无效
                  </Descriptions.Item>
                  <Descriptions.Item label="404 Not Found">
                    请求的资源不存在
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="429 Too Many Requests">
                    请求过于频繁，超出速率限制
                  </Descriptions.Item>
                  <Descriptions.Item label="500 Internal Server Error">
                    服务器内部错误
                  </Descriptions.Item>
                  <Descriptions.Item label="503 Service Unavailable">
                    服务暂时不可用
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          
          <Divider />
          
          <Title level={3}>最佳实践</Title>
          
          <Collapse>
            <Panel header="性能优化建议" key="1">
              <ul>
                <li>
                  <Text strong>连接复用：</Text>在应用程序中复用客户端实例，避免重复创建连接
                </li>
                <li>
                  <Text strong>合理设置超时：</Text>根据实际需求设置合适的超时时间，避免长时间等待
                </li>
                <li>
                  <Text strong>批量处理：</Text>对于大量数据处理任务，考虑使用批量处理方式
                </li>
                <li>
                  <Text strong>错误重试：</Text>实现合理的重试机制，处理临时性错误
                </li>
              </ul>
            </Panel>
            
            <Panel header="安全建议" key="2">
              <ul>
                <li>
                  <Text strong>密钥管理：</Text>不要将 API 密钥硬编码在代码中，使用环境变量或配置文件
                </li>
                <li>
                  <Text strong>访问控制：</Text>为不同的应用创建不同的 API 密钥，并设置适当的权限
                </li>
                <li>
                  <Text strong>日志记录：</Text>避免在日志中记录敏感信息，如 API 密钥
                </li>
              </ul>
            </Panel>
            
            <Panel header="资源管理" key="3">
              <ul>
                <li>
                  <Text strong>及时清理：</Text>删除不再需要的文件和微调模型，释放资源
                </li>
                <li>
                  <Text strong>监控使用：</Text>定期检查 API 使用情况，避免超出配额
                </li>
              </ul>
            </Panel>
          </Collapse>
          
          <Divider />
          
          <Title level={3}>获取帮助</Title>
          <Paragraph>
            如果在使用 SDK 过程中遇到问题，可以通过以下方式获取帮助：
          </Paragraph>
          <ul>
            <li>
              <Text strong>官方文档：</Text>
              <Link href="https://docs.example.com/sdk/python" target="_blank">
                https://docs.example.com/sdk/python
              </Link>
            </li>
            <li>
              <Text strong>GitHub 仓库：</Text>
              <Link href="https://github.com/example/bigmodel-sdk-python" target="_blank">
                https://github.com/example/bigmodel-sdk-python
              </Link>
            </li>
            <li>
              <Text strong>技术支持：</Text>联系我们的技术支持团队 support@example.com
            </li>
          </ul>
        </Space>
      </Card>
    </div>
  );
};

export default SdkApi;