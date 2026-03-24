import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

interface User {
  email: string;
  role: string;
}

export default function ProtectedLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data user untuk Header
  useEffect(() => {
    apiClient.get('/api/v1/users/me')
      .then(res => setUser(res.data))
      .catch(() => {
        // Jika token invalid, paksa logout
        localStorage.removeItem('access_token');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  // Helper untuk mengecek menu aktif
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-background min-h-screen text-on-surface font-body overflow-hidden flex flex-col">
      
      {/* ========================================== */}
      {/* 1. TOP HEADER (Fixed)                      */}
      {/* ========================================== */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-tonal h-20 px-6 flex justify-between items-center transition-all">
        <div className="flex items-center gap-12">
          <span className="text-xl font-black text-slate-900 tracking-tighter font-headline">Digital Sanctuary</span>
          
          {/* Global Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2.5 rounded-full w-96 focus-within:bg-surface-container-lowest focus-within:shadow-tonal transition-all border border-transparent">
            <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2">search</span>
            <input 
              type="text" 
              placeholder="Search protected assets..." 
              className="bg-transparent border-none focus:ring-0 text-sm font-body w-full placeholder:text-on-surface-variant/60 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-all flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          
          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1 pr-3 hover:bg-surface-container-low rounded-full transition-all border border-transparent"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl shadow-slate-200/50 p-2 z-50 border border-surface-container-highest animate-fade-in-up">
                <div className="px-4 py-3 mb-2 border-b border-surface-container">
                  <p className="text-xs text-on-surface-variant font-medium">Signed in as</p>
                  <p className="text-sm font-bold text-on-surface truncate">{user?.email}</p>
                </div>
                <Link to="/users" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low rounded-md transition-colors">
                  <span className="material-symbols-outlined text-lg">verified_user</span> User Management
                </Link>
                <div className="h-px bg-surface-container my-1"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error-container/10 rounded-md transition-colors text-left">
                  <span className="material-symbols-outlined text-lg">logout</span> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 2. BODY WRAPPER                            */}
      {/* ========================================== */}
      <div className="flex h-screen pt-20">
        
        {/* SIDEBAR (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-surface-container-lowest h-full p-4 space-y-2 z-40 relative">
          
          <div className="px-4 py-6 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-tonal">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-headline leading-tight">Sanctuary</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim">Secure Workspace</p>
            </div>
          </div>

          {/* Navigation Links */}
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard') ? 'bg-surface-container text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low font-medium'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/dashboard') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
            <span className="text-sm font-body">Home</span>
          </Link>
          
          <Link to="/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/users') ? 'bg-surface-container text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low font-medium'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/users') ? "'FILL' 1" : "'FILL' 0" }}>verified_user</span>
            <span className="text-sm font-body">Security Center</span>
          </Link>

          {/* Sidebar Footer Indicator */}
          <div className="mt-auto p-4 bg-surface-container-low rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-tighter">System Normal</span>
            </div>
            <button className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:shadow-tonal hover:bg-primary-dim transition-all">
              System Audit
            </button>
          </div>
        </aside>

        {/* MAIN DYNAMIC CONTENT (Proyektor) */}
        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-12 relative">
          <div className="max-w-6xl mx-auto pb-24">
            <Outlet /> 
          </div>
        </main>
      </div>

      {/* ========================================== */}
      {/* 3. MOBILE NAVIGATION (Bottom)              */}
      {/* ========================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest/90 backdrop-blur-xl flex justify-around items-center h-16 px-4 z-50 border-t border-surface-container-highest">
        <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/dashboard') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
        </Link>
        <Link to="/users" className={`flex flex-col items-center gap-1 ${isActive('/users') ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/users') ? "'FILL' 1" : "'FILL' 0" }}>verified_user</span>
        </Link>
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-error/80 hover:text-error">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </nav>

    </div>
  );
}