const Benchmark = require('benchmark');

const assemblyScriptMergeSort = require('./index').MergeSort;

function MergeSort(items) {
    return divide(items);
}

function divide(items) {
    var halfLength = Math.ceil(items.length / 2);
    var low = items.slice(0, halfLength);
    var high = items.slice(halfLength);
    if (halfLength > 1) {
        low = divide(low);
        high = divide(high);
    }
    return combine(low, high);
}

function combine(low, high) {
    var indexLow = 0;
    var indexHigh = 0;
    var lengthLow = low.length;
    var lengthHigh = high.length;
    var combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
        var lowItem = low[indexLow];
        var highItem = high[indexHigh];
        if (lowItem !== undefined) {
            if (highItem === undefined) {
                combined.push(lowItem);
                indexLow++;
            } else {
                if (lowItem <= highItem) {
                    combined.push(lowItem);
                    indexLow++;
                } else {
                    combined.push(highItem);
                    indexHigh++;
                }
            }
        } else {
            if (highItem !== undefined) {
                combined.push(highItem);
                indexHigh++;
            }
        }
    }
    return combined;
}


const suite = new Benchmark.Suite;
const startNumber = 1000;
const stopNumber = 2;
const arr = [];

for (let i = startNumber; i > stopNumber; i--) {
    arr.push(i);
}
const sorted = assemblyScriptMergeSort(arr);
const sorted2 = MergeSort(arr)
console.log(sorted);
console.log(sorted2);

suite.add('AssemblyScript isPrime', function () {
    assemblyScriptMergeSort(arr);
}).add('JavaScript isPrime', function () {
    MergeSort(arr);
}).on('cycle', function (event) {
    console.log(String(event.target));
}).on('complete', function () {
    const fastest = this.filter('fastest');
    const slowest = this.filter('slowest');
    const difference = (fastest.map('hz') - slowest.map('hz')) / slowest.map('hz') * 100;
    console.log(`${fastest.map('name')} is ~${difference.toFixed(1)}% faster.`);
}).run();




