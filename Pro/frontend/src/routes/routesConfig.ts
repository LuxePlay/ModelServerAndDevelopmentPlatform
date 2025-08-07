// src/routes/routesConfig.ts
import { lazy, type ReactElement } from 'react';

// 懒加载页面组件
const Home = lazy(() => import('../pages/home/Home'));
const Login = lazy(() => import('../pages/login/UserLogin'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const SuperAdminPage = lazy(() => import('../pages/login/Login_SuperAdmin'));
const SuperAdminManager = lazy(() => import('../pages/login/SuperAdmin_Manager'));
const AdminPage = lazy(() => import('../pages/login/Login_Admin'));
const AdminManager = lazy(() => import('../pages/login/Admin_Manager'));
//用户中心
const UserCenter = lazy(() => import('../pages/login/userCenter'));

// 大模型训练平台模块页面
const ModelServerAndDevelopment = lazy(() => import('../pages/training/ModelServerAndDevelopment'));
const ModelPretraining = lazy(() => import('../pages/training/ModelPretraining'));
const ModelManagement = lazy(() => import('../pages/training/ModelManagement'));
const ModelInstance = lazy(() => import('../pages/training/ModelInstance'));
const RAGKnowledgeLibrary = lazy(() => import('../pages/training/RAGKnowledgeLibrary'));
const UserInteraction = lazy(() => import('../pages/training/UserInteraction'));
const PromptEngineering = lazy(() => import('../pages/training/PromptEngineering'));
const PluginCenter = lazy(() => import('../pages/training/PluginCenter'));
const AgentCenter = lazy(() => import('../pages/training/AgentCenter'));
const WorkflowOrchestration = lazy(() => import('../pages/training/Workflow'));
const FineTuningCenter = lazy(() => import('../pages/training/FineTuningCenter'));

// 开发中心模块页面
const DevelopmentDoc = lazy(() => import('../pages/development_doc/DevelopmentDoc'));
const SdkDoc = lazy(() => import('../pages/development_doc/sub/SdkDoc'));
const HttpDoc = lazy(() => import('../pages/development_doc/sub/HttpDoc'));
const HttpApi=lazy(() => import('../pages/development_doc/API/http_api'))
const SdkApi=lazy(() => import('../pages/development_doc/API/sdk_api'))

// 数据管理平台页面
const DataManager = lazy(() => import('../pages/dataset/DataManager'));
const DatasetLabeling = lazy(() => import('../pages/dataset/DatasetLabeling'));
const DatasetUpload = lazy(() => import('../pages/dataset/DatasetUpload'));
const DatasetPreprocessing = lazy(() => import('../pages/dataset/DatasetPreprocessing'));
const DatasetReplay = lazy(() => import('../pages/dataset/DatasetReplay'));
const DatasetCleaning = lazy(() => import('../pages/dataset/DatasetCleaning'));
const DatasetQuality = lazy(() => import('../pages/dataset/DatasetQuality'));
const DatasetSharing = lazy(() => import('../pages/dataset/DatasetSharing'));

// 路由配置接口
export interface RouteConfig {
  id?: number;
  path: string;
  element: React.LazyExoticComponent<() => ReactElement>;
  label: string;
  icon?: string;
  children?: RouteConfig[];
  permission?: string[];
  isLayoutRoute?: boolean; // 标记是否为布局路由
  visible?: boolean;
}

// 主页顶部导航栏路由 (Tab页面)
export const topRoutes: RouteConfig[] = [
  {
    path: '/development_doc',
    element: DevelopmentDoc,
    label: '开发中心文档',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training',
    element: ModelServerAndDevelopment,
    label: '大模型服务与应用平台',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset',
    element: DataManager,
    label: '数据管理平台',
    permission: ['super_admin', 'admin', 'user']
  },
    {
    path: '/user_center',
    element: UserCenter,
    label: '用户中心',
    permission: ['super_admin', 'admin', 'user']
  }
];

// 开发中心文档子页面路由 (Tab页面)
export const developmentDocSubRoutes: RouteConfig[] = [
  {
    path: '/development_doc/sub/httpDoc',
    element: HttpDoc,
    label: 'http示例文档',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/development_doc/sub/sdkDoc',
    element: SdkDoc,
    label: 'SDK示例文档',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/development_doc/api/http-api',
    element: HttpApi,
    label: 'HTTP API文档',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/development_doc/api/sdk-api',
    element: SdkApi,
    label: 'SDK API文档',
    permission: ['super_admin', 'admin', 'user']
  }
];

// 大模型服务平台子页面左侧导航栏路由 (大模型服务与应用平台子路由)
export const trainingSubRoutes: RouteConfig[] = [
  {
    path: '/training/model-management',
    element: ModelManagement,
    label: '大模型管理',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/model-deployment',
    element: ModelInstance,
    label: '大模型实例化部署',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/knowledge-library',
    element: RAGKnowledgeLibrary,
    label: '知识库',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/user-experience',
    element: UserInteraction,
    label: '用户体验中心',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/prompt-engineering',
    element: PromptEngineering,
    label: 'Prompt工程',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/plugin-center',
    element: PluginCenter,
    label: '插件中心',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/agent-center',
    element: AgentCenter,
    label: '智能体中心',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/workflow-orchestration',
    element: WorkflowOrchestration,
    label: 'AI工作流编排',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/fine-tuning',
    element: FineTuningCenter,
    label: '微调中心',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/training/modelpretraining',
    element: ModelPretraining,
    label: '数据预训练',
    permission: ['super_admin', 'admin', 'user']
  }
];

// 数据管理平台子页面左侧导航栏路由按钮 (数据管理平台子路由)
export const datasetSubRoutes: RouteConfig[] = [
  {
    path: '/dataset/dataManager',
    element: DataManager,
    label: '数据集管理',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset/labeling',
    element: DatasetLabeling,
    label: '数据标注',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset/upload',
    element: DatasetUpload,
    label: '数据上传',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset/preprocessing',
    element: DatasetPreprocessing,
    label: '数据预处理',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset/replay',
    element: DatasetReplay,
    label: '数据回流',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset/cleaning',
    element: DatasetCleaning,
    label: '数据清洗',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset/quality',
    element: DatasetQuality,
    label: '数据质量',
    permission: ['super_admin', 'admin', 'user']
  },
  {
    path: '/dataset/sharing',
    element: DatasetSharing,
    label: '数据共享',
    permission: ['super_admin', 'admin', 'user']
  }
];

// 所有路由配置
export const routes: RouteConfig[] = [
  {
    path: '/login',
    element: Login,
    label: '登录',
    permission: ['super_admin', 'admin', 'user'],
    isLayoutRoute: false
  },
  {
    path: '/super-admin',
    element: SuperAdminPage,
    label: '超级管理员',
    permission: ['super_admin'], // 仅超级管理员可访问
    isLayoutRoute: false
  },
  {
    path: '/super-admin/manager',
    element: SuperAdminManager,
    label: '超级管理员面板',
    permission: ['super_admin'], // 仅超级管理员可访问
    isLayoutRoute: true
  },
    {
    path: '/admin',
    element: AdminPage,
    label: '超级管理员',
    permission: ['super_admin'], // 仅超级管理员可访问
    isLayoutRoute: false
  },
  {
    path: '/admin/manager',
    element: AdminManager,
    label: '超级管理员面板',
    permission: ['super_admin'], // 仅超级管理员可访问
    isLayoutRoute: true
  },
  {
    path: '/',
    element: Home,
    label: '首页',
    permission: ['super_admin', 'admin', 'user'],
    isLayoutRoute: true
  },
  {
    path: '/dashboard',
    element: Dashboard,
    label: '仪表板',
    permission: ['super_admin', 'admin', 'user'],
    isLayoutRoute: true
  },
  // 开发中心文档及其子路由
  {
    path: '/development_doc',
    element: DevelopmentDoc,
    label: '开发中心文档',
    permission: ['super_admin', 'admin', 'user'],
    isLayoutRoute: true,
    children: developmentDocSubRoutes
  },
  // 大模型服务与应用平台及其子路由
  {
    path: '/training',
    element: ModelServerAndDevelopment,
    label: '大模型服务与应用平台',
    permission: ['super_admin', 'admin', 'user'],
    isLayoutRoute: true,
    children: trainingSubRoutes
  },
  // 数据管理平台及其子路由
  {
    path: '/dataset',
    element: DataManager,
    label: '数据管理平台',
    permission: ['super_admin', 'admin', 'user'],
    isLayoutRoute: true,
    children: datasetSubRoutes
  },
  {
    path: '/user_center',
    element: UserCenter,
    label: '用户中心',
    permission: ['super_admin', 'admin', 'user'],
    isLayoutRoute: true
  }
];

// 动态路由过滤函数
export const filterVisibleRoutes = (routes: RouteConfig[], userRoles: string[]): RouteConfig[] => {
  return routes
    .filter(route => {
      // 检查用户是否有权限访问该路由
      if (route.permission && !route.permission.some(role => userRoles.includes(role))) {
        return false;
      }
      
      // 检查路由是否可见（如果可见性属性存在）
      if (route.visible !== undefined && !route.visible) {
        return false;
      }
      
      return true;
    })
    .map(route => {
      // 递归处理子路由
      if (route.children) {
        return {
          ...route,
          children: filterVisibleRoutes(route.children, userRoles)
        };
      }
      return route;
    });
};