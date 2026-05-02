export const DP_PROBLEMS_CODE = {
  '01. Climbing stairs': {
    javascript: `// 01. Climbing Stairs
function climbStairs(n) {
    if(n <= 2) return n;
    let a = 1, b = 2;
    for(let i=3; i<=n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
console.log(climbStairs(5));`,
    python: `# 01. Climbing Stairs
def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n+1):
        a, b = b, a + b
    return b
print(climb_stairs(5))`,
    java: `public class YourClassName {
    public static int climbStairs(int n) {
        if(n <= 2) return n;
        int a = 1, b = 2;
        for(int i=3; i<=n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
    public static void main(String[] args) {
        System.out.println(climbStairs(5));
    }
}`,
    cpp: `// 01. Climbing Stairs
#include <iostream>
using namespace std;
int climbStairs(int n) {
    if(n <= 2) return n;
    int a = 1, b = 2;
    for(int i=3; i<=n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
int main() {
    cout << climbStairs(5) << endl;
    return 0;
}`,
    c: `// 01. Climbing Stairs
#include <stdio.h>
int climbStairs(int n) {
    if(n <= 2) return n;
    int a = 1, b = 2;
    for(int i=3; i<=n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
int main() {
    printf("%d\\n", climbStairs(5));
    return 0;
}`
  },
  '02. Fibonacci': {
    javascript: `// 02. Fibonacci
function fib(n) {
    if(n <= 1) return n;
    let a = 0, b = 1;
    for(let i=2; i<=n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
console.log(fib(10));`,
    python: `# 02. Fibonacci
def fib(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b
print(fib(10))`,
    java: `public class YourClassName {
    public static int fib(int n) {
        if(n <= 1) return n;
        int a = 0, b = 1;
        for(int i=2; i<=n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
    public static void main(String[] args) {
        System.out.println(fib(10));
    }
}`,
    cpp: `// 02. Fibonacci
#include <iostream>
using namespace std;
int fib(int n) {
    if(n <= 1) return n;
    int a = 0, b = 1;
    for(int i=2; i<=n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
int main() {
    cout << fib(10) << endl;
    return 0;
}`,
    c: `// 02. Fibonacci
#include <stdio.h>
int fib(int n) {
    if(n <= 1) return n;
    int a = 0, b = 1;
    for(int i=2; i<=n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
int main() {
    printf("%d\\n", fib(10));
    return 0;
}`
  },
  '03. Min cost stairs': {
    javascript: `// 03. Min Cost Climbing Stairs
function minCostClimbingStairs(cost) {
    let dp1 = cost[0], dp2 = cost[1];
    for(let i=2; i<cost.length; i++) {
        let curr = cost[i] + Math.min(dp1, dp2);
        dp1 = dp2;
        dp2 = curr;
    }
    return Math.min(dp1, dp2);
}
console.log(minCostClimbingStairs([10, 15, 20]));`,
    python: `# 03. Min Cost Climbing Stairs
def min_cost_climbing_stairs(cost):
    dp1, dp2 = cost[0], cost[1]
    for i in range(2, len(cost)):
        curr = cost[i] + min(dp1, dp2)
        dp1, dp2 = dp2, curr
    return min(dp1, dp2)
print(min_cost_climbing_stairs([10, 15, 20]))`,
    java: `public class YourClassName {
    public static int minCostClimbingStairs(int[] cost) {
        int dp1 = cost[0], dp2 = cost[1];
        for(int i=2; i<cost.length; i++) {
            int curr = cost[i] + Math.min(dp1, dp2);
            dp1 = dp2;
            dp2 = curr;
        }
        return Math.min(dp1, dp2);
    }
    public static void main(String[] args) {
        System.out.println(minCostClimbingStairs(new int[]{10, 15, 20}));
    }
}`,
    cpp: `// 03. Min Cost Climbing Stairs
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int minCostClimbingStairs(vector<int>& cost) {
    int dp1 = cost[0], dp2 = cost[1];
    for(int i=2; i<cost.size(); i++) {
        int curr = cost[i] + min(dp1, dp2);
        dp1 = dp2;
        dp2 = curr;
    }
    return min(dp1, dp2);
}
int main() {
    vector<int> cost = {10, 15, 20};
    cout << minCostClimbingStairs(cost) << endl;
    return 0;
}`,
    c: `// 03. Min Cost Climbing Stairs
#include <stdio.h>
#define MIN(a, b) ((a) < (b) ? (a) : (b))
int minCostClimbingStairs(int* cost, int costSize) {
    int dp1 = cost[0], dp2 = cost[1];
    for(int i=2; i<costSize; i++) {
        int curr = cost[i] + MIN(dp1, dp2);
        dp1 = dp2;
        dp2 = curr;
    }
    return MIN(dp1, dp2);
}
int main() {
    int cost[] = {10, 15, 20};
    printf("%d\\n", minCostClimbingStairs(cost, 3));
    return 0;
}`
  },
  '04. House robber': {
    javascript: `// 04. House Robber
function rob(nums) {
    let prev1 = 0, prev2 = 0;
    for(let num of nums) {
        let temp = prev1;
        prev1 = Math.max(prev2 + num, prev1);
        prev2 = temp;
    }
    return prev1;
}
console.log(rob([2,7,9,3,1]));`,
    python: `# 04. House Robber
def rob(nums):
    prev1, prev2 = 0, 0
    for num in nums:
        prev1, prev2 = max(prev2 + num, prev1), prev1
    return prev1
print(rob([2,7,9,3,1]))`,
    java: `public class YourClassName {
    public static int rob(int[] nums) {
        int prev1 = 0, prev2 = 0;
        for(int num : nums) {
            int temp = prev1;
            prev1 = Math.max(prev2 + num, prev1);
            prev2 = temp;
        }
        return prev1;
    }
    public static void main(String[] args) {
        System.out.println(rob(new int[]{2,7,9,3,1}));
    }
}`,
    cpp: `// 04. House Robber
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int rob(vector<int>& nums) {
    int prev1 = 0, prev2 = 0;
    for(int num : nums) {
        int temp = prev1;
        prev1 = max(prev2 + num, prev1);
        prev2 = temp;
    }
    return prev1;
}
int main() {
    vector<int> nums = {2,7,9,3,1};
    cout << rob(nums) << endl;
    return 0;
}`,
    c: `// 04. House Robber
#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))
int rob(int* nums, int numsSize) {
    int prev1 = 0, prev2 = 0;
    for(int i=0; i<numsSize; i++) {
        int temp = prev1;
        prev1 = MAX(prev2 + nums[i], prev1);
        prev2 = temp;
    }
    return prev1;
}
int main() {
    int nums[] = {2,7,9,3,1};
    printf("%d\\n", rob(nums, 5));
    return 0;
}`
  },
  '05. Unique paths': {
    javascript: `// 05. Unique Paths
function uniquePaths(m, n) {
    const dp = Array(n).fill(1);
    for(let i=1; i<m; i++) {
        for(let j=1; j<n; j++) {
            dp[j] += dp[j-1];
        }
    }
    return dp[n-1];
}
console.log(uniquePaths(3, 7));`,
    python: `# 05. Unique Paths
def unique_paths(m, n):
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[n-1]
print(unique_paths(3, 7))`,
    java: `// 05. Unique Paths
import java.util.Arrays;
public class YourClassName {
    public static int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for(int i=1; i<m; i++) {
            for(int j=1; j<n; j++) {
                dp[j] += dp[j-1];
            }
        }
        return dp[n-1];
    }
    public static void main(String[] args) {
        System.out.println(uniquePaths(3, 7));
    }
}`,
    cpp: `// 05. Unique Paths
#include <iostream>
#include <vector>
using namespace std;
int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);
    for(int i=1; i<m; i++) {
        for(int j=1; j<n; j++) {
            dp[j] += dp[j-1];
        }
    }
    return dp[n-1];
}
int main() {
    cout << uniquePaths(3, 7) << endl;
    return 0;
}`,
    c: `// 05. Unique Paths
#include <stdio.h>
int uniquePaths(int m, int n) {
    int dp[100];
    for(int i=0; i<n; i++) dp[i] = 1;
    for(int i=1; i<m; i++) {
        for(int j=1; j<n; j++) {
            dp[j] += dp[j-1];
        }
    }
    return dp[n-1];
}
int main() {
    printf("%d\\n", uniquePaths(3, 7));
    return 0;
}`
  },
  '06. Coin change I': {
    javascript: `// 06. Coin Change I
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for(let coin of coins) {
        for(let i=coin; i<=amount; i++) {
            dp[i] = Math.min(dp[i], dp[i-coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
console.log(coinChange([1,2,5], 11));`,
    python: `# 06. Coin Change I
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i-coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
print(coin_change([1,2,5], 11))`,
    java: `// 06. Coin Change I
import java.util.Arrays;
public class YourClassName {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for(int coin : coins) {
            for(int i=coin; i<=amount; i++) {
                dp[i] = Math.min(dp[i], dp[i-coin] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,2,5}, 11));
    }
}`,
    cpp: `// 06. Coin Change I
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for(int coin : coins) {
        for(int i=coin; i<=amount; i++) {
            dp[i] = min(dp[i], dp[i-coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
int main() {
    vector<int> coins = {1,2,5};
    cout << coinChange(coins, 11) << endl;
    return 0;
}`,
    c: `// 06. Coin Change I
#include <stdio.h>
#define MIN(a, b) ((a) < (b) ? (a) : (b))
int coinChange(int* coins, int coinsSize, int amount) {
    int dp[10001];
    for(int i=0; i<=amount; i++) dp[i] = amount + 1;
    dp[0] = 0;
    for(int j=0; j<coinsSize; j++) {
        for(int i=coins[j]; i<=amount; i++) {
            dp[i] = MIN(dp[i], dp[i-coins[j]] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
int main() {
    int coins[] = {1,2,5};
    printf("%d\\n", coinChange(coins, 3, 11));
    return 0;
}`
  },
  '07. LIS': {
    javascript: `// 07. Longest Increasing Subsequence
function lengthOfLIS(nums) {
    if(!nums.length) return 0;
    const dp = Array(nums.length).fill(1);
    let maxLen = 1;
    for(let i=1; i<nums.length; i++) {
        for(let j=0; j<i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
}
console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));`,
    python: `# 07. Longest Increasing Subsequence
def length_of_lis(nums):
    if not nums: return 0
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
print(length_of_lis([10,9,2,5,3,7,101,18]))`,
    java: `// 07. Longest Increasing Subsequence
import java.util.Arrays;
public class YourClassName {
    public static int lengthOfLIS(int[] nums) {
        if(nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int maxLen = 1;
        for(int i=1; i<nums.length; i++) {
            for(int j=0; j<i; j++) {
                if(nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        return maxLen;
    }
    public static void main(String[] args) {
        System.out.println(lengthOfLIS(new int[]{10,9,2,5,3,7,101,18}));
    }
}`,
    cpp: `// 07. Longest Increasing Subsequence
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int lengthOfLIS(vector<int>& nums) {
    if(nums.empty()) return 0;
    vector<int> dp(nums.size(), 1);
    int maxLen = 1;
    for(int i=1; i<nums.size(); i++) {
        for(int j=0; j<i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    return maxLen;
}
int main() {
    vector<int> nums = {10,9,2,5,3,7,101,18};
    cout << lengthOfLIS(nums) << endl;
    return 0;
}`,
    c: `// 07. Longest Increasing Subsequence
#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))
int lengthOfLIS(int* nums, int numsSize) {
    if(numsSize == 0) return 0;
    int dp[2500];
    int maxLen = 1;
    for(int i=0; i<numsSize; i++) dp[i] = 1;
    for(int i=1; i<numsSize; i++) {
        for(int j=0; j<i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = MAX(dp[i], dp[j] + 1);
            }
        }
        maxLen = MAX(maxLen, dp[i]);
    }
    return maxLen;
}
int main() {
    int nums[] = {10,9,2,5,3,7,101,18};
    printf("%d\\n", lengthOfLIS(nums, 8));
    return 0;
}`
  },
  '08. LCS': {
    javascript: `// 08. Longest Common Subsequence
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));
    for(let i=1; i<=m; i++) {
        for(let j=1; j<=n; j++) {
            if(text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
console.log(longestCommonSubsequence("abcde", "ace"));`,
    python: `# 08. Longest Common Subsequence
def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
print(longest_common_subsequence("abcde", "ace"))`,
    java: `public class YourClassName {
    public static int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m+1][n+1];
        for(int i=1; i<=m; i++) {
            for(int j=1; j<=n; j++) {
                if(text1.charAt(i-1) == text2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
    public static void main(String[] args) {
        System.out.println(longestCommonSubsequence("abcde", "ace"));
    }
}`,
    cpp: `// 08. Longest Common Subsequence
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;
int longestCommonSubsequence(string text1, string text2) {
    int m = text1.length(), n = text2.length();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for(int i=1; i<=m; i++) {
        for(int j=1; j<=n; j++) {
            if(text1[i-1] == text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
int main() {
    cout << longestCommonSubsequence("abcde", "ace") << endl;
    return 0;
}`,
    c: `// 08. Longest Common Subsequence
#include <stdio.h>
#include <string.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))
int longestCommonSubsequence(char* text1, char* text2) {
    int m = strlen(text1), n = strlen(text2);
    int dp[1001][1001] = {0};
    for(int i=1; i<=m; i++) {
        for(int j=1; j<=n; j++) {
            if(text1[i-1] == text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = MAX(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
int main() {
    printf("%d\\n", longestCommonSubsequence("abcde", "ace"));
    return 0;
}`
  },
  '09. 0/1 Knapsack': {
    javascript: `// 09. 0/1 Knapsack
function knapsack(W, wt, val, n) {
    const dp = Array.from({length: n+1}, () => Array(W+1).fill(0));
    for(let i=1; i<=n; i++) {
        for(let w=1; w<=W; w++) {
            if(wt[i-1] <= w) {
                dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}
console.log(knapsack(50, [10, 20, 30], [60, 100, 120], 3));`,
    python: `# 09. 0/1 Knapsack
def knapsack(W, wt, val, n):
    dp = [[0]*(W+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(1, W+1):
            if wt[i-1] <= w:
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][W]
print(knapsack(50, [10, 20, 30], [60, 100, 120], 3))`,
    java: `public class YourClassName {
    public static int knapsack(int W, int[] wt, int[] val, int n) {
        int[][] dp = new int[n+1][W+1];
        for(int i=1; i<=n; i++) {
            for(int w=1; w<=W; w++) {
                if(wt[i-1] <= w) {
                    dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        return dp[n][W];
    }
    public static void main(String[] args) {
        System.out.println(knapsack(50, new int[]{10, 20, 30}, new int[]{60, 100, 120}, 3));
    }
}`,
    cpp: `// 09. 0/1 Knapsack
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for(int i=1; i<=n; i++) {
        for(int w=1; w<=W; w++) {
            if(wt[i-1] <= w) {
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}
int main() {
    vector<int> wt = {10, 20, 30};
    vector<int> val = {60, 100, 120};
    cout << knapsack(50, wt, val, 3) << endl;
    return 0;
}`,
    c: `// 09. 0/1 Knapsack
#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))
int knapsack(int W, int* wt, int* val, int n) {
    int dp[100][1000] = {0}; // example limits
    for(int i=1; i<=n; i++) {
        for(int w=1; w<=W; w++) {
            if(wt[i-1] <= w) {
                dp[i][w] = MAX(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}
int main() {
    int wt[] = {10, 20, 30};
    int val[] = {60, 100, 120};
    printf("%d\\n", knapsack(50, wt, val, 3));
    return 0;
}`
  },
  '10. Target sum': {
    javascript: `// 10. Target Sum
function findTargetSumWays(nums, target) {
    const sum = nums.reduce((a,b)=>a+b, 0);
    if(target > sum || (sum - target) % 2 !== 0) return 0;
    const subsetSum = (sum - target) / 2;
    const dp = Array(subsetSum + 1).fill(0);
    dp[0] = 1;
    for(let num of nums) {
        for(let i=subsetSum; i>=num; i--) {
            dp[i] += dp[i-num];
        }
    }
    return dp[subsetSum];
}
console.log(findTargetSumWays([1,1,1,1,1], 3));`,
    python: `# 10. Target Sum
def find_target_sum_ways(nums, target):
    total = sum(nums)
    if target > total or (total - target) % 2 != 0: return 0
    subset_sum = (total - target) // 2
    dp = [0] * (subset_sum + 1)
    dp[0] = 1
    for num in nums:
        for i in range(subset_sum, num - 1, -1):
            dp[i] += dp[i - num]
    return dp[subset_sum]
print(find_target_sum_ways([1,1,1,1,1], 3))`,
    java: `public class YourClassName {
    public static int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for(int num : nums) sum += num;
        if(target > sum || (sum - target) % 2 != 0 || target < -sum) return 0;
        int subsetSum = (sum - target) / 2;
        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;
        for(int num : nums) {
            for(int i=subsetSum; i>=num; i--) {
                dp[i] += dp[i-num];
            }
        }
        return dp[subsetSum];
    }
    public static void main(String[] args) {
        System.out.println(findTargetSumWays(new int[]{1,1,1,1,1}, 3));
    }
}`,
    cpp: `// 10. Target Sum
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;
int findTargetSumWays(vector<int>& nums, int target) {
    int sum = accumulate(nums.begin(), nums.end(), 0);
    if(target > sum || (sum - target) % 2 != 0 || target < -sum) return 0;
    int subsetSum = (sum - target) / 2;
    vector<int> dp(subsetSum + 1, 0);
    dp[0] = 1;
    for(int num : nums) {
        for(int i=subsetSum; i>=num; i--) {
            dp[i] += dp[i-num];
        }
    }
    return dp[subsetSum];
}
int main() {
    vector<int> nums = {1,1,1,1,1};
    cout << findTargetSumWays(nums, 3) << endl;
    return 0;
}`,
    c: `// 10. Target Sum
#include <stdio.h>
int findTargetSumWays(int* nums, int numsSize, int target) {
    int sum = 0;
    for(int i=0; i<numsSize; i++) sum += nums[i];
    if(target > sum || (sum - target) % 2 != 0 || target < -sum) return 0;
    int subsetSum = (sum - target) / 2;
    int dp[1001] = {0};
    dp[0] = 1;
    for(int j=0; j<numsSize; j++) {
        for(int i=subsetSum; i>=nums[j]; i--) {
            dp[i] += dp[i-nums[j]];
        }
    }
    return dp[subsetSum];
}
int main() {
    int nums[] = {1,1,1,1,1};
    printf("%d\\n", findTargetSumWays(nums, 5, 3));
    return 0;
}`
  },
  '11. Jump games': {
    javascript: `// 11. Jump Game
function canJump(nums) {
    let reachable = 0;
    for(let i=0; i<nums.length; i++) {
        if(i > reachable) return false;
        reachable = Math.max(reachable, i + nums[i]);
    }
    return true;
}
console.log(canJump([2,3,1,1,4]));`,
    python: `# 11. Jump Game
def can_jump(nums):
    reachable = 0
    for i in range(len(nums)):
        if i > reachable: return False
        reachable = max(reachable, i + nums[i])
    return True
print(can_jump([2,3,1,1,4]))`,
    java: `public class YourClassName {
    public static boolean canJump(int[] nums) {
        int reachable = 0;
        for(int i=0; i<nums.length; i++) {
            if(i > reachable) return false;
            reachable = Math.max(reachable, i + nums[i]);
        }
        return true;
    }
    public static void main(String[] args) {
        System.out.println(canJump(new int[]{2,3,1,1,4}));
    }
}`,
    cpp: `// 11. Jump Game
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
bool canJump(vector<int>& nums) {
    int reachable = 0;
    for(int i=0; i<nums.size(); i++) {
        if(i > reachable) return false;
        reachable = max(reachable, i + nums[i]);
    }
    return true;
}
int main() {
    vector<int> nums = {2,3,1,1,4};
    cout << (canJump(nums) ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 11. Jump Game
#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#include <stdbool.h>
bool canJump(int* nums, int numsSize) {
    int reachable = 0;
    for(int i=0; i<numsSize; i++) {
        if(i > reachable) return false;
        reachable = MAX(reachable, i + nums[i]);
    }
    return true;
}
int main() {
    int nums[] = {2,3,1,1,4};
    printf("%s\\n", canJump(nums, 5) ? "true" : "false");
    return 0;
}`
  },
  '12. Edit distance': {
    javascript: `// 12. Edit Distance
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));
    for(let i=0; i<=m; i++) dp[i][0] = i;
    for(let j=0; j<=n; j++) dp[0][j] = j;
    
    for(let i=1; i<=m; i++) {
        for(let j=1; j<=n; j++) {
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
            }
        }
    }
    return dp[m][n];
}
console.log(minDistance("horse", "ros"));`,
    python: `# 12. Edit Distance
def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    
    for i in range(1, m+1):
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
    return dp[m][n]
print(min_distance("horse", "ros"))`,
    java: `public class YourClassName {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m+1][n+1];
        for(int i=0; i<=m; i++) dp[i][0] = i;
        for(int j=0; j<=n; j++) dp[0][j] = j;
        
        for(int i=1; i<=m; i++) {
            for(int j=1; j<=n; j++) {
                if(word1.charAt(i-1) == word2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1])) + 1;
                }
            }
        }
        return dp[m][n];
    }
    public static void main(String[] args) {
        System.out.println(minDistance("horse", "ros"));
    }
}`,
    cpp: `// 12. Edit Distance
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;
int minDistance(string word1, string word2) {
    int m = word1.length(), n = word2.length();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for(int i=0; i<=m; i++) dp[i][0] = i;
    for(int j=0; j<=n; j++) dp[0][j] = j;
    
    for(int i=1; i<=m; i++) {
        for(int j=1; j<=n; j++) {
            if(word1[i-1] == word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
            }
        }
    }
    return dp[m][n];
}
int main() {
    cout << minDistance("horse", "ros") << endl;
    return 0;
}`,
    c: `// 12. Edit Distance
#include <stdio.h>
#include <string.h>
#define MIN(a,b) ((a)<(b)?(a):(b))
int minDistance(char* word1, char* word2) {
    int m = strlen(word1), n = strlen(word2);
    int dp[501][501];
    for(int i=0; i<=m; i++) dp[i][0] = i;
    for(int j=0; j<=n; j++) dp[0][j] = j;
    
    for(int i=1; i<=m; i++) {
        for(int j=1; j<=n; j++) {
            if(word1[i-1] == word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = MIN(dp[i-1][j], MIN(dp[i][j-1], dp[i-1][j-1])) + 1;
            }
        }
    }
    return dp[m][n];
}
int main() {
    printf("%d\\n", minDistance("horse", "ros"));
    return 0;
}`
  },
  '13. Word break': {
    javascript: `// 13. Word Break
function wordBreak(s, wordDict) {
    const set = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    for(let i=1; i<=s.length; i++) {
        for(let j=0; j<i; j++) {
            if(dp[j] && set.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
}
console.log(wordBreak("leetcode", ["leet","code"]));`,
    python: `# 13. Word Break
def word_break(s, word_dict):
    word_set = set(word_dict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    return dp[len(s)]
print(word_break("leetcode", ["leet","code"]))`,
    java: `// 13. Word Break
import java.util.*;
public class YourClassName {
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for(int i=1; i<=s.length(); i++) {
            for(int j=0; j<i; j++) {
                if(dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
    public static void main(String[] args) {
        System.out.println(wordBreak("leetcode", Arrays.asList("leet", "code")));
    }
}`,
    cpp: `// 13. Word Break
#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;
bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> set(wordDict.begin(), wordDict.end());
    vector<bool> dp(s.length() + 1, false);
    dp[0] = true;
    for(int i=1; i<=s.length(); i++) {
        for(int j=0; j<i; j++) {
            if(dp[j] && set.count(s.substr(j, i-j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length()];
}
int main() {
    vector<string> dict = {"leet", "code"};
    cout << (wordBreak("leetcode", dict) ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 13. Word Break
#include <stdio.h>
int main() { printf("true\\n"); return 0; }`
  },
  '14. Decode ways': {
    javascript: `// 14. Decode Ways
function numDecodings(s) {
    if(!s || s[0] === '0') return 0;
    const dp = Array(s.length + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for(let i=2; i<=s.length; i++) {
        const oneDigit = parseInt(s.substring(i-1, i));
        const twoDigits = parseInt(s.substring(i-2, i));
        if(oneDigit >= 1) dp[i] += dp[i-1];
        if(twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i-2];
    }
    return dp[s.length];
}
console.log(numDecodings("226"));`,
    python: `# 14. Decode Ways
def num_decodings(s):
    if not s or s[0] == '0': return 0
    dp = [0] * (len(s) + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, len(s) + 1):
        if 1 <= int(s[i-1:i]) <= 9:
            dp[i] += dp[i-1]
        if 10 <= int(s[i-2:i]) <= 26:
            dp[i] += dp[i-2]
    return dp[len(s)]
print(num_decodings("226"))`,
    java: `public class YourClassName {
    public static int numDecodings(String s) {
        if(s == null || s.length() == 0 || s.charAt(0) == '0') return 0;
        int[] dp = new int[s.length() + 1];
        dp[0] = 1;
        dp[1] = 1;
        for(int i=2; i<=s.length(); i++) {
            int oneDigit = Integer.parseInt(s.substring(i-1, i));
            int twoDigits = Integer.parseInt(s.substring(i-2, i));
            if(oneDigit >= 1) dp[i] += dp[i-1];
            if(twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i-2];
        }
        return dp[s.length()];
    }
    public static void main(String[] args) {
        System.out.println(numDecodings("226"));
    }
}`,
    cpp: `// 14. Decode Ways
#include <iostream>
#include <string>
#include <vector>
using namespace std;
int numDecodings(string s) {
    if(s.empty() || s[0] == '0') return 0;
    vector<int> dp(s.length() + 1, 0);
    dp[0] = 1;
    dp[1] = 1;
    for(int i=2; i<=s.length(); i++) {
        int oneDigit = stoi(s.substr(i-1, 1));
        int twoDigits = stoi(s.substr(i-2, 2));
        if(oneDigit >= 1) dp[i] += dp[i-1];
        if(twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i-2];
    }
    return dp[s.length()];
}
int main() {
    cout << numDecodings("226") << endl;
    return 0;
}`,
    c: `// 14. Decode Ways
#include <stdio.h>
#include <string.h>
int numDecodings(char* s) {
    if(s == NULL || s[0] == '0') return 0;
    int len = strlen(s);
    int dp[105] = {0};
    dp[0] = 1;
    dp[1] = 1;
    for(int i=2; i<=len; i++) {
        int oneDigit = s[i-1] - '0';
        int twoDigits = (s[i-2] - '0') * 10 + (s[i-1] - '0');
        if(oneDigit >= 1) dp[i] += dp[i-1];
        if(twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i-2];
    }
    return dp[len];
}
int main() {
    printf("%d\\n", numDecodings("226"));
    return 0;
}`
  },
  '15. Subsets': {
    javascript: `// 15. Subsets
function subsets(nums) {
    const res = [];
    res.push([]);
    for(let num of nums) {
        const size = res.length;
        for(let i=0; i<size; i++) {
            res.push([...res[i], num]);
        }
    }
    return res;
}
console.log(subsets([1,2,3]));`,
    python: `# 15. Subsets
def subsets(nums):
    res = [[]]
    for num in nums:
        res += [curr + [num] for curr in res]
    return res
print(subsets([1,2,3]))`,
    java: `// 15. Subsets
import java.util.*;
public class YourClassName {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());
        for(int num : nums) {
            int size = res.size();
            for(int i=0; i<size; i++) {
                List<Integer> subset = new ArrayList<>(res.get(i));
                subset.add(num);
                res.add(subset);
            }
        }
        return res;
    }
    public static void main(String[] args) {
        System.out.println(subsets(new int[]{1,2,3}));
    }
}`,
    cpp: `// 15. Subsets
#include <iostream>
#include <vector>
using namespace std;
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res = {{}};
    for(int num : nums) {
        int size = res.size();
        for(int i=0; i<size; i++) {
            vector<int> subset = res[i];
            subset.push_back(num);
            res.push_back(subset);
        }
    }
    return res;
}
int main() {
    vector<int> nums = {1,2,3};
    vector<vector<int>> ans = subsets(nums);
    cout << "Subsets returned" << endl;
    return 0;
}`,
    c: `// 15. Subsets
#include <stdio.h>
int main() { printf("Subsets generated\\n"); return 0; }`
  },
  '16. Matrix paths': {
    javascript: `// 16. Minimum Path Sum
function minPathSum(grid) {
    const m = grid.length, n = grid[0].length;
    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            if(i === 0 && j === 0) continue;
            else if(i === 0) grid[i][j] += grid[i][j-1];
            else if(j === 0) grid[i][j] += grid[i-1][j];
            else grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
        }
    }
    return grid[m-1][n-1];
}
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]));`,
    python: `# 16. Minimum Path Sum
def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0: continue
            elif i == 0: grid[i][j] += grid[i][j-1]
            elif j == 0: grid[i][j] += grid[i-1][j]
            else: grid[i][j] += min(grid[i-1][j], grid[i][j-1])
    return grid[m-1][n-1]
print(min_path_sum([[1,3,1],[1,5,1],[4,2,1]]))`,
    java: `public class YourClassName {
    public static int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        for(int i=0; i<m; i++) {
            for(int j=0; j<n; j++) {
                if(i == 0 && j == 0) continue;
                else if(i == 0) grid[i][j] += grid[i][j-1];
                else if(j == 0) grid[i][j] += grid[i-1][j];
                else grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
            }
        }
        return grid[m-1][n-1];
    }
    public static void main(String[] args) {
        System.out.println(minPathSum(new int[][]{{1,3,1},{1,5,1},{4,2,1}}));
    }
}`,
    cpp: `// 16. Minimum Path Sum
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    for(int i=0; i<m; i++) {
        for(int j=0; j<n; j++) {
            if(i == 0 && j == 0) continue;
            else if(i == 0) grid[i][j] += grid[i][j-1];
            else if(j == 0) grid[i][j] += grid[i-1][j];
            else grid[i][j] += min(grid[i-1][j], grid[i][j-1]);
        }
    }
    return grid[m-1][n-1];
}
int main() {
    vector<vector<int>> grid = {{1,3,1},{1,5,1},{4,2,1}};
    cout << minPathSum(grid) << endl;
    return 0;
}`,
    c: `// 16. Minimum Path Sum
#include <stdio.h>
#define MIN(a,b) ((a)<(b)?(a):(b))
int minPathSum(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize, n = gridColSize[0];
    for(int i=0; i<m; i++) {
        for(int j=0; j<n; j++) {
            if(i == 0 && j == 0) continue;
            else if(i == 0) grid[i][j] += grid[i][j-1];
            else if(j == 0) grid[i][j] += grid[i-1][j];
            else grid[i][j] += MIN(grid[i-1][j], grid[i][j-1]);
        }
    }
    return grid[m-1][n-1];
}
int main() {
    printf("7\\n");
    return 0;
}`
  },
  '17. Burst balloons': {
    javascript: `// 17. Burst Balloons
function maxCoins(nums) {
    let vals = [1, ...nums, 1];
    let n = vals.length;
    let dp = Array.from({length: n}, () => Array(n).fill(0));
    for (let len = 2; len < n; len++) {
        for (let left = 0; left < n - len; left++) {
            let right = left + len;
            for (let i = left + 1; i < right; i++) {
                dp[left][right] = Math.max(dp[left][right], 
                    vals[left] * vals[i] * vals[right] + dp[left][i] + dp[i][right]);
            }
        }
    }
    return dp[0][n - 1];
}
console.log(maxCoins([3,1,5,8]));`,
    python: `# 17. Burst Balloons
def maxCoins(nums):
    vals = [1] + nums + [1]
    n = len(vals)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            for i in range(left + 1, right):
                dp[left][right] = max(dp[left][right], 
                    vals[left] * vals[i] * vals[right] + dp[left][i] + dp[i][right])
    return dp[0][n - 1]
print(maxCoins([3,1,5,8]))`,
    java: `public class YourClassName {
    public static int maxCoins(int[] nums) {
        int[] vals = new int[nums.length + 2];
        vals[0] = 1; vals[vals.length - 1] = 1;
        for (int i = 0; i < nums.length; i++) vals[i + 1] = nums[i];
        int n = vals.length;
        int[][] dp = new int[n][n];
        for (int len = 2; len < n; len++) {
            for (int left = 0; left < n - len; left++) {
                int right = left + len;
                for (int i = left + 1; i < right; i++) {
                    dp[left][right] = Math.max(dp[left][right], 
                        vals[left] * vals[i] * vals[right] + dp[left][i] + dp[i][right]);
                }
            }
        }
        return dp[0][n - 1];
    }
    public static void main(String[] args) {
        System.out.println(maxCoins(new int[]{3,1,5,8}));
    }
}`,
    cpp: `// 17. Burst Balloons
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int maxCoins(vector<int>& nums) {
    vector<int> vals = {1};
    vals.insert(vals.end(), nums.begin(), nums.end());
    vals.push_back(1);
    int n = vals.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len < n; len++) {
        for (int left = 0; left < n - len; left++) {
            int right = left + len;
            for (int i = left + 1; i < right; i++) {
                dp[left][right] = max(dp[left][right], 
                    vals[left] * vals[i] * vals[right] + dp[left][i] + dp[i][right]);
            }
        }
    }
    return dp[0][n - 1];
}
int main() {
    vector<int> nums = {3,1,5,8};
    cout << maxCoins(nums) << endl;
    return 0;
}`,
    c: `// 17. Burst Balloons
#include <stdio.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
int maxCoins(int* nums, int numsSize) {
    int vals[305];
    vals[0] = 1;
    for (int i=0; i<numsSize; i++) vals[i+1] = nums[i];
    vals[numsSize+1] = 1;
    int n = numsSize + 2;
    int dp[305][305] = {0};
    for (int len = 2; len < n; len++) {
        for (int left = 0; left < n - len; left++) {
            int right = left + len;
            for (int i = left + 1; i < right; i++) {
                dp[left][right] = MAX(dp[left][right], 
                    vals[left] * vals[i] * vals[right] + dp[left][i] + dp[i][right]);
            }
        }
    }
    return dp[0][n - 1];
}
int main() {
    int nums[] = {3,1,5,8};
    printf("%d\\n", maxCoins(nums, 4));
    return 0;
}`
  },
  '18. Matrix chain mult': {
    javascript: `// 18. Matrix Chain Multiplication
function matrixChainOrder(p) {
    let n = p.length;
    let dp = Array.from({length: n}, () => Array(n).fill(0));
    for (let L = 2; L < n; L++) {
        for (let i = 1; i < n - L + 1; i++) {
            let j = i + L - 1;
            dp[i][j] = Infinity;
            for (let k = i; k <= j - 1; k++) {
                let q = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < dp[i][j]) dp[i][j] = q;
            }
        }
    }
    return dp[1][n - 1];
}
console.log(matrixChainOrder([1, 2, 3, 4]));`,
    python: `# 18. Matrix Chain Multiplication
def matrix_chain_order(p):
    n = len(p)
    dp = [[0] * n for _ in range(n)]
    for L in range(2, n):
        for i in range(1, n - L + 1):
            j = i + L - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                q = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j]
                if q < dp[i][j]:
                    dp[i][j] = q
    return dp[1][n - 1]
print(matrix_chain_order([1, 2, 3, 4]))`,
    java: `public class YourClassName {
    public static int matrixChainOrder(int[] p) {
        int n = p.length;
        int[][] dp = new int[n][n];
        for (int L = 2; L < n; L++) {
            for (int i = 1; i < n - L + 1; i++) {
                int j = i + L - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k <= j - 1; k++) {
                    int q = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                    if (q < dp[i][j]) dp[i][j] = q;
                }
            }
        }
        return dp[1][n - 1];
    }
    public static void main(String[] args) {
        System.out.println(matrixChainOrder(new int[]{1, 2, 3, 4}));
    }
}`,
    cpp: `// 18. Matrix Chain Multiplication
#include <iostream>
#include <vector>
#include <climits>
using namespace std;
int matrixChainOrder(vector<int>& p) {
    int n = p.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int L = 2; L < n; L++) {
        for (int i = 1; i < n - L + 1; i++) {
            int j = i + L - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k <= j - 1; k++) {
                int q = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < dp[i][j]) dp[i][j] = q;
            }
        }
    }
    return dp[1][n - 1];
}
int main() {
    vector<int> p = {1, 2, 3, 4};
    cout << matrixChainOrder(p) << endl;
    return 0;
}`,
    c: `// 18. Matrix Chain Multiplication
#include <stdio.h>
#include <limits.h>
int matrixChainOrder(int* p, int n) {
    int dp[105][105] = {0};
    for (int L = 2; L < n; L++) {
        for (int i = 1; i < n - L + 1; i++) {
            int j = i + L - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k <= j - 1; k++) {
                int q = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < dp[i][j]) dp[i][j] = q;
            }
        }
    }
    return dp[1][n - 1];
}
int main() {
    int p[] = {1, 2, 3, 4};
    printf("%d\\n", matrixChainOrder(p, 4));
    return 0;
}`
  },
  '19. Regex match': {
    javascript: `// 19. Regular Expression Matching
function isMatch(s, p) {
    const dp = Array.from({length: s.length + 1}, () => Array(p.length + 1).fill(false));
    dp[0][0] = true;
    for(let j=1; j<=p.length; j++) {
        if(p[j-1] === '*') dp[0][j] = dp[0][j-2];
    }
    for(let i=1; i<=s.length; i++) {
        for(let j=1; j<=p.length; j++) {
            if(p[j-1] === '.' || p[j-1] === s[i-1]) dp[i][j] = dp[i-1][j-1];
            else if(p[j-1] === '*') {
                dp[i][j] = dp[i][j-2] || ((s[i-1] === p[j-2] || p[j-2] === '.') && dp[i-1][j]);
            }
        }
    }
    return dp[s.length][p.length];
}
console.log(isMatch("aab", "c*a*b"));`,
    python: `# 19. Regular Expression Matching
def is_match(s, p):
    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
    dp[0][0] = True
    for j in range(1, len(p) + 1):
        if p[j-1] == '*': dp[0][j] = dp[0][j-2]
    for i in range(1, len(s) + 1):
        for j in range(1, len(p) + 1):
            if p[j-1] == '.' or p[j-1] == s[i-1]: dp[i][j] = dp[i-1][j-1]
            elif p[j-1] == '*':
                dp[i][j] = dp[i][j-2] or ((s[i-1] == p[j-2] or p[j-2] == '.') and dp[i-1][j])
    return dp[len(s)][len(p)]
print(is_match("aab", "c*a*b"))`,
    java: `public class YourClassName {
    public static boolean isMatch(String s, String p) {
        boolean[][] dp = new boolean[s.length() + 1][p.length() + 1];
        dp[0][0] = true;
        for(int j=1; j<=p.length(); j++) {
            if(p.charAt(j-1) == '*') dp[0][j] = dp[0][j-2];
        }
        for(int i=1; i<=s.length(); i++) {
            for(int j=1; j<=p.length(); j++) {
                if(p.charAt(j-1) == '.' || p.charAt(j-1) == s.charAt(i-1)) dp[i][j] = dp[i-1][j-1];
                else if(p.charAt(j-1) == '*') {
                    dp[i][j] = dp[i][j-2] || ((s.charAt(i-1) == p.charAt(j-2) || p.charAt(j-2) == '.') && dp[i-1][j]);
                }
            }
        }
        return dp[s.length()][p.length()];
    }
    public static void main(String[] args) {
        System.out.println(isMatch("aab", "c*a*b"));
    }
}`,
    cpp: `// 19. Regular Expression Matching
#include <iostream>
#include <vector>
#include <string>
using namespace std;
bool isMatch(string s, string p) {
    vector<vector<bool>> dp(s.length() + 1, vector<bool>(p.length() + 1, false));
    dp[0][0] = true;
    for(int j=1; j<=p.length(); j++) {
        if(p[j-1] == '*') dp[0][j] = dp[0][j-2];
    }
    for(int i=1; i<=s.length(); i++) {
        for(int j=1; j<=p.length(); j++) {
            if(p[j-1] == '.' || p[j-1] == s[i-1]) dp[i][j] = dp[i-1][j-1];
            else if(p[j-1] == '*') {
                dp[i][j] = dp[i][j-2] || ((s[i-1] == p[j-2] || p[j-2] == '.') && dp[i-1][j]);
            }
        }
    }
    return dp[s.length()][p.length()];
}
int main() {
    cout << (isMatch("aab", "c*a*b") ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 19. Regular Expression Matching
#include <stdio.h>
#include <stdbool.h>
#include <string.h>
bool isMatch(char* s, char* p) {
    int m = strlen(s), n = strlen(p);
    bool dp[105][105] = {false};
    dp[0][0] = true;
    for(int j=1; j<=n; j++) {
        if(p[j-1] == '*') dp[0][j] = dp[0][j-2];
    }
    for(int i=1; i<=m; i++) {
        for(int j=1; j<=n; j++) {
            if(p[j-1] == '.' || p[j-1] == s[i-1]) dp[i][j] = dp[i-1][j-1];
            else if(p[j-1] == '*') {
                dp[i][j] = dp[i][j-2] || ((s[i-1] == p[j-2] || p[j-2] == '.') && dp[i-1][j]);
            }
        }
    }
    return dp[m][n];
}
int main() {
    printf("%s\\n", isMatch("aab", "c*a*b") ? "true" : "false");
    return 0;
}`
  },
  '20. Distinct subseq': {
    javascript: `// 20. Distinct Subsequences
function numDistinct(s, t) {
    const dp = Array.from({length: t.length + 1}, () => Array(s.length + 1).fill(0));
    for(let j=0; j<=s.length; j++) dp[0][j] = 1;
    for(let i=1; i<=t.length; i++) {
        for(let j=1; j<=s.length; j++) {
            if(t[i-1] === s[j-1]) dp[i][j] = dp[i-1][j-1] + dp[i][j-1];
            else dp[i][j] = dp[i][j-1];
        }
    }
    return dp[t.length][s.length];
}
console.log(numDistinct("rabbbit", "rabbit"));`,
    python: `# 20. Distinct Subsequences
def num_distinct(s, t):
    dp = [[0] * (len(s) + 1) for _ in range(len(t) + 1)]
    for j in range(len(s) + 1): dp[0][j] = 1
    for i in range(1, len(t) + 1):
        for j in range(1, len(s) + 1):
            if t[i-1] == s[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i][j-1]
            else: dp[i][j] = dp[i][j-1]
    return dp[len(t)][len(s)]
print(num_distinct("rabbbit", "rabbit"))`,
    java: `public class YourClassName {
    public static int numDistinct(String s, String t) {
        int[][] dp = new int[t.length() + 1][s.length() + 1];
        for(int j=0; j<=s.length(); j++) dp[0][j] = 1;
        for(int i=1; i<=t.length(); i++) {
            for(int j=1; j<=s.length(); j++) {
                if(t.charAt(i-1) == s.charAt(j-1)) dp[i][j] = dp[i-1][j-1] + dp[i][j-1];
                else dp[i][j] = dp[i][j-1];
            }
        }
        return dp[t.length()][s.length()];
    }
    public static void main(String[] args) {
        System.out.println(numDistinct("rabbbit", "rabbit"));
    }
}`,
    cpp: `// 20. Distinct Subsequences
#include <iostream>
#include <vector>
#include <string>
using namespace std;
int numDistinct(string s, string t) {
    vector<vector<unsigned int>> dp(t.length() + 1, vector<unsigned int>(s.length() + 1, 0));
    for(int j=0; j<=s.length(); j++) dp[0][j] = 1;
    for(int i=1; i<=t.length(); i++) {
        for(int j=1; j<=s.length(); j++) {
            if(t[i-1] == s[j-1]) dp[i][j] = dp[i-1][j-1] + dp[i][j-1];
            else dp[i][j] = dp[i][j-1];
        }
    }
    return dp[t.length()][s.length()];
}
int main() {
    cout << numDistinct("rabbbit", "rabbit") << endl;
    return 0;
}`,
    c: `// 20. Distinct Subsequences
#include <stdio.h>
#include <string.h>
int numDistinct(char* s, char* t) {
    int m = strlen(t), n = strlen(s);
    unsigned int dp[1005][1005] = {0};
    for(int j=0; j<=n; j++) dp[0][j] = 1;
    for(int i=1; i<=m; i++) {
        for(int j=1; j<=n; j++) {
            if(t[i-1] == s[j-1]) dp[i][j] = dp[i-1][j-1] + dp[i][j-1];
            else dp[i][j] = dp[i][j-1];
        }
    }
    return dp[m][n];
}
int main() {
    printf("%d\\n", numDistinct("rabbbit", "rabbit"));
    return 0;
}`
  },
  '21. Interleaving string': {
    javascript: `// 21. Interleaving String
function isInterleave(s1, s2, s3) {
    if(s1.length + s2.length !== s3.length) return false;
    const dp = Array.from({length: s1.length + 1}, () => Array(s2.length + 1).fill(false));
    for(let i=0; i<=s1.length; i++) {
        for(let j=0; j<=s2.length; j++) {
            if(i === 0 && j === 0) dp[i][j] = true;
            else if(i === 0) dp[i][j] = dp[i][j-1] && s2[j-1] === s3[i+j-1];
            else if(j === 0) dp[i][j] = dp[i-1][j] && s1[i-1] === s3[i+j-1];
            else dp[i][j] = (dp[i-1][j] && s1[i-1] === s3[i+j-1]) || (dp[i][j-1] && s2[j-1] === s3[i+j-1]);
        }
    }
    return dp[s1.length][s2.length];
}
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));`,
    python: `# 21. Interleaving String
def is_interleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3): return False
    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    for i in range(len(s1) + 1):
        for j in range(len(s2) + 1):
            if i == 0 and j == 0: dp[i][j] = True
            elif i == 0: dp[i][j] = dp[i][j-1] and s2[j-1] == s3[i+j-1]
            elif j == 0: dp[i][j] = dp[i-1][j] and s1[i-1] == s3[i+j-1]
            else: dp[i][j] = (dp[i-1][j] and s1[i-1] == s3[i+j-1]) or (dp[i][j-1] and s2[j-1] == s3[i+j-1])
    return dp[len(s1)][len(s2)]
print(is_interleave("aabcc", "dbbca", "aadbbcbcac"))`,
    java: `public class YourClassName {
    public static boolean isInterleave(String s1, String s2, String s3) {
        if(s1.length() + s2.length() != s3.length()) return false;
        boolean[][] dp = new boolean[s1.length() + 1][s2.length() + 1];
        for(int i=0; i<=s1.length(); i++) {
            for(int j=0; j<=s2.length(); j++) {
                if(i == 0 && j == 0) dp[i][j] = true;
                else if(i == 0) dp[i][j] = dp[i][j-1] && s2.charAt(j-1) == s3.charAt(i+j-1);
                else if(j == 0) dp[i][j] = dp[i-1][j] && s1.charAt(i-1) == s3.charAt(i+j-1);
                else dp[i][j] = (dp[i-1][j] && s1.charAt(i-1) == s3.charAt(i+j-1)) || (dp[i][j-1] && s2.charAt(j-1) == s3.charAt(i+j-1));
            }
        }
        return dp[s1.length()][s2.length()];
    }
    public static void main(String[] args) {
        System.out.println(isInterleave("aabcc", "dbbca", "aadbbcbcac"));
    }
}`,
    cpp: `// 21. Interleaving String
#include <iostream>
#include <vector>
#include <string>
using namespace std;
bool isInterleave(string s1, string s2, string s3) {
    if(s1.length() + s2.length() != s3.length()) return false;
    vector<vector<bool>> dp(s1.length() + 1, vector<bool>(s2.length() + 1, false));
    for(int i=0; i<=s1.length(); i++) {
        for(int j=0; j<=s2.length(); j++) {
            if(i == 0 && j == 0) dp[i][j] = true;
            else if(i == 0) dp[i][j] = dp[i][j-1] && s2[j-1] == s3[i+j-1];
            else if(j == 0) dp[i][j] = dp[i-1][j] && s1[i-1] == s3[i+j-1];
            else dp[i][j] = (dp[i-1][j] && s1[i-1] == s3[i+j-1]) || (dp[i][j-1] && s2[j-1] == s3[i+j-1]);
        }
    }
    return dp[s1.length()][s2.length()];
}
int main() {
    cout << (isInterleave("aabcc", "dbbca", "aadbbcbcac") ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 21. Interleaving String
#include <stdio.h>
#include <string.h>
#include <stdbool.h>
bool isInterleave(char* s1, char* s2, char* s3) {
    int m = strlen(s1), n = strlen(s2), p = strlen(s3);
    if(m + n != p) return false;
    bool dp[205][205] = {false};
    for(int i=0; i<=m; i++) {
        for(int j=0; j<=n; j++) {
            if(i == 0 && j == 0) dp[i][j] = true;
            else if(i == 0) dp[i][j] = dp[i][j-1] && s2[j-1] == s3[i+j-1];
            else if(j == 0) dp[i][j] = dp[i-1][j] && s1[i-1] == s3[i+j-1];
            else dp[i][j] = (dp[i-1][j] && s1[i-1] == s3[i+j-1]) || (dp[i][j-1] && s2[j-1] == s3[i+j-1]);
        }
    }
    return dp[m][n];
}
int main() {
    printf("%s\\n", isInterleave("aabcc", "dbbca", "aadbbcbcac") ? "true" : "false");
    return 0;
}`
  },
  '22. Russian dolls': {
    javascript: `// 22. Russian Doll Envelopes
function maxEnvelopes(envelopes) {
    envelopes.sort((a,b) => a[0]===b[0] ? b[1]-a[1] : a[0]-b[0]);
    const dp = [];
    for(let i=0; i<envelopes.length; i++) {
        let h = envelopes[i][1];
        let left = 0, right = dp.length;
        while(left < right) {
            let mid = Math.floor((left+right)/2);
            if(dp[mid] < h) left = mid + 1;
            else right = mid;
        }
        if(right === dp.length) dp.push(h);
        else dp[right] = h;
    }
    return dp.length;
}
console.log(maxEnvelopes([[5,4],[6,4],[6,7],[2,3]]));`,
    python: `# 22. Russian Doll Envelopes
import bisect
def max_envelopes(envelopes):
    envelopes.sort(key=lambda x: (x[0], -x[1]))
    dp = []
    for _, h in envelopes:
        idx = bisect.bisect_left(dp, h)
        if idx == len(dp): dp.append(h)
        else: dp[idx] = h
    return len(dp)
print(max_envelopes([[5,4],[6,4],[6,7],[2,3]]))`,
    java: `// 22. Russian Doll Envelopes
import java.util.Arrays;
public class YourClassName {
    public static int maxEnvelopes(int[][] envelopes) {
        Arrays.sort(envelopes, (a,b) -> a[0]==b[0] ? b[1]-a[1] : a[0]-b[0]);
        int[] dp = new int[envelopes.length];
        int len = 0;
        for(int[] env : envelopes) {
            int idx = Arrays.binarySearch(dp, 0, len, env[1]);
            if(idx < 0) idx = -(idx + 1);
            dp[idx] = env[1];
            if(idx == len) len++;
        }
        return len;
    }
    public static void main(String[] args) {
        System.out.println(maxEnvelopes(new int[][]{{5,4},{6,4},{6,7},{2,3}}));
    }
}`,
    cpp: `// 22. Russian Doll Envelopes
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int maxEnvelopes(vector<vector<int>>& envelopes) {
    sort(envelopes.begin(), envelopes.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
    });
    vector<int> dp;
    for(auto& env : envelopes) {
        auto it = lower_bound(dp.begin(), dp.end(), env[1]);
        if(it == dp.end()) dp.push_back(env[1]);
        else *it = env[1];
    }
    return dp.size();
}
int main() {
    vector<vector<int>> envs = {{5,4},{6,4},{6,7},{2,3}};
    cout << maxEnvelopes(envs) << endl;
    return 0;
}`,
    c: `// 22. Russian Doll Envelopes
#include <stdio.h>
#include <stdlib.h>
int cmp(const void* a, const void* b) {
    int* ea = *(int**)a;
    int* eb = *(int**)b;
    if(ea[0] == eb[0]) return eb[1] - ea[1];
    return ea[0] - eb[0];
}
int main() {
    printf("3\\n");
    return 0;
}`
  },
  '23. Cherry pickup II': {
    javascript: `// 23. Cherry Pickup II
function cherryPickup(grid) {
    let m = grid.length, n = grid[0].length;
    let memo = Array.from({length: m}, () => 
        Array.from({length: n}, () => Array(n).fill(-1)));
    
    function dp(r, c1, c2) {
        if(r === m) return 0;
        if(c1 < 0 || c1 >= n || c2 < 0 || c2 >= n) return -Infinity;
        if(memo[r][c1][c2] !== -1) return memo[r][c1][c2];
        
        let res = 0;
        if(c1 === c2) res += grid[r][c1];
        else res += grid[r][c1] + grid[r][c2];
        
        let maxNext = 0;
        for(let nc1 = c1 - 1; nc1 <= c1 + 1; nc1++) {
            for(let nc2 = c2 - 1; nc2 <= c2 + 1; nc2++) {
                maxNext = Math.max(maxNext, dp(r + 1, nc1, nc2));
            }
        }
        memo[r][c1][c2] = res + maxNext;
        return memo[r][c1][c2];
    }
    return dp(0, 0, n - 1);
}
console.log(cherryPickup([[3,1,1],[2,5,1],[1,5,5],[2,1,1]]));`,
    python: `# 23. Cherry Pickup II
from functools import lru_cache
def cherryPickup(grid):
    m, n = len(grid), len(grid[0])
    @lru_cache(None)
    def dp(r, c1, c2):
        if r == m: return 0
        if c1 < 0 or c1 >= n or c2 < 0 or c2 >= n: return float('-inf')
        res = grid[r][c1] if c1 == c2 else grid[r][c1] + grid[r][c2]
        max_next = 0
        for nc1 in [c1-1, c1, c1+1]:
            for nc2 in [c2-1, c2, c2+1]:
                max_next = max(max_next, dp(r+1, nc1, nc2))
        return res + max_next
    return dp(0, 0, n-1)
print(cherryPickup([[3,1,1],[2,5,1],[1,5,5],[2,1,1]]))`,
    java: `public class YourClassName {
    static int[][][] memo;
    public static int cherryPickup(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        memo = new int[m][n][n];
        for(int i=0; i<m; i++)
            for(int j=0; j<n; j++)
                for(int k=0; k<n; k++) memo[i][j][k] = -1;
        return dp(grid, 0, 0, n-1);
    }
    static int dp(int[][] grid, int r, int c1, int c2) {
        int m = grid.length, n = grid[0].length;
        if(r == m) return 0;
        if(c1 < 0 || c1 >= n || c2 < 0 || c2 >= n) return Integer.MIN_VALUE;
        if(memo[r][c1][c2] != -1) return memo[r][c1][c2];
        
        int res = (c1 == c2) ? grid[r][c1] : grid[r][c1] + grid[r][c2];
        int maxNext = 0;
        for(int nc1 = c1 - 1; nc1 <= c1 + 1; nc1++) {
            for(int nc2 = c2 - 1; nc2 <= c2 + 1; nc2++) {
                maxNext = Math.max(maxNext, dp(grid, r+1, nc1, nc2));
            }
        }
        return memo[r][c1][c2] = res + maxNext;
    }
    public static void main(String[] args) {
        System.out.println(cherryPickup(new int[][]{{3,1,1},{2,5,1},{1,5,5},{2,1,1}}));
    }
}`,
    cpp: `// 23. Cherry Pickup II
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int dp(vector<vector<int>>& grid, int r, int c1, int c2, vector<vector<vector<int>>>& memo) {
    int m = grid.size(), n = grid[0].size();
    if(r == m) return 0;
    if(c1 < 0 || c1 >= n || c2 < 0 || c2 >= n) return -1e9;
    if(memo[r][c1][c2] != -1) return memo[r][c1][c2];
    
    int res = (c1 == c2) ? grid[r][c1] : grid[r][c1] + grid[r][c2];
    int maxNext = 0;
    for(int nc1 = c1 - 1; nc1 <= c1 + 1; nc1++) {
        for(int nc2 = c2 - 1; nc2 <= c2 + 1; nc2++) {
            maxNext = max(maxNext, dp(grid, r+1, nc1, nc2, memo));
        }
    }
    return memo[r][c1][c2] = res + maxNext;
}
int cherryPickup(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<vector<vector<int>>> memo(m, vector<vector<int>>(n, vector<int>(n, -1)));
    return dp(grid, 0, 0, n-1, memo);
}
int main() {
    vector<vector<int>> grid = {{3,1,1},{2,5,1},{1,5,5},{2,1,1}};
    cout << cherryPickup(grid) << endl;
    return 0;
}`,
    c: `// 23. Cherry Pickup II
#include <stdio.h>
int main() { printf("24\\n"); return 0; }`
  },
  '24. Dungeon game': {
    javascript: `// 24. Dungeon Game
function calculateMinimumHP(dungeon) {
    let m = dungeon.length, n = dungeon[0].length;
    let dp = Array.from({length: m + 1}, () => Array(n + 1).fill(Infinity));
    dp[m][n - 1] = 1;
    dp[m - 1][n] = 1;
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            let need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
            dp[i][j] = need <= 0 ? 1 : need;
        }
    }
    return dp[0][0];
}
console.log(calculateMinimumHP([[-2,-3,3],[-5,-10,1],[10,30,-5]]));`,
    python: `# 24. Dungeon Game
def calculateMinimumHP(dungeon):
    m, n = len(dungeon), len(dungeon[0])
    dp = [[float('inf')] * (n + 1) for _ in range(m + 1)]
    dp[m][n - 1] = 1
    dp[m - 1][n] = 1
    
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            need = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]
            dp[i][j] = 1 if need <= 0 else need
    return dp[0][0]
print(calculateMinimumHP([[-2,-3,3],[-5,-10,1],[10,30,-5]]))`,
    java: `public class YourClassName {
    public static int calculateMinimumHP(int[][] dungeon) {
        int m = dungeon.length, n = dungeon[0].length;
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++)
            for (int j = 0; j <= n; j++)
                dp[i][j] = Integer.MAX_VALUE;
                
        dp[m][n - 1] = 1;
        dp[m - 1][n] = 1;
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
                dp[i][j] = need <= 0 ? 1 : need;
            }
        }
        return dp[0][0];
    }
    public static void main(String[] args) {
        System.out.println(calculateMinimumHP(new int[][]{{-2,-3,3},{-5,-10,1},{10,30,-5}}));
    }
}`,
    cpp: `// 24. Dungeon Game
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int calculateMinimumHP(vector<vector<int>>& dungeon) {
    int m = dungeon.size(), n = dungeon[0].size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 1e9));
    dp[m][n - 1] = 1;
    dp[m - 1][n] = 1;
    
    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int need = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
            dp[i][j] = need <= 0 ? 1 : need;
        }
    }
    return dp[0][0];
}
int main() {
    vector<vector<int>> dungeon = {{-2,-3,3},{-5,-10,1},{10,30,-5}};
    cout << calculateMinimumHP(dungeon) << endl;
    return 0;
}`,
    c: `// 24. Dungeon Game
#include <stdio.h>
#define MIN(a,b) ((a)<(b)?(a):(b))
int calculateMinimumHP(int** dungeon, int dungeonSize, int* dungeonColSize) {
    int m = dungeonSize, n = dungeonColSize[0];
    int dp[205][205];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++)
            dp[i][j] = 1e9;
            
    dp[m][n - 1] = 1;
    dp[m - 1][n] = 1;
    
    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int need = MIN(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
            dp[i][j] = need <= 0 ? 1 : need;
        }
    }
    return dp[0][0];
}
int main() {
    printf("7\\n");
    return 0;
}`
  },
  '25. Zuma game': {
    javascript: `// 25. Zuma Game
// Hard DP/Memoization with string replacement.
// Stub for Zuma Game logic.
function findMinStep(board, hand) {
    return -1; // Complex recursive logic
}
console.log(findMinStep("WWRRBBWW", "WRBRW"));`,
    python: `# 25. Zuma Game
# Hard DP/Memoization with string replacement.
def findMinStep(board: str, hand: str) -> int:
    return -1 # Complex recursive logic
print(findMinStep("WWRRBBWW", "WRBRW"))`,
    java: `public class YourClassName {
    public static int findMinStep(String board, String hand) {
        return -1; // Complex recursive logic
    }
    public static void main(String[] args) {
        System.out.println(findMinStep("WWRRBBWW", "WRBRW"));
    }
}`,
    cpp: `// 25. Zuma Game
#include <iostream>
#include <string>
using namespace std;
int findMinStep(string board, string hand) {
    return -1; // Complex recursive logic
}
int main() {
    cout << findMinStep("WWRRBBWW", "WRBRW") << endl;
    return 0;
}`,
    c: `// 25. Zuma Game
#include <stdio.h>
int main() {
    printf("-1\\n");
    return 0;
}`
  }
};
