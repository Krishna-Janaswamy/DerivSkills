const fs = require('fs');

const frontendRoadmap = [
  { phaseGroup: 'PHASE 01 — THE FOUNDATION (Beginner)', title: '📄 HTML Fundamentals', duration: '1 week', outcomes: ['Document structure & doctype', 'Semantic elements (header, nav, main, article)', 'Forms & input types', 'Tables & lists', 'Meta tags & SEO basics', 'Accessibility (ARIA roles, alt text)', 'HTML5 APIs (canvas, video, audio)'] },
  { title: '🎨 CSS Fundamentals', duration: '1 week', outcomes: ['Box model (margin, padding, border)', 'Selectors & specificity', 'Colors, fonts, typography', 'Display & visibility', 'Position (static, relative, absolute, fixed)', 'Units (px, %, em, rem, vh, vw)', 'Pseudo-classes & pseudo-elements'] },
  { title: '📐 CSS Layout', duration: '1 week', outcomes: ['Flexbox (flex-direction, justify-content, align-items)', 'CSS Grid (grid-template, fr units, areas)', 'Float & clear (legacy)', 'Centering techniques', 'Responsive design basics', 'Media queries', 'Mobile-first approach'] },
  { title: '⚡ JavaScript Basics', duration: '2 weeks', outcomes: ['Variables (var, let, const)', 'Data types & type coercion', 'Operators & expressions', 'Control flow (if, switch, loops)', 'Functions & scope', 'Arrays & objects', 'DOM manipulation (querySelector, addEventListener)'] },

  { phaseGroup: 'PHASE 02 — JAVASCRIPT DEEP DIVE (Intermediate)', title: '🔥 ES6+ Modern JS', duration: '1 week', outcomes: ['Arrow functions', 'Destructuring (array & object)', 'Spread & rest operators', 'Template literals', 'Optional chaining (?.) & nullish coalescing (??)', 'Modules (import/export)', 'Symbols & iterators'] },
  { title: '⏱️ Async JavaScript', duration: '1 week', outcomes: ['Callbacks & callback hell', 'Promises (.then, .catch, .finally)', 'async/await syntax', 'Promise.all, Promise.race, Promise.allSettled', 'Fetch API & HTTP methods', 'Error handling in async code', 'Event loop & task queue'] },
  { title: '🧠 JS Core Concepts', duration: '2 weeks', outcomes: ['Closures & lexical scope', 'Prototypal inheritance & prototype chain', 'this keyword & binding rules', 'Event bubbling & delegation', 'Higher-order functions (map, filter, reduce)', 'Immutability & pure functions', 'Memory management & garbage collection'] },
  { title: '🌐 Browser APIs', duration: '1 week', outcomes: ['LocalStorage / SessionStorage / Cookies', 'History API & routing', 'Intersection Observer', 'MutationObserver', 'Web Workers', 'Service Workers basics', 'Geolocation, Notifications, Clipboard'] },

  { phaseGroup: 'PHASE 03 — TOOLING & ECOSYSTEM (Intermediate)', title: '🔀 Version Control (Git)', duration: '1 week', outcomes: ['git init, add, commit, push, pull', 'Branching & merging strategies', 'Rebase vs merge', 'Conflict resolution', 'GitHub / GitLab workflow', 'PR & code review process', 'Git hooks & CI integration'] },
  { title: '📦 Package Managers', duration: '1 week', outcomes: ['npm & package.json', 'yarn vs npm vs pnpm', 'Semantic versioning (semver)', 'node_modules & lockfiles', 'Publishing packages', 'Monorepo tools (Turborepo, Nx)', 'Dependency security (npm audit)'] },
  { title: '🏗️ Build Tools & Bundlers', duration: '1 week', outcomes: ['Vite (dev server, HMR, build)', 'Webpack (entry, output, loaders, plugins)', 'Rollup for libraries', 'esbuild & SWC (speed)', 'Tree shaking & code splitting', 'Module federation', 'Source maps & debugging'] },
  { title: '💅 CSS Advanced & Preprocessors', duration: '1 week', outcomes: ['SASS/SCSS (variables, mixins, nesting)', 'CSS Variables (custom properties)', 'CSS-in-JS (styled-components, Emotion)', 'Tailwind CSS utility-first', 'CSS Modules', 'BEM methodology', 'PostCSS & autoprefixer'] },

  { phaseGroup: 'PHASE 04 — FRAMEWORKS & ARCHITECTURE (Advanced)', title: '⚛️ React Core', duration: '2 weeks', outcomes: ['JSX & components (functional)', 'Props & state management', 'Lifecycle & useEffect', 'Hooks (useState, useRef, useCallback, useMemo)', 'Context API', 'Controlled vs uncontrolled forms', 'Error boundaries'] },
  { title: '🔗 React Ecosystem', duration: '2 weeks', outcomes: ['React Router v6 (nested routes, loaders)', 'Zustand / Redux Toolkit (state)', 'React Query / TanStack Query (server state)', 'React Hook Form + Zod validation', 'Framer Motion (animations)', 'shadcn/ui, Radix UI (headless)', 'Storybook (component docs)'] },
  { title: '🔲 Next.js (SSR/SSG)', duration: '2 weeks', outcomes: ['Pages vs App Router', 'Server Components vs Client Components', 'getServerSideProps, getStaticProps', 'API Routes & Route Handlers', 'Image optimization & lazy loading', 'Middleware & edge runtime', 'ISR (Incremental Static Regeneration)'] },
  { title: '🔷 TypeScript', duration: '2 weeks', outcomes: ['Types vs Interfaces', 'Generics & utility types (Partial, Pick, Omit)', 'Union, intersection, discriminated unions', 'Type narrowing & guards', 'Enums & const assertions', 'Declaration files (.d.ts)', 'Strict mode & tsconfig options'] },

  { phaseGroup: 'PHASE 05 — PERFORMANCE & QUALITY (Advanced)', title: '🚀 Web Performance', duration: '1 week', outcomes: ['Core Web Vitals (LCP, FID, CLS)', 'Critical rendering path', 'Code splitting & lazy loading', 'Image optimization (WebP, AVIF, srcset)', 'Caching strategies (HTTP cache, Service Worker)', 'Bundle analysis & optimization', 'Lighthouse & PageSpeed insights'] },
  { title: '🧪 Testing', duration: '1 week', outcomes: ['Unit testing (Vitest, Jest)', 'Component testing (React Testing Library)', 'Integration tests', 'E2E testing (Playwright, Cypress)', 'Snapshot testing', 'Mocking (MSW — Mock Service Worker)', 'Test coverage & TDD mindset'] },
  { title: '♿ Accessibility (A11y)', duration: '1 week', outcomes: ['WCAG 2.1 guidelines (A, AA, AAA)', 'Screen reader testing (NVDA, VoiceOver)', 'Keyboard navigation patterns', 'Focus management', 'ARIA live regions', 'Color contrast ratios', 'axe DevTools, Lighthouse A11y audit'] },
  { title: '🔒 Security', duration: '1 week', outcomes: ['XSS (Cross-Site Scripting) prevention', 'CSRF tokens', 'Content Security Policy (CSP)', 'CORS & preflight requests', 'HTTPS & mixed content', 'Secure cookie attributes (HttpOnly, SameSite)', 'OAuth 2.0 / PKCE flows'] },

  { phaseGroup: 'PHASE 06 — MASTER LEVEL', title: '🏛️ System Design (Frontend)', duration: '1 week', outcomes: ['Micro-frontends architecture', 'Module federation patterns', 'Design system creation', 'Component API design principles', 'Monorepo strategy & tooling', 'Feature flags & A/B testing infrastructure', 'Frontend observability (Sentry, DataDog RUM)'] },
  { title: '🖥️ Advanced Rendering', duration: '1 week', outcomes: ['CSR vs SSR vs SSG vs ISR deep dive', 'Streaming SSR (React Suspense)', 'Edge rendering & CDN strategy', 'React Server Components internals', 'Hydration strategies & partial hydration', 'Islands architecture (Astro)', 'WASM integration for compute-heavy tasks'] },
  { title: '📊 State Architecture', duration: '1 week', outcomes: ['Flux / Unidirectional data flow', 'Atomic state (Jotai, Recoil)', 'CQRS patterns in frontend', 'Optimistic UI updates', 'Offline-first with IndexedDB & sync', 'Real-time state (WebSockets, SSE)', 'Event sourcing on the client'] },
  { title: '🛠️ Developer Experience (DX)', duration: '1 week', outcomes: ['Custom ESLint rules & Prettier config', 'Husky + lint-staged pre-commit hooks', 'CI/CD pipelines (GitHub Actions)', 'Automated visual regression (Chromatic)', 'Semantic release & changelog automation', 'Env management (.env, Vault)', 'OpenTelemetry for frontend tracing'] },
  { title: '🤖 AI-Augmented Frontend', duration: '1 week', outcomes: ['LLM streaming in UI (token-by-token render)', 'AI SDK (Vercel AI SDK patterns)', 'RAG-backed search UIs', 'Prompt UI components & chat interfaces', 'Tool-calling visualization', 'Embeddings & semantic search UI', 'Agentic UX patterns'] },
  { title: '📱 Cross-Platform & Native', duration: '1 week', outcomes: ['React Native & Expo', 'Progressive Web Apps (PWA manifest, offline)', 'Tauri / Electron for desktop', 'WebXR & immersive experiences', 'Web Components & Custom Elements', 'Canvas & WebGL basics', 'Three.js for 3D interfaces'] }
];

const content = fs.readFileSync('src/data/roles.js', 'utf-8');
const lines = content.split('\n');

let startIdx = lines.findIndex(l => l.includes("id: 'frontend'"));
let endIdx = startIdx;
while (endIdx < lines.length && !lines[endIdx].includes("  ]},")) {
    endIdx++;
}

// We replace lines from startIdx to endIdx with the new frontend logic
const replacement = `  { id: 'frontend', title: 'Frontend Engineer', marketDemand: 'High', goalWindow: '6 months', summary: 'Build dynamic UIs using modern web tech.', salaryBand: 'Strong React and CSS skills highly rewarded.', roadmap: ${JSON.stringify(frontendRoadmap, null, 4)} },`;

lines.splice(startIdx, endIdx - startIdx + 1, replacement);

fs.writeFileSync('src/data/roles.js', lines.join('\n'));
