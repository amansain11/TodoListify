const logout = ()=>{
    const url = 'http://localhost:8000/api/v1/users/logout'

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            console.log(data)
            window.location.href = '/login.html';
        }
        else{
            console.log('Logout failed', data.message)
        }
    })
    .catch(error => console.log("Error: ",error))            
}

export default logout;