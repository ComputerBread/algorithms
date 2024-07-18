class Node {

    constructor() {
        this.outputs = new Set();
        this.children = new Map();
        this.failureLink = null;
    }

    hasChild(key) {
        return this.children.has(key);
    }

    getChild(key) {
        return this.children.get(key);
    }

    setChild(key, node) {
        this.children.set(key, node);
    }

    addOutput(output) {
        this.outputs.add(output);
    }

    copyOutputs(node) {
        for (const o of node.outputs) {
            this.outputs.add(o);
        }
    }

}

class AhoCorasick {

    constructor(patterns) {

        // construct the trie
        this.root = new Node();

        let currNode = this.root;
        for (const pattern of patterns) {
            for (let i = 0; i < pattern.length; i++) {
                const key = pattern[i];
                if (!currNode.hasChild(key)) {
                    currNode.setChild(key, new Node());
                }
                currNode = currNode.getChild(key);
            }
            currNode.addOutput(pattern);
            currNode = this.root;
        }

        // failure link
        this.root.failureLink = this.root;
        const queue = [];
        for (const [_, child] of this.root.children) {
            child.failureLink = this.root;
            queue.push(child);
        }

        while (queue.length !== 0) {
            currNode = queue.shift();
            for (const [key, child] of currNode.children) {
                queue.push(child);

                let n = currNode.failureLink;
                while (!n.hasChild(key) && n != this.root) {
                    n = n.failureLink;
                }
                child.failureLink = n.getChild(key) ?? this.root;
                child.copyOutputs(child.failureLink);

            }
        }
    }

    search(text) {
        const found = [];
        let state = this.root;
        let i = 0;
        while (i < text.length) {
            const c = text[i];
            if (state.hasChild(c)) {
                state = state.getChild(c);
                i++;
                if (state.outputs.size > 0) {
                    state.outputs.forEach(val => {
                        found.push({ "pos": i - val.length, "val": val });
                    });
                }
            } else if (state === this.root) {
                i++;
            } else {
                state = state.failureLink;
            }
        }
        return found;
    }
}




const testData = [
    {
        patterns: ["meet", "meat", "eat", "eating", "tiny", "in"],
        text: "I am eating meat",
        res: [{ pos: 5, val: 'eat' }, { pos: 8, val: "in" }, { pos: 5, val: "eating" }, { pos: 12, val: "meat" }, { pos: 13, val: "eat" }]
    },
    {
        patterns: ["eat"],
        text: "eat",
        res: [{ pos: 0, val: 'eat' }],
    },
    {
        patterns: [],
        text: "empty",
        res: [],
    },
    {
        patterns: ["eat"],
        text: "not found",
        res: [],
    },
    {
        patterns: ["touch", "churn"],
        text: "touchurn",
        res: [{ pos: 0, val: "touch" }, { pos: 3, val: "churn" },],
    },
    {
        patterns: ['he', 'she', 'his', 'hers'],
        text: "she was expecting his visit",
        res: [{ pos: 0, val: "she" }, { pos: 1, val: "he" }, { pos: 18, val: "his" }],
    },
    {
        patterns: ['çp?', 'éâà'],
        text: "éâàqwfwéâéeqfwéâàqef àéçp?ẃ wqqryht cp?",
        res: [{ pos: 0, val: "éâà" }, { pos: 14, val: "éâà" }, { pos: 23, val: "çp?" }],
    },
    {
        patterns: ['😁', '😀', '😀😁'],
        text: "Bla 😁 a 😀 - 😀😁",
        res: [{ pos: 4, val: "😁" }, { pos: 9, val: "😀" }, { pos: 14, val: "😀" }, { pos: 14, val: "😀😁" }, { pos: 16, val: "😁" }],
    },
    {
        patterns: ["가방", "방"],
        text: "내 가방에 음식이 있다",
        res: [{ pos: 2, val: "가방" }, { pos: 3, val: "방" }],
    },
];

testData.forEach((data, i) => {
    const machine = new AhoCorasick(data.patterns);
    const res = machine.search(data.text);
    if (res.length !== data.res.length) {
        console.error("Test", i, "failed");
        console.error("  expected:", data.res, " actual:", res);
    }
    for (let j = 0; j < res.length; j++) {
        if (res[j].pos !== data.res[j].pos || res[j].val !== data.res[j].val) {
            console.error(`Test ${i} failed`);
            console.error(`  [expected] pos:${data.res[j].pos}, val:${data.res[j].val}`)
            console.error(`  [actual]   pos:${res[j].pos}, val:${data.res[j].val}`)
        }
    }
})