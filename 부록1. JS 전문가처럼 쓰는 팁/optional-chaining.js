// Optional Chaining
//  : 객체의 구조가 뒤죽박죽인 경우, null문제로 인한 에러를 막기 위해 Optional Chaining (객체명.프로퍼티명?.프로퍼티명?...값)으로 쉽게 가자

const bob = {
  name: 'Julia',
  age: 20,
};
const anna = {
  name: 'Julia',
  age: 20,
  job: {
    title: 'Software Engineer',
  },
};

// ❌ Bad Code 💩
function displayJobTitle(person) {
  if (person.job && person.job.title) {
    console.log(person.job.title);
  }
}

// ✅ Good Code ✨
function displayJobTitle(person) {
  if (person.job?.title) {
    console.log(person.job.title);
  }
}

// ✅ Good Code ✨
function displayJobTitle(person) {
  const title = person.job?.title ?? 'No Job Yet 🔥';
  console.log(title);
}

displayJobTitle(bob);
displayJobTitle(anna);
