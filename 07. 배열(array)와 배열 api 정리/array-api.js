// [Array API]

// Q1. make a string out of an array (해당 배열 -> 스트링으로 출력)

// - join
//  : 대상 배열 요소를 하나하나 꺼내서 하나의 스트링으로 생성 (파라미터로 들어간 문자열이 사이사이에 추가됨)

//  ex) 대상배열.join('요소 사이 칸막이로 쓸 문자열');

{
  const fruits = ['apple', 'banana', 'orange'];
  const result = fruits.join(',');
  console.log(result);    // 'apple', 'banana', 'orange'
}

// Q2. make an array out of a string (해당 스트링 -> 배열 출력)

// - split
//  : 대상 스트링 요소를 파라미터로 들어간 문자열을 기준으로 토막내서, 하나하나 배열의 요소로 투입한 배열을 생성 (파라미터로 들어간 문자열이 사이사이에 추가됨)

//  ex) 대상배열.split('대상 문자열 토막의 기준');

{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  const result = fruits.split(',');
  console.log(result);  //  ['🍎', '🥝', '🍌', '🍒']
}

// Q3. make this array look like this: [5, 4, 3, 2, 1] (해당 배열의 순서를 뒤집어라)

// - reverse
//  : 대상 배열 요소들의 출력 배치 순서를 뒤집은 배열을 생성한다

//  ex) 대상배열.reverse();

{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.log(result);
  console.log(array);
}

// Q4. make new array without the first two elements (대상 배열의 처음 2개의 요소가 빠진 배열을 새로 생성해라)

// - slice
//  : 대상 배열의 시작인덱스 ~ 끝 인덱스 바로 직전까지의 요소만 대상으로 포함한 배열을 새로 생성한다

//  ex) 대상배열.slice(시작인덱스, 끝 인덱스);

{
  const array = [1, 2, 3, 4, 5];
  const result = array.slice(2, 5);
  console.log(result);  // [1, 2, 3, 4, 5];
  console.log(array);   // [3, 4, 5];
}

//------------------------------------------------------------------------------------------------
// Q5 ~ 나머지 문제에 필요한 자료

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

//------------------------------------------------------------------------------------------------


// Q5. find a student with the score 90 (90점 이상의 학생만 찾아내라)
{
  const result = students.find((student) => student.score === 90);
  console.log(result);
}

// Q6. make an array of enrolled students (입학한 학생만 추려서, 새로운 배열을 만들어라)
{
  const result = students.filter((student) => student.enrolled);
  console.log(result);
}

// Q7. make an array containing only the students' scores (학생들의 점수만 추려서, 새로운 배열을 만들어라)
// result should be: [45, 80, 90, 66, 88]
{
  const result = students.map((student) => student.score);
  console.log(result);
}

// Q8. check if there is a student with the score lower than 50
{
  console.clear();

  const result = students.some((student) => student.score < 50);
  console.log(result);

  const result2 = !students.every((student) => student.score >= 50);
  console.log(result2);
}

console.clear();

// Q9. compute students' average score (학생들의 평균점수를 도출해라)
{
  const result = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(result / students.length);
}

// Q10. make a string containing all the scores (학생들의 모든 점수를 스트링으로 출력해라)
// result should be: '45, 80, 90, 66, 88'
{
  const result = students
    .map((student) => student.score)
    .filter((score) => score >= 50)
    .join();
  console.log(result);
}

// Q11. do Q10 sorted in ascending order (Q10의 배열을 오름차순으로 정렬해서 스트링화 해라)
// result should be: '45, 66, 80, 88, 90'
{
  const result = students
    .map((student) => student.score)
    .sort((a, b) => b - a)
    .join();
  console.log(result);
}
