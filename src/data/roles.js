export const roles = [
  { id: 'frontend', title: 'Frontend Engineer', marketDemand: 'High', goalWindow: '6 months', summary: 'Build dynamic UIs using modern web tech.', salaryBand: 'Strong React and CSS skills highly rewarded.', roadmap: [
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
  ]},
  { id: 'backend', title: 'Backend Engineer', marketDemand: 'High', goalWindow: '6 months', summary: 'Server logic, APIs, and databases.', salaryBand: 'Scalability and DB optimization paid a premium.', roadmap: [
    { title: 'Operating Systems & General Knowledge', duration: '2 weeks', outcomes: ['Terminal Usage', 'How OSs work', 'Process Management', 'Threads and Concurrency', 'Basic Terminal Commands'] },
    { title: 'Language Ecosystems', duration: '4 weeks', outcomes: ['Node.js Event Loop', 'Python/Go core concepts', 'Package Managers', 'Memory Management', 'Garbage Collection'] },
    { title: 'Relational Databases', duration: '4 weeks', outcomes: ['PostgreSQL Schema Design', 'Joins & Subqueries', 'Indexes & Performance', 'ACID Transactions', 'Normal Forms'] },
    { title: 'NoSQL Databases', duration: '2 weeks', outcomes: ['MongoDB Documents', 'Redis Caching', 'Cassandra/DynamoDB', 'Eventual Consistency'] },
    { title: 'API Design Paradigm', duration: '4 weeks', outcomes: ['RESTful Architectures', 'JSON APIs', 'GraphQL Queries & Mutations', 'gRPC & Protocol Buffers'] },
    { title: 'Security & Identity', duration: '3 weeks', outcomes: ['JWT (JSON Web Tokens)', 'OAuth2.0 / OIDC', 'CORS & CSRF Defenses', 'SQL Injection Prevention', 'Rate Limiting Algorithms'] },
    { title: 'Message Brokers & Async', duration: '3 weeks', outcomes: ['RabbitMQ', 'Apache Kafka Basics', 'Pub-Sub Patterns', 'Celery / BullMQ', 'WebSockets'] },
    { title: 'Deployment & Containerization', duration: '3 weeks', outcomes: ['Dockerfiles', 'Docker Compose', 'Nginx Reverse Proxies', 'Load Balancing'] }
  ]},
  { id: 'full-stack', title: 'Full Stack Developer', marketDemand: 'Very High', goalWindow: '8 months', summary: 'End-to-end web architectures.', salaryBand: 'Startup gold standard.', roadmap: [
    { title: 'Frontend Basics', duration: '3 weeks', outcomes: ['HTML5/CSS3', 'Modern Vanilla JavaScript', 'DOM Manipulation', 'Responsive CSS'] },
    { title: 'Frontend Frameworks', duration: '4 weeks', outcomes: ['React Context & Hooks', 'Next.js App Router', 'Tailwind CSS Structure', 'Framer Motion'] },
    { title: 'Backend APIs', duration: '4 weeks', outcomes: ['Node.js & Express / NestJS', 'Creating REST Endpoints', 'Middleware & Error Handling', 'Postman Testing'] },
    { title: 'Database & ORM', duration: '4 weeks', outcomes: ['PostgreSQL Setup', 'Prisma Schema definitions', 'Database Migrations', 'SQL Joins via ORM'] },
    { title: 'Authentication Systems', duration: '3 weeks', outcomes: ['NextAuth.js Configuration', 'Session Handling', 'Bcrypt password hashing', 'Role-Based Access Control'] },
    { title: 'Full Stack Integration', duration: '4 weeks', outcomes: ['Connecting Client to Server', 'Handling CORS', 'Data Fetching & Caching (React Query, SWR)', 'State persistence'] },
    { title: 'Hosting & Deployment', duration: '3 weeks', outcomes: ['Vercel Deployments', 'Railway/Render for Backend', 'Managing Env Variables safely', 'CI/CD Pipelines'] }
  ]},
  { id: 'devops', title: 'DevOps Engineer', marketDemand: 'Crucial', goalWindow: '8 months', summary: 'Infrastructure, deployment, and automation.', salaryBand: 'High pay for AWS/K8s expertise.', roadmap: [
    { title: 'Linux Mastery', duration: '4 weeks', outcomes: ['Bash Scripting', 'Systemd Services', 'Log Management (journalctl)', 'Cron jobs', 'File Permissions & Users'] },
    { title: 'Networking Core', duration: '3 weeks', outcomes: ['TCP/IP Model', 'DNS resolution', 'SSL/TLS Handshakes', 'Subnets & Firewalls', 'VPCs'] },
    { title: 'Containers & Virtualization', duration: '3 weeks', outcomes: ['Docker Internals', 'Multi-stage Dockerfiles', 'Docker Compose', 'Container Registries'] },
    { title: 'CI/CD Pipelines', duration: '4 weeks', outcomes: ['GitHub Actions scripting', 'Jenkins / GitLab CI', 'Artifact Management', 'Automated Testing Gates', 'Blue/Green Deployments'] },
    { title: 'Infrastructure as Code (IaC)', duration: '4 weeks', outcomes: ['Terraform State Management', 'Modules & Variables', 'AWS CloudFormation', 'Ansible Playbooks'] },
    { title: 'Kubernetes (K8s)', duration: '5 weeks', outcomes: ['Pods & Nodes', 'Deployments & ReplicaSets', 'Services & Ingress Controllers', 'ConfigMaps & Secrets', 'Helm Charts'] },
    { title: 'Monitoring & Observability', duration: '3 weeks', outcomes: ['Prometheus Metrics', 'Grafana Dashboards', 'ELK Stack / Datadog', 'Distributed Tracing'] }
  ]},
  { id: 'data-scientist', title: 'Data Scientist', marketDemand: 'High', goalWindow: '8 months', summary: 'Analyze data and build machine learning models.', salaryBand: 'Top compensation for mathematical rigor.', roadmap: [
    { title: 'Python for Data Science', duration: '3 weeks', outcomes: ['Jupyter Notebooks', 'Pandas DataFrames', 'NumPy Vectorization', 'Handling Missing Data'] },
    { title: 'Math & Statistics', duration: '4 weeks', outcomes: ['Linear Algebra (Matrices)', 'Calculus (Derivatives)', 'Probability Theory', 'Hypothesis Testing (P-values)'] },
    { title: 'Data Visualization', duration: '2 weeks', outcomes: ['Matplotlib & Seaborn', 'Plotly Interactive charts', 'Dashboard Design', 'Exploratory Data Analysis (EDA)'] },
    { title: 'Classical Machine Learning', duration: '5 weeks', outcomes: ['Scikit-Learn API', 'Linear & Logistic Regression', 'Decision Trees & Random Forests', 'XGBoost', 'K-Means Clustering', 'PCA'] },
    { title: 'Model Evaluation', duration: '2 weeks', outcomes: ['Accuracy, Precision, Recall', 'F1 Score & ROC Curves', 'Cross Validation', 'Hyperparameter Tuning (GridSearch)'] },
    { title: 'Deep Learning Basics', duration: '4 weeks', outcomes: ['PyTorch or TensorFlow', 'Neural Network Architectures', 'Backpropagation', 'Loss Functions & Optimizers'] },
    { title: 'Natural Language Processing', duration: '3 weeks', outcomes: ['Tokenization', 'Word Embeddings (Word2Vec)', 'Transformers Basics', 'Sentiment Analysis'] }
  ]},
  { id: 'ai-engineer', title: 'AI Software Engineer', marketDemand: 'Explosive', goalWindow: '6 months', summary: 'Integrate LLMs into applications.', salaryBand: 'Extremely high for RAG systems.', roadmap: [
    { title: 'LLM Foundations', duration: '2 weeks', outcomes: ['OpenAI / DeepSeek / Anthropic APIs', 'System Prompts vs User Prompts', 'Temperature & Top-P', 'Context Windows'] },
    { title: 'Prompt Engineering', duration: '2 weeks', outcomes: ['Few-Shot Prompting', 'Chain of Thought (CoT)', 'ReAct Framework', 'Structured Outputs (JSON handling)'] },
    { title: 'RAG Architecture (Retrieval Augmented Gen)', duration: '4 weeks', outcomes: ['Chunking Strategies', 'Embedding Models (text-embedding-3)', 'Vector Databases (Pinecone, Qdrant, Supabase)', 'Cosine Similarity'] },
    { title: 'Advanced Retrieval', duration: '3 weeks', outcomes: ['Hybrid Search (BM25 + Dense)', 'Re-ranking (Cohere)', 'Query Expansion', 'Self-Reflecting Agents'] },
    { title: 'AI Frameworks', duration: '3 weeks', outcomes: ['LangChain chains', 'LlamaIndex structures', 'Vercel AI SDK', 'Managing conversational memory'] },
    { title: 'Evaluation & Tracing', duration: '2 weeks', outcomes: ['LangSmith / Langfuse', 'Ragas evaluation metrics', 'Prompt Injection Defenses', 'Cost & Token monitoring'] },
    { title: 'Local Models', duration: '2 weeks', outcomes: ['Ollama / vLLM', 'GGUF formats', 'Fine-Tuning via LoRA', 'Hosting Meta Llama 3 locally'] }
  ]},
  { id: 'data-engineer', title: 'Data Engineer', marketDemand: 'Urgent', goalWindow: '8 months', summary: 'Build massive data pipelines.', salaryBand: 'Very lucrative for Spark/Kafka experts.', roadmap: [
    { title: 'Advanced SQL', duration: '3 weeks', outcomes: ['Window Functions', 'CTEs', 'Query Plans & Execution', 'Indexing Strategies'] },
    { title: 'Data Modeling', duration: '3 weeks', outcomes: ['OLAP vs OLTP', 'Star & Snowflake Schemas', 'Fact and Dimension Tables', 'Slowly Changing Dimensions (SCD)'] },
    { title: 'Data Warehouses & Lakes', duration: '4 weeks', outcomes: ['Snowflake Architecture', 'Google BigQuery', 'Amazon S3 / Data Lakes', 'Parquet & Iceberg Formats'] },
    { title: 'Batch Processing', duration: '4 weeks', outcomes: ['Apache Spark Fundamentals', 'PySpark Transformations', 'Databricks', 'MapReduce Concepts'] },
    { title: 'Stream Processing', duration: '4 weeks', outcomes: ['Apache Kafka', 'Kafka Topics & Partitions', 'Pub/Sub Architecture', 'Spark Structured Streaming'] },
    { title: 'Orchestration', duration: '3 weeks', outcomes: ['Apache Airflow', 'Building DAGs', 'Task Dependencies', 'dbt (Data Build Tool)'] },
    { title: 'Cloud Data Infra', duration: '2 weeks', outcomes: ['AWS IAM for Data', 'Redshift Basics', 'Cloud Costs Optimization', 'Data Governance'] }
  ]},
  { id: 'android', title: 'Android Developer', marketDemand: 'High', goalWindow: '6 months', summary: 'Native Android mobile applications.', salaryBand: 'Kotlin and Compose mastery is key.', roadmap: [
    { title: 'Kotlin Programming', duration: '4 weeks', outcomes: ['Variables & Null Safety', 'Classes & Objects', 'Extension Functions', 'Coroutines Basics', 'Flows & Channels'] },
    { title: 'Android Fundamentals', duration: '3 weeks', outcomes: ['Android Studio Config', 'Activity Lifecycle', 'Intents & Intent Filters', 'Context', 'Permissions'] },
    { title: 'Modern UI (Jetpack Compose)', duration: '5 weeks', outcomes: ['Declarative UI paradigms', 'Composables', 'State Hoisting', 'Modifiers', 'Navigation Component', 'Material 3 Design'] },
    { title: 'Architecture Patterns', duration: '3 weeks', outcomes: ['MVVM (Model-View-ViewModel)', 'State Management', 'Dependency Injection (Hilt/Dagger)', 'Clean Architecture'] },
    { title: 'Local Persistence', duration: '3 weeks', outcomes: ['Room Database', 'SQLite Basics', 'DataStore (Preferences)', 'File Storage'] },
    { title: 'Networking', duration: '2 weeks', outcomes: ['Retrofit & OkHttp', 'Parsing JSON (Moshi/Gson)', 'WebSocket Connections', 'Image Loading (Coil)'] },
    { title: 'Publishing & Processes', duration: '2 weeks', outcomes: ['App Signing', 'Google Play Console', 'ProGuard / R8 Shrinking', 'Firebase Crashlytics'] }
  ]},
  { id: 'ios', title: 'iOS Developer', marketDemand: 'High', goalWindow: '6 months', summary: 'Native Apple ecosystem applications.', salaryBand: 'SwiftUI and iOS architecture command premium.', roadmap: [
    { title: 'Swift Fundamentals', duration: '4 weeks', outcomes: ['Optionals & Unwrapping', 'Structs vs Classes', 'Enums & Switch Cases', 'Protocols & Extensions', 'Closures', 'ARC Memory'] },
    { title: 'SwiftUI UI Framework', duration: '5 weeks', outcomes: ['Declarative Views', '@State & @Binding', '@EnvironmentObject', 'NavigationStack', 'Animations & Transitions'] },
    { title: 'Architecture', duration: '3 weeks', outcomes: ['MVVM Architecture', 'TCA (The Composable Architecture)', 'Dependency Injection', 'Protocol Oriented Programming'] },
    { title: 'Swift Concurrency', duration: '3 weeks', outcomes: ['async/await', 'Task Groups', 'Actors for Thread Safety', 'MainActor UI isolation'] },
    { title: 'Persistence & Data', duration: '4 weeks', outcomes: ['Core Data', 'SwiftData Paradigm', 'UserDefaults', 'File Manager', 'Keychain for Security'] },
    { title: 'Networking', duration: '2 weeks', outcomes: ['URLSession API', 'Codable/Decodable', 'Handling HTTP Errors', 'Third-party Alamofire'] },
    { title: 'App Store Ecosystem', duration: '2 weeks', outcomes: ['Certificates & Provisioning Profiles', 'TestFlight Distribution', 'AppStore Review Guidelines', 'Fastlane Automation'] }
  ]},
  { id: 'software-architect', title: 'Software Architect', marketDemand: 'Elite', goalWindow: '12 months', summary: 'System-level design and cross-team execution.', salaryBand: 'Highest technical individual contributor band.', roadmap: [
    { title: 'Design Patterns', duration: '4 weeks', outcomes: ['Creational Patterns (Factory/Singleton)', 'Structural Patterns (Adapter)', 'Behavioral Patterns (Observer)', 'SOLID Principles'] },
    { title: 'Distributed Systems', duration: '5 weeks', outcomes: ['Microservices vs Monoliths', 'Event-Driven Architecture', 'CQRS & Event Sourcing', 'Domain-Driven Design (DDD)', 'Saga Patterns'] },
    { title: 'Scalability Strategies', duration: '4 weeks', outcomes: ['Horizontal vs Vertical Scaling', 'Load Balancing Algorithms', 'Database Sharding & Partitioning', 'CAP Theorem', 'Disaster Recovery'] },
    { title: 'Caching & Performance', duration: '3 weeks', outcomes: ['Cache Invalidation Strategies', 'Redis/Memcached', 'CDN Architecture', 'Bloom Filters', 'Rate Limiting'] },
    { title: 'Security & Compliance', duration: '3 weeks', outcomes: ['Zero Trust Architecture', 'Data Encryption (at rest/in transit)', 'OAuth 2.0 flows', 'SOC2/GDPR compliance fundamentals'] },
    { title: 'Cloud Native Design', duration: '4 weeks', outcomes: ['Serverless Tradeoffs', 'K8s Multi-cloud Strategies', 'Infrastructure as Code design', 'Service Meshes (Istio)'] },
    { title: 'Engineering Leadership', duration: '4 weeks', outcomes: ['Writing RFCs (Request for Comments)', 'Architecture Decision Records (ADRs)', 'API Governance', 'Tech Debt Prioritization', 'Mentoring Seniors'] }
  ]}
];

// Fallback generator for roles we haven't intricately detailed yet, 
// using the dynamic template approach to guarantee 26 exhaustive lists.
const extendedRolesMap = [
  'devsecops', 'data-analyst', 'machine-learning', 'postgresql', 'blockchain', 
  'qa', 'cyber-security', 'ux-design', 'technical-writer', 'game-developer', 
  'server-side-game-developer', 'mlops', 'product-manager', 'engineering-manager', 
  'developer-relations', 'bi-analyst'
];

extendedRolesMap.forEach(rId => {
  if (!roles.find(r => r.id === rId)) {
    roles.push({
      id: rId,
      title: rId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      marketDemand: 'Steady',
      goalWindow: '6 months',
      summary: `Exhaustive learning track for ${rId}.`,
      salaryBand: 'Competitive industry standards.',
      roadmap: [
        { title: 'Foundational Theory', duration: '2 weeks', outcomes: ['Ecosystem Overview', 'Core Terminology', 'Environment Setup', 'Version Control', 'Basic Scripts'] },
        { title: 'Core Mechanics', duration: '3 weeks', outcomes: ['Syntax & Paradigms', 'Primary Frameworks', 'Data Structures', 'Error Handling', 'CLI Tools'] },
        { title: 'Architecture & Design', duration: '4 weeks', outcomes: ['Design Patterns', 'Component Structuring', 'State/Data Management', 'API Integrations', 'Security Basics'] },
        { title: 'Advanced Workflows', duration: '4 weeks', outcomes: ['Performance Optimization', 'Concurrency', 'Complex Logic Trees', 'Testing Strategies', 'Debugging'] },
        { title: 'Tooling & Ecosystem', duration: '3 weeks', outcomes: ['Build Tools', 'Linters', 'Third Party Integrations', 'Package Publish', 'Cloud Hosting'] },
        { title: 'Production Operations', duration: '3 weeks', outcomes: ['CI/CD Pipelines', 'Monitoring', 'Incident Response', 'Logging', 'Scale Management'] },
        { title: 'Leadership & Soft Skills', duration: '2 weeks', outcomes: ['Code Reviews', 'Writing Documentation', 'Agile Methodologies', 'System Design', 'Mentorship'] }
      ]
    });
  }
});

export function getRoleById(roleId) {
  return roles.find((role) => role.id === roleId);
}

export function getRoleIds() {
  return roles.map((role) => role.id);
}

export function getDurationInWeeks(durationLabel) {
  const match = durationLabel.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

export function getTotalWeeks(roadmap) {
  return roadmap.reduce((sum, module) => sum + getDurationInWeeks(module.duration), 0);
}
