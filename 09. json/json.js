'use strict';

// [JSON : JavaScript Object Notation (자바스크립트 객체 표기법)]
//  : ES3에서 추가된 객체 타입에 영감을 받아 만들어짐

//  # Json의 특징
//    (a) simplest data interchange format
//        : 데이터 주고받는데 사용하는 가장 단순한 포맷
//    (b) lightweight text-based structure
//        : 텍스트(그러니까 string) 기반의 가벼운 구조
//    (c) easy to read
//        : 인간도 알아먹기 쉽다
//    (d) key-value pair
//        : 키-값 으로 묶여있는 구조  
//    (e) used for serialization and transmission of data between the network the network connection
//        : 데이터를 직렬화(object -> string 변환) 하고 전송하는데 쓰임
//    (f) independent programming language and platform
//        : 프로그래밍 언어나 플랫폼에 독립적임 (호환성이 끝내주는 부분이 있음)

//  # JS 객체 표기법 예시

//    (ex)
//      const objExample = {
//        name: 'ex',
//        size: null,
//        date: new Date(),
//        method: function () {
//          console.log('example');
//        },
//      };

//  # Json 표기법 예시
//    : 객체와 형식이 비슷하지만, 
//      a) null을 제외한 모든 값 및 요소명에 ""가 붙음
//      b) Json은 Symbol(js 고유 데이터이기 때문) 이나 메서드(객체의 데이터가 아니기 때문) 를 받지 못함
//      C) Date() 객체 같은 값들은 전부 Json형태에서는 string 형태로 저장되어 있고, 다시 object로 돌려도 똑같이 string임

//    (ex)
//      const objExample = {
//        "name" : "ex",
//        "size" : null,
//        "date" : "2022-09-27T05:00:38.104Z"
//      };


// 1. JSON.stringfy(obj)
//  : Object -> JSON 변환하는 메서드

//  ex1) JSON.stringify( 원시형 및 배열 내용 or 변수명 or 객체명 );
//        -> 원시형이나 배열은 string 변환, Json 변환 시, { }안의 기존 json 형식으로 값이 반환 

//  ex2) JSON.stringify( 객체명, (생략가능 : '[받고 싶은 프로퍼티(멤버변수)로 구성된 배열로 구성]') );
//        -> 객체 안의 원하는 프로퍼티만 뽑아서 { }안의 기존 json 형식으로 값이 반환 

//  ex3) JSON.stringify( 객체명,  function( key, value ) { 변환식 return key, value를 포함 } );
//       JSON.stringify( 객체명, ( key, value ) => { 변환식 return key, value를 포함 } );
//        -> 콜백 함수를 통해, 객체 key, value를 입맛에 맞게 바꾸고, 그 내용을 { }안의 기존 json 형식으로 값을 반환 

//----------------------------------------------------------------------------------------------------------------

// ex1) 원시형 -> Json
let json = JSON.stringify(true);
console.log(json);  // 'true'

// ex2) 배열 -> Json
json = JSON.stringify(['apple', 'banana']);
console.log(json);  // ["apple","banana"]

// ex3-1) Object -> Json
//  ->  JSON.stringify( 변환 내용 및 변수명 )
const rabbit = {

  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: function () {
    console.log(`${this.name} can jump!`);
  },

};

json = JSON.stringify(rabbit);
console.log(json);  // {"name" : "tori", "color" : "white", "size" : null, "birthDate":"2022-09-27T05:00:38.104Z" }

// ex3-2) Object -> Json 특정요소만 변환
//  -> JSON.stringify( 변환 내용 및 변수명, '[받고 싶은 멤버변수로 구성된 배열로 구성]' );
json = JSON.stringify(rabbit, ['name', 'color', 'size']);
console.log(json);  // {"name" : "tori", "color" : "white","size" : null}

// ex3-3) Object -> Json 콜백함수를 통한 통제
json = JSON.stringify(rabbit, (key, value) => {

  console.log(`key: ${key}, value: ${value}`);
  // key: , value: [object Object]
  // key: name, value: tori
  // key: color, value: white
  // key: size, value: null
  // key: birthDate, value: 2022-09-27T05:00:38.104Z

  return key === 'name'? 'ellie' : value;  // 이 처럼 콜백함수를 통해, 대상 객체의 내용을 입맛대로 바꾸는게 가능함

});

console.log(json);  //  {key: "name" , value: "ellie"  key: "color" , value: "white"  key: "size" , value: null  key: "birthDate", value: "2022-09-27T05:00:38.104Z" }
//----------------------------------------------------------------------------------------------------------------


// 2. JSON.parse(json)
//  : JSON -> Object 변환하는 메서드

//  ex1) JSON.parse( json 객체명 );
//        -> json으로 변환된 객체가 객체 형식으로 다시 변환되어 돌아옴

//  ex2) JSON.parse( 객체명,  function( key, value ) { 변환식 return key, value를 포함 } );
//       JSON.parse( 객체명, ( key, value ) => { 변환식 return key, value를 포함 } );
//        -> 콜백 함수를 통해, 객체 key, value를 입맛에 맞게 바꾸고, 그 내용을 객체형식 반환 

//----------------------------------------------------------------------------------------------------------------
json = JSON.stringify(rabbit);
console.log(json);

// ex1) Json -> Object
//  -> JSON.parse( 객체명,  function( key, value ) { 변환식 return key, value를 포함 } );
const obj = JSON.parse(json, (key, value) => {
  
  console.log(`key: ${key}, value: ${value}`);
  // key: name, value: tori
  // key: color, value: white
  // key: size, value: null
  // key: birthDate, value: 2022-09-27T05:00:38.104Z
  // key: , value: [object Object]

  return key === 'birthDate' ? new Date(value) : value;

});

console.log(obj);
// const obj = {
//   birthDate : Tue Sep 27 2022 14:00:38 GMT+0900 (한국 표준시) {},
//   color: 'white',
//   size: null,
// }

// (중요) 객체 -> json시 메서드까지 받지 못함 = json -> 객체로 다시 변환해도 메서드 내용은 회복 X
rabbit.jump();
// obj.jump();  

// 날짜 같은 포맷은 json 형태일때 이미 string으로 저장되어 있음 = Date() 객체라고 생각하고 getDate() 같은 메서드 쓰면 에러 남
console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate.getDate()); // 원래 같으면 에러지만, parse메서드의 콜백을 통해 birthDate항목을 Date 객체 기반으로 바꿔 입력했기에 작동 됨

// [참고 사이트]
//  1. Json Diff : json을 통해 가져온 자료가 다르다면, 구체적으로 어디가 다른지 알려줌
//  2. Json Beautifier : 서버에서 가져온 난독화 된 Json을 사람이 보기 쉽게 줄바꿈고 들어쓰기 해줌
//  3. Json Parse : 받아온 json이 변환되면 객체로서 보여지는지 확인하는 곳
//  4. Json validator : 이 json형식에 오타 없는지 체크해 줌
//----------------------------------------------------------------------------------------------------------------