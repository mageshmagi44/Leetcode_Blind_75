# Category 3: Linked Lists

This folder contains solutions and explanations for Linked List problems in the Blind 75 plan.

## Data Structure Definition
The standard definition of a singly-linked list node is:
```typescript
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
```

---

## Problem List & Summaries

### 1. Reverse Linked List (Easy)
- **Problem**: Reverse a singly linked list.
- **Approach**: **Iterative**.
  - Initialize `prev` as `null` and `curr` as `head`.
  - While `curr` is not null:
    - Save the next node: `nextTemp = curr.next`.
    - Reverse the link: `curr.next = prev`.
    - Move pointers: `prev = curr`, `curr = nextTemp`.
  - Return `prev`.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(1)$ — Constant pointers.

### 2. Merge Two Sorted Lists (Easy)
- **Problem**: Merge two sorted linked lists and return it as a sorted list.
- **Approach**: **Dummy Node**.
  - Create a dummy node as the start of the merged list. Keep a `curr` pointer to construct the list.
  - Compare nodes of both lists, appending the smaller one to `curr.next`, and moving that list's pointer forward.
  - After loop ends, append any remaining elements of either list.
- **Time Complexity**: $O(n + m)$ — Where $n$ and $m$ are lengths of the lists.
- **Space Complexity**: $O(1)$ — Merging in-place.

### 3. Reorder List (Medium)
- **Problem**: Given $L_0 \to L_1 \to \dots \to L_{n-1} \to L_n$, reorder it to $L_0 \to L_n \to L_1 \to L_{n-1} \to L_2 \to L_{n-2} \dots$.
- **Approach**: Three-step strategy.
  1. **Find Middle**: Use fast/slow pointers to split the list into two halves.
  2. **Reverse Second Half**: Reverse the second half of the list.
  3. **Merge Alternately**: Interleave nodes from the first half and the reversed second half.
- **Time Complexity**: $O(n)$ — Linear time operations.
- **Space Complexity**: $O(1)$ — In-place pointer manipulation.

### 4. Remove Nth Node From End of List (Medium)
- **Problem**: Remove the $n$-th node from the end of the list and return its head.
- **Approach**: **Two Pointers (Fast & Slow)** with a dummy node.
  - Create a dummy node pointing to head to handle edge cases (e.g., removing head).
  - Advance `fast` pointer by $n+1$ steps.
  - Advance `slow` and `fast` pointers together until `fast` reaches the end (`null`).
  - Now `slow.next` is the node to delete. Relink `slow.next = slow.next.next`.
- **Time Complexity**: $O(n)$ — Single pass.
- **Space Complexity**: $O(1)$ — In-place.

### 5. Cycle Detection (Linked List Cycle) (Easy)
- **Problem**: Determine if a linked list has a cycle.
- **Approach**: **Floyd's Cycle-Finding Algorithm (Tortoise and Hare)**.
  - Initialize `slow` and `fast` pointers at the head.
  - Move `slow` by 1 step and `fast` by 2 steps.
  - If they meet, a cycle exists. If `fast` or `fast.next` hits `null`, there is no cycle.
- **Time Complexity**: $O(n)$ — Linear.
- **Space Complexity**: $O(1)$ — Constant memory.
