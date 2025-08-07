// 登录中心
// src/pages/login/UserLogin.tsx
import { useState, useRef, useContext } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Tabs, Typography, message, Row, Col, Divider, Spin, Space } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, QrcodeOutlined, WechatOutlined, AlipayOutlined, CrownOutlined, TeamOutlined } from '@ant-design/icons';
import QRCodeGenerator from '../../components/qrcoder/generator.qrcoder';
import { AuthContext } from '../../contexts/AuthContext';

const { Title } = Typography;
const { TabPane } = Tabs;

const UserLogin = (): ReactElement => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('password');
  const [countdown, setCountdown] = useState(0);
  const [wechatQRCode, setWechatQRCode] = useState('');
  const [alipayQRCode, setAlipayQRCode] = useState('');
  const [showWechatQR, setShowWechatQR] = useState(false);
  const [showAlipayQR, setShowAlipayQR] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const mobileFormRef = useRef<any>(null);
  const navigate = useNavigate();

  // 用户名密码登录
   const onFinishPassword = async (values: { username: string; password: string }) => {
    setLoading(true);
    
    try {
      // 检查是否为测试账号
      if (values.username === 'user_test' && values.password === 'user123456') {
        // 设置测试用户权限和认证信息
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.username);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('登录成功！');
        
        // 使用replace而不是navigate，避免用户可以返回到登录页面
        navigate('/training', { replace: true });
        return;
      }
      
      // 检查是否为管理员账号
      if (values.username === 'admin' && values.password === 'admin123') {
        // 设置管理员权限和认证信息
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.username);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('管理员登录成功！');
        
        // 跳转到管理员页面
        navigate('/dashboard', { replace: true });
        return;
      }
      
      // 检查是否为超级管理员账号
      if (values.username === 'super_admin' && values.password === 'super123') {
        // 设置超级管理员权限和认证信息
        localStorage.setItem('userRole', 'super_admin');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.username);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('超级管理员登录成功！');
        
        // 跳转到超级管理员页面
        navigate('/super-admin', { replace: true });
        return;
      }
      
      // 实际项目中这里会调用后端登录接口
      const response = await fetch('/api/auth/login', {
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
        // 设置用户权限和认证信息
        localStorage.setItem('userRole', result.role || 'user');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.username);
        localStorage.setItem('token', result.token);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('登录成功！');
        
        // 根据角色跳转到相应页面
        switch (result.role) {
          case 'super_admin':
            navigate('/super-admin', { replace: true });
            break;
          case 'admin':
            navigate('/dashboard', { replace: true });
            break;
          case 'user':
          default:
            navigate('/training', { replace: true });
        }
      } else {
        message.error(result.message || '用户名或密码错误！');
      }
    } catch (error) {
      message.error('登录过程中发生错误，请稍后重试！');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 手机验证码登录
  const onFinishMobile = async (values: { mobile: string; code: string }) => {
    setLoading(true);
    
    try {
      // 检查是否为测试验证码
      if (values.mobile === '13800000000' && values.code === '123456') {
        // 设置测试用户权限和认证信息
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.mobile);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('登录成功！');
        
        // 使用replace而不是navigate，避免用户可以返回到登录页面
        navigate('/training', { replace: true });
        return;
      }
      
      // 实际项目中这里会调用后端登录接口
      const response = await fetch('/api/auth/mobile-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: values.mobile,
          code: values.code,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.token) {
        // 设置用户权限和认证信息
        localStorage.setItem('userRole', result.role || 'user');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', values.mobile);
        localStorage.setItem('token', result.token);
        setIsAuthenticated(true);
        
        // 登录成功提示
        message.success('登录成功！');
        
        // 根据角色跳转到相应页面
        switch (result.role) {
          case 'super_admin':
            navigate('/super-admin', { replace: true });
            break;
          case 'admin':
            navigate('/dashboard', { replace: true });
            break;
          case 'user':
          default:
            navigate('/training', { replace: true });
        }
      } else {
        message.error(result.message || '手机号或验证码错误！');
      }
    } catch (error) {
      message.error('登录过程中发生错误，请稍后重试！');
      console.error('Mobile login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取验证码
  const handleGetCode = async () => {
    if (countdown > 0) return;
    
    try {
      // 获取表单中的手机号
      const mobile = mobileFormRef.current?.getFieldValue('mobile');
      if (!mobile) {
        message.error('请输入手机号');
        return;
      }
      
      // 验证手机号格式
      const mobileRegex = /^1[3-9]\d{9}$/;
      if (!mobileRegex.test(mobile)) {
        message.error('请输入正确的手机号');
        return;
      }
      
      // 如果是测试手机号，直接开始倒计时
      if (mobile === '13800000000') {
        message.success('测试环境：验证码已发送至您的手机');
        setCountdown(60);
        
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return;
      }
      
      // 实际项目中这里会调用后端接口发送验证码
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: mobile,
        }),
      });

      if (response.ok) {
        message.success('验证码已发送至您的手机');
        setCountdown(60);
        
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        const result = await response.json();
        message.error(result.message || '发送验证码失败');
      }
    } catch (error) {
      message.error('发送验证码过程中发生错误，请稍后重试！');
      console.error('Send code error:', error);
    }
  };

  // 微信扫码登录
  const handleWechatLogin = async () => {
    setQrLoading(true);
    try {
      // 实际项目中这里会调用后端接口获取二维码并轮询登录状态
      // 模拟API调用
      setTimeout(() => {
        setWechatQRCode("https://wechat-login-example.com");
        setShowWechatQR(true);
        setQrLoading(false);
      }, 500);
      
      // 如果使用真实API，取消上面的setTimeout，使用下面的代码：
      /*
      const response = await fetch('/api/auth/wechat-qrcode');
      const result = await response.json();
      
      if (response.ok) {
        setWechatQRCode(result.qrCodeUrl || 'https://wechat-login-example.com');
        setShowWechatQR(true);
      } else {
        message.error(result.message || '获取二维码失败');
      }
      */
    } catch (error) {
      message.error('获取二维码过程中发生错误，请稍后重试！');
      console.error('WeChat login error:', error);
      setQrLoading(false);
    }
  };

  // 支付宝扫码登录
  const handleAlipayLogin = async () => {
    setQrLoading(true);
    try {
      // 实际项目中这里会调用后端接口获取二维码并轮询登录状态
      // 模拟API调用
      setTimeout(() => {
        setAlipayQRCode("https://alipay-login-example.com");
        setShowAlipayQR(true);
        setQrLoading(false);
      }, 500);
      
      // 如果使用真实API，取消上面的setTimeout，使用下面的代码：
      /*
      const response = await fetch('/api/auth/alipay-qrcode');
      const result = await response.json();
      
      if (response.ok) {
        setAlipayQRCode(result.qrCodeUrl || 'https://alipay-login-example.com');
        setShowAlipayQR(true);
      } else {
        message.error(result.message || '获取二维码失败');
      }
      */
    } catch (error) {
      message.error('获取二维码过程中发生错误，请稍后重试！');
      console.error('Alipay login error:', error);
      setQrLoading(false);
    }
  };

  // 重置二维码显示状态
  const resetQRCode = () => {
    setShowWechatQR(false);
    setShowAlipayQR(false);
    setWechatQRCode('');
    setAlipayQRCode('');
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
          <p>欢迎使用平台服务</p>
          {/* 显示测试账号信息 */}
          {activeTab === 'password' && (
            <div style={{ 
              backgroundColor: '#e6f7ff', 
              border: '1px solid #91d5ff', 
              borderRadius: '4px', 
              padding: '8px', 
              marginTop: '10px',
              fontSize: '12px'
            }}>
              <Space direction="vertical">
                <div>测试账号: user_test / user123456</div>
                <div>管理员账号: admin / admin123</div>
                <div>超级管理员: super_admin / super123</div>
              </Space>
            </div>
          )}
          {activeTab === 'mobile' && (
            <div style={{ 
              backgroundColor: '#e6f7ff', 
              border: '1px solid #91d5ff', 
              borderRadius: '4px', 
              padding: '8px', 
              marginTop: '10px',
              fontSize: '12px'
            }}>
              测试手机: 13800000000 / 123456
            </div>
          )}
          {(activeTab === 'superAdmin' || activeTab === 'admin') && (
            <div style={{ 
              backgroundColor: '#e6f7ff', 
              border: '1px solid #91d5ff', 
              borderRadius: '4px', 
              padding: '8px', 
              marginTop: '10px',
              fontSize: '12px'
            }}>
              <Space direction="vertical">
                {activeTab === 'superAdmin' && (
                  <div>超级管理员测试: super_admin / super123</div>
                )}
                {activeTab === 'admin' && (
                  <div>管理员测试: admin / admin123</div>
                )}
              </Space>
            </div>
          )}
        </div>
        <Tabs activeKey={activeTab} onChange={(key) => {
          setActiveTab(key);
          // 切换标签页时重置二维码显示
          if (key !== 'qrcode') {
            resetQRCode();
          }
        }}>
          {/* 用户名密码登录 */}
          <TabPane tab={<span><UserOutlined />账号密码登录</span>} key="password">
            {(activeTab === 'password' || activeTab === 'superAdmin' || activeTab === 'admin') && (
              <div>
                {/* 普通用户登录表单 */}
                {activeTab === 'password' && (
                  <Form
                    name="login_form_password"
                    initialValues={{ username: '', password: '' }}
                    onFinish={onFinishPassword}
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
                    
                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        style={{ width: '100%' }}
                      >
                        登录
                      </Button>
                    </Form.Item>
                    
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                      <Space>
                        <Button 
                          icon={<CrownOutlined />} 
                          onClick={() => navigate('/super-admin')}
                        >
                          超级管理员
                        </Button>
                        <Button 
                          icon={<TeamOutlined />} 
                          onClick={() => navigate('/admin')}
                        >
                          管理员
                        </Button>
                      </Space>
                    </div>

                  </Form>
                )}
                
                {/* 超级管理员登录表单 */}
{/* 超级管理员登录表单 */}
                {activeTab === 'superAdmin' && (
                  <div>
                    <Form
                      name="super_admin_login_form"
                      initialValues={{ username: '', password: '' }}
                      onFinish={onFinishPassword}
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
                      <Button onClick={() => setActiveTab('password')}>
                        返回普通登录
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* 管理员登录表单 */}
                {activeTab === 'admin' && (
                  <div>
                    <Form
                      name="admin_login_form"
                      initialValues={{ username: '', password: '' }}
                      onFinish={onFinishPassword}
                    >
                      <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入管理员用户名!' }]}
                      >
                        <Input 
                          prefix={<UserOutlined />} 
                          placeholder="管理员用户名" 
                        />
                      </Form.Item>
                      
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入管理员密码!' }]}
                      >
                        <Input
                          prefix={<LockOutlined />}
                          type="password"
                          placeholder="管理员密码"
                        />
                      </Form.Item>
                      
                      <Form.Item>
                        <Button 
                          type="primary" 
                          htmlType="submit" 
                          loading={loading}
                          style={{ width: '100%' }}
                        >
                          管理员登录
                        </Button>
                      </Form.Item>
                    </Form>
                    
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                      <Button onClick={() => setActiveTab('password')}>
                        返回普通登录
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabPane>
          
          {/* 手机验证码登录 */}
          <TabPane tab={<span><MobileOutlined />手机验证码登录</span>} key="mobile">
            <Form
              ref={mobileFormRef}
              name="login_form_mobile"
              onFinish={onFinishMobile}
            >
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: '请输入手机号!' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号!' }
                ]}
              >
                <Input 
                  prefix={<MobileOutlined />} 
                  placeholder="请输入手机号" 
                />
              </Form.Item>
              
              <Form.Item
                name="code"
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    <Input
                      prefix={<LockOutlined />}
                      placeholder="验证码"
                    />
                  </Col>
                  <Col span={8}>
                    <Button 
                      onClick={handleGetCode} 
                      disabled={countdown > 0}
                      style={{ width: '100%' }}
                    >
                      {countdown > 0 ? `${countdown}秒后重发` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          {/* 扫码登录 */}
          <TabPane tab={<span><QrcodeOutlined />扫码登录</span>} key="qrcode">
            <div style={{ textAlign: 'center' }}>
              {/* 显示微信二维码 */}
              {showWechatQR ? (
                <div>
                  <div 
                    style={{ 
                      padding: '16px', 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '8px', 
                      marginBottom: '16px'
                    }}
                  >
                    <QRCodeGenerator 
                      value={wechatQRCode} 
                      size={120}
                    />
                    <div style={{ marginTop: '8px' }}>
                      <span>请使用微信扫描二维码登录</span>
                    </div>
                  </div>
                  <Button onClick={resetQRCode} style={{ width: '100%' }}>
                    返回选择登录方式
                  </Button>
                </div>
              ) : showAlipayQR ? (
                /* 显示支付宝二维码 */
                <div>
                  <div 
                    style={{ 
                      padding: '16px', 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '8px', 
                      marginBottom: '16px'
                    }}
                  >
                    <QRCodeGenerator 
                      value={alipayQRCode} 
                      size={120}
                    />
                    <div style={{ marginTop: '8px' }}>
                      <span>请使用支付宝扫描二维码登录</span>
                    </div>
                  </div>
                  <Button onClick={resetQRCode} style={{ width: '100%' }}>
                    返回选择登录方式
                  </Button>
                </div>
              ) : qrLoading ? (
                /* 显示加载状态 */
                <div style={{ padding: '40px 0' }}>
                  <Spin size="large" />
                  <div style={{ marginTop: '16px' }}>二维码生成中...</div>
                </div>
              ) : (
                /* 显示选择登录方式 */
                <div>
                  <Row gutter={24} justify="center">
                    <Col span={12} style={{ textAlign: 'center' }}>
                      <div 
                        style={{ 
                          padding: '16px', 
                          border: '1px solid #d9d9d9', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          marginBottom: '16px'
                        }}
                        onClick={handleWechatLogin}
                      >
                        <WechatOutlined style={{ fontSize: '48px', color: '#07c160' }} />
                        <div style={{ marginTop: '8px' }}>
                          <span>微信登录</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={12} style={{ textAlign: 'center' }}>
                      <div 
                        style={{ 
                          padding: '16px', 
                          border: '1px solid #d9d9d9', 
                          borderRadius: '8px', 
                          cursor: 'pointer'
                        }}
                        onClick={handleAlipayLogin}
                      >
                        <AlipayOutlined style={{ fontSize: '48px', color: '#1677ff' }} />
                        <div style={{ marginTop: '8px' }}>
                          <span>支付宝登录</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  <Divider>其他方式登录</Divider>
                  
                  <div style={{ marginTop: '16px' }}>
                    <Button 
                      onClick={() => setActiveTab('password')}
                      style={{ width: '100%' }}
                    >
                      返回账号登录
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserLogin;