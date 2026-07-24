/**
 * Blind 75 - Category 5: Graphs
 */

/**
 * Node definition for graph cloning.
 */
export class Node {
    val: number;
    neighbors: Node[];
    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
    }
}

/**
 * 1. Number of Islands (Medium)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
export function numIslands(grid: string[][]): number {
    if (grid.length === 0) {
        return 0;
    }

    const m = grid.length;
    const n = grid[0].length;
    let islandCount = 0;

    function dfs(r: number, c: number): void {
        // Out of bounds or water cell or already visited cell
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") {
            return;
        }

        // Mark as visited by sinking the land cell to water
        grid[r][c] = "0";

        // Visit neighbors
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === "1") {
                islandCount++;
                dfs(r, c);
            }
        }
    }

    return islandCount;
}

/**
 * 2. Clone Graph (Medium)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function cloneGraph(node: Node | null): Node | null {
    if (node === null) {
        return null;
    }

    const visitedMap = new Map<Node, Node>();

    function dfs(curr: Node): Node {
        if (visitedMap.has(curr)) {
            return visitedMap.get(curr)!;
        }

        const clone = new Node(curr.val);
        visitedMap.set(curr, clone);

        for (const neighbor of curr.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

/**
 * 3. Course Schedule (Medium) - Topological Sort Cycle Detection
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const adj: number[][] = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array<number>(numCourses).fill(0);

    // Build the adjacency list and in-degrees
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        inDegree[course]++;
    }

    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let processedCount = 0;

    while (queue.length > 0) {
        const curr = queue.shift()!;
        processedCount++;

        for (const neighbor of adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return processedCount === numCourses;
}

/**
 * 4. Pacific Atlantic Water Flow (Medium)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
export function pacificAtlantic(heights: number[][]): number[][] {
    if (heights.length === 0 || heights[0].length === 0) {
        return [];
    }

    const m = heights.length;
    const n = heights[0].length;

    const pacificReachable = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
    const atlanticReachable = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));

    function dfs(r: number, c: number, visited: boolean[][], prevHeight: number): void {
        if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || heights[r][c] < prevHeight) {
            return;
        }

        visited[r][c] = true;

        dfs(r - 1, c, visited, heights[r][c]);
        dfs(r + 1, c, visited, heights[r][c]);
        dfs(r, c - 1, visited, heights[r][c]);
        dfs(r, c + 1, visited, heights[r][c]);
    }

    // Traverse from edges inwards
    for (let c = 0; c < n; c++) {
        dfs(0, c, pacificReachable, heights[0][c]);
        dfs(m - 1, c, atlanticReachable, heights[m - 1][c]);
    }

    for (let r = 0; r < m; r++) {
        dfs(r, 0, pacificReachable, heights[r][0]);
        dfs(r, n - 1, atlanticReachable, heights[r][n - 1]);
    }

    const result: number[][] = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (pacificReachable[r][c] && atlanticReachable[r][c]) {
                result.push([r, c]);
            }
        }
    }

    return result;
}

/**
 * 5. Number of Connected Components in an Undirected Graph (Medium)
 * Time Complexity: O(V + E * alpha(V)) where alpha is inverse Ackermann function
 * Space Complexity: O(V)
 */
export function countComponents(n: number, edges: number[][]): number {
    const parent = Array.from({ length: n }, (_, i) => i);
    let components = n;

    function find(i: number): number {
        if (parent[i] === i) {
            return i;
        }
        return (parent[i] = find(parent[i])); // Path compression
    }

    function union(i: number, j: number): void {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            parent[rootI] = rootJ;
            components--;
        }
    }

    for (const [u, v] of edges) {
        union(u, v);
    }

    return components;
}

/**
 * 6. Graph Valid Tree (Medium)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */
export function validTree(n: number, edges: number[][]): boolean {
    // A tree must have exactly n - 1 edges
    if (edges.length !== n - 1) {
        return false;
    }

    // Build the adjacency list
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const visited = new Set<number>();

    function dfs(curr: number): void {
        visited.add(curr);
        for (const neighbor of adj[curr]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }

    // Start DFS traversal from node 0
    dfs(0);

    // If fully connected, visited size must equal n
    return visited.size === n;
}

/**
 * 7. Alien Dictionary (Hard)
 * Time Complexity: O(C) where C is the total length of all words combined
 * Space Complexity: O(V + E) where V <= 26 and E <= V^2
 */
export function alienOrder(words: string[]): string {
    const adj = new Map<string, Set<string>>();
    const inDegree = new Map<string, number>();

    // Initialize the structures for all unique characters
    for (const word of words) {
        for (const char of word) {
            inDegree.set(char, 0);
            adj.set(char, new Set());
        }
    }

    // Build the dependency graph
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];

        // Edge case: if w1 is a prefix of w2 and is longer, ordering is invalid (e.g. "abc" before "ab")
        if (w1.length > w2.length && w1.startsWith(w2)) {
            return "";
        }

        const minLen = Math.min(w1.length, w2.length);
        for (let j = 0; j < minLen; j++) {
            if (w1[j] !== w2[j]) {
                const parent = w1[j];
                const child = w2[j];
                if (!adj.get(parent)!.has(child)) {
                    adj.get(parent)!.add(child);
                    inDegree.set(child, inDegree.get(child)! + 1);
                }
                break; // Found the difference, remaining characters don't dictate order
            }
        }
    }

    // Kahn's algorithm for topological sorting
    const queue: string[] = [];
    for (const [char, deg] of inDegree.entries()) {
        if (deg === 0) {
            queue.push(char);
        }
    }

    let order = "";
    while (queue.length > 0) {
        const curr = queue.shift()!;
        order += curr;

        for (const neighbor of adj.get(curr)!) {
            inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If topological sort includes all unique characters, order is valid, else cyclic
    return order.length === inDegree.size ? order : "";
}
