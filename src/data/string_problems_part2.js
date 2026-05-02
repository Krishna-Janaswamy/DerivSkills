export const STRING_PROBLEMS_PART2 = {
  // --- STRINGS BASICS & PATTERNS ---
  'String Declaration': {
    javascript: `// String Declaration
let s1 = "Hello";
let s2 = 'World';
let s3 = \`\${s1} \${s2}\`;
console.log(s3);`,
    python: `# String Declaration
s1 = "Hello"
s2 = 'World'
s3 = f"{s1} {s2}"
print(s3)`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "World";
        System.out.println(s1 + " " + s2);
    }
}`,
    cpp: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s1 = "Hello";
    string s2 = "World";
    cout << s1 + " " + s2 << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    char s1[] = "Hello";
    char *s2 = "World";
    printf("%s %s\\n", s1, s2);
    return 0;
}`
  },
  'String Concatenation': {
    javascript: `let a = "Foo", b = "Bar";
console.log(a + b);
console.log(a.concat(b));`,
    python: `a, b = "Foo", "Bar"
print(a + b)
print("".join([a, b]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        String a = "Foo", b = "Bar";
        System.out.println(a + b);
        System.out.println(a.concat(b));
    }
}`,
    cpp: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string a = "Foo", b = "Bar";
    cout << a + b << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <string.h>
int main() {
    char dest[20] = "Foo";
    strcat(dest, "Bar");
    printf("%s\\n", dest);
    return 0;
}`
  },
  'Substring': {
    javascript: `let s = "Hello World";
console.log(s.substring(0, 5));
console.log(s.slice(6));`,
    python: `s = "Hello World"
print(s[0:5])
print(s[6:])`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        String s = "Hello World";
        System.out.println(s.substring(0, 5));
        System.out.println(s.substring(6));
    }
}`,
    cpp: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "Hello World";
    cout << s.substr(0, 5) << endl;
    cout << s.substr(6) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <string.h>
int main() {
    char s[] = "Hello World", sub[6];
    strncpy(sub, s, 5); sub[5] = '\\0';
    printf("%s\\n", sub);
    printf("%s\\n", s + 6);
    return 0;
}`
  },
  'Pattern: Two Pointer': {
    javascript: `function isPalindrome(s) {
    let l=0, r=s.length-1;
    while(l<r) { if(s[l++] !== s[r--]) return false; }
    return true;
}
console.log(isPalindrome("racecar"));`,
    python: `def is_palindrome(s):
    l, r = 0, len(s)-1
    while l < r:
        if s[l] != s[r]: return False
        l+=1; r-=1
    return True
print(is_palindrome("racecar"))`,
    java: `public class YourClassName {
    public static boolean isPalindrome(String s) {
        int l=0, r=s.length()-1;
        while(l<r) { if(s.charAt(l++) != s.charAt(r--)) return false; }
        return true;
    }
    public static void main(String[] args) { System.out.println(isPalindrome("racecar")); }
}`,
    cpp: `#include <iostream>
using namespace std;
bool isPalindrome(string s) {
    int l=0, r=s.size()-1;
    while(l<r) { if(s[l++] != s[r--]) return false; }
    return true;
}
int main() { cout << isPalindrome("racecar") << endl; return 0; }`,
    c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>
bool isPalindrome(char* s) {
    int l=0, r=strlen(s)-1;
    while(l<r) { if(s[l++] != s[r--]) return false; }
    return true;
}
int main() { printf("%d\\n", isPalindrome("racecar")); return 0; }`
  },
  'Pattern: Sliding Window': {
    javascript: `function longestUnique(s) {
    let max=0, l=0, set=new Set();
    for(let r=0; r<s.length; r++) {
        while(set.has(s[r])) set.delete(s[l++]);
        set.add(s[r]);
        max = Math.max(max, r-l+1);
    }
    return max;
}
console.log(longestUnique("abcabcbb"));`,
    python: `def longest_unique(s):
    max_len, l, seen = 0, 0, set()
    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l]); l+=1
        seen.add(s[r])
        max_len = max(max_len, r-l+1)
    return max_len
print(longest_unique("abcabcbb"))`,
    java: `import java.util.HashSet;
public class YourClassName {
    public static void main(String[] args) {
        String s = "abcabcbb";
        int max=0, l=0;
        HashSet<Character> set = new HashSet<>();
        for(int r=0; r<s.length(); r++) {
            while(set.contains(s.charAt(r))) set.remove(s.charAt(l++));
            set.add(s.charAt(r));
            max = Math.max(max, r-l+1);
        }
        System.out.println(max);
    }
}`,
    cpp: `#include <iostream>
#include <unordered_set>
#include <algorithm>
using namespace std;
int main() {
    string s = "abcabcbb"; int max_len=0, l=0;
    unordered_set<char> set;
    for(int r=0; r<s.size(); r++) {
        while(set.count(s[r])) set.erase(s[l++]);
        set.insert(s[r]);
        max_len = max(max_len, r-l+1);
    }
    cout << max_len << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <string.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
int main() {
    char* s = "abcabcbb";
    int map[256]={0}, max_len=0, l=0, r=0;
    while(s[r]) {
        while(map[s[r]]) map[s[l++]]--;
        map[s[r]]++;
        max_len = MAX(max_len, r-l+1);
        r++;
    }
    printf("%d\\n", max_len);
    return 0;
}`
  },
  'Pattern: Hashing/Frequency': {
    javascript: `function charFreq(s) {
    let freq = {};
    for(let c of s) freq[c] = (freq[c]||0) + 1;
    console.log(freq);
}
charFreq("hello");`,
    python: `def char_freq(s):
    freq = {}
    for c in s: freq[c] = freq.get(c, 0) + 1
    print(freq)
char_freq("hello")`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] freq = new int[256];
        for(char c : "hello".toCharArray()) freq[c]++;
        for(int i=0; i<256; i++) if(freq[i]>0) System.out.println((char)i + " " + freq[i]);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    int freq[256]={0};
    for(char c : string("hello")) freq[c]++;
    for(int i=0; i<256; i++) if(freq[i]) cout << (char)i << " " << freq[i] << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int freq[256]={0}; char* s="hello";
    for(int i=0; s[i]; i++) freq[s[i]]++;
    for(int i=0; i<256; i++) if(freq[i]) printf("%c %d\\n", i, freq[i]);
    return 0;
}`
  },
  'Pattern: String Reversal': {
    javascript: `let s = "hello";
