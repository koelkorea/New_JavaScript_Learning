//  ES Module 사용법 : (from 사용할 모듈) export 구문을 입력 -> (to 가져오는 파일) import구문을 통해 불러옴

//  사용법 : (from 사용할 모듈) export 구문을 입력 -> (to 가져오는 파일) import구문을 통해 불러옴

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

// import b구문 사용 : math.js의 모든 변수를 'math'라는 별칭으로 '객체명' 같은 느낌으로 가져옴
import * as math from './math.js';

// b구문 : 별칭.프로퍼티 or 별칭.메서드명(파라미터....) 를 통해 값을 지칭해서 불러옴
console.log('perfectScore : ' , math.perfectScore);
console.log('sum : ' , math.sum(80, 10) );
console.log('avg : ' , math.avg(80, 90) );

// import a 구문 사용 : export defalut로 지정된 변수(혹은 변수들)을 지정한 변수명으로 가져와서 사용
import math_subtract from './math.js';

// a구문을 통해 불러온 모듈 변수 사용
console.log('math_subtract : ' , math_subtract(80, 90) );

// (로그값)
// perfectScore :  100
// sum :  90
// avg :  85
// math_subtract : -10