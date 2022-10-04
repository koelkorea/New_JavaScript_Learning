'use strict';

// [callback]
//  : 함수의 인자로써 넘겨진 후, 특정 이벤트에 의해 호출되는 함수를 의미 (동기적으로던 비동기적으로던 양 쪽 다 사용이 가능)
//    -> JS에서 함수는 일급시민이기 때문에 가능

//  - synchronous (동기)
//    : 코드가 소위 말하는 비동기(복수의 프로세스에서 병렬적)처리 없이, 위에서 아래로 순차적인 순서를 가지고 실행되는 것을 의미

//  - Asynchronous (비동기)
//    : 코드가 소위 말하는 복수의 프로세스에서 동기 코드와 별개로 병렬적 처리가 이뤄지는 것을 의미 (= 언제 코드가 실행될지 예측이 매우 힘듦)
//      -> 주로 쓰이는 용도
//          : 서버에서 데이터 가져올 떄... 추후 이를 기다려서 코드 작동을 통제해야 할 때를 위해, promise, async await 등이 나옴

//    #JavaScript is synchronous (JS는 동기적 언어)
//      : Execute the code block by orger after <var, function> hoisting (var, function이 호이스팅 된 이후, 코드가 순서에 맞춰서 한 줄 한 줄 실행)
//        -> 다시 말해, 특별한 비동기함수(web API, promise, async 등등)가 적용되는 경우를 제외한 모든 내용이 한줄한줄 순차적으로 동작한다는 것을 의미함
//            -> JS에서 비동기를 말한다는건 몇몇 예외를 배운다는 것을 의미 + JS를 넘어서 백그라운드의 자원(운영체제, 브라우저 등등에서 지원하는 기능)이 개입하는 경우가 많음
//                -> uncommon한 어떤 라이브러리의 함수가 동기인지 비동기인지는 사전정보 없이 자체적으로 알기는 불가능함

//------------------------------------------------------------------------------------------------
// ex) Synchronous 예시
console.log('1');
setTimeout(() => console.log('2'), 1000);   // setTimeout : 대표적인 비동기 함수
console.log('3');
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------
// ex) Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));

// ex) Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);
//------------------------------------------------------------------------------------------------

//  - callback hell
//    : 콜백이 시도떄도 없이 튀어나오게 코딩해서, 읽기도 어렵고 디버깅도 힘들게 하는 현상

//    # callback hell이 나쁜 이유
//      1. 비즈니스 로직을 이해하기가 힘들다
//      2. 디버깅이 힘들어 유지보수가 매우 별로이다

// Callback Hell example
//------------------------------------------------------------------------------------------------
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your passrod');
userStorage.loginUser(
  id,
  password,
  user => {
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      error => {
        console.log(error);
      }
    );
  },
  error => {
    console.log(error);
  }
);
//------------------------------------------------------------------------------------------------