// Nullish coalescing operator ( 변수명 ?? 변수명 or 값)
//  : 1) Null이나 undefined처리?            -> ??로 해결하즈아~
//    2) || 을 통한 NULL 처리?              -> ??로 해결하즈아~
//    3) defaultParameter는 null일때 적용X  -> ??로 해결하즈아~

//-----------------------------------------------------------------------------
// 1) ❌ Bad Code 💩
function printMessage(text) {
  let message = text;
  if (text == null || text == undefined) {
    message = 'Nothing to display 😜';
  }
  console.log(message);
}

//-----------------------------------------------------------------------------
// 3) 🚨 Default parameter is only for undefined
function printMessage(text = 'Nothing to display 😜') {
  console.log(text);
}

printMessage(null);       // null    <- Default parameter로 null 처리시 문제

//-----------------------------------------------------------------------------
// 2) 🚨 Logical OR operator ||
function printMessage(text) {
  const message = text || 'Nothing to display 😜';
  console.log(message);
}


printMessage('Hello');    // Hello
printMessage(null);       // Nothing to display 
printMessage(undefined);  // Nothing to display
printMessage(0);          // Nothing to display    <- || 로 처리했을때의 문제점
printMessage('');         // Nothing to display    <- || 로 처리했을때의 문제점

//-----------------------------------------------------------------------------
// ex)  Nullish coalescing operator 사용 예시

// ✅ Good Code ✨
function printMessage(text) {
  const message = text ?? 'Nothing to display 😜';
  console.log(message);
}

const result = getInitialState() ?? fetchFromServer();
console.log(result);      // Hiya from 💻

function getInitialState() {
  return null;
}
function fetchFromServer() {
  return 'Hiya from 💻';
}