console.log(s.split('').reverse().join(''));`,
    python: `s = "hello"
print(s[::-1])`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println(new StringBuilder("hello").reverse().toString());
    }
}`,
    cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    string s = "hello"; reverse(s.begin(), s.end());
    cout << s << endl; return 0;
}`,
    c: `#include <stdio.h>
#include <string.h>
int main() {
    char s[] = "hello"; int l=0, r=strlen(s)-1;
    while(l<r) { char t=s[l]; s[l]=s[r]; s[r]=t; l++; r--; }
    printf("%s\\n", s); return 0;
}`
  },
  'Pattern: Palindrome Check': {
    javascript: `// See Pattern: Two Pointer
function isPalindrome(s) {
    return s === s.split('').reverse().join('');
}
console.log(isPalindrome("racecar"));`,
    python: `def is_palindrome(s):
    return s == s[::-1]
print(is_palindrome("racecar"))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        String s = "racecar";
        System.out.println(s.equals(new StringBuilder(s).reverse().toString()));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Palindrome check uses Two Pointers." << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Palindrome check uses Two Pointers.\\n"); return 0; }`
  },

  // --- RE-MAPPED & MISSING TOP 20 ---
  '11. Count and Say': {
    javascript: `function countAndSay(n) {
    if(n===1) return "1";
    let s = countAndSay(n-1), res = "", count = 1;
    for(let i=0; i<s.length; i++) {
        if(s[i] === s[i+1]) count++;
        else { res += count + s[i]; count = 1; }
    }
    return res;
}
console.log(countAndSay(4));`,
    python: `def count_and_say(n):
    if n == 1: return "1"
    s, res, count = count_and_say(n-1), "", 1
    for i in range(len(s)):
        if i < len(s)-1 and s[i] == s[i+1]: count += 1
        else: res += str(count) + s[i]; count = 1
    return res
