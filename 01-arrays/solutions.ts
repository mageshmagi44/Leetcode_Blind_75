/**
 * Blind 75 - Category 1: Arrays
 */

/**
 * 1. Two Sum (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}

/**
 * 2. Best Time to Buy and Sell Stock (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
}

/**
 * 3. Contains Duplicate (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function containsDuplicate(nums: number[]): boolean {
    const set = new Set<number>();
    for (const num of nums) {
        if (set.has(num)) {
            return true;
        }
        set.add(num);
    }
    return false;
}

/**
 * 4. Product of Array Except Self (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(1) (excluding the output array)
 */
export function productExceptSelf(nums: number[]): number[] {
    const length = nums.length;
    const answer = new Array<number>(length);

    // answer[i] contains the product of all the elements to the left of i
    answer[0] = 1;
    for (let i = 1; i < length; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    // R contains the product of all the elements to the right of i
    let R = 1;
    for (let i = length - 1; i >= 0; i--) {
        answer[i] = answer[i] * R;
        R *= nums[i];
    }

    return answer;
}

/**
 * 5. Maximum Subarray (Medium) - Kadane's Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Decide whether to add the current element to the existing subarray
        // or start a new subarray from the current element.
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/**
 * 6. Search in Rotated Sorted Array (Medium)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        }

        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Target is in the left sorted half
            } else {
                left = mid + 1; // Target is in the right half
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Target is in the right sorted half
            } else {
                right = mid - 1; // Target is in the left half
            }
        }
    }

    return -1;
}

/**
 * 7. 3Sum (Medium)
 * Time Complexity: O(n^2)
 * Space Complexity: O(log n) to O(n) depending on sorting
 */
export function threeSum(nums: number[]): number[][] {
    const results: number[][] = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        // If the smallest number is greater than 0, we can't sum to 0
        if (nums[i] > 0) {
            break;
        }
        
        // Skip duplicate values for the first element
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                results.push([nums[i], nums[left], nums[right]]);
                // Skip duplicates for left and right pointers
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return results;
}
