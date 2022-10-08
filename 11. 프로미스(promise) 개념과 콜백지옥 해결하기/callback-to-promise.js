// Callback Hell solve example
class UserStorage {

  loginUser(id, password) {

    // promise 객체로 리턴 선언
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (
          (id === 'ellie' && password === 'dream') ||
          (id === 'coder' && password === 'academy')
        ) {
          // 콜백함수를 onsuccess -> resolve로 변경
          resolve(id);
        } else {
          // 콜백함수를 onError -> reject로 변경
          reject(new Error('not found'));
        }
      }, 2000);
      
    });
  }

  // user이외의 다른 파라미터는 필요없음
  getRoles(user) {

    // promise 객체로 리턴 선언
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (user === 'ellie') {
          // 콜백함수를 onsuccess -> resolve로 변경
          resolve({ name: 'ellie', role: 'admin' });
        } else {
          // 콜백함수를 onError -> reject로 변경
          reject(new Error('no access'));
        }
      }, 1000);

    });
  }

  // Homework Answer 🚀
  async getUserWithRole(user, password) {
    const id = await this.loginUser(user, password);
    const role = await this.getRoles(id);
    return role;
  }
}

// Original code from Youtube course
const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your passrod');

userStorage
  .loginUser(id, password)
  .then(userStorage.getRoles)
  .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
  .catch(console.log);

// Homework Answer 🚀
userStorage
  .getUserWithRole(id, password) //
  .catch(console.log)
  .then(console.log);
