// ... existing code ...
import { useState, useContext, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';

const { Title } = Typography;

const SuperAdminLogin= ():ReactElement => {

  const [loading, setLoading] = useState(false);
  
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    
    try {
      // 检查是否为测试账号
      if (values.username === 'super_admin' && values.password === 'super123') {
        // 设置超级管理员权限和认证信息
        localStorage.setItem('userRole', 'super_admin');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.username);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('超级管理员登录成功！');
        
        // 跳转到超级管理员页面
        navigate('/super-admin/manager', { replace: true });
        return;
      }
      
      // 实际项目中这里会调用后端登录接口
      const response = await fetch('/api/auth/super-admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.token) {
        // 设置超级管理员权限和认证信息
        localStorage.setItem('userRole', 'super_admin');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.username);
        localStorage.setItem('token', result.token);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('超级管理员登录成功！');
        
        // 跳转到超级管理员面板
        navigate('/super-admin/manager', { replace: true });
      } else {
        message.error(result.message || '用户名或密码错误！');
      }
    } catch (error) {
      message.error('登录过程中发生错误，请稍后重试！');
      console.error('Super admin login error:', error);
    } finally {
      setLoading(false);
    }
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
          <p>超级管理员登录</p>
          <div style={{ 
            backgroundColor: '#e6f7ff', 
            border: '1px solid #91d5ff', 
            borderRadius: '4px', 
            padding: '8px', 
            marginTop: '10px',
            fontSize: '12px'
          }}>
            测试账号: super_admin / super123
          </div>
        </div>
        <Form
          name="super_admin_login_form"
          initialValues={{ username: '', password: '' }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入超级管理员用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="超级管理员用户名" 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入超级管理员密码!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="超级管理员密码"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%' }}
            >
              超级管理员登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={() => navigate('/login')}>
            返回登录页面
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SuperAdminLogin;