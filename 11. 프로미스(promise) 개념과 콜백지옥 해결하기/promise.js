'use strict';

// [Promise]
//  : Promise is a JavaScript object for asynchronous operation (프로미스 : 비동기 작동을 위한 JS의 객체)
//    -> 값을 얻고 난 뒤(ex. 서버 get), 나중에 원할때마다 그 내용을 다시 꺼내 이어서 원하는 작업을 이어갈 수 있음 (ex. 페이지 동적 상호작용) 

// -Promise 이해에 필요한 핵심개념
//  1) State (상태값에 대한 이해): pending(전송하기 위해 매단 값) -> fulfilled(전송 이행) or rejected(전송 거부)
//  2) Producer(데이터 제공자 = promise 객체) vs Consumer(데이터 사용자) 에 대한 개념 이해 필요
//      -> 대충 producer가 보내줄(사용할) 값을 장전(지정)해주는 역할을 시작으로, Consumer측은 원할때 그 내용을 다시 꺼내 이어서 원하는 작업을 할 수 있는 역할이라 보면 됨
//          -> 이후 consumer는 계속 값을 다시 꺼내서 사용하는 것이 가능함

// - Promise 객체 작성 구조 및 순서 

//  1. Producer(데이터 제공자 = 생성되는 promise 객체)
//    : (중요) when new Promise is created, the executor runs automatically (새로운 프로미스 객체 생성시에는, 그 내용(콜백)이 자동으로 실행되어, resolve나 reject 콜백도 작동함)
//      -> 모든 promise 객체는 resolve(consumer입장에서 produce의 콜백 성공시 저장값), reject(consumer입장에서 produce의 콜백 실패시 사용에러) 라는 콜백함수가 파라미터로 들어간다


//   ex) new Promise( (resolve, reject) => { resolve(전달값) , reject(실패내용) 이 들어간 콜백함수 } );

//    # resolve(전달값) : Producer 단계의 콜백함수가 성공적으로 실핼될 시, 이를 이후 consumer(프로미스변수명.then(콜백내용) ) 단계의 콜백함수에서 사용할 '전달값'에 해당하는 값을 전해주는 콜백함수 
//    # reject(에러값)  : 콜백함수 작동 실패시, '에러시 띄울 값'에 해당하는 값 을 전해주는 콜백함
//      -> (중요) Producer 단계의 끝은 값 전달이다 (= 죽어다 깨어나도, produce 단계에서는 전송할 값을 건드려서 뭘 할 수가 없다)
//                -> 다시말해 실질적으로 producer의 콜백함수를 실행시켜 성공/실패를 알아보는 주체는 consumer라는 것

//------------------------------------------------------------------------------------------------
// ex) 프로미스 생성 (producer 작성) 예시
//      -> (중요) 명심하자! produce의 끝은 resolve, reject를 통해 consumer 단계에서 produce의 콜백을 성공/실패 했을때 사용할 값이 무엇인지 설정(장전) 해 두는것까지..
//                (= 다시말해 실질적으로 producer의 콜백함수를 실행시켜 성공/실패를 알아보는 주체는 consumer라는 것)

const promise = new Promise((resolve, reject) => {

  // doing some heavy work (보통 비동기 작업을 하게 되는 프로미스 내부에서는 무거운 작업을 하게 됨)
  //  -> ex) network, read files
  console.log('doing something...');

  setTimeout(() => {

    // 만약 consumer단계에서 producer단계의 콜백을?
    resolve('ellie');                  // 성공한다면, 이후 consumer단계의 프로미스객체명.then(value변수 사용 콜백함수)을 통한 콜백에서 사용할 value값 = 'ellie'로 고정됨
    reject(new Error('no network'));   // 실패한다면, 이후 consumer단계의 프로미스객체명.catch(error변수 사용 콜백함수)을 통한 콜백에서 사용할 error값 = 'no network'로 고정됨

  }, 2000);
});
//------------------------------------------------------------------------------------------------

//  2. Consumers(프로미스변수명.then(value값 사용 콜백).catch(error값 사용 콜백).finally(콜백함수)
//   : 앞서 producer 단계의 콜백함수를 실행하여, 성공시 resolve 콜백함수를 통해 가져온 value값은 then 구문에 
//                                             실패시 reject 콜백함수를 통해 가져온 error값은 catch 구문에, 마지막에 finally 구문을 통한 콜백함수를 실행하여 promise 객체로 리턴하는 단계

