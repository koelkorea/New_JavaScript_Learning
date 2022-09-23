// 1. String concatenation (문자열 합치기)
//  - 문자열 + 문자열
//  - 문자열 + 숫자 -> 문자숫자로 변환해서 연결해줌 
//  - `(백틱) 안에서 ${ } 안에 변수나 객체의 맴버변수등을 사용해서, 해당 내용을 문자열에 포함시킬 수 있다
console.log('my' + ' cat'); // my cat
console.log('1' + 2); // '12'
console.log(`string literals: 1 + 2 = ${1 + 2}`); //string literals: 1 + 2 = 3

//  # ''로 선언한 문자열에 특수기호를 넣고 싶다면?
//    : \n (줄바꾸기), \' (쉼표) 등 \를 사용해서 알아보면 됨

// 2. Numeric operators
console.log(1 + 1); // add
console.log(1 - 1); // substract
console.log(1 / 1); // divide
console.log(1 * 1); // multiply
console.log(5 % 2); // remainder
console.log(2 ** 3); // exponentiation

// 3. Increment and decrement operators (증가, 증감 연산자)
//  : ++, --을 사용하는 연산자로 
//    -> (중요)
//        - (ex ++변수명) 연산자가 앞에 있으면, 그 자리에서 1을 바로 증감 후 변수에 업뎃해 반영
//        - (ex 변수명++) 연산자가 뒤에 있으면, 당장은 1을 증감하지 않고, 해당 연산자와 연관된 표기가 끝난 이후 변수를 업뎃해 반영
let counter = 2;
const preIncrement = ++counter;
// counter = counter + 1;
// preIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);

const postIncrement = counter++;
// postIncrement = counter;
// counter = counter + 1;
console.log(`postIncrement: ${postIncrement}, counter: ${counter}`);

const preDecrement = --counter;
console.log(`preDecrement: ${preDecrement}, counter: ${counter}`);

const postDecrement = counter--;
console.log(`postDecrement: ${postDecrement}, counter: ${counter}`);

// 4. Assignment operators (할당 연산자)
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y;
x *= y;
x /= y;

// 5. Comparison operators (비교 연산자)
console.log(10 < 6); // less than
console.log(10 <= 6); // less than or equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // greater than or equal

// 6. Logical operators (논리 연산자)
//  : || (or), && (and), ! (not)

// # often used to compress long if-statement (X중 조건문의 실행을 효율적으로 하기 위해 || &&를 사용하기도 한다)
// # nullableObject && nullableObject.something (객체에 null값이 있는 경우 여부의 빠른 판별을 위해서, X중 &&구문을 사용하기도 한다)

const value1 = true;
const value2 = 4 < 2;

// - || (or)
//  : finds the first truthy value 
//    (x중 or구문은 하나라도 참이면 성립하니, 엔진은 순차적으로 하나라도 참이 나오면, 뒤는 더 보지 않기에)
//      -> 연산이 무거운 건 논리변수 및 함수는 가급적 뒤에다 두는게 효율적임
console.log(`or: ${value1 || value2 || check()}`);

// - && (and)
//  : finds the first falsy value
//    (x중 and구문은 하나라도 거짓이면 성립하니, 엔진은 순차적으로 하나라도 거짓이 나오면, 뒤는 더 보지 않는다)
//      -> 연산이 무거운 건 논리변수 및 함수는 가급적 뒤에다 두는게 효율적임
console.log(`and: ${value1 && value2 && check()}`);

function check() {
  for (let i = 0; i < 10; i++) {
    //wasting time
    console.log('😱');
  }
  return true;
}

// - ! (not)
console.log(!value1);

// 7. Equality (동등 연산자 == , 일치 연산자 ===)
//  : 피연산자들의 내용 일치 여부를 판단하는 연산자
//    -> (중요) 둘의 차이는 일치여부 기준이 단순 내용만 같은지 보냐(==)? 아니면 자료형까지 같아야 하나(===)? 에 있다
const stringFive = '5';
const numberFive = 5;

// - 동등 연산자 == 
//  : loose equality, with type conversion
//    (자료형이 변경되어도 내용이 같기만 하면 같다고 느슨한 판정)
console.log(stringFive == numberFive);
console.log(stringFive != numberFive);

// - 일치 연산자 === 
//  : strict equality, no type conversion
//    (자료형까지 일치여부를 확인하여, 일치여부 확인하는 엄격한 판정)
console.log(stringFive === numberFive);
console.log(stringFive !== numberFive);

// # object equality by reference
const ellie1 = { name: 'ellie' };
const ellie2 = { name: 'ellie' };
const ellie3 = ellie1;

console.log(ellie1 == ellie2);  // false : 참고하는 ref가 다르기에, 참고하는 객체도 다르기에, 당연히 내용도 다름
console.log(ellie1 === ellie2); // false : 이미 객체의 내용도 다르지만, 자료형까지 ellie1과 ellie2로 각각 다름
console.log(ellie1 === ellie3); // true : 자료형이 ellie1을 보기까지 같음

// false에 속하는 값들 equality 예시
console.log(0 == false);          // true
console.log(0 === false);         // false : 0은 number =/ false는 boolean
console.log('' == false);         // true
console.log('' === false);        // false : ''은 string =/ false는 boolean
console.log(null == undefined);   // true
console.log(null === undefined);  // false : null과 undefined는 다른 자료형

// 8. Conditional operators(조건 연산자) : if

// if, else if, else
const name = 'df';
if (name === 'ellie') {
  console.log('Welcome, Ellie!');
} else if (name === 'coder') {
  console.log('You are amazing coder');
} else {
  console.log('unkwnon');
}

// 9. Ternary operator(삼항 연산자) : ?

// condition ? value1 : value2;
console.log(name === 'ellie' ? 'yes' : 'no');

// 10. Switch statement(스위치 구문)

// use for multiple if checks
// use for enum-like value check
// use for multiple type checks in TS
const browser = 'IE';
switch (browser) {
  case 'IE':
    console.log('go away!');
    break;
  case 'Chrome':
  case 'Firefox':
    console.log('love you!');
    break;
  default:
    console.log('same all!');
    break;
}

// 11. Loops (반복문)

// - while loop
//   : while the condition is truthy, body code is executed
//     (내용이 조건에 true값이 나올때까지 반복함)
let i = 3;
while (i > 0) {
  console.log(`while: ${i}`);
  i--;
}

// - do while loop
//    : body code is executed first, then check the condition.
//      (while과 같지만, do안의 내용을 먼저 시작하고, while구문 진행)
do {
  console.log(`do while: ${i}`);
  i--;
} while (i > 0);

// - for loop
//  : for(begin; condition; step)
for (i = 3; i > 0; i--) {
  console.log(`for: ${i}`);
}

for (let i = 3; i > 0; i = i - 2) {
  // inline variable declaration
  console.log(`inline variable for: ${i}`);
}

// # nested loops (이중 for문)
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    console.log(`i: ${i}, j:${j}`);
  }
}

// # break, continue
//  : 일종의 return 역할을 하는 구문으로
//    -> break : 그 자리에서 반복문 멈춤
//    -> continue : 현재의 싸이클을 skip하고, 다음 반복 싸이클로 넘어가서 반복문을 계속 수행

// Q1. iterate from 0 to 10 and print only even numbers (use continue)
for (let i = 0; i < 11; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log(`q1. ${i}`);
}

// Q2. iterate from 0 to 10 and print numbers until reaching 8 (use break)
for (let i = 0; i < 11; i++) {
  if (i > 8) {
    break;
  }
  console.log(`q2. ${i}`);
}
