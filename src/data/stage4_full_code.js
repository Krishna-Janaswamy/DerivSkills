import { AUTO_GENERATED_PROBLEMS } from './auto_generated_problems';

const withJs = (key, javascript) => ({
  ...(AUTO_GENERATED_PROBLEMS[key] || {}),
  javascript,
});

export const STAGE4_FULL_CODE = {
  'Concepts: Height': withJs(
    'Concepts: Height',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function height(root) {
  if (!root) return 0;
  return 1 + Math.max(height(root.left), height(root.right));
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(height(root));`
  ),
  Depth: withJs(
    'Depth',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function depth(root, target, current = 0) {
  if (!root) return -1;
  if (root.val === target) return current;

  const left = depth(root.left, target, current + 1);
  if (left !== -1) return left;
  return depth(root.right, target, current + 1);
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(depth(root, 5));`
  ),
  Level: withJs(
    'Level',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }

  return result;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(levelOrder(root));`
  ),
  Diameter: withJs(
    'Diameter',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function diameterOfBinaryTree(root) {
  let diameter = 0;

  function dfs(node) {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }

  dfs(root);
  return diameter;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(diameterOfBinaryTree(root));`
  ),
  'Types: Full': withJs(
    'Types: Full',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isFullBinaryTree(root) {
  if (!root) return true;
  if (!root.left && !root.right) return true;
  if (root.left && root.right) {
    return isFullBinaryTree(root.left) && isFullBinaryTree(root.right);
  }
  return false;
}

const fullTree = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7))
);

console.log(isFullBinaryTree(fullTree));`
  ),
  Complete: withJs(
    'Complete',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isCompleteBinaryTree(root) {
  const queue = [root];
  let seenNull = false;

  while (queue.length) {
    const node = queue.shift();
    if (!node) {
      seenNull = true;
      continue;
    }
    if (seenNull) return false;
    queue.push(node.left);
    queue.push(node.right);
  }

  return true;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), null)
);

console.log(isCompleteBinaryTree(root));`
  ),
  Perfect: withJs(
    'Perfect',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function leftDepth(node) {
  let depth = 0;
  while (node) {
    depth++;
    node = node.left;
  }
  return depth;
}

function isPerfect(root, depth = leftDepth(root), level = 1) {
  if (!root) return true;
  if (!root.left && !root.right) return depth === level;
  if (!root.left || !root.right) return false;
  return isPerfect(root.left, depth, level + 1) && isPerfect(root.right, depth, level + 1);
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7))
);

console.log(isPerfect(root));`
  ),
  Balanced: withJs(
    'Balanced',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isBalanced(root) {
  function dfs(node) {
    if (!node) return 0;
    const left = dfs(node.left);
    if (left === -1) return -1;
    const right = dfs(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  }

  return dfs(root) !== -1;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), null),
  new TreeNode(3)
);

console.log(isBalanced(root));`
  ),
  'Traversals: Inorder (L-Root-R)': withJs(
    'Traversals: Inorder (L-Root-R)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7))
);

console.log(inorder(root));`
  ),
  'Preorder (Root-L-R)': withJs(
    'Preorder (Root-L-R)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(preorder(root));`
  ),
  'Postorder (L-R-Root)': withJs(
    'Postorder (L-R-Root)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(postorder(root));`
  ),
  'Level Order (BFS)': withJs(
    'Level Order (BFS)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }

  return result;
}

