// define the method to post the userId of the the user I want to delete
function postDeleteUser(userId) {
  console.log(userId);
  fetch('/api/users/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // convert userId to json format
    body: JSON.stringify({ userId: userId }),
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      // if user delete success, redrect to list_users page
      window.location.href = 'list_users.html';
    })
    .catch((err) => {
      console.log('failed to delete user -' + err);
    });
}
