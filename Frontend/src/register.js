import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/register-login-page.css';

const register = ()=>{ 
    const form = document.getElementById('register-form')

    form.addEventListener('submit', (event)=>{
        event.preventDefault(); 

        const url = 'http://localhost:8000/api/v1/users/register'

        const formData = new FormData(form)

        const data = new URLSearchParams();
        data.append('username', formData.get('username'));
        data.append('email', formData.get('email'));
        data.append('password', formData.get('password'));

        try {
            fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data.toString(),
            })
            .then(response => response.json())
            .then((data) => {
                if(data.success){
                    form.reset()
                    window.location.href = '/login.html';
                }
                else{
                    console.log("Registration failed: ",data.message)
                }
            })
            .catch(error => console.error('Error:',error))
        } catch (error) {
            console.log(error)
        }
    })
}

register()
