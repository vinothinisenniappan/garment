import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react';

const SalesAnalytics = ({ stats }) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  
  // Mock data for visualization if real data is sparse
  const categoryData = [
    { name: "T-Shirts", value: 45 },
    { name: "Shirts", value: 25 },
    { name: "Pyjamas", value: 15 },
    { name: "Kidswear", value: 15 }
  ];

  return (
    <div className="sales-analytics animate-fade-in">
      <div className="grid grid--two" style={{ gap: '25px', marginBottom: '25px' }}>
        <div className="pro-card" style={{ padding: '25px', height: '400px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Financial Performance</span>
            <h2>Revenue Summary</h2>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={stats.trendData?.map((v, i) => ({ name: `Day ${i+1}`, sales: v * 1500 }))}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
              <Bar dataKey="sales" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pro-card" style={{ padding: '25px', height: '400px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Market Share</span>
            <h2>Category Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pro-card" style={{ padding: '25px', height: '350px' }}>
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <span className="section-subtitle">Volume Analysis</span>
          <h2>Orders Per Day</h2>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={stats.trendData?.map((v, i) => ({ name: `Day ${i+1}`, orders: v }))}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalytics;