const root = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(levelOrder(root));`
  ),
  '05. Height': withJs(
    '05. Height',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

const root = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(maxDepth(root));`
  ),
  '06. count nodes': withJs(
    '06. count nodes',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(countNodes(root));`
  ),
  '07. leaves': withJs(
    '07. leaves',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function countLeaves(root) {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return countLeaves(root.left) + countLeaves(root.right);
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(countLeaves(root));`
  ),
  '08. sum': withJs(
    '08. sum',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function treeSum(root) {
  if (!root) return 0;
  return root.val + treeSum(root.left) + treeSum(root.right);
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(treeSum(root));`
  ),
  '09. Identical': withJs(
    '09. Identical',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isSameTree(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.val === b.val && isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}

const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const tree2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));

console.log(isSameTree(tree1, tree2));`
  ),
  '10. mirror': withJs(
    '10. mirror',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(7, new TreeNode(6), new TreeNode(9))
);

console.log(JSON.stringify(invertTree(root)));`
  ),
  '11. symmetric': withJs(
    '11. symmetric',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isSymmetric(root) {
  function mirror(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
  }

  return mirror(root.left, root.right);
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(3), new TreeNode(4)),
  new TreeNode(2, new TreeNode(4), new TreeNode(3))
);

console.log(isSymmetric(root));`
  ),
  '12. Views (Left': withJs(
    '12. Views (Left',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function leftView(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === 0) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), null),
  new TreeNode(3, new TreeNode(5), new TreeNode(6))
);

console.log(leftView(root));`
  ),
  '13. Right': withJs(
    '13. Right',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function rightView(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), null),
  new TreeNode(3, new TreeNode(5), new TreeNode(6))
);

console.log(rightView(root));`
  ),
  '14. Top': withJs(
    '14. Top',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function topView(root) {
  if (!root) return [];
  const map = new Map();
  const queue = [[root, 0]];

  while (queue.length) {
    const [node, hd] = queue.shift();
    if (!map.has(hd)) map.set(hd, node.val);
    if (node.left) queue.push([node.left, hd - 1]);
    if (node.right) queue.push([node.right, hd + 1]);
  }

  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([, value]) => value);
}

const root = new TreeNode(1,
  new TreeNode(2, null, new TreeNode(4)),
  new TreeNode(3, new TreeNode(5), null)
);

console.log(topView(root));`
  ),
  '15. Bottom)': withJs(
    '15. Bottom)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function bottomView(root) {
  if (!root) return [];
  const map = new Map();
  const queue = [[root, 0]];

  while (queue.length) {
    const [node, hd] = queue.shift();
    map.set(hd, node.val);
    if (node.left) queue.push([node.left, hd - 1]);
    if (node.right) queue.push([node.right, hd + 1]);
  }

  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([, value]) => value);
}

const root = new TreeNode(1,
  new TreeNode(2, null, new TreeNode(4)),
  new TreeNode(3, new TreeNode(5), null)
);

console.log(bottomView(root));`
  ),
  '16. Vertical': withJs(
    '16. Vertical',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function verticalTraversal(root) {
  const map = new Map();
  const queue = [[root, 0]];

  while (queue.length) {
    const [node, col] = queue.shift();
    if (!node) continue;
    if (!map.has(col)) map.set(col, []);
    map.get(col).push(node.val);
    queue.push([node.left, col - 1]);
    queue.push([node.right, col + 1]);
  }

  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([, values]) => values);
}

const root = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(verticalTraversal(root));`
  ),
  '17. Zigzag': withJs(
    '17. Zigzag',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function zigzagLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (leftToRight) level.push(node.val);
      else level.unshift(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
}

const root = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(zigzagLevelOrder(root));`
  ),
  '18. Boundary': withJs(
    '18. Boundary',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function boundaryTraversal(root) {
  if (!root) return [];
  const result = [root.val];

  function isLeaf(node) {
    return node && !node.left && !node.right;
  }

  function addLeft(node) {
    while (node) {
      if (!isLeaf(node)) result.push(node.val);
      node = node.left || node.right;
    }
  }

  function addLeaves(node) {
    if (!node) return;
    if (isLeaf(node)) {
      result.push(node.val);
      return;
    }
    addLeaves(node.left);
    addLeaves(node.right);
  }

  function addRight(node) {
    const stack = [];
    while (node) {
      if (!isLeaf(node)) stack.push(node.val);
      node = node.right || node.left;
    }
    while (stack.length) result.push(stack.pop());
  }

  addLeft(root.left);
  addLeaves(root.left);
  addLeaves(root.right);
  addRight(root.right);
  return result;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6))
);

