/**
 * 1. Shorthand property names (프로퍼티명 축약구문)
 *  : 함수를 통해 객체 생성시, 파라미터와 return되는 객체의 프로퍼티명이 같다면, 하나만 써줘도 되는 법칙 (ES6추가)
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer
 *
 */

//-------------------------------------------------------------------------------------------------------------
// EX) Shorthand property names 예시
{
  // Q : ellie1, ellie2라는 객체를 밑의 name, age 변수를 활용해서 만들고 싶음
  const ellie1 = {
    name: 'Ellie',
    age: '18',
  };

  const name = 'Ellie';
  const age = '18';

  // 💩 예시
  const ellie2 = {
    name: name,
    age: age,
  };

  // ✨ 예시 : 프로퍼티명 = 변수명의 경우는 이렇게 햇갈리지 않게 중복을 피해 작성이 가능
  const ellie3 = {
    name,
    age,
  };

  console.log(ellie1, ellie2, ellie3);
  
}

/**
 * 2. Destructuring Assignment (구조분해 할당 구문)
 *  : '객체'나 '배열' 내부의 값들을 각각 변수 하나하나에 쉽고 빠르게 넣어주고 싶은 경우 사용하는 구문
 * 
 *    # Destructuring Assignment (전개 문법) 사용시 주의사항
 *      1) (중요) 값을 받을 변수는 미리 값을 설정해줄 수 있지만, 할당된 값이 없지 않는이상 그 값은 덮어쓰여져 지워짐 (4. Default parameters )
 *      2) '...객체명'을 넣는 경우, 역시 레퍼런스 주소값을 참고하긴 하지만, 이를 Destructuring Assignment에 이용했을 경우 변수에 들어가는 값은 객체 내부의 '요소값' 그 자체이다
 *          -> 그러니까  객체값 변경한다고 해서 그 전에 Spread Syntax로 적용한 객체값까지 일괄적으로 바뀌어 적용되진 않는다는 말이다
 * 
 *  ex1) 객체의 경우
 *       : const lsh = { age : 32, hobby : 'moive' , job : 'IT engineer' };의 age, hobby의 내용을 variable1, 2에 넣고 싶을때? 
 * 
 *    # Shorthand property names 객체의 경우 
 *      : (answer1) const { age : variable1, hobby : variable2 }        ->   const { age , hobby} 가능
 *        (answer1) const ( { age : variable1, hobby : variable2  } );  ->   ( { age, hobby } ) 가능
 * 
 *    (answer1) let, const가 있다면? 
 *        -> const { age : variable1, hobby : variable2 } = lsh;  
 *              or
 *           const { age : variable1, hobby : variable2 } = { age : lsh.age, hobby : lsh.hobby };
 * 
 *    (answer2) let, const가 없다면? ( {입력할 변수명1 : 값1 , ... , 입력할 변수명n : 값n} )식으로 입력
 *        -> let variable1, variable2;
 * 
 *           ( { age : variable1, hobby : variable2  } = lsh );
 *           ( { age : variable1, hobby : variable2  } = { variable1 : lsh.age, variable2 : lsh.hobby } );
 * 
 *      => variable1 = 32; , variable2 = 'movie' 레퍼런스 아닌 원시값이 들어감
 * 
 * 
 *  ex2) iterable 객체의 경우
 *       :
 * 
 *    (배열) 
 *      - let, const가 있다면? 
 *        -> const [ variable1, variable2 ] = [ 32, 'moive'];  
 * 
 *      - let, const가 없다면? 
 *        -> let variable1, variable2;
 *           [ variable1, variable2 ] = [ 32, 'moive']; 
 *
 *    (SET) 
 *      - let, const가 있다면? 
 *        -> const [ variable1 = 'empty', variable2 = 'empty'] = new Set([1, 2, 3]);
 * 
 *      - let, const가 없다면? 
 *        -> let variable1, variable2;
 *           [ variable1, variable2 ] = new Set([1, 2, 3]);
 * 
 *    (문자열) 
 *      - let, const가 있다면? 
 *        -> const [ variable1 = 'empty', variable2 = 'empty'] = "abc";
 * 
 *      - let, const가 없다면? 
 *        -> let variable1, variable2;
 *           [ variable1, variable2 ] = "abc";
 * 
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 */
{
  //-------------------------------------------------------------------------------------------------------------
  // EX1) Destructuring Assignment in Object 예시

  // Q : object with Shorthand property names의 경우 구조할당 분해하기
  const student = {
    name: 'Anna',
    level: 1,
  };

  // 💩 예시 (구 코드)
  {
    const name = student.name;
    const level = student.level;
    console.log(name, level);
  }

  // ✨예시
  {
    // Shorthand property names의 경우 마찬가지로 프로퍼티명: 부분을 생략해도 됨
    const { name, level } = student;
    console.log(name, level);

    // 원래는 이 같이, 변수명 앞에 받을 객체의 프로퍼티명도 적어줘야 함 
    const { name: studentName, level: studentLevel } = student;
    console.log(studentName, studentLevel);
  }

  //-------------------------------------------------------------------------------------------------------------
  // EX2) Destructuring Assignment in Array 예시

  // array
  const animals = ['🐶', '😽'];

  // 💩 예시 (구 코드)
  {
    const first = animals[0];
    const second = animals[1];
    console.log(first, second);
  }

  // ✨ 예시
  {
    const [first, second] = animals;
    console.log(first, second);
  }
  //-------------------------------------------------------------------------------------------------------------
}

