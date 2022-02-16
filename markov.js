/** Textual markov chain generator. */
// const text = process.argv[2];
const fsP = require("fs/promises");


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   * 
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null]
   *  }
   * 
   * */

  getChains() {
    const wordMap = {}
    for (let i = 0; i < this.words.length; i++) {
      let currentWord = this.words[i];
      let nextWord = this.words[i + 1] === undefined ? null : this.words[i + 1];
      if (wordMap[currentWord] === undefined) {
        wordMap[currentWord] = [nextWord];
      } else {
        wordMap[currentWord].push(nextWord);
      }
    }
    return wordMap;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!
    let currentWord = this.words[0];
    let text = [currentWord];
    let nextWordList = []
    let nextWordNumChoices;
    let nextWordIdx;
    let nextWord;

    while (nextWord !== null) {
      nextWordList = this.chains[currentWord];
      nextWordNumChoices = nextWordList.length;
      nextWordIdx = Math.floor(Math.random() * nextWordNumChoices);
      nextWord = nextWordList[nextWordIdx];
      text.push(nextWord);
      currentWord = nextWord;
    }

    return text.join(' ');

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
  }
}


let newMarkov = new MarkovMachine("Four score and seven years ago our fathers brought forth on this continent");
console.log('newMarkov.chains', newMarkov.chains);
console.log('newMarkov.getText', newMarkov.getText());



module.exports = { MarkovMachine: MarkovMachine }