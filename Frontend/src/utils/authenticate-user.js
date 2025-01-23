const authUser = async()=>{
    const url = 'http://localhost:8000/api/v1/users/current-user';

    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    
        const data = await response.json();
    
        if(response.ok && data.success){
            return data
        }
        else{
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default authUser;