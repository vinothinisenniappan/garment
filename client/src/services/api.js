/**
 * API Service
 * Centralized API calls using axios
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sessions
  headers: {
    'Content-Type': 'application/json'
  }
});

// Products API
export const productsAPI = {
  getFeatured: () => api.get('/products/featured'),
  getAll: (category) => api.get('/products', { params: { category } }),
  getById: (id) => api.get(`/products/${id}`)
};

// Inquiry API
export const inquiryAPI = {
  submit: (data) => api.post('/inquiry', data)
};

// Samples API
export const samplesAPI = {
  getProducts: () => api.get('/samples/products'),
  submitRequest: (data) => api.post('/samples/request', data),
  track: (data) => api.post('/samples/track', data)
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  logout: () => api.post('/admin/logout'),
  checkAuth: () => api.get('/admin/check-auth'),
  getDashboard: () => api.get('/admin/dashboard'),
  getProducts: () => api.get('/admin/products'),
  getProduct: (id) => api.get(`/admin/products/${id}`),
  addProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  getBuyers: () => api.get('/admin/buyers'),
  getBuyer: (id) => api.get(`/admin/buyers/${id}`),
  updateBuyerStatus: (id, data) => api.put(`/admin/buyers/${id}/status`, data),
  getSamples: () => api.get('/admin/samples'),
  updateSampleStatus: (id, data) => api.put(`/admin/samples/${id}/status`, data)
};

export default api;

