const removeTodo = async(todoId)=>{
    const url = `http://localhost:8000/api/v1/todos/delete-todo/${todoId}`;

    try {
        const response = await fetch(url,{
            method: 'DELETE',
            credentials: 'include'
        })
    
        const result = response.json()
    
        return result;
    } catch (error) {
        console.log(error)
    }
}

export default removeTodo;