import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const DashboardHome = ({ stats, recentOrders }) => {
  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `₹${stats.totalRevenue?.toLocaleString()}`, 
      trend: '+12.5%', 
      icon: TrendingUp, 
      color: '#10b981',
      bg: '#ecfdf5'
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      trend: '+8.2%', 
      icon: ShoppingCart, 
      color: '#3b82f6',
      bg: '#eff6ff'
    },
    { 
      label: 'Products', 
      value: stats.totalProducts, 
      trend: `${stats.activeProducts} Active`, 
      icon: ShoppingBag, 
      color: '#8b5cf6',
      bg: '#f5f3ff'
    },
    { 
      label: 'Low Stock', 
      value: stats.lowStockAlerts, 
      trend: 'Action Reqd', 
      icon: AlertTriangle, 
      color: '#f59e0b',
      bg: '#fffbeb'
    }
  ];

  const chartData = stats.trendData?.map((count, i) => ({
    day: `Day ${i + 1}`,
    inquiries: count
  })) || [];

  return (
    <div className="dashboard-home animate-fade-in">
      <div className="grid grid--four" style={{ gap: '20px', marginBottom: '30px' }}>
        {statCards.map((card) => (
          <div key={card.label} className="pro-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: card.bg, color: card.color }}>
                <card.icon size={24} />
              </div>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 700, 
                color: card.trend.startsWith('+') ? '#10b981' : '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}>
                {card.trend} {card.trend.includes('%') && <ArrowUpRight size={14} />}
              </span>
            </div>
            <div>
              <p className="cap-desc" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</p>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '5px 0 0', color: 'var(--primary)' }}>{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid--two" style={{ gap: '25px', marginBottom: '30px' }}>
        <div className="pro-card" style={{ padding: '25px', height: '400px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Growth Analytics</span>
            <h2>Inquiry Trends</h2>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }}
              />
              <Area type="monotone" dataKey="inquiries" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorInq)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="pro-card" style={{ padding: '25px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Real-time Operations</span>
            <h2>Recent Orders</h2>
          </div>
          <div className="pro-table-wrap">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Order Info</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders?.map(order => (
                  <tr key={order._id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{order.buyerId?.companyName || 'Guest'}</div>
                      <div className="cap-desc" style={{ fontSize: '11px' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td style={{ fontWeight: 600 }}>₹{order.totalAmount?.toLocaleString()}</td>
                    <td>
                      <span className="status-tag" style={{ 
                        background: order.status === 'Delivered' ? '#D1FAE5' : '#DBEAFE',
                        color: order.status === 'Delivered' ? '#065F46' : '#1E40AF'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!recentOrders || recentOrders.length === 0) && (
                   <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px' }} className="cap-desc">No recent orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
