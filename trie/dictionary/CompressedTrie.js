// now let me cook, fine I'll do it myself, it's gonna be way easier!!
class TrieNode {
    constructor(prefix = '', id = null) {
        this.prefix = prefix;
        this.leaves = (id) ? [id] : [];
        this.children = {};
    }
}


export class CompressedTrie {
    constructor() {
        this.root = new TrieNode();
        this.totalNodeCount = 0;
    }

    insert(word, id) {
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
                        child.leaves.push(id);
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
                    newChild.leaves = child.leaves;
                    newChild.children = child.children;
                    child.children = { [newChild.prefix[0]]: newChild };
                    child.leaves = [];
                    child.prefix = child.prefix.slice(0, prefixLen);

                    node = child;
                    i += prefixLen;
                    prefixFound = true;
                }

            }

            // if not found, we need to insert an new node
            if (!prefixFound) {
                const newNode = new TrieNode(word.slice(i), id);
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
                return [];
            }

            const child = node.children[key];
            let prefixLen = this.commonPrefixLength(prefix.slice(i), child.prefix);
            if (prefixLen !== child.prefix.length) {
                return [];
            }
            if (prefixLen + i === prefix.length) {
                return child.leaves;
            }
            node = child;
            i += prefixLen;
            // pedro pedro pedro pedro pedro pedro pedro pedro pedro pedro
        }

        return [];
    }

    // return indices of all word beginning with this prefix
    prefixSearch(prefix) {
        let node = this.root;
        let i = 0;
        while (i < prefix.length) {
            const key = prefix.charAt(i);
            if (!(key in node.children)) {
                // not found bozo
                return [];
            }

            const child = node.children[key];
            let prefixLen = this.commonPrefixLength(prefix.slice(i), child.prefix);
            if (prefixLen == 0) {
                return [];
            }

            // if we are done reading "prefix"
            // and it was found entirely in child.prefix
            // we return all leaves in this subtree
            if (prefixLen + i === prefix.length) {
                return this.dfs(child);
            }

            // if prefix is not part of the trie
            if (prefixLen !== child.prefix.length) {
                return [];
            }

            // otherwise, child.prefix.length = prefixLen && prefix was not entirely read
            node = child;
            i += prefixLen;
        }

        return [];
    }

    // now that i've done this,
    // it's time to think
    // what order do I want?
    dfs(node) {
        const leaves = [];
        const nodes = [node];
        while (nodes.length != 0) {
            const node = nodes.pop();
            leaves.push(...(node.leaves));
            for (const key in node.children) {
                nodes.push(node.children[key]);
            }
        }
        return leaves;
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
trie.insert("hello", 1);
trie.insert("helium", 2);
trie.insert("hero", 3);
trie.insert("hero", 4);
trie.insert("heron", 5);

console.log(trie.prefixSearch("he"));