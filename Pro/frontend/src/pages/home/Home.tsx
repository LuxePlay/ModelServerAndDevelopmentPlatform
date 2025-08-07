// src/pages/home/Home.tsx

import type { ReactElement } from 'react';
import { Layout, Card, Row, Col, Statistic, Progress } from 'antd';
import { 
  DatabaseOutlined, 
  ApiOutlined, 
  FileTextOutlined,
  UserOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import './Home.css';

const { Content } = Layout;

const Home =():ReactElement => {
  return (
    <Content className="home-content">
      <div className="dashboard-header">
        <h1>平台概览</h1>
        <p>欢迎使用大模型服务平台</p>
      </div>
      
      <Row gutter={16} className="stats-row">
        <Col span={6}>
          <Card>
            <Statistic
              title="模型数量"
              value={12}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="应用数量"
              value={8}
              prefix={<ApiOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="数据集"
              value={24}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户数"
              value={128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={16} className="charts-row">
        <Col span={16}>
          <Card title="资源使用情况" extra={<BarChartOutlined />}>
            <div className="chart-placeholder">
              <Progress percent={70} status="active" />
              <p>CPU 使用率</p>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="最新动态">
            <ul className="activity-list">
              <li>模型 "text-davinci-003" 部署成功</li>
              <li>数据集 "customer_reviews" 上传完成</li>
              <li>应用 "智能客服" 访问量突破1万</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Home;