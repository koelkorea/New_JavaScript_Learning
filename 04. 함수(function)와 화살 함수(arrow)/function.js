// [Function (함수)의 특징]
// - fundamental building block in the program 
//  : 프로그램을 구성하는 기본적 빌딩 블록
// - subprogram can be used multiple times 
//  : 여러번 재사용이 가능한 부수적 프로그램
// - performs a task or calculates a value 
//  : 1가지의 일을 하거나, 값을 계산하기 위해 사용

// 1. Function declaration (함수 선언하기)

//  EX) 
//  function name(param1, param2) { 
//    body... 
//    return 내용; 
//  }

//  # 함수 선언시 주의점
//    A) one function === one thing 
//       : 함수는 반드시 한가지 일만 하도록 설계되어야 한다

//       ex) createCardAndPoint -> createCard, createPoint

//    B) naming: doSomething, command, verb 
//       : 함수명은 동사형, 명령형으로 짓도록 추천됨

//    c) function is object in JS
//       : 함수는 JS에서 객체로 인정(일급시민) = 함수를 변수, 파라미터, 리턴값 등등에 전달 가능

//----------------------------------------------------------------------------------------
// (ex) 파라미터를 통한 함수 유용성 향상
function printHello() {
  console.log('Hello');
}
printHello(); //  'Hello'만 출력 가능

function log(message) { // 파라미터로 원하는 메시지가 출력되게 함
  console.log(message);
}
log('Hello@');
log(1234);
//----------------------------------------------------------------------------------------


// 2. (중요!) Parameters (파라미터 = 매개변수) 의 특징
// - primitive parameters : passed by value
//   : 파라미터가 원시형이면? 해당 변수의 값을 함수에 전달함
// - object parameters : passed by reference
//   : 파라미터가 객체형이면? 해당 객체가 저장된 메모리의 레퍼런스 값을 함수에 전달함


//----------------------------------------------------------------------------------------
// (ex) 객체가 파라미터일 경우 전달되는 것은 레퍼런스... 예제
function changeName(obj) {  // 객체를 전달받는 함수가 넘기는건 그 객체의 레퍼런스값
  obj.name = 'coder'; // 그 객체의 레퍼런스를 통해 해당 객체의 name값을 coder로 바꿈
}

const ellie = { name: 'ellie' };  // 리터럴 객체 생성!

changeName(ellie);  // 함수를 통해 ellie 변수가 가르치는 리버럴 객체의 레퍼런스의 name값을 변경
console.log(ellie);
//-----------------------------------------------------------------------------------------


// 3. Default parameters (기본 인자) (added in ES6)
//  : 함수 선언시 파라미터는 존재하지만, 실행시 지정하는 파라미터가 들어가지 않았을때, 명시될 적용될 파라미터 값

//----------------------------------------------------------------------------------------
// (ex) from값이 명시되지 않을경우 unknown으로 표기
function showMessage(message, from = 'unknown') {
  console.log(`${message} by ${from}`);
}

showMessage('Hi!'); //  Hi! by unknown
//-----------------------------------------------------------------------------------------


// 4. Rest parameters (나머지(여분) 매개변수) <-> Spread Grammer (스프레드 문법)
//  : (added in ES6) 파라미터의 수가 복수개 이상으로 특별히 정해지지 않은 함수의 경우, 
//    '...변수명'을 통해 선언하면, '파라미터들 -> 한개의 배열'로 전환하여 투입
//    -> 마침표 세 개 ...는 "남아있는 매개변수들을 한데 모아 배열에 집어넣어라."는 것을 의미 
//      (= 함수 실행시 파라미터들을 노가다로 채우던, 배열 데이터를 채우던, 걔들을 통째로 배열화하여 파라미터로 통째로 집어넣음)

//  # 나머지(여분) 매개변수 특징
//    A) 나머지 매개변수는 항상 마지막에 지정되는 파라미터여야 함 (= 남아있는 인수를 모으는 역할을 함)

//      ex) function f(arg1, ...rest) { } 

//    B) 추후 '객체 구조분해' 문법에도 활용 가능


//-----------------------------------------------------------------------------------------
// (ex) 나머지(여분) 매개변수 -> 매개변수의 배열화 된 후 투입
function printAll(...args) {

  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }

  for (const arg of args) { //  나머지 매개변수로 들어온 args는  배열이기에 of 문법으로 반복 가능
    console.log(arg);
  }

  args.forEach((arg) => console.log(arg)); //  나머지 매개변수로 들어온 args는  배열이기에 forEach 문법으로 반복 가능
}
printAll('dream', 'coding', 'ellie');
//-----------------------------------------------------------------------------------------


// 5. Spread Grammer (스프레드 문법) <-> Rest parameters (나머지(여분) 매개변수)
//  : (added in ES6) 파라미터의 수가 복수개 이상으로 특별히 정해지지 않은 함수의 경우, 
//    '...배열명'을 통해 선언하면, '배열요소들 -> 개별 파라미터'로 전환하여 투입

//  # 스프레드 문법 특징
//    A) 이터러블 객체 여러 개를 전달하는 것도 가능

//      ex) Math.max(...arr1, ...arr2)

//    B) 평범한 값과 혼합해 사용하는 것도 가능

//      ex) Math.max(...arr1, ...arr2)

//    C) 스프레드 문법은 배열을 합칠 때도 응용하여 활용

//      ex) let merged = [0, ...arr, 2, ...arr2];


// 6. Local scope (지역 스코프)
//  : 지역변수 관련 스코프 개념

//-----------------------------------------------------------------------------------------
// (ex) 이전의 블록 스코프, 함수 스코프와 비슷한 예시
let globalMessage = 'global'; // global variable

