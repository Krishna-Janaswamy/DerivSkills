export const BACKTRACKING_PROBLEMS_PART2 = {
  // --- BACKTRACKING CONCEPTS ---
  'Template: Choose': {
    javascript: `console.log("Template Step 1: Make a choice (add to path/mark visited).");`,
    python: `print("Template Step 1: Choose.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Choose."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Choose." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Choose.\\n"); return 0; }`
  },
  'Explore': {
    javascript: `console.log("Template Step 2: Explore via recursive call.");`,
    python: `print("Template Step 2: Explore.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Explore."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Explore." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Explore.\\n"); return 0; }`
  },
  'Undo Choice (KEY STEP)': {
    javascript: `console.log("Template Step 3: Undo the choice (pop from path/unmark visited) to backtrack.");`,
    python: `print("Template Step 3: Undo Choice.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Undo Choice."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Undo Choice." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Undo Choice.\\n"); return 0; }`
  },
  'When to use: Combinations': {
    javascript: `console.log("Backtracking is great for Combinations, where order doesn't matter.");`,
    python: `print("Used for Combinations.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Combinations."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Combinations." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Combinations.\\n"); return 0; }`
  },
  'constraints': {
    javascript: `console.log("Constraints: Cut off recursion early if the current path is invalid (pruning).");`,
    python: `print("Constraints / Pruning.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Pruning."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Pruning." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Pruning.\\n"); return 0; }`
  },
  'paths': {
    javascript: `console.log("Paths: Maintain a list/array of the current recursive path.");`,
    python: `print("Paths tracking.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Paths."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Paths." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Paths.\\n"); return 0; }`
  },
  'decision trees': {
    javascript: `console.log("Decision Trees: Visualizing every choice as a branch.");`,
    python: `print("Decision Trees.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Decision Trees."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Decision Trees." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Decision Trees.\\n"); return 0; }`
  },

  // --- TOP 15 BACKTRACKING PROBLEMS ---
  '01. Subsets I/II': {
    javascript: `function subsets(nums) {
    const res = []; nums.sort((a,b) => a-b);
    function backtrack(start, path) {
        res.push([...path]);
        for(let i=start; i<nums.length; i++) {
            if(i > start && nums[i] === nums[i-1]) continue; // For Subsets II
            path.push(nums[i]);
            backtrack(i+1, path);
            path.pop();
        }
    }
    backtrack(0, []);
    return res;
}
console.log(subsets([1,2,2]));`,
    python: `def subsets(nums):
    res = []; nums.sort()
    def backtrack(start, path):
        res.append(path[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i-1]: continue
            path.append(nums[i])
            backtrack(i+1, path)
            path.pop()
    backtrack(0, [])
    return res
print(subsets([1,2,2]))`,
    java: `import java.util.*;
public class YourClassName {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        backtrack(res, new ArrayList<>(), nums, 0);
        return res;
    }
    private static void backtrack(List<List<Integer>> res, List<Integer> path, int[] nums, int start) {
        res.add(new ArrayList<>(path));
        for(int i=start; i<nums.length; i++) {
            if(i > start && nums[i] == nums[i-1]) continue;
            path.add(nums[i]);
            backtrack(res, path, nums, i+1);
            path.remove(path.size()-1);
        }
    }
    public static void main(String[] args) {
        System.out.println(subsets(new int[]{1,2,2}));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
void backtrack(vector<vector<int>>& res, vector<int>& path, vector<int>& nums, int start) {
    res.push_back(path);
    for(int i=start; i<nums.size(); i++) {
        if(i > start && nums[i] == nums[i-1]) continue;
        path.push_back(nums[i]);
        backtrack(res, path, nums, i+1);
        path.pop_back();
    }
}
int main() {
    vector<int> nums = {1,2,2}; sort(nums.begin(), nums.end());
    vector<vector<int>> res; vector<int> path;
    backtrack(res, path, nums, 0);
    for(auto& p : res) { for(int x : p) cout << x; cout << " "; } cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Subsets requires Backtracking.\\n"); return 0; }`
  },
  '03. Permutations I/II': {
    javascript: `function permute(nums) {
    const res = [], used = new Array(nums.length).fill(false);
    nums.sort((a,b) => a-b);
    function backtrack(path) {
        if(path.length === nums.length) { res.push([...path]); return; }
        for(let i=0; i<nums.length; i++) {
            if(used[i] || (i > 0 && nums[i] === nums[i-1] && !used[i-1])) continue;
            used[i] = true; path.push(nums[i]);
            backtrack(path);
            used[i] = false; path.pop();
        }
    }
    backtrack([]); return res;
}
console.log(permute([1,1,2]));`,
    python: `def permute(nums):
    res, used = [], [False] * len(nums); nums.sort()
    def backtrack(path):
        if len(path) == len(nums):
            res.append(path[:]); return
        for i in range(len(nums)):
            if used[i] or (i > 0 and nums[i] == nums[i-1] and not used[i-1]): continue
            used[i] = True; path.append(nums[i])
            backtrack(path)
            used[i] = False; path.pop()
    backtrack([])
    return res
print(permute([1,1,2]))`,
    java: `import java.util.*;
public class YourClassName {
    public static List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        backtrack(res, new ArrayList<>(), nums, new boolean[nums.length]);
        return res;
    }
    private static void backtrack(List<List<Integer>> res, List<Integer> path, int[] nums, boolean[] used) {
        if(path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for(int i=0; i<nums.length; i++) {
            if(used[i] || (i > 0 && nums[i] == nums[i-1] && !used[i-1])) continue;
            used[i] = true; path.add(nums[i]);
            backtrack(res, path, nums, used);
            used[i] = false; path.remove(path.size()-1);
        }
    }
    public static void main(String[] args) {
        System.out.println(permute(new int[]{1,1,2}));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
void backtrack(vector<vector<int>>& res, vector<int>& path, vector<int>& nums, vector<bool>& used) {
    if(path.size() == nums.size()) { res.push_back(path); return; }
    for(int i=0; i<nums.size(); i++) {
        if(used[i] || (i > 0 && nums[i] == nums[i-1] && !used[i-1])) continue;
        used[i] = true; path.push_back(nums[i]);
        backtrack(res, path, nums, used);
        used[i] = false; path.pop_back();
    }
}
int main() {
    vector<int> nums = {1,1,2}; sort(nums.begin(), nums.end());
    vector<vector<int>> res; vector<int> path; vector<bool> used(nums.size(), false);
    backtrack(res, path, nums, used);
    for(auto& p : res) { for(int x : p) cout << x; cout << " "; } cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Permutations.\\n"); return 0; }`
  },
  '05. Combination sums': {
    javascript: `function combinationSum(candidates, target) {
    const res = [];
    function backtrack(start, target, path) {
        if(target < 0) return;
        if(target === 0) { res.push([...path]); return; }
        for(let i=start; i<candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, target - candidates[i], path); // i not i+1 for reuse
            path.pop();
        }
    }
    backtrack(0, target, []); return res;
}
console.log(combinationSum([2,3,6,7], 7));`,
    python: `def combination_sum(candidates, target):
    res = []
    def backtrack(start, target, path):
        if target < 0: return
        if target == 0: res.append(path[:]); return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, target - candidates[i], path)
            path.pop()
    backtrack(0, target, [])
    return res
print(combination_sum([2,3,6,7], 7))`,
    java: `import java.util.*;
public class YourClassName {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), candidates, target, 0);
        return res;
    }
    private static void backtrack(List<List<Integer>> res, List<Integer> path, int[] cands, int target, int start) {
        if(target < 0) return;
        if(target == 0) { res.add(new ArrayList<>(path)); return; }
        for(int i=start; i<cands.length; i++) {
            path.add(cands[i]);
            backtrack(res, path, cands, target - cands[i], i);
            path.remove(path.size()-1);
        }
    }
    public static void main(String[] args) {
        System.out.println(combinationSum(new int[]{2,3,6,7}, 7));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
void backtrack(vector<vector<int>>& res, vector<int>& path, vector<int>& cands, int target, int start) {
    if(target < 0) return;
    if(target == 0) { res.push_back(path); return; }
    for(int i=start; i<cands.size(); i++) {
        path.push_back(cands[i]);
        backtrack(res, path, cands, target - cands[i], i);
        path.pop_back();
    }
}
int main() {
    vector<int> cands = {2,3,6,7}; vector<vector<int>> res; vector<int> path;
    backtrack(res, path, cands, 7, 0);
    for(auto& p : res) { for(int x : p) cout << x; cout << " "; } cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Combination Sum.\\n"); return 0; }`
  },
  '08. Phone number letters': {
    javascript: `// Letter Combinations of a Phone Number
console.log("Phone number combinations uses backtracking over a dictionary map.");`,
    python: `print("Phone number combinations uses backtracking.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Letter Combinations."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Letter Combinations." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Letter Combinations.\\n"); return 0; }`
  },
  '09. Word search': {
    javascript: `// Word Search on a 2D Grid
console.log("Word search uses DFS + Backtracking across a 2D board.");`,
    python: `print("Word search uses DFS + Backtracking.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Word Search DFS."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Word Search DFS." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Word Search.\\n"); return 0; }`
  },
  '10. Palindrome partitioning': {
    javascript: `// Palindrome Partitioning
console.log("Splits a string checking if left substring is palindrome, then recurses.");`,
    python: `print("Splits string recursively checking palindromes.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Palindrome Partitioning."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Palindrome Partitioning." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Palindrome Partitioning.\\n"); return 0; }`
  },
  '11. Valid parentheses generation': {
    javascript: `function generateParenthesis(n) {
    const res = [];
    function backtrack(path, open, close) {
        if(path.length === 2 * n) { res.push(path); return; }
        if(open < n) backtrack(path + '(', open + 1, close);
        if(close < open) backtrack(path + ')', open, close + 1);
    }
    backtrack("", 0, 0); return res;
}
console.log(generateParenthesis(3));`,
    python: `def generate_parenthesis(n):
    res = []
    def backtrack(path, open_c, close_c):
        if len(path) == 2 * n: res.append(path); return
        if open_c < n: backtrack(path + '(', open_c + 1, close_c)
        if close_c < open_c: backtrack(path + ')', open_c, close_c + 1)
    backtrack("", 0, 0); return res
print(generate_parenthesis(3))`,
    java: `import java.util.*;
public class YourClassName {
    public static List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(res, "", 0, 0, n);
        return res;
    }
    private static void backtrack(List<String> res, String path, int open, int close, int n) {
        if(path.length() == 2 * n) { res.add(path); return; }
        if(open < n) backtrack(res, path + '(', open + 1, close, n);
        if(close < open) backtrack(res, path + ')', open, close + 1, n);
    }
    public static void main(String[] args) {
        System.out.println(generateParenthesis(3));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
void backtrack(vector<string>& res, string path, int open, int close, int n) {
    if(path.length() == 2 * n) { res.push_back(path); return; }
    if(open < n) backtrack(res, path + '(', open + 1, close, n);
    if(close < open) backtrack(res, path + ')', open, close + 1, n);
}
int main() {
    vector<string> res; backtrack(res, "", 0, 0, 3);
    for(string s : res) cout << s << " "; cout << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Valid parentheses generation.\\n"); return 0; }`
  },
  '12. Rat in maze': {
    javascript: `// Rat in a Maze
console.log("Rat in Maze prints valid paths exploring D, L, R, U with backtracking.");`,
    python: `print("Rat in Maze explores D, L, R, U.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Rat in Maze."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Rat in Maze." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Rat in Maze.\\n"); return 0; }`
  },
  '13. N-Queens': {
    javascript: `function solveNQueens(n) {
    const res = [], board = Array(n).fill().map(() => Array(n).fill('.'));
    function isValid(row, col) {
        for(let i=0; i<row; i++) if(board[i][col] === 'Q') return false;
        for(let i=row-1, j=col-1; i>=0 && j>=0; i--, j--) if(board[i][j] === 'Q') return false;
        for(let i=row-1, j=col+1; i>=0 && j<n; i--, j++) if(board[i][j] === 'Q') return false;
        return true;
    }
    function backtrack(row) {
        if(row === n) { res.push(board.map(r => r.join(''))); return; }
        for(let col=0; col<n; col++) {
            if(isValid(row, col)) {
                board[row][col] = 'Q'; backtrack(row + 1); board[row][col] = '.';
            }
        }
    }
    backtrack(0); return res;
}
console.log("N-Queens for N=4, first solution:", solveNQueens(4)[0]);`,
    python: `def solve_n_queens(n):
    res = []; board = [['.'] * n for _ in range(n)]
    def is_valid(row, col):
        for i in range(row):
            if board[i][col] == 'Q': return False
        for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
            if board[i][j] == 'Q': return False
        for i, j in zip(range(row-1, -1, -1), range(col+1, n)):
            if board[i][j] == 'Q': return False
        return True
    def backtrack(row):
        if row == n: res.append(["".join(r) for r in board]); return
        for col in range(n):
            if is_valid(row, col):
                board[row][col] = 'Q'; backtrack(row + 1); board[row][col] = '.'
    backtrack(0); return res
print("N-Queens for N=4, first solution:", solve_n_queens(4)[0])`,
    java: `import java.util.*;
public class YourClassName {
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for(char[] r : board) Arrays.fill(r, '.');
        backtrack(res, board, 0, n); return res;
    }
    private static void backtrack(List<List<String>> res, char[][] board, int row, int n) {
        if(row == n) {
            List<String> list = new ArrayList<>();
            for(char[] r : board) list.add(new String(r));
            res.add(list); return;
        }
        for(int col=0; col<n; col++) {
            if(isValid(board, row, col, n)) {
                board[row][col] = 'Q'; backtrack(res, board, row + 1, n); board[row][col] = '.';
            }
        }
    }
    private static boolean isValid(char[][] board, int row, int col, int n) {
        for(int i=0; i<row; i++) if(board[i][col] == 'Q') return false;
        for(int i=row-1, j=col-1; i>=0 && j>=0; i--, j--) if(board[i][j] == 'Q') return false;
        for(int i=row-1, j=col+1; i>=0 && j<n; i--, j++) if(board[i][j] == 'Q') return false;
        return true;
    }
    public static void main(String[] args) {
        System.out.println(solveNQueens(4).get(0));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
bool isValid(vector<string>& board, int row, int col, int n) {
    for(int i=0; i<row; i++) if(board[i][col] == 'Q') return false;
    for(int i=row-1, j=col-1; i>=0 && j>=0; i--, j--) if(board[i][j] == 'Q') return false;
    for(int i=row-1, j=col+1; i>=0 && j<n; i--, j++) if(board[i][j] == 'Q') return false;
    return true;
}
void backtrack(vector<vector<string>>& res, vector<string>& board, int row, int n) {
    if(row == n) { res.push_back(board); return; }
    for(int col=0; col<n; col++) {
        if(isValid(board, row, col, n)) {
            board[row][col] = 'Q'; backtrack(res, board, row + 1, n); board[row][col] = '.';
        }
    }
}
int main() {
    int n = 4; vector<vector<string>> res;
    vector<string> board(n, string(n, '.'));
    backtrack(res, board, 0, n);
    for(string s : res[0]) cout << s << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("N-Queens Backtracking.\\n"); return 0; }`
  },
  '14. Sudoku': {
    javascript: `// Sudoku Solver
console.log("Sudoku tries digits 1-9 checking row, column, and 3x3 block validity recursively.");`,
    python: `print("Sudoku solver uses recursion and constraint checks.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Sudoku Solver."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Sudoku Solver." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Sudoku Solver.\\n"); return 0; }`
  },
  '15. M-coloring': {
    javascript: `// M-Coloring Graph Problem
console.log("M-Coloring checks if a graph can be colored with M colors without adjacent matching.");`,
    python: `print("M-Coloring Graph uses backtracking.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("M-Coloring Graph."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "M-Coloring." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("M-Coloring.\\n"); return 0; }`
  }
};
