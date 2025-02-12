import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/register-login-page.css';
import '../styles/components/error.css';

import authUser from './utils/authenticate-user.js';
import displayError from './utils/error.js';

(async() => {
    const session = await authUser()
    if(session.success){
        location.href = '/todo-page.html';
    }
})()

const login = ()=>{
    const form = document.getElementById('login-form')

    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        const url = 'http://localhost:8000/api/v1/users/login'

        const formData = new FormData(form)

        const data = new URLSearchParams()
        data.append('email', formData.get('email'))
        data.append('password', formData.get('password'))

        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: data.toString()
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                form.reset()
                window.location.href = '/todo-page.html';
            }
            else{
                displayError("Login Failed, Something went wrong..")
            }
        })
        .catch(error => displayError("Login Failed, Something went wrong.."))
    })
}

login()