print(count_and_say(4))`,
    java: `public class YourClassName {
    public static String countAndSay(int n) {
        if(n==1) return "1";
        String s = countAndSay(n-1);
        StringBuilder res = new StringBuilder(); int count = 1;
        for(int i=0; i<s.length(); i++) {
            if(i<s.length()-1 && s.charAt(i) == s.charAt(i+1)) count++;
            else { res.append(count).append(s.charAt(i)); count = 1; }
        }
        return res.toString();
    }
    public static void main(String[] args) { System.out.println(countAndSay(4)); }
}`,
    cpp: `#include <iostream>
using namespace std;
string countAndSay(int n) {
    if(n==1) return "1";
    string s = countAndSay(n-1), res = ""; int count = 1;
    for(int i=0; i<s.size(); i++) {
        if(i<s.size()-1 && s[i] == s[i+1]) count++;
        else { res += to_string(count) + s[i]; count = 1; }
    }
    return res;
}
int main() { cout << countAndSay(4) << endl; return 0; }`,
    c: `#include <stdio.h>
int main() { printf("Count and Say requires dynamic string building.\\n"); return 0; }`
  },
  '12. Valid Parentheses': {
    javascript: `function isValid(s) {
    let stack = [];
    let map = {')':'(', '}':'{', ']':'['};
    for(let c of s) {
        if(map[c]) { if(stack.pop() !== map[c]) return false; }
        else stack.push(c);
    }
    return stack.length === 0;
}
console.log(isValid("()[]{}"));`,
    python: `def is_valid(s):
    stack, map = [], {')':'(', '}':'{', ']':'['}
    for c in s:
        if c in map:
            if not stack or stack.pop() != map[c]: return False
        else: stack.append(c)
    return not stack
print(is_valid("()[]{}"))`,
    java: `import java.util.Stack;
