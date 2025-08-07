// src/pages/dashboard/Dashboard.tsx
// Deleted:import { BrowserRouter as Router} from 'react-router-dom';
import { ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import '../../App.css';
import Home from '../home/Home';

const Dashboard = (): React.ReactElement => {
  return (
    <ConfigProvider locale={zhCN}>
      <Home />
    </ConfigProvider>
  );
};


export default Dashboard;