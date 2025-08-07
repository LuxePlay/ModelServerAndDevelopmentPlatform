//实现路由渲染
// src/routes/AppRoutes.tsx
import React, { Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes, developmentDocSubRoutes, trainingSubRoutes, datasetSubRoutes } from './routesConfig';
import { AuthContext } from '../contexts/AuthContext';

// 加载组件
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// 路由守卫组件
const ProtectedRoute: React.FC<{ element: React.ReactElement; requiredRole?: string; path?: string }> = ({ element, requiredRole, path }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  // 检查角色权限
  if (requiredRole) {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== requiredRole) {
      return <Navigate to="/login" replace />;
    }
  }
  
  // 检查路由权限
  if (isAuthenticated && path) {
    const userRole = localStorage.getItem('userRole');
    // 如果是管理员，检查路由权限
    if (userRole === 'admin') {
      const allowedRoutes = JSON.parse(localStorage.getItem('allowedRoutes') || '[]');
      // 如果不是允许的路由，跳转到仪表板
      if (!allowedRoutes.includes(path) && path !== '/dashboard') {
        // 特殊处理：允许访问父路由
        const isParentRouteAllowed = allowedRoutes.some((allowedPath: string) => 
          path.startsWith(allowedPath)
        );
        
        if (!isParentRouteAllowed) {
          return <Navigate to="/dashboard" replace />;
        }
      }
    }
  }
  
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  // 查找路由配置
  const loginRoute = routes.find(r => r.path === '/login');
  const superAdminLoginRoute = routes.find(r => r.path === '/super-admin');
  const superAdminDashboardRoute = routes.find(r => r.path === '/super-admin/manager');
  const AdminLoginRoute = routes.find(r => r.path === '/admin');
  const AdminManagerRoute = routes.find(r => r.path === '/admin/manager');
  const dashboardRoute = routes.find(r => r.path === '/dashboard');
  const trainingRoute = routes.find(r => r.path === '/training');
  const developmentDocRoute = routes.find(r => r.path === '/development_doc');
  const datasetRoute = routes.find(r => r.path === '/dataset');

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* 默认路由重定向到登录页面 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 登录页面路由 - 不需要保护，任何人都可以访问，不使用主布局 */}
        <Route 
          path="/login" 
          element={loginRoute ? <loginRoute.element /> : <div>未找到登录页面</div>} 
        />
        
        {/* 超级管理员登录页面路由 */}
        <Route 
          path="/super-admin" 
          element={superAdminLoginRoute ? <superAdminLoginRoute.element /> : <div>超级管理员登录页面</div>} 
        />
        
        {/* 超级管理员面板路由 */}
        <Route 
          path="/super-admin/manager" 
          element={<ProtectedRoute element={superAdminDashboardRoute ? <superAdminDashboardRoute.element /> : <div>超级管理员面板</div>} requiredRole="super_admin" />} 
        />
                {/* 管理员登录页面路由 */}
        <Route 
          path="/admin" 
          element={AdminLoginRoute ? <AdminLoginRoute.element /> : <div>管理员登录页面</div>} 
        />
        
        {/* 管理员面板路由 */}
        <Route 
          path="/admin/manager" 
          element={<ProtectedRoute element={AdminManagerRoute ? <AdminManagerRoute.element /> : <div>管理员面板</div>} requiredRole="admin" />} 
        />
        
        {/* 受保护的路由 - 这些路由需要在MainLayout中显示 */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={dashboardRoute ? <dashboardRoute.element /> : <div>仪表板</div>} path="/dashboard" />} 
        />
        
        {/* 受保护的路由 - 大模型服务与应用平台主页面 */}
        <Route 
          path="/training" 
          element={<ProtectedRoute element={trainingRoute ? <trainingRoute.element /> : <div>大模型服务与应用平台</div>} path="/training" />} 
        />
        
        {/* 受保护的路由 - 开发中心文档主页面 */}
        <Route 
          path="/development_doc" 
          element={<ProtectedRoute element={developmentDocRoute ? <developmentDocRoute.element /> : <div>开发中心文档</div>} path="/development_doc" />} 
        />
        
        {/* 受保护的路由 - 数据管理平台主页面 */}
        <Route 
          path="/dataset" 
          element={<ProtectedRoute element={datasetRoute ? <datasetRoute.element /> : <div>数据管理平台</div>} path="/dataset" />} 
        />
        
        {/* 大模型服务与应用平台子路由 */}
        {trainingSubRoutes.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<ProtectedRoute element={<route.element />} path={route.path} />} 
          />
        ))}
        
        {/* 数据管理平台子路由 */}
        {datasetSubRoutes.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<ProtectedRoute element={<route.element />} path={route.path} />} 
          />
        ))}

        {/* 开发平台子路由 */}
        {developmentDocSubRoutes.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<ProtectedRoute element={<route.element />} path={route.path} />} 
          />
        ))}
        
        {/* 404 页面 */}
        <Route path="*" element={<div>404 - 页面未找到</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;