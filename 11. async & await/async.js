// [async & await]
//  :  clear style of using promise (좀 더 간결한 방식에 좀 더 동기적인 개념으로 promise 개념을 사용할 수 있게 만든 API)

//  ex) async function xxx (){ await yyy(); return 'go';}.then(콜백함수); 


// const { reject } = require("async");

// 1. async
//  : promise 객체를 만드는 produce 단계에서 번거롭게 resolve, reject 같은 콜백함수 써야하는 것이 너무 번거로움
//    -> 다 ㅈ까라고 하고, 평범한 함수처럼 성공시 return문에 전달값 작성 후, fucntion 앞에 async만 붙이면 producer 단계로 가도록 만사 해결되게 만듦
//    -> 실행은 마찬가지로 일반 프로미스 구문처럼 comsumer단계 .then()을 붙여서 실행하는 것이 가능

//  # async 또한 promise 객체이기에, 그 안에 promise 객체를 생성해도 그 프로미스의 resolve에 대한 값은 자동으로 호환되게 설계됨

//------------------------------------------------------------------------------------------------
// ex) promise -> async 비교 예시

// promise VER
// function fetchUser() {

//   return new Promise( (resolve, reject) => {
//     // do network reqeust in 10 secs....
//     resolve('ellie');
//   });

// }

// async VER : 참으로 깔끔하다 볼 수 있음
async function fetchUser() {
  // do network reqeust in 10 secs....
  return 'ellie';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

//------------------------------------------------------------------------------------------------


// 2. await ✨
//  : async로 선언되어 있는 함수 내에서만 사용 가능한 예약어, 
//    사용시 해당 구역이 전부 비동기적으로 처리되는 async내에서 await이 앞에 붙은 코드의 동작이 끝날때까지 동기코드마냥 기다려 줌
//    (= promise 구문에서 .then().catch() 를 썼을때, 해당 콜백함수의 결과가 나올때까지 기다려주는 것과 비슷)
//    -> 실행은 마찬가지로 일반 프로미스 구문처럼 comsumer단계 .then()을 붙여서 실행하는 것이 가능

//------------------------------------------------------------------------------------------------
// ex) promise & then -> async & await 비교 예시

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);  //  # async 또한 promise 객체이기에, 그 안에 promise 객체를 생성해도 그 프로미스의 resolve에 대한 값은 자동으로 호환되게 설계됨
  return '🍎';
}

async function getBanana() {
  await delay(1000);  //  # async 또한 promise 객체이기에, 그 안에 promise 객체를 생성해도 그 프로미스의 resolve에 대한 값은 자동으로 호환되게 설계됨
  return '🍌';
}

// promise VER : then() 구문이 본의 아니게 콜백 지옥형으로 작동
// function pickFruits() {

//   return getApple().then(apple => {
//     return getBanana().then(banana => `${apple} + ${banana}`);
//   });
// }

// async & await VER 
async function pickFruits() {
  const applePromise = getApple();     
  const bananaPromise = getBanana();    // await을 함수 부부니 아니라, 결과값 부분으로 빼버리면 좋은점? 
  const apple = await applePromise;     //  -> 함수계산 부분은 동시에 비동기로 처리하고, 결과값만 await로 받으면? 시간 절약 완료
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;       
}

pickFruits().then(console.log);        // 🍎 + 🍌    <- [object Promise] + [object Promise] : await으로 결과값 받는 부분이 없으면, 비동기로 실행되기에 받을 객체가 없기에 이렇게 찍힘
//------------------------------------------------------------------------------------------------


// 3. useful Promise APIs ✨
//  : 프로미스 구문 작성에 유리한 Promise 클래스의 static 메서드 소개

//  - Promise.all( [ async(promise포함) 함수1, ... , n ] )
//    : 파라미터로 들어간 배열 안의 모든 promise 객체들의 실행이 병렬적으로 다 끝날때까지 기다려주고 모아서, consumer단계 콜백함수를 실햄
//      -> 실행은 마찬가지로 일반 프로미스 구문처럼 comsumer단계 .then()을 붙여서 실행하는 것이 가능

//  - Promise.race( [ async(promise포함) 함수1, ... , n ] )
//    : 파라미터로 들어간 배열 안의 모든 promise 객체들중 가장 먼저 들어온 녀석에 한하여 promise 객체를 리턴함
//      -> 실행은 마찬가지로 일반 프로미스 구문처럼 comsumer단계 .then()을 붙여서 실행하는 것이 가능

//------------------------------------------------------------------------------------------------
// ex) Promise.all( [ async(promise포함) 함수1, ... , n ] ) 예시
function pickAllFruits() {

  return Promise.all([getApple(), getBanana()]).then(fruits =>
    fruits.join(' + ')
  );
}

pickAllFruits().then(console.log);   // 🍎 + 🍌
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------
// ex) Promise.race( [ async(promise포함) 함수1, ... , n ] ) 예시
function pickOnlyOne() {

  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);  // 🍌   <- 🍎는 2초가 걸리기에, 1초가 걸리는 🍌만 먼저 리턴되어 실행됨 
//                                            (동기화로 인해 2초가 걸리는 🍎 + 🍌보다도 빠르게 나옴)
//------------------------------------------------------------------------------------------------
