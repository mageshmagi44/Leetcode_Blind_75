# Category 4: Trees & Binary Search

This folder contains solutions and explanations for Binary Tree and Binary Search Tree (BST) problems in the Blind 75 plan.

## Data Structure Definition
The standard definition of a binary tree node is:
```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}
```

---

## Problem List & Summaries

### 1. Invert Binary Tree (Easy)
- **Problem**: Invert a binary tree (mirror it).
- **Approach**: **DFS/Recursion**.
  - Base case: If root is `null`, return `null`.
  - Recursively invert the left and right subtrees.
  - Swap the left and right children: `root.left = invertTree(root.right)`, `root.right = invertTree(root.left)`.
- **Time Complexity**: $O(n)$ — Visiting each node once.
- **Space Complexity**: $O(h)$ — Recursive stack depth where $h$ is tree height (up to $O(n)$ in the worst case).

### 2. Maximum Depth of Binary Tree (Easy)
- **Problem**: Find the maximum depth (height) of a binary tree.
- **Approach**: **DFS/Recursion**.
  - Base case: If root is `null`, return 0.
  - Depth is $1 + \max(\text{maxDepth}(\text{left}), \text{maxDepth}(\text{right}))$.
- **Time Complexity**: $O(n)$ — Single traversal.
- **Space Complexity**: $O(h)$ — Recursion call stack.

### 3. Same Tree (Easy)
- **Problem**: Check if two binary trees are structurally identical and have the same values.
- **Approach**: **DFS/Recursion**.
  - If both nodes are `null`, they are the same (return `true`).
  - If only one is `null` or values differ, they are not same (return `false`).
  - Recursively check `isSameTree(p.left, q.left) && isSameTree(p.right, q.right)`.
- **Time Complexity**: $O(n)$ — Traverse all nodes.
- **Space Complexity**: $O(h)$ — Call stack.

### 4. Subtree of Another Tree (Easy)
- **Problem**: Check if tree `subRoot` is a subtree of `root`.
- **Approach**: **DFS/Recursion**.
  - A tree $S$ is a subtree of $T$ if:
    1. $S$ is identical to $T$ (use `isSameTree`), OR
    2. $S$ is a subtree of the left child of $T$, OR
    3. $S$ is a subtree of the right child of $T$.
  - Base case: if `root` is `null`, return `false` (an empty tree has no non-empty subtree).
- **Time Complexity**: $O(n \cdot m)$ — In the worst case, where $n$ and $m$ are number of nodes in both trees.
- **Space Complexity**: $O(h_{\text{root}})$ — Recursion stack depth.

### 5. Lowest Common Ancestor (Easy/Medium)
- **Problem**: Find the Lowest Common Ancestor (LCA) node of two given nodes in a BST.
- **Approach**: Use BST property (values to the left are smaller, values to the right are larger).
  - Start from `root`.
  - If both `p` and `q` are smaller than `root.val`, LCA must be in the left subtree. Move `root = root.left`.
  - If both `p` and `q` are larger than `root.val`, LCA must be in the right subtree. Move `root = root.right`.
  - Otherwise, the split point is the LCA. Return `root`.
- **Time Complexity**: $O(h)$ — Moving down one path from root to leaf.
- **Space Complexity**: $O(1)$ — Iterative approach uses no extra memory.

### 6. Binary Tree Level Order Traversal (Medium)
- **Problem**: Return the level order traversal of its nodes' values (BFS, layer by layer).
- **Approach**: **Queue (BFS)**.
  - Initialize a queue with `root`.
  - While queue is not empty, get the number of elements at the current level (`levelSize`).
  - Process all `levelSize` nodes: pop, add value to the level list, and push children to queue.
- **Time Complexity**: $O(n)$ — Visiting each node.
- **Space Complexity**: $O(n)$ — Maximum queue size (which is the width of the tree, up to $O(n/2)$ nodes at the bottom level).

### 7. Serialize and Deserialize Binary Tree (Hard)
- **Problem**: Design an algorithm to serialize a binary tree to a string and deserialize it back.
- **Approach**: **DFS Preorder Traversal**.
  - **Serialize**: Traverse preorder. Append node value followed by a delimiter (e.g., `,`). If node is `null`, append a special symbol (e.g., `N`).
  - **Deserialize**: Split string by delimiter into a list/queue of tokens. Recursively build the tree by pulling the next token. If token is `N`, return `null`.
- **Time Complexity**: $O(n)$ — Linear time for serialization and deserialization.
- **Space Complexity**: $O(n)$ — To store the serialized string and call stack during deserialization.

### 8. Binary Search Tree (validate BST) (Medium)
- **Problem**: Determine if a binary tree is a valid Binary Search Tree (BST).
- **Approach**: **Recursion with Boundaries**.
  - A node is valid if its value lies within a range `[min, max]`.
  - For the root, range is `[-Infinity, Infinity]`.
  - For left child, range becomes `[min, root.val - 1]` (or strictly `< root.val`).
  - For right child, range becomes `[root.val + 1, max]` (or strictly `> root.val`).
- **Time Complexity**: $O(n)$ — Traverse each node once.
- **Space Complexity**: $O(h)$ — Call stack depth.
