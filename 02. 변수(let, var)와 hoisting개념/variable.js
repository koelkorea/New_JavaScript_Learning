// 1. Use strict
//  : added in ES 5, use this for Vanila Javascript.
//    (ES5에 추가된 개념으로, 쓰면 ECMA가 아니라 순수 바닐라 버전 JS문법을 기준으로 엔진이 JS를 해석)
'use strict';

// 2. Variable(변수), rw(read/write)
//  : 값을 넣으면 읽고, 쓰기 가능한 녀석을 의미

// - let (added in ES6)
//  : ES6에 추가된 변수로, '블록 스코프'를 기반으로 함. 
//    -> (참고) 
//        1) var는 '함수 스코프'를 기반으로 하며, 이 부분으로 인해 hoisting 이슈가 발생
//        2) 선언 이전에 사용을 할수 없다는 원칙에 대한 개념이 타 언어의 변수개념과 비슷하여, TDZ개념 존재
//           (TDZ : Temperary Dead Zone의 약자로, 해당 스코프에서 변수 선언 위치 이전 영역을 의미함)

// # block scope (블록 스코프)
//  : 일종의 변수들이 통용되는 영역 구분을 위한 '결계'와 같은 것으로 { }로 영역을 설정. (중요) 최상위는 global scope!
//    -> 이 결계는 '일종의 특수거울'과 같이 '안에서는 밖을 볼 수 있고, 밖에서는 안을 볼수 없음
//       -> 이 결계를 기준으로 밖에서 선언된 변수는 일종의 전역변수, 안에서 선언된 변수는 지역변수의 논리가 통용

// -------------------------------------------------------------------------------------------------------
// (ex) 블록 스코프 사용 예시
let globalName = 'global name'; // 블록 스코프 밖 전역변수(혹은 global scope에 선언된 변수) globalName
{
  let name = 'ellie'; // 블록 스코프 내부의 지역변수 name
  console.log(name);  // ellie

  name = 'hello';
  console.log(name);  // hello

  // (중요) 블록 스코프 내부에서는 밖에서 선언된 변역변수의 값에 접근이 가능 (특수거울 기억하자)
  console.log(globalName);  // global name 
}

// (중요) 해당 위치 이전을 기준으로 특정 블록 스코프 안에서만 선언된 변수는 일종의 지역변수로서 보기에, 스코프 밖에서는 접근이 불가능함
console.log(name);
console.log(globalName);
//---------------------------------------------------------------------------------------------------------

// - var (don't ever use this!)
//  : ES6 이전에 쓰이던 변수, '함수 스코프' 를 기반으로 하는데, 타언어의 변수개념과 동떨어져 있기에 안 쓰는걸 추천

// # function scope (함수 스코프)
//  : 블록 스코프의 결계 개념이 function의 경우에만 통용되는 개념
//    -> 함수 스코프 기준으로 지역변수 개념? function의 { }내에서만 통용됨
//       (= var의 호이스팅이 의도치 않게 문제를 만드는 이유)

// # hoisting (호이스팅) (move declaration from bottom to top)
//  : var나 function의 경우 아래에서 선언한 것들이 실행단계에서 최상단에 올라와서 일괄적으로 선언되는 현상
//    -> (중요) why var의 경우는 문제가 되는가 () ?
//        : BUT! 함수 스코프가 기반이 되는 var의 경우, 호이스팅 발생시, 조건문이나 반복문의 스코프까지 깡그리 선언 순서를 무시함
//          (= 타 언어의 변수 개념을 생각했다가는 기습당하기 딱 좋음.. 특히 for문이 그럼)
// 
//        <-> (중요) let도 호이스팅이 발생하나, 블록스코프 개념을 TDZ설정으로 선언 위치와 사용 위치 관계 정립하여 해결

// -------------------------------------------------------------------------------------------------------
// (ex) var hoisting의 황당함 예시
{
  age = 4;  // 변수 사용이
  var age;  // 선언 시점보다 빠르다...
}
console.log(age); // 4  <- 근데 문제없이 인식했다?! 심지어 블록 스코프 안인데?

// ??? : 블록 스코프 결계? 그거 먹는거임? 날 잡고 싶으면 function 결계만 치던가~~~ ㅋㅋㅋ
//---------------------------------------------------------------------------------------------------------


// 3. Constant(상수), r(read only)
//  : use const whenever possible (only use let, if variable needs to change)
//    (값을 일단 한번 넣으면, 변경X 읽기만 가능한 녀석을 의미)
const daysInWeek = 7;
const maxNumber = 5;

// # 변경 불가능한 자료형 : premitive types(원시형), frozen objects (i.e. object.freeze())
// # 변경 가능한 자료형 : all objects by default are mutable in JS (객체의 매개변수들은 모두 변이 가능)

