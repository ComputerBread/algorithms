// chatgpt is a better programmer than me
class TrieNode {
    constructor(prefix = '', id = null) {
        this.prefix = prefix;
        this.leaves = (id) ? [id] : [];
        this.children = {};
    }
}


class CompressedTrie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        let i = 0;

        while (i < word.length) {
            let prefixFound = false;

            // Find a child with a matching prefix
            for (let key in node.children) {
                let child = node.children[key];
                let prefixLen = this.commonPrefixLength(word.slice(i), child.prefix);

                if (prefixLen > 0) {
                    // if partial prefix match (ex: prefix = aaab, and we insert aaac)
                    // we need to modify the node, to have prefix "aaa" and add 2 new children for (aaa)"b" and (aaa)"c"
                    if (prefixLen < child.prefix.length) {
                        // Split the node "[0..prefixLen)[prefixLen..]"
                        let newChild = new TrieNode(child.prefix.slice(prefixLen)); // suffix [prefixLen..]
                        newChild.children = child.children;
                        newChild.leaves = child.leaves;

                        child.prefix = child.prefix.slice(0, prefixLen); // [0..prefixLen)
                        child.children = { [newChild.prefix[0]]: newChild }; // add [prefixLen]
                        child.leaves = null;

                        // something missing no? no
                    }
                    node = child;
                    i += prefixLen;
                    prefixFound = true;
                    break;
                }
            }

            // If no prefix matches, create a new child
            if (!prefixFound) {
                let newNode = new TrieNode(word.slice(i));
                node.children[newNode.prefix[0]] = newNode;
                node = newNode;
                break;
            }
        }

        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        let i = 0;

        while (i < word.length) {
            let prefixFound = false;

            for (let key in node.children) {
                let child = node.children[key];
                let prefixLen = this.commonPrefixLength(word.slice(i), child.prefix);

                if (prefixLen === child.prefix.length) {
                    node = child;
                    i += prefixLen;
                    prefixFound = true;
                    break;
                }
            }

            if (!prefixFound) {
                return false;
            }
        }

        return node.isEnd;
    }

    // return all words with this prefix
    partialSearch(prefix) {
        let node = this.root;
        let i = 0;
        while (i < prefix.length) {
            let
        }

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
trie.insert("helium");
trie.insert("hero");

console.log(trie.search("hello")); // true
console.log(trie.search("helium")); // true
console.log(trie.search("hero")); // true
console.log(trie.search("he")); // false
console.log(trie.search("heron")); // false