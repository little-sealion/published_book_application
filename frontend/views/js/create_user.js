// Oct 22th ***********************************************************************

function postCreateUser() {
  // Get access to the create user form element
  let createUserForm = document.getElementById('create-user-form');

  // Convert the user form fields into JSON
  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(createUserForm))
  );
  console.log('formDataJSON', formDataJSON);

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
      (data) => console.log('user request sent:', data)
    )
    .catch((error) => console.log('Create user failed:', error));
}

// Oct 22th ***********************************************************************
