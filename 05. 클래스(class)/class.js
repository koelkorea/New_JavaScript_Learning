'use strict';

// [class]
//  : 특정 개념과 연관있는 변수(field = property : 멤버변수)들과 함수(methods : 메서드)들을 모아서 묶어놓은 것
//    -> 추후 object(객체)의 기반이 되며, 객체는 여러가지 측면에서 관리나 편의성이 좋다는 장점이 있음

//  # class(개념) & object(존재)의 관계
//    - class  : 붕어방틀, 플라톤의 이데아적 생물의 원형
//    - object : 틀로 찍어낸 붕어빵들 실체, 실제로 존재하는 해당 생물 개체들 하나하나 그 자체

//  # JavaScript class 개념 특징 : 프로토타입 개념을 기반으로 일종의 편법, 야매로 ES6에 추가 (정통파 OOP들과는 차이가 제법 존재)
//    - introduced in ES6 
//    - syntactical sugar over prototype-based inheritance

// - class의 특징 : 개념 선언은 설계도 그리는 것과 같음
//    a) template (일종의 객체 찍어내는 틀)
//    b) declare once (선언은 한번이면 됨)
//    c) no nata in (실질적 데이터는 존재X)

// - object의 특징 : 실제 존재하는 공산품의 특성과 비슷
//    a) instance of a class (클래스의 인스턴스 = 설계대로 만든 실제 존재들)
//    b) created many times (설계도 따라 몇개라도 만들어도 됨)
//    c) data in (데이터 실체가 존재함)


// 1. Class declarations (클래스 선언하기)

//-------------------------------------------------------------------------------------------------------------------
// ex) 클래스 선언
class Person {

  // constructor (생성자)
  // : 일종의 객체를 생성하고 값을 초기화시켜 넣어주는 역할을 하는 해당 클래스이름을 가진 메서드
  constructor(name, age) {
    // fields, property (멤버변수)
    //  : 클래스 내 변수
    this.name = name;
    this.age = age;
  }

  // methods (메서드)
  //  : 클래스 안의 함수를 통칭
  speak() {
    console.log(`${this.name}: hello!`);
  }
}

// ex) Person 클래스를 기반으로 생성자를 사용하여 객체를 생성
const ellie = new Person('ellie', 20);

// 객체명.프로퍼티 or 메서드; 통해 값에 접근이 가능
console.log(ellie.name);  // ellie
console.log(ellie.age);   // 20
ellie.speak();  // ellie Hello
//-------------------------------------------------------------------------------------------------------------------


// 2. Getter and setters
//  : 보통 클래스의 경우 프로퍼티(멤버변수)를 직접 접근 및 수정이 불가능하도록 캡슐화(private) 처리를 하는데
//    -> 이 경우 기능상 해당 클래스의 개별 프로퍼티들에 접근 및 수정을 할 수 있게 만들어 두는 메서드를 의미
//       (이를 통해, 잘못된 값이 들어갈때의 기능적인 구현(-가 들어가면, alert값 뱉어낸다던지..)도 같이 진행)

//  # get 프로퍼티명(), set 프로퍼티명(value값) 메서드
//    : js에서 getter, setter에 해당하는 부분을 구현해주는 class 내부의 예약어

//  # (중요) constructor를 통한 객체 생성시, get 프로퍼티명(), set 프로퍼티명(value값) 메서드 주의사항
//    : 근본적으로 프로토타입 문법으로 야매로 구현한 class 자체의 구성 때문인지, 타 OOP와는 내부 로직이 좀 다른듯하며, 코드도 좀 신경써야 할 부분 존재
//      (= class의 메서드인 get, set의 존재는 같은 형제인 constructor의 작동에도 연관이 있고, 현재 문제가 되는 부분은 _(underscore)없이 작성시 이 부분이 꼬이는 문제임)

//      a) get와 set 내부의 'this.age = age' 는 'this._age = age'로 써야 함
//          -> why? 
//              : get 프로퍼티명()을 선언하는 순간, this.age의 의미는 해당 get 메서드를 호출함
//                set 프로퍼티명()을 선언하는 순간, this.age = age의 '= age' 의미는 해당 set age(age) 메서드를 호출하게 됨
//          -> error process
//              : get, set 메서드가 둘 다 있는 경우, 생성자를 통한 객체 생성시 this.age = age는 set age(age) 를 호출하여 실행
//                (= set 구문 무한재귀로 인해 Maximum call stack size exceeded 에러 발생)
//          -> 해결책 :  _(underscore)를 적용     
//              : ex) this.age = age -> this._age = age 로 대체하면 문제 해결
//                    (= 실제로 프로퍼티값 age의 내용은 _age에 존재하기 때문)

