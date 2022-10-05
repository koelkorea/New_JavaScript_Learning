'use strict';

// [Objects (객체) : JS도 클래스를 쓸수 있게 됨에 따라 쓸수 있게 됨]
//  : one of the JavaScript's data types, a collection of related data and/or functionality.
//    (oop 언어에서 나오는 데이터의 타입으로, 연관된 변수나 함수들을 모아놓은 타입을 구현한 key와 value의 집합체라고 볼 수 있다)

//    ex) let object = { key : value, key2 : value2 };

//    # 객체의 주요 개념 (Map, Set, Array 3신기도 물론 통용됨... 애초에 object의 후손들이니)
//      - key : 프로퍼티의 이름
//      - value : 각 프로퍼티에 할당된 값
//      - entry : [key, value] 쌍을 이루는 배열


//  0. Object 클래스
//   : Nearly all objects in JavaScript are instances of Object (타 oop에서도 나오는 모든 클래스들의 조상 격 클래스)

//    # Object 클래스의 정적 메서드들 (Map, Set, Array 3신기도 물론 통용됨... 단! 일반 메서드임)
//      - Object.keys(대상 인스턴스)     : 객체의 키만 담은 배열을 반환
//      - Object.values(대상 인스턴스)   : 객체의 값만 담은 배열을 반환
//      - Object.entries(대상 인스턴스)  : [키, 값] 쌍을 담은 배열을 반환

//      ex) let user = { name: "John",  age: 30 };
//          -> Object.keys(user) = ["name", "age"]
//          -> Object.values(user) = ["John", 30]
//          -> Object.entries(user) = [ ["name","John"], ["age",30] ]   <- 객체의 모든 [키, 값]을 담은 이중배열 반환 

//    # (Map, Set, Array) vs (Object) : at key, values, entries 메서드

//      - (Map, Set, Array)
//        a. 반환값 : iterable 객체 
//        b. 민스턴스에서 사용 가능한 일반 메서드

//      - (Object)
//        a. 반환값 : 배열로 반환 (하위호환성 때문이라고 함)
//        b. Object 클래스에 소속된 정적 메서드

//    # iterable VS array-like(유사 배열) : 상반된 개념X 
//      - iterable
//         : 메서드 Symbol.iterator가 구현된 배열을 일반화한 객체 (= '인덱스'와 'length'는 필요조건은 아님)
//           ->  (중요) 열거 가능하고, for of를 통한 내부 값 조회 가능 
//      - array-like(유사 배열) 
//         :  '인덱스'와 'length'는 필요조건인 배열처럼 보이는 객체 

//      (결론) 메서드 Symbol.iterator, '인덱스', 'langth'가 다 있으면, iterable이면서 array-like(유사 배열) 인것도 가능
//              -> (중요) string이 대표적 예시


//  1. 객체 생성하는 2가지 방법
//    1) literal 객체
//      : let xxx = { key1 : value1 , key2 : value2 }; 이런식으로 직접 변수에 객체내용 입력 
//        -> (단점) 해당 객체는 1회용이고, 인스턴스 같은 방식으로 찍어내기가 불가능함 

//    2) 클래스 인스턴스를 통한 객체 생성
//      : let xxx = new 클래스명(); 이런식으로 직접 클래스의 생성자를 통한 객체를 생성 
//        -> (장점) 인스턴스 찍어내는거라 여러개의 객체를 찍어낼 수 있다
//           (단점) 사전에 클래스의 내용을 입력을 해둬야 한다
//----------------------------------------------------------------------------------------------------------------
// ex) 객체 생성 예시
const obj1 = {};             // 'object literal' syntax     (리터럴 객체 생성 방식)
const obj2 = new Object();   // 'object constructor' syntax (생성자를 통한 객체 생성)

function print(person) {
  console.log(person.name);
  console.log(person.age);
}
//----------------------------------------------------------------------------------------------------------------


//  2. 객체 사용시 주의점
//   1) 객체는 =연산자를 통해 타 변수에 할당 시, 인스턴스가 갖는 메모리에 저장된 객체의 주소값을 타 변수에 할당함 
//     (원시형에서 값이 복사되듯이, 객체 내용이 타 변수에 복사되는 게 아님)

