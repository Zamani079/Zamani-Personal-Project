import {
  ShieldCheck,
  Linkedin,
  Github,
  Mail,
  ArrowRight,
} from 'lucide-react';

const FOOTER_LINKS = {
  Services: ['Managed IT', 'Cybersecurity', 'Cloud Support', 'Helpdesk', 'Network Infrastructure'],
  Company: ['About Us', 'Careers', 'Partners', 'Blog', 'Contact'],
  Resources: ['Documentation', 'Status Page', 'Security Center', 'SLA', 'Help Center'],
};

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/zamani-mcondisi-madonsela/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bk1plx8wuQKG6LHi6WqmKWA%3D%3D' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Zamani079' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@thewildsun.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50/50 dark:border-ink-800 dark:bg-ink-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid gap-10 py-16 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                TheWild<span className="text-gradient">Sun</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Proactive IT support, cybersecurity, and cloud management for
              businesses that refuse to let technology slow them down.
            </p>

            {/* Newsletter */}
            <div className="mt-6 flex max-w-sm items-center gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-500 dark:border-ink-700 dark:bg-ink-800"
              />
              <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-500 text-white transition-colors hover:bg-accent-600">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white">
                {title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ink-500 transition-colors hover:text-accent-500 dark:text-ink-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Status + social */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-200 py-6 dark:border-ink-800 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-ink-600 dark:text-ink-300">
              All systems operational
            </span>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-500 transition-all hover:border-accent-500 hover:text-accent-500 dark:border-ink-700 dark:text-ink-400"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink-200 py-6 dark:border-ink-800">
          <p className="text-center text-sm text-ink-400">
            &copy; {new Date().getFullYear()} TheWildSun. All rights reserved. | Built by Zamani Madonsela
          </p>
        </div>
      </div>
    </footer>
  );
}
