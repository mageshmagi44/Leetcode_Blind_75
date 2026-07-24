# Category 5: Graphs

This folder contains solutions and explanations for Graph problems in the Blind 75 plan.

## Data Structure Definitions
For Clone Graph, the standard Node definition is:
```typescript
class Node {
    val: number;
    neighbors: Node[];
    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
    }
}
```

---

## Problem List & Summaries

### 1. Number of Islands (Medium)
- **Problem**: Given an $m \times n$ 2D binary grid which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.
- **Approach**: **DFS / BFS**.
  - Iterate through every cell. If a cell is `'1'`, trigger a DFS/BFS to visit the entire island and mark visited cells as `'0'` (in-place modification) or use a visited set.
  - Increment the island count for every new traversal started.
- **Time Complexity**: $O(m \times n)$ — Each cell is visited constant times.
- **Space Complexity**: $O(m \times n)$ — Worst case recursion stack (or queue size) equal to the grid size.

### 2. Clone Graph (Medium)
- **Problem**: Return a deep copy of a connected undirected graph.
- **Approach**: **DFS with Hash Map**.
  - Keep a hash map mapping original node pointer $\to$ cloned node pointer to avoid cycles and handle back-edges.
  - Recursively clone neighbors: if neighbor is already cloned, return the cloned node from the map. Otherwise, create a copy and recurse for its neighbors.
- **Time Complexity**: $O(V + E)$ — $V$ is number of vertices, $E$ is number of edges.
- **Space Complexity**: $O(V)$ — Hash map and recursion stack size.

### 3. Course Schedule (Medium)
- **Problem**: Determine if you can finish all courses given prereqs. (Detect cycles in a directed graph).
- **Approach**: **Topological Sort (Kahn's BFS or DFS Cycle Detection)**.
  - **Kahn's Algorithm**:
    1. Calculate in-degrees for each vertex.
    2. Add vertices with in-degree 0 to a queue.
    3. While queue is not empty, pop a course, increment the count of processed courses, and decrease in-degrees of its neighbors. If any neighbor's in-degree drops to 0, push to queue.
    4. If processed count matches total courses, cycle-free (return `true`), else cyclic (return `false`).
- **Time Complexity**: $O(V + E)$ — BFS traversal.
- **Space Complexity**: $O(V + E)$ — Adjacency list and in-degree table.

### 4. Pacific Atlantic Water Flow (Medium)
- **Problem**: Find the list of grid coordinates where water can flow to both the Pacific Ocean and Atlantic Ocean.
- **Approach**: **DFS/BFS starting from the oceans**.
  - Instead of flowing *down* from each cell, flow *up* from cells adjacent to Pacific (top and left edges) and Atlantic (bottom and right edges).
  - Perform DFS/BFS from Pacific border cells and Atlantic border cells. Track cells reachable from each ocean.
  - Return cells that are in both reachability sets.
- **Time Complexity**: $O(m \times n)$ — Visited arrays avoid redundant checks.
- **Space Complexity**: $O(m \times n)$ — Reachability matrices.

### 5. Number of Connected Components (Medium)
- **Problem**: Find the number of connected components in an undirected graph.
- **Approach**: **Union-Find (Disjoint Set Union - DSU)**.
  - Initialize $n$ components, each node parent of itself.
  - For each edge, perform `union`. If the two nodes were not already connected, decrease the component count by 1.
- **Time Complexity**: $O(V + E \cdot \alpha(V))$ — Near-linear where $\alpha$ is the inverse Ackermann function.
- **Space Complexity**: $O(V)$ — Parents array.

### 6. Graph Valid Tree (Medium)
- **Problem**: Check if $n$ nodes form a valid tree.
- **Approach**:
  - A graph is a tree if and only if:
    1. It has exactly $n - 1$ edges.
    2. It is fully connected (all $n$ nodes reachable from node 0).
  - Use DFS/BFS from node 0 to check if all nodes are visited, after verifying edge count is $n - 1$.
- **Time Complexity**: $O(V + E)$ — Graph traversal.
- **Space Complexity**: $O(V + E)$ — Adjacency list and visited set.

### 7. Alien Dictionary (Hard)
- **Problem**: Given a sorted dictionary of words from an alien language, find the order of characters.
- **Approach**: **Topological Sort**.
  - Compare adjacent words to find directed edges (e.g. if `word1 = "wrt"`, `word2 = "wrf"`, then `'t' -> 'f'`).
  - Build adjacency list and calculate in-degrees of all present characters.
  - Perform Kahn's algorithm or DFS topological sort.
  - Ensure edge cases like cycles or invalid inputs (e.g. `word1 = "abc", word2 = "ab"`) are handled.
- **Time Complexity**: $O(C)$ where $C$ is the total length of all words combined.
- **Space Complexity**: $O(V + E)$ — where $V \le 26$ and $E \le V^2$.
