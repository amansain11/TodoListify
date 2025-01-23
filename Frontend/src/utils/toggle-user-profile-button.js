import authUser from "./authenticate-user.js";

const toggleBtn = async ()=>{
    const sessionValid = await authUser();
    const desktop_user_profile = document.getElementsByClassName('desktop-user-profile')[0];
    const mobile_user_profile = document.getElementsByClassName('mobile-user-profile')[0];
    if (sessionValid) {
        let profile_btn = document.createElement('a');
        profile_btn.setAttribute('href','/profile.html');
        profile_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg><span>${sessionValid.data.username.split(' ')[0]}</span>`;
        desktop_user_profile.append(profile_btn.cloneNode(true));
        mobile_user_profile.append(profile_btn.cloneNode(true));
    } else {
        let signIn_btn = document.createElement('a');
        signIn_btn.setAttribute('href','/login.html');
        signIn_btn.innerHTML = 'Sign in';
        desktop_user_profile.append(signIn_btn.cloneNode(true));
        mobile_user_profile.append(signIn_btn.cloneNode(true));
    }
}

export default toggleBtn;