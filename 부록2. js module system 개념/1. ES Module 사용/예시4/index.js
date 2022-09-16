//  ES Module 사용법 : (from 사용할 모듈) export 구문을 입력 -> (to 가져오는 파일) import구문을 통해 불러옴

//  사용법 : (from 사용할 모듈) export 구문을 입력 -> (to 가져오는 파일) import구문을 통해 불러옴

//  - import 구문
//      a. import 지은 변수명 from '불러오는 모듈 경로'
//          : 모듈에서 변수 하나만 가져오는 방법  
//              -> export defalut {여려변수들} 을 사용한다면, b구문처럼 '지은 변수명'을 객체명처럼 사용 가능 

//      b. import * as 지은 변수명 from '불러오는 모듈 경로';
//          : 모듈에서 모든 변수를 가져오는 방법 
//            (*의 의미 : SQL에서 모든 변수 가져오는것 의미.. -> 이걸 '지은 변수명'으로 통칭해 객체명화 하는 것)
//              -> '별칭.프로퍼티' or '별칭.메서드명(파라미터....)'' 를 통해 값을 지칭해서 불러옴

//      c. import { 가져올 변수명(여러개도 가능) } from '불러오는 모듈 경로';
//          : 모듈에서 1개 ~ 여러개 변수를 가져오는 방법
//              -> 그나마 가장 범용성이 좋은 방법 

// import a 구문 사용 : export defalut로 지정된 변수(혹은 변수들)을 지정한 변수명으로 가져와서 사용
//  -> 여기서는 export defalut에 여러 변수가 {}을 통해 지정되어 있으므로 import b구문처럼 객체명마냥 사용 가능
import math from './math.js';

// 별칭.프로퍼티 or 별칭.메서드명(파라미터....) 를 통해 값을 지칭해서 불러옴
console.log('perfectScore : ' , math.perfectScore);
console.log('sum : ' , math.sum(80, 10) );
console.log('avg : ' , math.avg(80, 90) );
console.log('math_subtract : ' , math.subtract(80, 90) );

// (로그값)
// perfectScore :  100
// sum :  90
// avg :  85
// math_subtract : -10