// [call, apply, bind]
//  : function의 리턴값에 어떤 객체의 프로퍼티들을 활용한 값들을 반환하고 싶어 경우 this를 사용할때, 쓰는 function 객체의 메서드(static 아니다!)
//      -> function xxx(name) { this.name = name; }; 이런 애들을 통해, 저 this에 지정할 객체를 지정하는 용도로 사용한다고 생각하면 편하다

//  # 리턴값에 this를 요구하지 않는 메서드에 써도 상과없고, 이 경우는 첫번째 파라미터에 null로 놔줘도 내용 성립


// 1. call
//  : function 객체의 메서드로 특정 함수(function)의 리턴값에 this가 있는 경우, 
//    그 this를 특정 객체에 고정하여 함수의 결과값을 추출할 수 있도록 해주는 메서드

//  EX) 함수명.call( 활용할 객체명, 함수 파라미터1, .... , 함수 파라미터 N);

//------------------------------------------------------------------------------------------------
// ex) call 사용 예시

const mike = {
    name : "Mike",
};

function updateId(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
};

// 활용객체 : mike, 파라1 : 1999, 파라2 : "singer"
updateId.call(mike, 1999, "singer");
console.log(mike);      // {name: 'Mike', birthYear: 1999, occupation: 'singer'}

let me; 

updateId.call(me = { }, 2000, "student"); // let의 경우, call에서 { }를 주는것도 가능
console.log(me);

const lsh = { };    // const는 상수이기에 선언할때 객체를 줘야 내용 성립

updateId.call(lsh, 1989, "programmer");
console.log(lsh);       // {birthYear: 1989, occupation: 'programmer'}

const nums = [3, 1, 4, 6, 7, 99];

// 리턴값에 this를 요구하지 않는 메서드에 써도 상과없고, 이 경우는 첫번째 파라미터에 null로 놔줘도 내용 성립
console.log( Math.max.call(null, ...nums) );    // 99
console.log( Math.max(...nums) );               // 99

//------------------------------------------------------------------------------------------------

// 2. apply
//  : call과 유사하나, 파라미터들을 '배열[]' 형식으로 입력해야 함

//  EX) 함수명.apply( 활용할 객체명, [ 함수 파라미터1, .... , 함수 파라미터 N ] );

//------------------------------------------------------------------------------------------------
// ex) apply 사용 예시

// 활용객체 : mike, 파라1 : 1999, 파라2 : "singer"
updateId.apply(mike, [1990, "dancer"]);
console.log(mike);      // {name: 'Mike', birthYear: 1990, occupation: 'dancer'}

updateId.apply(me = { }, [2010, "doctor"]); // let의 경우, call에서 { }를 주는것도 가능
console.log(me);

updateId.apply(lsh, [1989, "jobber"]);
console.log(lsh);       // {birthYear: 1989, occupation: 'jobber'}

// 리턴값에 this를 요구하지 않는 메서드에 써도 상과없고, 이 경우는 첫번째 파라미터에 null로 놔줘도 내용 성립
console.log( Math.min.apply(null, [...nums] ) );    // 1
console.log( Math.min(...nums) );                   // 1

//------------------------------------------------------------------------------------------------

// 3. bind
//  : 함수표현식(특정 변수에 함수명에 해당하는 함수)를 베이스로 하며 해당 표현식에 다음과 같은 내용을 반영하여 저장하게 하는 function 메서드
//      1. 특정 함수의 this를 영원히 특정 객체명을 참조하도록 함
//      2. 원본 함수의 원하는 파라미터에 특정값을 영원히 참조하도록 설정

//  EX) let or const 변수명 = 함수명.bind( 활용할 객체명, fix할 파라미터값1, .... , fix할 파라미터값 N );

//------------------------------------------------------------------------------------------------
// ex) bind 사용 예시

// bind 예시1

// updateId를 베이스로 updateId의 this가 mike객체를 의미하도록 변경한 함수를 updateMike라는 변수에 저장
//   = 사실상 updateMike라는 신함수 탄생
const updateMike = updateId.bind(mike);

updateMike(1111, "crusader");

console.log(mike);      // {name: 'Mike', birthYear: 1111, occupation: 'crusader'}

// bind 예시2
function mul(a, b) {
    return a * b;
}
  
// this가 없는 mul를 베이스로 1번째 파라미터인 a에 해당하는 변수가 무조건 2로 고정되도록 변경한 함수를 double라는 변수에 저장
//   = 사실상 double라는 신함수 탄생
let double = mul.bind(null, 2);
  
// 1번째 파라미터가 2로 고정되었으므로, 남은 파라미터는 1개만 넣어도 됨
alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
//------------------------------------------------------------------------------------------------