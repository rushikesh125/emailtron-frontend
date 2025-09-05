"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, AlertTriangle, BarChart2, Loader2 } from "lucide-react";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const user = useSelector(state => state.user);
  const [dashboardData, setDashboardData] = useState({
    totalEmails: 0,
    urgentEmails: 0,
    sentimentCounts: [],
    categoryCounts: [],
    processingPriorityCounts: [],
    averageEmotionalScore: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (!user?.uid) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.uid }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const { data } = await res.json();
      setDashboardData(data || {
        totalEmails: 0,
        urgentEmails: 0,
        sentimentCounts: [],
        categoryCounts: [],
        processingPriorityCounts: [],
        averageEmotionalScore: 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?.uid]);

  // Chart data for Sentiment Distribution (Pie)
  const sentimentChartData = {
    labels: dashboardData.sentimentCounts.map(item => item.sentiment),
    datasets: [{
      data: dashboardData.sentimentCounts.map(item => item.count),
      backgroundColor: ['#f87171', '#facc15', '#22c55e'],
      hoverBackgroundColor: ['#ef4444', '#eab308', '#16a34a'],
      borderWidth: 0,
    }],
  };

  // Chart data for Category Distribution (Bar)
  const categoryChartData = {
    labels: dashboardData.categoryCounts.map(item => item.category),
    datasets: [{
      label: 'Emails by Category',
      data: dashboardData.categoryCounts.map(item => item.count),
      backgroundColor: '#6d28d9',
      hoverBackgroundColor: '#5b21b6',
      borderWidth: 0,
      borderRadius: 4,
    }],
  };

  // Chart data for Processing Priority Distribution (Bar)
  const priorityChartData = {
    labels: dashboardData.processingPriorityCounts.map(item => `Priority ${item.processingPriority}`),
    datasets: [{
      label: 'Emails by Processing Priority',
      data: dashboardData.processingPriorityCounts.map(item => item.count),
      backgroundColor: '#6d28d9',
      hoverBackgroundColor: '#5b21b6',
      borderWidth: 0,
      borderRadius: 4,
    }],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#1f2937',
          font: { size: 12 },
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#1f2937', stepSize: 1 },
        grid: { color: '#e5e7eb', borderWidth: 0 },
      },
      x: {
        ticks: { color: '#1f2937' },
        grid: { display: false },
      },
    },
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 text-theme-purple animate-spin" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="bg-red-50 text-red-600 p-6 rounded-xl shadow-lg max-w-md">
            <p className="font-medium text-lg">Error: {error}</p>
            <Button 
              onClick={fetchDashboardData} 
              className="mt-4 bg-white text-theme-purple hover:bg-theme-purple hover:text-white shadow-sm rounded-lg px-6 py-2 transition-all duration-200"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg rounded-xl border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-theme-purple" />
              <CardTitle className="text-gray-900 text-lg font-semibold">Total Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">{dashboardData.totalEmails}</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-xl border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <CardTitle className="text-gray-900 text-lg font-semibold">Urgent Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">{dashboardData.urgentEmails}</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-xl border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex items-center gap-3">
              <BarChart2 className="h-6 w-6 text-theme-purple" />
              <CardTitle className="text-gray-900 text-lg font-semibold">Avg. Emotional Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">{dashboardData.averageEmotionalScore.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-lg rounded-xl border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg font-semibold">Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <Pie data={sentimentChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-xl border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg font-semibold">Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <Bar data={categoryChartData} options={barChartOptions} />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-xl border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg font-semibold">Processing Priority Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <Bar data={priorityChartData} options={barChartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-none">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-theme-purple/10 p-2 rounded-lg">
              <Mail className="h-6 w-6 text-theme-purple" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Email Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {renderContent()}
      </main>
    </div>
  );
}