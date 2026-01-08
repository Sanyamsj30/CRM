import { useEffect, useState } from "react";
import { fetchDashboardData } from "../api/dashboard";
import StatsCard from "../components/dashboard/StatsCard";
import UpcomingMeetings from "../components/dashboard/UpcomingMeetings";
import RecentInteractions from "../components/dashboard/RecentInteractions";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import Navbar from "../components/common/navbar";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setDashboardData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (!dashboardData)
    return (
      <p className="text-center text-red-500">
        Failed to load dashboard
      </p>
    );

  const { stats, upcomingMeetings, recentInteractions } = dashboardData;

  // ✅ Chart-safe data
  const chartData = [
    { name: "Active", count: stats.activeCustomers },
    {
      name: "Inactive",
      count: stats.InactiveCustomers,
    },
    {
      name:"Lead",
      count: stats.totalCustomers - stats.activeCustomers - stats.InactiveCustomers,
    }
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total Customers"
            value={stats.totalCustomers}
          />
          <StatsCard
            title="Active Customers"
            value={stats.activeCustomers}
          />
          <StatsCard
            title="Upcoming Meetings"
            value={stats.upcomingMeetings}
          />
        </div>

        {/* Chart */}
        <div className="bg-white border rounded-xl p-4 h-64">
          <h2 className="text-sm font-medium mb-2">
            Customer Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                outerRadius={80}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingMeetings meetings={upcomingMeetings} />
          <RecentInteractions interactions={recentInteractions} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
