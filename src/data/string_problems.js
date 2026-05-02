export const STRING_PROBLEMS_CODE = {
  '01. Reverse String': {
    javascript: `// 01. Reverse string
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Test the function
const testString = "hello world";
console.log("Original:", testString);
console.log("Reversed:", reverseString(testString));`,
    python: `# 01. Reverse string
def reverse_string(s):
    return s[::-1]

test_string = "hello world"
print("Original:", test_string)
print("Reversed:", reverse_string(test_string))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        String testString = "hello world";
        StringBuilder sb = new StringBuilder(testString);
        System.out.println("Original: " + testString);
        System.out.println("Reversed: " + sb.reverse().toString());
    }
}`,
    cpp: `// 01. Reverse string
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string testString = "hello world";
    cout << "Original: " << testString << endl;
    reverse(testString.begin(), testString.end());
    cout << "Reversed: " << testString << endl;
    return 0;
}`,
    c: `// 01. Reverse string
#include <stdio.h>
#include <string.h>

int main() {
    char testString[] = "hello world";
    int n = strlen(testString);
    printf("Original: %s\\n", testString);
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        char temp = testString[i];
        testString[i] = testString[j];
        testString[j] = temp;
    }
    printf("Reversed: %s\\n", testString);
    return 0;
}`
  },
  '02. Check Palindrome': {
    javascript: `// 02. Check palindrome
function isPalindrome(str) {
    str = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    let left = 0, right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Test the function
console.log("A man, a plan, a canal: Panama ->", isPalindrome("A man, a plan, a canal: Panama"));
console.log("race a car ->", isPalindrome("race a car"));`,
    python: `# 02. Check palindrome
import re

def is_palindrome(s):
    s = re.sub(r'[^A-Za-z0-9]', '', s).lower()
    return s == s[::-1]

print("A man, a plan, a canal: Panama ->", is_palindrome("A man, a plan, a canal: Panama"))
print("race a car ->", is_palindrome("race a car"))`,
    java: `public class YourClassName {
    public static boolean isPalindrome(String s) {
        s = s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
    public static void main(String[] args) {
        System.out.println("A man, a plan, a canal: Panama -> " + isPalindrome("A man, a plan, a canal: Panama"));
        System.out.println("race a car -> " + isPalindrome("race a car"));
    }
}`,
    cpp: `// 02. Check palindrome
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (!isalnum(s[left])) left++;
        else if (!isalnum(s[right])) right--;
        else if (tolower(s[left]) != tolower(s[right])) return false;
        else { left++; right--; }
    }
    return true;
}

int main() {
    cout << "A man, a plan, a canal: Panama -> " << (isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 02. Check palindrome
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

bool isPalindrome(char* s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        if (!isalnum(s[left])) left++;
        else if (!isalnum(s[right])) right--;
        else if (tolower(s[left]) != tolower(s[right])) return false;
        else { left++; right--; }
    }
    return true;
}

int main() {
    printf("A man, a plan, a canal: Panama -> %s\\n", isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false");
    return 0;
}`
  },
  '03. Count Vowels': {
    javascript: `// 03. Count vowels
function countVowels(str) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    let count = 0;
    for (let char of str) {
        if (vowels.has(char)) count++;
    }
    return count;
}

// Test the function
const testStr = "Programming is awesome";
console.log("String:", testStr);
console.log("Vowel count:", countVowels(testStr));`,
    python: `# 03. Count vowels
def count_vowels(s):
    vowels = set('aeiouAEIOU')
    return sum(1 for char in s if char in vowels)

test_str = "Programming is awesome"
print("String:", test_str)
print("Vowel count:", count_vowels(test_str))`,
    java: `public class YourClassName {
    public static int countVowels(String str) {
        int count = 0;
        String vowels = "aeiouAEIOU";
        for (int i = 0; i < str.length(); i++) {
            if (vowels.indexOf(str.charAt(i)) != -1) count++;
        }
        return count;
    }
    public static void main(String[] args) {
        String testStr = "Programming is awesome";
        System.out.println("String: " + testStr);
        System.out.println("Vowel count: " + countVowels(testStr));
    }
}`,
    cpp: `// 03. Count vowels
#include <iostream>
#include <string>
using namespace std;

int countVowels(string str) {
    int count = 0;
    string vowels = "aeiouAEIOU";
    for (char c : str) {
        if (vowels.find(c) != string::npos) count++;
    }
    return count;
}

int main() {
    string testStr = "Programming is awesome";
    cout << "String: " << testStr << endl;
    cout << "Vowel count: " << countVowels(testStr) << endl;
    return 0;
}`,
    c: `// 03. Count vowels
#include <stdio.h>
#include <string.h>

int countVowels(const char* str) {
    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        char c = str[i];
        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u'||
            c=='A'||c=='E'||c=='I'||c=='O'||c=='U') {
            count++;
        }
    }
    return count;
}

int main() {
    const char* testStr = "Programming is awesome";
    printf("String: %s\\n", testStr);
    printf("Vowel count: %d\\n", countVowels(testStr));
    return 0;
}`
  },
  '04. Remove Duplicates': {
    javascript: `// 04. Remove duplicates from string
function removeDuplicates(str) {
    return [...new Set(str)].join('');
}

// Test the function
const testStr = "programming";
console.log("Original:", testStr);
console.log("No duplicates:", removeDuplicates(testStr));`,
    python: `# 04. Remove duplicates from string
def remove_duplicates(s):
    seen = set()
    result = []
    for char in s:
        if char not in seen:
            seen.add(char)
            result.append(char)
    return "".join(result)

test_str = "programming"
print("Original:", test_str)
print("No duplicates:", remove_duplicates(test_str))`,
    java: `// 04. Remove duplicates from string
import java.util.LinkedHashSet;

public class YourClassName {
    public static String removeDuplicates(String str) {
        LinkedHashSet<Character> set = new LinkedHashSet<>();
        for (int i = 0; i < str.length(); i++) {
            set.add(str.charAt(i));
        }
        StringBuilder sb = new StringBuilder();
        for (Character c : set) {
            sb.append(c);
        }
        return sb.toString();
    }
    public static void main(String[] args) {
        String testStr = "programming";
        System.out.println("Original: " + testStr);
        System.out.println("No duplicates: " + removeDuplicates(testStr));
    }
}`,
    cpp: `// 04. Remove duplicates from string
#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

string removeDuplicates(string str) {
    unordered_set<char> seen;
    string result = "";
    for (char c : str) {
        if (seen.find(c) == seen.end()) {
            seen.insert(c);
            result += c;
        }
    }
    return result;
}

int main() {
    string testStr = "programming";
    cout << "Original: " << testStr << endl;
    cout << "No duplicates: " << removeDuplicates(testStr) << endl;
    return 0;
}`,
    c: `// 04. Remove duplicates from string
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

void removeDuplicates(char* str) {
    bool seen[256] = {false};
    int j = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        if (!seen[(unsigned char)str[i]]) {
            seen[(unsigned char)str[i]] = true;
            str[j++] = str[i];
        }
    }
    str[j] = '\\0';
}

int main() {
    char testStr[] = "programming";
    printf("Original: %s\\n", testStr);
    removeDuplicates(testStr);
    printf("No duplicates: %s\\n", testStr);
    return 0;
}`
  },
  '05. Count Occurrences': {
    javascript: `// 05. Count occurrences of a character
function countOccurrences(str, charToFind) {
    let count = 0;
    for (let char of str) {
        if (char === charToFind) count++;
    }
    return count;
}

// Test the function
const testStr = "hello world";
console.log("String:", testStr);
console.log("Occurrences of 'l':", countOccurrences(testStr, 'l'));`,
    python: `# 05. Count occurrences of a character
def count_occurrences(s, char_to_find):
    return s.count(char_to_find)

test_str = "hello world"
print("String:", test_str)
print("Occurrences of 'l':", count_occurrences(test_str, 'l'))`,
    java: `public class YourClassName {
    public static int countOccurrences(String str, char charToFind) {
        int count = 0;
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == charToFind) count++;
        }
        return count;
    }
    public static void main(String[] args) {
        String testStr = "hello world";
        System.out.println("String: " + testStr);
        System.out.println("Occurrences of 'l': " + countOccurrences(testStr, 'l'));
    }
}`,
    cpp: `// 05. Count occurrences of a character
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string testStr = "hello world";
    char charToFind = 'l';
    int count = std::count(testStr.begin(), testStr.end(), charToFind);
    cout << "String: " << testStr << endl;
    cout << "Occurrences of 'l': " << count << endl;
    return 0;
}`,
    c: `// 05. Count occurrences of a character
#include <stdio.h>

int countOccurrences(const char* str, char charToFind) {
    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] == charToFind) count++;
    }
    return count;
}

int main() {
    const char* testStr = "hello world";
    printf("String: %s\\n", testStr);
    printf("Occurrences of 'l': %d\\n", countOccurrences(testStr, 'l'));
    return 0;
}`
  },
  '06. Check Anagram': {
    javascript: `// 06. Check if two strings are anagrams
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
}

// Test the function
console.log("anagram & nagaram ->", isAnagram("anagram", "nagaram"));
console.log("rat & car ->", isAnagram("rat", "car"));`,
    python: `# 06. Check if two strings are anagrams
from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)

print("anagram & nagaram ->", is_anagram("anagram", "nagaram"))
print("rat & car ->", is_anagram("rat", "car"))`,
    java: `public class YourClassName {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
    public static void main(String[] args) {
        System.out.println("anagram & nagaram -> " + isAnagram("anagram", "nagaram"));
        System.out.println("rat & car -> " + isAnagram("rat", "car"));
    }
}`,
    cpp: `// 06. Check if two strings are anagrams
#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    vector<int> count(26, 0);
    for (int i = 0; i < s.length(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int c : count) {
        if (c != 0) return false;
    }
    return true;
}

int main() {
    cout << "anagram & nagaram -> " << (isAnagram("anagram", "nagaram") ? "true" : "false") << endl;
    cout << "rat & car -> " << (isAnagram("rat", "car") ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 06. Check if two strings are anagrams
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isAnagram(const char* s, const char* t) {
    if (strlen(s) != strlen(t)) return false;
    int count[26] = {0};
    for (int i = 0; s[i] != '\\0'; i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int i = 0; i < 26; i++) {
        if (count[i] != 0) return false;
    }
    return true;
}

int main() {
    printf("anagram & nagaram -> %s\\n", isAnagram("anagram", "nagaram") ? "true" : "false");
    printf("rat & car -> %s\\n", isAnagram("rat", "car") ? "true" : "false");
    return 0;
}`
  },
  '07. First Non Repeating': {
    javascript: `// 07. First non-repeating character
function firstUniqChar(s) {
    const map = new Map();
    for (let char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i]) === 1) return i;
    }
    return -1;
}

// Test the function
console.log("leetcode -> Index:", firstUniqChar("leetcode"));
console.log("loveleetcode -> Index:", firstUniqChar("loveleetcode"));`,
    python: `# 07. First non-repeating character
from collections import Counter

def first_uniq_char(s):
    count = Counter(s)
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    return -1

print("leetcode -> Index:", first_uniq_char("leetcode"))
print("loveleetcode -> Index:", first_uniq_char("loveleetcode"))`,
    java: `// 07. First non-repeating character
import java.util.HashMap;

public class YourClassName {
    public static int firstUniqChar(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            map.put(s.charAt(i), map.getOrDefault(s.charAt(i), 0) + 1);
        }
        for (int i = 0; i < s.length(); i++) {
            if (map.get(s.charAt(i)) == 1) return i;
        }
        return -1;
    }
    public static void main(String[] args) {
        System.out.println("leetcode -> Index: " + firstUniqChar("leetcode"));
        System.out.println("loveleetcode -> Index: " + firstUniqChar("loveleetcode"));
    }
}`,
    cpp: `// 07. First non-repeating character
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int firstUniqChar(string s) {
    unordered_map<char, int> count;
    for (char c : s) count[c]++;
    for (int i = 0; i < s.length(); i++) {
        if (count[s[i]] == 1) return i;
    }
    return -1;
}

int main() {
    cout << "leetcode -> Index: " << firstUniqChar("leetcode") << endl;
    cout << "loveleetcode -> Index: " << firstUniqChar("loveleetcode") << endl;
    return 0;
}`,
    c: `// 07. First non-repeating character
#include <stdio.h>
#include <string.h>

int firstUniqChar(const char* s) {
    int count[256] = {0};
    for (int i = 0; s[i] != '\\0'; i++) {
        count[(unsigned char)s[i]]++;
    }
    for (int i = 0; s[i] != '\\0'; i++) {
        if (count[(unsigned char)s[i]] == 1) return i;
    }
    return -1;
}

int main() {
    printf("leetcode -> Index: %d\\n", firstUniqChar("leetcode"));
    printf("loveleetcode -> Index: %d\\n", firstUniqChar("loveleetcode"));
    return 0;
}`
  },
  '08. Reverse Words': {
    javascript: `// 08. Reverse words in a string
function reverseWords(s) {
    return s.trim().split(/\\s+/).reverse().join(' ');
}

// Test the function
console.log("Input: 'the sky is blue'");
console.log("Output:", reverseWords("the sky is blue"));
console.log("Input: '  hello world  '");
console.log("Output:", reverseWords("  hello world  "));`,
    python: `# 08. Reverse words in a string
def reverse_words(s):
    return " ".join(s.split()[::-1])

print("Input: 'the sky is blue'")
print("Output:", reverse_words("the sky is blue"))
print("Input: '  hello world  '")
print("Output:", reverse_words("  hello world  "))`,
    java: `public class YourClassName {
    public static String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }
    public static void main(String[] args) {
        System.out.println("Output: " + reverseWords("the sky is blue"));
        System.out.println("Output: " + reverseWords("  hello world  "));
    }
}`,
    cpp: `// 08. Reverse words in a string
#include <iostream>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

string reverseWords(string s) {
    stringstream ss(s);
    string word, ans;
    while (ss >> word) {
        ans = word + (ans.empty() ? "" : " ") + ans;
    }
    return ans;
}

int main() {
    cout << "Output: " << reverseWords("the sky is blue") << endl;
    cout << "Output: " << reverseWords("  hello world  ") << endl;
    return 0;
}`,
    c: `// 08. Reverse words in a string (simplistic version)
#include <stdio.h>
#include <string.h>

void reverseWords(char* s) {
    int n = strlen(s);
    // Reverse entire string
    for(int i=0, j=n-1; i<j; i++, j--) {
        char tmp = s[i]; s[i] = s[j]; s[j] = tmp;
    }
    // Reverse each word
    for(int i=0, start=0; i<=n; i++) {
        if (s[i] == ' ' || s[i] == '\\0') {
            for(int j=start, k=i-1; j<k; j++, k--) {
                char tmp = s[j]; s[j] = s[k]; s[k] = tmp;
            }
            start = i + 1;
        }
    }
}

int main() {
    char test[] = "the sky is blue";
    printf("Original: %s\\n", test);
    reverseWords(test);
    printf("Reversed: %s\\n", test);
    return 0;
}`
  },
  '09. Strings are Rotation': {
    javascript: `// 09. Check if one string is rotation of another
function isRotation(s1, s2) {
    if (s1.length !== s2.length) return false;
    return (s1 + s1).includes(s2);
}

// Test the function
console.log("waterbottle & erbottlewat ->", isRotation("waterbottle", "erbottlewat"));
console.log("hello & llohe ->", isRotation("hello", "llohe"));
console.log("hello & world ->", isRotation("hello", "world"));`,
    python: `# 09. Check if one string is rotation of another
def is_rotation(s1, s2):
    if len(s1) != len(s2):
        return False
    return s2 in (s1 + s1)

print("waterbottle & erbottlewat ->", is_rotation("waterbottle", "erbottlewat"))
print("hello & llohe ->", is_rotation("hello", "llohe"))
print("hello & world ->", is_rotation("hello", "world"))`,
    java: `public class YourClassName {
    public static boolean isRotation(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        String concatenated = s1 + s1;
        return concatenated.contains(s2);
    }
    public static void main(String[] args) {
        System.out.println("waterbottle & erbottlewat -> " + isRotation("waterbottle", "erbottlewat"));
        System.out.println("hello & llohe -> " + isRotation("hello", "llohe"));
    }
}`,
    cpp: `// 09. Check if one string is rotation of another
#include <iostream>
#include <string>
using namespace std;

bool isRotation(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    string concat = s1 + s1;
    return concat.find(s2) != string::npos;
}

int main() {
    cout << "waterbottle & erbottlewat -> " << (isRotation("waterbottle", "erbottlewat") ? "true" : "false") << endl;
    cout << "hello & llohe -> " << (isRotation("hello", "llohe") ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 09. Check if one string is rotation of another
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

bool isRotation(const char* s1, const char* s2) {
    if (strlen(s1) != strlen(s2)) return false;
    int len = strlen(s1);
    char* concat = (char*)malloc(len * 2 + 1);
    strcpy(concat, s1);
    strcat(concat, s1);
    bool result = strstr(concat, s2) != NULL;
    free(concat);
    return result;
}

int main() {
    printf("waterbottle & erbottlewat -> %s\\n", isRotation("waterbottle", "erbottlewat") ? "true" : "false");
    printf("hello & llohe -> %s\\n", isRotation("hello", "llohe") ? "true" : "false");
    return 0;
}`
  },
  '10. Longest Common Prefix': {
    javascript: `// 10. Longest common prefix
function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    return prefix;
}

// Test the function
console.log("['flower', 'flow', 'flight'] ->", longestCommonPrefix(["flower", "flow", "flight"]));
console.log("['dog', 'racecar', 'car'] ->", longestCommonPrefix(["dog", "racecar", "car"]));`,
    python: `# 10. Longest common prefix
def longest_common_prefix(strs):
    if not strs: return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix: return ""
    return prefix

print("['flower', 'flow', 'flight'] ->", longest_common_prefix(["flower", "flow", "flight"]))
print("['dog', 'racecar', 'car'] ->", longest_common_prefix(["dog", "racecar", "car"]))`,
    java: `public class YourClassName {
    public static String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
    public static void main(String[] args) {
        System.out.println("Result: " + longestCommonPrefix(new String[]{"flower", "flow", "flight"}));
        System.out.println("Result: " + longestCommonPrefix(new String[]{"dog", "racecar", "car"}));
    }
}`,
    cpp: `// 10. Longest common prefix
#include <iostream>
#include <vector>
#include <string>
using namespace std;

string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.length() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}

int main() {
    vector<string> v1 = {"flower", "flow", "flight"};
    vector<string> v2 = {"dog", "racecar", "car"};
    cout << "Result 1: " << longestCommonPrefix(v1) << endl;
    cout << "Result 2: " << longestCommonPrefix(v2) << endl;
    return 0;
}`,
    c: `// 10. Longest common prefix
#include <stdio.h>
#include <string.h>

char* longestCommonPrefix(char strs[][20], int strsSize, char* out) {
    if (strsSize == 0) { out[0] = '\\0'; return out; }
    strcpy(out, strs[0]);
    for (int i = 1; i < strsSize; i++) {
        int j = 0;
        while (out[j] != '\\0' && strs[i][j] != '\\0' && out[j] == strs[i][j]) {
            j++;
        }
        out[j] = '\\0';
    }
    return out;
}

int main() {
    char strs[][20] = {"flower", "flow", "flight"};
    char out[20];
    printf("Result: %s\\n", longestCommonPrefix(strs, 3, out));
    return 0;
}`
  },
  '12. Valid parentheses': {
    javascript: `// 12. Valid parentheses
function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (!map[char]) {
            stack.push(char);
        } else if (stack.pop() !== map[char]) {
            return false;
        }
    }
    return stack.length === 0;
}

// Test the function
console.log("'()' ->", isValid("()"));
console.log("'()[]{}' ->", isValid("()[]{}"));
console.log("'(]' ->", isValid("(]"));`,
    python: `# 12. Valid parentheses
def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack

print("'()' ->", is_valid("()"))
print("'()[]{}' ->", is_valid("()[]{}"))
print("'(]' ->", is_valid("(]"))`,
    java: `// 12. Valid parentheses
import java.util.Stack;

public class YourClassName {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
    public static void main(String[] args) {
        System.out.println("'()' -> " + isValid("()"));
        System.out.println("'()[]{}' -> " + isValid("()[]{}"));
        System.out.println("'(]' -> " + isValid("(]"));
    }
}`,
    cpp: `// 12. Valid parentheses
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.empty() || st.top() != c) return false;
        else st.pop();
    }
    return st.empty();
}

int main() {
    cout << "'()' -> " << (isValid("()") ? "true" : "false") << endl;
    cout << "'()[]{}' -> " << (isValid("()[]{}") ? "true" : "false") << endl;
    cout << "'(]' -> " << (isValid("(]") ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 12. Valid parentheses
#include <stdio.h>
#include <stdbool.h>

bool isValid(const char* s) {
    char stack[10000];
    int top = -1;
    for (int i = 0; s[i] != '\\0'; i++) {
        char c = s[i];
        if (c == '(') stack[++top] = ')';
        else if (c == '{') stack[++top] = '}';
        else if (c == '[') stack[++top] = ']';
        else if (top == -1 || stack[top--] != c) return false;
    }
    return top == -1;
}

int main() {
    printf("'()' -> %s\\n", isValid("()") ? "true" : "false");
    printf("'()[]{}' -> %s\\n", isValid("()[]{}") ? "true" : "false");
    printf("'(]' -> %s\\n", isValid("(]") ? "true" : "false");
    return 0;
}`
  },
  '13. Longest substring without repeating chars': {
    javascript: `// 13. Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
    const set = new Set();
    let left = 0, maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

// Test the function
console.log("'abcabcbb' ->", lengthOfLongestSubstring("abcabcbb"));
console.log("'bbbbb' ->", lengthOfLongestSubstring("bbbbb"));
console.log("'pwwkew' ->", lengthOfLongestSubstring("pwwkew"));`,
    python: `# 13. Longest substring without repeating characters
def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_length = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    return max_length

print("'abcabcbb' ->", length_of_longest_substring("abcabcbb"))
print("'pwwkew' ->", length_of_longest_substring("pwwkew"))`,
    java: `// 13. Longest substring without repeating characters
import java.util.HashSet;

public class YourClassName {
    public static int lengthOfLongestSubstring(String s) {
        HashSet<Character> set = new HashSet<>();
        int left = 0, maxLength = 0;
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left));
                left++;
            }
            set.add(s.charAt(right));
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
    public static void main(String[] args) {
        System.out.println("'abcabcbb' -> " + lengthOfLongestSubstring("abcabcbb"));
        System.out.println("'pwwkew' -> " + lengthOfLongestSubstring("pwwkew"));
    }
}`,
    cpp: `// 13. Longest substring without repeating characters
#include <iostream>
#include <unordered_set>
#include <string>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_set<char> set;
    int left = 0, maxLength = 0;
    for (int right = 0; right < s.length(); right++) {
        while (set.find(s[right]) != set.end()) {
            set.erase(s[left]);
            left++;
        }
        set.insert(s[right]);
        maxLength = max(maxLength, right - left + 1);
    }
    return maxLength;
}

int main() {
    cout << "'abcabcbb' -> " << lengthOfLongestSubstring("abcabcbb") << endl;
    cout << "'pwwkew' -> " << lengthOfLongestSubstring("pwwkew") << endl;
    return 0;
}`,
    c: `// 13. Longest substring without repeating characters
#include <stdio.h>
#include <stdbool.h>

int lengthOfLongestSubstring(const char* s) {
    bool set[256] = {false};
    int left = 0, maxLength = 0;
    for (int right = 0; s[right] != '\\0'; right++) {
        while (set[(unsigned char)s[right]]) {
            set[(unsigned char)s[left]] = false;
            left++;
        }
        set[(unsigned char)s[right]] = true;
        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
        }
    }
    return maxLength;
}

int main() {
    printf("'abcabcbb' -> %d\\n", lengthOfLongestSubstring("abcabcbb"));
    printf("'pwwkew' -> %d\\n", lengthOfLongestSubstring("pwwkew"));
    return 0;
}`
  },
  '15. Group anagrams': {
    javascript: `// 15. Group anagrams
function groupAnagrams(strs) {
    const map = new Map();
    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map.has(sorted)) map.set(sorted, []);
        map.get(sorted).push(str);
    }
    return Array.from(map.values());
}

// Test the function
const input = ["eat","tea","tan","ate","nat","bat"];
console.log("Input:", input);
console.log("Output:", groupAnagrams(input));`,
    python: `# 15. Group anagrams
from collections import defaultdict

def group_anagrams(strs):
    anagram_map = defaultdict(list)
    for s in strs:
        sorted_str = "".join(sorted(s))
        anagram_map[sorted_str].append(s)
    return list(anagram_map.values())

input_strs = ["eat","tea","tan","ate","nat","bat"]
print("Input:", input_strs)
print("Output:", group_anagrams(input_strs))`,
    java: `// 15. Group anagrams
import java.util.*;

public class YourClassName {
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String sorted = new String(chars);
            map.putIfAbsent(sorted, new ArrayList<>());
            map.get(sorted).add(s);
        }
        return new ArrayList<>(map.values());
    }
    public static void main(String[] args) {
        String[] input = {"eat","tea","tan","ate","nat","bat"};
        System.out.println("Output: " + groupAnagrams(input));
    }
}`,
    cpp: `// 15. Group anagrams
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> map;
    for (string s : strs) {
        string sorted = s;
        sort(sorted.begin(), sorted.end());
        map[sorted].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& pair : map) {
        result.push_back(pair.second);
    }
    return result;
}

int main() {
    vector<string> input = {"eat","tea","tan","ate","nat","bat"};
    vector<vector<string>> result = groupAnagrams(input);
    cout << "Output: " << endl;
    for(auto group : result) {
        cout << "[ ";
        for(string s : group) cout << s << " ";
        cout << "]" << endl;
    }
    return 0;
}`,
    c: `// 15. Group anagrams
// Due to C's complexity with dynamic string arrays and hash maps,
// a simple implementation is omitted for brevity. 
// Use C++ or Java for production implementations.
#include <stdio.h>

int main() {
    printf("Please select C++, Java, Python, or JS to see the full implementation of Group Anagrams.\\n");
    return 0;
}`
  },
  '16. Longest palindromic substring': {
    javascript: `// 16. Longest palindromic substring
function longestPalindrome(s) {
    if (!s || s.length < 1) return "";
    let start = 0, end = 0;
    
    const expandAroundCenter = (s, left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    };
    
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i);
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
}

// Test the function
console.log("'babad' ->", longestPalindrome("babad"));
console.log("'cbbd' ->", longestPalindrome("cbbd"));`,
    python: `# 16. Longest palindromic substring
def longest_palindrome(s):
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]

    res = ""
    for i in range(len(s)):
        odd = expand_around_center(i, i)
        even = expand_around_center(i, i + 1)
        res = max(res, odd, even, key=len)
    return res

print("'babad' ->", longest_palindrome("babad"))
print("'cbbd' ->", longest_palindrome("cbbd"))`,
    java: `public class YourClassName {
    private static int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    public static String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    public static void main(String[] args) {
        System.out.println("'babad' -> " + longestPalindrome("babad"));
        System.out.println("'cbbd' -> " + longestPalindrome("cbbd"));
    }
}`,
    cpp: `// 16. Longest palindromic substring
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int expandAroundCenter(string s, int left, int right) {
    while (left >= 0 && right < s.length() && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

string longestPalindrome(string s) {
    if (s.empty()) return "";
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        int len = max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substr(start, end - start + 1);
}

int main() {
    cout << "'babad' -> " << longestPalindrome("babad") << endl;
    cout << "'cbbd' -> " << longestPalindrome("cbbd") << endl;
    return 0;
}`,
    c: `// 16. Longest palindromic substring
#include <stdio.h>
#include <string.h>

int expandAroundCenter(const char* s, int left, int right) {
    int len = strlen(s);
    while (left >= 0 && right < len && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

void longestPalindrome(const char* s, char* out) {
    int len = strlen(s);
    if (len < 1) { out[0] = '\\0'; return; }
    int start = 0, end = 0;
    for (int i = 0; i < len; i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        int maxLen = len1 > len2 ? len1 : len2;
        if (maxLen > end - start) {
            start = i - (maxLen - 1) / 2;
            end = i + maxLen / 2;
        }
    }
    strncpy(out, s + start, end - start + 1);
    out[end - start + 1] = '\\0';
}

int main() {
    char out[100];
    longestPalindrome("babad", out);
    printf("'babad' -> %s\\n", out);
    return 0;
}`
  },
  '17. String compression': {
    javascript: `// 17. String compression
function compress(chars) {
    let write = 0;
    let i = 0;
    while (i < chars.length) {
        let j = i;
        while (j < chars.length && chars[j] === chars[i]) {
            j++;
        }
        chars[write++] = chars[i];
        if (j - i > 1) {
            const count = (j - i).toString();
            for (let char of count) {
                chars[write++] = char;
            }
        }
        i = j;
    }
    return write;
}

// Test the function
const chars = ['a','a','b','b','c','c','c'];
const newLen = compress(chars);
console.log("Original: ['a','a','b','b','c','c','c']");
console.log("Compressed length:", newLen);
console.log("Modified array:", chars.slice(0, newLen));`,
    python: `# 17. String compression
def compress(chars):
    write = 0
    i = 0
    while i < len(chars):
        j = i
        while j < len(chars) and chars[j] == chars[i]:
            j += 1
        chars[write] = chars[i]
        write += 1
        if j - i > 1:
            for char in str(j - i):
                chars[write] = char
                write += 1
        i = j
    return write

chars = ['a','a','b','b','c','c','c']
new_len = compress(chars)
print("Compressed length:", new_len)
print("Modified array:", chars[:new_len])`,
    java: `// 17. String compression
import java.util.Arrays;

public class YourClassName {
    public static int compress(char[] chars) {
        int write = 0;
        int i = 0;
        while (i < chars.length) {
            int j = i;
            while (j < chars.length && chars[j] == chars[i]) {
                j++;
            }
            chars[write++] = chars[i];
            if (j - i > 1) {
                String count = String.valueOf(j - i);
                for (char c : count.toCharArray()) {
                    chars[write++] = c;
                }
            }
            i = j;
        }
        return write;
    }
    public static void main(String[] args) {
        char[] chars = {'a','a','b','b','c','c','c'};
        int newLen = compress(chars);
        System.out.println("Compressed length: " + newLen);
        System.out.println("Modified array: " + Arrays.toString(Arrays.copyOfRange(chars, 0, newLen)));
    }
}`,
    cpp: `// 17. String compression
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int compress(vector<char>& chars) {
    int write = 0, i = 0;
    while (i < chars.size()) {
        int j = i;
        while (j < chars.size() && chars[j] == chars[i]) j++;
        chars[write++] = chars[i];
        if (j - i > 1) {
            string count = to_string(j - i);
            for (char c : count) chars[write++] = c;
        }
        i = j;
    }
    return write;
}

int main() {
    vector<char> chars = {'a','a','b','b','c','c','c'};
    int newLen = compress(chars);
    cout << "Compressed length: " << newLen << endl;
    cout << "Modified array: ";
    for(int i=0; i<newLen; i++) cout << chars[i] << " ";
    cout << endl;
    return 0;
}`,
    c: `// 17. String compression
#include <stdio.h>

int compress(char* chars, int charsSize) {
    int write = 0, i = 0;
    while (i < charsSize) {
        int j = i;
        while (j < charsSize && chars[j] == chars[i]) j++;
        chars[write++] = chars[i];
        if (j - i > 1) {
            char countStr[10];
            sprintf(countStr, "%d", j - i);
            for (int k = 0; countStr[k] != '\\0'; k++) {
                chars[write++] = countStr[k];
            }
        }
        i = j;
    }
    return write;
}

int main() {
    char chars[] = {'a','a','b','b','c','c','c'};
    int newLen = compress(chars, 7);
    printf("Compressed length: %d\\n", newLen);
    printf("Modified array: ");
    for(int i=0; i<newLen; i++) printf("%c ", chars[i]);
    printf("\\n");
    return 0;
}`
  },
  '20. Implement strStr() / KMP': {
    javascript: `// 20. Implement strStr()
function strStr(haystack, needle) {
    if (needle === "") return 0;
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.substring(i, i + needle.length) === needle) {
            return i;
        }
    }
    return -1;
}

// Test the function
console.log("haystack: 'hello', needle: 'll' ->", strStr("hello", "ll"));
console.log("haystack: 'aaaaa', needle: 'bba' ->", strStr("aaaaa", "bba"));`,
    python: `# 20. Implement strStr()
def str_str(haystack, needle):
    if not needle: return 0
    return haystack.find(needle)

print("haystack: 'hello', needle: 'll' ->", str_str("hello", "ll"))
print("haystack: 'aaaaa', needle: 'bba' ->", str_str("aaaaa", "bba"))`,
    java: `public class YourClassName {
    public static int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        return haystack.indexOf(needle);
    }
    public static void main(String[] args) {
        System.out.println("haystack: 'hello', needle: 'll' -> " + strStr("hello", "ll"));
        System.out.println("haystack: 'aaaaa', needle: 'bba' -> " + strStr("aaaaa", "bba"));
    }
}`,
    cpp: `// 20. Implement strStr()
#include <iostream>
#include <string>
using namespace std;

int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    size_t found = haystack.find(needle);
    return found != string::npos ? found : -1;
}

int main() {
    cout << "haystack: 'hello', needle: 'll' -> " << strStr("hello", "ll") << endl;
    cout << "haystack: 'aaaaa', needle: 'bba' -> " << strStr("aaaaa", "bba") << endl;
    return 0;
}`,
    c: `// 20. Implement strStr()
#include <stdio.h>
#include <string.h>

int strStr(const char* haystack, const char* needle) {
    if (needle[0] == '\\0') return 0;
    const char* ptr = strstr(haystack, needle);
    return ptr ? ptr - haystack : -1;
}

int main() {
    printf("haystack: 'hello', needle: 'll' -> %d\\n", strStr("hello", "ll"));
    printf("haystack: 'aaaaa', needle: 'bba' -> %d\\n", strStr("aaaaa", "bba"));
    return 0;
}`
  }
};
