import displayError from "./error.js";

const checkbox = async (todoId)=>{
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos/toggle-completion/${todoId}`;

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