//     ex) let xxx = { key1 : value1 , key2 : value2 }; 
//         let yyy = xxx; 
//         -> yyy는 xxx의 객체 내용을 복사하는 것이 아니라! 
//            -> xxx가 지정하는 객체의 인스턴스 주소값을 yyy 또한 가지고 있을 뿐 
//              (= 결국 xxx나 yyy나 같은 객체의 접근 포털키을 가지고 있는것)

//    2) with JavaScript magic (dynamically typed language) can add/delete properties later 
//       : js는 동적타입의 언어라는 점에서 생성된 이후의 객체의 프로퍼티를 맘대로 추가/삭제 가능
//        - 추가법 : 인스턴스명.추가프로퍼티명 = 값 입력;
//        - 삭제법 : delete 인스턴스명.추가프로퍼티명;

//    3) (중요) 접근한 객체의 프로퍼티가 존재하지 않는다면, undefined가 나온다
//----------------------------------------------------------------------------------------------------------------
// ex) 프로퍼티 삭제/추가
const ellie = { name: 'ellie', age: 4 };
print(ellie);

// 객체 프로퍼티 사후 추가
ellie.hasJob = true;
console.log(ellie.hasJob);  // true

// 객체 프로퍼티 사후 삭제
delete ellie.hasJob;
console.log(ellie.hasJob);  // undefined
//----------------------------------------------------------------------------------------------------------------


// 3. Computed properties (계산된 프로퍼티들)
//  : 객체 안의 프로퍼티에 접근하는 방법 중, 인스턴스명['프로퍼티명'] 에 해당하는 방법을 의미

//    ex) 인스턴스명.프로퍼티명 = 인스턴스명['프로퍼티명']
//        -> (주의) key should be always string (객체의 키는 반드시 '스트링'이어야 한다)

//    # (중요) Computed properties를 쓰는 경우
//      : 런타임(실시간)이 되어봐야 참고해야 할 프로퍼티의 값이 나오는 경우 사용하게 됨 (ex. 함수의 파라미터로 들어오는 녀석이 프로퍼티명이 된다던지..)
//        <-> 일반 코딩시에는 '인스턴스명.프로퍼티명' 이대로 가는게 맞음
//----------------------------------------------------------------------------------------------------------------
// ex) 인스턴스명.프로퍼티명 = 인스턴스명['프로퍼티명']

// ellie.name = ellie['name']
console.log(ellie.name);    // ellie
console.log(ellie['name']); // ellie    <- 객체 내부의 프로퍼티에는 배열과 인덱스 접근하듯 접근도 가능하다

ellie['hasJob'] = true;
console.log(ellie.hasJob);  // ture

// (중요)  Computed properties를 쓰는 예시
//    -> 리턴값의 프로퍼티로 쓸 key가 printValue 함수 호출시 파라미터로 들어오기 전까지는 알수 없는 상황!
//       이럴 경우 파라미터와 함께 호출되어도 obj.key = undefined가 무조건 찍히고, obj[key]는 의도적인 작동을 함 
function printValue(obj, key) {

  console.log(obj.key);   // 무조건 undefined
  console.log(obj[key]);  
}
 
printValue(ellie, 'name');  // undefined  ellie
printValue(ellie, 'age');   // undefined  4
//----------------------------------------------------------------------------------------------------------------


// 4. Property value shorthand (프로퍼티값 단축)
//  : 함수를 통해 객체 생성시, 파라미터와 return되는 객체의 프로퍼티명이 같다면, 하나만 써줘도 되는 법칙 (ES6추가)
//----------------------------------------------------------------------------------------------------------------
// ex) Property value shorthand (프로퍼티값 단축) 예시 

// 생성자 함수 이전 js에서 사용한 객체 생성 방식.... (이렇게 쓰지 않아도 됨)
function makePerson(name, age) {
  return {
    // name : name,   // 원래 같으면 이렇게 써야하나
    // age : age,
    name,             //  파라미터명 = 프로퍼티명 인 관계로 일부 생략
    age,
  }
}

const person1 = { name: 'bob', age: 2 };
const person2 = { name: 'steve', age: 3 };
const person3 = { name: 'dave', age: 4 };

const person4 = makePerson('elile', 30);
console.log(person4);   // { name: 'elile', age: 30 };
//----------------------------------------------------------------------------------------------------------------


