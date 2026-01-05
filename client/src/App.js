import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';
import Inquiry from './components/pages/Inquiry';
import SampleRequest from './components/pages/SampleRequest';
import SampleTrack from './components/pages/SampleTrack';
import Contact from './components/pages/Contact';
import InquirySuccess from './components/pages/InquirySuccess';
import ThemeGuide from './components/pages/ThemeGuide';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/inquiry/success" element={<InquirySuccess />} />
            <Route path="/samples/request" element={<SampleRequest />} />
            <Route path="/samples/track" element={<SampleTrack />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/style" element={<ThemeGuide />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={<PrivateRoute><AdminDashboard /></PrivateRoute>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

