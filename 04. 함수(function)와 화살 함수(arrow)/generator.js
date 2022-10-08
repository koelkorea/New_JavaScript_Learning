// [Generator]
//  : function과 유사하지만, 일종의 변형된 iterable한 요소가 포함된 개념으로, 
//    내용 안에 일종의 정거장을 만들어 두고, 필요할 때마다 이를 추가적으로 진행시키는 것이 가능하다.

//      # iterable
//        : 메서드 Symbol.iterator(iterator를 반환)가 구현된 배열을 일반화한 객체 (= '인덱스'와 'length'는 필요조건은 아님)
//          ->  (특징) 
//              1) next()가 있어 열거 가능
//              2) for of를 통한 내부 값 조회 가능

//      # next()
//        : 실행하면 다음 단계까지 내용을 진행시키고, 
//          실행결과에 따른 value값에 해당하는 값과 다음 내용이 없는지를 의미하는 boolean값 done을 반환한다

// 1. Generator 선언 과정
//  1) function 옆에 *을 붙힌다
//  2) 중간지점으로 삼고 싶은 곳에 return문 대신 yield문을 사용한다
//  3) 완전히 끝내고 싶은 지점에 return문을 붙힌다   

//--------------------------------------------------------------------------------
//  ex) 선언 시 사용 예시
function* example(){

    try{
        let example = 1
        console.log(example);
        yield example;  // next()문을 통해 멈출 break포인드

        example = 2
        console.log(example);
        yield example; // next()문을 통해 멈출 break포인드

        example = 3
        console.log(example);
        yield example;

        return "finish";

    } catch (e) {

        console.log(e);
    }
}
//--------------------------------------------------------------------------------

// 2. Generator 메서드
//  : Generator의 요소가 포함한 함수의 실행을 중간에 멈췄다가 재개할 수 있음

//  - next()
//   : 실행하면 다음 단계까지 내용을 진행시키고, 
//     실행결과에 따른 value값에 해당하는 값과 다음 내용이 없는지를 의미하는 boolean값 done을 반환한다

//  - return('문자열 내용' or 변수명)
//   : 실행하면 현재 진행상황과 관계없이 value에 '문자열 내용' or 변수명에 해당하는 값과 done이 true인 값을 반환한다

//  - throw()
//   : (try catch 구조라는 가정하에)실행하면 현재 진행상황과 관계없이 바로 catch위치에 해당하는 내용을 실행하고 value = undefined, done = true인 값을 반환한다

//--------------------------------------------------------------------------------
// ex) next() 구문 실행
const next = example();

console.log(next.next());    //  1, {value: 1, done: false};
console.log(next.next());    //  2, {value: 2, done: false};
console.log(next.next());    //  3, {value: 3, done: false};
console.log(next.next());    //  {value: finish, done: true};       <- return값에 다다를때 done: true가 된다
console.log(next.next());    //  {value: undefined, done: true};    <- return이후에는 value: undefined를 반환
//--------------------------------------------------------------------------------
// ex) return() 구문 실행
const return1 = example();

console.log(return1.return('END'));    //  {value: 'END', done: true};  <- retuen(파라미터)문을 실행하면, value값은 파라미터로 준 값을 띄우고, done: true가 된다
console.log(return1.return());    //  {value: undefined, done: true};   <- retuen()문을 실행하면, value값에 준것이 없으므로 undefined가 된다
//--------------------------------------------------------------------------------
// ex) throw() 구문 실행
//  : 에러에 해당하는 내용과 {value: undefined, done: false}를 반환한다
const throw1 = example();

console.log(throw1.throw());    //  Uncaught undefined , {value: undefined, done: false};
//--------------------------------------------------------------------------------