import displayError from "./todolistify_error.js";

const checkbox = async (todoId)=>{
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/toggle-completion/${todoId}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'include'
        })
        
        const result = response.json()
    
        return result
    } catch (error) {
        displayError("Failed Toggling Completion..")
    }
}

export default checkbox;