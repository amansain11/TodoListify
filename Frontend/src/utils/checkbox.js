import displayError from "./error.js";

const checkbox = async (todoId)=>{
    const url = `http://localhost:8000/api/v1/todos/toggle-completion/${todoId}`;

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