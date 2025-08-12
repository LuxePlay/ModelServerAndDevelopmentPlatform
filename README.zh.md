# 大模型服务与应用开发平台
100%使用AI开发的平台，完全由AI生成或则辅助生成
**[English](README.md)**

## 介绍
这是一个大模型综合服务平台，包含MaaS与SaaS服务，意在促进大模型服务与应用在中小型企业中的快速部署与应用以及对大模型不同模块有比较好的认知。平台主要包括大模型服务与应用模块，数据管理模块，开发文档模块。大模型服务应用模块由大模型管理，大模型实例部署，大模型服务监控，大模型服务调用，Prompt工程，AIGC体验交互，智能体开发，RAG知识库，AI工作流，第三方插件集成等内容；数据管理模块包括数据处理，数据清洗，数据回流，数据预训练等内容；开发文档主要包括示例部分和API接口部分，支持HTTP和Python SDK两种调用方式，会逐渐增加中英文两种版本。
## 软件架构说明
参考平台结构和权限管理部分。

## 安装教程
#### 环境包括前端和后端：
```
node 版本：最新版本
npm 版本：10.9.2
mysql:8.4.6
redis:5.0.14
jdk:8.X（一定不要太高，会有兼容性问题）
```

## 使用说明

## 前端
```
cd frontend
```
运行前端
```
npm run dev
```
#### 前端测试账号
```
账号：user_test
密码：user123456
登录成功后跳转到 /training 页面
在手机验证码登录中添加了测试手机号检查：

手机号：13800000000
验证码：123456
登录成功后同样跳转到 /training 页面
```
#
## 后端
### 后端权限管理启动
#
#### mysql数据库
1. 安装mysql，并且记住windows service name ; //假设我的是MySQL_Pro
2. 启动mysql
```
net start MySQL_Pro
```
3. 连接数据库
```
mysql -u root -p ;  //然后输入密码,逗号是必须的
```
4. 创建数据库
```
create database sliga;
```
5. 查询数据库是否创建成功
```
show databases;
```
6. 使用数据库
```
use sliga;
```
7. 创建第一张表
```
source E:/BigModel/Pro/backend/RuoYi-Vue/sql/ry_20250522.sql;
```
8. 创建第二张表
```
source E:/BigModel/Pro/backend/RuoYi-Vue/sql/quartz.sql;
```
9. sql表位置查看
```
C:\ProgramData\MySQL\MySQL Server 8.4\Data\sliga
```
#### 启动redis，命令行启动
```
redis-server.exe  redis.windows-service.conf
```
#### 启动后端服务
1. 进入ruoyi-ui文件夹
```
cd ruoyi-ui
```
2. 安装依赖
```
npm install
```
3. 启动服务
```
npm run start:dev
```
#### 后端测试账号
```
账号：admin
密码：admin123
```

### 后端模型管理服务
### 后端实例部署服务
### 后端AI工作流服务
### 后端数据处理服务
### 后端其它服务

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 开源许可证

本项目采用 Apache License 2.0 许可证。详情请见 [LICENSE](LICENSE) 文件。

#### 项目截图
1. 登录页面
<img src="./image/user_login.png" width="100%" height="100%">
2. 大模型服务与应用页面
<img src="./image/modelserver.png" width="100%" height="100%">
3. 开发中心页面
<img src="./image/develop.png" width="100%" height="100%">
4. 数据管理页面
<img src="./image/dataset_manager.png" width="100%" height="100%">

#### 感谢
感谢阿里巴巴提供的通义灵码插件。


