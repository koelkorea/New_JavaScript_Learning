'use strict';

// [prototype (프로토타입)]
//  : 객체가 최후의 수단으로 참조할 대상을 의미하는 숨겨진 프로퍼티로(= JS 명세서에 따라 모든 객체에 존재)
//    이를 베이스로 스크립트 언어였던 JS에서 클래스의 구현과 '상속', '다형성'을 확실히 유사 구현 가능하게 됨 (정보은닉 같은 건 최근에나 구현)
//    -> 그러니까 만약 특정 객체에 어떤 프로퍼티나 메서드를 호출하는데 그것이 없다면, prototype의 참고값을 참고해서 그쪽의 객체에서 관련 내용을 찾아본다 이 말..
//        -> 그리고 그 prototype에 적힌 객체에도 내용이 없으면, 계속 참고값을 통해 내용을 찾을때까지 참고값들에 적힌 객체를 검색해 봄 
//           (= 값을 찾았으면 더 이상의 탐색은 하지 않는다는 것도 의미)

//  # (중요) 프로토타입 방식은 완전한 상속기능을 의미하지 않으며, 단지 프로퍼티나 메서드를 찾을때 참조범위까지 조건절로 참고할 뿐이다
//      : 프로토타입을 통해 상속관계에 있다고 해도, 해당 후손 객체에 상속된 객체들의 프로퍼티를 직접 입력해주진 않는다


//  1. __proto__
//    : 특정 객체가 참조할 prototype의 객체명(인스턴스명)을 가지는 숨겨진 프로퍼티
//      (= 이를 통한 prototype은 반드시 그 참고값이 특정 객체여야 한다는 약점이 존재)

//    ex) prototype의 설정(setter) : 객체명(인스턴스명).__proto__ = 참조할 객체명(인스턴스명);
//        prototype의 확인(getter) : console.log(객체명(인스턴스명).__proto__);

//    # prototype chain
//      : 복수 이상의 객체에 prototype의 설정(setter)을 통해 참고값에 참고값을 타고 올라가는, 객체 간 연쇄적인 참고관계를 의미
//        -> 거의 객체 간 상속관계 이야기가 될 수 밖에 없음

//    # prototype의 설정(setter) 메서드
//      1) 객체명(인스턴스명).__proto__ = 참조할 객체명(인스턴스명);
//      2) Object.setPrototypeOf( 객체명(인스턴스명), 참조할 객체명(인스턴스명) );

//    # prototype의 확인(getter) 메서드
//      1) 객체명(인스턴스명).__proto__;
//      2) Object.getPrototypeOf( 객체명(인스턴스명) );

//------------------------------------------------------------------------------------------------
// ex) __proto__와 prototype chain을 통한 상속관계

let animal = {
  eats: true
};

let bird = {
  fly : true
}

let eagle = {
  hunt: true,
};

// 독수리는 새과고, 새는 동물이라는 특성을 JS의 객체 상속도로 표현하면 다음과 같음
//  : eagle은 bird를 참고하고, bird는 animal을 참고... 
eagle.__proto__ = bird;
bird.__proto__ = animal;

// eagle에는 eats라는 프로퍼티가 없기에, prototype인 bird를 찾아 이를 찾고, 그래도 없으니 그 bird의 prototype인 animal을 찾아서 검색해보니 나온 값이 true
console.log(eagle.eats);  // true

//------------------------------------------------------------------------------------------------

//  2. 클래스명 or 생성자함수명.prototype.프로퍼티 or 메서드
//    : __proto__를 통한 prototype 값이 반드시 그 참고값이 특정 객체여야 한다는 약점이 존재
//      -> 이를 해결하기 위해서 생성자를 통해 태어난 객체들이 상속할 녀석들은 prototype 내용을 직접 원시값이나 무명메서드로 설정가능하게 함

//    # prototype 선언 방법
//      1) 개별 프로퍼티 정의 방식

//        ex) prototype프로퍼티 설정 : 클래스명 or 생성자함수명.prototype.프로퍼티 = 원시값; 
//            prototype메서드 설정   : 클래스명 or 생성자함수명.prototype.메서드명 = function () { 내용 };     

//      2) 리터럴 객체 선언 방식

//        ex) 클래스명 or 생성자함수명.prototype = {
//                constructor : 클래스명 or 생성자함수명,
//                프로퍼티명 : 원시값; ,
//                메서드명() { 내용 } , 
//            }

//------------------------------------------------------------------------------------------------
// ex) (생성자 함수 사용) 클래스명 or 생성자함수명.prototype을 통한 부모값 설정
const Bmw = function (color) {
  this.color = color; 
};

// 생성자 함수를 거치는 경우, 특정 객체에 의존하지 않고, 직접 참고할 부모값을 설정 가능

//  1) 개별 프로퍼티 정의 방식
Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function() {
  console.log("drive..");
};

//  2) 리터럴 객체 선언 방식 ( 2)의 경우 반드시 constructor가 들어가 줘야 constructor 정보가 보존이 됨 )
Bmw.prototype = {
  constructor : Bmw , 
  wheels : 4,
  drive() {
    console.log("drive..");
  } ,
}


const x5 = new Bmw("red");
const x4 = new Bmw("blue");

console.log(x5.drive());  // drive..

// 생성자를 통해 태어난 객체라도 __proto__는 적용 된다
x5.__proto__ = bird;

console.log(x5.eats);   // true

// 생성자 활용 객체 prototype정보를 담은 객체의 경우, constructor 조차 단순 객체의 프로퍼티로 얼마든지 바꿀수 있는 요소이다
console.log( x4.constructor === Bmw );  // true
console.log( x5.constructor === Bmw );  // false  <- Bmw에게서 태어났으나, bird로 프로토타입을 바꾸자 없어짐

//  # 객체명 instanceof 클래스명 or 생성자함수명
//    : instanceof 연산자를 사용하면 객체가 특정 클래스에 속하는지 아닌지를 확인 가능 (constructor 프로퍼티를 확인해주는것)
console.log( x4 instanceof Bmw );   // true
console.log( x5 instanceof Bmw );   // false
//------------------------------------------------------------------------------------------------


//  3. 프로토타입 방식은 완전한 상속기능을 의미하지 않으며, 단지 프로퍼티나 메서드를 찾을때 참조범위까지 조건절로 참고할 뿐이다
//      : 프로토타입을 통해 상속관계에 있다고 해도, 해당 후손 객체에 상속된 객체들의 프로퍼티를 직접 입력해주진 않는다

//------------------------------------------------------------------------------------------------
// ex) JS에서의 프로토타입은 단지 유사 상속기능을 구현하였음 증명

//  - Object.keys(객체명), Object.values(객체명) 를 통한 증명

console.log(Object.keys(x4));     // [ color ]
console.log(Object.values(x4));   // [ blue ]

//    : Bmw를 상속한 객체 x4의 프로퍼티에는 Bmw의 프로퍼티가 존재하지 않음을 알수 있다
//      -> 단지 프로토타입은 참고값을 찾을 추가범위에 대한 정보일 뿐 

//  - 객체명.hasOwnProperty('key명') 를 통한 증명
//    : 해당 객체가 key명에 해당하는 key가 있는지 boolean으로 알려줌
//      -> 부모의 프로퍼티는 없는것을 확인 가능
for(const p in x4) {

  if(x4.hasOwnProperty(p) ){
    console.log(`o : ${p}`);
  } else {
    console.log(`x : ${p}`);
  }
}

// o : color
// x : constructor
// x : wheels
// x : drive
