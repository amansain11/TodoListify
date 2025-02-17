import displayError from "./todolistify_error.js";

const getAllPendingTodos = async (page, limit)=>{
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/get-pending-todos?page=${page}&limit=${limit}`;

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
            displayError(result.message)
        }  
    } catch (error) {
        displayError("Something went wrong while fetching todos..")
    }  
}

export default getAllPendingTodos;