/**
 * 3. Spread Syntax (전개 문법)
 *  : 특정 함수나 iterable 컨테이너 안에 객체, 배열(엄밀하게 iterator면 상관없음) 안의 각각의 값들을 하나하나 넣어야 할 필요가 있는 경우 쓰는 문법
 *    (파라미터로 넣을 '배열' -> '개별 원시값'으로 분해해서 넣는 것)
 * 
 *    ex) const lsh = [1989, 9, 16 ];
 *        Math.max(...lsh); 로 간편하게 배열값을 일반값 하나하나로 전환시켜 실제로 계산되는 함수의 파라미터로 넣을 수 있음
 * 
 *    # Spread Syntax (전개 문법) 사용시 주의사항
 *      1) Math.max(...lsh, 40, 30); 처럼 다른 값이나, Math.max(...lsh, 40, 30, ...ljh); 같이 다른 iterable객체명을 넣는거도 가능하다
 *      2) '...객체명'을 넣는 경우, 역시 레퍼런스 주소값을 참고하긴 하지만, 이를 Spread Syntax에 이용했을 경우 들어가는 값은 객체 내부의 '요소값' 그 자체이다
 *          -> 그러니까  객체값 변경한다고 해서 그 전에 Spread Syntax로 적용한 객체값까지 일괄적으로 바뀌어 적용되진 않는다는 말이다
 *              -> 단! 다른 객체의 레퍼런스 주소를 저장하는 변수의 경우는 참고하는 객체의 값이 변하면 일괄적 변경 적용이 가능하다
 *      3) Spread Syntax (전개 문법)를 이용해서, 객체를 합치는 경우, 같은 프로퍼티명에 대해서는 나중에 들어오는 값을 덮어써서 저장한다
 * 
 *    # 나머지 매개변수
 *     : 똑같이 '...변수명'을 쓰지만, function을 정의할 때 들어갈 수 있는 파라미터가 많을 경우, 파라미터 선언 구간에 적는다 
 *       (주로 내용에 for문 같은거를 사용한다) 
 * 
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 *
 */
{

  //-------------------------------------------------------------------------------------------------------------
  const obj1 = { key: 'key1' };
  const obj2 = { key: 'key2' };

  // (특이) obj1, obj2의 레퍼런스 주소를 보관하는 배열
  const array = [obj1, obj2];

  //-------------------------------------------------------------------------------------------------------------
  // EX) array copy
  const arrayCopy = [...array];
  console.log(array, arrayCopy);

  const arrayCopy2 = [...array, { key: 'key3' }];   // Spread Syntax을 통한 인수들은 구성이 자유롭다

  // (특이) 원본 객체의 요소값 일부가 변한다고, 그 전에 적용한 Spread Syntax까지의 내용에 변경점은 적용되지 않는게 원칙이지만..
  //        -> array 자체가 obj1, obj2의 레퍼런스 주소를 나타내기에... 변경 전에 ...array를 통해 배열요소값을 채운 arrayCopy, arrayCopy2은 요소에 특정 값이 아니라
  //           obj1, 2의 레퍼런스 주소를 따라가는 값을 저장하고 있음 (= obj1의 변경하나에 모든 array배열을 참고한 모든 내용이 변경)
  obj1.key = 'newKey';  

  console.log(array, arrayCopy, arrayCopy2);

  //-------------------------------------------------------------------------------------------------------------
  // EX) object copy
  const obj3 = { ...obj1 };
  console.log(obj3);

  //-------------------------------------------------------------------------------------------------------------
  // EX) array concatenation
  const fruits1 = ['🍑', '🍓'];
  const fruits2 = ['🍌', '🥝'];
  const fruits = [...fruits1, ...fruits2];  // Spread Syntax을 통한 인수들은 구성이 자유롭다
  console.log(fruits);  //  ['🍑', '🍓'. '🍌', '🥝'];

  //-------------------------------------------------------------------------------------------------------------
  // ex) 합치는 객체들의 요소명이 같은 경우 object merge 
  const dog1 = { dog: '🐕' };
  const dog2 = { dog: '🐶' };
  const dog = { ...dog1, ...dog2 }; // Spread Syntax을 통한 인수들은 구성이 자유롭다
  console.log(dog); //  [dog : '🐶']
  //-------------------------------------------------------------------------------------------------------------

}

