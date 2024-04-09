function constructDFA(pattern) {
    const m = pattern.length;
    const P = pattern.split('').map(char => char.charCodeAt(0) - 'a'.charCodeAt(0));
    const alphabetLength = 4;
    const dfa = new Array(m);
    for (let i = 0; i < m; i++) {
        dfa[i] = new Array(alphabetLength);
    }
    for (let i = 0; i < alphabetLength; i++) {
        dfa[0][i] = 0;
    }
    dfa[0][P[0]] = 1;
    let x = 0;
    for ( let j = 1; j < pattern.length; j++) {
        for (let i = 0; i < alphabetLength; i++) {
            dfa[j][i] = dfa[x][i];
        }
        dfa[j][P[j]] = j + 1;
        x = dfa[x][P[j]];
    }
    return dfa;

}
function dfa_str_match(){}

console.log(JSON.stringify(constructDFA("ababac")))
console.log(JSON.stringify(constructDFA("abcabdab")))