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

//  ex) 대상배열.split('대상 문자열 토막의 기준이 될 문자');
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  const result = fruits.split(',');
  console.log(result);  //  ['🍎', '🥝', '🍌', '🍒']
}


// Q3. make this array look like this: [5, 4, 3, 2, 1] (해당 배열의 순서를 뒤집어라)

// - reverse
//  : 대상 배열 요소들의 출력 배치 순서를 뒤집어서 변환한다
//    -> (중요) 배열 자체의 데이터가 변경된다는 사실 주의해야 함

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
// Q5 ~ 나머지 문제에 필요한 자료 (콜백함수 요구되는 메서드들)

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

// - find
//  : 대상 배열의 요소들 중 주어진 콜백함수 조건을 충족시키는 '첫번째 요소'를 뽑아내어 리턴한다 (없으면 undefined)

//  ex) 대상배열.find( function( 콜백함수 인자 ) { 조건식 } );
//      대상배열.find( ( 콜백함수 인자 ) => 조건식 );

//    # 콜백함수 인자 : 조건식 작성에 해당 개념이 필요한 경우 넣을 수 있는 녀석들... 필요한 것만 골라 넣으면 됨 (value에 해당하는 요소는 넣어줘야 할듯)
//      - item  변수 : 배열 내부 요소에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - index 변수 : 배열의 인덱스에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - array 변수 : 해당 배열 그 자체에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
{
  // 일반 함수 ver
  const resultNormal = students.find(function (student, index, array) {
    student.score === 90;
  });

  console.log(resultNormal);

  // 화살 ver
  const resultArrow = students.find((student) => student.score === 90);
  console.log(resultArrow);
}

// Q6. make an array of enrolled students (기존 배열에서 입학한 학생만 추려낸 새로운 배열을 만들어라)

// - filter
//  : 대상 배열의 요소들 중 주어진 콜백함수 조건을 충족시키는 요소를 뽑아내어 '새로운 배열'로 리턴한다

//  ex) 대상배열.filter( function( 콜백함수 인자 ) { 조건식 } );
//      대상배열.filter( ( 콜백함수 인자 ) => 조건식 );

//    # 콜백함수 인자 : 조건식 작성에 해당 개념이 필요한 경우 넣을 수 있는 녀석들... 필요한 것만 골라 넣으면 됨 (value에 해당하는 요소는 넣어줘야 할듯)
//      - item  변수 : 배열 내부 요소에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - index 변수 : 배열의 인덱스에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - array 변수 : 해당 배열 그 자체에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
{
  // 일반 함수 ver
  const resultNormal = students.filter(function (student, index, array) {
    student.enrolled;
  });

  console.log(resultNormal);
  
  // 화살 ver
  const resultArrow = students.filter((student) => student.enrolled);
  console.log(resultArrow);
}


// Q7. make an array containing only the students' scores (학생들의 점수만 추려서, 그것만 포함한 새로운 배열을 만들어라)
// result should be: [45, 80, 90, 66, 88]

// - map
//  : 대상 배열 요소 전체를 대상으로 콜백 함수를 호출하고, 함수 호출 결과를 새로운 배열로 반환한다 
//    (정확히는 map의 용도는 기존 배열 요소들을 모두 콜백함수를 통해 변환된 값으로 대체시키기라 보면 됨)

//  ex) 대상배열.map( function( 콜백함수 인자 ) { 원하는 요소의 형식 } );
//      대상배열.map( ( 콜백함수 인자 ) => 원하는 요소의 형식 );

//    # 콜백함수 인자 : 원하는 요소의 형식 작성에 해당 개념이 필요한 경우 넣을 수 있는 녀석들... 필요한 것만 골라 넣으면 됨 (value에 해당하는 요소는 넣어줘야 할듯)
//      - item  변수 : 배열 내부 요소에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - index 변수 : 배열의 인덱스에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - array 변수 : 해당 배열 그 자체에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)

{
  // 일반 함수 ver
  const resultNormal = students.map(function (student, index, array) {
    student.score;
  });

  console.log(resultNormal);
    
  // 화살 ver
  const resultArrow = students.map((student) => student.score);
  console.log(resultArrow);
}


// Q8. check if there is a student with the score lower than 50 (학생들 중 점수가 50점 이하인 녀석들이 있는지 없는지 여부를 확인하라)
{
  console.clear();

// - some (some과 대우 관계의 결과값 도출)
//  : 대상 배열의 요소들 중 주어진 콜백함수 조건을 충족시키는 요소가 하나라도 있는지 여부를 확인하여, boolean값으로 반환한다

//  ex) 대상배열.some( function( 콜백함수 인자 ) { 조건식 } );
//      대상배열.some( ( 콜백함수 인자 ) => 조건식 );

//    # 콜백함수 인자 : 조건식 작성에 해당 개념이 필요한 경우 넣을 수 있는 녀석들... 필요한 것만 골라 넣으면 됨 (value에 해당하는 요소는 넣어줘야 할듯)
//      - item  변수 : 배열 내부 요소에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - index 변수 : 배열의 인덱스에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - array 변수 : 해당 배열 그 자체에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)

  // 일반 함수 ver
  const resultNormal = students.some(function (student, index, array) {
    student.score < 50;
  });

  console.log(resultNormal);
    
  // 화살 ver
  const resultArrow = students.some((student) => student.score < 50);
  console.log(resultArrow);
 
// - every (some과 대우 관계의 결과값 도출)
//  : 대상 배열의 모든 요소들이 콜백함수의 조건을 충족하는지 여부를, boolean값으로 반환한다 

//  ex) 대상배열.every( function( 콜백함수 인자 ) { 조건식 } );
//      대상배열.every( ( 콜백함수 인자 ) => 조건식 );

//    # 콜백함수 인자 : 조건식 작성에 해당 개념이 필요한 경우 넣을 수 있는 녀석들... 필요한 것만 골라 넣으면 됨 (value에 해당하는 요소는 넣어줘야 할듯)
//      - item  변수 : 배열 내부 요소에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - index 변수 : 배열의 인덱스에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)
//      - array 변수 : 해당 배열 그 자체에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터 (변수명은 뭘로 줘도 됨)

  // 일반 함수 ver
  const result2Normal = students.every(function (student, index, array) {
    student.score >= 50;
  });

  console.log(result2Normal);
    
  // 화살 ver
  const result2Arrow = !students.every((student) => student.score >= 50);
  console.log(result2Arrow);
}

