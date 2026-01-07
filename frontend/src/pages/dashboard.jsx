import { useEffect, useState } from "react";
import { fetchDashboardData } from "../api/dashboard";
import StatsCard from "../components/dashboard/StatsCard";
import UpcomingMeetings from "../components/dashboard/UpcomingMeetings";
import RecentInteractions from "../components/dashboard/RecentInteractions";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import Navbar from "../components/common/navbar";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (!data)
    return <p className="text-center text-red-500">Failed to load dashboard</p>;

  const { stats, upcomingMeetings, recentInteractions } = data;

  return (
    <>
    <Navbar />
    <div className="p-6 mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="Total Customers" value={stats.totalCustomers} />
        <StatsCard title="Active Customers" value={stats.activeCustomers} />
        <StatsCard title="Upcoming Meetings" value={stats.upcomingMeetings} />
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
