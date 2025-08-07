// 插件中心

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import {
  Card,
  Typography,
  List,
  Tag,
  Button,
  Input,
  Select,
  Pagination,
  Row,
  Col,
  Modal,
  Form,
  message,
  Tabs
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  StopOutlined,
  DownloadOutlined,
  CloudOutlined,
  AppstoreOutlined,
  SettingOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  category: string;
  creator: string;
  createTime: string;
  updateTime: string;
  tags: string[];
  downloads: number;
  rating: number;
}

const PluginCenter = (): ReactElement => {
  const [activeTab, setActiveTab] = useState('my-plugins');
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [marketPlugins, setMarketPlugins] = useState<Plugin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [form] = Form.useForm();

  // 插件分类
  const categories = [
    '数据处理',
    '自然语言处理',
    '计算机视觉',
    '音频处理',
    '工具集成',
    '模型优化',
    '部署工具',
    '监控分析'
  ];

  // 初始化数据
  useEffect(() => {
    // 模拟我的插件数据
    const myPlugins: Plugin[] = [
      {
        id: 'plugin-001',
        name: '数据清洗工具',
        version: '1.2.0',
        description: '自动化数据清洗和预处理工具，支持多种数据格式',
        status: 'active',
        category: '数据处理',
        creator: '张三',
        createTime: '2024-01-15',
        updateTime: '2024-03-20',
        tags: ['数据清洗', '预处理', '自动化'],
        downloads: 12800,
        rating: 4.5
      },
      {
        id: 'plugin-002',
        name: '文本摘要生成器',
        version: '2.1.3',
        description: '基于大模型的文本摘要生成插件，支持多语言',
        status: 'active',
        category: '自然语言处理',
        creator: '李四',
        createTime: '2024-02-10',
        updateTime: '2024-03-15',
        tags: ['文本摘要', 'NLP', '多语言'],
        downloads: 8500,
        rating: 4.2
      },
      {
        id: 'plugin-003',
        name: '图像识别插件',
        version: '1.0.5',
        description: '基于深度学习的图像识别工具，支持多种图像格式',
        status: 'inactive',
        category: '计算机视觉',
        creator: '王五',
        createTime: '2024-01-25',
        updateTime: '2024-02-28',
        tags: ['图像识别', 'CV', '深度学习'],
        downloads: 5600,
        rating: 4.0
      }
    ];

    // 模拟插件市场数据
    const marketPluginsData: Plugin[] = [
      {
        id: 'market-001',
        name: '情感分析工具',
        version: '3.0.1',
        description: '高级情感分析插件，支持细粒度情感识别',
        status: 'active',
        category: '自然语言处理',
        creator: 'AI Labs',
        createTime: '2024-03-01',
        updateTime: '2024-03-18',
        tags: ['情感分析', 'NLP', '情绪识别'],
        downloads: 21500,
        rating: 4.7
      },
      {
        id: 'market-002',
        name: '模型压缩工具',
        version: '1.5.2',
        description: '模型量化和剪枝工具，显著减小模型体积',
        status: 'active',
        category: '模型优化',
        creator: 'ModelOptimize Inc.',
        createTime: '2024-02-20',
        updateTime: '2024-03-10',
        tags: ['模型压缩', '量化', '剪枝'],
        downloads: 9800,
        rating: 4.3
      },
      {
        id: 'market-003',
        name: '实时监控面板',
        version: '2.3.0',
        description: '实时监控模型性能和资源使用情况',
        status: 'active',
        category: '监控分析',
        creator: 'Monitor Team',
        createTime: '2024-01-30',
        updateTime: '2024-03-05',
        tags: ['监控', '性能分析', '可视化'],
        downloads: 15200,
        rating: 4.6
      },
      {
        id: 'market-004',
        name: 'API网关集成',
        version: '1.1.0',
        description: '快速集成API网关，支持多种认证方式',
        status: 'active',
        category: '工具集成',
        creator: 'API Solutions',
        createTime: '2024-03-10',
        updateTime: '2024-03-22',
        tags: ['API', '网关', '集成'],
        downloads: 7400,
        rating: 4.1
      }
    ];

    setPlugins(myPlugins);
    setMarketPlugins(marketPluginsData);
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const togglePluginStatus = (pluginId: string) => {
    setPlugins(plugins.map(plugin => {
      if (plugin.id === pluginId) {
        return {
          ...plugin,
          status: plugin.status === 'active' ? 'inactive' : 'active'
        };
      }
      return plugin;
    }));
    message.success('插件状态已更新');
  };

  const handleDeletePlugin = (pluginId: string) => {
    setPlugins(plugins.filter(plugin => plugin.id !== pluginId));
    message.success('插件已删除');
  };

  const showModal = (plugin: Plugin) => {
    setSelectedPlugin(plugin);
    form.setFieldsValue(plugin);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (selectedPlugin) {
        // 更新插件信息
        setPlugins(plugins.map(plugin => 
          plugin.id === selectedPlugin.id ? { ...plugin, ...values } : plugin
        ));
        message.success('插件信息已更新');
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPlugin(null);
  };

  const handleInstallPlugin = (plugin: Plugin) => {
    // 模拟安装插件
    const newPlugin: Plugin = {
      ...plugin,
      id: `installed-${plugin.id}`,
      status: 'active',
      createTime: new Date().toISOString().split('T')[0]
    };
    setPlugins([...plugins, newPlugin]);
    message.success(`插件 "${plugin.name}" 安装成功`);
  };

  // 根据搜索和过滤条件筛选插件
  const filterPlugins = (pluginList: Plugin[]) => {
    return pluginList.filter(plugin => {
      const matchesSearch = plugin.name.toLowerCase().includes(searchText.toLowerCase()) || 
                           plugin.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || plugin.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || plugin.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const filteredPlugins = filterPlugins(plugins);
  const filteredMarketPlugins = filterPlugins(marketPlugins);

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="green">已启用</Tag>;
      case 'inactive':
        return <Tag color="red">已停用</Tag>;
      case 'error':
        return <Tag color="orange">错误</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <div className="plugin-center">
      <Card>
        <Title level={3}>
          <AppstoreOutlined /> 插件中心
        </Title>
        <Paragraph type="secondary">
          管理和扩展平台功能的插件系统，通过插件可以增强平台能力。
        </Paragraph>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<span><SettingOutlined /> 我的插件</span>} key="my-plugins">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Search
                      placeholder="搜索插件"
                      allowClear
                      onSearch={handleSearch}
                      enterButton={<SearchOutlined />}
                    />
                  </Col>
                  <Col span={4}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="分类筛选"
                      onChange={handleCategoryFilter}
                      defaultValue="all"
                    >
                      <Option value="all">全部分类</Option>
                      {categories.map(category => (
                        <Option key={category} value={category}>{category}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="状态筛选"
                      onChange={handleStatusFilter}
                      defaultValue="all"
                    >
                      <Option value="all">全部状态</Option>
                      <Option value="active">已启用</Option>
                      <Option value="inactive">已停用</Option>
                      <Option value="error">错误</Option>
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Button type="primary" icon={<PlusOutlined />}>
                      创建插件
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={filteredPlugins}
                renderItem={plugin => (
                  <List.Item>
                    <Card 
                      title={plugin.name}
                      size="small"
                      extra={getStatusTag(plugin.status)}
                      actions={[
                        <Button 
                          type="text" 
                          icon={plugin.status === 'active' ? <StopOutlined /> : <PlayCircleOutlined />}
                          onClick={() => togglePluginStatus(plugin.id)}
                        >
                          {plugin.status === 'active' ? '停用' : '启用'}
                        </Button>,
                        <Button 
                          type="text" 
                          icon={<EditOutlined />}
                          onClick={() => showModal(plugin)}
                        >
                          配置
                        </Button>,
                        <Button 
                          type="text" 
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => handleDeletePlugin(plugin.id)}
                        >
                          删除
                        </Button>
                      ]}
                    >
                      <Paragraph ellipsis={{ rows: 2 }} style={{ minHeight: 44 }}>
                        {plugin.description}
                      </Paragraph>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          版本: {plugin.version} | 作者: {plugin.creator}
                        </Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        {plugin.tags.map(tag => (
                          <Tag key={tag} color="blue">{tag}</Tag>
                        ))}
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
              
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Pagination
                  current={currentPage}
                  total={filteredPlugins.length}
                  pageSize={6}
                  onChange={handlePageChange}
                />
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab={<span><CloudOutlined /> 插件市场</span>} key="market">
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Search
                      placeholder="搜索插件"
                      allowClear
                      onSearch={handleSearch}
                      enterButton={<SearchOutlined />}
                    />
                  </Col>
                  <Col span={4}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="分类筛选"
                      onChange={handleCategoryFilter}
                      defaultValue="all"
                    >
                      <Option value="all">全部分类</Option>
                      {categories.map(category => (
                        <Option key={category} value={category}>{category}</Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </div>
              
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={filteredMarketPlugins}
                renderItem={plugin => (
                  <List.Item>
                    <Card 
                      title={plugin.name}
                      size="small"
                      extra={<Text strong>{plugin.rating} ★</Text>}
                      actions={[
                        <Button 
                          type="primary" 
                          icon={<DownloadOutlined />}
                          onClick={() => handleInstallPlugin(plugin)}
                        >
                          安装
                        </Button>,
                        <Button 
                          type="text" 
                          icon={<InfoCircleOutlined />}
                        >
                          详情
                        </Button>
                      ]}
                    >
                      <Paragraph ellipsis={{ rows: 2 }} style={{ minHeight: 44 }}>
                        {plugin.description}
                      </Paragraph>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          版本: {plugin.version} | 作者: {plugin.creator}
                        </Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          下载量: {plugin.downloads.toLocaleString()} | 更新时间: {plugin.updateTime}
                        </Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        {plugin.tags.map(tag => (
                          <Tag key={tag} color="green">{tag}</Tag>
                        ))}
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
              
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Pagination
                  current={currentPage}
                  total={filteredMarketPlugins.length}
                  pageSize={6}
                  onChange={handlePageChange}
                />
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
      
      <Modal
        title="插件配置"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="插件名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="插件描述">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="category" label="分类">
            <Select>
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="标签">
            <Select mode="tags" placeholder="添加标签">
              {plugins.flatMap(p => p.tags)
                .filter((tag, index, self) => self.indexOf(tag) === index)
                .map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PluginCenter;