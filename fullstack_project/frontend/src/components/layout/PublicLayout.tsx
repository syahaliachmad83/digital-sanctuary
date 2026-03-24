import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col relative selection:bg-primary/20">
      
      {/* 1. HEADER GLOBAL (Fixed + Glassmorphism agar elegan saat di-scroll) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-surface-container/50">
        <nav className="flex justify-between items-center w-full px-6 md:px-12 py-4 md:py-6 max-w-screen-2xl mx-auto">
          
          {/* Brand Logo - Ukuran disesuaikan untuk mobile */}
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-slate-900 font-headline hover:opacity-80 transition-opacity">
            Digital Sanctuary
          </Link>

          {/* Navigation Links (Hanya muncul di Desktop) */}
          <div className="hidden md:flex items-center gap-12">
            <a className="text-on-surface-variant font-medium text-sm tracking-tight hover:text-primary transition-colors duration-300" href="#">Product</a>
            <a className="text-on-surface-variant font-medium text-sm tracking-tight hover:text-primary transition-colors duration-300" href="#">Pricing</a>
          </div>

          {/* Trailing Actions - Perbaikan Desak-desakan Mobile */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Teks Sign In disembunyikan di HP layar sangat kecil agar tidak sempit */}
            <Link 
              to="/login" 
              className="hidden sm:block text-primary font-semibold text-sm tracking-tight hover:text-primary-dim transition-colors"
            >
              Sign In
            </Link>
            {/* Tombol Join dikecilkan sedikit paddingnya di mobile */}
            <Link 
              to="/register" 
              className="bg-primary text-on-primary px-5 md:px-8 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm tracking-tight hover:bg-primary-dim transition-all shadow-tonal hover:shadow-lg hover:-translate-y-0.5"
            >
              Join
            </Link>
          </div>

        </nav>
      </header>

      {/* 2. AREA KONTEN (Ditambah pt-20 untuk HP dan pt-28 untuk Desktop agar tidak tertimpa Header) */}
      <main className="flex-1 flex flex-col w-full pt-20 md:pt-28">
        <Outlet /> 
      </main>

    </div>
  );
}