import {
  Stethoscope,
  Wrench,
  Radar,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: Stethoscope,
    number: '01',
    title: 'Diagnose',
    description:
      'We scan your entire environment — servers, endpoints, network, cloud — to map every system and surface hidden risks before they become incidents.',
  },
  {
    icon: Wrench,
    number: '02',
    title: 'Fix',
    description:
      'Issues get resolved fast by engineers who already know your setup. No re-explaining. No starting from scratch. Just fixes that stick.',
  },
  {
    icon: Radar,
    number: '03',
    title: 'Monitor',
    description:
      'Continuous monitoring watches every critical metric. Anomalies trigger alerts to our team — not to your inbox — so problems get caught early.',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Prevent',
    description:
      'We harden systems, apply patches, and close gaps proactively. The goal is simple: fewer fires to fight, more time to innovate.',
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-ink-200 bg-ink-50/50 py-24 dark:border-ink-800 dark:bg-ink-900/30 lg:py-32"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 rounded-full bg-accent-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Four steps.{' '}
            <span className="text-gradient">Zero guesswork.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            A clear, repeatable process that turns reactive IT into proactive
            infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="mt-20">
          {/* Desktop horizontal */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <div className="relative">
              <div className="absolute top-10 left-0 right-0 h-0.5 bg-ink-200 dark:bg-ink-700">
                <div
                  className="h-full bg-gradient-to-r from-accent-500 to-accent-700 transition-all duration-1000 ease-out"
                  style={{ width: inView ? '100%' : '0%' }}
                />
              </div>

              <div className="grid grid-cols-4 gap-8">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="relative text-center"
                      style={{
                        transition: 'all 0.6s ease-out',
                        transitionDelay: `${i * 200}ms`,
                        opacity: inView ? 1 : 0,
                        transform: inView
                          ? 'translateY(0)'
                          : 'translateY(30px)',
                      }}
                    >
                      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
                        <Icon className="h-8 w-8 text-accent-500" />
                        <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white shadow-lg">
                          {i + 1}
                        </div>
                      </div>
                      <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="space-y-8 lg:hidden">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex gap-5"
                  style={{
                    transition: 'all 0.5s ease-out',
                    transitionDelay: `${i * 150}ms`,
                    opacity: inView ? 1 : 0,
                    transform: inView
                      ? 'translateX(0)'
                      : 'translateX(-20px)',
                  }}
                >
                  <div className="relative flex flex-shrink-0 flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
                      <Icon className="h-7 w-7 text-accent-500" />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="mt-2 w-0.5 flex-1 bg-ink-200 dark:bg-ink-700" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-accent-500">
                        {step.number}
                      </span>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
