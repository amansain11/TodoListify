import displayError from "./todolistify_error.js";

const removeTodo = async(todoId)=>{
    const url = `/api/v1/todos/delete-todo/${todoId}`;

    try {
        const response = await fetch(url,{
            method: 'DELETE',
            credentials: 'include'
        })
    
        const result = response.json()
    
        return result;
    } catch (error) {
        displayError("Failed Removing Todo..")
    }
}

export default removeTodo;