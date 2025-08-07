// ... existing code ...
import { useState, useEffect, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  message, 
  Table, 
  Modal, 
  Popconfirm,
  Space,
  Row,
  Col,
  Divider,
  Tree
} from 'antd';
import { UserOutlined, LockOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { routes } from '../../routes/routesConfig';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
  allowedRoutes?: string[]; // 添加允许的路由路径
}

// 递归函数将路由转换为树形结构
const convertRoutesToTreeData = (routes: any[], level = 0) => {
  return routes.map(route => {
    const node: any = {
      title: route.label,
      value: route.path,
      key: route.path,
    };
    
    // 如果有子路由，递归处理
    if (route.children && route.children.length > 0) {
      node.children = convertRoutesToTreeData(route.children, level + 1);
    }
    
    return node;
  });
};

const SuperAdminManager = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isRouteConfigModalVisible, setIsRouteConfigModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [routeConfigForm] = Form.useForm();
  
  const navigate = useNavigate();

  // 模拟获取管理员列表
  const fetchAdminUsers = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      // 实际项目中这里会调用后端接口获取管理员列表
      const mockData: AdminUser[] = [
        {
          id: '1',
          username: 'admin1',
          email: 'admin1@example.com',
          createdAt: '2023-01-15',
          lastLogin: '2023-10-20',
          allowedRoutes: ['/dashboard', '/training', '/dataset']
        },
        {
          id: '2',
          username: 'admin2',
          email: 'admin2@example.com',
          createdAt: '2023-02-20',
          lastLogin: '2023-10-19',
          allowedRoutes: ['/dashboard', '/development_doc']
        },
        {
          id: '3',
          username: 'admin3',
          email: 'admin3@example.com',
          createdAt: '2023-03-10',
          allowedRoutes: ['/dashboard']
        }
      ];
      setAdminUsers(mockData);
    } catch (error) {
      message.error('获取管理员列表失败');
      console.error('Fetch admin users error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const handleAddAdmin = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditAdmin = (user: AdminUser) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDeleteAdmin = async (id: string) => {
    try {
      // 实际项目中这里会调用后端接口删除管理员
      setAdminUsers(prev => prev.filter(user => user.id !== id));
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
      console.error('Delete admin error:', error);
    }
  };

  const handleRouteConfig = (user: AdminUser) => {
    setSelectedUser(user);
    setSelectedRoutes(user.allowedRoutes || []);
    setIsRouteConfigModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingUser) {
        // 编辑管理员
        const updatedUsers = adminUsers.map(user => 
          user.id === editingUser.id 
            ? { ...user, ...values } 
            : user
        );
        setAdminUsers(updatedUsers);
        message.success('更新成功');
      } else {
        // 添加新管理员
        const newUser: AdminUser = {
          id: Date.now().toString(),
          username: values.username,
          email: values.email,
          createdAt: new Date().toISOString().split('T')[0],
          allowedRoutes: []
        };
        setAdminUsers(prev => [...prev, newUser]);
        message.success('添加成功');
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validate failed:', error);
    }
  };

  const handleRouteConfigOk = async () => {
    try {
      if (selectedUser) {
        // 更新用户允许的路由
        const updatedUsers = adminUsers.map(user => 
          user.id === selectedUser.id 
            ? { ...user, allowedRoutes: selectedRoutes } 
            : user
        );
        setAdminUsers(updatedUsers);
        message.success('路由配置已更新');
      }
      
      setIsRouteConfigModalVisible(false);
      routeConfigForm.resetFields();
    } catch (error) {
      console.error('Route config failed:', error);
      message.error('路由配置更新失败');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleRouteConfigCancel = () => {
    setIsRouteConfigModalVisible(false);
    routeConfigForm.resetFields();
  };

  const onRouteTreeCheck = (checkedKeys: any) => {
    setSelectedRoutes(checkedKeys);
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AdminUser) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEditAdmin(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            type="primary" 
            onClick={() => handleRouteConfig(record)}
            size="small"
          >
            路由配置
          </Button>
          <Popconfirm
            title="确定要删除这个管理员吗？"
            onConfirm={() => handleDeleteAdmin(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />}
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 转换路由为树形结构
  const treeData = convertRoutesToTreeData(routes.filter(route => route.path !== '/login' && route.path !== '/super-admin' && route.path !== '/super-admin/manager'));

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: '90%', maxWidth: 1200, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>

        <Divider>管理员账号管理</Divider>
        
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddAdmin}
            >
              添加管理员
            </Button>
          </Col>
        </Row>
        
        <Table 
          dataSource={adminUsers} 
          columns={columns} 
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
        />
        
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={() => navigate('/login')}>
            返回管理页面
          </Button>
        </div>
      </Card>
      
      <Modal
        title={editingUser ? "编辑管理员" : "添加管理员"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          
          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
          )}
        </Form>
      </Modal>

      <Modal
        title={`路由配置 - ${selectedUser?.username}`}
        open={isRouteConfigModalVisible}
        onOk={handleRouteConfigOk}
        onCancel={handleRouteConfigCancel}
        okText="确定"
        cancelText="取消"
        width={600}
      >
        <Form
          form={routeConfigForm}
          layout="vertical"
        >
          <Form.Item label="可访问的路由">
            <Tree
              checkable
              treeData={treeData}
              checkedKeys={selectedRoutes}
              onCheck={onRouteTreeCheck}
              defaultExpandAll
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SuperAdminManager;