import { dictionary } from "../dictionary/dictionary.js";
import { CompressedTrie } from "./CompressedTrie.js";

const searchbox = document.getElementById("searchbox");
const resbox = document.getElementById("resbox");

console.log(dictionary[0].word)

const compressedTrie = new CompressedTrie();
for (let i = 0; i < dictionary.length; i++) {
    compressedTrie.insert(dictionary[i].word.toLowerCase(), i);
}

searchbox.addEventListener("keyup", function (e) {
    e.preventDefault();
    const value = e.target.value.trim().toLowerCase();
    if (value === "") {
        resbox.innerHTML = "";
        return;
    }

    const ids = compressedTrie.partialSearch(value);
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
console.log("compressed trie, node count: ", compressedTrie.totalNodeCount) // 45643 (35% of regular trie)