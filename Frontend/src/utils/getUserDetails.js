const getUserDetails = async ()=>{
    const url = 'http://localhost:8000/api/v1/users/current-user';

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
        throw new Error("Error fetching user details", error)
    }
}

export default getUserDetails;