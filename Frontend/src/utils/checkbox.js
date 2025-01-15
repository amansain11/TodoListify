const checkbox = ()=>{
    let todosBox = document.getElementsByClassName('todos-box')[0]
    todosBox.addEventListener('click',(element)=>{
        if(element.target.tagName === 'svg'){
            if(!element.target.classList.contains('marked-checked')){
                element.target.classList.add('marked-checked')
                element.target.parentElement.nextElementSibling.firstElementChild.style.color = "#898989"
                element.target.parentElement.nextElementSibling.firstElementChild.style.textDecoration = "line-through"
            }
            else{
                element.target.classList.remove('marked-checked')
                element.target.parentElement.nextElementSibling.firstElementChild.style.color = "white"
                element.target.parentElement.nextElementSibling.firstElementChild.style.textDecoration = "none"
            }
        }
        else if(element.target.tagName === 'path'){
            if(!element.target.parentElement.classList.contains('marked-checked')){
                element.target.parentElement.classList.add('marked-checked')
                element.target.parentElement.parentElement.nextElementSibling.firstElementChild.style.color = "#898989"
                element.target.parentElement.parentElement.nextElementSibling.firstElementChild.style.textDecoration = "line-through"
            }
            else{
                element.target.parentElement.classList.remove('marked-checked')
                element.target.parentElement.parentElement.nextElementSibling.firstElementChild.style.color = "white"
                element.target.parentElement.parentElement.nextElementSibling.firstElementChild.style.textDecoration = "none"
            }
        }
    })
}

export default checkbox;