console.log(boundaryTraversal(root));`
  ),
  '19. Diameter': withJs(
    '19. Diameter',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function diameter(root) {
  let best = 0;

  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  }

  depth(root);
  return best;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(diameter(root));`
  ),
  '20. Balanced': withJs(
    '20. Balanced',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isBalanced(root) {
  function check(node) {
    if (!node) return 0;
    const left = check(node.left);
    if (left === -1) return -1;
    const right = check(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  }

  return check(root) !== -1;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
  new TreeNode(5)
);

console.log(isBalanced(root));`
  ),
  '21. LCA': withJs(
    '21. LCA',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function lowestCommonAncestor(root, p, q) {
  if (!root || root.val === p || root.val === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}

const root = new TreeNode(3,
  new TreeNode(5, new TreeNode(6), new TreeNode(2)),
  new TreeNode(1, new TreeNode(0), new TreeNode(8))
);

console.log(lowestCommonAncestor(root, 5, 1).val);`
  ),
  '22. Distance': withJs(
    '22. Distance',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function findDistance(root, a, b) {
  function lca(node) {
    if (!node || node.val === a || node.val === b) return node;
    const left = lca(node.left);
    const right = lca(node.right);
    if (left && right) return node;
    return left || right;
  }

  function distanceFrom(node, target) {
    if (!node) return -1;
    if (node.val === target) return 0;
    const left = distanceFrom(node.left, target);
    if (left !== -1) return left + 1;
    const right = distanceFrom(node.right, target);
    return right !== -1 ? right + 1 : -1;
  }

  const ancestor = lca(root);
  return distanceFrom(ancestor, a) + distanceFrom(ancestor, b);
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log(findDistance(root, 4, 5));`
  ),
  '23. Paths': withJs(
    '23. Paths',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function binaryTreePaths(root) {
  const result = [];

  function dfs(node, path) {
    if (!node) return;
    path.push(node.val);
    if (!node.left && !node.right) {
      result.push(path.join('->'));
    } else {
      dfs(node.left, path);
      dfs(node.right, path);
    }
    path.pop();
  }

  dfs(root, []);
  return result;
}

const root = new TreeNode(1,
  new TreeNode(2, null, new TreeNode(5)),
  new TreeNode(3)
);

console.log(binaryTreePaths(root));`
  ),
  '24. Path sums': withJs(
    '24. Path sums',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return targetSum === root.val;
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}

const root = new TreeNode(5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
  new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
);

console.log(hasPathSum(root, 22));`
  ),
  '25. Max path sum': withJs(
    '25. Max path sum',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxPathSum(root) {
  let best = -Infinity;

  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  }

  dfs(root);
  return best;
}

const root = new TreeNode(-10,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(maxPathSum(root));`
  ),
  '27. Flatten': withJs(
    '27. Flatten',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function flatten(root) {
  function dfs(node) {
    if (!node) return null;
    const leftTail = dfs(node.left);
    const rightTail = dfs(node.right);

    if (leftTail) {
      leftTail.right = node.right;
      node.right = node.left;
      node.left = null;
    }

    return rightTail || leftTail || node;
  }

  dfs(root);
  return root;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(3), new TreeNode(4)),
  new TreeNode(5, null, new TreeNode(6))
);

let node = flatten(root);
const values = [];
while (node) {
  values.push(node.val);
  node = node.right;
}
console.log(values);`
  ),
  '28. Serialize': withJs(
    '28. Serialize',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  const values = [];

  function dfs(node) {
    if (!node) {
      values.push('#');
      return;
    }
    values.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return values.join(',');
}

function deserialize(data) {
  const values = data.split(',');
  let index = 0;

  function dfs() {
    const value = values[index++];
    if (value === '#') return null;
    const node = new TreeNode(Number(value));
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}

const root = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)));
const text = serialize(root);
console.log(text);
console.log(deserialize(text).right.left.val);`
  ),
  '29. Construct from orders': withJs(
    '29. Construct from orders',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(preorder, inorder) {
  const indexMap = new Map();
  inorder.forEach((value, index) => indexMap.set(value, index));
  let preIndex = 0;

  function dfs(left, right) {
    if (left > right) return null;
    const rootVal = preorder[preIndex++];
    const root = new TreeNode(rootVal);
    const mid = indexMap.get(rootVal);
    root.left = dfs(left, mid - 1);
    root.right = dfs(mid + 1, right);
    return root;
  }

  return dfs(0, inorder.length - 1);
}

const root = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log(root.right.left.val);`
  ),
  'Property: Left < Node < Right': withJs(
    'Property: Left < Node < Right',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  return isBST(node.left, min, node.val) && isBST(node.right, node.val, max);
}

const root = new TreeNode(8,
  new TreeNode(3, new TreeNode(1), new TreeNode(6)),
  new TreeNode(10, null, new TreeNode(14))
);

console.log(isBST(root));`
  ),
  'Inorder is sorted': withJs(
    'Inorder is sorted',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

const root = new TreeNode(8,
  new TreeNode(3, new TreeNode(1), new TreeNode(6)),
  new TreeNode(10, null, new TreeNode(14))
);

console.log(inorder(root));`
  ),
  'Search/Insert/Delete O(h)': withJs(
    'Search/Insert/Delete O(h)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function insert(root, value) {
  if (!root) return new TreeNode(value);
  if (value < root.val) root.left = insert(root.left, value);
  else if (value > root.val) root.right = insert(root.right, value);
  return root;
}

function search(root, value) {
  if (!root || root.val === value) return root;
  return value < root.val ? search(root.left, value) : search(root.right, value);
}

function minNode(node) {
  while (node.left) node = node.left;
  return node;
}

function remove(root, value) {
  if (!root) return null;
  if (value < root.val) root.left = remove(root.left, value);
  else if (value > root.val) root.right = remove(root.right, value);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const successor = minNode(root.right);
    root.val = successor.val;
    root.right = remove(root.right, successor.val);
  }
  return root;
}

let root = null;
for (const value of [8, 3, 10, 1, 6, 14]) root = insert(root, value);
console.log(search(root, 6).val);
root = remove(root, 3);
console.log(root.left.val);`
  ),
  'Balanced O(log n)': withJs(
    'Balanced O(log n)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function insert(root, value) {
  if (!root) return new TreeNode(value);
  if (value < root.val) root.left = insert(root.left, value);
  else root.right = insert(root.right, value);
  return root;
}

