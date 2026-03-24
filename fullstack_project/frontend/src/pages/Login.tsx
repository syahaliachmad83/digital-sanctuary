import { useState } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('rahasia123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sesuai OAuth2 FastAPI OAuth2, kirim data sebagai Form Data
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await apiClient.post('/api/v1/login/access-token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      localStorage.setItem('access_token', response.data.access_token);
      
      // Arahkan ke dashboard menggunakan react-router
      navigate('/dashboard');

    } catch (err: any) {
      setError('❌ Login gagal. Pastikan email dan password benar.');
    } finally {
      setLoading(false);
    }
  };

  // --- REVISI COMPLETE: INTEGRASI DESAIN STITCH ---
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* SISI KIRI: FORM LOGIN (Sesuai Design System) */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-surface-container-lowest relative">
        
        <div className="w-full max-w-md">
          
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-label text-sm font-semibold text-on-surface-variant ml-4" htmlFor="email">Email Address</label>
              <input 
                className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 outline-none text-on-surface" 
                id="email" 
                name="email" 
                placeholder="name@company.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="block font-label text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                <a className="text-sm font-semibold text-primary hover:text-primary-dim transition-colors" href="#">Forgot password?</a>
              </div>
              <input 
                className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 outline-none text-on-surface" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-container-highest"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface-container-lowest text-on-surface-variant font-medium">Or continue with</span>
            </div>
          </div>
          
          <button className="w-full py-4 flex items-center justify-center space-x-3 bg-surface-container-low text-on-surface font-semibold rounded-full hover:bg-surface-container transition-colors duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span>Sign in with Google</span>
          </button>
          
          <p className="mt-12 text-center text-sm text-on-surface-variant font-medium">
            New to Digital Sanctuary? 
            <button onClick={() => navigate('/register')} type="button" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1">
              Create an account
            </button>
          </p>

        </div>
        
        {/* Footer Logic (Simplified for Login) */}
        <footer className="absolute bottom-0 left-0 w-full px-12 py-8 flex space-x-6">
          <span className="text-[10px] font-label tracking-widest uppercase text-slate-400">© 2024 Digital Sanctuary</span>
          <a className="text-[10px] font-label tracking-widest uppercase text-slate-400 hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="text-[10px] font-label tracking-widest uppercase text-slate-400 hover:text-primary transition-colors" href="#">Terms</a>
        </footer>
      </section>
      
      {/* SISI KANAN: VISUAL / EDITORIAL CANVAS (Original Stitch Design) */}
      <section className="hidden md:flex md:w-1/2 bg-surface-container flex-col justify-center items-center p-12 lg:p-24 relative overflow-hidden">
        {/* Subtle background abstract gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary-container/30 to-primary-container/20"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-6">Security First</span>
            <h2 className="font-headline text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-8">
              Manage your data securely
            </h2>
            <p className="text-lg text-on-surface-variant font-medium max-w-sm leading-relaxed">
              Experience the gold standard in privacy-preserving data analytics and secure cloud management.
            </p>
          </div>
          
          {/* Bento-style Dashboard Illustration (Menggunakan Tonal Layering) */}
          <div className="grid grid-cols-6 grid-rows-6 gap-4 h-80 w-full">
            <div className="col-span-4 row-span-4 glass-card rounded-xl shadow-tonal p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" data-weight="fill">shield</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-6 bg-primary-container rounded-full"></div>
                  <div className="w-1.5 h-4 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-8 bg-primary-dim rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="h-2 w-24 bg-surface-container-highest rounded-full mb-2"></div>
                <div className="h-4 w-40 bg-on-surface/5 rounded-full"></div>
              </div>
            </div>
            
            <div className="col-span-2 row-span-3 bg-primary rounded-xl p-4 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-4xl" data-weight="fill">lock</span>
            </div>
            
            <div className="col-span-2 row-span-3 glass-card rounded-xl shadow-tonal p-4 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold font-headline text-primary">99.9%</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Uptime</span>
            </div>
            
            <div className="col-span-6 row-span-2 glass-card rounded-xl shadow-tonal p-4 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-dim"></div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-primary-container"></div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-tertiary-container"></div>
              </div>
              <div className="flex-1">
                <div className="h-2 w-full bg-on-surface/5 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Decorative Element (Blur effects) */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
      </section>
    </main>
  );
}