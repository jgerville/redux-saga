// iterators


// strings and arrays are 'iterables'.
// that means we can construct iterators to consume their values
const str = "Hello";
const world = ["W", "o", "r", "l", "d"];

// it1 and it2 are called 'iterators'
// if we call .next on them, we get 'iterator results'
const it1 = str[Symbol.iterator]();
const it2 = world[Symbol.iterator]();

// iterator result example
// {value: xyz, done: false}

// we can use for...of to loop over the iterators, OR over the iterables
// the ... (spread operator) also iterates over an iterator/iterable
  // e.g. we can do arrOfLetters = [...str];
  // e.g. we can do arrOfLetters = [...it1];


// why does this matter? if we have our own data structure, as long as we
// expose a Symbol.iterator to it, we can let people use ... or for...of to iterate over it!

// What data structures don't have built-in iterators?
  // objects

  // luckily, it isn't too hard to define our own.

// here is an imperative approach to making an object iterable.
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function() {
    let keys = Object.keys(this);
    let index = 0;
    return {
      next: () =>
        (index < keys.length) ? 
          { done: false, value: this[keys[index++]] } :
          { done: true, value: undefined }
    };
  }
}
// we can do [...obj]
// [1, 2, 3]


// here's where generators become useful.
// when we invoke generators, they don't run; they instead produce an iterator.
// since it's an iterator, it has a .next()

// here is a declarative approach to making an object iterable.
const obj2 = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) {
      yield this[key];
    }
  }
}
// we can still do [...obj]
// [1, 2, 3]

// Exercise for myself: I want to do what he did in 56-65, but make the iterator yield keys AND values
const obj3 = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) {
      yield {[key]: this[key]};
    }
  }
}
// [...obj3] === [{a: 1}, {b: 2}, {c: 3}]

// Another exercise I made for myself: make the iterator yield keys only
const obj4 = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) {
      yield key;
    }
  }
}


// Kyle's exercise: turn an empty object into an iterable object
// if you use for...of, it should spit out values from 0 to 100 incrementing by 1 by default
// should also be able to call the iterator directly and make it go from x to y with step z

// attempt #1:
const numbers = {
  *[Symbol.iterator](first = 0, last = 100, step = 1) {
    for (let i = first; i < last; i += step) {
      yield i;
    }
  }
}
// [...numbers]                               // [0, 1, 2, 3, ..., 99]
// [...numbers[Symbol.iterator](10, 20, 3)]   // [10, 13, 16, 19]

// looks like he wanted the args to be passed in as an object, so here's attempt #2:
const numbers2 = {
  *[Symbol.iterator]({ first = 0, last = 100, step = 1 } = {}) {
    for (let i = first; i < last; i += step) {
      yield i;
    }
  }
}
// [...numbers]                               // [0, 1, 2, 3, ..., 99]
// let options = { last: 20, step: 4 };
// [...numbers[Symbol.iterator](options)]     // [0, 4, 8, 12, 16]