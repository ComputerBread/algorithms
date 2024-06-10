// now let me cook, fine I'll do it myself, it's gonna be way easier!!
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

    insert(word, id) {
        let node = this.root;
        let i = 0;

        while (i < word.length) {

            let prefixFound = false;

            for (const key in node.children) {
                let child = node.children[key];
                let prefixLen = this.commonPrefixLength(word.slice(i), child.prefix);

                // if no common prefix, we try with the next child
                if (prefixLen === 0) break;

                // if common prefix is the prefix of the child
                if (prefixLen === child.prefix.length) {
                    // then, if we've read the word completely
                    if (i === word.length - 1) {
                        child.leaves.push(id);
                        return;
                    }
                    // otherwise, we need to check this node's children
                    break;
                }

                // otherwise if 0 < prefixLen < child.prefix.length
                // need to modify the current child to only contain the common prefix
                // need to create 2 children
                // one that replace this child! and one for the word we are adding
                let newChild = new TrieNode(child.prefix.slice(prefixLen));
                newChild.leaves = child.leaves;
                newChild.children = child.children;
                child.children = { [newChild.prefix[0]]: newChild };
                child.leaves = [];

                node = child;
                i += prefixLen;
                prefixFound = true;
                break;
            }

            // if not found, we need to insert an new node
            if (!prefixFound) {
                const newNode = new TrieNode(word.slice(i), id);
                node.children[newNode.prefix[0]] = newNode;
                break;
            }
        }

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