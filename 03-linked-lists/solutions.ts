/**
 * Blind 75 - Category 3: Linked Lists
 */

/**
 * Definition for singly-linked list.
 */
export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * 1. Reverse Linked List (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;

    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    return prev;
}

/**
 * 2. Merge Two Sorted Lists (Easy)
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }

    // Append the remaining nodes of list1 or list2
    curr.next = list1 !== null ? list1 : list2;

    return dummy.next;
}

/**
 * 3. Reorder List (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function reorderList(head: ListNode | null): void {
    if (!head || !head.next) {
        return;
    }

    // 1. Find the middle of the list using slow and fast pointers
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast.next && fast.next.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    // slow.next is the start of the second half
    let second = slow!.next;
    slow!.next = null; // Split the list into two halves

    // 2. Reverse the second half
    let prev: ListNode | null = null;
    let curr = second;
    while (curr) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    second = prev;

    // 3. Merge the two halves alternately
    let first: ListNode | null = head;
    while (first && second) {
        const temp1: any = first.next;
        const temp2 = second.next;

        first.next = second;
        second.next = temp1;

        first = temp1;
        second = temp2;
    }
}

/**
 * 4. Remove Nth Node From End of List (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;

    let first: ListNode | null = dummy;
    let second: ListNode | null = dummy;

    // Move first pointer so that the gap between first and second is n + 1 nodes
    for (let i = 1; i <= n + 1; i++) {
        if (first === null) {
            return head;
        }
        first = first.next;
    }

    // Move first to the end, maintaining the gap
    while (first !== null) {
        first = first.next;
        second = second!.next;
    }

    // Delete the nth node
    second!.next = second!.next!.next;

    return dummy.next;
}

/**
 * 5. Cycle Detection (Linked List Cycle) (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function hasCycle(head: ListNode | null): boolean {
    if (head === null || head.next === null) {
        return false;
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }

    return false;
}
