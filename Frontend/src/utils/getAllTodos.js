const getAllTodos = async ()=>{
    const page = 1;
    const limit = 10;
    const url = `http://localhost:8000/api/v1/todos/get-all-todos?page=${page}&limit=${limit}`;

    try {
        const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
        })
    
        const result = await response.json()
    
        if(result.success){
            console.log(result.message)
            return result.data;
        }
        else{
            console.error(result.message)
        }
    } catch (error) {
        throw new Error("Error while fetching all todos", error)
    }
}

export default getAllTodos;