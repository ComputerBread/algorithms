class TrieNode {
    children = {};
    isEnd = false;
    constructor() {
        this.children = {};
        this.isEnd = -1;
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
        this.totalNodeCount = 1;
    }


    insert(word, id) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(char in node.children)) {
                node.children[char] = new TrieNode();
                this.totalNodeCount++;
            }
            node = node.children[char];
        }
        node.isEnd = id;
    }

    search(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            if (!node.children[char]) {
                return -1;
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

    partialSearch(prefix) {
        const ids = [];
        let node = this.root;

        for (let i = 0; i < prefix.length; i++) {
            console.log(prefix[i], node.children[prefix[i]]);
            let char = prefix[i];

            if (!(char in node.children)) {
                return [];
            }
            node = node.children[char];
        }


        // dfs
        const nodes = [node];
        while (nodes.length > 0) {
            const node = nodes.pop();
            if (node.isEnd != -1)
                ids.push(node.isEnd);
            for (const char in node.children) {
                nodes.push(node.children[char]);
            }
        }
        return ids;

    }


}