//      b) get 프로퍼티명()의 역할
//        : 콘솔창이나 클래스 외부에서 '객체명.프로퍼티명'으로도 '객체명._프로퍼티명'에 해당하는 정보를 나오게 함
//            -> 'this._프로퍼티명' 은 'this._프로퍼티명'에 접근하기 위한 key값으로서 존재한다고 생각하면 되겠다

//  # _ (underscore) :  js의 Privacy 코드컨벤션, 접근이 가능한 프로퍼티지만 외부에서 가져다 쓰지 말라는 권고
//    -> 권고이기 때문에, 'this._프로퍼티명' 하면 접근은 가능함
//        -> class내 프로퍼티들의 실제 저장은 '_프로퍼티명'에 저장되어 있음
//           (= 그래서 set, get 메서드에 들어가는 코드도 this._프로퍼티명 이 되어야 하는 것)

//-------------------------------------------------------------------------------------------------------------------
// ex) get, set 메서드를 사용한 클래스 선언
class User {

  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age; // constructor를 통해 객체 생성시, this.age = age는 set age(age)를 호출
  }

  // getter : (선언된다면) this.age을 통해 호출되며, 클래스 외부에서 this.age 호출시, this._age 값이 나오게 함
  get age() {
    return this._age;
  }

  // setter : (선언된다면) this.age = value를 통해 호출
  set age(value) {

    // if (value < 0) {
    //   throw Error('age can not be negative');
    // }

    // this.age = value < 0 ? 0 : value;  // this.age = age는 set age(age)를 호출
    this._age = value < 0 ? 0 : value;    // age 프로퍼티는 실제로는 _age에 저장되어 있기에 이렇게 적어야 의도대로 작동
  }

}

// constructor를 통해 인스턴스가 user1인 객체를 생성 (get, set이 내부 로직에 쓰였음. 그래서 _이슈가 생긴거)
const user1 = new User('Steve', 'Job', -1);

// get의 존재로 user1.age는 user1._age의 값을 가져옴
console.log(user1.age); // 0
console.log(user1._age);  // 0

//-------------------------------------------------------------------------------------------------------------------


// 3. Fields (public, private)
//  : OOP에 필요한 개념인 캡슐화와 연관된 접근제어자.. 태생이 스크립트 언어였던 JS였기에 이 부분에 대한 내용은 이제야 추가된 최신기능..
//    -> Too soon! = 추가된지 근 2년정도 뿐이 안된 기능임

//  # 접근제어자?
//    : 클래스에 존재하는 변수와 함수에 대해, 코딩하는 위치에 따라 그 함수나 변수에 대한 접근여부에 대한 정도를 설정하는 것

//    ex) 만약 Tmp() 클래스 안에 isPrivate 라는 변수와 bePrivate()라는 함수가 private인데, Outside()라는 클래스에서 Tmp()의 객체를 생성하고 그 2가지 변수와 함수를 선언하려고 한다면?
//        -> ctrl + space를 통해 찾아봐도 없고, 억지로 연결해서 입력해도 실행시 에러를 뿜을 것
//            -> 왜냐하면, private 접근제어자는 해당 변수나 함수를 그 클래스 자체에 내부 내용을 작성할 때만 사용(언급)할 수 있기 때문 
//              (= 타 클래스에서 Tmp() 클래스의 인스턴스를 소환해서 접근하려 해도 접근 불가능) 

//  # 접근제어자 필요 이유?
//    - 지정한 변수, 함수의 정보 은닉성 (특정 범위 말고는 접근이 불가능함 = 내용을 알 수 없다)
//    - 관리의 편의성, 용의성 (특정 범위 말고는 접근이 불가능함 = 개발할 때 개념정리도 쉽고, 유지보수 때도 쉽다)
//    - 정보 손상, 클래스 오용 방지 (특정 범위 말고는 접근이 불가능함 = 정보가 잘못들어갈 일도 없고, 잘못 쓸 가능성도 원천차단!)
//    - 타 객체의 독립성 확보 (특정 범위 말고는 접근이 불가능함 = 이게 잘못되어도 타 객체와 연관성이 낮아지니, 의존성이 낮아져 타 객체는 안전하다)

