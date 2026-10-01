import { useEffect, useRef } from 'react';
import { ArrowRight, Activity, Play } from 'lucide-react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NODE_COUNT = 28;
const MAX_DIST = 160;
const SPEED = 0.3;

function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      resize();
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.25;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => {
      cancelAnimationFrame(raf);
      init();
      draw();
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl animate-float" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-accent-700/15 blur-3xl animate-float [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-400/10 blur-3xl animate-float [animation-delay:4s]" />
      </div>

      {/* Network graph */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <NetworkGraph />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-600 dark:text-accent-300 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            Proactive IT monitoring — live now
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl animate-fade-up [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards]">
            IT problems solved{' '}
            <span className="text-gradient">before you notice them</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-300 animate-fade-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
            We monitor, secure, and maintain your entire tech stack around the
            clock. Your team stays productive. Your systems stay online. You
            stop worrying about IT.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up [animation-delay:0.3s] opacity-0 [animation-fill-mode:forwards]">
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 hover:shadow-accent-500/50"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#stats"
              className="group flex items-center justify-center gap-2 rounded-xl border border-ink-300 bg-white/50 px-6 py-3.5 text-base font-semibold text-ink-700 backdrop-blur-sm transition-all hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:bg-ink-900/50 dark:text-ink-200 dark:hover:border-accent-500 dark:hover:text-accent-400"
            >
              <Activity className="h-5 w-5" />
              See Live Status
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div>
              <div className="flex items-center gap-1.5">
                <Play className="h-4 w-4 fill-accent-500 text-accent-500" />
                <span className="text-2xl font-bold">99.99%</span>
              </div>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                Guaranteed uptime
              </p>
            </div>
            <div className="h-10 w-px bg-ink-200 dark:bg-ink-700" />
            <div>
              <div className="text-2xl font-bold">&lt; 3 min</div>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                Avg. response time
              </p>
            </div>
            <div className="h-10 w-px bg-ink-200 dark:bg-ink-700" />
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                Human support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink-300 p-1.5 dark:border-ink-600">
          <div className="h-2 w-1 animate-bounce rounded-full bg-accent-500" />
        </div>
      </div>
    </section>
  );
}
