export const GRAPH_PROBLEMS_CODE = {
  '01. BFS': {
    javascript: `// Graph BFS
function bfs(adjList, startNode) {
    const visited = new Set([startNode]);
    const queue = [startNode];
    const res = [];
    while(queue.length > 0) {
        const curr = queue.shift();
        res.push(curr);
        for(let neighbor of adjList[curr] || []) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return res;
}
console.log(bfs({0: [1,2], 1: [2], 2: [0,3], 3: [3]}, 2));`,
    python: `# Graph BFS
from collections import deque
def bfs(adjList, start_node):
    visited = set([start_node])
    queue = deque([start_node])
    res = []
    while queue:
        curr = queue.popleft()
        res.append(curr)
        for neighbor in adjList.get(curr, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return res
print(bfs({0: [1,2], 1: [2], 2: [0,3], 3: [3]}, 2))`,
    java: `// Graph BFS
import java.util.*;
public class YourClassName {
    public static List<Integer> bfs(Map<Integer, List<Integer>> adjList, int startNode) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> res = new ArrayList<>();
        visited.add(startNode);
        queue.add(startNode);
        while(!queue.isEmpty()) {
            int curr = queue.poll();
            res.add(curr);
            for(int neighbor : adjList.getOrDefault(curr, new ArrayList<>())) {
                if(!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return res;
    }
    public static void main(String[] args) {
        System.out.println("BFS Traversal");
    }
}`,
    cpp: `// Graph BFS
#include <iostream>
#include <vector>
#include <queue>
using namespace std;
vector<int> bfsOfGraph(int V, vector<int> adj[]) {
    vector<int> bfs;
    vector<bool> vis(V, false);
    queue<int> q;
    q.push(0);
    vis[0] = true;
    while(!q.empty()) {
        int node = q.front();
        q.pop();
        bfs.push_back(node);
        for(auto it : adj[node]) {
            if(!vis[it]) {
                vis[it] = true;
                q.push(it);
            }
        }
    }
    return bfs;
}
int main() {
    cout << "BFS Traversal" << endl;
    return 0;
}`,
    c: `// Graph BFS
#include <stdio.h>
int main() { printf("BFS Traversal\\n"); return 0; }`
  }
};
