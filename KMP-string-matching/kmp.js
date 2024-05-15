function KMP(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const fail = failureLinks(pattern);
    let i = 0;
    let q = 0;

    while (i < n) {
        if (text[i] === pattern[q]) {
            i++;
            q++;
            if (q === m) {
                return i-q;
            }
        } else if (q >= 1) {
            q = fail[q];
        } else {
            i++;
        }
    }

    return -1;
}

function failureLinks(pattern) {
    const m = pattern.length;
    const fail = new Array(m);
    fail[0] = 0;
    let x = 0;
    for (let q = 1; q < m; q++) {
        fail[q] = x;
        while (pattern[x] != pattern[q]) {
            if (x === 0) {
                x = -1;
                break;
            }
            x = fail[x];
        }
        x++;
    }
    return fail;
}


// ---------------- test
const testData = [
    { text: "anpanpanpanman", pattern: "anpanman", expectedIndex: 6 },
    { text: "abcdefg", pattern: "cde", expectedIndex: 2 },
    { text: "hello world", pattern: "world", expectedIndex: 6 },
    { text: "banana", pattern: "apple", expectedIndex: -1 },
    { text: "mississippi", pattern: "issi", expectedIndex: 1 },
    { text: "foobarbaz", pattern: "bar", expectedIndex: 3 },
    { text: "abcabcabc", pattern: "abc", expectedIndex: 0 },
      { text: "abcdefg", pattern: "cde", expectedIndex: 2 },
  { text: "hello world", pattern: "world", expectedIndex: 6 },
  { text: "banana", pattern: "apple", expectedIndex: -1 },
  { text: "mississippi", pattern: "issi", expectedIndex: 1 },
  { text: "foobarbaz", pattern: "bar", expectedIndex: 3 },
  { text: "abcabcabc", pattern: "abc", expectedIndex: 0 },
  { text: "abcdefgh", pattern: "abcdefgh", expectedIndex: 0 },
  { text: "xyz", pattern: "xyz", expectedIndex: 0 },
  { text: "foo", pattern: "foo", expectedIndex: 0 },
  { text: "bar", pattern: "baz", expectedIndex: -1 },
  { text: "a", pattern: "a", expectedIndex: 0 },
  { text: "", pattern: "pattern", expectedIndex: -1 },
  { text: "pattern", pattern: "", expectedIndex: -1 },
  { text: "abcabcabc", pattern: "bcd", expectedIndex: -1 },
  { text: "aabbaabbaabbaabb", pattern: "aabbaabb", expectedIndex: 0 },
  { text: "aabbaabbaabbaabb", pattern: "bb", expectedIndex: 2 },
  { text: "aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz", pattern: "xxyy", expectedIndex: 46 },
  { text: "aaaabbaaaaaababaaabaaa", pattern: "aaa", expectedIndex: 0 },
  { text: "abcdefghijklmnopqrstuvwxyz", pattern: "xyz", expectedIndex: 23 },
  ];
  
// You can use this function to test your algorithm
function testStringMatchingAlgorithm() {
    for (const { text, pattern, expectedIndex } of testData) {
        const result = KMP(text, pattern);
        console.assert(result === expectedIndex,`Test for text: "${text}", pattern: "${pattern}"`, "result:", result, "expected:", expectedIndex);
    }
}
testStringMatchingAlgorithm();
        const result = KMP("anpanpanpanpanman", "anpanman");
KMP("abababaaaca", "ababaca");