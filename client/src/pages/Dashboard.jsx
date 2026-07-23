import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import { getDashboardStats } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    blogs: 0,
    videos: 0,
    categories: 0,
  });

  useEffect(() => {

    async function loadStats() {

      try {

        const data = await getDashboardStats();

        setStats(data);

      } catch (err) {

        console.log(err);

      }

    }

    loadStats();

  }, []);

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-2">

        Welcome, {user?.name} 👋

      </h1>

      <p className="text-gray-500 mb-8">

        Here's an overview of your CMS.

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Blogs"
          value={stats.blogs}
          color="text-blue-600"
        />

        <StatCard
          title="Videos"
          value={stats.videos}
          color="text-green-600"
        />

        <StatCard
          title="Categories"
          value={stats.categories}
          color="text-purple-600"
        />

      </div>

    </DashboardLayout>

  );

}