fetch('/api/books')
  .then((res) => res.json())
  .then((books) => {
    let bookListSection = document.getElementById('book-list');
    for (let book of books) {
      let coverImage =
        book.coverImagePath == ''
          ? 'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg'
          : book.coverImagePath;
      bookListSection.innerHTML += `
      <div class="card col-6 col-sm-3 g-5" style="width: 18rem;height:27rem;">
        <img src="${coverImage}" class="card-img-top" style="height:18rem;" alt="book cover">
        <div class="card-body" style="height:10rem;">
          <h5 class="card-title">${book.bookTitle}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.genre}</h6>
          <p class="card-text">${book.languageWritten}</p>

        </div>
      </div>
`;
    }
  });
