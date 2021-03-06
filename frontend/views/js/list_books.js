// fetch the books list, and populate them to the book_list page
fetch('/api/books')
  .then((res) => res.json())
  .then((books) => {
    let bookListSection = document.getElementById('book-list');
    bookListSection.innerHTML += `
      <div class="card g-5 col-6 col-sm-4 " style="width: 18rem;">
      <a href="create_book.html"><img src="https://www.shareicon.net/data/256x256/2016/06/27/623443_book_256x256.png" class="card-img-top" alt="add book icon"></a>
        <div class="card-body">
          <h4 class="card-title">Add a new Book</h4>
        </div>
      </div>
`;
    // for each book, fetch the createdDate of that book, and convert it to local time
    for (let book of books) {
      let dateCreated =
        book.dateCreated != null
          ? new Date(book.dateCreated)
              .toString()
              .replace('GMT+1000 (Australian Eastern Standard Time)', '')
          : 'Mon Nov 15 2021';
      // for each book, fetch the lastUpdatedDate of that book, and convert it to local time
      let lastUpdated =
        book.lastUpdated != null
          ? new Date(book.lastUpdated)
              .toString()
              .replace('GMT+1000 (Australian Eastern Standard Time)', '')
          : 'Mon Nov 15 2021';

      // if the book does not have an bookcover image, give it a default image
      // then render the book element
      let coverImage =
        book.coverImagePath == ''
          ? 'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg'
          : book.coverImagePath;
      bookListSection.innerHTML += `
      <div class="card g-5 col-6 col-sm-3" style="width: 18rem;height:30rem;">
        <img src="${coverImage}" style="height:18rem;" class="card-img-top" alt="book cover">
        <div class="card-body" style="height:7rem;">
          <h5 class="card-title">${book.bookTitle.replace(/&#x27;/g, "'")}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.genre}</h6>
          <p class="card-text">${book.languageWritten}</p>
          <div class="info"><p >Date Created:${dateCreated}</p> <p>Last updated:${lastUpdated}</p><p>
          <button type="button" class="btn btn-primary"> <a class="card-link" href="update_book.html?id=${
            book.bookID
          }">Edit</a></button>
          <button type="button" class="btn btn-danger" onclick="postDeleteBook(${
            book.bookID
          })">Delete</button>
        </div>
      </div>
`;
    }
  });

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}
