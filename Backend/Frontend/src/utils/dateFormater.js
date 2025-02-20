const dateFormater = (dateStr)=>{
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString('en-GB',{
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    return formattedDate;
}

export default dateFormater;