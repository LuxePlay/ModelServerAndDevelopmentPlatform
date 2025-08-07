//开发文档中心

import type { ReactElement } from 'react';
import { Card, Typography, Row, Col, Divider, Space } from 'antd';
import { BookOutlined, ApiOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const DevelopmentDoc = (): ReactElement => {
  const navigate = useNavigate();

  const docSections = [
    {
      key: 'guides',
      icon: <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: '使用指南',
      description: '详细的使用教程和示例代码，帮助您快速上手平台功能',
      items: [
        {
          title: 'HTTP示例文档',
          path: '/development_doc/sub/httpDoc',
          description: '通过HTTP API调用平台功能的详细示例和说明'
        },
        {
          title: 'SDK示例文档',
          path: '/development_doc/sub/sdkDoc',
          description: '使用Python SDK调用平台功能的详细示例和说明'
        }
      ]
    },
    {
      key: 'api',
      icon: <ApiOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      title: 'API文档',
      description: '完整的API接口文档，包含参数说明和返回值详解',
      items: [
        {
          title: 'HTTP API接口',
          path: '/development_doc/api/http-api',
          description: '详细的HTTP API接口文档，包含请求参数和响应格式'
        },
        {
          title: 'SDK API接口',
          path: '/development_doc/api/sdk-api',
          description: 'Python SDK的完整API参考文档'
        }
      ]
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>开发文档中心</Title>
        <Paragraph>
          欢迎使用大模型服务与应用开发平台！在这里您可以找到所有关于平台集成和开发的文档资料。
        </Paragraph>
        
        <Divider />
        
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {docSections.map(section => (
            <div key={section.key}>
              <Title level={3}>
                <Space>
                  {section.icon}
                  {section.title}
                </Space>
              </Title>
              <Paragraph>{section.description}</Paragraph>
              
              <Row gutter={[16, 16]}>
                {section.items.map(item => (
                  <Col span={12} key={item.path}>
                    <Card 
                      hoverable 
                      onClick={() => navigate(item.path)}
                      style={{ height: '100%' }}
                    >
                      <Card.Meta
                        title={item.title}
                        description={item.description}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
          
          <Divider />
          
          <Title level={3}>快速开始</Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="1. 获取API密钥" size="small">
                在个人设置中生成您的API密钥
              </Card>
            </Col>
            <Col span={8}>
              <Card title="2. 选择集成方式" size="small">
                根据需要选择HTTP API或SDK方式
              </Card>
            </Col>
            <Col span={8}>
              <Card title="3. 开始开发" size="small">
                参考示例文档和API文档开始集成
              </Card>
            </Col>
          </Row>
          
          <Divider />
          
          <Title level={3}>支持与反馈</Title>
          <Paragraph>
            如果您在集成过程中遇到任何问题，请通过以下方式联系我们：
          </Paragraph>
          <ul>
            <li>技术支持邮箱：support@example.com</li>
            <li>开发者社区：<a href="#">开发者论坛</a></li>
            <li>GitHub仓库：<a href="#">bigmodel-sdk-python</a></li>
          </ul>
        </Space>
      </Card>
    </div>
  );
};

export default DevelopmentDoc;