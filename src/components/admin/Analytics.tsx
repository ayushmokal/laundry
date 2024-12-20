import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Analytics = () => {
  const [locationStats, setLocationStats] = useState({
    totalLocations: 0,
    averageRating: 0,
    totalReviews: 0,
  });
  const [blogStats, setBlogStats] = useState({
    totalPosts: 0,
    postsThisMonth: 0,
  });
  const [monthlyStats, setMonthlyStats] = useState({
    labels: [],
    locationData: [],
    blogData: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch locations data
      const { data: locations } = await supabase.from("locations").select("*");
      const totalLocations = locations?.length || 0;
      const totalReviews = locations?.reduce((sum, loc) => sum + (loc.reviews || 0), 0) || 0;
      const averageRating =
        locations?.reduce((sum, loc) => sum + (loc.rating || 0), 0) / totalLocations || 0;

      setLocationStats({
        totalLocations,
        averageRating,
        totalReviews,
      });

      // Fetch blogs data
      const { data: blogs } = await supabase.from("blogs").select("*");
      const totalPosts = blogs?.length || 0;
      
      // Calculate posts this month
      const currentDate = new Date("2024-12-20T17:26:41+05:30");
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const postsThisMonth = blogs?.filter(
        (blog) => new Date(blog.created_at) >= firstDayOfMonth
      ).length || 0;

      setBlogStats({
        totalPosts,
        postsThisMonth,
      });

      // Generate monthly stats for the past 6 months
      const labels = [];
      const locationData = [];
      const blogData = [];

      for (let i = 5; i >= 0; i--) {
        const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
        
        labels.push(month.toLocaleString('default', { month: 'short' }));
        
        const monthlyLocations = locations?.filter(
          (loc) => new Date(loc.created_at) >= month && new Date(loc.created_at) <= monthEnd
        ).length || 0;
        
        const monthlyBlogs = blogs?.filter(
          (blog) => new Date(blog.created_at) >= month && new Date(blog.created_at) <= monthEnd
        ).length || 0;

        locationData.push(monthlyLocations);
        blogData.push(monthlyBlogs);
      }

      setMonthlyStats({
        labels,
        locationData,
        blogData,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const monthlyStatsConfig = {
    labels: monthlyStats.labels,
    datasets: [
      {
        label: "New Locations",
        data: monthlyStats.locationData,
        backgroundColor: "rgba(247, 101, 163, 0.5)",
        borderColor: "rgb(247, 101, 163)",
        borderWidth: 2,
      },
      {
        label: "Blog Posts",
        data: monthlyStats.blogData,
        backgroundColor: "rgba(21, 91, 170, 0.5)",
        borderColor: "rgb(21, 91, 170)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{locationStats.totalLocations}</div>
            <p className="text-sm text-muted-foreground">
              Avg Rating: {locationStats.averageRating.toFixed(1)} ⭐
            </p>
            <p className="text-sm text-muted-foreground">
              Total Reviews: {locationStats.totalReviews}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{blogStats.totalPosts}</div>
            <p className="text-sm text-muted-foreground">
              Posts this month: {blogStats.postsThisMonth}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {((locationStats.totalReviews / locationStats.totalLocations) || 0).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground">
              Average reviews per location
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={monthlyStatsConfig}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
