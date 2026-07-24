# Category 7: Dynamic Programming

This folder contains solutions and explanations for Dynamic Programming (DP) problems in the Blind 75 plan.

## Problem List & Summaries

### 1. Climbing Stairs (Easy)
- **Problem**: You are climbing a staircase. It takes $n$ steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
- **Approach**: **1D DP (Fibonacci Sequence)**.
  - Let `dp[i]` be the number of ways to reach step `i`.
  - Relation: `dp[i] = dp[i-1] + dp[i-2]`.
  - We can optimize space to $O(1)$ by keeping track of the last two values (`prev1` and `prev2`).
- **Time Complexity**: $O(n)$ — Single pass loop.
- **Space Complexity**: $O(1)$ — Only state variables.

### 2. Coin Change (Medium)
- **Problem**: Return the fewest number of coins that you need to make up an amount. If that amount of money cannot be made up by any combination of the coins, return -1.
- **Approach**: **Tabulation (Bottom-Up 1D DP)**.
  - Let `dp[i]` be the minimum number of coins to make amount `i`.
  - Initialize `dp` array of size `amount + 1` filled with `Infinity` or `amount + 1`. `dp[0] = 0`.
  - Relation: `dp[i] = min(dp[i], dp[i - coin] + 1)` for each coin in coins.
- **Time Complexity**: $O(\text{amount} \cdot n)$ — where $n$ is the number of coin types.
- **Space Complexity**: $O(\text{amount})$ — size of the DP array.

### 3. Longest Increasing Subsequence (Medium)
- **Problem**: Find the length of the longest strictly increasing subsequence.
- **Approach**: **1D DP**.
  - Let `dp[i]` be the length of the LIS ending at index `i`.
  - Initialize `dp` array with 1s.
  - Relation: for each $i$, check all $j < i$. If `nums[j] < nums[i]`, update `dp[i] = max(dp[i], dp[j] + 1)`.
- **Time Complexity**: $O(n^2)$ — Nested loops. (Can be optimized to $O(n \log n)$ using binary search, but the DP approach is the most foundational).
- **Space Complexity**: $O(n)$ — DP array.

### 4. Word Break (Medium)
- **Problem**: Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.
- **Approach**: **1D DP**.
  - Let `dp[i]` be `true` if the prefix of length `i` (`s.substring(0, i)`) can be segmented.
  - `dp[0] = true` (empty string).
  - Relation: `dp[i] = true` if there exists $j < i$ such that `dp[j] === true` AND `s.substring(j, i)` is in the `wordDict` set.
- **Time Complexity**: $O(n^3)$ or $O(n^2 \cdot L)$ — where $n$ is string length and $L$ is max word length in dictionary (due to substring operations).
- **Space Complexity**: $O(n + D)$ — where $D$ is the size of the dictionary set.

### 5. House Robber (Medium)
- **Problem**: Find the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).
- **Approach**: **1D DP (Space Optimized)**.
  - Let `dp[i]` be the max profit up to house `i`.
  - Relation: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.
  - Space can be optimized to $O(1)$ by storing only the previous two house values.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(1)$ — Constant memory.

### 6. Jump Game (Medium)
- **Problem**: You are initially positioned at the array's first index, and each element represents your maximum jump length at that position. Determine if you are able to reach the last index.
- **Approach**: **Greedy (State reduction of DP)**.
  - Keep track of the furthest index reachable so far (`maxReach`).
  - Iterate through the array. If current index $i$ exceeds `maxReach`, return `false` (cannot proceed).
  - Update `maxReach = max(maxReach, i + nums[i])`.
  - If `maxReach >= targetIndex`, return `true`.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(1)$ — Only a single pointer.
