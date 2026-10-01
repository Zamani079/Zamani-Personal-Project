import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass glass-border shadow-lg shadow-ink-950/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-accent-500 blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            TheWild<span className="text-gradient">Sun</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800/60 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            {theme === 'dark' ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}
          </button>

          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600 hover:shadow-accent-500/40 sm:flex"
          >
            Get Support
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 md:hidden dark:border-ink-700 dark:text-ink-300"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass glass-border border-t md:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Get Support
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
