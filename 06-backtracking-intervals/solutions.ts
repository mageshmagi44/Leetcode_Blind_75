/**
 * Blind 75 - Category 6: Backtracking & Intervals
 */

/**
 * 1. Combination Sum (Medium)
 * Time Complexity: O(2^t * k) where t is target divided by min candidate
 * Space Complexity: O(t)
 */
export function combinationSum(candidates: number[], target: number): number[][] {
    const results: number[][] = [];
    candidates.sort((a, b) => a - b); // Sorting for early pruning

    function backtrack(start: number, path: number[], remain: number): void {
        if (remain === 0) {
            results.push([...path]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) {
                break; // Remaining candidates will be larger, prune the search
            }

            path.push(candidates[i]);
            // Recurse with the same index 'i' since we can reuse numbers
            backtrack(i, path, remain - candidates[i]);
            path.pop(); // Backtrack
        }
    }

    backtrack(0, [], target);
    return results;
}

/**
 * 2. Permutations (Medium)
 * Time Complexity: O(n * n!)
 * Space Complexity: O(n)
 */
export function permute(nums: number[]): number[][] {
    const results: number[][] = [];
    const visited = new Set<number>();

    function backtrack(path: number[]): void {
        if (path.length === nums.length) {
            results.push([...path]);
            return;
        }

        for (const num of nums) {
            if (visited.has(num)) {
                continue;
            }

            path.push(num);
            visited.add(num);
            backtrack(path);
            visited.delete(num); // Backtrack
            path.pop(); // Backtrack
        }
    }

    backtrack([]);
    return results;
}

/**
 * 3. Subsets (Medium)
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n)
 */
export function subsets(nums: number[]): number[][] {
    const results: number[][] = [];

    function backtrack(start: number, path: number[]): void {
        results.push([...path]);

        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop(); // Backtrack
        }
    }

    backtrack(0, []);
    return results;
}

/**
 * 4. Word Search (Medium)
 * Time Complexity: O(m * n * 3^L) where L is the word length
 * Space Complexity: O(L)
 */
export function exist(board: string[][], word: string): boolean {
    const m = board.length;
    const n = board[0].length;

    function backtrack(r: number, c: number, index: number): boolean {
        if (index === word.length) {
            return true;
        }

        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[index]) {
            return false;
        }

        // Mark as visited using a special character
        const temp = board[r][c];
        board[r][c] = "#";

        // Search in 4 directions
        const found =
            backtrack(r - 1, c, index + 1) ||
            backtrack(r + 1, c, index + 1) ||
            backtrack(r, c - 1, index + 1) ||
            backtrack(r, c + 1, index + 1);

        // Restore cell state (backtrack)
        board[r][c] = temp;

        return found;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (backtrack(r, c, 0)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * 5. Merge Intervals (Medium)
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n) to O(n) depending on sort
 */
export function merge(intervals: number[][]): number[][] {
    if (intervals.length === 0) {
        return [];
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const merged: number[][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        // If current interval overlaps with the last merged interval
        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            merged.push(current);
        }
    }

    return merged;
}
