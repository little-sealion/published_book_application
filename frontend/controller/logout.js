function logOut(){
    fetch('/api/logout',{method:'post'}).catch(
        err => console.log(err)
    )
}