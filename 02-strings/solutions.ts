/**
 * Blind 75 - Category 2: Strings
 */

/**
 * 1. Longest Substring Without Repeating Characters (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, m)) where m is alphabet size
 */
export function lengthOfLongestSubstring(s: string): number {
    const map = new Map<string, number>();
    let maxLen = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (map.has(char)) {
            // Move left pointer to skip the duplicate character,
            // but ensure we do not move left backward
            left = Math.max(left, map.get(char)! + 1);
        }
        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

/**
 * 2. Longest Repeating Character Replacement (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(m) where m is number of unique characters (usually O(1) for alphabet)
 */
export function characterReplacement(s: string, k: number): number {
    const freqMap = new Map<string, number>();
    let left = 0;
    let maxFreq = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
        maxFreq = Math.max(maxFreq, freqMap.get(char)!);

        // If the number of replacements needed is greater than k, shrink the window
        while ((right - left + 1) - maxFreq > k) {
            const leftChar = s[left];
            freqMap.set(leftChar, freqMap.get(leftChar)! - 1);
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

/**
 * 3. Minimum Window Substring (Hard)
 * Time Complexity: O(|S| + |T|)
 * Space Complexity: O(|S| + |T|)
 */
export function minWindow(s: string, t: string): string {
    if (t.length === 0 || s.length === 0) {
        return "";
    }

    // Map to keep track of character frequencies in t
    const dictT = new Map<string, number>();
    for (const char of t) {
        dictT.set(char, (dictT.get(char) || 0) + 1);
    }

    const required = dictT.size;
    let left = 0;
    let right = 0;
    let formed = 0; // Number of unique characters in s that match target frequency in t

    const windowCounts = new Map<string, number>();
    // Array to store window size, left index, and right index of the minimum window
    let ans = [-1, 0, 0];

    while (right < s.length) {
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

        if (dictT.has(char) && windowCounts.get(char) === dictT.get(char)) {
            formed++;
        }

        // Try to contract the window till the point it ceases to be 'desirable'
        while (left <= right && formed === required) {
            const leftChar = s[left];

            // Update the minimum window answer
            if (ans[0] === -1 || right - left + 1 < ans[0]) {
                ans = [right - left + 1, left, right];
            }

            // The character at the position pointed by the `left` pointer is no longer a part of the window
            windowCounts.set(leftChar, windowCounts.get(leftChar)! - 1);
            if (dictT.has(leftChar) && windowCounts.get(leftChar)! < dictT.get(leftChar)!) {
                formed--;
            }

            left++;
        }

        right++;
    }

    return ans[0] === -1 ? "" : s.substring(ans[1], ans[2] + 1);
}

/**
 * 4. Valid Anagram (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(1) (since map has at most 26 unique lowercase letters)
 */
export function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false;
    }

    const counts = new Map<string, number>();

    for (let i = 0; i < s.length; i++) {
        counts.set(s[i], (counts.get(s[i]) || 0) + 1);
        counts.set(t[i], (counts.get(t[i]) || 0) - 1);
    }

    for (const count of counts.values()) {
        if (count !== 0) {
            return false;
        }
    }

    return true;
}

/**
 * 5. Group Anagrams (Medium)
 * Time Complexity: O(n * k * log k) where k is the maximum length of a string
 * Space Complexity: O(n * k)
 */
export function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();

    for (const str of strs) {
        const sorted = str.split("").sort().join("");
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted)!.push(str);
    }

    return Array.from(map.values());
}

/**
 * 6. Valid Parentheses (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function isValid(s: string): boolean {
    const stack: string[] = [];
    const pairs: Record<string, string> = {
        ")": "(",
        "}": "{",
        "]": "["
    };

    for (const char of s) {
        if (char in pairs) {
            const top = stack.pop();
            if (top !== pairs[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }

    return stack.length === 0;
}
