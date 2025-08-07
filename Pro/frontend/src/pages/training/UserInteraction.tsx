//用户体验交互中心

import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { 
  Layout, 
  Menu, 
  Card, 
  Input, 
  Button, 
  Slider, 
  Select, 
  Tabs, 
  Row, 
  Col, 
  Upload, 
  message, 
  List,
  Divider,
  Typography,
  Switch,
  InputNumber,
  Collapse
} from 'antd';
import { 
  MessageOutlined, 
  PictureOutlined, 
  VideoCameraOutlined,
  SettingOutlined,
  UploadOutlined,
  PlayCircleOutlined,
  BulbOutlined,
  ApiOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const UserInteraction = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<'chat' | 'image' | 'video'>('chat');
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  // 配置参数状态
  const [config, setConfig] = useState({
    // 文本生成参数
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1024,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    stopSequences: '',
    systemPrompt: '你是一个有帮助的AI助手',
    
    // 图像识别参数
    imageModel: 'resnet-50',
    confidenceThreshold: 0.8,
    maxDetections: 5,
    objectDetection: true,
    imageDescription: true,
    
    // 视频生成参数
    videoModel: 'diffusion-v1',
    videoQuality: 'medium',
    frameRate: 24,
    motionIntensity: 5,
    seed: 0,
    guidanceScale: 7.5,
    
    // 高级参数
    enableStreaming: true,
    maxRetries: 3,
    timeout: 30
  });

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() === '') return;
    
    // 添加用户消息
    const newMessages = [...chatMessages, { text: chatInput, sender: 'user' }];
    setChatMessages(newMessages);
    setChatInput('');
    
    // 模拟AI回复
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: `这是对"${chatInput}"的回复，使用模型: ${config.model}, temperature=${config.temperature}, maxTokens=${config.maxTokens}`, sender: 'ai' }]);
    }, 1000);
  };

  const handleImageUpload = (file: any) => {
    // 模拟图像识别结果
    setImageResult(`已识别图像内容：这是一个${file.name}文件，使用${config.imageModel}模型识别，置信度阈值${config.confidenceThreshold}，包含丰富的视觉信息。`);
    return false; // 阻止实际上传
  };

  const handleVideoGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟视频生成
    setVideoResult('视频生成中...');
    setTimeout(() => {
      setVideoResult(`视频已生成完成！使用模型: ${config.videoModel}，质量: ${config.videoQuality}，帧率: ${config.frameRate}fps`);
    }, 3000);
  };

  const handleConfigChange = (key: string, value: string | number | boolean) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 示例图像数据
  const exampleImages = [
    { id: 1, name: '自然风景', url: 'https://via.placeholder.com/150x150?text=自然风景' },
    { id: 2, name: '城市建筑', url: 'https://via.placeholder.com/150x150?text=城市建筑' },
    { id: 3, name: '动物世界', url: 'https://via.placeholder.com/150x150?text=动物世界' },
    { id: 4, name: '艺术作品', url: 'https://via.placeholder.com/150x150?text=艺术作品' }
  ];

  const handleExampleImageClick = (imageName: string) => {
    setImageResult(`已识别图像内容：这是"${imageName}"示例图片，使用${config.imageModel}模型识别，包含典型的视觉元素和特征。`);
    message.success(`已识别"${imageName}"图片`);
  };

  // 处理左侧参数配置区的模块点击事件
  const handleConfigModuleClick = (module: 'chat' | 'image' | 'video') => {
    setActiveTab(module);
  };

  return (
    <Layout className="user-interaction-layout" style={{ height: '100vh' }}>
      <Sider width={350} className="config-sider" theme="light">
        <Card title={<Title level={5} style={{ margin: 0 }}><SettingOutlined /> 参数配置</Title>} className="config-card" style={{ height: '100%' }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><BulbOutlined />文本生成</span>} key="1">
              <div 
                className={`config-module-item ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => handleConfigModuleClick('chat')}
                style={{ cursor: 'pointer', padding: '10px', borderRadius: '4px', marginBottom: '10px', backgroundColor: activeTab === 'chat' ? '#e6f7ff' : 'transparent' }}
              >
                <Title level={5} style={{ margin: '0 0 10px 0' }}><MessageOutlined /> 文本对话</Title>
                <div className="config-section">
                  <Text strong>模型选择:</Text>
                  <Select
                    value={config.model}
                    onChange={(value) => handleConfigChange('model', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="gpt-3.5">GPT-3.5</Option>
                    <Option value="gpt-4">GPT-4</Option>
                    <Option value="claude-2">Claude-2</Option>
                    <Option value="llama-2">Llama-2</Option>
                    <Option value="qwen">通义千问</Option>
                    <Option value="chatglm">ChatGLM</Option>
                  </Select>
                </div>
                
                <div className="config-section">
                  <Text strong>Temperature: {config.temperature}</Text>
                  <Slider
                    min={0}
                    max={2}
                    step={0.1}
                    value={config.temperature}
                    onChange={(value) => handleConfigChange('temperature', value)}
                  />
                </div>
                
                <div className="config-section">
                  <Text strong>Max Tokens: {config.maxTokens}</Text>
                  <Slider
                    min={128}
                    max={8192}
                    step={128}
                    value={config.maxTokens}
                    onChange={(value) => handleConfigChange('maxTokens', value)}
                  />
                </div>
              </div>
              
              <div className="config-section">
                <Text strong>Top P: {config.topP}</Text>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={config.topP}
                  onChange={(value) => handleConfigChange('topP', value)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>频率惩罚: {config.frequencyPenalty}</Text>
                <Slider
                  min={-2}
                  max={2}
                  step={0.1}
                  value={config.frequencyPenalty}
                  onChange={(value) => handleConfigChange('frequencyPenalty', value)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>存在惩罚: {config.presencePenalty}</Text>
                <Slider
                  min={-2}
                  max={2}
                  step={0.1}
                  value={config.presencePenalty}
                  onChange={(value) => handleConfigChange('presencePenalty', value)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>系统提示词:</Text>
                <TextArea
                  value={config.systemPrompt}
                  onChange={(e) => handleConfigChange('systemPrompt', e.target.value)}
                  autoSize={{ minRows: 2, maxRows: 4 }}
                />
              </div>
              
              <div className="config-section">
                <Text strong>停止序列:</Text>
                <Input
                  value={config.stopSequences}
                  onChange={(e) => handleConfigChange('stopSequences', e.target.value)}
                  placeholder="输入停止序列，用逗号分隔"
                />
              </div>
            </TabPane>
            
            <TabPane tab={<span><PictureOutlined />图像识别</span>} key="2">
              <div 
                className={`config-module-item ${activeTab === 'image' ? 'active' : ''}`}
                onClick={() => handleConfigModuleClick('image')}
                style={{ cursor: 'pointer', padding: '10px', borderRadius: '4px', marginBottom: '10px', backgroundColor: activeTab === 'image' ? '#e6f7ff' : 'transparent' }}
              >
                <Title level={5} style={{ margin: '0 0 10px 0' }}><PictureOutlined /> 图文识别</Title>
                <div className="config-section">
                  <Text strong>模型选择:</Text>
                  <Select
                    value={config.imageModel}
                    onChange={(value) => handleConfigChange('imageModel', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="resnet-50">ResNet-50</Option>
                    <Option value="vit">Vision Transformer</Option>
                    <Option value="efficientnet">EfficientNet</Option>
                    <Option value="convnext">ConvNeXt</Option>
                    <Option value="yolo-v7">YOLO v7</Option>
                    <Option value="clip">CLIP</Option>
                  </Select>
                </div>
                
                <div className="config-section">
                  <Text strong>置信度阈值: {config.confidenceThreshold}</Text>
                  <Slider
                    min={0}
                    max={1}
                    step={0.05}
                    value={config.confidenceThreshold}
                    onChange={(value) => handleConfigChange('confidenceThreshold', value)}
                  />
                </div>
                
                <div className="config-section">
                  <Text strong>最大检测数: {config.maxDetections}</Text>
                  <Slider
                    min={1}
                    max={20}
                    step={1}
                    value={config.maxDetections}
                    onChange={(value) => handleConfigChange('maxDetections', value)}
                  />
                </div>
              </div>
              
              <div className="config-section">
                <Text strong>启用目标检测:</Text>
                <Switch
                  checked={config.objectDetection}
                  onChange={(checked) => handleConfigChange('objectDetection', checked)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>生成图像描述:</Text>
                <Switch
                  checked={config.imageDescription}
                  onChange={(checked) => handleConfigChange('imageDescription', checked)}
                />
              </div>
            </TabPane>
            
            <TabPane tab={<span><VideoCameraOutlined />视频生成</span>} key="3">
              <div 
                className={`config-module-item ${activeTab === 'video' ? 'active' : ''}`}
                onClick={() => handleConfigModuleClick('video')}
                style={{ cursor: 'pointer', padding: '10px', borderRadius: '4px', marginBottom: '10px', backgroundColor: activeTab === 'video' ? '#e6f7ff' : 'transparent' }}
              >
                <Title level={5} style={{ margin: '0 0 10px 0' }}><VideoCameraOutlined /> 视频生成</Title>
                <div className="config-section">
                  <Text strong>模型选择:</Text>
                  <Select
                    value={config.videoModel}
                    onChange={(value) => handleConfigChange('videoModel', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="diffusion-v1">Diffusion Model v1</Option>
                    <Option value="diffusion-v2">Diffusion Model v2</Option>
                    <Option value="gan-v1">GAN v1</Option>
                    <Option value="autoencoder-v1">Autoencoder v1</Option>
                    <Option value="sdxl">SDXL</Option>
                    <Option value="animate">AnimateDiff</Option>
                  </Select>
                </div>
                
                <div className="config-section">
                  <Text strong>视频质量:</Text>
                  <Select
                    value={config.videoQuality}
                    onChange={(value) => handleConfigChange('videoQuality', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="low">低</Option>
                    <Option value="medium">中</Option>
                    <Option value="high">高</Option>
                    <Option value="ultra">超高</Option>
                  </Select>
                </div>
                
                <div className="config-section">
                  <Text strong>帧率: {config.frameRate}fps</Text>
                  <Slider
                    min={10}
                    max={60}
                    step={1}
                    value={config.frameRate}
                    onChange={(value) => handleConfigChange('frameRate', value)}
                  />
                </div>
              </div>
              
              <div className="config-section">
                <Text strong>运动强度: {config.motionIntensity}</Text>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={config.motionIntensity}
                  onChange={(value) => handleConfigChange('motionIntensity', value)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>引导系数: {config.guidanceScale}</Text>
                <Slider
                  min={1}
                  max={20}
                  step={0.5}
                  value={config.guidanceScale}
                  onChange={(value) => handleConfigChange('guidanceScale', value)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>随机种子:</Text>
                <InputNumber
                  value={config.seed}
                  onChange={(value) => handleConfigChange('seed', value || 0)}
                  style={{ width: '100%' }}
                />
              </div>
            </TabPane>
            
            <TabPane tab={<span><ApiOutlined />高级配置</span>} key="4">
              <div className="config-section">
                <Text strong>启用流式输出:</Text>
                <Switch
                  checked={config.enableStreaming}
                  onChange={(checked) => handleConfigChange('enableStreaming', checked)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>最大重试次数: {config.maxRetries}</Text>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={config.maxRetries}
                  onChange={(value) => handleConfigChange('maxRetries', value)}
                />
              </div>
              
              <div className="config-section">
                <Text strong>超时时间(秒): {config.timeout}</Text>
                <Slider
                  min={5}
                  max={120}
                  step={5}
                  value={config.timeout}
                  onChange={(value) => handleConfigChange('timeout', value)}
                />
              </div>
              
              <Collapse ghost>
                <Panel header="API密钥配置" key="1">
                  <div className="config-section">
                    <Text strong>API密钥:</Text>
                    <Input.Password placeholder="输入API密钥" />
                  </div>
                  
                  <div className="config-section">
                    <Text strong>自定义端点:</Text>
                    <Input placeholder="输入自定义API端点URL" />
                  </div>
                </Panel>
              </Collapse>
            </TabPane>
          </Tabs>
        </Card>
      </Sider>
      
      <Content className="interaction-content">
        <Card className="interaction-card" style={{ height: '100%' }}>
          <Menu 
            mode="horizontal" 
            selectedKeys={[activeTab]}
            className="function-menu"
          >
            <Menu.Item 
              key="chat" 
              icon={<MessageOutlined />}
              onClick={() => setActiveTab('chat')}
            >
              文本对话
            </Menu.Item>
            <Menu.Item 
              key="image" 
              icon={<PictureOutlined />}
              onClick={() => setActiveTab('image')}
            >
              图文识别
            </Menu.Item>
            <Menu.Item 
              key="video" 
              icon={<VideoCameraOutlined />}
              onClick={() => setActiveTab('video')}
            >
              视频生成
            </Menu.Item>
          </Menu>
          
          <div className="function-content" style={{ height: 'calc(100% - 60px)', overflow: 'auto', padding: '20px 0' }}>
            {/* 文本对话模块 */}
            {activeTab === 'chat' && (
              <div className="chat-module" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Title level={4}>文本对话体验</Title>
                <div className="chat-messages" style={{ flex: 1, overflow: 'auto', marginBottom: '10px' }}>
                  {chatMessages.length === 0 ? (
                    <Text type="secondary">开始与AI对话吧...</Text>
                  ) : (
                    <List
                      dataSource={chatMessages}
                      renderItem={(msg, _index) => (
                        <List.Item className={`message-item ${msg.sender}`}>
                          <div className="message-content">
                            <Text strong>{msg.sender === 'user' ? '你' : 'AI'}:</Text> {msg.text}
                          </div>
                        </List.Item>
                      )}
                    />
                  )}
                </div>
                <form onSubmit={handleChatSubmit} className="chat-input-form">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="输入消息..."
                    addonAfter={
                      <Button type="primary" htmlType="submit">
                        发送
                      </Button>
                    }
                  />
                </form>
              </div>
            )}

            {/* 图文识别模块 */}
            {activeTab === 'image' && (
              <div className="image-module">
                <Title level={4}>图文识别体验</Title>
                <div className="image-upload-section">
                  <Upload 
                    beforeUpload={handleImageUpload}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>上传图片进行识别</Button>
                  </Upload>
                </div>
                
                {/* 示例图像 */}
                <div className="example-images-section">
                  <Divider orientation="left">示例图像</Divider>
                  <Row gutter={[16, 16]}>
                    {exampleImages.map(image => (
                      <Col span={6} key={image.id}>
                        <Card 
                          hoverable
                          cover={<img alt={image.name} src={image.url} />}
                          onClick={() => handleExampleImageClick(image.name)}
                        >
                          <Card.Meta title={image.name} />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
                
                {imageResult && (
                  <div className="image-result">
                    <Divider orientation="left">识别结果</Divider>
                    <Card>
                      <Text>{imageResult}</Text>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {/* 视频生成模块 */}
            {activeTab === 'video' && (
              <div className="video-module">
                <Title level={4}>视频生成体验</Title>
                <form onSubmit={handleVideoGenerate} className="video-input-form">
                  <div className="form-group">
                    <Text strong>视频描述:</Text>
                    <TextArea 
                      placeholder="描述你想要生成的视频内容..."
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </div>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="form-group">
                        <Text strong>视频风格:</Text>
                        <Select defaultValue="realistic" style={{ width: '100%' }}>
                          <Option value="realistic">写实风格</Option>
                          <Option value="anime">动漫风格</Option>
                          <Option value="cartoon">卡通风格</Option>
                          <Option value="oil-painting">油画风格</Option>
                          <Option value="pixel">像素风格</Option>
                          <Option value="cyberpunk">赛博朋克</Option>
                        </Select>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="form-group">
                        <Text strong>视频时长 (秒):</Text>
                        <Slider 
                          min={1} 
                          max={30} 
                          defaultValue={5} 
                          marks={{ 1: '1s', 30: '30s' }} 
                        />
                      </div>
                    </Col>
                  </Row>
                  
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<PlayCircleOutlined />}
                    size="large"
                    style={{ marginTop: '16px' }}
                  >
                    生成视频
                  </Button>
                </form>
                
                {videoResult && (
                  <div className="video-result">
                    <Divider orientation="left">生成结果</Divider>
                    <Card>
                      <Text>{videoResult}</Text>
                      <div className="video-preview">
                        <div className="video-placeholder">
                          <PlayCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                          <p>视频预览区域</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserInteraction;