import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles.css';

export default function Inventory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders/my-orders');
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch orders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#F59E0B';
            case 'Confirmed': return '#10B981';
            case 'Shipped': return '#3B82F6';
            case 'Delivered': return '#8B5CF6';
            case 'Cancelled': return '#EF4444';
            default: return '#6B7280';
        }
    };

    const milestonesList = ['Sourcing', 'Cutting', 'Stitching', 'QC', 'Shipping'];

    if (loading) return <div className="loading-screen">Loading your inventory...</div>;

    return (
        <div className="inventory-page">
            <div className="page-header-simple">
                <div className="container">
                    <h1>My Inventory & Orders</h1>
                    <p>Track your manufacturing progress and order history in real-time.</p>
                </div>
            </div>

            <div className="container" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
                {error && <div className="alert alert-error">{error}</div>}

                {orders.length === 0 ? (
                    <div className="empty-inventory glassmorphic" style={{ padding: '3rem', textAlign: 'center' }}>
                        <h3>No orders found</h3>
                        <p>You haven't placed any manufacturing orders yet.</p>
                        <a href="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Products</a>
                    </div>
                ) : (
                    <div className="inventory-grid">
                        <div className="inventory-list">
                            {orders.map(order => (
                                <div 
                                    key={order._id} 
                                    className={`inventory-card glassmorphic ${selectedOrder?._id === order._id ? 'active' : ''}`}
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <div className="card-top">
                                        <span className="order-number">Order #{order._id.slice(-6).toUpperCase()}</span>
                                        <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="card-middle">
                                        <div className="order-items-summary">
                                            {order.items.map((item, idx) => (
                                                <span key={idx}>{item.name} ({item.quantity})</span>
                                            )).reduce((prev, curr) => [prev, ', ', curr])}
                                        </div>
                                        <div className="order-total">${order.totalAmount.toLocaleString()}</div>
                                    </div>
                                    <div className="card-bottom">
                                        <span className="status-tag" style={{ backgroundColor: getStatusColor(order.status) + '22', color: getStatusColor(order.status) }}>
                                            {order.status}
                                        </span>
                                        <span className="milestone-text">Current: {order.currentMilestone}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="inventory-detail-view">
                            {selectedOrder ? (
                                <div className="detail-compact glassmorphic animate-in">
                                    <div className="detail-header">
                                        <h2>Order Details</h2>
                                        <span className="status-badge" style={{ backgroundColor: getStatusColor(selectedOrder.status) }}>{selectedOrder.status}</span>
                                    </div>

                                    <div className="milestone-tracker">
                                        {milestonesList.map((m, idx) => {
                                            const currentIndex = milestonesList.indexOf(selectedOrder.currentMilestone);
                                            const isCompleted = idx < currentIndex;
                                            const isCurrent = idx === currentIndex;
                                            
                                            return (
                                                <div key={m} className={`milestone-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                                    <div className="step-node">
                                                        {isCompleted ? '✓' : idx + 1}
                                                    </div>
                                                    <span className="step-label">{m}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="detail-sections">
                                        <div className="detail-section">
                                            <h4>Items</h4>
                                            <div className="items-list">
                                                {selectedOrder.items.map((item, idx) => (
                                                    <div key={idx} className="item-row">
                                                        <span>{item.name} - {item.size}</span>
                                                        <span>Qty: {item.quantity}</span>
                                                        <span>${(item.priceAtPurchase * item.quantity).toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="detail-section">
                                            <h4>Shipping Address</h4>
                                            <p>
                                                {selectedOrder.shippingAddress.name}<br />
                                                {selectedOrder.shippingAddress.street}<br />
                                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                                                {selectedOrder.shippingAddress.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="detail-footer">
                                        <div className="total-box">
                                            <span>Total Amount</span>
                                            <h3>${selectedOrder.totalAmount.toLocaleString()}</h3>
                                        </div>
                                        <button className="btn btn-outline">Download Invoice</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-detail glassmorphic">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, marginBottom: '1rem' }}>
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                        <polyline points="10 9 9 9 8 9" />
                                    </svg>
                                    <p>Select an order to view detailed manufacturing progress</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .inventory-page {
                    min-height: 100vh;
                    background: var(--bg);
                    padding-top: 80px;
                }
                .inventory-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 2rem;
                }
                .inventory-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .inventory-card {
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .inventory-card:hover {
                    transform: translateY(-2px);
                    background: rgba(255,255,255,0.08);
                }
                .inventory-card.active {
                    border-color: var(--accent);
                    background: rgba(var(--accent-rgb), 0.1);
                }
                .card-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }
                .order-number {
                    font-weight: 700;
                    color: var(--accent);
                    letter-spacing: 1px;
                }
                .order-date {
                    font-size: 0.85rem;
                    opacity: 0.6;
                }
                .card-middle {
                    margin-bottom: 1rem;
                }
                .order-items-summary {
                    font-size: 0.95rem;
                    display: block;
                    margin-bottom: 0.25rem;
                }
                .order-total {
                    font-weight: 600;
                    font-size: 1.1rem;
                }
                .card-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .status-tag {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                .milestone-text {
                    font-size: 0.85rem;
                    opacity: 0.8;
                }

                .detail-compact {
                    padding: 2rem;
                    position: sticky;
                    top: 100px;
                }
                .detail-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .status-badge {
                    padding: 0.4rem 1rem;
                    border-radius: 4px;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .milestone-tracker {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 3rem;
                    position: relative;
                }
                .milestone-tracker::before {
                    content: '';
                    position: absolute;
                    top: 15px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: rgba(255,255,255,0.1);
                    z-index: 0;
                }
                .milestone-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    z-index: 1;
                    flex: 1;
                }
                .step-node {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--bg);
                    border: 2px solid rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.8rem;
                    transition: all 0.3s ease;
                }
                .milestone-step.completed .step-node {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: white;
                }
                .milestone-step.current .step-node {
                    border-color: var(--accent);
                    box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.5);
                }
                .step-label {
                    font-size: 0.75rem;
                    font-weight: 600;
                    opacity: 0.6;
                }
                .milestone-step.current .step-label {
                    opacity: 1;
                    color: var(--accent);
                }

                .detail-sections {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .detail-section h4 {
                    margin-bottom: 1rem;
                    color: var(--accent);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .item-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    font-size: 0.9rem;
                }
                .detail-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .total-box span {
                    font-size: 0.85rem;
                    opacity: 0.6;
                }
                .empty-detail {
                    height: 400px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                }

                @media (max-width: 992px) {
                    .inventory-grid {
                        grid-template-columns: 1fr;
                    }
                    .detail-compact {
                        position: static;
                    }
                }
            `}</style>
        </div>
    );
}
