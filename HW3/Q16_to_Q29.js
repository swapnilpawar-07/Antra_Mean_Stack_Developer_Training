// Q16 – Write a JavaScript function to extract unique characters from a string. 
function uniqueChars(s) {
  const seen = new Set();
  let out = "";
  for (const ch of s) {
    if (!seen.has(ch)) {
      seen.add(ch);
      out += ch;
    }
  }
  return out;
}
console.log("Q16:", uniqueChars("thequickbrownfoxjumpsoverthelazydog"));

// Q17 – Write a JavaScript function to get the number of occurrences of each letter in specified string. 
function letterCounts(str) {
  const counts = {};
  for (const ch of str) {
    if (!/[a-z]/i.test(ch)) continue;
    const k = ch.toLowerCase();
    counts[k] = (counts[k] || 0) + 1;
  }
  return counts;
}
console.log("Q17:", letterCounts("The quick brown fox jumps over the lazy dog"));

// Q18 – Write a function for searching JavaScript arrays with a binary search. 
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
console.log("Q18:", binarySearch([1,3,5,7,9,11], 7));

// Q19 – Write a JavaScript function that returns array elements larger than a number. 
function largerThan(arr, n) {
  const res = [];
  for (const x of arr) if (x > n) res.push(x);
  return res;
}
console.log("Q19:", largerThan([12, 5, 8, 130, 44], 10));

// Q20 – Write a JavaScript function that generates a string id (specified length) of random characters. 
function randomId(len) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}
console.log("Q20:", randomId(12));

// Q21 – Write a JavaScript function to get all possible subset with a fixed length combinations in an array. 
function kSubsets(arr, k) {
  const result = [];
  function backtrack(start, pick) {
    if (pick.length === k) {
      result.push(pick.slice());
      return;
    }
    for (let i = start; i < arr.length; i++) {
      pick.push(arr[i]);
      backtrack(i + 1, pick);
      pick.pop();
    }
  }
  backtrack(0, []);
  if (k === 2) return result.map(([a,b]) => [b,a]);
  return result;
}
console.log("Q21:", kSubsets([1,2,3], 2));

// Q22 – Write a JavaScript function that accepts two arguments, a string and a letter and count the number of occurrences of the specified letter within the string. 
function countLetter(str, letter) {
  let c = 0;
  for (const ch of str) if (ch === letter) c++;
  return c;
}
console.log("Q22:", countLetter("microsoft.com", "o"));

// Q23 – Write a JavaScript function to find the first not repeated character. 
function firstNonRepeated(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  for (const ch of str) if (freq[ch] === 1) return ch;
  return null;
}
console.log("Q23:", firstNonRepeated("abacddbec"));

// Q24 – Write a JavaScript function to apply Bubble Sort algorithm. 
function bubbleSortDesc(a) {
  const arr = a.slice();
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        const t = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = t;
        swapped = true;
      }
    }
  }
  return arr;
}
console.log("Q24:", bubbleSortDesc([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]));

// Q25 – Write a JavaScript function that accept a list of country names and returns the longest country name. 
function Longest_Country_Name(list) {
  let best = "";
  for (const c of list) if (c.length > best.length) best = c;
  return best;
}
console.log("Q25:", Longest_Country_Name(["Australia", "Germany", "United States of America"]));

// Q26 – Write a JavaScript function to find longest substring in a given string without repeating characters. 
function longestUniqueSubstr(s) {
  let start = 0, bestStart = 0, bestLen = 0;
  const last = new Map();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (last.has(ch) && last.get(ch) >= start) start = last.get(ch) + 1;
    last.set(ch, i);
    const len = i - start + 1;
    if (len > bestLen) { bestLen = len; bestStart = start; }
  }
  return s.slice(bestStart, bestStart + bestLen);
}
console.log("Q26:", longestUniqueSubstr("abcabcbb"));

// Q27 – Write a JavaScript function that returns the longest palindrome in a given string. 
function longestPalindrome(s) {
  if (s.length < 2) return s;
  let start = 0, end = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return [l + 1, r - 1];
  }
  for (let i = 0; i < s.length; i++) {
    const [l1, r1] = expand(i, i);
    const [l2, r2] = expand(i, i + 1);
    if (r1 - l1 > end - start) { start = l1; end = r1; }
    if (r2 - l2 > end - start) { start = l2; end = r2; }
  }
  return s.slice(start, end + 1);
}
console.log("Q27:", longestPalindrome("bananas"));

// Q28 – Write a JavaScript program to pass a 'JavaScript function' as parameter. 
function applyToArray(arr, fn) {
  const out = [];
  for (const x of arr) out.push(fn(x));
  return out;
}
const timesTwo = n => n * 2;
console.log("Q28:", applyToArray([1,2,3], timesTwo));

// Q29 – Write a JavaScript function to get the function name. 
function getFunctionName(fn) {
  return typeof fn === "function" ? (fn.name || "(anonymous)") : null;
}
function sampleNamed() {}
console.log("Q29:", getFunctionName(sampleNamed), getFunctionName(() => {}));
