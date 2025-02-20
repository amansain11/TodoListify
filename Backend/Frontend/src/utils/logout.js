import displayError from "./todolistify_error.js";

const logout = async()=>{
    const url = `/api/v1/users/logout`

    await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            window.location.href = '/login.html';
        }
        else{
            displayError(data.message)
        }
    })
    .catch(error => displayError("Logging out Failed, Try again latter.."))
}

export default logout;