//用户中心
// 用户中心
import { useState, useEffect, type ReactElement } from 'react';

import { Card, Button, Form, Input, message, Typography, Divider, Row, Col, Avatar, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, UploadOutlined, EditOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;

const UserCenter = ():ReactElement => {

  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // 获取用户信息
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    // 模拟从localStorage或后端获取用户信息
    const username = localStorage.getItem('username') || '默认用户';
    const email = localStorage.getItem('userEmail') || 'user@example.com';
    const phone = localStorage.getItem('userPhone') || '138****8888';
    
    const userInfoData = {
      username,
      email,
      phone,
      department: 'AI研发部',
      studentId: 'STU2025001',
      realName: '张三'
    };
    
    setUserInfo(userInfoData);
    form.setFieldsValue(userInfoData);
  };

  const handleUpdateProfile = async (values: any) => {
    setLoading(true);
    try {
      // 模拟更新用户信息
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userPhone', values.phone);
      
      message.success('个人信息更新成功');
      fetchUserInfo();
    } catch (error) {
      message.error('更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次输入的新密码不一致');
      return;
    }
    
    setLoading(true);
    try {
      // 模拟修改密码
      message.success('密码修改成功');
      form.resetFields(['oldPassword', 'newPassword', 'confirmPassword']);
    } catch (error) {
      message.error('密码修改失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeAvatar = (info: any) => {
    if (info.file.status === 'done') {
      // 模拟上传成功
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
      message.success('头像上传成功');
    } else if (info.file.status === 'error') {
      message.error('头像上传失败，请稍后重试');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>个人中心</Title>
      
      <Row gutter={24}>
        {/* 左侧用户信息卡片 */}
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                src={avatarUrl} 
                style={{ marginBottom: '16px' }}
              />
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChangeAvatar}
              >
                <Button icon={<UploadOutlined />}>更换头像</Button>
              </Upload>
            </div>
            
            <Divider />
            
            <div style={{ textAlign: 'center' }}>
              <Text strong>基本信息</Text>
              <div style={{ marginTop: '12px' }}>
                <p><UserOutlined /> 用户名: {userInfo?.username || '默认用户'}</p>
                <p><MailOutlined /> 邮箱: {userInfo?.email || '暂无'}</p>
                <p><PhoneOutlined /> 手机: {userInfo?.phone || '暂无'}</p>
              </div>
            </div>
          </Card>
        </Col>
        
        {/* 右侧表单区域 */}
        <Col span={16}>
          <Card title="个人信息" extra={<EditOutlined />}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdateProfile}
            >
              <Form.Item
                label="真实姓名"
                name="realName"
              >
                <Input placeholder="请输入真实姓名" disabled />
              </Form.Item>
              
              <Form.Item
                label="学号/工号"
                name="studentId"
              >
                <Input placeholder="学号/工号" disabled />
              </Form.Item>
              
              <Form.Item
                label="所属部门"
                name="department"
              >
                <Input placeholder="所属部门" disabled />
              </Form.Item>
              
              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
              
              <Form.Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: '请输入手机号' }]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  更新信息
                </Button>
              </Form.Item>
            </Form>
          </Card>
          
          <Card title="修改密码" style={{ marginTop: '24px' }} extra={<LockOutlined />}>
            <Form
              layout="vertical"
              onFinish={handleUpdatePassword}
            >
              <Form.Item
                label="原密码"
                name="oldPassword"
                rules={[{ required: true, message: '请输入原密码' }]}
              >
                <Input.Password placeholder="请输入原密码" />
              </Form.Item>
              
              <Form.Item
                label="新密码"
                name="newPassword"
                rules={[{ required: true, message: '请输入新密码' }, { min: 6, message: '密码长度至少6位' }]}
              >
                <Input.Password placeholder="请输入新密码" />
              </Form.Item>
              
              <Form.Item
                label="确认新密码"
                name="confirmPassword"
                rules={[{ required: true, message: '请确认新密码' }]}
              >
                <Input.Password placeholder="请再次输入新密码" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  修改密码
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserCenter;