class TrieNode {
    children = {};
    isEnd = false;
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(char in node.children)) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }

}
