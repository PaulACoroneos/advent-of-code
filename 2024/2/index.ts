import * as fs from 'fs';
import * as path from 'path';

const dirname = path.dirname(__filename);
const filePath = path.join(dirname, 'input.txt');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const reports = fileContent.split('\n').map(line => line.split(' ').map(Number));

function isSafe(report: number[]): boolean {
  const isDecreasing = report[0] > report[1];
  for (let i = 1; i < report.length; i++) {
    //case I values are equal
    if (report[i - 1] === report[i]) {
      return false;
    }
    //case II values differ by more than 3
    if(Math.abs(report[i - 1] - report[i]) > 3) {
      return false;
    }
    //Case III we flip polarity trend wise
    if ((report[i - 1] < report[i]) === isDecreasing) {
      return false;
    }
  }
  return true;
}

function isSafeWithDampener(report: number[]): boolean {
  //base case. it already works then just re-call original func
  if (isSafe(report)) {
    return true;
  }
  //otherwise try again after slicing off the "bad" value in report. Note this just happens "once"
  for (let i = 0; i < report.length; i++) {
    const newReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(newReport)) {
      return true;
    }
  }
  return false;
}

let numSafeReportsWithDampener = 0;
let numSafeReports = 0

for (const report of reports) {
  if(isSafe(report)) {
    numSafeReports++;
  }
  if (isSafeWithDampener(report)) {
    numSafeReportsWithDampener++;
  }
}

console.log(`Number of safe reports: ${numSafeReports}`);
console.log(`Number of safe reports with dampener: ${numSafeReportsWithDampener}`);