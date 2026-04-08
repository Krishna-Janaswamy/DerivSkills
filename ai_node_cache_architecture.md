# Atomic Node AI Assistance: Cache-Aside Architecture

```mermaid
flowchart TD
    A[User Clicks Node] --> B[Frontend Requests AI Assistance]
    B --> C{In-Memory Cache (Redis?)}
    C -- Hit --> D[Return Cached Result]
    C -- Miss --> E{Persistent DB}
    E -- Hit --> F[Store in Cache & Return]
    E -- Miss --> G[Call AI API]
    G --> H[Store in DB & Cache]
    H --> I[Return AI Result]
```

**Workflow:**
1. User clicks node.
2. Frontend requests AI assistance from backend.
3. Backend checks in-memory cache (e.g., Redis).
   - If found, returns cached result.
   - If not, checks persistent DB.
     - If found, stores in cache and returns.
     - If not, calls AI API, stores result in DB and cache, then returns.
4. Use TTL for cache and refresh DB as needed.
