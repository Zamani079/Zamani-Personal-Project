import { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Building2,
  Users,
  ShieldAlert,
  Cloud,
  Server,
  Headphones,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Option {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface Question {
  prompt: string;
  options: Option[];
}

interface Recommendation {
  plan: string;
  tagline: string;
  features: string[];
  icon: LucideIcon;
}

const QUESTIONS: Question[] = [
  {
    prompt: 'How large is your team?',
    options: [
      { label: '1–10 people', value: 'small', icon: Users },
      { label: '11–50 people', value: 'medium', icon: Building2 },
      { label: '50+ people', value: 'large', icon: Building2 },
    ],
  },
  {
    prompt: 'What keeps you up at night?',
    options: [
      { label: 'Cyber attacks & breaches', value: 'security', icon: ShieldAlert },
      { label: 'Downtime & outages', value: 'uptime', icon: Server },
      { label: 'Cloud complexity', value: 'cloud', icon: Cloud },
    ],
  },
  {
    prompt: 'How do you handle IT today?',
    options: [
      { label: 'DIY — we manage it ourselves', value: 'diy', icon: Headphones },
      { label: 'Break-fix — we call when things break', value: 'breakfix', icon: ShieldAlert },
      { label: 'We have an IT person or team', value: 'internal', icon: Server },
    ],
  },
];

const RECOMMENDATIONS: Record<string, Recommendation> = {
  'small-security-diy': {
    plan: 'Starter',
    tagline: 'Perfect for small teams that need enterprise-grade security without the overhead.',
    features: ['Cybersecurity essentials', '24/7 helpdesk', 'Cloud backup'],
    icon: ShieldAlert,
  },
  'small-uptime-diy': {
    plan: 'Starter',
    tagline: 'Keep your small team online with proactive monitoring and fast support.',
    features: ['Managed IT basics', '24/7 helpdesk', 'Daily backups'],
    icon: Server,
  },
  'medium-security-breakfix': {
    plan: 'Business',
    tagline: 'Move from reactive to proactive with full cybersecurity and managed infrastructure.',
    features: ['SOC monitoring', 'Managed IT', 'Disaster recovery'],
    icon: ShieldAlert,
  },
  'large-cloud-internal': {
    plan: 'Enterprise',
    tagline: 'Augment your internal team with cloud expertise and 24/7 coverage.',
    features: ['Cloud architecture', 'Dedicated engineer', 'SLA guarantees'],
    icon: Cloud,
  },
};

const DEFAULT_REC: Recommendation = {
  plan: 'Business',
  tagline: 'The sweet spot for growing companies that want comprehensive IT coverage.',
  features: ['Managed IT', 'Cybersecurity', '24/7 helpdesk', 'Cloud support'],
  icon: Sparkles,
};

export default function FindYourFix() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const getRecommendation = (): Recommendation => {
    const key = `${answers[0]}-${answers[1]}-${answers[2]}`;
    return RECOMMENDATIONS[key] || DEFAULT_REC;
  };

  const progress = showResult
    ? 100
    : (step / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[step];
  const rec = showResult ? getRecommendation() : null;
  const RecIcon = rec?.icon;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Find your fix
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Not sure where to start?{' '}
            <span className="text-gradient">Let us match you.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            Answer three quick questions and we'll recommend the right service
            plan for your business.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-xl shadow-ink-950/5 dark:border-ink-800 dark:bg-ink-900/50"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          {/* Progress bar */}
          <div className="h-1.5 bg-ink-100 dark:bg-ink-800">
            <div
              className="h-full bg-gradient-to-r from-accent-500 to-accent-700 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-8 sm:p-12">
            {showResult && rec ? (
              /* Result */
              <div className="animate-fade-up text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg shadow-accent-500/30">
                  {RecIcon && <RecIcon className="h-10 w-10 text-white" />}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-1.5 text-sm font-semibold text-accent-600 dark:text-accent-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Your recommended plan
                </div>
                <h3 className="mt-4 text-3xl font-bold">{rec.plan}</h3>
                <p className="mx-auto mt-3 max-w-md text-ink-500 dark:text-ink-400">
                  {rec.tagline}
                </p>
                <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
                  {rec.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-700 dark:border-ink-700 dark:bg-ink-800/50 dark:text-ink-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#pricing"
                    className="flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600"
                  >
                    See {rec.plan} pricing
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <button
                    onClick={restart}
                    className="flex items-center gap-2 rounded-xl border border-ink-300 px-6 py-3 text-base font-semibold text-ink-700 transition-colors hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Start over
                  </button>
                </div>
              </div>
            ) : (
              /* Questions */
              <div>
                <div className="mb-2 text-sm font-medium text-ink-400">
                  Question {step + 1} of {QUESTIONS.length}
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {currentQuestion.prompt}
                </h3>

                <div className="mt-8 space-y-3">
                  {currentQuestion.options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = answers[step] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                          isSelected
                            ? 'border-accent-500 bg-accent-500/5 shadow-md'
                            : 'border-ink-200 hover:border-accent-500/50 hover:bg-ink-50 dark:border-ink-700 dark:hover:bg-ink-800/50'
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isSelected
                              ? 'bg-accent-500 text-white'
                              : 'bg-ink-100 text-ink-500 group-hover:bg-accent-500/10 group-hover:text-accent-500 dark:bg-ink-800 dark:text-ink-400'
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="flex-1 text-base font-semibold">
                          {option.label}
                        </span>
                        <ArrowRight
                          className={`h-5 w-5 transition-all ${
                            isSelected
                              ? 'text-accent-500'
                              : 'text-ink-300 group-hover:text-accent-500 group-hover:translate-x-1 dark:text-ink-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Back button */}
                {step > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-accent-500 dark:text-ink-400"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
