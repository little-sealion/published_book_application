// define the method to post the bookId of the the book I want to delete
function postDeleteBook(bookId) {
  console.log(bookId);
  fetch('/api/books/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // convert bookId to json format
    body: JSON.stringify({ bookId: bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      // if user delete success, redrect to list_books page
      window.location.href = 'list_books.html';
    })
    .catch((err) => {
      console.log('failed to delete book -' + err);
    });
}
