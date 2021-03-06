function postLoginUser() {
  // Get access to the login user form
  const loginForm = document.getElementById('login-user-form');

  //   Convert the form fields into JSON
  const formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(loginForm))
  );
  console.log(formDataJSON);
  //   post the form data to the backend
  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      // if login success, redirect to the index page
      window.location.href = 'index.html';
    })
    .catch((err) => {
      // if login fails, consolog the error message
      console.log('user login failed - ' + err);
    });
}
