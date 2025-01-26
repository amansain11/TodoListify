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

        const result = await response.json()

        if(result.success){
            console.log("Entered in if with true")
            return result;
        }
        else{
            console.log("Entered in else with false")
            return result ;
        }
    } catch (error) {
        throw new Error("Error verifying access token", error)
    }
}

export default authUser;