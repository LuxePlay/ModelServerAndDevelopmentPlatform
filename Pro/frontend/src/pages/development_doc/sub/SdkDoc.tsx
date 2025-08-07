//SDK示例文档

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
} from 'antd';
import { 
  CopyOutlined, 
  CheckCircleOutlined,
  ApiOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const SdkDoc = (): ReactElement => {
  const [copied, setCopied] = useState<string | null>(null);
  
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

  // Chat Completion示例
  const chatCompletionCode = `# 简单对话
response = client.chat.completions.create(
    model="qwen-7b",
    messages=[
        {"role": "user", "content": "你好，介绍一下人工智能"}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)`;

  // 流式输出示例
  const streamExampleCode = `# 流式输出
response = client.chat.completions.create(
    model="qwen-7b",
    messages=[
        {"role": "user", "content": "写一篇关于人工智能未来的文章"}
    ],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`;

  // Embedding示例
  const embeddingCode = `# 文本嵌入
response = client.embeddings.create(
    model="text-embedding-ada-002",
    input="人工智能是计算机科学的一个分支"
)

embedding = response.data[0].embedding
print(f"嵌入向量维度: {len(embedding)}")`;

  // 模型列表示例
  const modelListCode = `# 获取模型列表
models = client.models.list()

for model in models.data:
    print(f"模型ID: {model.id}, 创建时间: {model.created}")`;

  // 文件上传示例
  const fileUploadCode = `# 上传文件
with open("training_data.jsonl", "rb") as file:
    uploaded_file = client.files.create(
        file=file,
        purpose="fine-tune"
    )

print(f"文件ID: {uploaded_file.id}")`;

  // 微调示例
  const fineTuneCode = `# 创建微调任务
fine_tune = client.fine_tuning.jobs.create(
    training_file="file-abc123",
    model="qwen-7b"
)

print(f"微调任务ID: {fine_tune.id}")
print(f"状态: {fine_tune.status}")`;

  // 异步调用示例
  const asyncExampleCode = `import asyncio
from bigmodel_sdk import AsyncBigModelClient

async def async_chat():
    client = AsyncBigModelClient(api_key="YOUR_API_KEY")
    
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

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>
          <ApiOutlined /> Python SDK 使用指南
        </Title>
        <Paragraph>
          本文档介绍了如何使用 Python SDK 调用大模型服务与应用开发平台提供的各项功能。
        </Paragraph>
        
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
          <Paragraph>
            在使用 SDK 之前，需要先初始化客户端：
          </Paragraph>
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
          
          <Divider />
          
          <Title level={3}>核心功能示例</Title>
          
          <Tabs defaultActiveKey="1">
            <TabPane tab="Chat Completions" key="1">
              <Card size="small">
                <Title level={5}>基本用法</Title>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {chatCompletionCode}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'chat-completion' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(chatCompletionCode, 'chat-completion')}
                  style={{ marginBottom: '16px' }}
                >
                  {copied === 'chat-completion' ? '已复制' : '复制代码'}
                </Button>
                
                <Title level={5}>流式输出</Title>
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
            </TabPane>
            
            <TabPane tab="Embeddings" key="2">
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {embeddingCode}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'embedding' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(embeddingCode, 'embedding')}
                >
                  {copied === 'embedding' ? '已复制' : '复制代码'}
                </Button>
              </Card>
            </TabPane>
            
            <TabPane tab="Models" key="3">
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {modelListCode}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'model-list' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(modelListCode, 'model-list')}
                >
                  {copied === 'model-list' ? '已复制' : '复制代码'}
                </Button>
              </Card>
            </TabPane>
            
            <TabPane tab="Files & Fine-tuning" key="4">
              <Card size="small" style={{ marginBottom: '16px' }}>
                <Title level={5}>文件上传</Title>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {fileUploadCode}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'file-upload' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(fileUploadCode, 'file-upload')}
                  style={{ marginBottom: '16px' }}
                >
                  {copied === 'file-upload' ? '已复制' : '复制代码'}
                </Button>
                
                <Title level={5}>微调任务</Title>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {fineTuneCode}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'fine-tune' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(fineTuneCode, 'fine-tune')}
                >
                  {copied === 'fine-tune' ? '已复制' : '复制代码'}
                </Button>
              </Card>
            </TabPane>
          </Tabs>
          
          <Divider />
          
          <Title level={3}>高级用法</Title>
          
          <Collapse>
            <Panel header="异步调用" key="1">
              <Card size="small">
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
            </Panel>
            
            <Panel header="错误处理" key="2">
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
            </Panel>
            
            <Panel header="配置选项" key="3">
              <Card size="small">
                <Title level={5}>自定义配置</Title>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
{`# 自定义超时和重试配置
client = BigModelClient(
    api_key="YOUR_API_KEY",
    timeout=30,  # 请求超时时间（秒）
    max_retries=3  # 最大重试次数
)`}
                </pre>
                
                <Title level={5}>代理设置</Title>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
{`# 使用代理
client = BigModelClient(
    api_key="YOUR_API_KEY",
    http_client=httpx.Client(
        proxies={
            "http://": "http://proxy.example.com",
            "https://": "https://proxy.example.com"
        }
    )
)`}
                </pre>
              </Card>
            </Panel>
          </Collapse>
          
          <Divider />
          
          <Title level={3}>API 参考</Title>
          
          <Row gutter={16}>
            <Col span={12}>
              <Card size="small" title="Chat">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="completions.create">
                    创建聊天完成请求
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="Embeddings">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="create">
                    创建文本嵌入
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={12}>
              <Card size="small" title="Models">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="list">
                    列出所有模型
                  </Descriptions.Item>
                  <Descriptions.Item label="retrieve">
                    获取模型详细信息
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="Files">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="create">
                    上传文件
                  </Descriptions.Item>
                  <Descriptions.Item label="list">
                    列出文件
                  </Descriptions.Item>
                  <Descriptions.Item label="delete">
                    删除文件
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={12}>
              <Card size="small" title="Fine-tuning">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="jobs.create">
                    创建微调任务
                  </Descriptions.Item>
                  <Descriptions.Item label="jobs.list">
                    列出微调任务
                  </Descriptions.Item>
                  <Descriptions.Item label="jobs.retrieve">
                    获取微调任务详情
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

export default SdkDoc;