import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/home-page.css';

import authUser from "./utils/authenticate-user.js";

(async() => {
    const session = await authUser()
    if(session.success){
        location.href = '/todo-page.html';
    }
})()