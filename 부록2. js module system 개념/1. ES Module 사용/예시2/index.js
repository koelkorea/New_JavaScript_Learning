//  ES Module 사용법 : (from 사용할 모듈) export 구문을 입력 -> (to 가져오는 파일) import구문을 통해 불러옴

//  - import 구문
//      a. import 지은 변수명 from '불러오는 모듈 경로'
//          : 모듈에서 변수 하나만 가져오는 방법  

//      b. import * as 지은 변수명 from '불러오는 모듈 경로';
//          : 모듈에서 모든 변수를 가져오는 방법 
//            (*의 의미 : SQL에서 모든 변수 가져오는것 의미.. -> 이걸 '지은 변수명'으로 통칭해 객체명화 하는 것)
//              -> '별칭.프로퍼티' or '별칭.메서드명(파라미터....)'' 를 통해 값을 지칭해서 불러옴

//      c. import { 가져올 변수명(여러개도 가능) } from '불러오는 모듈 경로';
//          : 모듈에서 1개 ~ 여러개 변수를 가져오는 방법
//              -> 그나마 가장 범용성이 좋은 방법 

// import c구문 사용 : 이를 통해 쉽게 원하는 변수들만 골라 부르기 가능
import { perfectScore, sum, avg } from './math.js';

console.log('perfectScore : ' , perfectScore);
console.log('sum : ' , sum(80, 10) );
console.log('avg : ' , avg(80, 90) );

// (로그값)
// perfectScore :  100
// sum :  90
// avg :  85