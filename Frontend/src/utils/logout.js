const logout = ()=>{
    const header = document.getElementsByTagName('header')[0]
    header.addEventListener('click', (event)=>{
        event.preventDefault()
        if(event.target.id === 'logout-button'){
            const url = 'http://localhost:8000/api/v1/users/logout'

            try {
                fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                .then(response => response.json())
                .then(data => {
                    if(data.success){
                        console.log(data)
                        window.location.href = '/login.html';
                    }
                    else{
                        console.log('Logout failed', data.message)
                    }
                })
                .catch(error => console.log("Error: ",error))
            } catch (error) {
                console.log(error)
            }
        }
    })
}

export default logout;