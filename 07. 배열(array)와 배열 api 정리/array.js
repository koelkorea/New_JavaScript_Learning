'use strict';

// [Array🎉 기초] : JS의 배열로 타 언어와 다르게 'Stack', 'Queue', 'Deque' 같은 요소의 구현까지 쉽게 가능하다는 장점이 존재

// 1. Declaration (배열의 선언법 2가지)
const arr1 = new Array();
const arr2 = [1, 2];


// 2. Index position (배열의 인덱스 위치)
const fruits = ['🍎', '🍌'];
console.log(fruits);                      //  ['🍎', '🍌']
console.log(fruits.length);               //  2
console.log(fruits[0]);           
console.log(fruits[1]);
console.log(fruits[2]);                   // undefined
console.log(fruits[fruits.length - 1]);   // ['🍌']
console.clear();


// 3. Looping over an array (배열의 순차 출력 방법)

// - for (일반 for문을 통한 출력)
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// - for of (배열에서만 가능한 of구문)
for (let fruit of fruits) {
  console.log(fruit);
}

// - forEach

// 무명함수 ver 
fruits.forEach(function (fruit, index, array) {
  console.log(fruit, index, array);
});

// 화살함수 ver (파라미터 최소화)
fruits.forEach((fruit) => console.log(fruit));


// 4. Addtion, deletion, copy (요소 추가, 삭제, 배열 복사)

// - push
//  : add an item to the end (stack적, 배열 끝에 요소 추가)
fruits.push('🍓', '🍑');  //  ['🍎', '🍌', '🍓', '🍑']
console.log(fruits);

// - pop
//  : remove an item from the end (stack적, 배열 끝에 요소 삭제)
const poped = fruits.pop();   //  ['🍎', '🍌', '🍓']
fruits.pop();                 //  ['🍎', '🍌']
console.log(fruits);

// - unshift (push보다 느림 <- 원래 linkedList적 개념이기 때문)
//  : add an item to the beginnigg (queue적, 배열 처음에 요소 추가)
fruits.unshift('🍓', '🍋');   //  ['🍓', '🍋', '🍎', '🍌']
console.log(fruits);

// - shift (pop보다 느림 <- 원래 linkedList적 개념이기 때문)
//  : remove an item from the benigging (queue적, 배열 처음에 요소 삭제)
fruits.shift();                //  ['🍋', '🍎', '🍌']
fruits.shift();                
console.log(fruits);           //  ['🍎', '🍌']

// - splice ('이어주다' 라는 뜻 존재)
//  : remove an item by index position (배열요소 시작위치부터 오른쪽을 향해 지정개수까지 제거 및 추가하기)

//  ex) 대상배열.splice(시작인덱스, (생략가능 : 지울 갯수 <- 입력 X시 뒤쪽의 모든 요소 제거), (생략가능 : 추가요소1, ~~~~, 추가요소n) );

fruits.push('🍓', '🍑', '🍋');   
console.log(fruits);           //  ['🍎', '🍌', '🍓', '🍑', '🍋']

fruits.splice(1, 1);           
console.log(fruits);          //  ['🍎', '🍓', '🍑', '🍋']

fruits.splice(1, 1, '🍏', '🍉');
console.log(fruits);          //  ['🍎', '🍏', '🍉' , '🍑', '🍋']


// - concat
//  : combine two arrays (두 배열 결합하기)

//  ex) 대상배열.concat(합칠배열);

const fruits2 = ['🍐', '🥥'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);      //  ['🍎', '🍓',  '🍏', '🍉' , '🍑', '🍋', '🍐', '🥥']


// 5. Searching (검색기능)

// - indexOf
//  : 파라미터로 놓은 값이 요소에 있으면, 해당 인덱스 출력,  없으면 -1 출력
console.clear();
console.log(fruits);                //  ['🍎', '🍏', '🍉' , '🍑', '🍋']
console.log(fruits.indexOf('🍎'));  // 0
console.log(fruits.indexOf('🍉'));  // 2
console.log(fruits.indexOf('🥥'));  // -1

// - includes
//  : 파라미터로 놓은 값이 요소에 있으면, true,  없으면 false
console.log(fruits.includes('🍉')); // true
console.log(fruits.includes('🥥')); // false

// - lastIndexOf
//  : 파라미터로 놓은 값이 여러개일경우, 가장 뒷쪽에 있는 요소의 인덱스를 출력,  없으면 -1 출력
console.clear();
fruits.push('🍎');                      
console.log(fruits);                    //  ['🍎', '🍏', '🍉' , '🍑', '🍋', '🍎']
console.log(fruits.indexOf('🍎'));      // 0
console.log(fruits.lastIndexOf('🍎'));  // 5
console.log(fruits.lastIndexOf('🥥'));  // -1
