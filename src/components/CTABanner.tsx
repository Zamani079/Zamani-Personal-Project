import { ArrowRight, MessageSquare } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

function ChatMockup() {
  const messages = [
    {
      from: 'user',
      text: 'Our email server seems slow this morning.',
      time: '09:14',
    },
    {
      from: 'agent',
      text: "I see it — a queue backup on your Exchange server. Clearing it now. Should be back to normal in about 2 minutes.",
      time: '09:14',
    },
    {
      from: 'agent',
      text: "Also noticed the disk is 87% full. Want me to schedule a cleanup tonight so this doesn't recur?",
      time: '09:15',
    },
    {
      from: 'user',
      text: 'Yes please. Thanks!',
      time: '09:15',
    },
    {
      from: 'agent',
      text: 'Done. Email is flowing normally. Cleanup scheduled for 2am tonight. Anything else?',
      time: '09:17',
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl shadow-ink-950/10 dark:border-ink-700 dark:bg-ink-900">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-ink-200 bg-ink-50 px-4 py-3 dark:border-ink-700 dark:bg-ink-800/50">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700">
            <MessageSquare className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">TheWildSun Support</div>
            <div className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Online — avg. reply &lt; 3 min
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.from === 'user'
                  ? 'bg-accent-500 text-white'
                  : 'bg-ink-100 text-ink-800 dark:bg-ink-800 dark:text-ink-100'
              }`}
            >
              <p>{msg.text}</p>
              <span
                className={`mt-1 block text-right text-[10px] ${
                  msg.from === 'user'
                    ? 'text-white/60'
                    : 'text-ink-400'
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="flex items-center gap-1 rounded-2xl bg-ink-100 px-4 py-3 dark:bg-ink-800">
            <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400 [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400 [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CTABanner() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl border border-ink-200 bg-gradient-to-br from-ink-900 to-ink-950 p-8 dark:border-ink-800 sm:p-12 lg:p-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent-700/15 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                24/7 support, real humans
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your IT doesn't sleep.{' '}
                <span className="text-gradient">Neither do we.</span>
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-300">
                Get a free IT assessment and see exactly where your systems
                stand. No pressure, no jargon, no obligation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600"
                >
                  Get your free assessment
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#services"
                  className="flex items-center justify-center gap-2 rounded-xl border border-ink-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:border-accent-500 hover:text-accent-400"
                >
                  Explore services
                </a>
              </div>
            </div>

            {/* Right: chat mockup */}
            <div className="lg:pl-8">
              <ChatMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
