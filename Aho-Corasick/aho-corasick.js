const FAIL = -1;
const alphabetLength = 128; // ASCII

function addNewState(g) {
    g.push(new Array(alphabetLength));
    for (let i = 0; i < alphabetLength; i++) g[0][i] = FAIL;
}

function AhoCorasick() {
    const keywords = ["hers", "his", "she"];
    let newstate = 0;

    const g = [];
    addNewState(g);

    const output = new Map();

    for (let i = 0; i < keywords.length; i++) {
        enter(keywords[i]);
    }
    for (let a = 0; a < alphabetLength; a++) {
        if (g[0][a] === FAIL) {
            g[0][a] = 0;
        }
    }

    console.table(g);
    console.table(failureFunc(g, output));
    console.table(output);

    // because of newstate
    function enter(keyword) {
        const m = keyword.length;
        let state = 0;
        let j = 0;
        while (g[state][c = keyword[j].charCodeAt(0)] != FAIL) {
            // nah I am goign to jail for this, now i am real ninja programmar, ahah you got it, it's funny because
            state = g[state][c];
            j++;
        }
        for (let p = j; p < m; p++) {
            newstate++;
            g[state][keyword[p].charCodeAt(0)];
            state = newstate;
            addNewState(g);
        }

        if (!output.has(state)) {
            output.set(state, new Set());
        }
        output.get(state).add(keyword);
    }

}


// what your mom think you are
function failureFunc(g, output) {
    const failure = new Array(g.length-1);
    const queue = [];
    g[0].forEach(s => {
       if (s != 0) {
        queue.push(s);
        failure[s] = 0;
       }
    });

    while (queue.length != 0) {
        let r = queue.shift();


        for (let a = 0; a < alphabetLength; a++) {
            let s;
            if ((s = g[r][a]) === FAIL) continue;
            do {
                state = failure[r];
            } while(g[r][a] === FAIL);
            failure[s] = g[state][a];
            output[s].add(output[failure[s]]);
        }

        
    }

    return failure;
}

AhoCorasick();