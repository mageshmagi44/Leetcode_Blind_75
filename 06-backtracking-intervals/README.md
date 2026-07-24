# Category 6: Backtracking & Intervals

This folder contains solutions and explanations for Backtracking (state-space search using recursion) and Interval-merging problems in the Blind 75 plan.

## Problem List & Summaries

### 1. Combination Sum (Medium)
- **Problem**: Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may use the same candidate number an unlimited number of times.
- **Approach**: **Backtracking with Index Offset**.
  - Sort the candidates to allow early pruning.
  - In our backtrack helper, we pass the current start index, target left, and current combination path.
  - If `target === 0`, add current combination to results.
  - If `target < 0`, return (since candidates are sorted, all subsequent candidates will also exceed target).
  - Iterate from the current start index to allow choosing the same element again (by passing the same index `i` to the recursive step).
- **Time Complexity**: $O(2^t \cdot k)$ — where $t$ is target divided by the minimum candidate, and $k$ is average combination size.
- **Space Complexity**: $O(t)$ — recursion stack depth.

### 2. Permutations (Medium)
- **Problem**: Given an array `nums` of distinct integers, return all the possible permutations.
- **Approach**: **Backtracking with a Visited Array/Set**.
  - Recursively build paths of size `nums.length`.
  - For each step, iterate through all elements in `nums`. If the element is already in the current permutation (use a set or boolean lookup), skip it.
  - Otherwise, push it to the path, mark it visited, recurse, and then backtrack (pop and unvisit).
- **Time Complexity**: $O(n \cdot n!)$ — $n!$ permutations, and copying each takes $O(n)$.
- **Space Complexity**: $O(n)$ — recursion call stack and visited tracker.

### 3. Subsets (Medium)
- **Problem**: Given an integer array `nums` of unique elements, return all possible subsets (the power set).
- **Approach**: **Backtracking / Cascade**.
  - In backtrack helper, at each node of the decision tree, we decide to add the current candidate to the subset.
  - Add a copy of the current combination path to result.
  - Iterate from `index` to `nums.length`, append `nums[i]` to path, recurse with `i + 1`, and then pop (backtrack).
- **Time Complexity**: $O(n \cdot 2^n)$ — $2^n$ subsets, copying each takes $O(n)$.
- **Space Complexity**: $O(n)$ — recursion stack.

### 4. Word Search (Medium)
- **Problem**: Given an $m \times n$ grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.
- **Approach**: **DFS with Backtracking**.
  - Search for the start character in the grid.
  - Once found, perform DFS in 4 directions to find subsequent characters.
  - Mark the current cell as visited (e.g. swap with `#`) to avoid using the same cell twice in the same path, and restore it before backtracking.
- **Time Complexity**: $O(m \cdot n \cdot 3^L)$ — where $L$ is word length (we search 3 directions since we don't go back).
- **Space Complexity**: $O(L)$ — recursion stack.

### 5. Merge Intervals (Medium)
- **Problem**: Given an array of intervals, merge all overlapping intervals.
- **Approach**: **Sorting**.
  - Sort intervals by their start times: `intervals.sort((a, b) => a[0] - b[0])`.
  - Initialize the `merged` list with the first interval.
  - Iterate through the remaining intervals. If the current interval's start time $\le$ the end time of the last interval in `merged`, update the end time of the last interval in `merged` to be $\max(\text{lastInterval.end}, \text{currInterval.end})$.
  - Otherwise, add the current interval to `merged`.
- **Time Complexity**: $O(n \log n)$ — dominated by sorting.
- **Space Complexity**: $O(\log n)$ to $O(n)$ — depending on the sort implementation.
