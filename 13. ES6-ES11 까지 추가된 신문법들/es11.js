/**
 * 관련 강의 영상: https://youtu.be/36HrZHzPeuY
 */

/**
 * 1. ?. = Optional Chaining (ES11)
 *  : 객체의 요소(객체명.요소명.요소명....)를 불러올 때 '요소명?.'가 붙는 경우 ?. '앞’의 평가 대상이 undefined나 null이면, 평가를 멈추고 undefined를 반환
 *    -> Ternary Operator(삼항 연산자)를 객체값 호출에 응용한 요소라고 생각하면 됨
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining
 */
//-------------------------------------------------------------------------------------------------------------
{
  const person1 = {
    name: 'Ellie',
    job: {
      title: 'S/W Engineer',
      manager: {
        name: 'Bob',
      },
    },
  };

  const person2 = {
    name: 'Bob',
  };

  // 💩💩💩💩💩💩 (아예 빼박 에러) 예시
  {
    function printManager(person) {
      console.log(person.job.manager.name); // 해당 함수는 job, manager라는 객체의 요소명이 있어야 정상적으로 작동
    }
    printManager(person1);
    printManager(person2);  // job, manager가 없으니 에러 확정
  }

  // 💩💩💩 
  {
    function printManager(person) {
      console.log(
        person.job
          ? person.job.manager
            ? person.job.manager.name
            : undefined
          : undefined
      );
    }
    printManager(person1);
    printManager(person2);
  }

  // 💩
  {
    function printManager(person) {
      console.log(person.job && person.job.manager && person.job.manager.name);
    }
    printManager(person1);
    printManager(person2);
  }

  // ✨예시 : 조건무니나 &&를 ?.를 통해 간단히 에러 해결
  {
    function printManager(person) {
      console.log(person.job?.manager?.name);
    }
    printManager(person1);
    printManager(person2);
  }
}
//-------------------------------------------------------------------------------------------------------------

/**
 * 2. Nullish Coalescing Operator (ES11)
 *  : 예전에 OR연산자의 특성(하나라도 false면 맨 뒤의 것이 나옴)을 이용해서, 특정값이 없을때는 기본값이 나오도록 설정했던 경우가 있는데 
 *    -> 이를 || -> ?? 로 바꿔서 NULL이나 ''같은 false로 인정되는 값이 나와도, 값이 없지만 않으면 나오게 해줌   
 * 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
 */
{
  // Logical OR operator (논리적 false)
  // false: false, '', 0, null, undefined
  
  //-------------------------------------------------------------------------------------------------------------
  // ex) 구현하고 싶은거? name의 값이 없을때만 Guest 값 나오게 하기

  // ||로 구현했을 경우의 문제
  {
    const name = 'Ellie';
    const userName = name || 'Guest';
    console.log(userName);
  }

  //  💩 
  //  문제) null, '', 0도 false로 인정되어져 버림 -> name값 있는데 Guest가 나와버림
  {
    const name1 = null;
    const userName1 = name1 || 'Guest';
    console.log(userName1); // 'Guest'
  
    const name2 = '';
    const userName2 = name2 || 'Guest';
    console.log(userName2); // 'Guest'

    const num = 0;
    const message = num || 'undefined';
    console.log(message);   // 'Guest'
  }

  //-------------------------------------------------------------------------------------------------------------
  // ✨ : ??을 통해 해결
  {
    const name = '';
    const userName = name ?? 'Guest';
    console.log(userName);

    const num = 0;
    const message = num ?? 'undefined';
    console.log(message);
  }
  //-------------------------------------------------------------------------------------------------------------
}
