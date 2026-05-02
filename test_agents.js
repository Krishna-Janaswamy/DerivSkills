// test_agents.js
// Run this with: node test_agents.js

const BASE_URL = 'http://localhost:3000/api/agents';

async function testProjectIdeas() {
  console.log('\n--- 💡 Testing Project Ideas Agent ---');
  const res = await fetch(`${BASE_URL}/project-ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      skills: ['React', 'Redis', 'Next.js'],
      role: 'Full Stack Developer',
      experienceLevel: 'Intermediate'
    })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

async function testAnalyzeProject() {
  console.log('\n--- 🏗  Testing Project Analyzer Agent ---');
  const res = await fetch(`${BASE_URL}/analyze-project`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      projectContext: 'A production-ready Node.js API',
      files: [
        { 
          path: 'server.js', 
          content: 'const express = require("express");\nconst helmet = require("helmet");\nconst cors = require("cors");\nconst apiRoutes = require("./routes/api");\nconst { errorHandler } = require("./middleware/error");\nconst logger = require("./utils/logger");\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.use(helmet());\napp.use(cors({ origin: ["https://trusted-domain.com"] }));\napp.use(express.json());\n\napp.use("/api/v1", apiRoutes);\napp.use(errorHandler);\n\napp.listen(PORT, () => {\n  logger.info(`Server running securely on port ${PORT}`);\n});' 
        },
        {
          path: 'routes/api.js',
          content: 'const express = require("express");\nconst router = express.Router();\nconst healthController = require("../controllers/healthController");\n\nrouter.get("/health", healthController.checkHealth);\n\nmodule.exports = router;'
        },
        {
          path: 'controllers/healthController.js',
          content: 'const cacheService = require("../services/cacheService");\nconst logger = require("../utils/logger");\n\nexports.checkHealth = async (req, res, next) => {\n  try {\n    const cachedStatus = await cacheService.get("health_status");\n    if (cachedStatus) {\n      return res.status(200).json(JSON.parse(cachedStatus));\n    }\n    const status = { status: "healthy", uptime: process.uptime() };\n    await cacheService.set("health_status", JSON.stringify(status), 60);\n    logger.info("Health check performed successfully");\n    res.status(200).json(status);\n  } catch (error) {\n    next(error);\n  }\n};'
        },
        {
          path: 'services/cacheService.js',
          content: 'const Redis = require("ioredis");\nconst redis = new Redis(process.env.REDIS_URL);\n\nexports.get = async (key) => {\n  return await redis.get(key);\n};\n\nexports.set = async (key, value, ttl) => {\n  await redis.set(key, value, "EX", ttl);\n};'
        },
        {
          path: 'utils/logger.js',
          content: 'const winston = require("winston");\nconst logger = winston.createLogger({\n  level: "info",\n  format: winston.format.json(),\n  transports: [\n    new winston.transports.Console({ format: winston.format.simple() })\n  ]\n});\nmodule.exports = logger;'
        },
        {
          path: 'middleware/error.js',
          content: 'const logger = require("../utils/logger");\n\nexports.errorHandler = (err, req, res, next) => {\n  logger.error("[Error]", { message: err.message, stack: err.stack });\n  res.status(500).json({\n    success: false,\n    message: "An internal server error occurred"\n  });\n};'
        }
      ]
    })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

async function testResumeProjects() {
  console.log('\n--- 📄 Testing Resume Projects Agent ---');
  const res = await fetch(`${BASE_URL}/generate-resume-projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      skills: ['Python', 'PostgreSQL', 'Docker'],
      role: 'Backend Engineer',
      jobDescription: 'Looking for a backend engineer to build scalable APIs and manage database operations.'
    })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

async function runAll() {
  console.log('Testing agents against your local dev server (http://localhost:3000)...\n');
  try {
    await testProjectIdeas();
    await testAnalyzeProject();
    await testResumeProjects();
    console.log('\n✅ All tests complete!');
  } catch (err) {
    console.error('Test failed. Make sure your dev server is running on port 3000.', err);
  }
}

runAll();
