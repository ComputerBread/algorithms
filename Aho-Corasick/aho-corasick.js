const FAIL = -1;
const alphabetLength = 5; // ASCII

function addNewState(g) {
    let m = g.length;
    g.push(new Array(alphabetLength));
    for (let i = 0; i < alphabetLength; i++) g[m][i] = FAIL;
}

function AhoCorasick(text) {
    // const keywords = ["he", "she", "his", "hers"];
    const keywords = ["ab", "dab", "aed", "abcd"];
    // h -> a, e -> b, r -> c, s -> d, i -> e
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

    const failure = failureFunc(g, output);
    console.table(g);
    console.log(JSON.stringify(failure));
    console.table(output);

    // because of newstate
    function enter(keyword) {
        const m = keyword.length;
        let state = 0;
        let j = 0;
        let c;
        while (j < m && g[state][c = keyword[j].charCodeAt(0)-97] != FAIL) {
            // nah I am goign to jail for this, now i am real ninja programmar, ahah you got it, it's funny because
            state = g[state][c];
            j++;
        }
        for (let p = j; p < m; p++) {
            newstate++;
            g[state][keyword[p].charCodeAt(0)-97] = newstate;
            state = newstate;
            addNewState(g);
        }

        if (!output.has(state)) {
            output.set(state, new Set());
        }
        output.get(state).add(keyword);
    }

    // pattern matching
    let state = 0;
    for ( let i = 0; i < text.length; i++) {
        while (g[state][text[i].charCodeAt(0) - 97] === FAIL) {
            state = failure[state];
        }
        state = g[state][text[i].charCodeAt(0) - 97]
        if (output.has(state)) {
            console.log(output.get(state), " found at position: ", i);
        }
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
        let state;

        for (let a = 0; a < alphabetLength; a++) {
            let s;
            if ((s = g[r][a]) === FAIL) continue;

            queue.push(s);
            state = failure[r];
            while(g[state][a] === FAIL) {
                state = failure[state];
            }

            failure[s] = g[state][a];
            console.log(s);
            if (!output.has(s) && output.has(failure[s])) {
                output.set(s,new Set());
            }
            if (output.has(failure[s]))
                output.get(s).add(...output.get(failure[s]));
        }

        
    }

    return failure;
}

AhoCorasick("abcdeababababdabdecabdebacbbdebabcbdbabcabcbabdebcbabcdebcabde");