// Spread Syntax - Object
//  : 객체 전개 구문을 통한 복사를 통해 노가다를 피하자!

const item = { type: '👔', size: 'M' };
const detail = { price: 20, made: 'Korea', gender: 'M' };

//-----------------------------------------------------------------------
//  과거의 객체요소 복사방법? 
//  1) 개별 객체(기존 존재 or 신 객체 생성) 요소에 복사할 요소를 직접 지명해서 복사
//  2) 객체 만들어서, 내부 프로퍼티에 값 하나하나 지명해서 복사

// 1) ❌ Bad Code 💩
item['price'] = detail.price;

const newObject = new Object();
newObject['type'] = item.type;
newObject['size'] = item.size;
newObject['price'] = detail.price;
newObject['made'] = detail.made;
newObject['gender'] = detail.gender;
console.log(newObject);

// 2) ❌ Bad Code 💩
const newObject2 = {
  type: item.type,
  size: item.size,
  price: detail.price,
  made: detail.made,
  gender: detail.gender,
};
console.log(newObject);
//-----------------------------------------------------------------------

// ✅ Good Code ✨
//  : Object.assign()를 통한 객체에 넣을 객체들을 지명
const shirt0 = Object.assign(item, detail);
console.log(shirt0);

// ✅ Better! Code ✨
//  : Spread Syntax를 통해 깔끔하게
const shirt = { ...item, ...detail, price: 30 };
console.log(shirt);
