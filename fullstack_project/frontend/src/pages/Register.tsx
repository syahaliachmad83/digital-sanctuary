import { useState } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState(''); // Disiapkan untuk upgrade DB berikutnya
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Registrasi menggunakan format JSON standar (bukan Form Data seperti Login)
      await apiClient.post('/api/v1/users/register', {
        email: email,
        password: password,
      });

      // Jika sukses, arahkan ke login dan bawa emailnya
      alert(`Registrasi sukses untuk ${email}! Silakan login.`);
      navigate('/login');

    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(`❌ ${err.response.data.detail}`);
      } else {
        setError('❌ Gagal terhubung ke server. Pastikan backend menyala.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row font-body bg-background text-on-surface">
      {/* KIRI: Form Registrasi */}
      <section className="flex-1 bg-surface-container-lowest flex items-center justify-center p-8 md:p-16 lg:p-24 relative">
        
        <div className="w-full max-w-md space-y-12 mt-16 md:mt-0">

          {error && <div className="bg-red-50 text-error p-4 rounded-xl text-sm font-medium border border-red-100">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant px-4">Full Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 placeholder-outline-variant outline-none" 
                placeholder="Jane Doe" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant px-4">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 placeholder-outline-variant outline-none" 
                placeholder="jane@sanctuary.io" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant px-4">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 placeholder-outline-variant outline-none" 
                placeholder="••••••••" 
                required
                minLength={6}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-full font-semibold text-lg shadow-tonal hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300 active:scale-95 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Create Account'}
            </button>
          </form>

          {/* Separator */}
          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-surface-container-highest"></div>
            <span className="flex-shrink mx-4 text-sm text-outline-variant font-medium">Or continue with</span>
            <div className="flex-grow border-t border-surface-container-highest"></div>
          </div>

          <button className="w-full flex items-center justify-center space-x-3 py-4 rounded-full bg-surface-container border-none hover:bg-surface-container-high transition-colors font-medium text-on-surface">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span>Sign up with Google</span>
          </button>

          <footer className="text-center">
            <p className="text-on-surface-variant text-sm">
                Already have an account? 
                <button onClick={() => navigate('/login')} type="button" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1">
                  Sign In
                </button>
            </p>
          </footer>
        </div>
      </section>

      {/* KANAN: Brand Visuals (Design System Validated) */}
      <section className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary-container relative overflow-hidden items-center justify-center p-24">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-primary-container/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-lg space-y-12">
            <div className="space-y-6">
                <h2 className="font-headline text-5xl font-extrabold text-white leading-tight">Build your secure data hub</h2>
                <p className="text-white/80 font-body text-xl leading-relaxed">Empower your team with advanced analytics and military-grade encryption from day one.</p>
            </div>
            
            <div className="relative h-96 w-full">
                {/* Visual Cards */}
                <div className="absolute top-0 left-0 w-64 h-48 bg-white/10 backdrop-blur-2xl rounded-xl p-6 border border-white/10 shadow-tonal">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-white/60 text-xs font-label tracking-widest uppercase">System Activity</span>
                        <span className="material-symbols-outlined text-white/40">monitoring</span>
                    </div>
                    <div className="flex items-end space-x-2 h-16">
                        <div className="w-3 bg-white/20 rounded-full h-8"></div>
                        <div className="w-3 bg-white/40 rounded-full h-12"></div>
                        <div className="w-3 bg-white/20 rounded-full h-6"></div>
                        <div className="w-3 bg-white rounded-full h-16"></div>
                        <div className="w-3 bg-white/60 rounded-full h-10"></div>
                    </div>
                </div>
                
                <div className="absolute bottom-4 right-0 w-72 h-64 bg-surface-container-lowest rounded-xl p-8 shadow-tonal">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-32 bg-surface-container rounded-full mx-auto"></div>
                            <div className="h-2 w-24 bg-surface-container-low rounded-full mx-auto"></div>
                        </div>
                        <div className="w-full p-3 bg-primary/10 rounded-lg text-primary text-xs font-bold tracking-tight">ENCRYPTION ACTIVE</div>
                    </div>
                </div>
                
                {/* Team Avatars */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 flex -space-x-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary-container bg-surface-container-highest flex items-center justify-center font-bold text-on-surface-variant text-xs">J</div>
                    <div className="w-12 h-12 rounded-full border-4 border-primary-container bg-surface-container-highest flex items-center justify-center font-bold text-on-surface-variant text-xs">A</div>
                    <div className="w-12 h-12 rounded-full border-4 border-primary-container bg-surface-container-lowest flex items-center justify-center text-primary text-xs font-bold">+12</div>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}