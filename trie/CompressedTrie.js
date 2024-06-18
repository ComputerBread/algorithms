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

            let prefixFound = false;

            const key = word.charAt(i);
            if (key in node.children) {

                let child = node.children[key];
                let prefixLen = this.commonPrefixLength(word.slice(i), child.prefix);

                // if common prefix is the prefix of the child
                if (prefixLen === child.prefix.length) {
                    prefixFound = true;
                    // then, if we've read the word completely
                    if (i + prefixLen === word.length) {
                        return;
                    }
                    // otherwise, we need to check this node's children
                    node = child;
                    i += prefixLen;
                } else {
                    // otherwise if 0 < prefixLen < child.prefix.length
                    // need to modify the current child to only contain the common prefix
                    // need to create 2 children
                    // one that replace this child! and one for the word we are adding
                    let newChild = new TrieNode(child.prefix.slice(prefixLen));
                    this.totalNodeCount++;
                    newChild.isEndOfWord = child.isEndOfWord;
                    newChild.children = child.children;
                    child.children = { [newChild.prefix[0]]: newChild };
                    child.isEndOfWord = false;
                    child.prefix = child.prefix.slice(0, prefixLen);

                    node = child;
                    i += prefixLen;
                    prefixFound = true;
                }

            }

            // if not found, we need to insert an new node
            if (!prefixFound) {
                const newNode = new TrieNode(word.slice(i));
                newNode.isEndOfWord = true;
                this.totalNodeCount++;
                node.children[newNode.prefix[0]] = newNode;
                break;
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
trie.insert("helium");
trie.insert("hero");
trie.insert("hero");
trie.insert("heron");

console.log(trie.search("hello"));
console.log(trie.search("helium"));
console.log(trie.search("hero"));
console.log(trie.search("heron"));
console.log(trie.search("false"));