function height(node) {
  if (!node) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}

let root = null;
for (const value of [4, 2, 6, 1, 3, 5, 7]) root = insert(root, value);
console.log('height:', height(root), 'nodes:', 7, 'search ~ O(log n) when balanced');`
  ),
  'Skewed O(n)': withJs(
    'Skewed O(n)',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function insert(root, value) {
  if (!root) return new TreeNode(value);
  if (value < root.val) root.left = insert(root.left, value);
  else root.right = insert(root.right, value);
  return root;
}

function height(node) {
  if (!node) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}

let root = null;
for (const value of [1, 2, 3, 4, 5]) root = insert(root, value);
console.log('height:', height(root), 'search degrades toward O(n)');`
  ),
  '02. Insert': withJs(
    '02. Insert',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function insertIntoBST(root, value) {
  if (!root) return new TreeNode(value);
  if (value < root.val) root.left = insertIntoBST(root.left, value);
  else root.right = insertIntoBST(root.right, value);
  return root;
}

let root = new TreeNode(4, new TreeNode(2), new TreeNode(7));
root = insertIntoBST(root, 5);
console.log(root.right.left.val);`
  ),
  '03. Delete': withJs(
    '03. Delete',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function minNode(node) {
  while (node.left) node = node.left;
  return node;
}

function deleteNode(root, key) {
  if (!root) return null;
  if (key < root.val) root.left = deleteNode(root.left, key);
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const successor = minNode(root.right);
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
}

const root = new TreeNode(5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(6, null, new TreeNode(7))
);

console.log(deleteNode(root, 3).left.val);`
  ),
  '04. Min/Max': withJs(
    '04. Min/Max',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function findMin(root) {
  while (root.left) root = root.left;
  return root.val;
}

function findMax(root) {
  while (root.right) root = root.right;
  return root.val;
}

const root = new TreeNode(8,
  new TreeNode(3, new TreeNode(1), new TreeNode(6)),
  new TreeNode(10, null, new TreeNode(14))
);

console.log({ min: findMin(root), max: findMax(root) });`
  ),
  '05. Floor/Ceil': withJs(
    '05. Floor/Ceil',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function floorAndCeil(root, key) {
  let floor = null;
  let ceil = null;

  while (root) {
    if (root.val === key) return { floor: key, ceil: key };
    if (key < root.val) {
      ceil = root.val;
      root = root.left;
    } else {
      floor = root.val;
      root = root.right;
    }
  }

  return { floor, ceil };
}

const root = new TreeNode(8,
  new TreeNode(4, new TreeNode(2), new TreeNode(6)),
  new TreeNode(12, new TreeNode(10), new TreeNode(14))
);

console.log(floorAndCeil(root, 11));`
  ),
  '06. Kth smallest/largest': withJs(
    '06. Kth smallest/largest',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

const root = new TreeNode(5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(7, new TreeNode(6), new TreeNode(8))
);

const values = inorder(root);
const k = 3;
console.log({
  kthSmallest: values[k - 1],
  kthLargest: values[values.length - k],
});`
  ),
  '07. Validate': withJs(
    '07. Validate',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

const root = new TreeNode(5,
  new TreeNode(1),
  new TreeNode(4, new TreeNode(3), new TreeNode(6))
);

console.log(isValidBST(root));`
  ),
  '08. LCA': withJs(
    '08. LCA',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p < root.val && q < root.val) root = root.left;
    else if (p > root.val && q > root.val) root = root.right;
    else return root;
  }
}

