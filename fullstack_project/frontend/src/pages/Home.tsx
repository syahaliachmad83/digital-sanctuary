import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center min-h-[716px] pt-12 md:pt-24">
        <div className="space-y-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1] font-headline">
            Your data. Secured in our <span className="text-primary">sanctuary.</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">
            Experience peace of mind with privacy-preserving analytics designed for the modern enterprise. Scale without compromising integrity.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]"
            >
              Get Started
            </button>
            <button className="bg-surface-container-high text-on-surface px-10 py-5 rounded-full text-lg font-bold hover:bg-surface-container-highest transition-all active:scale-[0.98]">
              Learn More
            </button>
          </div>
        </div>

        {/* Abstract Graphic Right Side */}
        <div className="relative h-[400px] md:h-[500px] w-full bg-surface-container rounded-[3rem] overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 grid-rows-3 gap-4 w-2/3 h-2/3">
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700"></div>
              <div className="bg-primary/20 rounded-2xl backdrop-blur-sm transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-700 delay-100"></div>
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm"></div>
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm col-span-2 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-700 delay-200"></div>
              <div className="bg-primary-container/30 rounded-2xl backdrop-blur-md"></div>
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-700 delay-300"></div>
              <div className="bg-primary rounded-2xl shadow-lg"></div>
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm"></div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-on-surface tracking-tight">System Integrity Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Value Props */}
      <section className="w-full max-w-7xl mx-auto px-8 mt-32 md:mt-48">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-on-surface">Built on Integrity.</h2>
          <p className="text-on-surface-variant mt-4 text-xl">Architected for the highest security standards.</p>
        </div>
        
        <div className="bg-surface-container p-4 md:p-8 rounded-[3rem] grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 */}
          <div className="md:col-span-7 bg-surface-container-lowest p-12 rounded-[2.5rem] flex flex-col justify-between group hover:bg-surface-bright transition-colors duration-500 min-h-[320px]">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 font-headline text-on-surface">Military-grade Encryption</h3>
              <p className="text-on-surface-variant text-lg max-w-md">AES-256 bit encryption at rest and in transit, ensuring your data remains invisible to unauthorized eyes.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="md:col-span-5 bg-surface-container-lowest p-12 rounded-[2.5rem] flex flex-col justify-between group hover:bg-surface-bright transition-colors duration-500">
            <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-8 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl">bar_chart</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">Privacy-Preserving Analytics</h3>
              <p className="text-on-surface-variant text-lg">Extract insights without exposing individual identifiers.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="md:col-span-4 bg-surface-container-lowest p-12 rounded-[2.5rem] flex flex-col justify-between group hover:bg-surface-bright transition-colors duration-500 min-h-[320px]">
            <div className="w-16 h-16 rounded-2xl bg-error-container/20 flex items-center justify-center text-error mb-8 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">Real-time Monitoring</h3>
              <p className="text-on-surface-variant text-lg">Instant detection and mitigation of potential security threats.</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="md:col-span-8 bg-surface-container-lowest p-12 rounded-[2.5rem] flex flex-col justify-between group hover:bg-surface-bright transition-colors duration-500">
            <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl">account_balance</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 font-headline text-on-surface">Compliant Data Vaults</h3>
              <p className="text-on-surface-variant text-lg max-w-xl">Fully localized data residency options meeting GDPR, HIPAA, and SOC2 Type II compliance effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full max-w-7xl mx-auto px-8 mt-32 md:mt-48">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">The Sanctuary Difference</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-headline text-on-surface">Security that doesn't slow you down.</h2>
            <div className="space-y-6">
              <div className="flex gap-6 p-6 rounded-2xl bg-surface-container-low">
                <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined">speed</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-on-surface">Ultra-low Latency</h4>
                  <p className="text-on-surface-variant">Global edge network ensures encryption happens in microseconds.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl">
                <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">api</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-on-surface">Developer First</h4>
                  <p className="text-on-surface-variant">Integrate our sanctuary into your stack with a single API call.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container p-8 md:p-12 rounded-[3rem]">
            <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold">JA</div>
                <div>
                  <p className="font-bold text-on-surface">Julianne Aris</p>
                  <p className="text-sm text-on-surface-variant">CTO, Global Finance Corp</p>
                </div>
              </div>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-on-surface italic">
                "Digital Sanctuary transformed our compliance roadmap from a multi-month project into a week-long implementation. The tonal elegance of the product is matched only by its technical depth."
              </blockquote>
              <div className="flex gap-1 text-primary">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-7xl mx-auto px-8 mt-32 md:mt-48 mb-24">
        <div className="bg-gradient-to-br from-primary to-primary-dim p-16 md:p-24 rounded-[3rem] text-center space-y-10 relative overflow-hidden group shadow-xl">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight relative z-10 font-headline">Ready to secure your future?</h2>
          <p className="text-primary-fixed-dim text-xl max-w-2xl mx-auto relative z-10">Join 500+ enterprise teams who trust Digital Sanctuary with their most sensitive assets.</p>
          <div className="relative z-10 pt-4">
            <button 
              onClick={() => navigate('/register')}
              className="bg-surface-container-lowest text-primary px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-[0.98]"
            >
              Join the Sanctuary
            </button>
          </div>
          <p className="text-primary-fixed-dim/70 text-sm relative z-10">No credit card required. SOC2 compliant onboarding.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] bg-surface-container-low text-sm leading-6 mt-12">
        <div className="max-w-7xl mx-auto px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold text-on-surface font-headline">
            Digital Sanctuary
          </div>
          <div className="text-on-surface-variant">
            © 2024 Digital Sanctuary. All rights reserved.
          </div>
          <div className="flex items-center space-x-8 font-medium">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}