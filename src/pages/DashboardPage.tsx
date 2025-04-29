import QuickStats from '@/features/dashboard/QuickStats';
import RecentActivities from '@/features/dashboard/RecentActivities';
import ChartStats from '@/features/dashboard/ChartStats';
import { TrendingUp } from 'lucide-react';

const Dashboard = () => {

  return (
    <section>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center"> 
          <TrendingUp className="mr-2"/> Dashboard
        </h1>
        <QuickStats />
        <ChartStats />
        <RecentActivities />
      </div>
    </section>
  );
};

export default Dashboard;