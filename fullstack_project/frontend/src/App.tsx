import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import UsersManagement from './pages/UsersManagement';
import PublicLayout from './components/layout/PublicLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';

// --- KOMPONEN PELINDUNG HALAMAN (PROTECTED ROUTE) ---
// Jika user tidak punya token, paksa kembali ke /login
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// --- KOMPONEN PENCEGAH HALAMAN LOGIN (PUBLIC ROUTE) ---
// Jika user SUDAH login, cegah mereka membuka halaman /login atau /register
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik (Home, Login, Register) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Route>

        {/* ========================================== */}
        {/* RUTE RAHASIA (DIBUNGKUS PROTECTED LAYOUT)    */}
        {/* ========================================== */}
        <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
          {/* Semua halaman di dalam sini OTOMATIS memiliki Sidebar & Header */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersManagement />} />
        </Route>
        
        <Route path="*" element={<div className="p-12 text-center font-bold text-2xl">404 - Halaman Tidak Ditemukan</div>} />
      </Routes>
    </BrowserRouter>
  );
}