# Category 2: Strings & Hash Maps/Stacks

This folder contains solutions and explanations for string-based problems in the Blind 75 plan.

## Problem List & Summaries

### 1. Longest Substring Without Repeating Characters (Medium)
- **Problem**: Find the length of the longest substring without repeating characters.
- **Approach**: **Sliding Window**.
  - Maintain a hash map/set of character positions or presence.
  - Expand `right` pointer. If a duplicate character is found, contract `left` to the position after the previous occurrence.
  - Record the maximum window size (`right - left + 1`).
- **Time Complexity**: $O(n)$ — Each character is visited at most twice.
- **Space Complexity**: $O(\min(n, m))$ — Where $m$ is the alphabet size.

### 2. Longest Repeating Character Replacement (Medium)
- **Problem**: Find the length of the longest substring containing the same letter you can choose after replacing at most $k$ characters.
- **Approach**: **Sliding Window**.
  - Keep a frequency map of characters in the window and track the maximum frequency of any single character in the current window (`maxFreq`).
  - If the window size minus `maxFreq` exceeds $k$ (`(right - left + 1) - maxFreq > k`), it's invalid. Shrink the window from the left.
- **Time Complexity**: $O(n)$ — Single pass sliding window.
- **Space Complexity**: $O(26) = O(1)$ — Only uppercase English letters.

### 3. Minimum Window Substring (Hard)
- **Problem**: Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` is included in the window.
- **Approach**: **Sliding Window with Two Hash Maps**.
  - Create a frequency map for `t`.
  - Expand `right` of `s` and record character counts. Maintain a count of matching conditions.
  - When all conditions match, try to shrink `left` as much as possible while maintaining the match.
  - Track the minimum valid substring length and start index.
- **Time Complexity**: $O(|S| + |T|)$ — Linear traversal.
- **Space Complexity**: $O(|S| + |T|)$ — Hash maps.

### 4. Valid Anagram (Easy)
- **Problem**: Return `true` if `t` is an anagram of `s`, and `false` otherwise.
- **Approach**: 
  - If lengths differ, return `false`.
  - Use a single character count array of size 26. Increment counts for `s` and decrement for `t`.
  - Return true if all counts are 0.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(1)$ — Fixed size array of 26.

### 5. Group Anagrams (Medium)
- **Problem**: Group an array of strings that are anagrams of each other.
- **Approach**: 
  - Sort each string alphabetically (or build a character frequency count string e.g., `"2#1#0...#0"`) to use as a hash key.
  - Use a hash map where key is the sorted string and value is an array of anagrams.
- **Time Complexity**: $O(n \cdot k \log k)$ where $k$ is max length of a string (if sorting).
- **Space Complexity**: $O(n \cdot k)$ — Storing strings in the map.

### 6. Valid Parentheses (Easy)
- **Problem**: Check if brackets `()`, `{}`, `[]` in the input string are closed in the correct order.
- **Approach**: **Stack**.
  - Push opening brackets onto the stack.
  - For closing brackets, pop the top of the stack and verify it matches the current closing bracket.
  - At the end, the stack should be empty.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(n)$ — Stack capacity.