function printMessage() {

  let message = 'hello';  // local variable

  console.log(message); 
  console.log(globalMessage);

  function printAnother() {

    console.log(message);
    let childMessage = 'hello';

  }
  // console.log(childMessage); //error
}

printMessage();
//-----------------------------------------------------------------------------------------


// 7. Return a value
//  : 모든 함수는 리턴값이 있다.. ( (중요) void 같은건 return undefined가 생략된 것과 같다)
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2); // 3
console.log(`sum: ${sum(1, 2)}`);

// 8. Early return, early exit
//  : 블록문에서 조건식을 새울 때, 내용이 길어질 경우, 역발상으로 조건식의 조건이 조건에 맞지 않으면 빨리 리턴되도록 짜게 하면 효울 good

//-----------------------------------------------------------------------------------------
// bad
function upgradeUser(user) {

  // 조건에 맞는 경우 -> 업그레이드 로직... 
  if (user.point > 10) {
    // long upgrade logic...  (내용이 길어지면 퍼포먼스에 영향)
  }
}

// good
function upgradeUser(user) {

  // 조건에 안 맞는 애들 -> 빠른 리턴으로 빠져나오기
  if (user.point <= 10) {
    return;
  }
  // long upgrade logic... (조삼모사 같지만, 어차피 작업할거면 굳이 스코프에서 진행시킬 이유 없음)
}
//-----------------------------------------------------------------------------------------


// [First-class function (일급시민 함수)]
// functions are treated like any other variable
// - can be assigned as a value to variable
// - can be passed as an argument to other functions.
// - can be returned by another function
//   : 함수를 변수, 파라미터, 리턴값 등등에 전달 가능


// 1. Function declaration (함수 선언) vs Function expression (함수 할당)
//  : 함수를 선언 및 실행하는 방법론적 차이

//  - Function declaration (함수 선언) 
//    : 일반적인 방식으로 script 태그 안에 function 내용 작성후, 필요한 위치에 실행코드 사용
//      -> a function declaration can be called earlier than it is defined. (hoisted)
//         (단! 선언된 함수는 호이스팅되므로, 원래 함수가 선언된 위치보다 위쪽에서 정의될 수 있음 = 실행이 선언보다 우선할 수 있음!)

//  - Function expression (함수 할당) 
//    : 일급시민 함수 특징을 가진 JS의 특징을 활용, 변수에 즉석 작성된 함수를 할당하여 함수를 실행하는 방식
//      -> a function expression is created when the execution reaches it.
//         (함수의 (변수) 할당 방식은 선언된 이후 위치에서 실행이 가능하다는 지극히 상식적인 특징이 있다)

//   # named function (유명 메서드) <-> anonymous function (무명 메서드)
//     : 변수에 즉석 할당된 메서드가 이름이 있고 없고의 차이 
//        -> 유명 메서드의 장점
//            [1] better debugging in debugger's stack traces 
//                : 디버깅시 해당 함수 내용을 쉽게 추적 가능하다는 장점이 존재// better debugging in debugger's stack traces
//            [2] recursions
//                : 재귀함수로서 호출이 가능하다는 특성 존재

//    ex) const print = function () { }              <-  // anonymous function
//    ex) const print = function printAgain() { }    <-  // named function

//-----------------------------------------------------------------------------------------
// (ex) Function expression (함수 할당) 의 예시
const print = function () { // anonymous function
  console.log('print');
};

print();

const printAgain = print; // Function expression 화
printAgain();

const sumAgain = sum; // 상단에서 생성한 sum() Function expression 화
console.log(sumAgain(1, 3));
//-----------------------------------------------------------------------------------------


// 2. Callback function using function expression (함수 할당 방식을 사용한 콜백함수)

//-----------------------------------------------------------------------------------------
// (ex) Callback function using function expression (함수 할당 방식을 사용한 콜백함수) 예시
function randomQuiz(answer, printYes, printNo) {
  if (answer === 'love you') {
    printYes();
  } else {
    printNo();
  }
}

// anonymous function
const printYes = function () {
  console.log('yes!');
};

// named function
const printNo = function print() {
  console.log('no!');
};
randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);
//-----------------------------------------------------------------------------------------


// 3. Arrow function (화살 함수)
//  : (added in ES6) 기존 anonymous function의 표기법을 변경
//    -> 

//  ex) funtion () { 내용 return 결과 } -> () => { 내용 return 결과 }  or () => 결과


//-----------------------------------------------------------------------------------------
// (ex) 화살함수 사용 예시
const simplePrint = () => console.log('simplePrint!');
const add = (a, b) => a + b;
const simpleMultiply = (a, b) => {
  // do something more
  return a * b;
};
//-----------------------------------------------------------------------------------------



// 4. IIFE: Immediately Invoked Function Expression (즉시 실행 함수 할당)
//  : 함수 선언 후, 그 자체를 ()로 묶고 함수 실행하듯 하면, 선언과 동시에 바로 실행되게 로직을 짤 수 있음

// 이와 같이 hello()를 호출하지 않고 바로 선언과 동시에 실행가능하다!
(function hello() {
  console.log('IIFE');
})();


// Fun quiz time❤️
// function calculate(command, a, b)
// command: add, substract, divide, multiply, remainder

function calculate(command, a, b) {
  switch (command) {
    case 'add':
      return a + b;
    case 'substract':
      return a - b;
    case 'divide':
      return a / b;
    case 'multiply':
      return a * b;
    case 'remainder':
      return a % b;
    default:
      throw Error('unknown command');
  }
}
console.log(calculate('add', 2, 3));