/**
 * 4. Default parameters
 *  : 함수의 파라미터에 기본값을 주어 null, undefined 문제를 막는 것이 가능함
 * 
 *  # 2번의 Destructuring Assignment (구조분해 할당 구문) 에서의 기본값 주는 것과는 비슷한듯 하면서도 다름
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters
 * 
 */
{
  //-------------------------------------------------------------------------------------------------------------
  // 💩 예시 (구 코드)
  {
    function printMessage(message) {
      if (message == null) {  // null의 경우 넣음
        message = 'default message';
      }
      console.log(message);
    }

    printMessage('hello');
    printMessage();
  }
  //-------------------------------------------------------------------------------------------------------------

  // ✨ 예시
  {
    function printMessage(message = 'default message') {
      console.log(message);
    }

    printMessage('hello');
    printMessage();
  }
  //-------------------------------------------------------------------------------------------------------------
  
}

/**
 * 5. Ternary Operator
 *  : 삼항 연산자 (react에서 많이 쓸 수 밖에 없음)
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
 */

//-------------------------------------------------------------------------------------------------------------
{
  const isCat = true;
  // 💩
  {
    let component;
    if (isCat) {
      component = '😸';
    } else {
      component = '🐶';
    }
    console.log(component);
  }

  // ✨
  {
    const component = isCat ? '😸' : '🐶';
    console.log(component);
    console.log(isCat ? '😸' : '🐶');
  }
  
}
//-------------------------------------------------------------------------------------------------------------

/**
 * 6. Template Literals
 *  : `을 활용한 문자열... 다 아는거
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
 */
//-------------------------------------------------------------------------------------------------------------
{
  const weather = '🌤';
  const temparature = '16°C';

  // 💩
  console.log(
    'Today weather is ' + weather + ' and temparature is ' + temparature + '.'
  );

  // ✨
  
  console.log(`Today weather is ${weather} and temparature is ${temparature}.`);

}
//-------------------------------------------------------------------------------------------------------------