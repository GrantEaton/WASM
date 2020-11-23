// The entry file of your WebAssembly module.
// import "wasi";
// import {Console} from "as-wasi";

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function isPrime(x: u32): bool {
  if (x < 2) {
    return false;
  }

  for (let i: u32 = 2; i < x; i++) {
    if (x % i === 0) {
      return false;
    }
  }

  return true;
}

export function MergeSort(arr: Array<i8>): Array<i8> {
  // Console.log("hello");
  return divide(arr);
}

function divide(items: Array<i8>): Array<i8> {
  var halfLength = Math.ceil(items.length / 2) as i8;
  var low = items.slice(0, halfLength);
  var high = items.slice(halfLength);

  if (halfLength > 1) {
    low = divide(low);
    high = divide(high);
  }
  return combine(low, high);
}

function combine(low: Array<i8>, high: Array<i8>): Array<i8> {
  var indexLow: i8 = 0;
  var indexHigh: i8 = 0;
  const lengthLow = low.length;
  const lengthHigh = high.length;
  const combined: Array<i8> = [];

  while (indexLow < lengthLow || indexHigh < lengthHigh) {
    const lowItem: i8 = low[indexLow];
    const highItem: i8 = high[indexHigh];
    if (lowItem <= highItem) {
      combined.push(lowItem);
      indexLow++;
    } else {
      combined.push(highItem);
      indexHigh++;
    }
      combined.push(highItem);
      indexHigh++;
  }
  // Console.log(`${combined[0]}`)
  return combined;
}
