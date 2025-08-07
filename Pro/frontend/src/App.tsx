// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './components/layout/MainLayout';
import { routes } from './routes/routesConfig';
import 'antd/dist/reset.css'; // Ant Design 样式
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const loginRoute = routes.find(r => r.path === '/login');
  const superAdminLoginRoute = routes.find(r => r.path === '/super-admin');
  const superAdminManagerRoute = routes.find(r => r.path === '/super-admin/manager');
  const AdminLoginRuter=routes.find(r => r.path === '/admin');
  const AdminManagerRoute=routes.find(r => r.path === '/admin/manager');
  const user_centerRoute = routes.find(r => r.path === '/user_center');

  return (
    <div className="app-container" style={{ height: '100%', width: '100%' }}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 登录页面不使用主布局 */}
            <Route 
              path="/login" 
              element={loginRoute ? <loginRoute.element /> : <div>未找到登录页面</div>} 
            />
            {/* 超级管理员登录页面不使用主布局 */}
            <Route 
              path="/super-admin" 
              element={superAdminLoginRoute ? <superAdminLoginRoute.element /> : <div>超级管理员登录页面</div>} 
            />
            {/* 超级管理员管理页面不使用主布局 */}
            <Route 
              path="/super-admin/manager" 
              element={superAdminManagerRoute ? <superAdminManagerRoute.element /> : <div>超级管理员管理页面</div>} 
            />
            {/* 管理员登录页面不使用主布局 */}
            <Route 
              path="/admin" 
              element={AdminLoginRuter ? <AdminLoginRuter.element /> : <div>管理员登录页面</div>} 
            />
            {/* 管理员管理页面不使用主布局 */}
            <Route 
              path="/admin/manager" 
              element={AdminManagerRoute ? <AdminManagerRoute.element /> : <div>超级管理员管理页面</div>} 
            />
            {/* 管理员管理页面不使用主布局 */}
            <Route 
              path="/user_center" 
              element={user_centerRoute ? <user_centerRoute.element /> : <div>个人中心页面</div>} 
            />
            {/* 其他所有受保护的路由都使用主布局 */}
            <Route path="/*" element={
              <MainLayout>
                <AppRoutes />
              </MainLayout>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;