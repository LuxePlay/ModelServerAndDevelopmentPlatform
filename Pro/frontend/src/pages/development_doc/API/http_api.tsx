// HTTP API 文档
import { useState } from 'react';
import type { ReactElement } from 'react';
import { 
  Card, 
  Typography, 
 
  Space, 
  Divider, 


  Button, 
  message,
  Row,
  Col,
  Descriptions,
  Table,
  Alert,
  Anchor
} from 'antd';
// ... existing code ...
import { 
  CopyOutlined, 
  CheckCircleOutlined,
  ApiOutlined,
} from '@ant-design/icons';
// ... existing code ...

const { Title, Paragraph, Text } = Typography;

const HttpApi = (): ReactElement => {
  const [copied, setCopied] = useState<string | null>(null);
  
  // 复制到剪贴板功能
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    message.success('已复制到剪贴板');
    setTimeout(() => setCopied(null), 2000);
  };

  // API分类

  // Chat Completion API
  const chatCompletionEndpoint = {
    method: 'POST',
    path: '/api/v1/chat/completions',
    description: '创建聊天完成请求，与大语言模型进行对话交互'
  };

  const chatCompletionParams = [
    { name: 'model', type: 'string', required: true, description: '要使用的模型ID' },
    { name: 'messages', type: 'array', required: true, description: '对话消息历史' },
    { name: 'temperature', type: 'number', required: false, description: '采样温度，控制输出随机性，范围0-2，默认1' },
    { name: 'top_p', type: 'number', required: false, description: '核采样参数，范围0-1，默认1' },
    { name: 'n', type: 'integer', required: false, description: '为每条输入消息生成多少个聊天完成选项，默认1' },
    { name: 'stream', type: 'boolean', required: false, description: '是否启用流式输出，默认false' },
    { name: 'stop', type: 'string/array', required: false, description: '停止生成的标识符' },
    { name: 'max_tokens', type: 'integer', required: false, description: '生成的最大token数' },
    { name: 'presence_penalty', type: 'number', required: false, description: '存在惩罚，范围-2.0到2.0，默认0' },
    { name: 'frequency_penalty', type: 'number', required: false, description: '频率惩罚，范围-2.0到2.0，默认0' },
    { name: 'user', type: 'string', required: false, description: '用户唯一标识符，用于内容审核' }
  ];

  const chatCompletionResponse = [
    { name: 'id', type: 'string', description: '响应ID' },
    { name: 'object', type: 'string', description: '对象类型' },
    { name: 'created', type: 'integer', description: '创建时间戳' },
    { name: 'model', type: 'string', description: '使用的模型ID' },
    { name: 'choices', type: 'array', description: '生成结果列表' },
    { name: 'usage', type: 'object', description: 'token使用情况' }
  ];

  // Embeddings API
  const embeddingsEndpoint = {
    method: 'POST',
    path: '/api/v1/embeddings',
    description: '将文本转换为向量表示'
  };

  const embeddingsParams = [
    { name: 'model', type: 'string', required: true, description: '要使用的模型ID' },
    { name: 'input', type: 'string/array', required: true, description: '输入文本或文本数组' },
    { name: 'user', type: 'string', required: false, description: '用户唯一标识符' }
  ];

  // Models API
  const modelsEndpoints = [
    {
      method: 'GET',
      path: '/api/v1/models',
      description: '列出所有可用模型'
    },
    {
      method: 'GET',
      path: '/api/v1/models/{model_id}',
      description: '获取指定模型的详细信息'
    },
    {
      method: 'DELETE',
      path: '/api/v1/models/{model_id}',
      description: '删除指定微调模型'
    }
  ];

  // Files API
  const filesEndpoints = [
    {
      method: 'POST',
      path: '/api/v1/files',
      description: '上传文件'
    },
    {
      method: 'GET',
      path: '/api/v1/files',
      description: '列出文件'
    },
    {
      method: 'GET',
      path: '/api/v1/files/{file_id}',
      description: '获取文件信息'
    },
    {
      method: 'DELETE',
      path: '/api/v1/files/{file_id}',
      description: '删除文件'
    },
    {
      method: 'GET',
      path: '/api/v1/files/{file_id}/content',
      description: '获取文件内容'
    }
  ];

  // Fine-tuning API
  const fineTuningEndpoints = [
    {
      method: 'POST',
      path: '/api/v1/fine-tuning/jobs',
      description: '创建微调任务'
    },
    {
      method: 'GET',
      path: '/api/v1/fine-tuning/jobs',
      description: '列出微调任务'
    },
    {
      method: 'GET',
      path: '/api/v1/fine-tuning/jobs/{fine_tuning_job_id}',
      description: '获取微调任务信息'
    },
    {
      method: 'POST',
      path: '/api/v1/fine-tuning/jobs/{fine_tuning_job_id}/cancel',
      description: '取消微调任务'
    },
    {
      method: 'GET',
      path: '/api/v1/fine-tuning/jobs/{fine_tuning_job_id}/events',
      description: '获取微调任务事件'
    }
  ];

  // Moderations API
  const moderationsEndpoint = {
    method: 'POST',
    path: '/api/v1/moderations',
    description: '内容安全审核'
  };

  const moderationsParams = [
    { name: 'input', type: 'string/array', required: true, description: '要审核的输入文本' },
    { name: 'model', type: 'string', required: false, description: '审核模型，默认text-moderation-latest' }
  ];

  // 代码示例
  const chatCompletionExample = `curl -X POST "https://api.example.com/api/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
  "model": "qwen-7b",
  "messages": [
    {
      "role": "system",
      "content": "你是一个有帮助的助手。"
    },
    {
      "role": "user",
      "content": "介绍一下人工智能的发展历程"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}'`;

  const chatCompletionResponseExample = `{
  "id": "chatcmpl-123456",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "qwen-7b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "人工智能的发展历程可以分为以下几个阶段：\\n\\n1. 萌芽期（1950年代以前）：...\\n2. 黄金期（1950-1970年代）：...\\n3. 第一次AI寒冬（1970年代-1980年代初）：...\\n4. 专家系统时期（1980年代）：...\\n5. 第二次AI寒冬（1980年代末-1990年代初）：...\\n6. 机器学习兴起（1990年代-2000年代）：...\\n7. 深度学习时代（2000年代至今）：..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 320,
    "total_tokens": 345
  }
}`;

  const embeddingsExample = `curl -X POST "https://api.example.com/api/v1/embeddings" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
  "model": "text-embedding-ada-002",
  "input": "人工智能是计算机科学的一个分支"
}'`;

  const embeddingsResponseExample = `{
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
}`;

  const modelsExample = `curl -X GET "https://api.example.com/api/v1/models" \\
  -H "Authorization: Bearer YOUR_API_KEY"`;

  const modelsResponseExample = `{
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
    },
    {
      "id": "text-embedding-ada-002",
      "object": "model",
      "created": 1677610602,
      "owned_by": "system"
    }
  ]
}`;

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>
          <ApiOutlined /> HTTP API 文档
        </Title>
        <Paragraph>
          本文档详细介绍了大模型服务与应用开发平台提供的所有 HTTP API 接口。
        </Paragraph>
        
        <Alert 
          message="认证说明" 
          description="所有 API 请求都需要在 HTTP Header 中包含认证信息：Authorization: Bearer <YOUR_API_KEY>" 
          type="info" 
          showIcon 
          style={{ marginBottom: '24px' }}
        />
        
        <Row gutter={24}>
          <Col span={18}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={3}>API 概览</Title>
              <Paragraph>
                我们的 API 遵循 RESTful 设计原则，支持 JSON 格式的请求和响应。所有 API 端点都使用 HTTPS 协议以确保数据安全。
              </Paragraph>
              
              <Divider />
              
              <Title level={3} id="chat">Chat Completions</Title>
              <Paragraph>
                与大语言模型进行对话交互，生成自然语言响应。
              </Paragraph>
              
              <Card size="small">
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="方法">{chatCompletionEndpoint.method}</Descriptions.Item>
                  <Descriptions.Item label="路径">{chatCompletionEndpoint.path}</Descriptions.Item>
                  <Descriptions.Item label="描述">{chatCompletionEndpoint.description}</Descriptions.Item>
                </Descriptions>
              </Card>
              
              <Title level={5}>请求参数</Title>
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
              
              <Title level={5}>响应参数</Title>
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
              
              <Title level={5}>请求示例</Title>
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {chatCompletionExample}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'chat-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(chatCompletionExample, 'chat-example')}
                >
                  {copied === 'chat-example' ? '已复制' : '复制代码'}
                </Button>
              </Card>
              
              <Title level={5}>响应示例</Title>
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {chatCompletionResponseExample}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'chat-response' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(chatCompletionResponseExample, 'chat-response')}
                >
                  {copied === 'chat-response' ? '已复制' : '复制代码'}
                </Button>
              </Card>
              
              <Divider />
              
              <Title level={3} id="embeddings">Embeddings</Title>
              <Paragraph>
                将文本转换为向量表示，用于语义搜索、聚类、推荐等任务。
              </Paragraph>
              
              <Card size="small">
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="方法">{embeddingsEndpoint.method}</Descriptions.Item>
                  <Descriptions.Item label="路径">{embeddingsEndpoint.path}</Descriptions.Item>
                  <Descriptions.Item label="描述">{embeddingsEndpoint.description}</Descriptions.Item>
                </Descriptions>
              </Card>
              
              <Title level={5}>请求参数</Title>
              <Table 
                dataSource={embeddingsParams}
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
              
              <Title level={5}>请求示例</Title>
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {embeddingsExample}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'embeddings-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(embeddingsExample, 'embeddings-example')}
                >
                  {copied === 'embeddings-example' ? '已复制' : '复制代码'}
                </Button>
              </Card>
              
              <Title level={5}>响应示例</Title>
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {embeddingsResponseExample}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'embeddings-response' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(embeddingsResponseExample, 'embeddings-response')}
                >
                  {copied === 'embeddings-response' ? '已复制' : '复制代码'}
                </Button>
              </Card>
              
              <Divider />
              
              <Title level={3} id="models">Models</Title>
              <Paragraph>
                管理和查询可用的模型。
              </Paragraph>
              
              {modelsEndpoints.map((endpoint, index) => (
                <Card size="small" key={index} style={{ marginBottom: '16px' }}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="方法">{endpoint.method}</Descriptions.Item>
                    <Descriptions.Item label="路径">{endpoint.path}</Descriptions.Item>
                    <Descriptions.Item label="描述">{endpoint.description}</Descriptions.Item>
                  </Descriptions>
                </Card>
              ))}
              
              <Title level={5}>请求示例</Title>
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {modelsExample}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'models-example' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(modelsExample, 'models-example')}
                >
                  {copied === 'models-example' ? '已复制' : '复制代码'}
                </Button>
              </Card>
              
              <Title level={5}>响应示例</Title>
              <Card size="small">
                <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
                  {modelsResponseExample}
                </pre>
                <Button 
                  type="primary" 
                  icon={copied === 'models-response' ? <CheckCircleOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(modelsResponseExample, 'models-response')}
                >
                  {copied === 'models-response' ? '已复制' : '复制代码'}
                </Button>
              </Card>
              
              <Divider />
              
              <Title level={3} id="files">Files</Title>
              <Paragraph>
                上传和管理用于微调的文件。
              </Paragraph>
              
              {filesEndpoints.map((endpoint, index) => (
                <Card size="small" key={index} style={{ marginBottom: '16px' }}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="方法">{endpoint.method}</Descriptions.Item>
                    <Descriptions.Item label="路径">{endpoint.path}</Descriptions.Item>
                    <Descriptions.Item label="描述">{endpoint.description}</Descriptions.Item>
                  </Descriptions>
                </Card>
              ))}
              
              <Divider />
              
              <Title level={3} id="fine-tuning">Fine-tuning</Title>
              <Paragraph>
                创建和管理模型微调任务。
              </Paragraph>
              
              {fineTuningEndpoints.map((endpoint, index) => (
                <Card size="small" key={index} style={{ marginBottom: '16px' }}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="方法">{endpoint.method}</Descriptions.Item>
                    <Descriptions.Item label="路径">{endpoint.path}</Descriptions.Item>
                    <Descriptions.Item label="描述">{endpoint.description}</Descriptions.Item>
                  </Descriptions>
                </Card>
              ))}
              
              <Divider />
              
              <Title level={3} id="moderations">Moderations</Title>
              <Paragraph>
                检查内容是否违反使用政策。
              </Paragraph>
              
              <Card size="small">
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="方法">{moderationsEndpoint.method}</Descriptions.Item>
                  <Descriptions.Item label="路径">{moderationsEndpoint.path}</Descriptions.Item>
                  <Descriptions.Item label="描述">{moderationsEndpoint.description}</Descriptions.Item>
                </Descriptions>
              </Card>
              
              <Title level={5}>请求参数</Title>
              <Table 
                dataSource={moderationsParams}
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
          </Col>
          
          <Col span={6}>
            <Card title="API 目录" style={{ position: 'sticky', top: '24px' }}>
              <Anchor offsetTop={80}>
                <Anchor.Link href="#chat" title="Chat Completions" />
                <Anchor.Link href="#embeddings" title="Embeddings" />
                <Anchor.Link href="#models" title="Models" />
                <Anchor.Link href="#files" title="Files" />
                <Anchor.Link href="#fine-tuning" title="Fine-tuning" />
                <Anchor.Link href="#moderations" title="Moderations" />
              </Anchor>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HttpApi;