// 5. Constructor Function (생성자 함수)
//  : 전문적인 객체 생성을 위한 함수로... 꼭 클래스가 있진 않아도 됨..

//  # 생성자 등장 이전과의 차이
//    - 생성자 함수의 경우는 '함수명'을 '대문자'로 작성한다
//    - return 문구 생략 가능 
//    - 생성자 함수 내부를 통해 this를 사용할 수 있다 (this = 생성자를 통해 새롭게 생성된 객체 그 자체)
//    - this.프로퍼티명 = 파라미터명 으로 프로퍼티 생성 및 값 부여
//    - 함수 호출을 하기 전에 앞에 new라는 예약어를 붙인다

//  # new 
//    : 이를 통해 메모리에 새로운 인스턴스 주소를 할당하고 객체 데이터를 메모리에 할당함
//----------------------------------------------------------------------------------------------------------------
// ex) Constructor Function (생성자 함수) 예시 

// 생성자를 통한 객체 생성
const person5 = new Person('tramp', 10);  //  function은 hosting이 가능하기에 선언보다 위에서 실행해도 됨
console.log(person5); 

// 생성자 함수 선언
function Person(name, age) {
  // this = {};     // this는 생성자를 통해 생성될 객체 그 자체를 의미
  this.name = name;
  this.age = age;
  // return this;   // return은 생략가능하나, 결국 this를 반환하게 되어있음 (그러니까 함수의 결과로 생성된 객체(object)를 반환한다는 것)
}
//----------------------------------------------------------------------------------------------------------------


// 6. in operator ('key' in obj)
//  : property existence check (해당 [프로퍼티명 = key]이 지정된 인스턴스 주소에 존재하는 객체 데이터에 존재하는지 여부를 boolean)

//  ex) '프로퍼티명' in 인스턴스명

//  # in 연산자의 존재 이유? 
//    : 객체 내부의 프로퍼티값을 undefined로 준 경우, 해당 프로퍼티가 실제로 존재하는지 여부를 알 수 없기에 쓰는 메서드
//      (= 쉽게 말해, undefined라는 반환값이 문자열인지 진짜 undefined인지 알수 없음 -> 그래서 boolean으로 반환함)
//----------------------------------------------------------------------------------------------------------------
console.log('name' in ellie);   // true
console.log('age' in ellie);    // true
console.log('random' in ellie); // false
console.log(ellie.random);      // undefined
//----------------------------------------------------------------------------------------------------------------

// - for key in 객체명 VS for value of iterable(순차적 컨테이너)

// 6. for (key in obj)
//  : [객체] 내부의 '프로퍼티명 = key'들을 순차적으로 꺼내서 반복작업을 하고 시플때 때 쓰는 문법
//    <-> 5번의 in 구문에 for를 적용한 것 같지만, 전혀 다른 문법 (하단의 차이점 참고)

//    ex) for ('프로퍼티명'을 받을 변수 in 인스턴스명)

//  # (중요) 5번의 in 구문과 공통점 & 차이점
//    - 공통점 : 반드시 '객체'만을 대상으로 사용이 가능함
//    - 차이점 : 5번은 boolean 도출, 6번은 프로퍼티명 그 자체를 반복 도출
//----------------------------------------------------------------------------------------------------------------
// ex) for (key in obj) 예시
for (let key in ellie) {
  console.log(key);   //  name, age, hasjob   <- ellie 객체의 모든 key이름(= 프로퍼티명)이 순차적 등장
}
//----------------------------------------------------------------------------------------------------------------


// 7. for (value of iterable)
//  : iterable 객체의 '프로퍼티값 = value'들을 순차적으로 꺼내서 반복작업을 하고 시플때 때 쓰는 문법

//    ex) for ('프로퍼티값'을 받을 변수 in iterable 객체 인스턴스명)

//    # iterable VS array-like(유사 배열) : 상반된 개념X 
//      - iterable
//         : 메서드 Symbol.iterator가 구현된 배열을 일반화한 객체 (= '인덱스'와 'length'는 필요조건은 아님)
//           ->  (중요) 열거 가능하고, for of를 통한 내부 값 조회 가능 
//      - array-like(유사 배열) 
//         :  '인덱스'와 'length'는 필요조건인 배열처럼 보이는 객체 

