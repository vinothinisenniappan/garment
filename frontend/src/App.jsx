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
import { AuthProvider } from './context/AuthContext'
import Infrastructure from './pages/Infrastructure'
import History from './pages/History'
import Products from './pages/Products'

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
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

  return (
    <AuthProvider>
      <div className={isHome ? 'app app--home' : 'app app--internal'}>
        {!isAdmin && <Header theme={theme} onToggleTheme={toggleTheme} />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buyer-inquiry" element={<BuyerInquiry />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/history" element={<History />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        </Routes>
        {!isAdmin && <Footer />}
      </div>
    </AuthProvider>
  )
}
