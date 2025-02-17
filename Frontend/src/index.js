import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/home-page.css';

import authUser from "./utils/authenticate-user.js";
import refreshAccessToken from './utils/refresh-access-token.js';

const sessionValidation = async() => {
    const session = await authUser()
    if(session.success){
        location.href = '/todo-page.html';
    }
    else{
        const result = await refreshAccessToken()

        if(result.ok){
            location.reload()
        }
    }
}

sessionValidation()