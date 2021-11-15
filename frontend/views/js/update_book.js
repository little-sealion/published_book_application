// set the max date of #publication date input as now
let today = new Date();
let yyyy = today.getFullYear();
document.getElementById('yearofPublication').setAttribute('max', yyyy);

fetch('/api/authors')
  .then((res) => res.json())
  .then((authors) => {
    const AuthorSelect = document.getElementById('authorID');
    authors.map((author) => {
      AuthorSelect.innerHTML += `<option key=${author.authorID} value=${author.authorID}>${author.name} ${author.surname}</option>`;
    });
  });

let urlPrams = new URLSearchParams(window.location.search);
// Access the use ID from the query string(ie. ?id=1)

let bookId = urlPrams.get('id');
if (bookId) {
  fetch(`/api/books/${bookId}`)
    .then((res) => res.json())
    .then((book) => {
      console.log('author', book.authorID);
      //   push exisiting book information into the
      document.getElementById('bookTitle').value = book.bookTitle;
      document.getElementById('originalTitle').value = book.originalTitle;
      document.getElementById('yearofPublication').value =
        book.yearofPublication;
      document.getElementById('genre').value = book.genre.replace(
        '&#x2F;',
        '/'
      );
      document.getElementById('millionsSold').value = book.millionsSold;
      document.getElementById('languageWritten').value = book.languageWritten;
      document.getElementById('avatar-image').src = book.coverImagePath.replace(
        /&#x2F;/g,
        '/'
      );
      document.getElementById('authorID').value = book.authorID;
    });
}

// <!-- post back updated data -->
function postUpdateBook(event) {
  // <!-- Get access to the updated user form -->
  let updateBookForm = document.getElementById('update-book-form');
  let formData = new FormData(updateBookForm);
  formData.append('bookId', bookId);
  console.log('formData', formData);

  //   Post the JSON data tothe API
  fetch('/api/books/update', {
    method: 'post',
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      // redirect back to book list
      window.location.href = 'list_books.html';
    })
    .catch((err) => console.log(err));

  const imageElem = document.getElementById('avatar-image');
  event.target.reportValidity();
  event.preventDefault();
  if (event.target.reportValidity()) {
    event.target.reset();
    imageElem.src =
      'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg';
  }
}

// validate each input and display corresponding error message(if there is)
function validate(elem) {
  let errorMessage = '';
  const errorDiv = elem.nextElementSibling.nextElementSibling;
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

// render image when input[type=file] field has select an image
function loadImage(input) {
  const imageElem = document.getElementById('avatar-image');
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = function (e) {
      imageElem.src = e.target.result;
      imageElem.style.opacity = '1';
    };
  }
  imageElem.style.display = 'block';
}
