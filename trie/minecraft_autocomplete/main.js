import { CompressedTrie } from "./trie.js";
import { items } from "./data.js";

const searchbox = document.getElementById("searchbox");
const resbox = document.getElementById("resbox");


const trie = new CompressedTrie();
for (let i = 0; i < items.length; i++) {
    const words = items[i].name.toLowerCase().split(" ");
    for (let word of words) {
        trie.insert(word, i);
    }
}

searchbox.addEventListener("keyup", function (e) {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "") return;
    const res = trie.prefixSearch(e.target.value);
    console.log(res)
    let html = '';
    for (let item of res) {
        html += "<div>"
        html += items[item].name;
        html += "</div>"
    }
    resbox.innerHTML = html;
});
