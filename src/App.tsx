import { ThemeProvider } from '@/hooks/useTheme';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import FindYourFix from '@/components/FindYourFix';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-ink-900 dark:bg-ink-950 dark:text-ink-100">
        <Navbar />
        {/* Top watermark banner */}
        <div className="pointer-events-none fixed top-0 left-0 right-0 z-[60] flex justify-center">
          <div className="mt-0 select-none rounded-b-lg bg-accent-500/10 px-4 py-0.5 backdrop-blur-sm">
            <span className="text-[11px] font-semibold tracking-wide text-accent-600/70 dark:text-accent-400/70">
              Created by Zamani Madonsela
            </span>
          </div>
        </div>
        <main>
          <Hero />
          <StatsBar />
          <Services />
          <HowItWorks />
          <FindYourFix />
          <Testimonials />
          <Pricing />
          <CTABanner />
        </main>
        <Footer />
        {/* Watermark */}
        <div className="pointer-events-none fixed bottom-3 right-3 z-50 select-none">
          <span className="text-[10px] font-medium tracking-wide text-ink-400/40 dark:text-ink-500/40">
            Created by Zamani Madonsela
          </span>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
