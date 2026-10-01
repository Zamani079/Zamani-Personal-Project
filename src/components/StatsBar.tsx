import { Clock, CheckCircle, Smile, TrendingUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  decimals: number;
}

const STATS: Stat[] = [
  {
    icon: Clock,
    value: 2.8,
    suffix: ' min',
    prefix: '',
    label: 'Avg. response time',
    decimals: 1,
  },
  {
    icon: TrendingUp,
    value: 99.99,
    suffix: '%',
    prefix: '',
    label: 'Guaranteed uptime',
    decimals: 2,
  },
  {
    icon: CheckCircle,
    value: 48000,
    suffix: '+',
    prefix: '',
    label: 'Tickets resolved',
    decimals: 0,
  },
  {
    icon: Smile,
    value: 98.6,
    suffix: '%',
    prefix: '',
    label: 'Client satisfaction',
    decimals: 1,
  },
];

function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  const count = useCountUp(stat.value, 2200, start);
  const display = stat.decimals > 0 ? count.toFixed(stat.decimals) : count.toLocaleString();
  const Icon = stat.icon;

  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-3xl font-bold tracking-tight sm:text-4xl">
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="mt-1 text-sm text-ink-500 dark:text-ink-400">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      id="stats"
      ref={ref}
      className="relative border-y border-ink-200 bg-ink-50/50 py-12 dark:border-ink-800 dark:bg-ink-900/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="transition-all duration-500"
              style={{
                transitionDelay: `${i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <StatCard stat={stat} start={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
