import { Routes, Route, useLocation } from 'react-router-dom'
import './styles.css'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Contact from './pages/Contact'
import BuyerInquiry from './pages/BuyerInquiry'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import RequireAuth from './components/RequireAuth'
import RequireUserAuth from './components/RequireUserAuth'
import { AuthProvider, useAuth } from './context/AuthContext'
import Infrastructure from './pages/Infrastructure'
import History from './pages/History'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'

import Partnership from './pages/Partnership'
import QualityPolicy from './pages/QualityPolicy'
import Inventory from './pages/Inventory'
import SampleInquiry from './pages/SampleInquiry'
import BuyerProfile from './pages/BuyerProfile'

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { loading } = useAuth();
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const isAdmin = location.pathname.startsWith('/admin');

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className={isHome ? 'app app--home' : 'app app--internal'}>
      {!isAdmin && <Header theme={theme} onToggleTheme={toggleTheme} />}
      <ScrollToTop />
      <main className="main-content" style={{ minHeight: 'calc(100vh - 300px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buyer-inquiry" element={<RequireUserAuth><BuyerInquiry /></RequireUserAuth>} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />

          <Route path="/partnership" element={<Partnership />} />
          <Route path="/quality-policy" element={<QualityPolicy />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sample-inquiry" element={<RequireUserAuth><SampleInquiry /></RequireUserAuth>} />
          <Route path="/profile" element={<RequireUserAuth><BuyerProfile /></RequireUserAuth>} />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}