//  # 접근제어자 종류 (사실상 public, private 말고는 쓰기 애매하다는 평이 지배적)
//    - public    : 어디서나 접근 가능 (인스턴스만 만들면, 바로 그 인스턴스의 해당 변수나 함수 조작 및 사용이 가능)
//    - protected : 동일한 패키지 내에 존재하거나 파생 클래스에서만 인스턴스를 선언 후 접근 가능
//    - default   : 아무런 접근 제한자를 명시하지 않으면 default 값이 되며, 동일한 패키지 내에서만 인스턴스를 선언 후 접근 가능
//    - private   : 자기 자신의 클래스를 작성할 때만 해당 변수나 함수를 사용 가능하다

//  # JS의 접근제어자 사용법 : #를 붙이면 private, 그 이외는 전부 public으로 매우 단순함

//-------------------------------------------------------------------------------------------------------------------
// ex) private 변수
class Experiment {

  publicField = 2;    // public
  #privateField = 0;  // private

}

const experiment = new Experiment();
console.log(experiment.publicField);  // 2
console.log(experiment.privateField); // undefined  <- private 변수를 외부에서 호출했기에 은닉됨
//-------------------------------------------------------------------------------------------------------------------


// 4. Static properties and methods
//  : static(정적)이 붙으면 그 변수나 함수는 인스턴스를 통해 사용되는 것이 아님 
//    (= Static 애들은 클래스가 직접 가지는 고유한 값이나 함수가 됨)
//      -> Too soon! = 추가된지 근 2년정도 뿐이 안된 기능임

//  # Static properties(변수), methods(함수) 사용 예시 (주로 공통적으로 클래스에서 쓸수 있는 개념에 대해서 사용)
//    - properties : 환경변수 값, 언어팩 정보
//    - method  : Meth 클래스의 함수들

//-------------------------------------------------------------------------------------------------------------------
// ex) Static 변수, 메서드
class Article {

  //  Static properties 선언
  static publisher = 'Dream Coding';  

  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  //  Static methods 선언
  static printPublisher() {
    console.log(Article.publisher);
  }
  
}

const article1 = new Article(1);
const article2 = new Article(2);

console.log(article1.publisher);  // undefined   <- 인스턴스를 통해 접근할 수 있는 변수가 아니기 때문 (클래스 그 자체에 붙어있는 고유값)
console.log(Article.publisher);   // Dream Coding
Article.printPublisher();         // Dream Coding
//-------------------------------------------------------------------------------------------------------------------


// 5. Inheritance (상속)
//  : OOP에 필요한 개념인 상속, 다형성과 연관된 개념
//    -> a way for one class to extend another class (한 클래스의 개념을 다른 클래스의 개념형성에 연관되도록 확장하는 방법)

//-------------------------------------------------------------------------------------------------------------------
// ex) 상속, 다형성 예시
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color!`);
  }

  getArea() {
    return this.width * this.height;
  }
}

// 상속 
class Rectangle extends Shape {}

// 상속 + 확장
class Triangle extends Shape {

  // 오버라이드 (메서드 재정의) <- 다형성에 연관
  draw() {
    super.draw();     // super : 부모 클래스를 의미
    console.log('🔺');
  }

  // 오버라이드 (메서드 재정의) <- 다형성에 연관
  getArea() {
    return (this.width * this.height) / 2;
  }

  // toString은 Object 객체의 메서드 = 어떤 클래스라도 오버라이딩 가능함
  toString() {
    return `Triangle: color: ${this.color}`;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw(); // drawing blue color!`
console.log(rectangle.getArea()); //  400

// (다형성) 오버라이딩 메서드를 사용하여, 부모와는 전혀 다른 내용으로 결과가 도출
const triangle = new Triangle(20, 20, 'red');
triangle.draw();  // drawing red color!`
console.log(triangle.getArea());  //  200 🔺

//-------------------------------------------------------------------------------------------------------------------


// 6. instanceOf
//  : Class checking(대상 인스턴스가 지정 클래스의 후손 객체인지 확인 하는 것) 메서드 

//  ex) 대상 인스턴스 instanceof 비교 클래스 
//      -> 대상 인스턴스가 비교 대상 클래스에 속해있는가(정확히는 상속트리에서 직계 선조라인에 포함되어 있는가?) ? 여부를 boolean값으로 도출

//-------------------------------------------------------------------------------------------------------------------
// ex) instanceOf 사용 예시
console.log(rectangle instanceof Rectangle);
console.log(triangle instanceof Rectangle);
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape);   // true
console.log(triangle instanceof Object);  // true
console.log(triangle.toString());

let obj = { value: 5 };

function change(value) {
  value.value = 7;
}

change(obj);
console.log(obj);
//-------------------------------------------------------------------------------------------------------------------