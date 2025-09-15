// Q1 - Write a JavaScript function that reverse a number. 
function reverseInt(n) {
  const sign = Math.sign(n);
  let x = Math.abs(n);
  const digits = [];
  while (x > 0) {
    digits.push(x % 10);
    x = (x / 10) | 0;
  }
  return digits.length ? sign * Number(digits.join("")) : 0;
}
console.log("Q1:", reverseInt(32243)); 

// Q2 — Write a JavaScript function that checks whether a passed string is palindrome or not? 
function isPalindrome(s) {
  const a = s.toLowerCase().replace(/[^0-9a-z]/g, "");
  let i = 0, j = a.length - 1;
  while (i < j) {
    if (a[i++] !== a[j--]) return false;
  }
  return true;
}
console.log("Q2:", isPalindrome("Madam"), isPalindrome("Hello"));

// Q3 - Write a JavaScript function that generates all combinations of a string. 
function substrCombos(str) {
  const out = [];
  for (let i = 0; i < str.length; i++) {
    let cur = "";
    for (let j = i; j < str.length; j++) {
      cur += str[j];
      out.push(cur);
    }
  }
  return out;
}
console.log("Q3:", substrCombos("frog"));

// Q4 — Write a JavaScript function that returns a passed string with letters in alphabetical order. 
const sortLetters = s => s.split("").sort((a,b)=>a.localeCompare(b)).join("");
console.log("Q4:", sortLetters("webmaster")); 

// Q5 - Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. 
function titleCase(sentence) {
  return sentence
    .toLowerCase()
    .replace(/\b[a-z]/g, ch => ch.toUpperCase());
}
console.log("Q5:", titleCase("the quick brown fox"));

// Q6 — Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
function longestWord(text) {
  return text.split(/\s+/).reduce((best,w)=> w.length>best.length? w:best, "");
}
console.log("Q6:", longestWord("Web Development Tutorial"));

// Q7 — Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
function countVowels(s) {
  const m = s.match(/[aeiou]/gi);
  return m ? m.length : 0;
}
console.log("Q7:", countVowels("The quick brown fox")); 

// Q8 — Write a JavaScript function that accepts a number as a parameter and check the number is prime or not. 
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
console.log("Q8:", isPrime(11), isPrime(15));

// Q9 — Write a JavaScript function which accepts an argument and returns the type
function typeOfValue(v) {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
}
console.log("Q9:", typeOfValue(42), typeOfValue("hi"), typeOfValue(null), typeOfValue([]), typeOfValue(()=>{}));

// Q10 — Write a JavaScript function which returns the n rows by n columns identity matrix. 
function identity(n) {
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => (r === c ? 1 : 0))
  );
}
console.log("Q10:");
console.table(identity(4));

// Q11 — Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
function secondExtremes(arr) {
  let min = Infinity, secondMin = Infinity;
  let max = -Infinity, secondMax = -Infinity;
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) continue;
    seen.add(x);
    if (x < min) { secondMin = min; min = x; }
    else if (x < secondMin) { secondMin = x; }
    if (x > max) { secondMax = max; max = x; }
    else if (x > secondMax) { secondMax = x; }
  }
  if (seen.size < 2) return null;
  return { secondSmallest: secondMin, secondLargest: secondMax };
}
console.log("Q11:", secondExtremes([1,2,3,4,5]));

// Q12 — Write a JavaScript function which says whether a number is perfect. 
function isPerfect(num) {
  if (num <= 1) return false;
  let sum = 1;
  for (let d = 2; d * d <= num; d++) {
    if (num % d === 0) {
      sum += d;
      const other = num / d;
      if (other !== d) sum += other;
    }
  }
  return sum === num;
}
console.log("Q12:", isPerfect(6), isPerfect(28), isPerfect(10));

// Q13 — Write a JavaScript function to compute the factors of a positive integer. 
function factorsOf(n) {
  if (n <= 0) return [];
  const low = [], high = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) {
      low.push(d);
      if (d * d !== n) high.push(n / d);
    }
  }
  return low.concat(high.reverse());
}
console.log("Q13:", factorsOf(28)); 

// Q14 — Write a JavaScript function to convert an amount to coins. 
function makeChange(amount, coins = [25,10,5,2,1]) {
  const res = {};
  for (const c of coins.sort((a,b)=>b-a)) {
    if (amount <= 0) break;
    const k = Math.floor(amount / c);
    if (k) { res[c] = k; amount -= k * c; }
  }
  return amount === 0 ? res : null;
}
console.log("Q14:", makeChange(46));

// Q15 — Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result. 
function powInt(b, n) {
  if (n === 0) return 1;
  const neg = n < 0;
  let exp = Math.abs(n), base = b, ans = 1;
  while (exp > 0) {
    if (exp & 1) ans *= base;
    base *= base;
    exp >>= 1;
  }
  return neg ? 1 / ans : ans;
}
console.log("Q15:", powInt(2,3), powInt(5,0), powInt(2,-3)); 
