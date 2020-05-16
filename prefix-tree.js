/**
 * Initialize your data structure here.
 */

class Node {
    constructor() {
        this.keys = new Map();
        this.end = false;
    }
    setEnd() { this.end = true; }
    isEnd() { return this.end; }
}

var Trie = function() {
    this.root = new Node();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word, node = this.root) {
    if (word.length === 0) {
        node.setEnd();
        return;
    } else if (!node.keys.has(word[0])) {
        node.keys.set(word[0], new Node());
        return this.insert(word.substr(1), node.keys.get(word[0]));
    } else {
        return this.insert(word.substr(1), node.keys.get(word[0]));
    }
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word, complete = true) {
    let node = this.root;
    while (word.length > 1) {
        if (!node.keys.has(word[0])) {
            return false;
        } else {
            node = node.keys.get(word[0]);
            word = word.substr(1);
        }
    }
    if (complete)
        return node.keys.has(word) && node.keys.get(word).isEnd();
    else
        return node.keys.has(word);
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return this.search(prefix, false);
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
