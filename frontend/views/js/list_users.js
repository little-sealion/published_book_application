// fetch the whole user list, and populate them in the userlist page
fetch('/api/users')
  .then((res) => res.json())
  .then((users) => {
    // get the userList element
    let userListSection = document.getElementById('user-list');
    // render the addUser elements, when click on the image, you will be direct to the create_user page
    userListSection.innerHTML += `
    <div class="card col-6 col-sm-4" style="width: 18rem;">
        <a href="create_user.html"><img src="https://cdn-icons-png.flaticon.com/512/166/166260.png" class="card-img-top" alt="add user icon"></a>
        <div class="card-body">
          <h4 class="card-title">Add an user</h4>
        </div>
      </div>`;
    for (let user of users) {
      userListSection.innerHTML += `
      <div class="card col-6 col-sm-4" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${user.userId}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${user.username}</h6>
          <p class="card-text">Access: ${user.accessRights}</p>
          <button type="button" class="btn btn-primary"> <a class="card-link" href="update_user.html?id=${user.userId}">Edit</a></button>
          <button type="button" class="btn btn-danger" onclick="postDeleteUser(${user.userId})">Delete</button>
        </div>
      </div>
`;
    }
  });
