// for cooler/more complete example check minecraft_autocomplete
class TrieNode {

    constructor(prefix = '') {
        this.prefix = prefix;
        this.isEndOfWord = false;
        this.children = {};
    }

}

class CompressedTrie {
    constructor() {
        this.root = new TrieNode();
        this.totalNodeCount = 1;
    }

    insert(word) {
        let node = this.root;
        let i = 0;

        while (i < word.length) {

            const key = word[i];
            const childExists = key in node.children;

            if (!childExists) {
                const newNode = new TrieNode(word.slice(i));
                newNode.isEndOfWord = true;
                this.totalNodeCount++;
                node.children[key] = newNode;
                break;
            }

            node = node.children[key];
            const prefixLen = this.commonPrefixLength(word.slice(i), node.prefix);

            i += prefixLen;
            // - prefixLen = 0 is impossible, because there's at least the first character in common!
            // - if prefixLen == node.prefix.length, doing i+= prefixLen will break out of the loop
            // - otherwise if 0 < prefixLen < child.prefix.length
            //   need to modify the current child to only contain the common prefix
            //   need to create 2 children
            //   one that replace this child! and one for the word we are adding
            if (prefixLen < node.prefix.length) {
                const newChild = new TrieNode(node.prefix.slice(prefixLen));
                this.totalNodeCount++;
                newChild.isEndOfWord = node.isEndOfWord;
                newChild.children = node.children;
                node.prefix = node.prefix.slice(0, prefixLen);
                node.children = { [newChild.prefix[0]]: newChild };
                node.isEndOfWord = i == word.length;
            }

        }
    }

    // exact search
    search(prefix) {
        let node = this.root;
        let i = 0;
        while (i < prefix.length) {
            const key = prefix.charAt(i);
            if (!(key in node.children)) {
                // not found bozo
                return false;
            }

            const child = node.children[key];
            let prefixLen = this.commonPrefixLength(prefix.slice(i), child.prefix);
            if (prefixLen !== child.prefix.length) {
                return false;
            }
            if (prefixLen + i === prefix.length) {
                return child.isEndOfWord;
            }
            node = child;
            i += prefixLen;
        }

        return false;
    }

    commonPrefixLength(a, b) {
        let len = 0;
        while (len < a.length && len < b.length && a[len] === b[len]) {
            len++;
        }
        return len;
    }


}

const trie = new CompressedTrie();
trie.insert("hello");
trie.insert("hell");
trie.insert("helium");
trie.insert("heron");
trie.insert("hero");
trie.insert("hero");
trie.insert("computer");
trie.insert("compute");
trie.insert("computing");

console.log(trie.search("hello"));
console.log(trie.search("hell"));
console.log(trie.search("helium"));
console.log(trie.search("hero"));
console.log(trie.search("heron"));
console.log(trie.search("compute"));
console.log(trie.search("computer"));
console.log(trie.search("computing"));
console.log(trie.search("false"));
