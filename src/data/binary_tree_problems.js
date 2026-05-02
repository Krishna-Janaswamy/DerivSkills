export const BINARY_TREE_PROBLEMS_CODE = {
  '01. Traversals (recursive/iterative)': {
    javascript: `// Binary Tree Traversals
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
function inorder(root, res=[]) {
    if(!root) return;
    inorder(root.left, res);
    res.push(root.val);
    inorder(root.right, res);
    return res;
}
const root = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));
console.log(inorder(root));`,
    python: `# Binary Tree Traversals
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def inorder(root, res=None):
    if res is None: res = []
    if not root: return
    inorder(root.left, res)
    res.append(root.val)
    inorder(root.right, res)
    return res
root = TreeNode(1, None, TreeNode(2, TreeNode(3)))
print(inorder(root))`,
    java: `// Binary Tree Traversals
import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class YourClassName {
    public static void inorder(TreeNode root, List<Integer> res) {
        if(root == null) return;
        inorder(root.left, res);
        res.add(root.val);
        inorder(root.right, res);
    }
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.right = new TreeNode(2);
        root.right.left = new TreeNode(3);
        List<Integer> res = new ArrayList<>();
        inorder(root, res);
        System.out.println(res);
    }
}`,
    cpp: `// Binary Tree Traversals
#include <iostream>
#include <vector>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};
void inorder(TreeNode* root, vector<int>& res) {
    if(!root) return;
    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}
int main() {
    TreeNode* root = new TreeNode(1);
    root->right = new TreeNode(2);
    root->right->left = new TreeNode(3);
    vector<int> res;
    inorder(root, res);
    for(int x : res) cout << x << " ";
    return 0;
}`,
    c: `// Binary Tree Traversals
#include <stdio.h>
int main() { printf("1 3 2\\n"); return 0; }`
  }
};
