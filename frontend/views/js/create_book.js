// fetch the author list from database, so we can populate the author select options
fetch('/api/authors')
  .then((res) => res.json())
  .then((authors) => {
    // get the select element
    const AuthorSelect = document.getElementById('authorID');
    // map the authors, and append an option element for each author to the select element
    authors.map((author) => {
      AuthorSelect.innerHTML += `<option key=${author.authorID} value=${author.authorID}>${author.name} ${author.surname}</option>`;
    });
  });

function postCreateBook(event) {
  event.preventDefault();
  // Get access to the create user form element
  const createBookForm = document.getElementById('create-book-form');
  let formData = new FormData(createBookForm);

  if (event.target.reportValidity()) {
    // Post form data to the API
    fetch('/api/books/create', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(
        // handle the response from the server
        (data) => {
          alert(data);
          window.location.href = 'list_books.html';
        }
      )
      .catch((error) => console.log('Create book failed:', error));
  }
}

// set the max date of #publication date input as now
let today = new Date();
let yyyy = today.getFullYear();
// set the max limit for the yearofPublication as current day
document.getElementById('yearofPublication').setAttribute('max', yyyy);

// validate each input and display corresponding error message(if there is)
function validate(elem) {
  let errorMessage = '';
  // get the errorDiv element
  const errorDiv = elem.nextElementSibling.nextElementSibling;
  // if there's any validity error, pass the error to the errorMessage variable
  if (!elem.checkValidity()) {
    for (key in elem.validity) {
      if (elem.validity[key]) {
        errorMessage = key;
      }
    }
  } else {
    errorMessage = '';
  }
  // show the error message in the errorDiv
  errorDiv.innerText = errorMessage;
}

// render image when input[type=file] field has select an image
function loadImage(input) {
  // get the image element
  const imageElem = document.getElementById('avatar-image');
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = function (e) {
      imageElem.src = e.target.result;
      imageElem.style.opacity = '1';
    };
  }
  // display the image element
  imageElem.style.display = 'block';
}
