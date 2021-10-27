fetch('/api/users')
  .then((res) => res.json())
  .then((users) => {
    let userListSection = document.getElementById('user-list');
    for (let user of users) {
      userListSection.innerHTML += `
        <article class="user">
        <span>${user.userId}</span>
        <span>${user.username}</span>
        <span>${user.firstName}</span>
        <a href="update_user.html?id=${user.userId}">Edit</a>
        <a href="delete_user.html?id=${user.userId}">Delete</a>
        </article>`;
    }
  });
