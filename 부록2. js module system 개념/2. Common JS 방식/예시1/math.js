//  CommonJS 사용법 : (from 사용할 모듈) 사용할 변수 앞에 export.변수명 입력 or module.export { } 구문 입력-> (to 가져오는 파일) require('파일경로'); 구문을 통해 불러옴

//  - CommonJs 모듈 내보내기 : export.변수명 및 module.export 구문
//      a. export.내보내고 싶은 변수명;
//          : 내보내고 싶은 js 변수 앞에 'export.' 를 일일히 붙여서 모듈의 변수로서 블록 스코프에 넣는 것으로 판정 

//      b. module.export { 내보내고 싶은 변수명(여러개도 가능) };
//          : 이를 통해 여러개의 변수들을 직관적으로 지명 가능
//              -> 그나마 가장 범용성이 좋은 방법 

// a구문 export.변수명 사용 : 이를 통해 진짜 모듈에 넣고 싶은 변수만 지정이 가능
exports.perfectScore = 100;

exports.sum = (num1, num2) => {
    return num1 + num2;
};

exports.avg = (num1, num2) => {
    return ( num1 + num2 ) / 2;
};

exports.subtract = (num1, num2) => {
    return num1 - num2;
};