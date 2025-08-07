// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';

// 创建全局认证状态上下文
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初始化时检查认证状态
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    // 初始检查
    checkAuthStatus();

    // 监听storage事件，当localStorage变化时更新状态
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAuthenticated') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 同时也监听自定义事件，用于同标签页内的状态更新
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const updateAuthStatus = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    // 触发自定义事件以便同标签页内其他组件能监听到变化
    window.dispatchEvent(new CustomEvent('authChange'));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};