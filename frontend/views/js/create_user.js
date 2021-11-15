function postCreateUser(event) {
  event.preventDefault();
  // Get access to the create user form element
  let createUserForm = document.getElementById('create-user-form');

  // Convert the user form fields into JSON
  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(createUserForm))
  );
  if (event.target.reportValidity()) {
    // Post form data to the API
    fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formDataJSON,
    })
      .then((res) => res.json())
      .then(
        // handle the response from the server

        (data) => {
          alert(data);
          window.location.href = 'list_users.html';
        }
      )
      .catch((error) => console.log('Create user failed:', error));
  }
}
// validate each input and display corresponding error message(if there is)
function validate(elem) {
  let errorMessage = '';
  const errorDiv = elem.nextElementSibling;
  if (!elem.checkValidity()) {
    for (key in elem.validity) {
      if (elem.validity[key]) {
        errorMessage = key;
      }
    }
  } else {
    errorMessage = '';
  }
  errorDiv.innerText = errorMessage;
}