// # favor immutable data type always for a few reasons 
//   (변경이 불가능한 상수를 쓰면 좋은 이유)
//  - security (해킹 관련 보안)
//  - thread safety (멀티쓰레드의 경우, 동시다발적 접근으로 인해 프로그램이 개판되는 상황을 방지 가능)
//  - reduce human mistakes (사람의 실수 가능성을 원천적으로 줄일 수 있음)

// 4. Variable types (변수 자료형)
//  - primitive (원시형) : number, string, boolean, null, undefined, symbol 과 같은 단일 변수
//  - object(객체)
//  - box container
//  - function(함수) : JS는 first-class function (1급 힘수)가 지원되는 언어 (= 함수를 변수, return문, 함수의 인자로 할당 가능한 언어 의미)

//  - primitive (원시형)

// a) number
//  : integer(정수), decimal number(소수) 던 상관없이 하나로 통일
const count = 17; // integer
const size = 17.1; // decimal number

console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);

// # 특수한 숫자값 유형
//   : infinity (양의 무한), -infinity (음의 무한), NaN (Not A Number : 숫자가 아닌데, 숫자로 출력해야 하는경우 나오는 값)
const infinity = 1 / 0; 
const negativeInfinity = -1 / 0;
const nAn = 'not a number' / 2;

console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

// # bigInt (fairly new, don't use it yet)
//  : Java의 bigInt와 같이 기존 소수값 변수(자바의 경우 double)보다 더 큰 값을 표현가능한 변수타입
const bigInt = 1234567890123456789012345678901234567890n; // over (-2**53) ~ 2*53)
console.log(`value: ${bigInt}, type: ${typeof bigInt}`);

// b) string
//  : 문자에 대한 자료형으로 문자열의 경우는 배열개념으로 조합되어 있기에, 배열을 통해 원하는 위치의 문자를 찾는것이 가능
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello ' + brendan;
const helloBob = `hi ${brendan}!`; //template literals (string) : `(백틱) 부호를 이용해서 문자열 표현이 쉽게 가능함 참고

console.log(`value: ${greeting}, type: ${typeof greeting}`);
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);
console.log('value: ' + helloBob + ' type: ' + typeof helloBob);

// c) boolean : 참/거짓... 
//   -> (참고) 0, null, undefined, NaN, '' 에 해당하는 값들은 false
const canRead = true;
const test = 3 < 1; // false
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

// d) null : null이라고 사용자가 선언한 경우에 할당되는 자료형 (undefined는 사용자는 개입한거 없는데 비어있을때 등장)
let nothing = null;
console.log(`value: ${nothing}, type: ${typeof nothing}`);

// e) undefined : 값이 그냥 비었을경우 (null은 사용자가 null이라고 명시)
let x;
console.log(`value: ${x}, type: ${typeof x}`);

// f) symbol
//   : create unique identifiers for objects
//     (특수한 경우 고유한 특별자를 만들때 사용)

// # Symbol('문자열') : 해당 명령으로 생성한 식별자는 문자열과 상관없이 다른 내용을 지닌 객체로 취급
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2);

// # Symbol.for('문자열') : 해당 명령으로 생성한 식별자는 문자열이 같으면 같은 객체로 취급
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2); // true

console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);

// g) object (객체)
//  : real-life object, data structure (일상생활의 대상을 설명하는 데이터 구조... <-> JSon)
//    -> 단! 객체는 너무 커서 한번에 메모리에 할당하지 않고, 수정 불가능함 객체명을 ref값으로 그 주소를 적어놓는 식으로 객체를 구성하는 데이터들의 위치를 담음
const ellie = { name: 'ellie', age: 20 }; //  여기서 객체명 ellie는 객체를 구성하는 다른 데이터들이 담긴 메모리의 위치값을 담고 있음
ellie.age = 21; // 그래서 객체명을 통해 객체의 맴버변수에 접근 및 내용 변경이 가능함.

// 5. Dynamic typing (동적 타이핑)
//  : JS는 동적 타입이 지원되는 언어라는 것에 대한 설명 (대충 타입스크립트가 나온 배경 설명)
let text = 'hello'; // 처음에 문자열이었지만
console.log(text.charAt(0)); //h
console.log(`value: ${text}, type: ${typeof text}`);

text = 1;
console.log(`value: ${text}, type: ${typeof text}`);

text = '7' + 5; //  문자숫자 + 숫자 -> 문자열 연결로 인정
console.log(`value: ${text}, type: ${typeof text}`);

text = '8' / '2'; // 문자숫자 / 문자숫자? -> 숫자로 인정
console.log(`value: ${text}, type: ${typeof text}`);  // 이렇게 숫자로 변경 가능
console.log(text.charAt(0));  // 단! 메서드는 그 타입을 가리지 못해서 에러를 낼수 있음... (처음부터 타입을 가려받자! = TS존재 의미)
