import { AUTO_GENERATED_PROBLEMS } from './auto_generated_problems';

const withJs = (key, javascript) => ({
  ...(AUTO_GENERATED_PROBLEMS[key] || {}),
  javascript,
});

export const STAGE3_FULL_CODE = {
  'Mental Model: Trust recursion': withJs(
    'Mental Model: Trust recursion',
    `function factorialTrace(n, depth = 0) {
  const pad = '  '.repeat(depth);
  console.log(pad + 'factorialTrace(' + n + ') called');

  if (n === 1) {
    console.log(pad + 'Base case reached, returning 1');
    return 1;
  }

  const smallerAnswer = factorialTrace(n - 1, depth + 1);
  const answer = n * smallerAnswer;
  console.log(pad + 'Trust smaller problem: ' + n + ' * ' + smallerAnswer + ' = ' + answer);
  return answer;
}

console.log('Final answer:', factorialTrace(4));`
  ),
  'base case': withJs(
    'base case',
    `function countdown(n) {
  if (n === 0) {
    console.log('Base case hit. Stop recursion.');
    return;
  }

  console.log('Current value:', n);
  countdown(n - 1);
}

countdown(5);`
  ),
  'recursive call': withJs(
    'recursive call',
    `function sumArray(arr, index = 0) {
  if (index === arr.length) return 0;

  const current = arr[index];
  const restSum = sumArray(arr, index + 1);
  return current + restSum;
}

console.log(sumArray([5, 1, 3, 2]));`
  ),
  'Tree Template': withJs(
    'Tree Template',
    `const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: {
    value: 3,
    left: null,
    right: { value: 6, left: null, right: null },
  },
};

function preorder(node) {
  if (!node) return [];
  return [node.value, ...preorder(node.left), ...preorder(node.right)];
}

console.log(preorder(tree));`
  ),
  'Types (Linear, Tree, Tail, Head, Mutual)': withJs(
    'Types (Linear, Tree, Tail, Head, Mutual)',
    `function linearRecursion(n) {
  if (n === 0) return 0;
  return n + linearRecursion(n - 1);
}

function treeRecursion(n) {
  if (n <= 1) return n;
  return treeRecursion(n - 1) + treeRecursion(n - 2);
}

function tailRecursion(n, acc = 0) {
  if (n === 0) return acc;
  return tailRecursion(n - 1, acc + n);
}

function headRecursion(n) {
  if (n === 0) return [];
  const result = headRecursion(n - 1);
  result.push(n);
  return result;
}

function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1);
}

function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1);
}

console.log({
  linear: linearRecursion(4),
  tree: treeRecursion(6),
  tail: tailRecursion(4),
  head: headRecursion(4),
  mutual: isEven(7),
});`
  ),
  '11. Merge/Quick sort': withJs(
    '11. Merge/Quick sort',
    `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const merged = [];

  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }

  return merged.concat(left.slice(i), right.slice(j));
}

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return arr;

  const pivot = arr[high];
  let boundary = low;
  for (let i = low; i < high; i++) {
    if (arr[i] < pivot) {
      [arr[i], arr[boundary]] = [arr[boundary], arr[i]];
      boundary++;
    }
  }

  [arr[boundary], arr[high]] = [arr[high], arr[boundary]];
  quickSort(arr, low, boundary - 1);
  quickSort(arr, boundary + 1, high);
  return arr;
}

const values = [7, 3, 9, 1, 4, 8];
console.log('mergeSort:', mergeSort(values));
console.log('quickSort:', quickSort([...values]));`
  ),
  '15. Subsets': withJs(
    '15. Subsets',
    `function subsets(nums) {
  const result = [];

  function dfs(index, path) {
    if (index === nums.length) {
      result.push([...path]);
      return;
    }

    dfs(index + 1, path);

    path.push(nums[index]);
    dfs(index + 1, path);
    path.pop();
  }

  dfs(0, []);
  return result;
}

console.log(subsets([1, 2, 3]));`
  ),
  '16. Permutations': withJs(
    '16. Permutations',
    `function permutations(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }

  backtrack(0);
  return result;
}

console.log(permutations([1, 2, 3]));`
  ),
  '17. Rat in maze': withJs(
    '17. Rat in maze',
    `function findPath(maze) {
  const n = maze.length;
  const result = [];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  const moves = [
    [1, 0, 'D'],
    [0, -1, 'L'],
    [0, 1, 'R'],
    [-1, 0, 'U'],
  ];

  function dfs(row, col, path) {
    if (row === n - 1 && col === n - 1) {
      result.push(path);
      return;
    }

    visited[row][col] = true;

    for (const [dr, dc, step] of moves) {
      const nr = row + dr;
      const nc = col + dc;
      const inside = nr >= 0 && nc >= 0 && nr < n && nc < n;
      if (inside && maze[nr][nc] === 1 && !visited[nr][nc]) {
        dfs(nr, nc, path + step);
      }
    }

    visited[row][col] = false;
  }

  if (maze[0][0] === 1) dfs(0, 0, '');
  return result;
}

console.log(findPath([
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1],
]));`
  ),
  '18. Flood fill': withJs(
    '18. Flood fill',
    `function floodFill(image, sr, sc, newColor) {
  const original = image[sr][sc];
  if (original === newColor) return image;

  function dfs(row, col) {
    const inside = row >= 0 && col >= 0 && row < image.length && col < image[0].length;
    if (!inside || image[row][col] !== original) return;

    image[row][col] = newColor;
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  dfs(sr, sc);
  return image;
}

console.log(floodFill([
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
], 1, 1, 2));`
  ),
  '19. N-Queens': withJs(
    '19. N-Queens',
    `function solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  const result = [];

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(line => line.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;
      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;

      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);
      board[row][col] = 'Q';

      backtrack(row + 1);

      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return result;
}

console.log(solveNQueens(4));`
  ),
  '20. Sudoku': withJs(
    '20. Sudoku',
    `function solveSudoku(board) {
  function isValid(row, col, char) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === char) return false;
      if (board[i][col] === char) return false;

      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === char) return false;
    }
    return true;
  }

  function backtrack() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== '.') continue;

        for (let digit = 1; digit <= 9; digit++) {
          const char = String(digit);
          if (!isValid(row, col, char)) continue;

          board[row][col] = char;
          if (backtrack()) return true;
          board[row][col] = '.';
        }

        return false;
      }
    }

    return true;
  }

  backtrack();
  return board;
}

const sudoku = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

console.log(solveSudoku(sudoku));`
  ),

  'Template: Choose': withJs(
    'Template: Choose',
    `function subsets(nums) {
  const result = [];

  function backtrack(index, path) {
    if (index === nums.length) {
      result.push([...path]);
      return;
    }

    path.push(nums[index]); // choose
    backtrack(index + 1, path);
    path.pop();

    backtrack(index + 1, path);
  }

  backtrack(0, []);
  return result;
}

console.log(subsets([1, 2]));`
  ),
  Explore: withJs(
    'Explore',
    `function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i], path); // explore deeper
      path.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

console.log(combinationSum([2, 3, 6, 7], 7));`
  ),
  'Undo Choice (KEY STEP)': withJs(
    'Undo Choice (KEY STEP)',
    `function permutations(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]]; // undo choice
    }
  }

  backtrack(0);
  return result;
}

console.log(permutations([1, 2, 3]));`
  ),
  'When to use: Combinations': withJs(
    'When to use: Combinations',
    `function combinations(n, k) {
  const result = [];

  function backtrack(start, path) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let value = start; value <= n; value++) {
      path.push(value);
      backtrack(value + 1, path);
      path.pop();
    }
  }

  backtrack(1, []);
  return result;
}

console.log(combinations(4, 2));`
  ),
  constraints: withJs(
    'constraints',
    `function combinationSumWithPruning(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break; // prune invalid branch

      path.push(candidates[i]);
      backtrack(i + 1, remaining - candidates[i], path);
      path.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

console.log(combinationSumWithPruning([10, 1, 2, 7, 6, 1, 5], 8));`
  ),
  paths: withJs(
    'paths',
    `function allRootToLeafPaths(tree) {
  const result = [];

  function dfs(node, path) {
    if (!node) return;

    path.push(node.value);

    if (!node.left && !node.right) {
      result.push(path.join('->'));
    } else {
      dfs(node.left, path);
      dfs(node.right, path);
    }

    path.pop();
  }

  dfs(tree, []);
  return result;
}

const tree = {
  value: 1,
  left: { value: 2, left: null, right: { value: 5, left: null, right: null } },
  right: { value: 3, left: null, right: null },
};

console.log(allRootToLeafPaths(tree));`
  ),
  'decision trees': withJs(
    'decision trees',
    `function printDecisionTree(nums) {
  function dfs(index, path) {
    if (index === nums.length) {
      console.log('Leaf:', path);
      return;
    }

    dfs(index + 1, path + ' skip(' + nums[index] + ')');
    dfs(index + 1, path + ' take(' + nums[index] + ')');
  }

  dfs(0, 'start');
}

printDecisionTree([1, 2, 3]);`
  ),

  '01. Subsets I/II': withJs(
    '01. Subsets I/II',
    `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  function backtrack(start, path) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;

      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log(subsetsWithDup([1, 2, 2]));`
  ),
  '03. Permutations I/II': withJs(
    '03. Permutations I/II',
    `function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const used = Array(nums.length).fill(false);
  const result = [];

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}

console.log(permuteUnique([1, 1, 2]));`
  ),
  '05. Combination sums': withJs(
    '05. Combination sums',
    `function combinationSum(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      const value = candidates[i];
      if (value > remaining) break;

      path.push(value);
      backtrack(i, remaining - value, path);
      path.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

console.log(combinationSum([2, 3, 5], 8));`
  ),
  '08. Phone number letters': withJs(
    '08. Phone number letters',
    `function letterCombinations(digits) {
  if (!digits) return [];

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  const result = [];

  function backtrack(index, path) {
    if (index === digits.length) {
      result.push(path);
      return;
    }

    for (const char of map[digits[index]]) {
      backtrack(index + 1, path + char);
    }
  }

  backtrack(0, '');
  return result;
}

console.log(letterCombinations('23'));`
  ),
  '09. Word search': withJs(
    '09. Word search',
    `function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(row, col, index) {
    if (index === word.length) return true;

    const inside = row >= 0 && col >= 0 && row < rows && col < cols;
    if (!inside || board[row][col] !== word[index]) return false;

    const char = board[row][col];
    board[row][col] = '#';

    const found =
      dfs(row + 1, col, index + 1) ||
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row, col - 1, index + 1);

    board[row][col] = char;
    return found;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (dfs(row, col, 0)) return true;
    }
  }

  return false;
}

console.log(exist([
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
], 'ABCCED'));`
  ),
  '10. Palindrome partitioning': withJs(
    '10. Palindrome partitioning',
    `function partition(s) {
  const result = [];

  function isPalindrome(left, right) {
    while (left < right) {
      if (s[left++] !== s[right--]) return false;
    }
    return true;
  }

  function backtrack(start, path) {
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (!isPalindrome(start, end)) continue;

      path.push(s.slice(start, end + 1));
      backtrack(end + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log(partition('aab'));`
  ),
  '11. Valid parentheses generation': withJs(
    '11. Valid parentheses generation',
    `function generateParenthesis(n) {
  const result = [];

  function backtrack(open, close, path) {
    if (path.length === 2 * n) {
      result.push(path);
      return;
    }

    if (open < n) backtrack(open + 1, close, path + '(');
    if (close < open) backtrack(open, close + 1, path + ')');
  }

  backtrack(0, 0, '');
  return result;
}

console.log(generateParenthesis(3));`
  ),
  '12. Rat in maze': withJs(
    '12. Rat in maze',
    `function mazePaths(grid) {
  const n = grid.length;
  const result = [];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  const directions = [
    [1, 0, 'D'],
    [0, 1, 'R'],
    [0, -1, 'L'],
    [-1, 0, 'U'],
  ];

  function dfs(row, col, path) {
    if (row === n - 1 && col === n - 1) {
      result.push(path);
      return;
    }

    visited[row][col] = true;
    for (const [dr, dc, move] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      const inside = nr >= 0 && nc >= 0 && nr < n && nc < n;
      if (inside && grid[nr][nc] === 1 && !visited[nr][nc]) {
        dfs(nr, nc, path + move);
      }
    }
    visited[row][col] = false;
  }

  if (grid[0][0] === 1) dfs(0, 0, '');
  return result;
}

console.log(mazePaths([
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 1],
]));`
  ),
  '13. N-Queens': withJs(
    '13. N-Queens',
    `function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const columns = new Set();
  const leftDiagonal = new Set();
  const rightDiagonal = new Set();

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;
      if (columns.has(col) || leftDiagonal.has(d1) || rightDiagonal.has(d2)) continue;

      columns.add(col);
      leftDiagonal.add(d1);
      rightDiagonal.add(d2);
      board[row][col] = 'Q';

      backtrack(row + 1);

      board[row][col] = '.';
      columns.delete(col);
      leftDiagonal.delete(d1);
      rightDiagonal.delete(d2);
    }
  }

  backtrack(0);
  return result;
}

console.log(solveNQueens(4));`
  ),
  '14. Sudoku': withJs(
    '14. Sudoku',
    `function solveSudoku(board) {
  function isValid(row, col, value) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === value || board[i][col] === value) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === value) return false;
    }
    return true;
  }

  function backtrack() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== '.') continue;

        for (let digit = 1; digit <= 9; digit++) {
          const value = String(digit);
          if (!isValid(row, col, value)) continue;

          board[row][col] = value;
          if (backtrack()) return true;
          board[row][col] = '.';
        }

        return false;
      }
    }

    return true;
  }

  backtrack();
  return board;
}

console.log(solveSudoku([
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]));`
  ),
  '15. M-coloring': withJs(
    '15. M-coloring',
    `function canColorGraph(graph, colorsCount) {
  const colors = Array(graph.length).fill(0);

  function isSafe(node, color) {
    for (const neighbor of graph[node]) {
      if (colors[neighbor] === color) return false;
    }
    return true;
  }

  function backtrack(node) {
    if (node === graph.length) return true;

    for (let color = 1; color <= colorsCount; color++) {
      if (!isSafe(node, color)) continue;

      colors[node] = color;
      if (backtrack(node + 1)) return true;
      colors[node] = 0;
    }

    return false;
  }

  return backtrack(0) ? colors : null;
}

console.log(canColorGraph([
  [1, 2, 3],
  [0, 2],
  [0, 1, 3],
  [0, 2],
], 3));`
  ),

  'Complexities: Bubble': withJs(
    'Complexities: Bubble',
    `function bubbleSort(arr) {
  for (let pass = 0; pass < arr.length - 1; pass++) {
    let swapped = false;
    for (let i = 0; i < arr.length - 1 - pass; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

console.log(bubbleSort([5, 1, 4, 2, 8]));
console.log('Worst: O(n^2), Best: O(n) when already sorted');`
  ),
  Selection: withJs(
    'Selection',
    `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

console.log(selectionSort([29, 10, 14, 37, 13]));
console.log('Time: O(n^2), Space: O(1)');`
  ),
  Insertion: withJs(
    'Insertion',
    `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }
  return arr;
}

console.log(insertionSort([9, 5, 1, 4, 3]));
console.log('Best for small or nearly sorted arrays');`
  ),
  Merge: withJs(
    'Merge',
    `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const merged = [];

  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    merged.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }

  return merged.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([8, 3, 2, 9, 7, 1, 5, 4]));
console.log('Time: O(n log n), Space: O(n), Stable');`
  ),
  Quick: withJs(
    'Quick',
    `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return arr;

  const pivot = arr[high];
  let boundary = low;

  for (let i = low; i < high; i++) {
    if (arr[i] < pivot) {
      [arr[i], arr[boundary]] = [arr[boundary], arr[i]];
      boundary++;
    }
  }

  [arr[boundary], arr[high]] = [arr[high], arr[boundary]];
  quickSort(arr, low, boundary - 1);
  quickSort(arr, boundary + 1, high);
  return arr;
}

console.log(quickSort([10, 7, 8, 9, 1, 5]));
console.log('Average: O(n log n), Worst: O(n^2), In-place');`
  ),
  Heap: withJs(
    'Heap',
    `function heapSort(arr) {
  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) heapify(arr.length, i);
  for (let end = arr.length - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapify(end, 0);
  }

  return arr;
}

console.log(heapSort([12, 11, 13, 5, 6, 7]));
console.log('Time: O(n log n), Space: O(1)');`
  ),
  Counting: withJs(
    'Counting',
    `function countingSort(arr) {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);

  for (const value of arr) count[value]++;

  let write = 0;
  for (let value = 0; value < count.length; value++) {
    while (count[value] > 0) {
      arr[write++] = value;
      count[value]--;
    }
  }

  return arr;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1]));
console.log('Works well when value range is small');`
  ),
  Radix: withJs(
    'Radix',
    `function radixSort(arr) {
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const value of arr) {
      const digit = Math.floor(value / exp) % 10;
      buckets[digit].push(value);
    }
    arr = buckets.flat();
  }

  return arr;
}

console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66]));
console.log('Great for integers with bounded digit count');`
  ),
  Tim: withJs(
    'Tim',
    `function insertionSortRange(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
}

function merge(arr, left, mid, right) {
  const a = arr.slice(left, mid + 1);
  const b = arr.slice(mid + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;

  while (i < a.length && j < b.length) {
    arr[k++] = a[i] <= b[j] ? a[i++] : b[j++];
  }
  while (i < a.length) arr[k++] = a[i++];
  while (j < b.length) arr[k++] = b[j++];
}

function simplifiedTimSort(arr) {
  const RUN = 4;

  for (let i = 0; i < arr.length; i += RUN) {
    insertionSortRange(arr, i, Math.min(i + RUN - 1, arr.length - 1));
  }

  for (let size = RUN; size < arr.length; size *= 2) {
    for (let left = 0; left < arr.length; left += 2 * size) {
      const mid = Math.min(left + size - 1, arr.length - 1);
      const right = Math.min(left + 2 * size - 1, arr.length - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }

  return arr;
}

console.log(simplifiedTimSort([5, 21, 7, 23, 19, 3, 18, 11]));
console.log('TimSort mixes insertion sort + merge sort');`
  ),
  'When to use: Small array (Insertion)': withJs(
    'When to use: Small array (Insertion)',
    `function chooseSortForSmallArray(arr) {
  function insertionSort(values) {
    for (let i = 1; i < values.length; i++) {
      const current = values[i];
      let j = i - 1;
      while (j >= 0 && values[j] > current) {
        values[j + 1] = values[j];
        j--;
      }
      values[j + 1] = current;
    }
    return values;
  }

  return arr.length <= 16 ? insertionSort(arr) : 'Use a different algorithm';
}

console.log(chooseSortForSmallArray([6, 3, 9, 1, 4]));`
  ),
  'General (Merge/Tim)': withJs(
    'General (Merge/Tim)',
    `function stableGeneralPurposeSort(arr) {
  if (typeof arr.toSorted === 'function') {
    return arr.toSorted((a, b) => a - b); // Modern engines typically use TimSort-like behavior
  }
  return [...arr].sort((a, b) => a - b);
}

console.log(stableGeneralPurposeSort([9, 4, 7, 1, 3]));`
  ),
  'Memory constraint (Heap)': withJs(
    'Memory constraint (Heap)',
    `function inPlaceHeapSort(arr) {
  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;
    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) heapify(arr.length, i);
  for (let end = arr.length - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapify(end, 0);
  }
  return arr;
}

console.log(inPlaceHeapSort([4, 10, 3, 5, 1]));`
  ),
  'Fast average (Quick)': withJs(
    'Fast average (Quick)',
    `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return arr;

  const pivot = arr[Math.floor((low + high) / 2)];
  let left = low;
  let right = high;

  while (left <= right) {
    while (arr[left] < pivot) left++;
    while (arr[right] > pivot) right--;
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  quickSort(arr, low, right);
  quickSort(arr, left, high);
  return arr;
}

console.log(quickSort([12, 7, 14, 9, 10, 11]));`
  ),
  '10 Patterns: Dutch flag': withJs(
    '10 Patterns: Dutch flag',
    `function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }

  return nums;
}

console.log(sortColors([2, 0, 2, 1, 1, 0]));`
  ),
  'Merge intervals': withJs(
    'Merge intervals',
    `function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) last[1] = Math.max(last[1], current[1]);
    else merged.push(current);
  }

  return merged;
}

console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]));`
  ),
  'Meeting rooms': withJs(
    'Meeting rooms',
    `function minMeetingRooms(intervals) {
  const starts = intervals.map(([start]) => start).sort((a, b) => a - b);
  const ends = intervals.map(([, end]) => end).sort((a, b) => a - b);

  let start = 0;
  let end = 0;
  let rooms = 0;
  let maxRooms = 0;

  while (start < starts.length) {
    if (starts[start] < ends[end]) {
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
      start++;
    } else {
      rooms--;
      end++;
    }
  }

  return maxRooms;
}

console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]]));`
  ),
  'Non-overlapping': withJs(
    'Non-overlapping',
    `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let removed = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (start < prevEnd) removed++;
    else prevEnd = end;
  }

  return removed;
}

console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));`
  ),
  'Largest number': withJs(
    'Largest number',
    `function largestNumber(nums) {
  nums.sort((a, b) => ('' + b + a).localeCompare('' + a + b));
  if (nums[0] === 0) return '0';
  return nums.join('');
}

console.log(largestNumber([3, 30, 34, 5, 9]));`
  ),
  'Sort by frequency': withJs(
    'Sort by frequency',
    `function frequencySort(nums) {
  const freq = new Map();
  for (const value of nums) freq.set(value, (freq.get(value) || 0) + 1);

  return nums.sort((a, b) => {
    const diff = freq.get(a) - freq.get(b);
    return diff !== 0 ? diff : b - a;
  });
}

console.log(frequencySort([1, 1, 2, 2, 2, 3]));`
  ),
  'Wiggle sort': withJs(
    'Wiggle sort',
    `function wiggleSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const shouldSwap =
      (i % 2 === 1 && nums[i] < nums[i - 1]) ||
      (i % 2 === 0 && nums[i] > nums[i - 1]);

    if (shouldSwap) {
      [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
    }
  }
  return nums;
}

console.log(wiggleSort([3, 5, 2, 1, 6, 4]));`
  ),
  'Quick select': withJs(
    'Quick select',
    `function quickSelect(nums, k) {
  const target = nums.length - k;

  function partition(left, right) {
    const pivot = nums[right];
    let index = left;
    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[index]] = [nums[index], nums[i]];
        index++;
      }
    }
    [nums[index], nums[right]] = [nums[right], nums[index]];
    return index;
  }

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const pivotIndex = partition(left, right);
    if (pivotIndex === target) return nums[pivotIndex];
    if (pivotIndex < target) left = pivotIndex + 1;
    else right = pivotIndex - 1;
  }
}

console.log(quickSelect([3, 2, 1, 5, 6, 4], 2));`
  ),
  'Count inversions': withJs(
    'Count inversions',
    `function countInversions(arr) {
  function sortAndCount(nums) {
    if (nums.length <= 1) return { sorted: nums, count: 0 };

    const mid = Math.floor(nums.length / 2);
    const left = sortAndCount(nums.slice(0, mid));
    const right = sortAndCount(nums.slice(mid));
    const merged = [];
    let i = 0;
    let j = 0;
    let count = left.count + right.count;

    while (i < left.sorted.length && j < right.sorted.length) {
      if (left.sorted[i] <= right.sorted[j]) {
        merged.push(left.sorted[i++]);
      } else {
        merged.push(right.sorted[j++]);
        count += left.sorted.length - i;
      }
    }

    return {
      sorted: merged.concat(left.sorted.slice(i), right.sorted.slice(j)),
      count,
    };
  }

  return sortAndCount(arr).count;
}

console.log(countInversions([8, 4, 2, 1]));`
  ),
  'Nearly sorted K': withJs(
    'Nearly sorted K',
    `class MinHeap {
  constructor() {
    this.data = [];
  }

  push(value) {
    this.data.push(value);
    let index = this.data.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] <= this.data[index]) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  pop() {
    if (this.data.length === 1) return this.data.pop();
    const min = this.data[0];
    this.data[0] = this.data.pop();
    let index = 0;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < this.data.length && this.data[left] < this.data[smallest]) smallest = left;
      if (right < this.data.length && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === index) break;

      [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
      index = smallest;
    }

    return min;
  }

  size() {
    return this.data.length;
  }
}

function sortNearlySorted(arr, k) {
  const heap = new MinHeap();
  const result = [];

  for (const value of arr) {
    heap.push(value);
    if (heap.size() > k) result.push(heap.pop());
  }

  while (heap.size() > 0) result.push(heap.pop());
  return result;
}

console.log(sortNearlySorted([6, 5, 3, 2, 8, 10, 9], 3));`
  ),

  'Template: left <= right': withJs(
    'Template: left <= right',
    `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 7));`
  ),
  'mid = left + (right-left)/2': withJs(
    'mid = left + (right-left)/2',
    `function safeBinarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

console.log(safeBinarySearch([2, 4, 6, 8, 10], 8));`
  ),
  'Variants: First/Last occurrence': withJs(
    'Variants: First/Last occurrence',
    `function firstAndLast(arr, target) {
  function search(findFirst) {
    let left = 0;
    let right = arr.length - 1;
    let answer = -1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === target) {
        answer = mid;
        if (findFirst) right = mid - 1;
        else left = mid + 1;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return answer;
  }

  return [search(true), search(false)];
}

console.log(firstAndLast([1, 2, 2, 2, 3, 4], 2));`
  ),
  'Lower/Upper bound': withJs(
    'Lower/Upper bound',
    `function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}

function upperBound(arr, target) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] <= target) left = mid + 1;
    else right = mid;
  }
  return left;
}

console.log({
  lower: lowerBound([1, 2, 2, 2, 4], 2),
  upper: upperBound([1, 2, 2, 2, 4], 2),
});`
  ),
  'Search on answer': withJs(
    'Search on answer',
    `function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  function canFinish(speed) {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  }

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canFinish(mid)) right = mid;
    else left = mid + 1;
  }

  return left;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8));`
  ),

  '02. occurrences': withJs(
    '02. occurrences',
    `function countOccurrences(arr, target) {
  function firstIndex() {
    let left = 0;
    let right = arr.length - 1;
    let answer = -1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] >= target) right = mid - 1;
      else left = mid + 1;
      if (arr[mid] === target) answer = mid;
    }
    return answer;
  }

  function lastIndex() {
    let left = 0;
    let right = arr.length - 1;
    let answer = -1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] <= target) left = mid + 1;
      else right = mid - 1;
      if (arr[mid] === target) answer = mid;
    }
    return answer;
  }

  const first = firstIndex();
  if (first === -1) return 0;
  return lastIndex() - first + 1;
}

console.log(countOccurrences([1, 2, 2, 2, 3, 4], 2));`
  ),
  '03. floor/ceil': withJs(
    '03. floor/ceil',
    `function floorAndCeil(arr, target) {
  let floor = -1;
  let ceil = -1;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return [arr[mid], arr[mid]];

    if (arr[mid] < target) {
      floor = arr[mid];
      left = mid + 1;
    } else {
      ceil = arr[mid];
      right = mid - 1;
    }
  }

  return [floor, ceil];
}

console.log(floorAndCeil([1, 2, 4, 6, 10, 12], 5));`
  ),
  '05. Rotated sorted arrays': withJs(
    '05. Rotated sorted arrays',
    `function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }

  return -1;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0));`
  ),
  '08. Peak': withJs(
    '08. Peak',
    `function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < nums[mid + 1]) left = mid + 1;
    else right = mid;
  }

  return left;
}

console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4]));`
  ),
  '09. Square root': withJs(
    '09. Square root',
    `function integerSqrt(x) {
  let left = 0;
  let right = x;
  let answer = 0;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (mid * mid <= x) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

console.log(integerSqrt(27));`
  ),
  '10. Missing positive': withJs(
    '10. Missing positive',
    `function findKthPositive(arr, k) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const missingUntilMid = arr[mid] - (mid + 1);
    if (missingUntilMid < k) left = mid + 1;
    else right = mid - 1;
  }

  return left + k;
}

console.log(findKthPositive([2, 3, 4, 7, 11], 5));`
  ),
  '11. Single element': withJs(
    '11. Single element',
    `function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (mid % 2 === 1) mid--;

    if (nums[mid] === nums[mid + 1]) left = mid + 2;
    else right = mid;
  }

  return nums[left];
}

console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]));`
  ),
  '12. Smallest letter': withJs(
    '12. Smallest letter',
    `function nextGreatestLetter(letters, target) {
  let left = 0;
  let right = letters.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (letters[mid] <= target) left = mid + 1;
    else right = mid - 1;
  }

  return letters[left % letters.length];
}

console.log(nextGreatestLetter(['c', 'f', 'j'], 'd'));`
  ),
  '13. Binary search on answer (Ship packages': withJs(
    '13. Binary search on answer (Ship packages',
    `function shipWithinDays(weights, days) {
  let left = Math.max(...weights);
  let right = weights.reduce((sum, weight) => sum + weight, 0);

  function canShip(capacity) {
    let usedDays = 1;
    let currentLoad = 0;

    for (const weight of weights) {
      if (currentLoad + weight > capacity) {
        usedDays++;
        currentLoad = 0;
      }
      currentLoad += weight;
    }

    return usedDays <= days;
  }

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canShip(mid)) right = mid;
    else left = mid + 1;
  }

  return left;
}

console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));`
  ),
  '14. Koko bananas': withJs(
    '14. Koko bananas',
    `function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  function hoursNeeded(speed) {
    return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
  }

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (hoursNeeded(mid) <= h) right = mid;
    else left = mid + 1;
  }

  return left;
}

console.log(minEatingSpeed([30, 11, 23, 4, 20], 6));`
  ),
  '15. Aggressive cows': withJs(
    '15. Aggressive cows',
    `function aggressiveCows(stalls, cows) {
  stalls.sort((a, b) => a - b);
  let left = 1;
  let right = stalls[stalls.length - 1] - stalls[0];
  let answer = 0;

  function canPlace(distance) {
    let count = 1;
    let last = stalls[0];

    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - last >= distance) {
        count++;
        last = stalls[i];
      }
    }

    return count >= cows;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canPlace(mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

console.log(aggressiveCows([1, 2, 4, 8, 9], 3));`
  ),
  '16. Book allocation)': withJs(
    '16. Book allocation)',
    `function allocateBooks(pages, students) {
  if (students > pages.length) return -1;

  let left = Math.max(...pages);
  let right = pages.reduce((sum, page) => sum + page, 0);
  let answer = right;

  function canAllocate(limit) {
    let usedStudents = 1;
    let currentPages = 0;

    for (const page of pages) {
      if (currentPages + page > limit) {
        usedStudents++;
        currentPages = 0;
      }
      currentPages += page;
    }

    return usedStudents <= students;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canAllocate(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

console.log(allocateBooks([12, 34, 67, 90], 2));`
  ),
  '18. Median/Kth element of two arrays': withJs(
    '18. Median/Kth element of two arrays',
    `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);

  const total = nums1.length + nums2.length;
  const half = Math.floor((total + 1) / 2);
  let left = 0;
  let right = nums1.length;

  while (left <= right) {
    const cut1 = left + Math.floor((right - left) / 2);
    const cut2 = half - cut1;

    const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const right1 = cut1 === nums1.length ? Infinity : nums1[cut1];
    const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const right2 = cut2 === nums2.length ? Infinity : nums2[cut2];

    if (left1 <= right2 && left2 <= right1) {
      if (total % 2 === 1) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }

    if (left1 > right2) right = cut1 - 1;
    else left = cut1 + 1;
  }
}

console.log(findMedianSortedArrays([1, 3], [2]));`
  ),
  '19. Mountain array': withJs(
    '19. Mountain array',
    `function peakIndexInMountainArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < arr[mid + 1]) left = mid + 1;
    else right = mid;
  }

  return left;
}

console.log(peakIndexInMountainArray([0, 2, 4, 6, 3, 1]));`
  ),
};
