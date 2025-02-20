import displayError from "./todolistify_error.js";

const getUserDetails = async ()=>{
    const url = `/api/v1/users/current-user`;

    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json()

        if(result.success){
            return result;
        }
        else{
            return result;
        }
    } catch (error) {
        displayError("Failed Fetching User Details..")
    }
}

export default getUserDetails;