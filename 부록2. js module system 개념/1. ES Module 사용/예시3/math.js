//  ES Module 사용법 : (from 사용할 모듈) export 구문을 입력 -> (to 가져오는 파일) import구문을 통해 불러옴

//  - export 구문
//      a. export default 내보내고 싶은 변수명;
//          : import시 특별한 변수명을 적지 않으면(= 보통 import a구문 사용시), 이 때 지명한 변수를 가져옴
//            (단! 한번 사용 가능함.. 기본으로 출력할 변수를 부르기 때문)

//      b. export default { 내보내고 싶은 변수명(여러개도 가능) };
//          : import시 특별한 변수명을 적지 않으면(= 보통 import a구문 사용시), 이 때 지명한 변수들을 가져옴
//            (a와 마찬가지로 한번 사용 가능함.. 기본으로 출력할 변수를 부르기 때문)

//      c. export let(const) 내보내고 싶은 변수명;
//          : 이를 통해 여러개의 변수들을 직관적으로 지명 가능
//              -> 그나마 가장 범용성이 좋은 방법 

// export c구문 사용
export const perfectScore = 100;

export const sum = (num1, num2) => {
    return num1 + num2;
};

export const avg = (num1, num2) => {
    return ( num1 + num2 ) / 2;
};

const subtract = (num1, num2) => {
    return num1 - num2;
};

// export a구문 사용 : 이를 통해 subtract만 모듈의 기본 호출 메서드로 지명
export default subtract;