public class YourClassName {
    public static void main(String[] args) {
        Stack<Character> stack = new Stack<>();
        for(char c : "()[]{}".toCharArray()) {
            if(c=='(') stack.push(')');
            else if(c=='{') stack.push('}');
            else if(c=='[') stack.push(']');
            else if(stack.isEmpty() || stack.pop() != c) { System.out.println(false); return; }
        }
        System.out.println(stack.isEmpty());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<char> st;
    for(char c : string("()[]{}")) {
        if(c=='(') st.push(')'); else if(c=='{') st.push('}'); else if(c=='[') st.push(']');
        else if(st.empty() || st.top() != c) { cout << "false"; return 0; }
        else st.pop();
    }
    cout << (st.empty() ? "true" : "false"); return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Valid Parentheses uses a Stack.\\n"); return 0; }`
  },
  '13. Longest Substring Without Repeats': {
    javascript: `function lengthOfLongestSubstring(s) {
    let set = new Set(), l = 0, max = 0;
    for(let r=0; r<s.length; r++) {
        while(set.has(s[r])) set.delete(s[l++]);
        set.add(s[r]); max = Math.max(max, r-l+1);
    }
    return max;
}
console.log(lengthOfLongestSubstring("abcabcbb"));`,
    python: `def length_of_longest_substring(s):
    seen, l, mx = set(), 0, 0
    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l]); l += 1
        seen.add(s[r]); mx = max(mx, r-l+1)
    return mx
print(length_of_longest_substring("abcabcbb"))`,
    java: `import java.util.HashSet;
public class YourClassName {
    public static void main(String[] args) {
        String s = "abcabcbb";
        HashSet<Character> set = new HashSet<>();
        int l=0, max=0;
        for(int r=0; r<s.length(); r++) {
            while(set.contains(s.charAt(r))) set.remove(s.charAt(l++));
            set.add(s.charAt(r)); max = Math.max(max, r-l+1);
        }
        System.out.println(max);
    }
}`,
    cpp: `#include <iostream>
#include <unordered_set>
#include <algorithm>
using namespace std;
int main() {
    string s = "abcabcbb"; unordered_set<char> set;
    int l=0, mx=0;
    for(int r=0; r<s.size(); r++) {
        while(set.count(s[r])) set.erase(s[l++]);
        set.insert(s[r]); mx = max(mx, r-l+1);
    }
    cout << mx << endl; return 0;
}`,
    c: `#include <stdio.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
int main() {
    char* s = "abcabcbb"; int map[256]={0}, l=0, r=0, mx=0;
    while(s[r]) {
        while(map[s[r]]) map[s[l++]]--;
        map[s[r]]++; mx = MAX(mx, r-l+1); r++;
    }
    printf("%d\\n", mx); return 0;
}`
  },
  '14. Minimum Window Substring': {
    javascript: `function minWindow(s, t) {
    if(!t || !s) return "";
    let map = {}, count = t.length, minLen = Infinity, start = 0, l = 0;
    for(let c of t) map[c] = (map[c]||0) + 1;
    for(let r=0; r<s.length; r++) {
        if(map[s[r]] > 0) count--;
        if(map[s[r]] !== undefined) map[s[r]]--;
        while(count === 0) {
            if(r-l+1 < minLen) { minLen = r-l+1; start = l; }
            if(map[s[l]] !== undefined) {
                map[s[l]]++; if(map[s[l]] > 0) count++;
            }
            l++;
        }
    }
    return minLen === Infinity ? "" : s.substr(start, minLen);
}
console.log(minWindow("ADOBECODEBANC", "ABC"));`,
    python: `def min_window(s, t):
    from collections import Counter
    map, count, min_len, start, l = Counter(t), len(t), float('inf'), 0, 0
    for r in range(len(s)):
        if map[s[r]] > 0: count -= 1
        map[s[r]] -= 1
        while count == 0:
            if r-l+1 < min_len: min_len, start = r-l+1, l
            map[s[l]] += 1
            if map[s[l]] > 0: count += 1
            l += 1
    return "" if min_len == float('inf') else s[start:start+min_len]
print(min_window("ADOBECODEBANC", "ABC"))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("Minimum Window Substring uses Sliding Window and Frequency Map.");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() { cout << "Minimum Window Substring uses Sliding Window." << endl; return 0; }`,
    c: `#include <stdio.h>
int main() { printf("Minimum Window Substring.\\n"); return 0; }`
  },
  '15. Group Anagrams': {
    javascript: `function groupAnagrams(strs) {
    let map = {};
    for(let s of strs) {
        let k = s.split('').sort().join('');
        if(!map[k]) map[k] = [];
        map[k].push(s);
    }
    return Object.values(map);
}
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
    python: `def group_anagrams(strs):
    from collections import defaultdict
    map = defaultdict(list)
    for s in strs: map["".join(sorted(s))].append(s)
    return list(map.values())
print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        String[] strs = {"eat","tea","tan","ate","nat","bat"};
        HashMap<String, List<String>> map = new HashMap<>();
        for(String s : strs) {
            char[] c = s.toCharArray(); Arrays.sort(c);
            String k = new String(c);
            map.computeIfAbsent(k, x -> new ArrayList<>()).add(s);
        }
        System.out.println(map.values());
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;
int main() {
    vector<string> strs = {"eat","tea","tan","ate","nat","bat"};
    unordered_map<string, vector<string>> map;
    for(string s : strs) {
        string k = s; sort(k.begin(), k.end());
        map[k].push_back(s);
    }
    for(auto p : map) { for(string s : p.second) cout << s << " "; cout << endl; }
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Group Anagrams uses a Hash Map of Sorted Strings.\\n"); return 0; }`
  },
  '16. Longest Palindromic Substring': {
    javascript: `function longestPalindrome(s) {
    let res = "";
    function expand(l, r) {
        while(l>=0 && r<s.length && s[l]===s[r]) { l--; r++; }
        return s.slice(l+1, r);
    }
    for(let i=0; i<s.length; i++) {
        let odd = expand(i, i), even = expand(i, i+1);
        if(odd.length > res.length) res = odd;
        if(even.length > res.length) res = even;
    }
    return res;
}
console.log(longestPalindrome("babad"));`,
    python: `def longest_palindrome(s):
    res = ""
    def expand(l, r):
        while l>=0 and r<len(s) and s[l]==s[r]: l-=1; r+=1
        return s[l+1:r]
    for i in range(len(s)):
        res = max(res, expand(i,i), expand(i,i+1), key=len)
    return res
print(longest_palindrome("babad"))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("Longest Palindromic Substring uses Expand Around Center.");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() { cout << "Longest Palindromic Substring uses Expand Around Center." << endl; return 0; }`,
    c: `#include <stdio.h>
int main() { printf("Longest Palindromic Substring.\\n"); return 0; }`
  },
  '17. String Compression': {
    javascript: `function compress(chars) {
    let w = 0, r = 0;
    while(r < chars.length) {
        let c = chars[r], count = 0;
        while(r < chars.length && chars[r] === c) { r++; count++; }
        chars[w++] = c;
        if(count > 1) for(let d of String(count)) chars[w++] = d;
    }
    return w;
}
let chars = ["a","a","b","b","c","c","c"];
console.log(compress(chars), chars.slice(0, 4));`,
    python: `def compress(chars):
    w, r = 0, 0
    while r < len(chars):
        c, count = chars[r], 0
        while r < len(chars) and chars[r] == c: r+=1; count+=1
        chars[w] = c; w+=1
        if count > 1:
            for d in str(count): chars[w] = d; w+=1
    return w
chars = ["a","a","b","b","c","c","c"]
print(compress(chars))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("String Compression uses Read and Write Pointers.");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() { cout << "String Compression uses Two Pointers." << endl; return 0; }`,
    c: `#include <stdio.h>
int main() { printf("String Compression.\\n"); return 0; }`
  },
  '18. Wildcard Matching': {
    javascript: `// Wildcard Matching (LeetCode 44)
function isMatch(s, p) {
    let sIdx = 0, pIdx = 0, starIdx = -1, sTmpIdx = -1;
    while(sIdx < s.length) {
        if(pIdx < p.length && (p[pIdx] === '?' || p[pIdx] === s[sIdx])) { sIdx++; pIdx++; }
        else if(pIdx < p.length && p[pIdx] === '*') { starIdx = pIdx; sTmpIdx = sIdx; pIdx++; }
        else if(starIdx === -1) return false;
        else { pIdx = starIdx + 1; sIdx = sTmpIdx + 1; sTmpIdx = sIdx; }
    }
    while(pIdx < p.length && p[pIdx] === '*') pIdx++;
    return pIdx === p.length;
}
console.log(isMatch("adceb", "*a*b"));`,
    python: `def is_match(s, p):
    s_idx, p_idx, star_idx, s_tmp_idx = 0, 0, -1, -1
    while s_idx < len(s):
        if p_idx < len(p) and (p[p_idx] == '?' or p[p_idx] == s[s_idx]):
            s_idx += 1; p_idx += 1
        elif p_idx < len(p) and p[p_idx] == '*':
            star_idx = p_idx; s_tmp_idx = s_idx; p_idx += 1
        elif star_idx == -1: return False
        else:
            p_idx = star_idx + 1; s_idx = s_tmp_idx + 1; s_tmp_idx = s_idx
    while p_idx < len(p) and p[p_idx] == '*': p_idx += 1
    return p_idx == len(p)
print(is_match("adceb", "*a*b"))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("Wildcard Matching uses Dynamic Programming.");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() { cout << "Wildcard Matching uses DP." << endl; return 0; }`,
    c: `#include <stdio.h>
int main() { printf("Wildcard Matching uses DP.\\n"); return 0; }`
  },
  '19. RegEx Matching': {
    javascript: `// RegEx Matching (LeetCode 10)
console.log("RegEx Matching uses Dynamic Programming.");`,
    python: `print("RegEx Matching uses Dynamic Programming.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("RegEx Matching uses DP."); } }`,
    cpp: `#include <iostream>
using namespace std;
int main() { cout << "RegEx Matching uses DP." << endl; return 0; }`,
    c: `#include <stdio.h>
int main() { printf("RegEx Matching uses DP.\\n"); return 0; }`
  },
  '20. Implement strStr': {
    javascript: `function strStr(haystack, needle) {
    return haystack.indexOf(needle);
}
console.log(strStr("hello", "ll"));`,
    python: `def str_str(haystack, needle):
    return haystack.find(needle)
print(str_str("hello", "ll"))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("hello".indexOf("ll"));
    }
}`,
    cpp: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string h = "hello";
    auto pos = h.find("ll");
    if(pos != string::npos) cout << pos << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <string.h>
int main() {
    char* p = strstr("hello", "ll");
    if(p) printf("%ld\\n", p - "hello");
    return 0;
}`
  }
};
