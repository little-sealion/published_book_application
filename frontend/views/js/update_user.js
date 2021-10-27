let urlPrams = new URLSearchParams(window.location.search);
// Access the use ID from the query string(ie. ?id=1)

let userId = urlPrams.get('id');

if (userId) {
  fetch(`api/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      //   push exisiting user information into the
      document.getElementById('userId').value = user.userID;
      document.getElementById('firstName').value = user.firstName;
      document.getElementById('lastName').value = user.lastName;
      document.getElementById('email').value = user.email;
      document.getElementById('username').value = user.username;
      document.getElementById('password').value = user.password;
      document.getElementById('accessRights').value = user.accessRights;
    });
}

// <!-- post back updated data -->
function postUpdateUser() {
  // <!-- Get access to the updated user form -->
  let updateUserForm = document.getElementById('update-user-form');

  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(updateUserForm))
  );
  console.log(formDataJSON);

  //   Post the JSON data tothe API
  fetch('api/users/update', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      // redirect back to user list

      //   window.location.href = 'list_users.html';
    });
}
