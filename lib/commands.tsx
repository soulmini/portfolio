import React from 'react';

export const PROMPT = 'ayush@portfolio:~$';

export const ALL_COMMANDS = [
  'help', 'whoami', 'about', 'skills', 'experience',
  'projects', 'contact', 'neofetch', 'clear', 'ls',
  'history', 'banner', 'restart', 'sudo hire-me', 'matrix',
];

export type CommandResult = {
  output: React.ReactNode;
  clear?: boolean;
  matrix?: boolean;
  restart?: boolean;
  error?: boolean;
};

// ─── Reusable primitives ────────────────────────────────────────────────────

const G = ({ c }: { c: string }) => (
  <span className="text-t-green font-bold">{c}</span>
);
const Y = ({ c }: { c: string }) => (
  <span className="text-t-yellow">{c}</span>
);
const B = ({ c }: { c: string }) => (
  <span className="text-t-blue">{c}</span>
);
const P = ({ c }: { c: string }) => (
  <span className="text-t-purple">{c}</span>
);
const Dim = ({ c }: { c: string }) => (
  <span className="text-t-gray">{c}</span>
);
const Cyan = ({ c }: { c: string }) => (
  <span className="text-t-cyan">{c}</span>
);

const Bar = ({ pct, color = 'bg-t-green' }: { pct: number; color?: string }) => {
  const filled = Math.round(pct / 5);
  const empty = 20 - filled;
  return (
    <span className="font-mono text-xs">
      <span className="text-t-gray">[</span>
      <span className={`text-t-green`}>{'█'.repeat(filled)}</span>
      <span className="text-t-gray">{'░'.repeat(empty)}</span>
      <span className="text-t-gray">]</span>
      <span className="text-t-gray ml-1">{pct}%</span>
    </span>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-3">
    <span className="text-t-yellow font-bold text-sm">
      ┌─ {title} {'─'.repeat(Math.max(0, 44 - title.length))}┐
    </span>
  </div>
);

// ─── Command implementations ────────────────────────────────────────────────

const helpOutput = () => (
  <div className="space-y-1 text-sm">
    <SectionHeader title="Available Commands" />
    <div className="grid gap-y-1 pl-2" style={{ gridTemplateColumns: '160px 1fr' }}>
      {[
        ['whoami', 'Who is this developer?'],
        ['about', 'Full background & story'],
        ['skills', 'Tech stack & expertise'],
        ['experience', 'Work history timeline'],
        ['projects', 'Featured projects'],
        ['contact', 'Get in touch'],
        ['neofetch', 'System info (nerd mode)'],
        ['ls', 'List all sections'],
        ['banner', 'Show the welcome banner'],
        ['history', 'Command history'],
        ['clear', 'Clear the terminal'],
        ['restart', 'Reboot AyushOS'],
        ['sudo hire-me', '(★) Make a smart decision'],
        ['matrix', '(★) Easter egg'],
      ].map(([cmd, desc]) => (
        <React.Fragment key={cmd}>
          <span><G c={cmd} /></span>
          <Dim c={`— ${desc}`} />
        </React.Fragment>
      ))}
    </div>
    <p className="mt-3 text-t-gray text-xs pl-2">
      Tip: Use ↑ / ↓ for history · Tab to autocomplete
    </p>
  </div>
);

const whoamiOutput = () => (
  <div className="space-y-2 text-sm">
    <p>
      <G c="Ayush Jaiswal" />
      <Dim c=" — Software Development Engineer (SDE-1)" />
    </p>
    <p className="text-t-white">
      Full-stack developer specializing in <Y c="high-performance backend systems" />.
    </p>
    <p className="text-t-gray">
      Currently building at <span className="text-t-cyan font-bold">SupplyNote</span> · Noida, India
    </p>
    <div className="flex gap-4 mt-2 text-xs flex-wrap">
      <span><Dim c="📧 " /><B c="ayush02jaiswal@gmail.com" /></span>
      <span><Dim c="📞 " /><B c="+91-7052355283" /></span>
      <span><Dim c="🐙 " /><P c="github.com/soulmini" /></span>
    </div>
  </div>
);

const aboutOutput = () => (
  <div className="space-y-3 text-sm">
    <SectionHeader title="About Me" />
    <p className="text-t-white leading-relaxed pl-2">
      I&apos;m a backend-focused full-stack engineer who loves building systems that are{' '}
      <Y c="fast, scalable, and reliable" />. I&apos;ve optimized APIs handling{' '}
      <G c="4+ million records" />, built serverless AI pipelines, and migrated monolithic
      services to microservices at SupplyNote.
    </p>
    <p className="text-t-gray leading-relaxed pl-2">
      Before that, I did a stint at Hoverin Aerospace building drone-related backend services
      on AWS EC2 with TypeScript + Prisma. I hold a B.E. in Computer Science from
      Dr. Bhimrao Ambedkar University, Agra (GPA: 7.5/10).
    </p>
    <p className="text-t-gray pl-2">
      Outside of work I grind DSA — <G c="750+" /> problems solved on LeetCode &amp; GeeksforGeeks.
    </p>
    <p className="text-xs text-t-gray pl-2 mt-2">
      → Type <G c="experience" /> or <G c="projects" /> to learn more
    </p>
  </div>
);

const skillsOutput = () => (
  <div className="space-y-4 text-sm">
    <SectionHeader title="Technical Skills" />
    {[
      {
        category: 'Languages',
        color: 'text-t-green',
        items: [
          { name: 'JavaScript / TypeScript', pct: 95 },
          { name: 'C++ / C', pct: 80 },
          { name: 'SQL', pct: 85 },
          { name: 'NoSQL / MongoDB Query', pct: 90 },
        ],
      },
      {
        category: 'Frameworks',
        color: 'text-t-blue',
        items: [
          { name: 'Node.js + Express.js', pct: 92 },
          { name: 'React.js', pct: 82 },
          { name: 'Next.js', pct: 80 },
        ],
      },
      {
        category: 'Databases & Search',
        color: 'text-t-yellow',
        items: [
          { name: 'MongoDB', pct: 90 },
          { name: 'ClickHouse', pct: 82 },
          { name: 'PostgreSQL', pct: 78 },
          { name: 'Redis', pct: 75 },
          { name: 'Elasticsearch', pct: 70 },
        ],
      },
      {
        category: 'Infra & Tooling',
        color: 'text-t-purple',
        items: [
          { name: 'Apache Kafka', pct: 75 },
          { name: 'GCP (Cloud Functions)', pct: 78 },
          { name: 'AWS EC2', pct: 72 },
          { name: 'Sentry (Observability)', pct: 80 },
          { name: 'Git / GitHub', pct: 90 },
        ],
      },
    ].map(({ category, color, items }) => (
      <div key={category} className="pl-2">
        <p className={`${color} font-bold mb-1`}>{category}</p>
        <div className="space-y-1 pl-2">
          {items.map(({ name, pct }) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-t-white w-48 shrink-0">{name}</span>
              <Bar pct={pct} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const experienceOutput = () => (
  <div className="space-y-5 text-sm">
    <SectionHeader title="Work Experience" />

    {/* SupplyNote */}
    <div className="pl-2 border-l-2 border-t-green ml-2">
      <div className="pl-3">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-t-green font-bold text-base">SupplyNote</span>
          <span className="text-t-gray text-xs">Sep 2024 – Present</span>
        </div>
        <p className="text-t-yellow text-xs mb-2">Software Development Engineer · Noida, UP</p>
        <ul className="space-y-2 text-t-white">
          <li className="flex gap-2">
            <span className="text-t-green shrink-0">▸</span>
            <span>
              Built <Y c="autoGRN system" /> using Python deployed as a GCP serverless service —
              processed invoice PDFs via <B c="LLaMA OCR + LLMs" />, reducing GRN entry time by{' '}
              <G c="90%" />.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-t-green shrink-0">▸</span>
            <span>
              Migrated PO vs GRN reporting from MongoDB JSON to{' '}
              <Y c="ClickHouse + Parquet" /> — report generation went from 40 min to{' '}
              <G c="1 min (40× faster)" />.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-t-green shrink-0">▸</span>
            <span>
              Optimized APIs handling <G c="4M+ records" /> — latency dropped from{' '}
              <span className="text-t-red">120s</span> to{' '}
              <G c="&lt;5s" />, eliminating socket timeouts.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-t-green shrink-0">▸</span>
            <span>
              Integrated <Y c="Sentry" /> for error monitoring &amp; performance tracing —
              identified architectural loopholes that reduced overall system error rate by{' '}
              <G c="2×" />.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-t-green shrink-0">▸</span>
            <span>
              Led migration from monolith to <B c="microservices" /> for high-volume reporting modules.
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* Hoverin Aerospace */}
    <div className="pl-2 border-l-2 border-t-blue ml-2">
      <div className="pl-3">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-t-blue font-bold text-base">Hoverin Aerospace</span>
          <span className="text-t-gray text-xs">Jan 2024 – Jun 2024</span>
        </div>
        <p className="text-t-yellow text-xs mb-2">Software Engineer Intern · Kanpur, UP</p>
        <ul className="space-y-2 text-t-white">
          <li className="flex gap-2">
            <span className="text-t-blue shrink-0">▸</span>
            <span>
              Built backend APIs in <B c="Node.js + Express.js + TypeScript" /> with
              MongoDB/PostgreSQL via Prisma — auth, weather data retrieval.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-t-blue shrink-0">▸</span>
            <span>
              Developed UI with <P c="React + Next.js + Tailwind CSS" />.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-t-blue shrink-0">▸</span>
            <span>
              Deployed and maintained backend services on <Y c="AWS EC2" /> for production.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const projectsOutput = () => (
  <div className="space-y-5 text-sm">
    <SectionHeader title="Projects" />

    <div className="pl-2 space-y-4">
      {/* ChatGPT Clone */}
      <div className="border border-t-border rounded p-3 hover:border-t-green transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <G c="⬡ ChatGPT Clone" />
          <span className="text-t-gray text-xs">github.com/soulmini</span>
        </div>
        <p className="text-t-gray text-xs mb-2">
          React.js · Tailwind CSS · Node.js · Express.js · OpenAI API
        </p>
        <p className="text-t-white leading-relaxed">
          Full-stack ChatGPT replica leveraging the <Y c="OpenAI API" /> for NLP.
          Seamless real-time chat interface with human-like response generation.
        </p>
      </div>

      {/* AutoGRN System */}
      <div className="border border-t-border rounded p-3 hover:border-t-yellow transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <Y c="⬡ AutoGRN System" />
          <span className="text-t-gray text-xs">@ SupplyNote</span>
        </div>
        <p className="text-t-gray text-xs mb-2">
          Python · GCP Cloud Functions · LLaMA OCR · LLMs · Serverless
        </p>
        <p className="text-t-white leading-relaxed">
          Serverless invoice processing pipeline — extracts structured GRN data from PDFs using
          AI. Reduced manual entry time by <G c="90%" />.
        </p>
      </div>

      {/* PO vs GRN Pipeline */}
      <div className="border border-t-border rounded p-3 hover:border-t-blue transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <B c="⬡ PO vs GRN Reporting Pipeline" />
          <span className="text-t-gray text-xs">@ SupplyNote</span>
        </div>
        <p className="text-t-gray text-xs mb-2">
          ClickHouse · Apache Kafka · Parquet · MongoDB · Node.js
        </p>
        <p className="text-t-white leading-relaxed">
          Migrated report generation from MongoDB JSON to ClickHouse with Parquet batch processing.
          Runtime: <span className="text-t-red">40 min</span> → <G c="1 min" /> (<G c="40× faster" />).
          Monitored with <Y c="Sentry" /> performance tracing.
        </p>
      </div>

      {/* API Optimization */}
      <div className="border border-t-border rounded p-3 hover:border-t-purple transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <P c="⬡ High-Volume API Optimization" />
          <span className="text-t-gray text-xs">@ SupplyNote</span>
        </div>
        <p className="text-t-gray text-xs mb-2">
          Node.js · MongoDB · Redis · Sentry · Microservices
        </p>
        <p className="text-t-white leading-relaxed">
          Refactored APIs serving <G c="4M+ records" /> — eliminated socket timeouts,
          reduced latency from <span className="text-t-red">120s → &lt;5s</span>.
          Used <Y c="Sentry" /> to track error rates and trace slow transactions,
          achieving <G c="2× error rate reduction" />.
        </p>
      </div>
    </div>
  </div>
);

const contactOutput = () => (
  <div className="space-y-3 text-sm">
    <SectionHeader title="Contact" />
    <div className="pl-2 space-y-2">
      {[
        { icon: '📧', label: 'Email', value: 'ayush02jaiswal@gmail.com' },
        { icon: '📞', label: 'Phone', value: '+91-7052355283' },
        { icon: '🐙', label: 'GitHub', value: 'github.com/soulmini' },
        { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/ayush02jaiswal' },
        { icon: '📍', label: 'Location', value: 'Noida, Uttar Pradesh, India' },
      ].map(({ icon, label, value }) => (
        <div key={label} className="flex gap-3">
          <span className="w-24 text-t-gray shrink-0">{icon} {label}</span>
          <Cyan c={value} />
        </div>
      ))}
    </div>
    <p className="text-t-gray text-xs pl-2 mt-3">
      Open to SDE-1 backend / full-stack roles · Node.js · ClickHouse · Kafka
    </p>
  </div>
);

const neofetchOutput = () => (
  <div className="flex gap-6 text-sm flex-wrap">
    {/* ASCII logo */}
    <pre className="text-t-green text-xs leading-tight shrink-0 hidden sm:block">{`
   ██████╗
  ██╔═══██╗
  ██║   ██║
  ██║   ██║
  ╚██████╔╝
   ╚═════╝
  AyushOS`}</pre>

    {/* Info */}
    <div className="space-y-1">
      <p><G c="ayush" /><Dim c="@" /><G c="portfolio" /></p>
      <p><Dim c="─────────────────────────────" /></p>
      {[
        ['OS', 'AyushOS 1.0.0 (Linux kernel)'],
        ['Shell', 'bash 5.2 + Next.js 14'],
        ['Uptime', '18 months @ SupplyNote | Intern @ Hoverin'],
        ['CPU', 'Backend Engineering × 8 cores'],
        ['Memory', '4,000,000+ records optimized'],
        ['Languages', 'JS/TS, C++, SQL, NoSQL'],
        ['Frameworks', 'Node, Express, React, Next.js'],
        ['Databases', 'Mongo, ClickHouse, PG, Redis, ES'],
        ['Streaming', 'Apache Kafka'],
        ['Observability', 'Sentry (errors + performance)'],
        ['Deployment', 'GCP, AWS EC2, Git'],
        ['DSA', '750+ LeetCode / GFG problems'],
        ['Education', 'B.E. CS — DBRAU Agra (7.5/10)'],
      ].map(([k, v]) => (
        <p key={k}>
          <span className="text-t-yellow w-28 inline-block">{k}</span>
          <Dim c=": " />
          <span className="text-t-white">{v}</span>
        </p>
      ))}
      <p className="pt-1">
        {['bg-t-green','bg-t-blue','bg-t-yellow','bg-t-red','bg-t-purple','bg-t-cyan','bg-t-white','bg-t-gray'].map(c => (
          <span key={c} className={`${c} inline-block w-4 h-4 mr-1`} />
        ))}
      </p>
    </div>
  </div>
);

const lsOutput = () => (
  <div className="text-sm">
    <p className="text-t-gray mb-1">total 7 sections</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1">
      {[
        ['drwxr-xr-x', 'whoami/'],
        ['drwxr-xr-x', 'about/'],
        ['drwxr-xr-x', 'skills/'],
        ['drwxr-xr-x', 'experience/'],
        ['drwxr-xr-x', 'projects/'],
        ['drwxr-xr-x', 'contact/'],
        ['-rw-r--r--', 'resume.pdf'],
      ].map(([perms, name]) => (
        <span key={name} className="flex gap-2">
          <Dim c={perms} />
          <G c={name} />
        </span>
      ))}
    </div>
  </div>
);

const hireMeOutput = () => (
  <div className="space-y-2 text-sm">
    <p className="text-t-red font-bold">sudo: Authentication required</p>
    <p className="text-t-gray">[sudo] password for recruiter: <span className="text-t-white">**********</span></p>
    <p className="text-t-green font-bold mt-2">✓ Access granted. Welcome, smart recruiter.</p>
    <div className="border border-t-green rounded p-3 mt-2 space-y-1">
      <p className="text-t-yellow font-bold">Why hire Ayush?</p>
      <ul className="space-y-1 text-t-white">
        <li className="flex gap-2"><G c="✓" /><span>Made a report pipeline <G c="40× faster" /></span></li>
        <li className="flex gap-2"><G c="✓" /><span>Reduced API latency from 2min → <G c="&lt;5s" /></span></li>
        <li className="flex gap-2"><G c="✓" /><span>Built AI invoice processing saving <G c="90%" /> manual work</span></li>
        <li className="flex gap-2"><G c="✓" /><span>Tracks every error with <Y c="Sentry" /> before users notice</span></li>
        <li className="flex gap-2"><G c="✓" /><span><G c="750+" /> DSA problems — I debug fast</span></li>
      </ul>
      <p className="text-t-cyan pt-2">📧 ayush02jaiswal@gmail.com</p>
    </div>
  </div>
);

const bannerOutput = () => (
  <div>
    <pre className="text-t-green text-xs leading-snug font-mono">{`
    ___ __   __ _   _ ___ _  _     _   _   _  ___ __      __ _   _
   / _ \\ \\ / /| | | / __| || |   | | /_\\ |_ _/ __|\\ \\    / // \\ | |
  | (_) |\\ V / | |_| \\__ \\ __ |   | |/ _ \\ | |\\__ \\ \\ \\/\\/ // _ \\| |__
   \\___/  |_|   \\___/|___/_||_|   |_/_/ \\_\\___|___/  \\_/\\_//_/ \\_\\____|
`}</pre>
    <p className="text-t-gray text-xs pl-2 mt-1">
      Software Development Engineer · Backend Specialist · Full-Stack Developer
    </p>
    <p className="text-t-gray text-xs pl-2">
      Type <span className="text-t-green">help</span> to see what you can explore.
    </p>
  </div>
);

// ─── Router ─────────────────────────────────────────────────────────────────

export function processCommand(
  rawInput: string,
  cmdHistory: string[] = []
): CommandResult {
  const input = rawInput.trim();
  if (!input) return { output: null };

  const lower = input.toLowerCase();

  if (lower === 'sudo hire-me' || lower === 'sudo hire me') {
    return { output: hireMeOutput() };
  }

  const [cmd] = lower.split(' ');

  switch (cmd) {
    case 'help':
    case '?':
      return { output: helpOutput() };

    case 'whoami':
    case 'who':
      return { output: whoamiOutput() };

    case 'about':
      return { output: aboutOutput() };

    case 'skills':
    case 'tech':
    case 'stack':
      return { output: skillsOutput() };

    case 'experience':
    case 'exp':
    case 'work':
      return { output: experienceOutput() };

    case 'projects':
    case 'project':
    case 'portfolio':
      return { output: projectsOutput() };

    case 'contact':
    case 'hire':
    case 'email':
      return { output: contactOutput() };

    case 'neofetch':
    case 'fetch':
      return { output: neofetchOutput() };

    case 'ls':
    case 'dir':
    case 'list':
      return { output: lsOutput() };

    case 'banner':
    case 'logo':
      return { output: bannerOutput() };

    case 'clear':
    case 'cls':
      return { output: null, clear: true };

    case 'restart':
    case 'reboot':
      return { output: null, restart: true };

    case 'history':
      return {
        output: (
          <div className="text-sm space-y-0.5">
            {cmdHistory.length === 0 ? (
              <Dim c="No commands in history yet." />
            ) : (
              cmdHistory.map((c, i) => (
                <p key={i}>
                  <Dim c={`  ${String(i + 1).padStart(3, ' ')}  `} />
                  <span className="text-t-white">{c}</span>
                </p>
              ))
            )}
          </div>
        ),
      };

    case 'matrix':
      return { output: <P c="Entering the Matrix..." />, matrix: true };

    case 'sudo':
      return {
        output: (
          <p className="text-sm text-t-red">
            sudo: try <span className="text-t-green">sudo hire-me</span>
          </p>
        ),
      };

    case 'exit':
    case 'quit':
      return {
        output: (
          <p className="text-sm text-t-gray">
            There&apos;s no escape from this portfolio 😄 — type{' '}
            <span className="text-t-green">help</span> instead.
          </p>
        ),
      };

    case 'cat':
      if (lower.includes('resume')) {
        return {
          output: (
            <p className="text-sm text-t-cyan">
              📄 Resume available at:{' '}
              <span className="text-t-green">
                linkedin.com/in/ayush02jaiswal
              </span>{' '}
              — or type <span className="text-t-green">contact</span> for email.
            </p>
          ),
        };
      }
      return {
        output: (
          <p className="text-sm text-t-red">
            cat: {input.split(' ')[1] || 'file'}: No such file or directory
          </p>
        ),
      };

    default:
      return {
        error: true,
        output: (
          <p className="text-sm">
            <span className="text-t-red">{cmd}</span>
            <span className="text-t-gray">: command not found. Type </span>
            <span className="text-t-green">help</span>
            <span className="text-t-gray"> for available commands.</span>
          </p>
        ),
      };
  }
}
