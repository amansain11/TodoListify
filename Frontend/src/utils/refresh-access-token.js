import displayError from "./error.js";

const refreshAccessToken = async ()=>{
    const url = 'http://localhost:8000/api/v1/users/refresh-access-token';

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