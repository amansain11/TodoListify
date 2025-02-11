const getAllCompletedTodos = async (page, limit)=>{
    const url = `http://localhost:8000/api/v1/todos/get-completed-todos?page=${page}&limit=${limit}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: 'include'
        })
    
        const result = await response.json()
    
        if(result.success){
            return result.data
        }
        else{
            console.log(result.message)
        }  
    } catch (error) {
        throw new Error("Error while fetching all completed todos ", error)
    }  
}

export default getAllCompletedTodos;