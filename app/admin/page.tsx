"use client";

import { useEffect, useState } from "react";
import { Loader2, Users, ClipboardList, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAdminOverview } from "../services/authService";

interface AdminStats {
  totalUsers: number;
  totalTasks: number;
  activeClients: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAdminOverview();
        setStats(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load admin dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={() => router.push("/admin/settings")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Settings className="w-5 h-5" />
          Manage Settings
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={<Users className="text-blue-500 w-6 h-6" />}
        />
        <StatCard
          title="Total Tasks"
          value={stats?.totalTasks ?? 0}
          icon={<ClipboardList className="text-green-500 w-6 h-6" />}
        />
        <StatCard
          title="Active Clients"
          value={stats?.activeClients ?? 0}
          icon={<Users className="text-purple-500 w-6 h-6" />}
        />
      </section>

      <section className="mt-12 bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <p className="text-gray-500 text-sm">No recent activity available yet.</p>
      </section>
    </main>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    </div>
  );
}
