import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import About from './pages/public/About';
import Pricing from './pages/public/Pricing';
import Promotions from './pages/public/Promotions';
import Contact from './pages/public/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import UsersManager from './pages/admin/UsersManager';
import ResetPassword from './pages/admin/ResetPassword';
import ServicesManager from './pages/admin/ServicesManager';
import PlansManager from './pages/admin/PlansManager';
import PromotionsManager from './pages/admin/PromotionsManager';
import MessagesManager from './pages/admin/MessagesManager';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<About />} />
          <Route path="servicios" element={<Services />} />
          <Route path="precios" element={<Pricing />} />
          <Route path="promociones" element={<Promotions />} />
          <Route path="contacto" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="promotions" element={<PromotionsManager />} />
            <Route path="pricing" element={<PlansManager />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="min-h-screen bg-background flex flex-col items-center justify-center"><h1>404 - No Encontrado</h1><a href="/" className="mt-4 text-accent">Volver al inicio</a></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
