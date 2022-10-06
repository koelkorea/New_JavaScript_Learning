// Promise -> Async/await
//  : 콜백지옥 주의하고, then() then() 같은거하지 말고 Promise -> Async/await을 이용해서 해결하자

// ❌ Bad Code 💩
function displayUser() {
  fetchUser() //
    .then((user) => {
      fetchProfile(user) //
        .then((profile) => {
          updateUI(user, profile);
        });
    });
}

// ✅ Good Code ✨
async function displayUser() {
  const user = await fetchUser();
  const profile = await fetchProfile(user);
  updateUI(user, profile);
}
