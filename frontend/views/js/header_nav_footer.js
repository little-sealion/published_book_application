console.log(getCookie('username'));
console.log(getCookie('accessRights'));

function postLogoutUser() {
  delete_cookie('username');
  delete_cookie('accessRights');
  fetch('/api/users/logout', { method: 'POST' })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      window.location.href = 'index.html';
    })
    .catch((err) => {
      console.log('logout failed -' + err);
    });
}

document.getElementById('myHeader').innerHTML = `
<header class="p-3 bg-dark text-white sticky-top">
<div class="container">
  <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
    </a>

    <ul id="nav_panel" class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a href="/index.html" class="nav-link px-2 ">Digital Library</a></li>
       ${
         getCookie('username') != null
           ? `<li><a href="list_books.html" class="nav-link px-2 text-white">Manage Books</a></li>`
           : ``
       }  
       ${
         getCookie('accessRights') == 'admin'
           ? `<li><a href="list_users.html" class="nav-link px-2 text-white">Manege Users</a></li>`
           : ``
       }
    </ul>   

    <div class="text-end" id='login_status'>
    ${
      document.cookie !== ''
        ? `
          <span>Hi, ${getCookie('accessRights')} ${getCookie('username')}</span>
          <button type="button" class="btn btn-outline-light me-2" onclick="postLogoutUser()">Logout
          </button>`
        : `<button type="button" class="btn btn-outline-light me-2"><a href="login.html">Log In</a></button>`
    } 
      
    </div>
  </div>
</div>
</header>
`;

document.getElementById('myFooter').innerHTML = `
<footer class="footer mt-auto py-3 bg-dark">
  <div class="container">
    <span class="text-muted">Software Version @1.0.0  @Copyright Tess the developer</span>
  </div>
</footer>
`;

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(';');

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=');

    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}
function delete_cookie(name) {
  document.cookie =
    name +
    '=;SameSite=None; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
