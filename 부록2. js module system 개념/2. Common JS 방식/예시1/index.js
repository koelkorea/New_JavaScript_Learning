//  CommonJS 사용법 : (from 사용할 모듈) 사용할 변수 앞에 export.변수명 입력 or module.export { } 구문 입력-> (to 가져오는 파일) require('파일경로'); 구문을 통해 불러옴

//  - CommonJs 모듈 불러오기 : require 구문
//      a. let or const { 불러오고 싶은 변수명(여러개도 가능) } = require('파일경로');
//          : 모듈에서 1개 ~ 여러개 변수를 가져오는 방법
//              -> 그나마 가장 범용성이 좋은 방법 

//      b. let or const 지은 변수명(= 별칭) = require('파일경로');
//          : 모듈에서 모든 변수를 '지은 변수명'으로 통칭해 객체명화 하여 가져오는 방법 
//              -> '별칭.프로퍼티' or '별칭.메서드명(파라미터....)'' 를 통해 값을 지칭해서 불러옴

// require a구문 사용 : 이를 통해 불러올 변수를 유연하게 부를 수 있음
const { perfectScore, sum, avg, subtract } = require('./math');

console.log('perfectScore : ' , perfectScore);
console.log('sum : ' , sum(80, 10) );
console.log('avg : ' , avg(80, 90) );
console.log('subtract : ' , subtract(80, 90) );

// (로그값)
// perfectScore :  100
// sum :  90
// avg :  85
// subtract : -10