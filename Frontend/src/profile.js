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

fetchUserDetails()