// Ternary Operator (삼항연산자)
//  : if else만 쓸거면, 3항으로 가즈아~

// ❌ Bad Code 💩
function getResult(score) {
  let result;
  if (score > 5) {
    result = '👍';
  } else if (score <= 5) {
    result = '👎';
  }
  return result;
}

// ✅ Good Code ✨
function getResult(score) {
  return score > 5 ? '👍' : '👎';
}

console.log(getResult(6));
console.log(getResult(5));
