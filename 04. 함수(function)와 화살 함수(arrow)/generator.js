// [Generator]
//  : function과 유사하지만, 일종의 변형된 iterable한 요소가 포함된 개념으로, 
//    내용 안에 일종의 정거장을 만들어 두고, .next()를 통해 필요할 때마다 이를 멈췄던 부분에서 추가적으로 진행시키는 것이 가능하다.
//      -> (중요) Generator함수명[Symbol.iterator]() === Generator함수명; 이기에 Generator는 iterable하다 할 수 있음
//          -> 단! 필요한 모든 크기의 값을 미리 만들어두지 않고, 늘어나는 배열 크기마냥 필요한 순간 생성함 (= 메모리 관리가 우수)

//      # iterable
//        : 내부에 메서드 Symbol.iterator(iterator를 반환)가 존재하고, 이를 구현된 배열로서 일반화한 객체 (= '인덱스'와 'length'는 필요조건은 아님)
//          ->  (특징) 
//              1) next()가 있어 열거 가능
//              2) for of를 통한 내부 값 조회 가능

//      # 변수명[Symbol.iterator]()
//         : 해당 변수 객체 내부 속성 중 Symbol에서 iterator메서드를 작동시키라는 의미 
//           (= 여기서 나오는 배열은 배열이 아니라, 객체의 특정 프로퍼티를 나타내는 Computed properties (계산된 프로퍼티들) 부분이다)
//              -> 이 이후 .next()같은 메서드 실행 가능

//      # next()
//        : 실행하면 다음 단계까지 내용을 진행시키고, 
//          실행결과에 따른 value값에 해당하는 값과 다음 내용이 없는지를 의미하는 boolean값 done을 반환한다


// 1. Generator 선언 과정
//  1) function 옆에 *을 붙힌다 (function* 함수명, function *함수명 다 가능함.. *가 붙은게 중요함)
//  2) 중간지점으로 삼고 싶은 곳에 return문 대신 yield문을 사용한다
//  3) 완전히 끝내고 싶은 지점에 return문을 붙힌다   

//--------------------------------------------------------------------------------
//  ex) 선언 시 사용 예시
function* example(){

    try{
        let example = 1
        console.log(example);
        yield example;      // next()문을 통해 멈출 break포인드     // yield 옆의 문구는 콘솔로 찍힌다

        example = 2
        console.log(example);
        yield example;      // next()문을 통해 멈출 break포인드      // yield 옆의 문구는 콘솔로 찍힌다

        example = 3
        console.log(example);
        yield example;      // next()문을 통해 멈출 break포인드      // yield 옆의 문구는 콘솔로 찍힌다

        return "finish";    // Generator의 return문 역시 콘솔로 찍힌다

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

// console.log(throw1.throw());    //  Uncaught undefined , {value: undefined, done: false};
//--------------------------------------------------------------------------------


// 3. Generator에 prompt처럼 인수 값을 주는 방법
//  : let or const 변수명 = yield; 과 같은 양식으로 코드를 두면,
//    그 지점에서 멈추고 난 이후 Generator명.next(값)을 통해 해당 변수에 값을 주고 Generator를 계속 진행할 수 있음

//--------------------------------------------------------------------------------
//  ex) 값을 전달하는 법
function* fn1(){ 

    // next()를 통해 멈춘 지점, next(33)이 출발하는 지점.. 
    const num1 = yield "첫번째 변수를 입력해봐라";          //  yield 옆의 문구는 콘솔로 찍힌다
    console.log(num1);  //  next(33)으로 num1 = 33; 으로 전달

    // next(33)를 통해 멈춘 지점, next(44)이 출발하는 지점.. 
    const num2 = yield "두번째 변수를 입력해봐라";          //  yield 옆의 문구는 콘솔로 찍힌다
    console.log(num2);  //  next(44)으로 num2 = 44; 으로 전달

    return num1 + num2; //  최종적으로 next(44)이 멈춤, 33 + 44 = 77
}

const execute1 = fn1();

console.log(execute1.next());        //  {value: '첫번째 변수를 입력해봐라', done: false}
console.log(execute1.next(33));      // 33  {value: '두번째 변수를 입력해봐라', done: false}
console.log(execute1.next(44));      // 44  {value: 77, done: true}
//--------------------------------------------------------------------------------

// 4. Generator는 필요할때마다 연산을 수행한다는 특성 존재
//  : 메모리 관리에 유리 + 원하는 순간까지 필요한 계산을 미룰수 있는 유도리가 생긴다

//--------------------------------------------------------------------------------
//  ex) Generator의 유도리를 보여주는 예시
function* fn2(){ 

    let index = 0;

    // while문 같은 순환반복문도 자동으로 가지 않기에 브라우저가 바로 뻗지 않고, next()가 나올때만 연산을 진행함
    while(true){
        yield index++;
    }
}

const execute2 = fn2();

// 사실상 done: true가 될 일이 업음
console.log(execute2.next());      //  {value: 1, done: false}
console.log(execute2.next());      //  {value: 2, done: false}
console.log(execute2.next());      //  {value: 3, done: false}

//--------------------------------------------------------------------------------

// 5. Generator는 다른 Generator를 불러다 끼워넣어 쓸 수 있는 특성이 있음
//  : 'yield* Generator명'; 을 통해 원하는 제너레이터를 가져다 쓸수 있음
//      -> 정확하게는 어떤 iterable 객체를 yield옆에 두어도 상관은 없음

//--------------------------------------------------------------------------------
//  ex) Generator에 타Generator 끼워쓰기
function* gen1() {
    yield "W";
    yield "o";
    yield "r";
    yield "l";
    yield "d";
}

function* gen2() {
    yield "Hello";
    yield* gen1();      // gen2()의 일부로서 gen1을 불러서 사용
    yield "!";
}

// Spread snxtax로서 Generator를 통째로 집어넣으면, 바로 모든 yield와 return문까지를 끊지않고 진행함 
// (= 정확히는 iterable객체의 모든 값을 파라미터로 넣은것)
console.log(...gen2());     //  Hello, W o r l d !

