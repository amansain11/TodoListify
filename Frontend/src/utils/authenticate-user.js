const authUser = async()=>{
    const url = `/api/v1/users/verify-access-token`;

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
            return result ;
        }
    } catch (error) {
        throw new Error("Error verifying access token", error)
    }
}

export default authUser;