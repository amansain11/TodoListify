import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/register-login-page.css';
import '../styles/components/todolistify_error.css';

import displayError from './utils/todolistify_error.js';
import loading from './utils/loading.js';

const register = ()=>{ 
    const form = document.getElementById('register-form')
    const loadingParent = document.querySelector('.title')
    const loadingChild = loading()

    form.addEventListener('submit', async (event)=>{
        event.preventDefault(); 

        loadingParent.appendChild(loadingChild)

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`;

        const formData = new FormData(form)

        const data = new URLSearchParams();
        data.append('username', formData.get('username'));
        data.append('email', formData.get('email'));
        data.append('password', formData.get('password'));

        await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString(),
        })
        .then(response => response.json())
        .then((data) => {
            if(data.success){
                loadingChild.remove()
                form.reset()
                window.location.href = '/login.html';
            }
            else{
                loadingChild.remove()
                displayError("Registration Failed, Something went wrong..")
            }
        })
        .catch(error => {
            loadingChild.remove()
            displayError("Registration Failed, Something went wrong..")
        })
    })
}

register()