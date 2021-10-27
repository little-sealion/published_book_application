fetch('api/books')
  .then((res) => res.json())
  .then((books) => {
    console.log(books);
    let book_list = document.getElementById('book_list');
    book_list.innerHTML = '';
    for (let book of books) {
      book_list.innerHTML += `
         <article class="book">
           <h1>${book.bookTitle}</h1>
           <h3>${book.genre}</h3>
         </article>
       `;
    }
  });
