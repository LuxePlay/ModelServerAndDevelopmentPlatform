# 平台描述
是一个大模型服务与应用开发平台，不仅包括数据标注、处理与预训练还包括模型管理、部署等全生命周期流程，最后包括智能体使用以及工作流编排的内容。
# 平台主页
平台嵌入多个页面，横向导航栏tap页面模块包括：大模型训练平台模块、开发中心模块、数据集管理模块；左边纵向导航栏tag页面包括：大模型管理、大模型实例化部署、知识库、用户体验中心、Prompt工程、插件中心、智能体中心、AI工作流编排、微调中心
# 登录页面
待完善
# 权限配置页面
1. 一级平台权限配置页面
2. 二级权限配置页面
3. 三级权限配置页面

# 一级权限
角色：超级管理员
权限：可以对二级权限增删改查；可以控制平台子页面选择性对二级权限拥有者显示和隐藏
## 二级权限
角色：教师/管理员
权限：可以对三级权限用户增删改查；可以控制平台tab子页面选择性对三级权限显示和隐藏
### 三级权限
角色：学生/用户
权限：可以查看三级权限页面
## 前端目录结构
```
frontend/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.css
│   │       ├── Header.tsx
│   │       ├── MainLayout.tsx
│   │       ├── Mainlayout.css
│   │       ├── SideNavigation.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Siderbar.css
│   │       ├── SiderbarDataset.tsx
│   │       ├── SiderbarDevelopment.tsx
│   │       └── SiderbarTraining.tsx
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── Dashboard.css
│   │   │   └── Dashboard.tsx
│   │   ├── dataset/
│   │   │   ├── DataManager.tsx
│   │   │   ├── DatasetCleaning.tsx
│   │   │   ├── DatasetLabeling.tsx
│   │   │   ├── DatasetPreprocessing.tsx
│   │   │   ├── DatasetQuality.tsx
│   │   │   ├── DatasetReplay.tsx
│   │   │   ├── DatasetSharing.tsx
│   │   │   └── DatasetUpload.tsx
│   │   ├── development_doc/
│   │   │   ├── sub/
│   │   │   │   ├── HttpDoc.tsx
│   │   │   │   └── SdkDoc.tsx
│   │   │   └── DevelopmentDoc.tsx
│   │   ├── home/
│   │   │   ├── Home.tsx
│   │   │   └── home.css
│   │   ├── login/
│   │   │   └── Login.tsx
│   │   └── training/
│   │       ├── AgentCenter.tsx
│   │       ├── FineTuningCenter.tsx
│   │       ├── ModelInstance.tsx
│   │       ├── ModelManagement.tsx
│   │       ├── ModelPretraining.tsx
│   │       ├── ModelServerAndDevelopment.tsx
│   │       ├── PluginCenter.tsx
│   │       ├── PromptEngineering.tsx
│   │       ├── RAGKnowledgeLibrary.tsx
│   │       ├── UserInteraction.tsx
│   │       └── Workflow.tsx
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   └── routesConfig.ts
│   ├── styles/
│   │   └── var_global.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
## 后端目录结构
```
src/
├── modules/              # 功能模块
│   ├── auth/             # 认证模块
│   ├── users/            # 用户模块
│   ├── roles/            # 角色权限模块
│   ├── pages/            # 页面管理模块
│   └── common/           # 通用模块
├── common/               # 通用功能
│   ├── guards/           # 守卫
│   ├── interceptors/     # 拦截器
│   ├── filters/          # 过滤器
│   └── decorators/       # 装饰器
├── config/               # 配置文件
├── app.module.ts         # 根模块
└── main.ts               # 入口文件
```
## 项目启动
```
# 启动后端 (在backend目录下)
npm run start

# 启动前端 (在frontend目录下)
npm run dev
```