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
    const value = e.target.value.trim();
    if (value === "") return;

    // when you have spaces, we take the intersection
    const words = value.split(" ");
    let resSet = null;
    for (const word of words) {
        if (word == "") continue;
        const items = trie.prefixSearch(word);
        if (resSet === null) {
            resSet = new Set(items);
        } else {
            // experimental feature dropped today!!! 20240611
            resSet = resSet.intersection(new Set(items))
        }
    }


    let html = '';
    for (let item of resSet) {
        html += "<div>"
        html += items[item].name;
        html += "</div>"
    }
    resbox.innerHTML = html;
});
