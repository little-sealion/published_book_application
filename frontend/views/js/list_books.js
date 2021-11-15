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
    for (let book of books) {
      // console.log(book);
      let dateCreated =
        book.dateCreated != null ? book.dateCreated.slice(0, -5) : '2021-11-15';
      let lastUpdated =
        book.lastUpdated != null ? book.lastUpdated.slice(0, -5) : '2021-11-15';
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
