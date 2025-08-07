import React, { useState, useRef, type ReactElement } from 'react';
import {
  PlayCircleOutlined,
  SaveOutlined,
  DeleteOutlined,
  CopyOutlined,
  SettingOutlined,
  EyeOutlined,
  CodeOutlined,
  ApiOutlined,
  MessageOutlined,
  DatabaseOutlined,
  ControlOutlined,
  BranchesOutlined,
  FilterOutlined
} from '@ant-design/icons';
import './Workflow.css';

// 定义节点数据类型
interface NodeData {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  parameters?: Record<string, any>;
}

// 定义连接线类型
interface Connection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceOutputKey: string;
  targetInputKey: string;
}

const Workflow=(): ReactElement => {
  // 节点列表
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: 'trigger-1',
      type: 'manualTrigger',
      name: '手动触发',
      position: { x: 300, y: 50 }
    },
    {
      id: 'llm-1',
      type: 'llm',
      name: '大语言模型',
      position: { x: 300, y: 180 },
      parameters: {
        model: 'gpt-4',
        prompt: '请根据以下内容生成回复:'
      }
    }
  ]);

  // 连接线列表
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: 'connection-1',
      sourceNodeId: 'trigger-1',
      targetNodeId: 'llm-1',
      sourceOutputKey: 'output',
      targetInputKey: 'input'
    }
  ]);

  // 工作流状态
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [showNodePanel, setShowNodePanel] = useState(false);
  const [nodePanelPosition, setNodePanelPosition] = useState({ x: 0, y: 0 });
  
  // 节点连接状态
  const [connectingNodeId, setConnectingNodeId] = useState<string | null>(null);
  const [tempConnection, setTempConnection] = useState<{x: number, y: number} | null>(null);
  
  // 画布拖拽状态
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  
  // 画布引用
  const canvasRef = useRef<HTMLDivElement>(null);

  // 节点类型定义
  const nodeTypes = [
    { 
      category: '触发器', 
      nodes: [
        { type: 'manualTrigger', name: '手动触发', icon: <PlayCircleOutlined /> },
        { type: 'webhook', name: 'Webhook', icon: <ApiOutlined /> },
        { type: 'schedule', name: '定时触发', icon: <ControlOutlined /> }
      ] 
    },
    { 
      category: 'AI处理', 
      nodes: [
        { type: 'llm', name: '大语言模型', icon: <MessageOutlined /> },
        { type: 'imageGen', name: '图像生成', icon: <DatabaseOutlined /> },
        { type: 'speechToText', name: '语音转文字', icon: <MessageOutlined /> }
      ] 
    },
    { 
      category: '逻辑控制', 
      nodes: [
        { type: 'if', name: '条件判断', icon: <BranchesOutlined /> },
        { type: 'switch', name: '多路分支', icon: <BranchesOutlined /> },
        { type: 'loop', name: '循环', icon: <BranchesOutlined /> }
      ] 
    },
    { 
      category: '数据处理', 
      nodes: [
        { type: 'filter', name: '数据过滤', icon: <FilterOutlined /> },
        { type: 'transform', name: '数据转换', icon: <ControlOutlined /> },
        { type: 'merge', name: '数据合并', icon: <BranchesOutlined /> }
      ] 
    }
  ];

  // 处理画布点击
  const handleCanvasClick = (e: React.MouseEvent) => {
    // 取消节点和连接线选择
    setSelectedNodeId(null);
    setSelectedConnectionId(null);
    setConnectingNodeId(null);
    setTempConnection(null);
    
    // 如果点击的是画布空白区域，显示节点面板
    if (e.target === e.currentTarget && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setNodePanelPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setShowNodePanel(true);
    }
  };

  // 处理节点点击
  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setSelectedConnectionId(null);
    setConnectingNodeId(null);
    setTempConnection(null);
    setShowNodePanel(false);
  };

  // 处理连接线点击
  const handleConnectionClick = (connectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedConnectionId(connectionId);
    setSelectedNodeId(null);
    setConnectingNodeId(null);
    setTempConnection(null);
  };

  // 处理节点输出点点击
  const handleOutputClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConnectingNodeId(nodeId);
    setSelectedNodeId(null);
    setSelectedConnectionId(null);
    
    // 获取输出点位置
    const node = nodes.find(n => n.id === nodeId);
    if (node && canvasRef.current) {
      const x = node.position.x + 150 + canvasPosition.x;
      const y = node.position.y + 50 + canvasPosition.y;
      setTempConnection({x, y});
    }
  };

  // 处理节点输入点点击（完成连接）
  const handleInputClick = (targetNodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (connectingNodeId && connectingNodeId !== targetNodeId) {
      // 创建新连接
      const newConnection: Connection = {
        id: `connection-${Date.now()}`,
        sourceNodeId: connectingNodeId,
        targetNodeId: targetNodeId,
        sourceOutputKey: 'output',
        targetInputKey: 'input'
      };
      
      setConnections([...connections, newConnection]);
    }
    
    // 重置连接状态
    setConnectingNodeId(null);
    setTempConnection(null);
  };

  // 处理节点拖拽开始
  const handleNodeDragStart = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (node && canvasRef.current) {
      setDraggingNodeId(nodeId);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
      setOriginalPosition({
        x: node.position.x,
        y: node.position.y
      });
    }
  };

  // 处理画布拖拽开始（鼠标在空白区域按下）
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // 只有当鼠标不在节点上时才触发画布拖拽
    if (e.target === e.currentTarget) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y
      });
      setSelectedNodeId(null);
      setSelectedConnectionId(null);
      setConnectingNodeId(null);
      setTempConnection(null);
    }
  };

  // 处理拖拽移动（包括节点拖拽和画布拖拽）
  const handleDrag = (e: React.MouseEvent) => {
    // 节点拖拽
    if (draggingNodeId) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setNodes(nodes.map(node => 
        node.id === draggingNodeId 
          ? { 
              ...node, 
              position: { 
                x: originalPosition.x + deltaX, 
                y: originalPosition.y + deltaY 
              } 
            }
          : node
      ));
      return;
    }

    // 画布拖拽
    if (isPanning) {
      setCanvasPosition({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    // 临时连接线拖拽
    if (connectingNodeId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setTempConnection({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    setDraggingNodeId(null);
    setIsPanning(false);
  };

  // 添加新节点
  const addNode = (type: string, name: string) => {
    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      type,
      name,
      position: { 
        x: nodePanelPosition.x - 75 - canvasPosition.x, 
        y: nodePanelPosition.y - 20 - canvasPosition.y 
      }
    };
    
    setNodes([...nodes, newNode]);
    setShowNodePanel(false);
    
    // 如果正在连接节点，则自动连接新节点
    if (connectingNodeId) {
      const newConnection: Connection = {
        id: `connection-${Date.now()}`,
        sourceNodeId: connectingNodeId,
        targetNodeId: newNode.id,
        sourceOutputKey: 'output',
        targetInputKey: 'input'
      };
      
      setConnections([...connections, newConnection]);
      setConnectingNodeId(null);
      setTempConnection(null);
    }
  };

  // 删除选中节点
  const deleteNode = () => {
    if (selectedNodeId) {
      setNodes(nodes.filter(node => node.id !== selectedNodeId));
      setConnections(connections.filter(
        conn => conn.sourceNodeId !== selectedNodeId && conn.targetNodeId !== selectedNodeId
      ));
      setSelectedNodeId(null);
    }
  };

  // 删除选中连接线
  const deleteConnection = () => {
    if (selectedConnectionId) {
      setConnections(connections.filter(
        conn => conn.id !== selectedConnectionId
      ));
      setSelectedConnectionId(null);
    }
  };

  // 复制节点
  const copyNode = () => {
    if (selectedNodeId) {
      const nodeToCopy = nodes.find(node => node.id === selectedNodeId);
      if (nodeToCopy) {
        const newNode: NodeData = {
          ...nodeToCopy,
          id: `node-${Date.now()}`,
          position: { 
            x: nodeToCopy.position.x + 20, 
            y: nodeToCopy.position.y + 20 
          }
        };
        setNodes([...nodes, newNode]);
      }
    }
  };

  // 执行工作流
  const executeWorkflow = () => {
    setIsExecuting(true);
    // 模拟执行过程
    setTimeout(() => {
      setIsExecuting(false);
    }, 2000);
  };

  // 渲染节点
  const renderNode = (node: NodeData) => {
    const isSelected = selectedNodeId === node.id;
    const isConnecting = connectingNodeId === node.id;
    const getNodeIcon = () => {
      switch (node.type) {
        case 'manualTrigger': return <PlayCircleOutlined />;
        case 'llm': return <MessageOutlined />;
        case 'webhook': return <ApiOutlined />;
        case 'if': return <BranchesOutlined />;
        default: return <SettingOutlined />;
      }
    };
    
    return (
      <div
        key={node.id}
        className={`workflow-node ${isSelected ? 'selected' : ''} ${isConnecting ? 'connecting' : ''} ${node.type}`}
        style={{
          left: node.position.x + canvasPosition.x,
          top: node.position.y + canvasPosition.y
        }}
        onClick={(e) => handleNodeClick(node.id, e)}
        onMouseDown={(e) => handleNodeDragStart(node.id, e)}
      >
        <div className="node-header">
          <div className="node-icon">{getNodeIcon()}</div>
          <div className="node-title">{node.name}</div>
        </div>
        <div className="node-body">
          <div className="node-inputs">
            <div 
              className="node-connector input"
              onMouseDown={(e) => {
                e.stopPropagation();
                handleInputClick(node.id, e);
              }}
            ></div>
          </div>
          <div className="node-outputs">
            <div 
              className="node-connector output"
              onMouseDown={(e) => {
                e.stopPropagation();
                handleOutputClick(node.id, e);
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染连接线
  const renderConnections = () => {
    const connectionElements = connections.map(connection => {
      const sourceNode = nodes.find(n => n.id === connection.sourceNodeId);
      const targetNode = nodes.find(n => n.id === connection.targetNodeId);
      
      if (!sourceNode || !targetNode) return null;
      
      // 计算连接点位置（统一输入输出位置）
      const sourceX = sourceNode.position.x + 150 + canvasPosition.x;
      const sourceY = sourceNode.position.y + 50 + canvasPosition.y;
      const targetX = targetNode.position.x + canvasPosition.x;
      const targetY = targetNode.position.y + 50 + canvasPosition.y;
      
      // 计算贝塞尔曲线控制点
      const controlX1 = sourceX + 100;
      const controlY1 = sourceY;
      const controlX2 = targetX - 100;
      const controlY2 = targetY;
      
      const isSelected = selectedConnectionId === connection.id;
      
      return (
        <svg 
          key={connection.id} 
          className="connection-svg"
          onClick={(e) => handleConnectionClick(connection.id, e)}
        >
          {/* 选中状态的高亮连接线 */}
          {isSelected && (
            <path
              d={`M ${sourceX} ${sourceY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`}
              stroke="#ff4d4f"
              strokeWidth="4"
              fill="none"
            />
          )}
          {/* 普通连接线 */}
          <path
            d={`M ${sourceX} ${sourceY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`}
            stroke={isSelected ? "#1890ff" : "#1890ff"}
            strokeWidth={isSelected ? "2" : "2"}
            fill="none"
            markerEnd="url(#arrowhead)"
            className="connection-path"
          />
        </svg>
      );
    });
    
    // 渲染临时连接线
    if (connectingNodeId && tempConnection) {
      const sourceNode = nodes.find(n => n.id === connectingNodeId);
      if (sourceNode) {
        const sourceX = sourceNode.position.x + 150 + canvasPosition.x;
        const sourceY = sourceNode.position.y + 50 + canvasPosition.y;
        const targetX = tempConnection.x;
        const targetY = tempConnection.y;
        
        // 计算贝塞尔曲线控制点
        const controlX1 = sourceX + 100;
        const controlY1 = sourceY;
        const controlX2 = targetX - 100;
        const controlY2 = targetY;
        
        connectionElements.push(
          <svg 
            key="temp-connection" 
            className="connection-svg"
          >
            <path
              d={`M ${sourceX} ${sourceY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`}
              stroke="#1890ff"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        );
      }
    }
    
    return connectionElements;
  };

  return (
    <div className="workflow-container">
      {/* 头部工具栏 */}
      <div className="workflow-header">
        <div className="workflow-title">
          <h1>AI工作流编排</h1>
        </div>
        <div className="workflow-actions">
          <button 
            className={`action-button ${isExecuting ? 'executing' : ''}`}
            onClick={executeWorkflow}
            disabled={isExecuting}
          >
            <PlayCircleOutlined /> {isExecuting ? '执行中...' : '执行'}
          </button>
          <button className="action-button">
            <SaveOutlined /> 保存
          </button>
          <button className="action-button">
            <EyeOutlined /> 预览
          </button>
          <button className="action-button">
            <CodeOutlined /> 代码
          </button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="workflow-main">
        {/* 左侧节点面板 */}
        <div className="node-panel">
          <div className="panel-header">
            <h3>节点库</h3>
          </div>
          <div className="panel-content">
            {nodeTypes.map((category, index) => (
              <div key={index} className="node-category">
                <div className="category-title">{category.category}</div>
                <div className="category-nodes">
                  {category.nodes.map((node, nodeIndex) => (
                    <div 
                      key={nodeIndex}
                      className="node-item"
                      onClick={() => addNode(node.type, node.name)}
                    >
                      <div className="node-item-icon">{node.icon}</div>
                      <div className="node-item-name">{node.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 中央画布区域 */}
        <div 
          ref={canvasRef}
          className="workflow-canvas"
          onClick={handleCanvasClick}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {/* 渲染连接线 */}
          <svg className="connections-container">
            <defs>
              <marker 
                id="arrowhead" 
                markerWidth="10" 
                markerHeight="7" 
                refX="9" 
                refY="3.5" 
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#1890ff" />
              </marker>
            </defs>
            {renderConnections()}
          </svg>
          
          {/* 渲染节点 */}
          {nodes.map(renderNode)}
          
          {/* 节点操作面板 */}
          {selectedNodeId && (
            <div 
              className="node-actions-panel"
              style={{
                left: (nodes.find(n => n.id === selectedNodeId)?.position.x || 0) + canvasPosition.x,
                top: (nodes.find(n => n.id === selectedNodeId)?.position.y || 0) - 40 + canvasPosition.y
              }}
            >
              <button 
                className="node-action-button"
                onClick={copyNode}
                title="复制节点"
              >
                <CopyOutlined />
              </button>
              <button 
                className="node-action-button"
                onClick={deleteNode}
                title="删除节点"
              >
                <DeleteOutlined />
              </button>
            </div>
          )}
          
          {/* 连接线操作面板 */}
          {selectedConnectionId && (
            <div 
              className="connection-actions-panel"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button 
                className="connection-action-button"
                onClick={deleteConnection}
                title="删除连接线"
              >
                <DeleteOutlined /> 删除
              </button>
            </div>
          )}
          
          {/* 添加节点面板 */}
          {showNodePanel && (
            <div 
              className="add-node-panel"
              style={{
                left: nodePanelPosition.x,
                top: nodePanelPosition.y
              }}
            >
              <div className="panel-title">添加节点</div>
              <div className="add-node-content">
                {nodeTypes.slice(0, 2).map((category, index) => (
                  <div key={index} className="add-node-category">
                    <div className="add-category-title">{category.category}</div>
                    <div className="add-category-nodes">
                      {category.nodes.map((node, nodeIndex) => (
                        <div 
                          key={nodeIndex}
                          className="add-node-item"
                          onClick={() => addNode(node.type, node.name)}
                        >
                          <div className="add-node-icon">{node.icon}</div>
                          <div className="add-node-name">{node.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 右侧属性面板 */}
        <div className="properties-panel">
          <div className="panel-header">
            <h3>属性面板</h3>
          </div>
          <div className="panel-content">
            {selectedNodeId ? (
              <div className="node-properties">
                <div className="property-group">
                  <h4>基本信息</h4>
                  <div className="property-item">
                    <label>节点名称</label>
                    <input 
                      type="text" 
                      defaultValue={nodes.find(n => n.id === selectedNodeId)?.name}
                    />
                  </div>
                </div>
                
                <div className="property-group">
                  <h4>参数配置</h4>
                  <div className="property-item">
                    <label>模型选择</label>
                    <select defaultValue="gpt-4">
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="qwen-turbo">通义千问 Turbo</option>
                      <option value="doubao">豆包</option>
                    </select>
                  </div>
                  <div className="property-item">
                    <label>提示词</label>
                    <textarea 
                      placeholder="请输入提示词..."
                      defaultValue="请根据以下内容生成回复:"
                    />
                  </div>
                </div>
                
                <div className="property-group">
                  <h4>高级设置</h4>
                  <div className="property-item">
                    <label>
                      <input type="checkbox" /> 启用流式输出
                    </label>
                  </div>
                  <div className="property-item">
                    <label>
                      <input type="checkbox" defaultChecked /> 启用缓存
                    </label>
                  </div>
                </div>
              </div>
            ) : selectedConnectionId ? (
              <div className="connection-properties">
                <div className="property-group">
                  <h4>连接线属性</h4>
                  <div className="property-item">
                    <label>连接ID</label>
                    <input 
                      type="text" 
                      value={selectedConnectionId}
                      readOnly
                    />
                  </div>
                  <div className="property-item">
                    <button 
                      className="delete-connection-button"
                      onClick={deleteConnection}
                    >
                      <DeleteOutlined /> 删除连接
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>请选择一个节点或连接线以查看和编辑属性</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;