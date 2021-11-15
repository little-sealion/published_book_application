function postDeleteUser(userId) {
  console.log(userId);
  fetch('/api/users/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userId }),
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      window.location.href = 'list_users.html';
    })
    .catch((err) => {
      console.log('failed to delete user -' + err);
    });
}
