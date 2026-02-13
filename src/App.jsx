import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import BuyerInquiry from './pages/BuyerInquiry'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import RequireAuth from './components/RequireAuth'
import { AuthProvider } from './context/AuthContext'
import Infrastructure from './pages/Infrastructure'

export default function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buyer-inquiry" element={<BuyerInquiry />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}
