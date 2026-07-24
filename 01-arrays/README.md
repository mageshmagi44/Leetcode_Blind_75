# Category 1: Arrays & Strings Foundations

This folder contains solutions and explanations for foundational Array problems in the Blind 75 plan.

## Problem List & Summaries

### 1. Two Sum (Easy)
- **Problem**: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
- **Approach**: Use a Hash Map to store elements and their indices. For each element `x`, check if `target - x` exists in the map. If it does, return their indices.
- **Time Complexity**: $O(n)$ — Single pass through the array.
- **Space Complexity**: $O(n)$ — Hash map stores up to $n$ elements.

### 2. Best Time to Buy and Sell Stock (Easy)
- **Problem**: Find the maximum profit you can achieve by buying on one day and selling on a future day.
- **Approach**: Keep track of the minimum price seen so far (`minPrice`) and calculate the potential profit at each step (`price - minPrice`). Keep track of the maximum profit.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(1)$ — Only a few state variables.

### 3. Contains Duplicate (Easy)
- **Problem**: Return `true` if any value appears at least twice in the array.
- **Approach**: Use a Hash Set. Traverse the array and check if the element is already in the set. If yes, return `true`. Otherwise, add it.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(n)$ — Hash set stores unique elements.

### 4. Product of Array Except Self (Medium)
- **Problem**: Return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`. Must run in $O(n)$ time and without using the division operator.
- **Approach**: 
  1. Initialize the output array.
  2. Compute prefix products: at index `i`, store the product of all elements to the left of `i`.
  3. Compute suffix products on the fly while traversing backward, multiplying it with the existing value in the output array.
- **Time Complexity**: $O(n)$ — Two passes.
- **Space Complexity**: $O(1)$ — Excluding the output array itself (as per problem description).

### 5. Maximum Subarray (Medium)
- **Problem**: Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
- **Approach**: **Kadane's Algorithm**. Iterate through the array, maintaining the current subarray sum (`currentSum`). If `currentSum` becomes negative, reset it to 0 (or start a new subarray at the current element). Track the global maximum (`maxSum`).
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(1)$ — Constant memory.

### 6. Search in Rotated Sorted Array (Medium)
- **Problem**: Search a target value in a sorted array that has been rotated at some pivot. Must be $O(\log n)$ time.
- **Approach**: Modified Binary Search.
  - In a rotated sorted array, at least one half of the partition is always sorted.
  - Determine if the left or right half is sorted.
  - Check if the target lies within the boundaries of the sorted half.
  - Adjust `left` or `right` pointers accordingly.
- **Time Complexity**: $O(\log n)$ — Binary search.
- **Space Complexity**: $O(1)$ — Constant memory.

### 7. 3Sum (Medium)
- **Problem**: Find all unique triplets in the array which sum to zero.
- **Approach**: 
  - Sort the array first.
  - Iterate through the array with pointer `i`. If `nums[i] > 0`, break early. Skip duplicates of `nums[i]`.
  - Use a two-pointer approach (`left = i + 1`, `right = n - 1`) to find pairs that sum to `-nums[i]`.
  - Skip duplicates for `left` and `right` after finding a valid triplet to prevent duplicate triplets in the output.
- **Time Complexity**: $O(n^2)$ — Sorting takes $O(n \log n)$, and the two-pointer search takes $O(n)$ for each element.
- **Space Complexity**: $O(\log n)$ to $O(n)$ — Depending on the sorting implementation.
