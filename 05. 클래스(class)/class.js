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


// 3. Fields (public, private)
// Too soon!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields
class Experiment {

  publicField = 2;
  #privateField = 0;

}

const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);


// 4. Static properties and methods
// Too soon!
class Article {

  static publisher = 'Dream Coding';

  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher);
  }
  
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(Article.publisher);
Article.printPublisher();

// 5. Inheritance
// a way for one class to extend another class.
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

class Rectangle extends Shape {}
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log('🔺');
  }
  getArea() {
    return (this.width * this.height) / 2;
  }

  toString() {
    return `Triangle: color: ${this.color}`;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());
const triangle = new Triangle(20, 20, 'red');
triangle.draw();
console.log(triangle.getArea());

// 6. Class checking: instanceOf
console.log(rectangle instanceof Rectangle);
console.log(triangle instanceof Rectangle);
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape);
console.log(triangle instanceof Object);
console.log(triangle.toString());

let obj = { value: 5 };
function change(value) {
  value.value = 7;
}
change(obj);
console.log(obj);
