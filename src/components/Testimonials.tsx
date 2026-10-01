import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  gradient: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We went from 3 outages a month to zero in our first quarter with TheWildSun. Their team caught a failing drive before it took down our database. That alone paid for the whole year.",
    author: 'Sarah Chen',
    role: 'COO',
    company: 'Brightpath Logistics',
    initials: 'SC',
    gradient: 'from-accent-500 to-accent-700',
    rating: 5,
  },
  {
    quote:
      "The helpdesk actually answers. Like, a real person, in under three minutes, at 2am on a Sunday. I didn't know IT support could work like this.",
    author: 'Marcus Webb',
    role: 'Founder & CEO',
    company: 'Driftwood Studios',
    initials: 'MW',
    gradient: 'from-accent-400 to-accent-600',
    rating: 5,
  },
  {
    quote:
      "After our ransomware scare, TheWildSun rebuilt our entire security stack in two weeks. We now sleep well knowing someone competent is watching the door.",
    author: 'Priya Nair',
    role: 'VP of Operations',
    company: 'Helix Health Group',
    initials: 'PN',
    gradient: 'from-accent-600 to-accent-800',
    rating: 5,
  },
  {
    quote:
      "Migrating to the cloud felt overwhelming until TheWildSun mapped it out step by step. We cut infrastructure costs by 40% and gained automatic scaling we didn't have before.",
    author: 'James Okafor',
    role: 'CTO',
    company: 'Tessellate Labs',
    initials: 'JO',
    gradient: 'from-accent-500 to-accent-700',
    rating: 5,
  },
  {
    quote:
      "What I love is that they prevent problems. I get a weekly report showing what they fixed before I even knew it was broken. It's like having a time machine for IT.",
    author: 'Elena Rodriguez',
    role: 'Managing Director',
    company: 'Cobalt Financial',
    initials: 'ER',
    gradient: 'from-accent-400 to-accent-600',
    rating: 5,
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full w-[320px] flex-shrink-0 snap-center flex-col rounded-3xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900/50 sm:w-[380px]">
      {/* Quote icon */}
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient}`}>
          <Quote className="h-5 w-5 text-white" />
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="flex-1 text-base leading-relaxed text-ink-700 dark:text-ink-200">
        "{t.quote}"
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 border-t border-ink-200 pt-5 dark:border-ink-700">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-semibold">{t.author}</div>
          <div className="text-sm text-ink-500 dark:text-ink-400">
            {t.role}, {t.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
              Client stories
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Don't take our word.{' '}
              <span className="text-gradient">Take theirs.</span>
            </h2>
          </div>
          {/* Desktop arrows */}
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 text-ink-600 transition-all hover:border-accent-500 hover:text-accent-500 disabled:cursor-not-allowed disabled:opacity-30 dark:border-ink-700 dark:text-ink-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 text-ink-600 transition-all hover:border-accent-500 hover:text-accent-500 disabled:cursor-not-allowed disabled:opacity-30 dark:border-ink-700 dark:text-ink-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={ref}
        className="mt-12"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8 xl:pl-[max(2rem,calc((100vw-80rem)/2))]"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.author} t={t} />
          ))}
          {/* End spacer */}
          <div className="w-4 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
