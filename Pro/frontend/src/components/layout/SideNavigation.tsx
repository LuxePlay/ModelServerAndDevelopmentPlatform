//实现左侧导航
// src/components/layout/SideNavigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trainingSubRoutes, datasetSubRoutes } from '../../routes/routesConfig';

interface SideNavigationProps {
  activeTab: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ activeTab }) => {
  const location = useLocation();
  
  const getRoutesByTab = () => {
    switch (activeTab) {
      case '/training':
        return trainingSubRoutes;
      case '/dataset':
        return datasetSubRoutes;
      default:
        return [];
    }
  };
  
  const routes = getRoutesByTab();
  
  if (routes.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white w-64 min-h-screen shadow-md">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`${
                location.pathname === route.path
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-800'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded`}
            >
              <span className="truncate">{route.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideNavigation;