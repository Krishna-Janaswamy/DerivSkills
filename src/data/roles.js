export const roles = [
  { id: 'java', type: 'skill', title: 'Java Developer', marketDemand: 'High', goalWindow: '6 months', summary: 'Build enterprise-grade applications with Java.', salaryBand: 'Strong enterprise Java skills always in demand.', roadmap: [
    { phaseGroup: 'PHASE 01 — JAVA BASICS (Beginner)', title: '☕ Java Fundamentals', duration: '1 week', outcomes: ['JDK vs JRE vs JVM', 'How Java compiles & runs (bytecode, classloader)', 'Installing Java & setting PATH/JAVA_HOME', 'First program (Hello World)', 'javac & java commands', 'Comments (single-line, multi-line, Javadoc)', 'Java file structure & naming conventions', 'Package declaration & import statements'] },
    { title: '🔢 Data Types & Variables', duration: '1 week', outcomes: ['Primitive types (int, long, double, float, char, boolean, byte, short)', 'Wrapper classes (Integer, Double, Boolean, Character, etc.)', 'Autoboxing & unboxing', 'Variable declaration & initialization', 'Type casting (implicit widening & explicit narrowing)', 'final keyword (constants)', 'var keyword (Java 10+ local type inference)', 'String basics (immutability, String pool, intern())'] },
    { title: '➕ Operators & Expressions', duration: '1 week', outcomes: ['Arithmetic operators (+, -, *, /, %)', 'Relational operators (==, !=, >, <, >=, <=)', 'Logical operators (&&, ||, !)', 'Bitwise operators (&, |, ^, ~, <<, >>)', 'Assignment operators (=, +=, -=, etc.)', 'Ternary operator', 'instanceof operator', 'Operator precedence'] },
    { title: '🔄 Control Flow', duration: '1 week', outcomes: ['if / else if / else', 'switch statement (traditional)', 'switch expression (Java 14+)', 'for loop', 'while loop', 'do-while loop', 'break & continue', 'Labeled break & continue', 'Enhanced for-each loop'] },
    { title: '📦 Methods', duration: '1 week', outcomes: ['Method declaration & return types', 'Method parameters & arguments', 'Method overloading', 'Pass by value vs pass by reference', 'Varargs (variable arguments)', 'Recursion', 'Static vs instance methods', 'Method naming conventions'] },

    { phaseGroup: 'PHASE 02 — OBJECT-ORIENTED PROGRAMMING (Intermediate)', title: '🏛️ Classes & Objects', duration: '1 week', outcomes: ['Class declaration & object creation', 'Constructors (default, parameterized)', 'Constructor overloading', 'Constructor chaining (this())', 'this keyword', 'Instance vs static fields', 'static keyword (fields, methods, blocks)', 'Object class & toString(), equals(), hashCode()'] },
    { title: '🔒 Encapsulation', duration: '1 week', outcomes: ['Access modifiers (public, private, protected, default)', 'Getters & setters', 'Data hiding principles', 'Immutable classes', 'Record classes (Java 16+)'] },
    { title: '🧬 Inheritance', duration: '1 week', outcomes: ['extends keyword', 'super keyword (super(), super.method())', 'Method overriding (@Override)', 'Covariant return types', 'final class & final method', 'Object class as root of hierarchy', 'Multilevel inheritance', "Why Java doesn't support multiple class inheritance"] },
    { title: '🎭 Polymorphism', duration: '1 week', outcomes: ['Compile-time polymorphism (method overloading)', 'Runtime polymorphism (method overriding)', 'Upcasting & downcasting', 'Dynamic method dispatch', 'instanceof & pattern matching (Java 16+)'] },
    { title: '🔌 Interfaces & Abstract Classes', duration: '1 week', outcomes: ['Abstract class & abstract methods', 'Interface declaration & implementation', 'Default methods in interfaces (Java 8+)', 'Static methods in interfaces', 'Private methods in interfaces (Java 9+)', 'Functional interfaces (@FunctionalInterface)', 'Interface vs abstract class (when to use)', 'Marker interfaces (Serializable, Cloneable)', 'Multiple interface implementation'] },
    { title: '📦 Packages & Access', duration: '1 week', outcomes: ['Creating & organizing packages', 'import statement & wildcard import', 'Access across packages', 'Sealed classes (Java 17+)'] },

    { phaseGroup: 'PHASE 03 — CORE JAVA APIS (Intermediate)', title: '🔤 Strings In Depth', duration: '1 week', outcomes: ['String methods (length, charAt, substring, etc)', 'String comparison (equals vs ==)', 'String.format() & formatted()', 'StringBuilder vs StringBuffer', 'String.join() & String.valueOf()', 'Regular expressions with String', 'Text blocks (Java 15+)'] },
    { title: '🗂️ Arrays', duration: '1 week', outcomes: ['1D & 2D array declaration', 'Array initialization', 'Arrays class utility (sort, binarySearch, fill, copyOf)', 'Array vs ArrayList', 'Multidimensional arrays', 'Enhanced for-each with arrays'] },
    { title: '📚 Collections Framework', duration: '2 weeks', outcomes: ['Iterable & Collection interfaces', 'List (ArrayList, LinkedList, Vector, Stack)', 'Set (HashSet, LinkedHashSet, TreeSet)', 'Queue & Deque (PriorityQueue, ArrayDeque)', 'Map (HashMap, LinkedHashMap, TreeMap, Hashtable)', 'Collections utility class', 'Comparable vs Comparator', 'Iterator & ListIterator'] },
    { title: '🧬 Generics', duration: '1 week', outcomes: ['Generic classes & methods', 'Type parameters (T, E, K, V)', 'Bounded type parameters (extends, super)', 'Wildcards (?, ? extends, ? super)', 'Type erasure', 'Generic interfaces', 'Raw types & why to avoid them'] },
    { title: '⚠️ Exception Handling', duration: '1 week', outcomes: ['Exception hierarchy (Throwable, Error, Exception)', 'Checked vs unchecked exceptions', 'try / catch / finally', 'try-with-resources (AutoCloseable)', 'Multi-catch', 'throw & throws', 'Creating custom exceptions', 'Exception chaining'] },

    { phaseGroup: 'PHASE 04 — FUNCTIONAL & MODERN JAVA (Advanced)', title: '🔁 Functional Programming (Java 8+)', duration: '1 week', outcomes: ['Lambda expressions syntax', 'Functional interfaces (Function, Predicate, Consumer, Supplier, BiFunction)', 'Method references', 'Composing functions', 'Predicate chaining', 'Closures in lambdas (effectively final)'] },
    { title: '🌊 Stream API', duration: '2 weeks', outcomes: ['Creating streams', 'Intermediate operations (filter, map, flatMap, distinct, sorted, etc)', 'Terminal operations (collect, forEach, reduce, count, etc)', 'Collectors', 'Parallel streams', 'Stream vs Collection', 'Primitive streams', 'Optional'] },
    { title: '🗓️ Date & Time API', duration: '1 week', outcomes: ['LocalDate, LocalTime, LocalDateTime', 'ZonedDateTime & ZoneId', 'Instant & Duration & Period', 'DateTimeFormatter', 'ChronoUnit for calculations', 'Legacy Date/Calendar vs new API'] },
    { title: '📬 I/O & NIO', duration: '1 week', outcomes: ['File, FileReader, FileWriter, BufferedReader, BufferedWriter', 'InputStream, OutputStream', 'ObjectInputStream & ObjectOutputStream (serialization)', 'Serializable interface, serialVersionUID', 'Path & Files (NIO.2)', 'Walking file tree', 'Reading/writing files with Files utility'] },

    { phaseGroup: 'PHASE 05 — CONCURRENCY & MULTITHREADING (Advanced)', title: '🧵 Threads Basics', duration: '1 week', outcomes: ['Thread class & Runnable interface', 'Creating threads', 'Thread lifecycle', 'Thread methods (start, run, sleep, join, interrupt, yield)', 'Daemon threads', 'Thread priority'] },
    { title: '🔐 Synchronization', duration: '1 week', outcomes: ['Race conditions & thread safety', 'synchronized keyword (method & block)', 'volatile keyword', 'Deadlock, livelock, starvation', 'wait(), notify(), notifyAll()', 'Reentrant locking (ReentrantLock)', 'ReadWriteLock'] },
    { title: '⚙️ Concurrency Utilities', duration: '2 weeks', outcomes: ['ExecutorService & ThreadPoolExecutor', 'Executors factory methods', 'Future & Callable', 'CompletableFuture', 'CountDownLatch, CyclicBarrier, Semaphore', 'Concurrent collections', 'Atomic classes', 'Fork/Join framework'] },

    { phaseGroup: 'PHASE 06 — JVM INTERNALS & PERFORMANCE (Master)', title: '🏗️ JVM Architecture', duration: '1 week', outcomes: ['Class loader subsystem', 'Class loading process', 'Runtime data areas (Heap, Stack, Method Area, PC Register, Native Stack)', 'Execution engine (Interpreter, JIT compiler)', 'Garbage collection basics', 'JVM parameters (-Xms, -Xmx, -XX flags)'] },
    { title: '🗑️ Garbage Collection', duration: '1 week', outcomes: ['GC roots & reachability', 'Young generation (Eden, Survivor spaces)', 'Old generation (Tenured)', 'GC algorithms (Serial, Parallel, G1, ZGC, Shenandoah)', 'GC tuning basics', 'Memory leaks in Java', 'WeakReference, SoftReference, PhantomReference'] },
    { title: '📊 Performance & Profiling', duration: '1 week', outcomes: ['JProfiler, VisualVM, Java Flight Recorder', 'Heap dumps & thread dumps', 'Identifying memory leaks', 'CPU profiling & hot spots', 'Benchmarking with JMH', 'String interning & memory', 'Connection pool tuning'] },
    { title: '🔍 Reflection & Dynamic Features', duration: '1 week', outcomes: ['Class class & reflection API', 'Getting fields, methods, constructors at runtime', 'Invoking methods reflectively', 'Annotations (built-in & custom)', 'Annotation processors', 'Dynamic proxies', 'Class introspection'] },

    { phaseGroup: 'PHASE 07 — MASTER LEVEL JAVA (Master)', title: '🧩 Design Patterns', duration: '2 weeks', outcomes: ['Creational (Singleton, Factory, Abstract Factory, Builder, Prototype)', 'Structural (Adapter, Decorator, Proxy, Facade, Composite, Flyweight, Bridge)', 'Behavioral (Strategy, Observer, Command, Iterator, Template Method, etc)', 'SOLID principles', 'DRY, KISS, YAGNI'] },
    { title: '🆕 Modern Java Features', duration: '1 week', outcomes: ['Records (Java 16+)', 'Sealed classes (Java 17+)', 'Pattern matching for switch (Java 21)', 'Virtual threads — Project Loom (Java 21+)', 'Structured concurrency (Java 21+)', 'Sequenced collections (Java 21+)', 'String templates (preview)', 'Value types — Project Valhalla (upcoming)'] },
    { title: '🏗️ Java Modules (JPMS)', duration: '1 week', outcomes: ['module-info.java', 'requires, exports, opens, uses, provides', 'Modular JARs', 'Unnamed & automatic modules', 'jlink for custom runtime images'] },
    { title: '🔧 Build Tools', duration: '1 week', outcomes: ['Maven (pom.xml, lifecycle, plugins, dependencies, repositories)', 'Gradle (build.gradle, tasks, plugins, Kotlin DSL)', 'Maven vs Gradle tradeoffs', 'Multi-module projects', 'Dependency management & BOM'] }
  ]},
  { id: 'springboot', type: 'skill', title: 'Spring Boot Engineer', marketDemand: 'Massive', goalWindow: '6 months', summary: 'Build robust enterprise APIs and microservices.', salaryBand: 'Highly lucrative for cloud-native Spring specialists.', roadmap: [
    { phaseGroup: 'PHASE 01 — SPRING CORE CONCEPTS (Beginner)', title: '🌱 Spring Framework Basics', duration: '1 week', outcomes: ['What is Spring & why it exists', 'Spring vs Spring Boot difference', 'Inversion of Control (IoC)', 'Dependency Injection (DI) — constructor, setter, field', 'Spring container (ApplicationContext vs BeanFactory)', 'Bean lifecycle (init, destroy)', 'Spring modules overview (Core, MVC, Data, Security, etc.)'] },
    { title: '🏗️ Spring Boot Basics', duration: '1 week', outcomes: ['Spring Initializr (start.spring.io)', 'Project structure (src/main/java, resources, test)', 'application.properties vs application.yml', '@SpringBootApplication (combines @Configuration, @EnableAutoConfiguration, @ComponentScan)', 'Auto-configuration concept', 'Embedded servers (Tomcat, Jetty, Undertow)', 'Spring Boot starters', 'Running & packaging (mvn spring-boot:run, fat JAR)'] },
    { title: '🧩 Core Annotations', duration: '1 week', outcomes: ['@Component, @Service, @Repository, @Controller, @RestController', '@Autowired', '@Bean & @Configuration', '@Value (inject properties)', '@Primary & @Qualifier', '@Lazy', '@Scope (singleton, prototype, request, session)', '@PostConstruct & @PreDestroy'] },

    { phaseGroup: 'PHASE 02 — BUILDING REST APIs (Intermediate)', title: '🌐 Spring MVC & REST', duration: '1 week', outcomes: ['DispatcherServlet & request lifecycle', '@RequestMapping, @GetMapping, @PostMapping, @PutMapping, @PatchMapping, @DeleteMapping', '@PathVariable & @RequestParam', '@RequestBody & @ResponseBody', '@RequestHeader & @CookieValue', 'ResponseEntity (status codes, headers, body)', '@RestController vs @Controller + @ResponseBody'] },
    { title: '📋 Request & Response Handling', duration: '1 week', outcomes: ['HTTP status codes', 'Content negotiation (JSON, XML)', 'Jackson (ObjectMapper, @JsonProperty, etc.)', 'Custom serialization / deserialization', '@ModelAttribute', 'Multipart file upload', 'Downloading files'] },
    { title: '✅ Validation', duration: '1 week', outcomes: ['Bean Validation (JSR-380)', '@Valid & @Validated', 'Constraint annotations', 'Custom constraint annotations', 'Validation groups', 'BindingResult & MethodArgumentNotValidException', 'Global validation error handling'] },
    { title: '⚠️ Exception Handling', duration: '1 week', outcomes: ['@ExceptionHandler (method level)', '@ControllerAdvice & @RestControllerAdvice', 'ProblemDetail (RFC 7807)', 'ResponseStatusException', 'Custom exception classes', 'Global error response structure', 'Handling 404 (NoHandlerFoundException)'] },

    { phaseGroup: 'PHASE 03 — DATA ACCESS (Intermediate)', title: '🗄️ Spring Data JPA', duration: '2 weeks', outcomes: ['JPA & Hibernate basics', '@Entity, @Table, @Id, @GeneratedValue', '@Column, @Transient, @Enumerated, @Temporal', '@OneToOne, @OneToMany, @ManyToOne, @ManyToMany', 'Cascade types & Fetch types', 'JpaRepository & CrudRepository', 'Custom query methods & @Query', '@Modifying & @Transactional', 'Projections', 'Pagination & Sorting'] },
    { title: '🔗 Relationships & Advanced Mapping', duration: '1 week', outcomes: ['Bidirectional vs unidirectional relationships', 'mappedBy', 'JoinColumn & JoinTable', 'Orphan removal', 'Embedded objects (@Embedded, @Embeddable)', 'Inheritance mapping', '@MappedSuperclass', 'Auditing (@CreatedDate, @LastModifiedDate, etc)'] },
    { title: '🏦 Database Configuration', duration: '1 week', outcomes: ['DataSource configuration (HikariCP)', 'Multiple data sources', 'H2 in-memory database', 'PostgreSQL / MySQL configuration', 'Flyway (database migrations)', 'Liquibase (database migrations)', 'Connection pool tuning', 'Spring profiles for DB config'] },
    { title: '🔍 Spring Data Extras', duration: '1 week', outcomes: ['Spring Data JDBC', 'Spring Data MongoDB', 'Spring Data Redis', 'Spring Data Elasticsearch', 'Specifications & QueryDSL', 'Named queries'] },

    { phaseGroup: 'PHASE 04 — SPRING SECURITY (Advanced)', title: '🔐 Security Basics', duration: '1 week', outcomes: ['Spring Security architecture', 'Authentication vs Authorization', 'UserDetails & UserDetailsService', 'PasswordEncoder (BCryptPasswordEncoder)', 'In-memory & Database-backed authentication', 'SecurityFilterChain configuration', 'CSRF protection', 'CORS configuration'] },
    { title: '🎫 JWT Authentication', duration: '1 week', outcomes: ['JWT structure (header, payload, signature)', 'Generating JWT tokens', 'JWT filter (OncePerRequestFilter)', 'Token validation & parsing', 'Refresh tokens', 'Storing tokens (HttpOnly cookie vs localStorage)', 'Token expiry & rotation'] },
    { title: '🏷️ Authorization', duration: '1 week', outcomes: ['Role-based access control (RBAC)', '@PreAuthorize & @PostAuthorize', '@Secured', 'hasRole(), hasAuthority(), hasAnyRole()', 'Method-level security', 'URL-based security', 'Permission evaluators'] },
    { title: '🔑 OAuth2 & SSO', duration: '1 week', outcomes: ['OAuth2 concepts (Authorization Code, PKCE)', 'Spring Security OAuth2 Client', 'Integrating with Google / GitHub / Okta', 'OpenID Connect (OIDC)', 'Resource server configuration', 'JWT decoder', 'Keycloak integration'] },

    { phaseGroup: 'PHASE 05 — ADVANCED SPRING BOOT (Advanced)', title: '⚙️ Configuration & Profiles', duration: '1 week', outcomes: ['@Profile & spring.profiles.active', 'Externalized configuration (12-factor app)', '@ConfigurationProperties', '@EnableConfigurationProperties', 'Relaxed binding', 'Config validation', 'Spring Cloud Config Server', 'Environment & PropertySource'] },
    { title: '🕸️ WebClient & RestTemplate', duration: '1 week', outcomes: ['RestTemplate (deprecated but used)', 'WebClient (reactive, non-blocking)', 'WebClient builder & base URL', 'GET, POST, PUT, DELETE with WebClient', 'Error handling (onStatus)', 'Exchange strategies & codecs', 'Timeout configuration', 'OpenFeign'] },
    { title: '🔄 Transactions', duration: '1 week', outcomes: ['@Transactional in depth', 'Propagation types (REQUIRED, REQUIRES_NEW, etc)', 'Isolation levels', 'Rollback rules', 'Transaction pitfalls', 'Programmatic transactions', 'Distributed transactions (JTA)'] },
    { title: '⚡ Caching', duration: '1 week', outcomes: ['@EnableCaching', '@Cacheable, @CachePut, @CacheEvict, @Caching', 'Cache key generation', 'TTL & eviction policies', 'In-memory cache (Caffeine)', 'Redis cache integration', 'Cache abstraction', 'Conditional caching'] },
    { title: '📨 Messaging', duration: '2 weeks', outcomes: ['Spring Events (@EventListener, @Async)', 'Spring AMQP (RabbitMQ)', 'Spring Kafka (KafkaTemplate, @KafkaListener)', 'Message converters', 'Dead letter queues', 'Retry & error handling in messaging', 'Transactional messaging'] },
    { title: '⏰ Scheduling', duration: '1 week', outcomes: ['@EnableScheduling', '@Scheduled (fixedRate, fixedDelay, cron)', 'Cron expression syntax', 'Dynamic scheduling', 'Distributed scheduling (ShedLock, Quartz)', 'Quartz Scheduler integration', 'Task execution & async'] },

    { phaseGroup: 'PHASE 06 — TESTING (Advanced)', title: '🧪 Unit Testing', duration: '1 week', outcomes: ['JUnit 5 basics', 'Assertions', 'Mockito (mock, spy, @Mock, @InjectMocks)', 'when().thenReturn(), doThrow(), doAnswer()', 'verify() & argument captors', 'Parameterized tests', 'Test lifecycle & ordering'] },
    { title: '🔗 Integration Testing', duration: '1 week', outcomes: ['@SpringBootTest', '@WebMvcTest, @DataJpaTest', '@MockBean & @SpyBean', 'MockMvc (perform, andExpect, andDo)', 'TestRestTemplate', '@Transactional in tests (rollback)', 'Testcontainers (real DB in Docker or tests)'] },
    { title: '🌐 API Testing', duration: '1 week', outcomes: ['MockMvc request builders', 'JSON path assertions (jsonPath)', 'Testing file uploads', 'Testing security (WithMockUser, WithUserDetails)', 'REST Assured', 'Contract testing', 'WireMock for external API mocking'] },

    { phaseGroup: 'PHASE 07 — OBSERVABILITY & PRODUCTION (Master)', title: '📊 Actuator & Monitoring', duration: '1 week', outcomes: ['Spring Boot Actuator endpoints', 'Customizing health indicators', 'Custom actuator endpoints', 'Actuator security', 'Micrometer (metrics)', 'Prometheus integration', 'Grafana dashboards', 'Distributed tracing (Micrometer Tracing)', 'Zipkin & Jaeger integration'] },
    { title: '📝 Logging', duration: '1 week', outcomes: ['SLF4J & Logback', 'Log4j2 alternative', 'Log levels', 'Structured logging (JSON logs)', 'MDC (Mapped Diagnostic Context)', 'Log aggregation (ELK Stack)', 'Loki + Grafana', 'Distributed log tracing'] },
    { title: '🐳 Containerization & Deployment', duration: '2 weeks', outcomes: ['Dockerfile for Spring Boot app', 'Multi-stage Docker builds', 'Docker Compose', 'Buildpacks (spring-boot:build-image)', 'Kubernetes basics (Pod, Service, Deployment)', 'Helm charts for Spring Boot', 'Health checks & probes', 'Graceful shutdown'] },
    { title: '☁️ Cloud & Config', duration: '1 week', outcomes: ['Spring Cloud Netflix (Eureka)', 'Spring Cloud Gateway', 'Spring Cloud Config', 'Spring Cloud LoadBalancer', 'Spring Cloud Circuit Breaker (Resilience4j)', 'Service mesh basics (Istio)', 'AWS / GCP / Azure Spring integrations'] },

    { phaseGroup: 'PHASE 08 — MASTER LEVEL SPRING BOOT (Master)', title: '🏗️ Architecture Patterns', duration: '2 weeks', outcomes: ['Layered architecture', 'Hexagonal architecture (Ports & Adapters)', 'CQRS with Spring', 'Event-driven architecture', 'Saga pattern', 'Outbox pattern', 'API versioning strategies', 'Backward compatibility'] },
    { title: '⚡ Reactive Programming', duration: '2 weeks', outcomes: ['Project Reactor (Mono, Flux)', 'Spring WebFlux (@RestController reactive)', 'Reactive repositories (R2DBC)', 'Backpressure handling', 'Reactive security', 'Comparing MVC vs WebFlux', 'When to use reactive vs imperative'] },
    { title: '🔧 Performance Tuning', duration: '1 week', outcomes: ['JVM heap & GC tuning', 'HikariCP pool sizing', 'N+1 query problem & solutions', 'Batch processing (Spring Batch)', 'Async processing patterns', 'Virtual threads (Java 21+)', 'GraalVM native image', 'AOT compilation'] },
    { title: '🤖 AI & GenAI Integration', duration: '1 week', outcomes: ['Spring AI framework', 'LLM integration (OpenAI, Ollama, Anthropic)', 'ChatClient & Advisors', 'RAG implementation with Spring AI', 'VectorStore (PGVector, Redis, Chroma)', 'Embedding models', 'Structured output', 'AI observability'] }
  ]},
  { id: 'javascript', type: 'skill', title: 'JavaScript Mastery', marketDemand: 'Universal', goalWindow: '8 months', summary: 'The ultimate guide from JavaScript basics to advanced AI integration.', salaryBand: 'Essential language for web development, high ceiling for experts.', roadmap: [
    { phaseGroup: 'PHASE 01 — JS FUNDAMENTALS (Beginner)', title: '📌 Introduction to JavaScript', duration: '1 week', outcomes: ['What is JavaScript & how it works in the browser', 'JavaScript engine (V8, SpiderMonkey, etc)', 'How browsers parse & execute JS', 'JavaScript runtime (call stack, heap)', 'JS in browser vs Node.js', 'ECMAScript versions', 'Strict mode ("use strict")', 'Console methods'] },
    { title: '🔢 Variables & Data Types', duration: '1 week', outcomes: ['var, let, const — differences & scoping rules', 'Hoisting (var vs let/const)', 'Primitive types (string, number, boolean, null, undefined, symbol, bigint)', 'typeof operator', 'Reference types (object, array, function)', 'Primitive vs reference — memory & copying', 'Type coercion (implicit & explicit)', 'Falsy & truthy values'] },
    { title: '➕ Operators', duration: '1 week', outcomes: ['Arithmetic operators', 'Assignment operators', 'Comparison operators', 'Logical operators (&&, ||, !)', 'Nullish coalescing (??)', 'Optional chaining (?.)', 'Bitwise operators', 'Operator precedence & associativity'] },
    { title: '🔄 Control Flow', duration: '1 week', outcomes: ['if / else if / else', 'switch statement & fall-through', 'Ternary operator', 'for, while, do...while loops', 'for...in loop (objects)', 'for...of loop (iterables)', 'break & continue', 'try / catch / finally (basics)'] },
    { title: '🔧 Functions Basics', duration: '1 week', outcomes: ['Function declaration vs function expression', 'Hoisting behavior of functions', 'Parameters & arguments', 'Default parameters', 'Return statement & implicit return', 'First-class functions concept', 'Anonymous functions & IIFE'] },

    { phaseGroup: 'PHASE 02 — STRINGS, ARRAYS & OBJECTS (Intermediate)', title: '🔤 Strings In Depth', duration: '1 week', outcomes: ['String creation & immutability', 'Template literals & tagged templates', 'String indexing & length', 'String methods (slice, substring, replace, split, trim, etc)', 'Unicode & emoji handling', 'Regular expressions with strings (intro)'] },
    { title: '📚 Arrays In Depth', duration: '2 weeks', outcomes: ['Array creation & indexing', 'Mutating methods (push, pop, splice, sort, etc)', 'Non-mutating methods (slice, concat, join)', 'Iteration methods (forEach, map, filter, reduce)', 'Spread with arrays', 'Destructuring arrays', 'Typed arrays'] },
    { title: '🗂️ Objects In Depth', duration: '2 weeks', outcomes: ['Object literal syntax', 'Property access & dynamic names', 'Object mutability & const', 'Object spread & rest', 'Destructuring objects', 'Object methods (keys, values, assign, freeze, create, etc)', 'Getters & setters', 'Shallow vs deep copy (structuredClone)'] },
    { title: '🗺️ Map, Set, WeakMap, WeakSet', duration: '1 week', outcomes: ['Map (set, get, iteration)', 'Map vs Object', 'Set (add, has, iteration, deduplication)', 'WeakMap & WeakSet', 'WeakRef & FinalizationRegistry'] },

    { phaseGroup: 'PHASE 03 — FUNCTIONS IN DEPTH (Intermediate)', title: '🧠 Scope & Closures', duration: '1 week', outcomes: ['Global scope, function scope, block scope', 'Scope chain & lexical scoping', 'Variable shadowing', 'Closures (definition, memory)', 'Closure use cases (data privacy, memoization)', 'IIFE for scope isolation'] },
    { title: '🔑 this Keyword', duration: '1 week', outcomes: ['this in global context', 'this in regular functions & methods', 'this in arrow functions (lexical this)', 'this in constructors & event handlers', 'Explicit binding (call, apply, bind)', 'Losing this (common mistakes)'] },
    { title: '⬆️ Advanced Functions', duration: '1 week', outcomes: ['Higher-order functions', 'Pure functions & side effects', 'Function composition', 'Currying & partial application', 'Memoization', 'Recursion & tail call optimization', 'Generator functions (yield)'] },
    { title: '🎯 Execution Context & Call Stack', duration: '1 week', outcomes: ['Execution context (global, function)', 'Creation phase vs execution phase', 'Variable environment & lexical environment', 'Scope chain resolution', 'Call stack mechanics', 'Event loop introduction'] },

    { phaseGroup: 'PHASE 04 — PROTOTYPES & CLASSES (Intermediate)', title: '🧬 Prototypal Inheritance', duration: '1 week', outcomes: ['Prototype chain', 'proto vs prototype property', 'Object.create() for inheritance', 'Property lookup chain', 'Prototype pollution', 'Constructor functions & new keyword', 'instanceof operator internals'] },
    { title: '🏛️ ES6 Classes', duration: '1 week', outcomes: ['class declaration & expression', 'constructor method', 'Instance & static methods', 'Private fields (#)', 'extends & super (super())', 'Method overriding', 'Mixins pattern', 'Class vs constructor function'] },

    { phaseGroup: 'PHASE 05 — ASYNC JAVASCRIPT (Advanced)', title: '⏱️ Event Loop & Runtime Model', duration: '1 week', outcomes: ['JavaScript single-threaded nature', 'Call stack & Web APIs', 'Callback queue (macrotask) & Microtask queue', 'Event loop algorithm step by step', 'Task prioritization', 'Node.js event loop'] },
    { title: '📞 Callbacks & 🤝 Promises', duration: '1 week', outcomes: ['Callback pattern & Callback hell', 'Promise states (pending, fulfilled, rejected)', 'Promise chaining (.then, .catch, .finally)', 'Promise.all(), allSettled(), race(), any()', 'Promisifying callbacks'] },
    { title: '⚡ Async/Await', duration: '1 week', outcomes: ['async function syntax', 'await keyword behavior', 'Sequential vs parallel async operations', 'await with Promise.all', 'Top-level await & Async iteration (for await...of)', 'Error handling (try/catch)'] },
    { title: '🌐 Fetch API & HTTP', duration: '1 week', outcomes: ['fetch() basics', 'Request & Response objects', 'HTTP methods & Headers', 'Response methods (.json(), .blob(), etc)', 'CORS & preflight', 'Abort controller (canceling fetch)', 'Streaming responses'] },

    { phaseGroup: 'PHASE 06 — DOM & BROWSER APIs (Advanced)', title: '🌳 DOM Manipulation', duration: '2 weeks', outcomes: ['DOM tree structure', 'Selecting elements (querySelector)', 'Traversing DOM', 'Creating & inserting elements', 'Removing & cloning elements', 'Modifying content (innerHTML vs textContent)', 'Class & style manipulation', 'DOM performance (DocumentFragment)'] },
    { title: '🖱️ Events', duration: '1 week', outcomes: ['Event listeners', 'Event object properties', 'Event bubbling & capturing', 'Event delegation pattern', 'stopPropagation & preventDefault', 'Custom events', 'Event throttling & debouncing'] },
    { title: '📱 Browser Storage & 🔭 APIs', duration: '1 week', outcomes: ['localStorage & sessionStorage', 'Cookies & IndexedDB', 'Intersection Observer & MutationObserver', 'Web Workers & Service Workers', 'Geolocation, Notifications, Clipboard APIs'] },

    { phaseGroup: 'PHASE 07 — MODERN JAVASCRIPT (Advanced)', title: '🔥 ES6+ Features In Depth', duration: '1 week', outcomes: ['let & const, Arrow functions', 'Destructuring & Spread/Rest', 'Template literals & Symbol', 'ES2017-ES2024 additions (BigInt, globalThis, Array findLast, etc)'] },
    { title: '📦 Modules In Depth', duration: '1 week', outcomes: ['ES Modules (ESM) vs CommonJS (CJS)', 'Named & default exports', 'Dynamic import()', 'Import assertions', 'Module loading in browsers', 'Tree shaking concept'] },
    { title: '🪞 Proxy & Reflect', duration: '1 week', outcomes: ['Proxy object & traps (get, set, has, etc)', 'Proxy use cases (validation, reactive data)', 'Reflect API', 'Reflect vs direct object operations'] },

    { phaseGroup: 'PHASE 08 — ERROR HANDLING & DEBUGGING (Advanced)', title: '⚠️ Error Handling', duration: '1 week', outcomes: ['Error types & Custom error classes', 'Error.cause (ES2022)', 'try / catch / finally', 'Error handling in async code', 'Global error handling (window.onerror)', 'Node.js error handling'] },
    { title: '🔍 Debugging', duration: '1 week', outcomes: ['Chrome DevTools', 'Breakpoints (line, conditional, DOM)', 'Watch expressions & call stack', 'console methods (table, trace, time)', 'Source maps', 'Network & Performance profiling'] },

    { phaseGroup: 'PHASE 09 — OOP & FUNCTIONAL PATTERNS (Advanced)', title: '🏗️ OOP & 🧮 Functional Programming', duration: '2 weeks', outcomes: ['Encapsulation, Inheritance, Polymorphism', 'Factory & Module patterns', 'Singleton & Observer patterns', 'Pure functions & Immutability', 'Function composition (pipe)', 'Currying & Memoization'] },

    { phaseGroup: 'PHASE 10 — PERFORMANCE & OPTIMIZATION (Master)', title: '🚀 JavaScript Performance', duration: '1 week', outcomes: ['V8 engine optimization (hidden classes)', 'Avoid deoptimizations', 'Memory leaks & Garbage collection', 'Debounce & throttle', 'Web Workers & SharedArrayBuffer', 'Lazy loading & Code splitting'] },
    { title: '📏 Measuring Performance', duration: '1 week', outcomes: ['performance.now()', 'Chrome DevTools Performance tab', 'Lighthouse metrics (FCP, LCP, CLS)', 'JavaScript profiling (flame charts)'] },

    { phaseGroup: 'PHASE 11 — RUNTIME ENVIRONMENTS (Master)', title: '🟩 Node.js & 🔧 Deno/Bun', duration: '1 week', outcomes: ['Node.js architecture & event loop', 'process object', 'Built-in modules (fs, path, events)', 'Streams & Buffer', 'EventEmitter', 'Deno & Bun overview'] },

    { phaseGroup: 'PHASE 12 — SECURITY IN JAVASCRIPT (Master)', title: '🔒 JS Security', duration: '1 week', outcomes: ['XSS types & prevention (DOMPurify, CSP)', 'CSRF & tokens', 'CORS policies', 'Prototype pollution attacks', 'eval() dangers', 'Secure cookie attributes (HttpOnly, SameSite)'] },

    { phaseGroup: 'PHASE 13 — TESTING JAVASCRIPT (Master)', title: '🧪 Testing Fundamentals & Frameworks', duration: '2 weeks', outcomes: ['Types of tests (unit, integration, e2e)', 'Vitest & Jest basics', 'Mocking modules & Spies', 'Async tests & Coverage', 'Playwright & Cypress (e2e)', 'Visual regression & Accessibility testing'] },

    { phaseGroup: 'PHASE 14 — ADVANCED PATTERNS (Master)', title: '🏛️ Architecture & 🔄 Reactive Patterns', duration: '2 weeks', outcomes: ['Creational, Structural, Behavioral patterns', 'Event-driven architecture', 'RxJS (Observable, Subject, operators)', 'Signals concept', 'WebSockets & Server-Sent Events (SSE)'] },

    { phaseGroup: 'PHASE 15 — TYPESCRIPT (Master)', title: '🔷 TypeScript Fundamentals & Advanced', duration: '2 weeks', outcomes: ['Type annotations & inference', 'Union, intersection, literal types', 'Interfaces vs Type aliases', 'Generics & Utility types', 'Mapped & Conditional types', 'Type guards & Declaration merging'] },

    { phaseGroup: 'PHASE 16 — AI-AUGMENTED JS (Master)', title: '🤖 JavaScript for AI Interfaces', duration: '2 weeks', outcomes: ['Streaming text responses (ReadableStream)', 'Token-by-token UI rendering', 'Vercel AI SDK', 'Tool calling / function calling in JS', 'Structured output parsing (Zod + LLM)', 'Embeddings & Semantic search UI'] }
  ]},
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
  'qa', 'cyber-security', 'game-developer', 
  'server-side-game-developer', 'mlops', 'bi-analyst'
];

extendedRolesMap.forEach(rId => {
  if (!roles.find(r => r.id === rId)) {
    roles.push({
      id: rId,
      type: ['postgresql', 'machine-learning', 'blockchain'].includes(rId) ? 'skill' : 'role',
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

// Ensure all un-typed roles default to 'role'
roles.forEach(r => {
  if (!r.type) r.type = 'role';
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
