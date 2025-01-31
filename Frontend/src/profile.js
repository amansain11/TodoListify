import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/profile-container.css';

import authUser from './utils/authenticate-user.js';
import getUserDetails from './utils/getUserDetails.js';

const fetchUserDetails = async ()=>{
    const sessionValid = await authUser()
    if(sessionValid.success){
        const result = await getUserDetails()

        let data;
        
        if(result.success){
            data = result.data;
        }
        else{
            console.log(result.message)
            return
        }

        const username_field = document.getElementById('username')
        const email_field = document.getElementById('email')
        const password_field = document.getElementById('oldPassword')

        let passwordFieldValue = "";

        for(let i=1; i<=data.passwordLength; i++){
            passwordFieldValue = passwordFieldValue + '*';
        }

        username_field.value = data.username;
        username_field.disabled = true;

        email_field.value = data.email;
        email_field.disabled = true;

        password_field.value = passwordFieldValue;
        password_field.disabled = true;
    }
    else{
        window.location.href = '/login.html';
    }
}

const updateUserDetails = ()=>{
    const updateButton = document.getElementById('info-edit-btn');
    const saveButton = document.getElementById('info-save-btn');
    const userDetailsForm = document.getElementById('update-details-form');

    updateButton.addEventListener('click', ()=>{
        const username_field = document.getElementById('username')
        const email_field = document.getElementById('email')

        username_field.value = '';
        email_field.value = '';

        username_field.disabled = false;
        email_field.disabled = false;

        updateButton.style.display = 'none';
        saveButton.style.display = 'flex';
    })

    userDetailsForm.addEventListener('submit', async (event)=>{
        event.preventDefault();

        const url = 'http://localhost:8000/api/v1/users/update-account-details';

        const formData = new FormData(userDetailsForm)

        const data = new URLSearchParams()

        data.append('newUsername', formData.get('username'))
        data.append('newEmail', formData.get('email'))

        try {
            const response = await fetch(url,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include',
                body: data.toString()
            });
    
            const result = await response.json()
    
            if(result.success){
                console.log(result.message)
                window.location.href = '/profile-page.html';
            }
            else{
                console.log("user details update failed")
            }
        } catch (error) {
            throw new Error("Error updating user details", error)
        }
    })
}

const changePassword = ()=>{
    const updateButton = document.getElementById('password-edit-btn');
    const saveButton = document.getElementById('password-save-btn');
    const passwordForm = document.getElementById('change-password-form');

    updateButton.addEventListener('click', ()=>{
        const old_password_field = document.getElementById('oldPassword')
        const new_password_field = document.getElementById('newPassword')

        new_password_field.parentElement.style.display = 'flex';

        old_password_field.value = '';

        old_password_field.disabled = false;

        updateButton.style.display = 'none';
        saveButton.style.display = 'flex';
    })

    passwordForm.addEventListener('submit', async (event)=>{
        event.preventDefault();

        const url = 'http://localhost:8000/api/v1/users/change-password';

        const formData = new FormData(passwordForm)

        const data = new URLSearchParams()

        data.append('oldPassword', formData.get('oldPassword'))
        data.append('newPassword', formData.get('newPassword'))

        try {
            const response = await fetch(url,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include',
                body: data.toString()
            });
    
            const result = await response.json()
    
            if(result.success){
                console.log(result.message)
                window.location.href = '/profile-page.html';
            }
            else{
                console.log("password change failed")
            }
        } catch (error) {
            throw new Error("Error changing user password", error)
        }
    })
}

fetchUserDetails()
updateUserDetails()
changePassword()