import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [recentBuyers, setRecentBuyers] = useState([]);
  const [recentSamples, setRecentSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      if (response.data.success) {
        setStats(response.data.stats || {});
        setRecentBuyers(response.data.recentBuyers || []);
        setRecentSamples(response.data.recentSamples || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAPI.logout();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Admin Dashboard</h1>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center p-4">
            <h3 className="text-primary">{stats.totalProducts || 0}</h3>
            <p>Total Products</p>
            <Link to="/admin/products" className="btn btn-sm btn-primary">Manage</Link>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center p-4">
            <h3 className="text-primary">{stats.totalBuyers || 0}</h3>
            <p>Buyer Inquiries</p>
            <Link to="/admin/buyers" className="btn btn-sm btn-primary">View</Link>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center p-4">
            <h3 className="text-primary">{stats.totalSamples || 0}</h3>
            <p>Sample Requests</p>
            <Link to="/admin/samples" className="btn btn-sm btn-primary">Manage</Link>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center p-4">
            <h3 className="text-warning">{stats.pendingSamples || 0}</h3>
            <p>Pending Samples</p>
            <Link to="/admin/samples" className="btn btn-sm btn-warning">View</Link>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header"><h5 className="mb-0">Quick Actions</h5></div>
            <div className="card-body">
              <Link to="/admin/products/add" className="btn btn-primary me-2 mb-2">
                <i className="bi bi-plus-circle"></i> Add New Product
              </Link>
              <Link to="/admin/buyers" className="btn btn-secondary me-2 mb-2">
                <i className="bi bi-people"></i> View Buyer Inquiries
              </Link>
              <Link to="/admin/samples" className="btn btn-info me-2 mb-2">
                <i className="bi bi-box-seam"></i> Manage Sample Requests
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Buyer Inquiries</h5>
              <Link to="/admin/buyers" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body">
              {recentBuyers.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBuyers.map(buyer => (
                        <tr key={buyer._id}>
                          <td>{buyer.companyName}</td>
                          <td>{buyer.email}</td>
                          <td><span className="badge bg-secondary">{buyer.status}</span></td>
                          <td>{new Date(buyer.submittedAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted mb-0">No recent buyer inquiries</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Sample Requests</h5>
              <Link to="/admin/samples" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body">
              {recentSamples.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Buyer</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSamples.map(sample => (
                        <tr key={sample._id}>
                          <td>{sample.productId?.name || 'N/A'}</td>
                          <td>{sample.buyerEmail}</td>
                          <td><span className="badge bg-secondary">{sample.status}</span></td>
                          <td>{new Date(sample.requestedAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted mb-0">No recent sample requests</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



