import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/profile-container.css';
import '../styles/components/todolistify_error.css';

import authUser from './utils/authenticate-user.js';
import getUserDetails from './utils/getUserDetails.js';
import logout from './utils/logout.js';
import displayError from './utils/todolistify_error.js';
import loading from './utils/loading.js';
import refreshAccessToken from './utils/refresh-access-token.js';

const loadingParent = window.innerWidth < 724 ? document.getElementById('content-box-title') : document.getElementById('logo-box-title') ;
const loadingChild = loading()

const fetchUserDetails = async ()=>{
   try {
     const sessionValid = await authUser()
 
     if(sessionValid.success){
        loadingParent.appendChild(loadingChild)

         const result = await getUserDetails()
 
         let data;
         
         if(result.success){
             loadingChild.remove()
             data = result.data;
         }
         else{
             loadingChild.remove()
             displayError(result.message)
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
        const result = await refreshAccessToken()
  
        if(result.ok){
            location.reload()
        }
        else{
          location.href = '/login.html';
        }
     }
   } catch (error) {
        displayError("Something Went Wrong..")
        setTimeout(()=>{
            location.href = '/login.html';
        }, 6000)
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

        loadingParent.appendChild(loadingChild)

        const url = `/api/v1/users/update-account-details`;

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
                loadingChild.remove()
                window.location.href = '/profile-page.html';
            }
            else{
                loadingChild.remove()
                displayError("Failed updating details, Something went wrong..")
            }
        } catch (error) {
            loadingChild.remove()
            displayError("Failed updating details, Something went wrong..")
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
        const oldPassword_field_title = document.getElementById('oldPassword-field-title')

        new_password_field.parentElement.style.display = 'flex';

        old_password_field.value = '';

        old_password_field.disabled = false;

        updateButton.style.display = 'none';
        saveButton.style.display = 'flex';
        oldPassword_field_title.innerHTML = 'Old Password';
    })

    passwordForm.addEventListener('submit', async (event)=>{
        event.preventDefault();

        loadingParent.appendChild(loadingChild)

        const url = `/api/v1/users/change-password`;

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
                loadingChild.remove()
                window.location.href = '/profile-page.html';
            }
            else{
                loadingChild.remove()
                displayError("Invalid Credentials..")
            }
        } catch (error) {
            loadingChild.remove()
            displayError("Invalid Credentials..")
        }
    })
}

const loggingOut = ()=>{
    const logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', async (event)=>{
        event.preventDefault()

        loadingParent.appendChild(loadingChild)
        
        logout()
        loadingChild.remove()
    })
}

fetchUserDetails()
updateUserDetails()
changePassword()
loggingOut()