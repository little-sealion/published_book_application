function postDeleteBook(bookId) {
  console.log(bookId);
  fetch('/api/books/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookId: bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      window.location.href = 'list_books.html';
    })
    .catch((err) => {
      console.log('failed to delete book -' + err);
    });
}
