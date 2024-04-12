function constructDFA(pattern) {
    const m = pattern.length;
    //const P = pattern.split('').map(char => char.charCodeAt(0) - 'a'.charCodeAt(0));
    const P = pattern.split('').map(char => char.charCodeAt(0));
    const alphabetLength = 128; // ASCII

    // Create transition matrix (m+1 states, alphabet length letters)
    const transitions = new Array(m+1);
    for (let i = 0; i <= m; i++) {
        transitions[i] = new Array(alphabetLength);
    }
    // initialize first row to 0. In state 0, all letters go to zero...
    for (let i = 0; i < alphabetLength; i++) {
        transitions[0][i] = 0;
    }
    // ...except first letter of pattern, which leads to state 1.
    transitions[0][P[0]] = 1;

    let x = 0; // state in which automaton is after reading P[1..q-1]

    for ( let q = 1; q <= m; q++) {
        for (let i = 0; i < alphabetLength; i++) {
            transitions[q][i] = transitions[x][i];
        }
        transitions[q][P[q]] = q + 1;
        x = transitions[x][P[q]];
    }
    return transitions;
}

function dfa_str_match(pattern, text){
    const n = text.length;
    const m = pattern.length;
    const occurences = [];
    const dfa = constructDFA(pattern);
    //const T = text.split('').map(char => char.charCodeAt(0) - 'a'.charCodeAt(0));
    const T = text.split('').map(char => char.charCodeAt(0));
    let state = 0;
    for ( let i = 0; i < n; i++ ) {
        state = dfa[state][T[i]];
        if (state === m) {
            occurences.push(i-m+1);
        }
    }
    return occurences;
}

console.log(JSON.stringify(constructDFA("ababac")))
console.log(JSON.stringify(constructDFA("abcabdab")))
const text = "aaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaabbbbbbbbbbbbbbbbbbbabaaaaaababbbbbaba";
console.log(dfa_str_match("aba",text))
console.log(text.slice(27, 30))
console.log(text.slice(55, 58))
console.log(text.slice(62, 65))
console.log(text.slice(70, 73))