//      (결론) 메서드 Symbol.iterator, '인덱스', 'langth'가 다 있으면, iterable이면서 array-like(유사 배열) 인것도 가능
//              -> (중요) string, array이 대표적 예시
//----------------------------------------------------------------------------------------------------------------
// ex) for (value of iterable) 예시
const array = [1, 2, 4, 5];

// 배열은 iterable 객체에 포함되므로 for of가 성립
for (let value of array) {
  console.log(value);   //  1,2,4,5   <- array 배열(iterable)의 모든 value값이 순차적 등장
}

// 객체는 iterable 객체에 포함되지 않으므로, 성립X
// for (let value of ellie) {
//   console.log(value);   
// }

//----------------------------------------------------------------------------------------------------------------


// 7. Object.assign(dest, [obj1, obj2, obj3...])
//  :  Object 객체의 정적 메서드? 
//      -> 본업은 배열 안에 값들을 넣는 것이지만? 객체를 복사(cloning)할 때도 쓸 수 있음
//          -> 정확히는 객체 복사도 복사가 아니라, 나열된 객체들의 모든 key와 value를 key가 겹치지 않게 합쳐서 지정한 객체에 넣어주는 것

//    ex) Object.assign( {} or 값 받을 객체 , 값1, .... , n );
//         : 대상 객체에 값 넣기
//        Object.assign( {} or 붙여넣기 당할 객체 , 복사할객체명1, .... , n );
//         : 복사객체들의 key 안 겹치게 배열로 넣기

//  # 배열 복사 기능 assign 사용시 주의점
//    : 같은 key값을 가지고 있는 object1과 object2가 순차적으로 Object.assign( {}, object1, object2 ); 된다면?
//      -> object2에 해당하는 값들이 최종적으로 복사가 됨

//  # 객체 복사에 특별한 방법이 필요한 이유?
//    : 객체는 =연산자를 통해 타 변수에 할당 시, 인스턴스가 갖는 메모리에 저장된 객체의 주소값을 타 변수에 할당함 
//      (원시형에서 값이 복사되듯이, 객체 내용이 타 변수에 복사되는 게 아님)

//     ex) let xxx = { key1 : value1 , key2 : value2 }; 
//         let yyy = xxx; 
//         -> yyy는 xxx의 객체 내용을 복사하는 것이 아니라! 
//            -> xxx가 지정하는 객체의 인스턴스 주소값을 yyy 또한 가지고 있을 뿐 
//              (= 결국 xxx나 yyy나 같은 객체의 접근 포털키을 가지고 있는것)

//----------------------------------------------------------------------------------------------------------------
// ex) 객체와 =연산자의 예시

const user = { name: 'ellie', age: '20' };
const user2 = user; // 이 경우 user2에 저장되는 값은 객체값 그 자체가 아니라, user에서 저장한 객체값의 메모리 주소를 담은 인스턴스 값

console.log(user);  // {name: 'ellie', age: '20'}
//-----------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------
// ex) 요즘 객체를 복사하는 방식 예시
const user4 = Object.assign({}, user);
console.log(user4);   // {name: 'ellie', age: '20'}
//----------------------------------------------------------------------------------------------------------------

// ex) 같은 key값을 가지고 있는 fruit1, fruit2 순차적으로 Object.assign( {}, object1, object2 ); 된다면? 예시
const fruit1 = { color: 'red' , name: 'apple'};
const fruit2 = { color: 'blue', size: 'big' };

const mixed = Object.assign({}, fruit1, fruit2);

console.log(mixed.color); //  blue
console.log(mixed.name); //  apple  <- fruit2에 없던 key이기에 살아남음
console.log(mixed.size);  //  big   <- fruit1에 없던 key
//----------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------
// ex) 객체 복사를 위한 예전 방법 old way
//  : 빈 객체와 for in을 통한 key값 강제 전수

const user3 = {};   // 빈 객체

for (let key in user) {   // for in을 통해 빈 객체에 데이터 강제 이식
  user3[key] = user[key];
}

console.log(user3);   // {name: 'ellie', age: '20'}
//----------------------------------------------------------------------------------------------------------------