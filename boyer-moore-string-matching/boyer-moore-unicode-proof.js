function BoyerMoore(text, pattern) {
    const textNormalized = text.normalize()
    const patternNormalized = pattern.normalize()
    const n = textNormalized.length;
    const m = patternNormalized.length;
    const badCharShift = computeBadCharacterRule(patternNormalized);
    const goodSuffixShift  = computeGoodSuffixRule(patternNormalized);
    let t = 0;
    while (t <= n-m) {
    	
        let j = m-1;
        while (j >= 0 && patternNormalized[j] === textNormalized[t+j]) {
            j--;
        }
        if(j === -1) {
            return t;
        } else {
            let char = textNormalized[t+j];
            let lastOcc = (badCharShift.has(char) ? badCharShift.get(char) : -1);
            t = t + Math.max(j-lastOcc, goodSuffixShift[j]);
        }
    }
    return -1;
}

function computeBadCharacterRule(pattern) {
    const occurrenceMap = new Map();
    for (let i = 0; i < pattern.length; i++) {
        occurrenceMap.set(pattern[i], i);
    }
    return occurrenceMap;
}

function computeGoodSuffixRule(pattern) {
    const m = pattern.length;
    const borders = new Array(m + 1);
    const shift = (new Array(m)).fill(0);
    let i = m;
    let j = m + 1;

    borders[i] = j;

    while (i > 0) {
        while (j <= m && pattern[i-1] != pattern[j-1]) {

            // if p[i-1] != p[j-1] then we know we can shift the pattern from i to j
            // because the previous char p[j..m) matches with T[t+j..m)
            // but not T[t+j-1] with p[j-1], but there's a chance that T[t+i-1] == p[i-1]
            if ((j-1) >= 0 && shift[j-1] === 0) {
                shift[j-1] = j-i;
            }
            j = borders[j];
        }
        i--;
        j--;
        borders[i] = j;
    }

    let b = borders[0];
    for (i = 0; i <= m; i++) {
        if (i === b) {
            b = borders[b];
        }
        if (shift[i] === 0) {
            shift[i] = b;
        }
    }

    return shift;
}

let text = "Demonstration of bad-character rule with pattern P = NNAAMAN. There is a mismatch between N (in the input text) and A (in the pattern) in the column marked with an X. The pattern is shifted right (in this case by 3) so that the next occurrence of the character N (in the pattern P) to the left of the current character (which is the middle A) is found."
//text = "thereisnothereinthere"
//text = "T:00000ABDABCABDAB00000000anananpanman"
let p = "ANAN";
//p = "ABDABCABDAB"
//p = "anpanman"
//console.log(BoyerMoore(text,p));



// ---------------- test
const testData = [
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
  { text: "pattern", pattern: "", expectedIndex: 0 },
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
      const result = BoyerMoore(text, pattern);
      console.assert(result === expectedIndex,`Test for text: "${text}", pattern: "${pattern}"`, "result:", result, "expected:", expectedIndex);
    }
  }
  
  // Call the function to run the tests
  //testStringMatchingAlgorithm();

text = "내가 가진 건 이 노래 한방"; // From Anpanman by BTS (방탄소년단)
p = "진"
console.log(BoyerMoore(text,p)); // 4 too now
p = "진"
console.log(BoyerMoore(text,p)); // 4