"use strict";

const markov = require("./markov.js");

describe("testing getChains", function () {
  // variables outside of the beforeAll function
  let newMarkov;

  beforeAll(function () {
    // keep tests short
    let text = "Four score and seven years ago our fathers brought forth on";
    newMarkov = new markov.MarkovMachine(text);
  });

  test("test getChains Four", function () {
    let chains = newMarkov.getChains();

    expect(chains["Four"]).toEqual(["score"]);
  });
  test("test getChains years", function () {
    let chains = newMarkov.getChains();

    expect(chains["years"]).toEqual(["ago"]);
  });
  test("test getChains on", function () {
    let chains = newMarkov.getChains();

    expect(chains["on"]).toEqual([null]);
  });
});

describe("testing getText", function () {
  let newMarkov;
  let text;

  beforeAll(function () {
    let input = "a guy did a thing well";
    newMarkov = new markov.MarkovMachine(input);
    text = newMarkov.getText();
  });

  test("test getText", function () {
    console.log(text);
    expect(text.trim().endsWith("a thing well")).toBe(true);
  });
});

// describe("test getText", function () {
//   test("only 1 exact way to complete", function () {
//     let text = "One unique set of words";
//     let newMarkov = new markov.MarkovMachine(text);

//     expect(newMarkov.get)

//   }
// })