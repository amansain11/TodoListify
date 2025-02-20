const loading = ()=>{
    let loadingBox = document.createElement('div')
    loadingBox.setAttribute('class', 'loading-box')
    loadingBox.innerHTML = `<img src="/loading-icon.gif" alt='loading..'>`;
    
    return loadingBox;
}

export default loading;