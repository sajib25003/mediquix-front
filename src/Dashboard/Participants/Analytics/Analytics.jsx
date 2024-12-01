import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../Shared/LoaderSpinner";

const Analytics = () => {
  const { user, loading } = useContext(AuthContext);
  const [campData, setCampData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/joinedCamps?email=${user.email}`)
        .then((res) => setCampData(res.data))
        .catch((err) => console.error("Error fetching camps:", err));
    }
  }, [user, axiosSecure]); 

  if (loading) {
    return <LoaderSpinner />;
  }

  const barChartData = campData.map((camp) => ({
    name: camp.campName,
    fees: parseInt(camp.campFees),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-8 overflow-x-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Analytics</h2>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Bar Chart */}
        <div className="w-full md:w-1/2 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={false} />
              <YAxis />
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="vertical"
                wrapperStyle={{ display: 'flex', flexDirection: 'column', marginTop: 10 }} 
              />
              <Bar
                dataKey="fees"
                name="Camp Fees"
                fill="#8884d8"
                label={{ position: "inside", fill: "#fff" }}
              >
                {barChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList dataKey="fees" position="inside" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-full md:w-1/2 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={barChartData}
                dataKey="fees"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`} 
              >
                {barChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="vertical"
                wrapperStyle={{ display: 'flex', flexDirection: 'column', marginTop: 10 }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;