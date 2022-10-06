// Remove Duplicates!
//  : set 객체를 이용하면, 중복된 배열요소 정리 가능하다
const array = ['🐶', '🐱', '🐈', '🐶', '🦮', '🐱'];

console.log(array);

// Spread Syntax를 이용하면 더 깔끔하고 간단히 구현 가능
console.log([...new Set(array)]);
