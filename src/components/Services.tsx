import { useState } from 'react';
import {
  Server,
  Shield,
  Cloud,
  Headphones,
  Network,
  DatabaseBackup,
  ArrowUpRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Service {
  icon: LucideIcon;
  title: string;
  short: string;
  details: string[];
  gradient: string;
}

const SERVICES: Service[] = [
  {
    icon: Server,
    title: 'Managed IT',
    short: 'End-to-end infrastructure management.',
    details: [
      'Proactive server & workstation monitoring',
      'Patch management & updates',
      'Hardware lifecycle planning',
      'Dedicated account manager',
    ],
    gradient: 'from-accent-500 to-accent-700',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    short: 'Threat detection and defense.',
    details: [
      '24/7 SOC monitoring & alerting',
      'Endpoint detection & response',
      'Security awareness training',
      'Compliance & audit support',
    ],
    gradient: 'from-accent-400 to-accent-600',
  },
  {
    icon: Cloud,
    title: 'Cloud Support',
    short: 'Migrate, optimize, and scale.',
    details: [
      'AWS, Azure & GCP management',
      'Cloud migration planning',
      'Cost optimization analysis',
      'Hybrid infrastructure design',
    ],
    gradient: 'from-accent-600 to-accent-800',
  },
  {
    icon: Headphones,
    title: 'Helpdesk',
    short: 'Real humans, fast answers.',
    details: [
      '24/7 ticket & phone support',
      'Remote desktop assistance',
      'Onboarding & offboarding',
      'Knowledge base access',
    ],
    gradient: 'from-accent-500 to-accent-700',
  },
  {
    icon: Network,
    title: 'Network Infrastructure',
    short: 'Design, deploy, and maintain.',
    details: [
      'Network architecture & design',
      'Switch, router & firewall config',
      'WiFi coverage optimization',
      'Bandwidth & traffic analysis',
    ],
    gradient: 'from-accent-400 to-accent-600',
  },
  {
    icon: DatabaseBackup,
    title: 'Data Backup',
    short: 'Never lose a byte.',
    details: [
      'Automated daily backups',
      'Disaster recovery planning',
      'Ransomware-proof immutable storage',
      '15-minute RTO guarantee',
    ],
    gradient: 'from-accent-600 to-accent-800',
  },
];

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: Service;
  index: number;
  inView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-500 hover:border-accent-500/50 hover:shadow-xl hover:shadow-accent-500/10 dark:border-ink-800 dark:bg-ink-900/50 dark:hover:border-accent-500/50"
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Glow on hover */}
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
      />

      <div className="relative">
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>

        <h3 className="text-xl font-bold tracking-tight">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
          {service.short}
        </p>

        {/* Expandable details */}
        <div
          className="grid transition-all duration-500 ease-out"
          style={{
            gridTemplateRows: expanded ? '1fr' : '0fr',
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className="overflow-hidden">
            <ul className="mt-4 space-y-2 border-t border-ink-200 pt-4 dark:border-ink-700">
              {service.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                  {detail}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 dark:text-accent-400"
            >
              Learn more
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything your tech needs.{' '}
            <span className="text-gradient">Nothing it doesn't.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            Six core services that cover the full lifecycle of your IT
            infrastructure. Hover any card to see what's inside.
          </p>
        </div>

        {/* Card grid */}
        <div
          ref={ref}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