console.clear();


// Q9. compute students' average score (학생들의 평균점수를 도출해라)

// - reduce, reduceRight
//  : 대상 배열의 요소들의 값들을 기반으로 연산한 값을 도출할 때 쓰는 메서드 (주로 누적값 도출에 사용) 

//  ex) 대상배열.reduce( function( 이전 누적값 변수, 현재 배열요소 ) { return으로 끝나는 콜백 계산식 }, prev의 초기값 );
//      대상배열.reduce( ( 이전 누적값 변수, 현재 배열요소 ) => 콜백 계산식 , prev의 초기값);

//    # 추가 입력 가능 계산식 인자 : 계산식 작성에 해당 개념이 필요한 경우 넣을 수 있는 녀석들... (이전 누적값 변수, 현재 배열요소, prev의 초기값 은 넣어야 함)
//      - index 변수 : 배열의 인덱스에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터
//      - array 변수 : 해당 배열 그 자체에 해당하는 내용이 콜백함수에 필요할 때 쓸 파라미터

//    # reduce <-> reduceRight 의 차이
//      : reduce는 시작요소 -> 끝요소로 누적연산, reduceRight는 끝요소 -> 시작요소로 누적연산
{
  // 일반 함수 ver
  const resultNormal = students.reduce(function (prev, curr) {  // prev(이전 요소까지 계산한 결과값 누적한 변수), curr(현재 요소값)
    return prev + curr.score  // return 되는 녀석이 다음 순차에 prev로 간다
  }, 0);  //  0은 여기서 prev의 초기값

  console.log(resultNormal / students.length);
    
  // 화살 ver
  const resultArrow = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(resultArrow / students.length);
}


// Q10. make a string the scores with the score 50 (50점 이상 학생들의 모든 점수를 스트링으로 출력해라)
// result should be: '80, 90, 66, 88'
{
  const result = students
    .map((student) => student.score)
    .filter((score) => score >= 50)
    .join();
  console.log(result);
}


// Q11. do Q10 sorted in ascending order (Q10의 배열을 오름차순으로 정렬해서 스트링화 해라)
// result should be: '45, 66, 80, 88, 90'

// - sort
//  : 대상 배열의 요소들의 순서를 콜백함수 조건에 따라 '오름차순 (기본설정)', '내림차순' 하여 배열 내용 자체를 변경함
//    -> (중요) 배열 자체의 데이터가 변경된다는 사실 주의해야 함


//  ex1) [문자열 사전편집]   대상배열.sort();
//  ex2) [숫자 오름, 내림차] 대상배열.sort(현재 기준 뒤쪽 배열 요소, 현재  기준 앞쪽 배열 요소) { 그 두 수 간의 조건문 };

//  # sort 메서드 사용시 주의사항
//    a) 실행 후, 배열 자체의 데이터가 변경된다는 사실 주의해야 함
//    b) 그냥 sort()를 하면, 모든 요소가 문자열로 변환된 후 '오름차순'으로 정렬됨  
//    c) 요소들을 숫자 기준으로 정렬하고 싶으면, 파라미터 2개를 주고 조건식을 만들면 됨
//    d) 조건식을 만들어진 콜백함수로 넣어도 됨

//  # sort 메서드 숫자 정렬 사용법
//    - 오름차순 : sort ( function (a, b) { return a - b} );
//    - 내림차순 : sort ( function (a, b) { return b - a} );    // a - b 일때 설정된 return 내용을 뒤집는 형식이라 통용됨

//  # sort 메서드 숫자 정렬 기본 콜백함수와의 상호작용 매커니즘
//    : 현재 기준 뒤쪽 배열 요소 a, 현재 기준 앞쪽 배열 요소 b을 비교하고, 그 결과에 따라 
//      -> return 1  -> 오름차순 형식으로 자리 재배열 
//         return -1 -> 내림차순 형식으로 자리 재배열 

//    <숫자 정렬시 기본적으로 설정된 콜백함수>
//      : 이렇게 조건문을 통해 리턴값 1, -1을 주는 방식이나, a - b와 같은 수식의 결과로 리턴값을 +, - 로 받는거나 의도한 내용은 같기에
//        -> sort함수 작동에 무리는 없음

//      function compareNumeric(a, b) {     <- 콜백 내용을 바꾸고 return 값 배치를 다시하면, 이론상 정렬기준을 바꿀수도 있긴함
//         if (a > b) return 1;
//         if (a == b) return 0;
//         if (a < b) return -1;
//      }
{
  const result = students
    .map((student) => student.score)
    .sort((a, b) => b - a)
    .join();
  console.log(result);
}
