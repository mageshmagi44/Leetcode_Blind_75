/**
 * Blind 75 - Category 7: Dynamic Programming
 */

/**
 * 1. Climbing Stairs (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function climbStairs(n: number): number {
    if (n <= 2) {
        return n;
    }

    let prev2 = 1;
    let prev1 = 2;

    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

/**
 * 2. Coin Change (Medium)
 * Time Complexity: O(amount * n) where n is the number of coins
 * Space Complexity: O(amount)
 */
export function coinChange(coins: number[], amount: number): number {
    const dp = new Array<number>(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}

/**
 * 3. Longest Increasing Subsequence (Medium)
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
export function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) {
        return 0;
    }

    const dp = new Array<number>(nums.length).fill(1);
    let maxLIS = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLIS = Math.max(maxLIS, dp[i]);
    }

    return maxLIS;
}

/**
 * 4. Word Break (Medium)
 * Time Complexity: O(n^3) or O(n^2 * L) where L is the max length of a word in dictionary
 * Space Complexity: O(n + d) where d is dictionary size
 */
export function wordBreak(s: string, wordDict: string[]): boolean {
    const wordSet = new Set<string>(wordDict);
    const dp = new Array<boolean>(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}

/**
 * 5. House Robber (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function rob(nums: number[]): number {
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0];
    }

    let prev2 = 0;
    let prev1 = 0;

    for (const num of nums) {
        const temp = prev1;
        prev1 = Math.max(prev1, prev2 + num);
        prev2 = temp;
    }

    return prev1;
}

/**
 * 6. Jump Game (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function canJump(nums: number[]): boolean {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            return false; // We can't reach the current cell
        }
        maxReach = Math.max(maxReach, i + nums[i]);
    }

    return true;
}
