import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/register-login-page.css';
import '../styles/components/todolistify_error.css';

import displayError from './utils/todolistify_error.js';
import loading from './utils/loading.js';

const login = ()=>{
    const form = document.getElementById('login-form')
    const loadingParent = document.querySelector('.title')
    const loadingChild = loading()

    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        loadingParent.appendChild(loadingChild)

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`;

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
                loadingChild.remove()
                form.reset()
                window.location.href = '/todo-page.html';
            }
            else{
                loadingChild.remove()
                displayError("Login Failed, Something went wrong..")
            }
        })
        .catch(error => {
            loadingChild.remove()
            displayError("Login Failed, Something went wrong..")
        })
    })
}

login()