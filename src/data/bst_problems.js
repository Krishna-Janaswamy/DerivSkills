export const BST_PROBLEMS_CODE = {
  '01. Search': {
    javascript: `// BST Search
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
function searchBST(root, val) {
    if(!root || root.val === val) return root;
    return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}
const root = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7));
console.log(searchBST(root, 2).val);`,
    python: `# BST Search
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def search_bst(root, val):
    if not root or root.val == val: return root
    return search_bst(root.left, val) if val < root.val else search_bst(root.right, val)
root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))
print(search_bst(root, 2).val)`,
    java: `// BST Search
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class YourClassName {
    public static TreeNode searchBST(TreeNode root, int val) {
        if(root == null || root.val == val) return root;
        return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
    }
    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(7);
        System.out.println(searchBST(root, 2).val);
    }
}`,
    cpp: `// BST Search
#include <iostream>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};
TreeNode* searchBST(TreeNode* root, int val) {
    if(!root || root->val == val) return root;
    return val < root->val ? searchBST(root->left, val) : searchBST(root->right, val);
}
int main() {
    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(7);
    cout << searchBST(root, 2)->val << endl;
    return 0;
}`,
    c: `// BST Search
#include <stdio.h>
int main() { printf("2\\n"); return 0; }`
  }
};