const root = new TreeNode(6,
  new TreeNode(2, new TreeNode(0), new TreeNode(4)),
  new TreeNode(8, new TreeNode(7), new TreeNode(9))
);

console.log(lowestCommonAncestor(root, 2, 8).val);`
  ),
  '09. Array to BST': withJs(
    '09. Array to BST',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function sortedArrayToBST(nums) {
  function build(left, right) {
    if (left > right) return null;
    const mid = left + Math.floor((right - left) / 2);
    return new TreeNode(
      nums[mid],
      build(left, mid - 1),
      build(mid + 1, right)
    );
  }

  return build(0, nums.length - 1);
}

const root = sortedArrayToBST([-10, -3, 0, 5, 9]);
console.log(root.val);`
  ),
  '11. Greater Sum Tree': withJs(
    '11. Greater Sum Tree',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function bstToGst(root) {
  let sum = 0;

  function reverseInorder(node) {
    if (!node) return;
    reverseInorder(node.right);
    sum += node.val;
    node.val = sum;
    reverseInorder(node.left);
  }

  reverseInorder(root);
  return root;
}

const root = new TreeNode(4,
  new TreeNode(1),
  new TreeNode(6)
);

console.log(bstToGst(root).val);`
  ),
  '12. Two sum': withJs(
    '12. Two sum',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function findTarget(root, k) {
  const seen = new Set();

  function dfs(node) {
    if (!node) return false;
    if (seen.has(k - node.val)) return true;
    seen.add(node.val);
    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
}

const root = new TreeNode(5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(6, null, new TreeNode(7))
);

console.log(findTarget(root, 9));`
  ),
  '13. Successor': withJs(
    '13. Successor',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderSuccessor(root, target) {
  let successor = null;

  while (root) {
    if (target < root.val) {
      successor = root;
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return successor;
}

const root = new TreeNode(5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(6, null, new TreeNode(7))
);

console.log(inorderSuccessor(root, 4).val);`
  ),
  '14. Merge': withJs(
    '14. Merge',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

function mergeBSTs(a, b) {
  const first = inorder(a);
  const second = inorder(b);
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < first.length && j < second.length) {
    if (first[i] <= second[j]) merged.push(first[i++]);
    else merged.push(second[j++]);
  }

  return merged.concat(first.slice(i), second.slice(j));
}

const a = new TreeNode(2, new TreeNode(1), new TreeNode(4));
const b = new TreeNode(1, new TreeNode(0), new TreeNode(3));
console.log(mergeBSTs(a, b));`
  ),
  '15. Recover': withJs(
    '15. Recover',
    `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function recoverTree(root) {
  let first = null;
  let second = null;
  let prev = null;

  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (prev && prev.val > node.val) {
      if (!first) first = prev;
      second = node;
    }
    prev = node;
    inorder(node.right);
  }

  inorder(root);
  [first.val, second.val] = [second.val, first.val];
}

const root = new TreeNode(3, new TreeNode(1), new TreeNode(4, new TreeNode(2), null));
recoverTree(root);
console.log(root.val, root.right.left.val);`
  ),
  'Complete binary tree array rep (Parent (i-1)/2, Left 2i+1, Right 2i+2)': withJs(
    'Complete binary tree array rep (Parent (i-1)/2, Left 2i+1, Right 2i+2)',
    `const heap = [50, 30, 40, 10, 20, 35, 37];

function parent(i) {
  return Math.floor((i - 1) / 2);
}

function left(i) {
  return 2 * i + 1;
}

function right(i) {
  return 2 * i + 2;
}

const index = 1;
console.log({
  value: heap[index],
  parent: heap[parent(index)],
  leftChild: heap[left(index)],
  rightChild: heap[right(index)],
});`
  ),
  'Max Heap vs Min Heap': withJs(
    'Max Heap vs Min Heap',
    `class Heap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  push(value) {
    this.data.push(value);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.data[p], this.data[i])) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
}

const maxHeap = new Heap((parent, child) => parent >= child);
const minHeap = new Heap((parent, child) => parent <= child);

for (const value of [5, 3, 8, 1, 6]) {
  maxHeap.push(value);
  minHeap.push(value);
}

console.log({ maxRoot: maxHeap.data[0], minRoot: minHeap.data[0] });`
  ),
  'Build O(n)': withJs(
    'Build O(n)',
    `function heapify(arr, size, index) {
  let largest = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  if (left < size && arr[left] > arr[largest]) largest = left;
  if (right < size && arr[right] > arr[largest]) largest = right;

  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]];
    heapify(arr, size, largest);
  }
}

function buildMaxHeap(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i);
  }
  return arr;
}

console.log(buildMaxHeap([3, 9, 2, 1, 4, 5]));`
  ),
  'Insert/Poll O(log n)': withJs(
    'Insert/Poll O(log n)',
    `class MinHeap {
  constructor() {
    this.data = [];
  }

  insert(value) {
    this.data.push(value);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  poll() {
    if (this.data.length === 1) return this.data.pop();
    const min = this.data[0];
    this.data[0] = this.data.pop();
    let i = 0;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < this.data.length && this.data[left] < this.data[smallest]) smallest = left;
      if (right < this.data.length && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
    return min;
  }
}

const heap = new MinHeap();
for (const value of [7, 3, 10, 1]) heap.insert(value);
console.log(heap.poll(), heap.poll());`
  ),
  '03. Sort/Merge K sorted': withJs(
    '03. Sort/Merge K sorted',
    `class MinHeap {
  constructor() {
    this.data = [];
  }

  push(item) {
    this.data.push(item);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p].value <= this.data[i].value) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  pop() {
    if (this.data.length === 1) return this.data.pop();
    const min = this.data[0];
    this.data[0] = this.data.pop();
    let i = 0;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < this.data.length && this.data[left].value < this.data[smallest].value) smallest = left;
      if (right < this.data.length && this.data[right].value < this.data[smallest].value) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
    return min;
  }

  size() {
    return this.data.length;
  }
}

function mergeKSorted(lists) {
  const heap = new MinHeap();
  const result = [];

  lists.forEach((list, listIndex) => {
    if (list.length) heap.push({ value: list[0], listIndex, elementIndex: 0 });
  });

  while (heap.size()) {
    const { value, listIndex, elementIndex } = heap.pop();
    result.push(value);
    const nextIndex = elementIndex + 1;
    if (nextIndex < lists[listIndex].length) {
      heap.push({ value: lists[listIndex][nextIndex], listIndex, elementIndex: nextIndex });
    }
  }

  return result;
}

console.log(mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]]));`
  ),
  '06. Top K frequent': withJs(
    '06. Top K frequent',
    `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));`
  ),
  '07. K closest points': withJs(
    '07. K closest points',
    `function kClosest(points, k) {
  return points
    .sort((a, b) => (a[0] ** 2 + a[1] ** 2) - (b[0] ** 2 + b[1] ** 2))
    .slice(0, k);
}

console.log(kClosest([[1, 3], [-2, 2], [5, 8]], 2));`
  ),
  '08. Median stream': withJs(
    '08. Median stream',
    `class MedianFinder {
  constructor() {
    this.values = [];
  }

  addNum(num) {
    this.values.push(num);
    this.values.sort((a, b) => a - b);
  }

  findMedian() {
    const n = this.values.length;
    const mid = Math.floor(n / 2);
    return n % 2 === 1 ? this.values[mid] : (this.values[mid - 1] + this.values[mid]) / 2;
  }
}

const stream = new MedianFinder();
stream.addNum(1);
stream.addNum(2);
console.log(stream.findMedian());
stream.addNum(3);
console.log(stream.findMedian());`
  ),
  '09. Sliding window max': withJs(
    '09. Sliding window max',
    `function maxSlidingWindow(nums, k) {
  const deque = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }

  return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));`
  ),
  '10. Task scheduler': withJs(
    '10. Task scheduler',
    `function leastInterval(tasks, n) {
  const counts = new Map();
  for (const task of tasks) counts.set(task, (counts.get(task) || 0) + 1);
  const frequencies = [...counts.values()].sort((a, b) => b - a);
  const maxFreq = frequencies[0];
  const sameMax = frequencies.filter(value => value === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + sameMax);
}

console.log(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2));`
  ),
  '11. Connect ropes': withJs(
    '11. Connect ropes',
    `function connectRopes(ropes) {
  ropes.sort((a, b) => a - b);
  let cost = 0;

  while (ropes.length > 1) {
    const first = ropes.shift();
    const second = ropes.shift();
    const merged = first + second;
    cost += merged;
    ropes.push(merged);
    ropes.sort((a, b) => a - b);
  }

  return cost;
}

console.log(connectRopes([4, 3, 2, 6]));`
  ),
  '12. Max sum combos': withJs(
    '12. Max sum combos',
    `function maxSumCombinations(a, b, k) {
  const sums = [];
  for (const x of a) {
    for (const y of b) sums.push(x + y);
  }
  return sums.sort((x, y) => y - x).slice(0, k);
}

console.log(maxSumCombinations([3, 2], [1, 4], 3));`
  ),
  '13. Reorganize string': withJs(
    '13. Reorganize string',
    `function reorganizeString(s) {
  const freq = new Map();
  for (const char of s) freq.set(char, (freq.get(char) || 0) + 1);
  const arr = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  let result = Array(s.length).fill('');
  let index = 0;

  for (const [char, count] of arr) {
    let remaining = count;
    while (remaining > 0) {
      if (index >= s.length) index = 1;
      result[index] = char;
      index += 2;
      remaining--;
    }
  }

  return result.join('');
}

console.log(reorganizeString('aab'));`
  ),
  '14. IPO': withJs(
    '14. IPO',
    `function findMaximizedCapital(k, w, profits, capital) {
  const projects = profits.map((profit, index) => ({ profit, capital: capital[index] }));

  for (let round = 0; round < k; round++) {
    let bestIndex = -1;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].capital <= w && (bestIndex === -1 || projects[i].profit > projects[bestIndex].profit)) {
        bestIndex = i;
      }
    }

    if (bestIndex === -1) break;
    w += projects[bestIndex].profit;
    projects.splice(bestIndex, 1);
  }

  return w;
}

console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]));`
  ),
  '15. Ugly number': withJs(
    '15. Ugly number',
    `function nthUglyNumber(n) {
  const ugly = [1];
  let i2 = 0;
  let i3 = 0;
  let i5 = 0;

  while (ugly.length < n) {
    const next2 = ugly[i2] * 2;
    const next3 = ugly[i3] * 3;
    const next5 = ugly[i5] * 5;
    const next = Math.min(next2, next3, next5);

    ugly.push(next);
    if (next === next2) i2++;
    if (next === next3) i3++;
    if (next === next5) i5++;
  }

  return ugly[n - 1];
}

console.log(nthUglyNumber(10));`
  ),
};
