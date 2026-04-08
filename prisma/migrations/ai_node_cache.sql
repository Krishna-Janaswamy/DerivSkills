-- ai_node_cache table for atomic node AI assistance
CREATE TABLE IF NOT EXISTS ai_node_cache (
  node_id TEXT PRIMARY KEY,
  ai_result JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
