const hamburger = ()=>{
    let hamburger = document.getElementsByClassName('hamburger-box')[0]
    let content_box_title = document.getElementById('content-box-title')
    let content_box_items = document.getElementById('content-box-items')
    hamburger.addEventListener('click', (element)=>{
        if(element.target.tagName === 'svg' || element.target.tagName === 'path'){
            if(!hamburger.firstElementChild.classList.contains('active-hamburger')){
                hamburger.firstElementChild.classList.add('active-hamburger')
                content_box_items.classList.remove('move-right')
                content_box_title.style.display = 'none'
                content_box_items.style.display = 'flex'
                content_box_items.classList.add('move-left')
            }
            else{
                hamburger.firstElementChild.classList.remove('active-hamburger')
                setTimeout(()=>{
                    content_box_title.style.display = 'block'
                    content_box_items.style.display = 'none'
                },350)
                content_box_items.classList.add('move-right')
                content_box_items.classList.remove('move-left')
            }
        }
    })
}

export default hamburger;