//   ex) 프로미스변수명.then(value값 사용 콜백).catch(error값 사용 콜백).finally(콜백함수);
//        -> then, catch, finally는 꼭 이 순서 안 지켜도 됨.. 3번 Promise chaining 참고
//           ex1) .then().then().then().then().catch()   <-   ㅇㅋ
//                : 4번의 then() 중 실패나면 바로 catch()로 가는 구조
//           ex2) .then().then().catch().then().catch().then().finally()  <-   ㅇㅋ
//                : 첫 catch는 앞선 2번의 then() 중 하나 실패나면 실행, 두번째 catch는 3번째 then()에서 실패시 실행

//    # then(value사용 콜백함수) : 앞서 produce 단계의 콜백함수 성공시, resolve() 콜백함수를 통해 받아온 value값을 사용한 콜백함수 실행 후 promise 객체로 리턴
//    # catch(error시 띄울 값)   : 앞서 produce 단계의 콜백함수 실패시, reject() 콜백함수를 통해 받아온 error을 사용한 콜백함수 실행 후 promise 객체로 리턴
//    # finally()               : then, catch 어느쪽이든 실행하고 나서 여기있는 콜백을 실행 후 promise 객체로 리턴

//------------------------------------------------------------------------------------------------
// ex) 프로미스 then, catch, finally (consumer 작성) 예시

// 앞서 작성한 produce 단계의 Promise 객체의 레퍼런스를 저장한 변수
promise 
  .then(value => {    //  produce 단계에서 입력한 콜백이 성공시 : resolve를 통해 받아온 값을 value라는 이름으로 파라미터로 넣는 함수를 작동시켜라
    console.log(value); 
  })
  .catch(error => {   //  produce 단계에서 입력한 콜백이 실패시 : rejectfmf 통해 받아온 값을 error라는 이름으로 파라미터로 넣는 함수를 작동시켜라
    console.log(error);
  })
  .finally(() => {    // 성공이던 실패던 최후에는 꼭 실행할것
    console.log('finally');
  });

  // [성공시]
  // doing something...
  // ellie
  // finally

  // [실패시]
  // doing something...
  // Error : no network
  // finally
//------------------------------------------------------------------------------------------------

//  3. Promise chaining (프로미스 연쇄)
//    : 2번의 consumer 단계에서 then, catch, finally는 promise객체를 리턴 -> .then().then().catch() 이런 식으로 중첩된 방식으로 메서드를 묶어 붙이면 연쇄적 실행이 가능

//------------------------------------------------------------------------------------------------
// ex) Promise chaining을 위한 또 다른 예시
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2) // 2
  .then(num => num * 3) // 6
  .then(num => {
    // then()안에서 다른 promise 객체로 value를 받아 또 다른 '비동기' 코드를 produce단계로 세팅하는 것도 가능하다(어차피 promise 객체로 리턴되기에 호환됨)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num));   //  5   <- 앞선 then()의 produce단계를 consumer단계에서 직접 실행하는 부분
//------------------------------------------------------------------------------------------------


//  4. Error Handling
//    : 복수의 then()구문이 chaining 되었을 때, catch구문의 위치를 잘 잡는다면, 어떤 then()문에서 에러가 났는지 잡을 수 있음

//------------------------------------------------------------------------------------------------
// ex) Promise chaining을 위한 또 다른 예시
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
  });
const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

// getHen() 
//   .then( hen => getEgg(hen) )
//   .then( egg => cook(egg) )
//   .then( meal => console.log(meal) )
//   .catch(console.log);

// 암묵적으로 then, catch 구문에 인자 생략가능
getHen() 
  .then(getEgg)
  .then(cook)
  .then(console.log)
  .catch(console.log);  // Error: error! 🐓 => 🥚   <- 1번째 then()문에서 에러가 났음을 확인 가능

// 문제가 되는 1번째 then() 구문을 넘기기 위해선?
//  -> 그 직후 .catch문을 통해 오류를 잡으면, 에러문 대신 🌭을 리턴하도록 하자
getHen() 
  .then(getEgg)
  .catch(error => {
    return '🌭';    // 에러대신 🌭을 리턴
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);  // 🌭 => 🍳   <- 1번째 then()문에서 에러가 난 부분을 🌭으로 리턴하도록 조치를 취했기에 문제없었고, 나머지 then()구문은 문제 없기에 무사히 잘 실행됨
//------------------------------------------------------------------------------------------------
