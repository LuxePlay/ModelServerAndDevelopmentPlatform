//Http调用示例

import { useState } from 'react';
import type { ReactElement } from 'react';
import { 
  Card, 
  Typography, 
  Tabs, 
  Space, 
  Divider, 
  Collapse, 
  Tag, 
  Button, 
  message,
  Row,
  Col,
  Descriptions,
  Table,
} from 'antd';
import { 
  CopyOutlined, 
  CheckCircleOutlined,
  ApiOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const HttpDoc = (): ReactElement => {
  const [copied, setCopied] = useState<string | null>(null);
  
  // 复制到剪贴板功能
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    message.success('已复制到剪贴板');
    setTimeout(() => setCopied(null), 2000);
  };

  // API端点信息
  const apiEndpoints = [
    {
      id: 'chat-completion',
      name: 'Chat Completion',
      method: 'POST',
      path: '/api/v1/chat/completions',
      description: '与大语言模型进行对话交互'
    },
    {
      id: 'text-embedding',
      name: 'Text Embedding',
      method: 'POST',
      path: '/api/v1/embeddings',
      description: '将文本转换为向量表示'
    },
    {
      id: 'model-list',
      name: 'List Models',
      method: 'GET',
      path: '/api/v1/models',
      description: '获取可用模型列表'
    },
    {
      id: 'model-info',
      name: 'Model Information',
      method: 'GET',
      path: '/api/v1/models/{model_id}',
      description: '获取指定模型的详细信息'
    }
  ];

  // 请求参数表格数据
  const chatCompletionParams = [
    { name: 'model', type: 'string', required: true, description: '要使用的模型ID' },
    { name: 'messages', type: 'array', required: true, description: '对话消息历史' },
    { name: 'temperature', type: 'number', required: false, description: '采样温度，控制输出随机性' },
    { name: 'max_tokens', type: 'integer', required: false, description: '生成的最大token数' },
    { name: 'top_p', type: 'number', required: false, description: '核采样参数' },
    { name: 'stream', type: 'boolean', required: false, description: '是否启用流式输出' }
  ];

  // 响应参数表格数据
  const chatCompletionResponse = [
    { name: 'id', type: 'string', description: '响应ID' },
    { name: 'object', type: 'string', description: '对象类型' },
    { name: 'created', type: 'integer', description: '创建时间戳' },
    { name: 'model', type: 'string', description: '使用的模型ID' },
    { name: 'choices', type: 'array', description: '生成结果列表' },
    { name: 'usage', type: 'object', description: 'token使用情况' }
  ];

  // 代码示例
  const curlExample = `curl -X POST "https://api.example.com/api/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
  "model": "qwen-7b",
  "messages": [
    {
      "role": "user",
      "content": "你好，介绍一下人工智能"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}'`;

  const pythonExample = `import requests

url = "https://api.example.com/api/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "model": "qwen-7b",
    "messages": [
        {
            "role": "user",
            "content": "你好，介绍一下人工智能"
        }
    ],
    "temperature": 0.7,
    "max_tokens": 1024
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`;

  const javascriptExample = `const url = "https://api.example.com/api/v1/chat/completions";
const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
};
const data = {
  "model": "qwen-7b",
  "messages": [
    {
      "role": "user",
      "content": "你好，介绍一下人工智能"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
};

fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

  const responseExample = `{
  "id": "chatcmpl-123456",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "qwen-7b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "人工智能（Artificial Intelligence，简称AI）是计算机科学的一个分支，它试图理解智能的本质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 85,
    "total_tokens": 100
  }
}`;

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>
          <ApiOutlined /> HTTP API 调用示例
        </Title>
        <Paragraph>
          本文档介绍了如何通过 HTTP API 调用大模型服务与应用开发平台提供的各项功能。
        </Paragraph>
        
        <Divider />
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={3}>认证方式</Title>
          <Paragraph>
            所有 API 请求都需要在 HTTP Header 中包含认证信息：
          </Paragraph>
          <Card size="small">
            <Paragraph style={{ fontFamily: 'monospace' }}>
              Authorization: Bearer {'<'}YOUR_API_KEY{'>'}
            </Paragraph>
            <Button 
              type="primary" 
              icon={copied === 'auth-header' ? <CheckCircleOutlined /> : <CopyOutlined />}
              onClick={() => copyToClipboard('Authorization: Bearer <YOUR_API_KEY>', 'auth-header')}
              size="small"
            >
              {copied === 'auth-header' ? '已复制' : '复制'}
            </Button>
          </Card>
          
          <Title level={3}>基础URL</Title>
          <Card size="small">
            <Paragraph style={{ fontFamily: 'monospace' }}>
              https://api.example.com
            </Paragraph>
            <Button 
              type="primary" 
              icon={copied === 'base-url' ? <CheckCircleOutlined /> : <CopyOutlined />}
              onClick={() => copyToClipboard('https://api.example.com', 'base-url')}
              size="small"
            >
              {copied === 'base-url' ? '已复制' : '复制'}
            </Button>
          </Card>
          
          <Title level={3}>API 端点</Title>
          <Table 
            dataSource={apiEndpoints}
            columns={[
              {
                title: '名称',
                dataIndex: 'name',
                key: 'name'
              },
              {
                title: '方法',
                dataIndex: 'method',
                key: 'method',
                render: (method: string) => (
                  <Tag color={method === 'GET' ? 'green' : 'blue'}>{method}</Tag>
                )
              },
              {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
                render: (path: string) => (
                  <Text code>{path}</Text>
                )
              },
              {
                title: '描述',
                dataIndex: 'description',
                key: 'description'
              }
            ]}
            pagination={false}
            rowKey="id"
          />
          
          <Divider />
          
          <Title level={3}>Chat Completion API</Title>
          <Paragraph>
            与大语言模型进行对话交互，生成自然语言响应。
          </Paragraph>
          
          <Tabs defaultActiveKey="1">
            <TabPane tab="请求参数" key="1">
              <Table 
                dataSource={chatCompletionParams}
                columns={[
                  {
                    title: '参数名',
                    dataIndex: 'name',
                    key: 'name',
                    render: (name: string, record: any) => (
                      <Text strong>{name} {record.required && <Text type="danger">*</Text>}</Text>
                    )
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
              />
            </TabPane>
            
            <TabPane tab="响应参数" key="2">
              <Table 
                dataSource={chatCompletionResponse}
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
              />
            </TabPane>
            
            <TabPane tab="请求示例" key="3">
              <Collapse defaultActiveKey={['1']}>
                <Panel header="cURL 示例" key="1">
                  <Card size="small">
                    <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                      {curlExample}
                    </pre>
                    <Button 
                      type="primary" 
                      icon={copied === 'curl-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
                      onClick={() => copyToClipboard(curlExample, 'curl-example')}
                    >
                      {copied === 'curl-example' ? '已复制' : '复制代码'}
                    </Button>
                  </Card>
                </Panel>
                
                <Panel header="Python 示例" key="2">
                  <Card size="small">
                    <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                      {pythonExample}
                    </pre>
                    <Button 
                      type="primary" 
                      icon={copied === 'python-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
                      onClick={() => copyToClipboard(pythonExample, 'python-example')}
                    >
                      {copied === 'python-example' ? '已复制' : '复制代码'}
                    </Button>
                  </Card>
                </Panel>
                
                <Panel header="JavaScript 示例" key="3">
                  <Card size="small">
                    <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                      {javascriptExample}
                    </pre>
                    <Button 
                      type="primary" 
                      icon={copied === 'js-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
                      onClick={() => copyToClipboard(javascriptExample, 'js-example')}
                    >
                      {copied === 'js-example' ? '已复制' : '复制代码'}
                    </Button>
                  </Card>
                </Panel>
              </Collapse>
            </TabPane>
            
            <TabPane tab="响应示例" key="4">
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {responseExample}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'response-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(responseExample, 'response-example')}
                >
                  {copied === 'response-example' ? '已复制' : '复制代码'}
                </Button>
              </Card>
            </TabPane>
          </Tabs>
          
          <Divider />
          
          <Title level={3}>其他API示例</Title>
          
          <Collapse>
            <Panel header="获取模型列表" key="1">
              <Card size="small">
                <Title level={5}>请求</Title>
                <Paragraph>
                  <Text strong>GET</Text> /api/v1/models
                </Paragraph>
                
                <Title level={5}>响应示例</Title>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`{
  "object": "list",
  "data": [
    {
      "id": "qwen-7b",
      "object": "model",
      "created": 1677610602,
      "owned_by": "system"
    },
    {
      "id": "llama-2-13b",
      "object": "model",
      "created": 1677610602,
      "owned_by": "system"
    }
  ]
}`}
                </pre>
              </Card>
            </Panel>
            
            <Panel header="文本嵌入" key="2">
              <Card size="small">
                <Title level={5}>请求</Title>
                <Paragraph>
                  <Text strong>POST</Text> /api/v1/embeddings
                </Paragraph>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`{
  "model": "text-embedding-ada-002",
  "input": "人工智能是计算机科学的一个分支"
}`}
                </pre>
                
                <Title level={5}>响应示例</Title>
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        -0.0028842222,
        // ... 1536个维度的向量
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}`}
                </pre>
              </Card>
            </Panel>
          </Collapse>
          
          <Divider />
          
          <Title level={3}>错误处理</Title>
          <Paragraph>
            API 使用 HTTP 状态码来表示请求的结果。以下是一些常见的错误状态码：
          </Paragraph>
          
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
          
          <Title level={3}>速率限制</Title>
          <Paragraph>
            为保证服务质量，API 对请求频率有一定限制：
          </Paragraph>
          <ul>
            <li>
              <Text strong>免费用户：</Text>每分钟最多 60 次请求
            </li>
            <li>
              <Text strong>付费用户：</Text>根据套餐不同，每分钟最多 1000-10000 次请求
            </li>
          </ul>
          <Paragraph>
            当超过速率限制时，API 将返回 429 状态码。建议在收到 429 响应时实施重试机制。
          </Paragraph>
        </Space>
      </Card>
    </div>
  );
};

export default HttpDoc;