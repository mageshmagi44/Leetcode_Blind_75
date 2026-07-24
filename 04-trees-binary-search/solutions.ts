/**
 * Blind 75 - Category 4: Trees & Binary Search
 */

/**
 * Definition for a binary tree node.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

/**
 * 1. Invert Binary Tree (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is tree height
 */
export function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }

    const left = invertTree(root.left);
    const right = invertTree(root.right);

    root.left = right;
    root.right = left;

    return root;
}

/**
 * 2. Maximum Depth of Binary Tree (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
export function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

/**
 * 3. Same Tree (Easy)
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) {
        return true;
    }
    if (p === null || q === null) {
        return false;
    }
    if (p.val !== q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

/**
 * 4. Subtree of Another Tree (Easy)
 * Time Complexity: O(n * m) where n is nodes in root, m is nodes in subRoot
 * Space Complexity: O(h_root)
 */
export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (root === null) {
        return false;
    }
    if (isSameTree(root, subRoot)) {
        return true;
    }
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

/**
 * 5. Lowest Common Ancestor of a Binary Search Tree (Easy/Medium)
 * Time Complexity: O(h) where h is tree height
 * Space Complexity: O(1) (iterative approach)
 */
export function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
): TreeNode | null {
    if (root === null || p === null || q === null) {
        return null;
    }

    let curr: TreeNode | null = root;

    while (curr !== null) {
        if (p.val < curr.val && q.val < curr.val) {
            // Both p and q are in the left subtree
            curr = curr.left;
        } else if (p.val > curr.val && q.val > curr.val) {
            // Both p and q are in the right subtree
            curr = curr.right;
        } else {
            // We found the split point, which is the LCA
            return curr;
        }
    }

    return null;
}

/**
 * 6. Binary Tree Level Order Traversal (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (root === null) {
        return result;
    }

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);

            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * 7. Serialize and Deserialize Binary Tree (Hard)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function serialize(root: TreeNode | null): string {
    const output: string[] = [];

    function serializeHelper(node: TreeNode | null): void {
        if (node === null) {
            output.push("N");
        } else {
            output.push(node.val.toString());
            serializeHelper(node.left);
            serializeHelper(node.right);
        }
    }

    serializeHelper(root);
    return output.join(",");
}

export function deserialize(data: string): TreeNode | null {
    const tokens = data.split(",");
    let index = 0;

    function deserializeHelper(): TreeNode | null {
        if (index >= tokens.length) {
            return null;
        }
        const valStr = tokens[index++];
        if (valStr === "N") {
            return null;
        }

        const node = new TreeNode(parseInt(valStr, 10));
        node.left = deserializeHelper();
        node.right = deserializeHelper();

        return node;
    }

    return deserializeHelper();
}

/**
 * 8. Validate Binary Search Tree (Medium)
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
export function isValidBST(root: TreeNode | null): boolean {
    function validate(node: TreeNode | null, low: number, high: number): boolean {
        if (node === null) {
            return true;
        }

        if (node.val <= low || node.val >= high) {
            return false;
        }

        return (
            validate(node.left, low, node.val) &&
            validate(node.right, node.val, high)
        );
    }

    return validate(root, -Infinity, Infinity);
}
