// Role-specific ATS keywords used to scaffold new resumes and evaluate keyword gaps

export const ROLE_KEYWORDS = {
  "Frontend Engineer": [
    "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3",
    "Redux", "Zustand", "REST API", "GraphQL", "Webpack", "Vite",
    "TailwindCSS", "Responsive Design", "Web Performance", "Accessibility (WCAG)",
    "Jest", "React Testing Library", "CI/CD", "Git", "Agile"
  ],
  "Backend Engineer": [
    "Node.js", "Express", "Python", "FastAPI", "Django", "PostgreSQL",
    "MySQL", "MongoDB", "Redis", "REST API", "GraphQL", "Docker",
    "Kubernetes", "AWS", "Microservices", "Authentication (JWT/OAuth)",
    "CI/CD", "Git", "System Design", "Prisma", "SQL", "Agile"
  ],
  "Full Stack Engineer": [
    "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB",
    "Redis", "REST API", "GraphQL", "Docker", "AWS", "Prisma",
    "TailwindCSS", "Git", "CI/CD", "Authentication", "System Design",
    "Agile", "Microservices", "Vercel", "Testing"
  ],
  "DevOps Engineer": [
    "Docker", "Kubernetes", "Terraform", "AWS", "GCP", "Azure",
    "CI/CD", "Jenkins", "GitHub Actions", "Ansible", "Prometheus",
    "Grafana", "Linux", "Bash", "Python", "Nginx", "Helm",
    "Infrastructure as Code", "Monitoring", "SRE", "GitOps"
  ],
  "Data Engineer": [
    "Python", "SQL", "Apache Spark", "Apache Kafka", "Airflow",
    "PostgreSQL", "Snowflake", "BigQuery", "Redshift", "dbt",
    "ETL", "Data Pipelines", "AWS", "GCP", "Databricks",
    "Pandas", "PySpark", "Data Modeling", "Delta Lake", "dbt"
  ],
  "ML Engineer": [
    "Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas",
    "NumPy", "MLflow", "Kubeflow", "Docker", "AWS SageMaker",
    "Feature Engineering", "Model Deployment", "REST API", "Jupyter",
    "SQL", "Data Preprocessing", "LLMs", "Transformers", "HuggingFace"
  ],
  "Product Manager": [
    "Product Roadmap", "User Research", "A/B Testing", "Agile", "Scrum",
    "Stakeholder Management", "OKRs", "KPIs", "Jira", "Figma",
    "Go-to-Market", "Customer Discovery", "Data Analysis", "SQL",
    "Cross-functional Collaboration", "PRD", "Sprint Planning", "Prioritization"
  ],
  "Cloud Architect": [
    "AWS", "GCP", "Azure", "Terraform", "Kubernetes", "Docker",
    "Microservices", "Serverless", "VPC", "IAM", "Load Balancing",
    "Auto Scaling", "Cost Optimization", "Security", "CI/CD",
    "High Availability", "Disaster Recovery", "CloudFormation", "Architecture Design"
  ],
};

export const ROLES_LIST = Object.keys(ROLE_KEYWORDS);
