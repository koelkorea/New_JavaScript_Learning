// Object Destructuring (객체 구조분해 할당 구문)
//  : 존재를 기억하고 있으면 쉽게 사용 가능

const person = {
  name: 'Julia',
  age: 20,
  phone: '0107777777',
};

// ❌ Worst Code 💩💩💩
function displayPerson(person) {
  displayAvatar(person.name);
  displayName(person.name);
  displayProfile(person.name, person.age);
}

// ❌ Worst Code 💩💩💩
function displayPerson(person) {
  const name = person.name;
  const age = person.age;
  displayAvatar(name);
  displayName(name);
  displayProfile(name, age);
}

// ❌ Bad Code 💩
//  : 프로퍼티명 =/ 변수명이라면 정석적으로 이렇게 써야하나
function displayPerson(person) {
  const { name: name, age: age } = person;
  displayAvatar(name);
  displayName(name);
  displayProfile(name, age);
}

// ✅ Good Code ✨
//  : Shorthand property names이 적용되면 이야기가 달라짐
function displayPerson(person) {
  const { name, age } = person;
  displayAvatar(name);
  displayName(name);
  displayProfile(name, age);
}
