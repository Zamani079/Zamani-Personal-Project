import { useState } from 'react';
import { Check, ArrowRight, Zap, Building, Crown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Plan {
  name: string;
  icon: LucideIcon;
  monthly: number;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    icon: Zap,
    monthly: 499,
    description: 'For small teams that need reliable IT without the overhead.',
    features: [
      'Up to 15 endpoints managed',
      '24/7 helpdesk support',
      'Daily automated backups',
      'Basic cybersecurity suite',
      'Monthly health reports',
    ],
    highlighted: false,
    cta: 'Start with Starter',
  },
  {
    name: 'Business',
    icon: Building,
    monthly: 1299,
    description: 'For growing companies that need comprehensive coverage.',
    features: [
      'Up to 75 endpoints managed',
      '24/7 helpdesk with priority queue',
      'Advanced cybersecurity & SOC',
      'Cloud management & optimization',
      'Disaster recovery planning',
      'Dedicated account manager',
      'Weekly health reports',
    ],
    highlighted: true,
    cta: 'Choose Business',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    monthly: 3499,
    description: 'For large organizations with complex infrastructure.',
    features: [
      'Unlimited endpoints',
      '24/7 helpdesk with VIP routing',
      'Full SOC + compliance support',
      'Multi-cloud architecture',
      'Custom SLA with guarantees',
      'Dedicated engineer on call',
      'Quarterly strategy reviews',
      'On-site support available',
    ],
    highlighted: false,
    cta: 'Go Enterprise',
  },
];

const ANNUAL_DISCOUNT = 0.85; // ~2 months free

function PricingCard({
  plan,
  annual,
  inView,
  index,
}: {
  plan: Plan;
  annual: boolean;
  inView: boolean;
  index: number;
}) {
  const price = annual
    ? Math.round(plan.monthly * ANNUAL_DISCOUNT)
    : plan.monthly;
  const Icon = plan.icon;

  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-500 ${
        plan.highlighted
          ? 'border-accent-500 bg-white shadow-2xl shadow-accent-500/20 lg:scale-105 dark:bg-ink-900'
          : 'border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900/50'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: inView ? 1 : 0,
        transform: inView
          ? plan.highlighted
            ? 'translateY(0) scale(1.05)'
            : 'translateY(0)'
          : 'translateY(30px)',
      }}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-accent-500 to-accent-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
            <Zap className="h-3.5 w-3.5 fill-white" />
            Most popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
          plan.highlighted
            ? 'bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg shadow-accent-500/30'
            : 'bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300'
        }`}
      >
        <Icon
          className={`h-7 w-7 ${plan.highlighted ? 'text-white' : ''}`}
        />
      </div>

      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
        {plan.description}
      </p>

      {/* Price */}
      <div className="mt-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight">
            ${price.toLocaleString()}
          </span>
          <span className="text-sm text-ink-500 dark:text-ink-400">/mo</span>
        </div>
        {annual && (
          <span className="mt-1 inline-block text-sm font-medium text-accent-600 dark:text-accent-400">
            Billed annually — save 15%
          </span>
        )}
        {!annual && (
          <span className="mt-1 inline-block text-sm text-ink-400">
            Billed monthly
          </span>
        )}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className={`mt-6 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all ${
          plan.highlighted
            ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30 hover:bg-accent-600'
            : 'border border-ink-300 text-ink-800 hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-ink-100 dark:hover:border-accent-500 dark:hover:text-accent-400'
        }`}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </a>

      {/* Features */}
      <ul className="mt-8 space-y-3 border-t border-ink-200 pt-6 dark:border-ink-700">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-ink-600 dark:text-ink-300"
          >
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-500/10">
              <Check className="h-3.5 w-3.5 text-accent-500" />
            </div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pricing() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-ink-200 bg-ink-50/50 py-24 dark:border-ink-800 dark:bg-ink-900/30 lg:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Plans that scale with you.{' '}
            <span className="text-gradient">No surprises.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            Transparent monthly pricing. Cancel anytime. All plans include our
            99.99% uptime guarantee.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-semibold transition-colors ${
              !annual
                ? 'text-ink-900 dark:text-white'
                : 'text-ink-400'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual((v) => !v)}
            className="relative h-8 w-16 rounded-full bg-ink-200 transition-colors dark:bg-ink-700"
            aria-label="Toggle billing period"
          >
            <div
              className={`absolute top-1 h-6 w-6 rounded-full bg-accent-500 shadow-lg transition-transform duration-300 ${
                annual ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span
            className={`text-sm font-semibold transition-colors ${
              annual
                ? 'text-ink-900 dark:text-white'
                : 'text-ink-400'
            }`}
          >
            Annual
          </span>
          <span className="rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-bold text-accent-600 dark:text-accent-400">
            Save 15%
          </span>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8 lg:items-start"
        >
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              annual={annual}
              inView={inView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
