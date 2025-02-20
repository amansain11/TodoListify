import displayError from "./todolistify_error.js";

const refreshAccessToken = async ()=>{
    const url = `/api/v1/users/refresh-access-token`;

    try {
        const response = await fetch(url,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
        })
        return response
    } catch (error) {
        displayError("Failed Refreshing Access Token..")
    }
}

export default refreshAccessToken;