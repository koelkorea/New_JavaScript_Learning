// Spread Syntax - Array
//  : push, unshift 효과를 Spread Syntax로 쉽게 내자

let fruits = ['🍉', '🍊', '🍌'];

// fruits.push('🍓');
fruits = [...fruits, '🍓'];
console.log(fruits);    //  ['🍉', '🍊', '🍌', '🍓'];

// fruits.unshift('🍇');
fruits = ['🍇', ...fruits];
console.log(fruits);    //  ['🍇', '🍉', '🍊', '🍌', '🍓'];


// fruits.concat()을 통해 배열 복사도 가능
const fruits2 = ['🍈', '🍑', '🍍'];

let combined = fruits.concat(fruits2);
combined = [...fruits, '🍒', ...fruits2];
console.log(combined);
