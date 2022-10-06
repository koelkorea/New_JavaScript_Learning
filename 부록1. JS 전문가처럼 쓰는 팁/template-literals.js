// Template Literals (Template String)
//  : `을 사용해서 문자열 쉽게 붙이자

const person = {
  name: 'Julia',
  score: 4,
};

// ❌ Bad Code 💩
console.log(
  'Hello ' + person.name + ', Your current score is: ' + person.score
);

// ✅ Good Code ✨
console.log(`Hello ${person.name}, Your current score is: ${person.score}`);

// ✅ Good Code ✨
//  : 구조분해할당 구문을 통하면 더 쉽게 사용 가능함 
const { name, score } = person;
console.log(`Hello ${name}, Your current score is: ${score}`);

// ✅ Good Code ✨
//  : 그걸 함수로 쪼개주면 더 쓰기 쉽다
function greetings(person) {
  const { name, score } = person;
  console.log(`Hello ${name}, Your current score is: ${score}`);
}
