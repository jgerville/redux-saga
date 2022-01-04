// generator functions remind me of currying: can be paused midway

// different notation: no arrows, always has asterisk

// returns a function
function* generate() {
  console.log('invoked 1st time');
  yield 1;
  console.log('invoked second time');
  yield 2;
}

// if we call .next() on the returned function, it returns an object
// e.g. const generated = generate();
//      const firstResult = generated.next();
          // {value: 1, done: false}
//      const secondResult = generated.next();
          // {value: 2, done: false}
//      const otherResult = generated.next();
          // {value: undefined, done: true}


// apparently that just means it returns an iterator, and all iterators (like for loops) work that way.
class myIterator {
  constructor(start = 0, end = Infinity, interval = 1) {
    this.start = start;
    this.end = end;
    this.interval = interval;
  }

  myFor() {
    let counter = 0;
    let nextIndex = this.start;

    return {
      next: () => {
        if (nextIndex <= this.end) {
          let result = { value: nextIndex, done: false }
          nextIndex += this.interval;
          counter++;
          return result;
        } else {
          return { value: counter, done: true }
        }
      }
    }
  }
}

// all of that means that we can use a for..of loop on the function a generator returns!
// e.g.
// let gen = generate();
// let arrayOfValues = [];
// for (const step of gen) {
//   arrayOfValues.push(step);
// }
// in this case, the array will contain all of the values of each step.


// we can infinitely call next() on the function this generates.
// don't use a for...of loop here though lol
function* forever() {
  let index = 0;
  while (true) {
    yield index++;
  }
}


class Bag {
  constructor() {
    this.elements = [];
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  add(element) {
    this.elements.push(element);
  }

  // adding a Symbol.iterator to a class allows you to loop through it
  * [Symbol.iterator]() {
    for (const element of this.elements) {
      yield element;
    }
  }
}

let bag = new Bag();

bag.add(1);
bag.add(2);
bag.add(3);

// this works thanks to the generator we used in the Symbol.iterator class method
for (let e of bag) {
    // console.log(e);
}



