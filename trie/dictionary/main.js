import { dictionary } from "./dictionary.js";
import { Trie } from "./trie.js";
import { CompressedTrie } from "./CompressedTrie.js";

const searchbox = document.getElementById("searchbox");
const resbox = document.getElementById("resbox");

console.log(dictionary[0].word)

const trie = new Trie();
const compressedTrie = new CompressedTrie();
for (let i = 0; i < dictionary.length; i++) {
    trie.insert(dictionary[i].word.toLowerCase(), i);
    compressedTrie.insert(dictionary[i].word.toLowerCase(), i);
}

console.log(trie.root)

searchbox.addEventListener("keyup", function (e) {
    e.preventDefault();
    const value = e.target.value.trim().toLowerCase();
    if (value === "") {
        resbox.innerHTML = "";
        return;
    }

    const ids = trie.partialSearch(value);
    console.log("ids for ", value, ": ", ids)
    let html = '';
    for (let id of ids) {
        html += "<div>"
        html += dictionary[id].definition;
        html += "</div>"
    }
    resbox.innerHTML = html;

});

console.log("normal     trie, node count: ", trie.totalNodeCount) // 131221
console.log("compressed trie, node count: ", compressedTrie.totalNodeCount) // 45643