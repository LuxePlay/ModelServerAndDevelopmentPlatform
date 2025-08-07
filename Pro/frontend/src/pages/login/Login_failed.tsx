// 登录失败页面
// src/pages/login/LoginFailure.tsx
import { useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, Radio, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginFailure = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从location state获取错误信息，如果没有则使用默认信息
  const errorMessage = location.state?.errorMessage || '登录失败，请检查您的用户名和密码。';

  const onFinish = (values: { username: string; password: string; role: string }) => {
    setLoading(true);
    
    // 模拟登录验证过程
    setTimeout(() => {
      setLoading(false);
      
      // 简单的验证逻辑 - 在实际应用中应连接到后端API
      if (
        (values.username === 'admin' && values.password === 'admin123') ||
        (values.username === 'user' && values.password === 'user123')
      ) {
        // 根据选择的角色设置权限
        localStorage.setItem('userRole', values.role);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.username);
        localStorage.setItem('token', 'test-token'); // 添加测试token
        
        // 登录成功提示
        message.success('登录成功！');
        
        // 根据角色权限跳转到相应页面
        switch (values.role) {
          case 'super_admin':
            navigate('/');
            break;
          case 'admin':
            navigate('/');
            break;
          case 'user':
            navigate('/training');
            break;
          default:
            navigate('/');
        }
      } else {
        // 登录失败，显示错误信息
        message.error('用户名或密码错误，请重试！');
      }
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 450, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3}>大模型服务平台</Title>
          <Text type="danger" style={{ fontSize: '16px', display: 'block', margin: '10px 0' }}>
            {errorMessage}
          </Text>
          <Text type="secondary">请重新登录</Text>
        </div>
        
        <Form
          name="login_failure_form"
          initialValues={{ role: 'user' }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="权限角色"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
            <Radio.Group>
              <Radio.Button value="super_admin">超级管理员</Radio.Button>
              <Radio.Button value="admin">管理员</Radio.Button>
              <Radio.Button value="user">普通用户</Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%', marginBottom: '10px' }}
            >
              重新登录
            </Button>
            
            <Button 
              onClick={handleBackToLogin}
              style={{ width: '100%' }}
            >
              返回登录页面
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginFailure;