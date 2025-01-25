const authUser = async()=>{
    const url = 'http://localhost:8000/api/v1/users/verify-access-token';

    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json()

        if(data.success){
            console.log("Entered in if with true")
            return true;
        }
        else{
            console.log("Entered in else with false")
            return false;
        }
    } catch (error) {
        console.error("Error verifying access token", error);
        return false;
    }
}

export default authUser;