import * as fs from 'fs';



const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.split('\n');

const list1: number[] = [];
const list2: number[] = [];

for (const line of lines) {
  const [num1, num2] = line.split('  ').map(Number);
  list1.push(num1);
  list2.push(num2);
}

const sortedList1 = list1.sort();
const sortedList2 = list2.sort();

// Part One
let sum = 0;

for (let i =0; i < sortedList1.length; i++) {
  sum += Math.abs(sortedList1[i]- sortedList2[i]);
}

console.log('part 1 sum',sum)

// Part Two

let similaritySum = 0;
const hash: Record<number,number> = {};

//create initial lookup table with list 1 values
for (let i =0; i < sortedList1.length; i++) {
  hash[sortedList1[i]] = 0;
}

// now set the count of similar values per each number in list 1 using list 2
for (let i =0; i < sortedList1.length; i++) {
  hash[sortedList2[i]]++;
}

//now lets iterate through hash and calculate the similarity score
for (let i =0; i < sortedList1.length; i++) {
  similaritySum += sortedList1[i] * hash[sortedList1[i]];
}
console.log('similarity sum for part 2', similaritySum)